export class BackendAtsService {
  static evaluateResume(resumeText = '', jobDescription = '') {
    const textLower = resumeText.toLowerCase();

    // 1. SECTION COMPLETENESS (Max 20)
    const essentialSections = [
      { name: 'Contact Information', regex: /(email|phone|linkedin|github|contact)/i },
      { name: 'Professional Summary', regex: /(summary|about me|profile|objective)/i },
      { name: 'Technical Skills', regex: /(skills|technologies|proficiencies|technical stack)/i },
      { name: 'Work Experience / Internships', regex: /(experience|employment|work history|internship)/i },
      { name: 'Projects', regex: /(projects|personal projects|academic projects)/i },
      { name: 'Education', regex: /(education|degree|bachelor|university|college|cgpa|gpa)/i }
    ];

    const missingSections = [];
    let sectionPoints = 0;
    const pointsPerSection = 20 / essentialSections.length;

    essentialSections.forEach(s => {
      if (s.regex.test(resumeText)) {
        sectionPoints += pointsPerSection;
      } else {
        missingSections.push(s.name);
      }
    });

    const sectionScore = Math.round(Math.min(20, sectionPoints));

    // 2. SKILLS AND KEYWORDS RELEVANCE (Max 25)
    const highValueKeywords = [
      'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'SQL', 'HTML5', 'CSS3',
      'React', 'Next.js', 'Node.js', 'Express', 'Tailwind', 'Redux', 'Spring Boot', 'FastAPI',
      'PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'AWS', 'Docker', 'Kubernetes', 'Firebase',
      'Git', 'GitHub', 'REST', 'GraphQL', 'CI/CD', 'Microservices', 'Linux'
    ];

    const matchedKeywords = [];
    const missingKeywords = [];

    highValueKeywords.forEach(kw => {
      const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}\\b`, 'i');
      if (regex.test(resumeText)) {
        matchedKeywords.push(kw);
      } else {
        missingKeywords.push(kw);
      }
    });

    const keywordRatio = Math.min(1, matchedKeywords.length / 10);
    const skillsScore = Math.round(keywordRatio * 25);

    // 3. ACTION VERBS & QUANTIFIED METRICS (Max 25)
    const actionVerbs = [
      'architected', 'engineered', 'implemented', 'refactored', 'deployed',
      'accelerated', 'optimized', 'reduced', 'streamlined', 'enhanced',
      'spearheaded', 'orchestrated', 'guided', 'mentored', 'championed',
      'delivered', 'shipped', 'launched', 'published', 'automated'
    ];

    let strongVerbsCount = 0;
    actionVerbs.forEach(verb => {
      const regex = new RegExp(`\\b${verb}\\b`, 'i');
      if (regex.test(resumeText)) strongVerbsCount++;
    });

    const metricsRegex = /(\d+%\b|\$\d+|\d+\+|\b\d+\s*(users|clients|ms|seconds|minutes|hours|days|requests))/gi;
    const metricMatches = resumeText.match(metricsRegex) || [];
    const quantifiedMetricsCount = metricMatches.length;

    const verbScore = Math.min(12, strongVerbsCount * 1.5);
    const metricScore = Math.min(13, quantifiedMetricsCount * 2.5);
    const impactScore = Math.round(Math.min(25, verbScore + metricScore));

    // 4. FORMATTING & READABILITY (Max 15)
    const formattingIssues = [];
    let formattingScore = 15;

    const hasEmail = /[\w.-]+@[\w.-]+\.\w+/.test(resumeText);
    if (!hasEmail) {
      formattingIssues.push('No valid email address detected.');
      formattingScore -= 4;
    }

    const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\b\d{10}\b/.test(resumeText);
    if (!hasPhone) {
      formattingIssues.push('No standard contact phone number detected.');
      formattingScore -= 3;
    }

    const wordCount = resumeText.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount < 180) {
      formattingIssues.push('Resume appears too short (under 200 words); add detailed project highlights.');
      formattingScore -= 4;
    } else if (wordCount > 1200) {
      formattingIssues.push('Resume exceeds 1,200 words; consider condensing to 1-2 pages.');
      formattingScore -= 2;
    }

    const hasLinks = /(linkedin\.com|github\.com)/i.test(resumeText);
    if (!hasLinks) {
      formattingIssues.push('Missing professional links (LinkedIn or GitHub URL).');
      formattingScore -= 2;
    }

    formattingScore = Math.max(3, Math.round(formattingScore));

    // 5. JOB DESCRIPTION MATCH (Max 15)
    let jdScore = 15;
    const matchedJdKeywords = [];
    const missingJdKeywords = [];
    let relevanceRating = 'High';

    if (jobDescription && jobDescription.trim().length > 30) {
      const jdWords = Array.from(new Set(
        jobDescription
          .replace(/[^a-zA-Z0-9+#]/g, ' ')
          .split(/\s+/)
          .filter(w => w.length > 3 && !['with', 'from', 'have', 'this', 'that', 'your', 'will', 'must', 'should', 'about'].includes(w.toLowerCase()))
      ));

      jdWords.slice(0, 20).forEach(w => {
        const regex = new RegExp(`\\b${w}\\b`, 'i');
        if (regex.test(resumeText)) {
          matchedJdKeywords.push(w);
        } else {
          missingJdKeywords.push(w);
        }
      });

      const matchRatio = matchedJdKeywords.length / (matchedJdKeywords.length + missingJdKeywords.length || 1);
      jdScore = Math.round(matchRatio * 15);
      if (matchRatio >= 0.7) relevanceRating = 'Strong';
      else if (matchRatio >= 0.45) relevanceRating = 'High';
      else if (matchRatio >= 0.25) relevanceRating = 'Moderate';
      else relevanceRating = 'Low';
    }

    // Overall Score (Max 100)
    const overallScore = Math.min(99, Math.max(25, sectionScore + skillsScore + impactScore + formattingScore + jdScore));

    // Actionable Recommendations
    const recommendations = [];
    if (quantifiedMetricsCount < 3) {
      recommendations.push({
        id: 'rec-metrics',
        priority: 'Critical',
        title: 'Add Quantifiable Impact Metrics',
        action: 'Recruiter ATS scanners look for measurable outcomes. Include numbers like "improved speed by 35%" or "reduced queries from 400ms to 90ms".'
      });
    }
    if (missingSections.length > 0) {
      recommendations.push({
        id: 'rec-sections',
        priority: 'High',
        title: `Add Missing Sections: ${missingSections.slice(0, 2).join(', ')}`,
        action: `Ensure clear headings for ${missingSections.join(', ')} so parsers extract information into structured candidate fields.`
      });
    }
    if (matchedKeywords.length < 6) {
      recommendations.push({
        id: 'rec-keywords',
        priority: 'High',
        title: 'Incorporate Core Technical Stack Keywords',
        action: `Integrate industry-standard keywords like ${missingKeywords.slice(0, 5).join(', ')} into your skills and project descriptions.`
      });
    }
    if (strongVerbsCount < 5) {
      recommendations.push({
        id: 'rec-verbs',
        priority: 'Medium',
        title: 'Lead Bullets with Strong Engineering Verbs',
        action: 'Replace passive phrases like "worked on" with power verbs such as "Architected", "Engineered", "Optimized", or "Refactored".'
      });
    }

    return {
      overallScore,
      sectionCompleteness: {
        score: sectionScore,
        maxScore: 20,
        missingSections,
        feedback: missingSections.length === 0 ? 'All essential sections detected.' : `Missing: ${missingSections.join(', ')}`
      },
      skillsAndKeywords: {
        score: skillsScore,
        maxScore: 25,
        matchedKeywords,
        missingKeywords: missingKeywords.slice(0, 8),
        feedback: `Identified ${matchedKeywords.length} high-value technical keywords.`
      },
      actionVerbsAndImpact: {
        score: impactScore,
        maxScore: 25,
        quantifiedMetricsCount,
        strongVerbsCount,
        feedback: `${quantifiedMetricsCount} numerical metrics and ${strongVerbsCount} strong action verbs found.`
      },
      formattingAndReadability: {
        score: formattingScore,
        maxScore: 15,
        issues: formattingIssues,
        feedback: formattingIssues.length === 0 ? 'Format conforms with ATS parsing guidelines.' : formattingIssues.join(' ')
      },
      jobDescriptionMatch: {
        score: jdScore,
        maxScore: 15,
        matchedJdKeywords,
        missingJdKeywords: missingJdKeywords.slice(0, 6),
        relevanceRating
      },
      recommendations
    };
  }
}
