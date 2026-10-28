// src/data/softSkillsData.ts
// Comprehensive guides and interactive exercises for Soft Skills, Communication & Workplace Etiquette

import { SoftSkillGuide } from '../types/interview';

export const softSkillGuides: SoftSkillGuide[] = [
  {
    id: 'skill-conflict-resolution',
    title: 'Constructive Disagreement & Conflict Resolution',
    category: 'conflict-resolution',
    summary: 'How to debate architecture, code reviews, and project priorities without interpersonal toxicity or stalling team velocity.',
    frameworkSteps: [
      {
        step: '1. Separate the Person from the Problem',
        description: 'Focus exclusively on the technical constraints, user impact, and maintenance costs rather than personal style or seniority.',
        practicalExample: 'Instead of saying "Your approach is too messy", say "If we nest these three database queries, we risk N+1 latency spikes during high traffic. What if we batch fetch here?"'
      },
      {
        step: '2. Create a Minimal Proof-of-Concept (Spike)',
        description: 'When consensus cannot be reached theoretically, build a timed 1-hour prototype to measure latency, lines of code, and developer experience.',
        practicalExample: '"Let us build two quick 30-line microbenchmarks comparing Redis pub/sub vs WebSockets for our notification feature and let the latency metrics guide us."'
      },
      {
        step: '3. Disagree and Commit',
        description: 'Once a decision is finalized by the team lead or collective vote, support it completely without passive-aggressive resistance or "I told you so".',
        practicalExample: '"While I favored GraphQL, the team selected REST with OpenAPI specs. I will write the best OpenAPI documentation possible to make integration seamless."'
      }
    ],
    dosAndDonts: {
      dos: [
        'Acknowledge valid points in your colleague’s argument before presenting alternatives',
        'Use data, profiler snapshots, and official documentation to substantiate claims',
        'Have private 1-on-1 conversations for sensitive disagreements rather than public channels'
      ],
      donts: [
        'Never criticize team members publicly in open Slack/Teams channels or pull request comments',
        'Avoid making it a battle of egos or appealing to authority over evidence',
        'Do not stay silent during architecture meetings and complain after deployment'
      ]
    }
  },
  {
    id: 'skill-executive-presentation',
    title: 'Technical Presentation & Architecture Walkthroughs',
    category: 'presentation',
    summary: 'Techniques for presenting system architectures, project sprint demos, and technical proposals to both engineering and non-technical stakeholders.',
    frameworkSteps: [
      {
        step: '1. Start with the "Why" (The Business Context)',
        description: 'Explain the business problem, user pain point, or revenue impact before diving into databases and Kubernetes pods.',
        practicalExample: '"Our mobile checkout currently takes 4.2 seconds, resulting in a 14% drop-off rate. Today I am proposing an edge caching architecture to reduce checkout time under 800ms."'
      },
      {
        step: '2. The 30,000-Foot Architecture Diagram',
        description: 'Present a high-level system diagram showing data flows, external dependencies, and trust boundaries before zooming into microservice details.',
        practicalExample: 'Show a clear, uncluttered block diagram: User -> CDN -> API Gateway -> Microservices -> Database.'
      },
      {
        step: '3. Anticipate Tradeoffs Proactively',
        description: 'No engineering decision is free. Present the drawbacks and risks you evaluated and why you chose this path.',
        practicalExample: '"This architecture provides sub-second latency and high availability across 3 zones, with the tradeoff of an estimated $120/mo increase in managed AWS DynamoDB costs."'
      }
    ],
    dosAndDonts: {
      dos: [
        'Tailor technical depth to the audience (high-level KPIs for executives; code-level for peer engineers)',
        'Have a live interactive demo or screen recording backup in case the live environment fails',
        'Pause every 3-4 slides to invite questions and verify comprehension'
      ],
      donts: [
        'Avoid reading walls of text directly from slides',
        'Do not use obscure internal acronyms without defining them first',
        'Never dismiss audience questions with "that is out of scope" without a brief justification'
      ]
    }
  },
  {
    id: 'skill-workplace-etiquette',
    title: 'Engineering Workplace Etiquette & Remote Collaboration',
    category: 'etiquette',
    summary: 'Professional communication standards for Slack, asynchronous pull requests, standups, and distributed agile teams.',
    frameworkSteps: [
      {
        step: '1. Asynchronous Communication Clarity',
        description: 'Avoid "Hey" messages with no context. Provide complete context, reproduction steps, and links in your initial message.',
        practicalExample: 'Instead of "Hey Shobhit, quick question?", write "Hi Shobhit, in PR #142 for the payment webhook, I noticed stripe-signature verification fails on test webhook events. Here is the server log: [link]. When you have 5 minutes, could you take a look?"'
      },
      {
        step: '2. Empathetic and Actionable Code Reviews',
        description: 'Review code with kindness. Praise smart solutions, explain the rationale behind suggestions, and distinguish nitpicks from blockers.',
        practicalExample: '"Nice use of useMemo here! Nit: Consider renaming data to userProfiles for clarity. Blocker: This SQL query needs parameterized inputs to prevent injection vulnerabilities."'
      },
      {
        step: '3. Punctuality & Standup Discipline',
        description: 'Keep daily standup updates concise: What did you accomplish? What are you working on today? Are there any blockers?',
        practicalExample: '"Yesterday I completed the OAuth JWT refresh endpoint. Today I am writing Playwright integration tests. Blocker: I need staging API keys for the SendGrid email service."'
      }
    ],
    dosAndDonts: {
      dos: [
        'Acknowledge receipt of messages with a quick emoji or message (e.g. "Looking into this now")',
        'Document decisions in writing (RFCs, Jira tickets, Notion) rather than leaving them in transient chats',
        'Respect quiet work hours and different time zones in distributed teams'
      ],
      donts: [
        'Do not merge code without peer review approval unless in a declared critical emergency',
        'Avoid defensive reactions to constructive code review feedback',
        'Do not turn a 15-minute daily standup into a 45-minute deep technical discussion'
      ]
    }
  },
  {
    id: 'skill-leadership-ownership',
    title: 'Demonstrating Leadership & Extreme Ownership',
    category: 'leadership',
    summary: 'How to take ownership of features, drive incident blameless post-mortems, and mentor peers as an emerging tech leader.',
    frameworkSteps: [
      {
        step: '1. Own the End-to-End Outcome',
        description: 'Your job is not done when your code compiles. It is done when it is monitored, tested, deployed safely, and delivering value in production.',
        practicalExample: 'Monitor Datadog/CloudWatch metrics after deployment to ensure error rates remain at 0% and query times stay within SLA.'
      },
      {
        step: '2. Blameless Post-Mortems',
        description: 'When production outages occur, never blame individuals. Examine system flaws, missing safeguards, and automated testing gaps.',
        practicalExample: '"The outage occurred because our deploy script lacked a database migration dry-run step. We are implementing automated migration rollback checks in our CI pipeline."'
      },
      {
        step: '3. Uplifting Others through Mentorship',
        description: 'Great engineers multiply the output of their team through documentation, pair programming, and welcoming newcomers.',
        practicalExample: 'Write an intuitive onboarding guide or README with a one-command dev environment setup so new teammates become productive on Day 1.'
      }
    ],
    dosAndDonts: {
      dos: [
        'Take initiative to fix broken pipelines or flaky tests rather than waiting for someone else',
        'Give public credit to teammates who assisted in delivering milestones',
        'Admit your mistakes quickly and proactively propose concrete prevention steps'
      ],
      donts: [
        'Never engage in finger-pointing during incident post-mortems',
        'Avoid gatekeeping knowledge or codebase ownership',
        'Do not ignore minor bugs or technical debt until they cause major production outages'
      ]
    }
  }
];

export const hrInterviewGuide = {
  title: 'Comprehensive HR & Cultural Interview Playbook',
  sections: [
    {
      id: 'salary-negotiation',
      title: 'Salary Expectations & Negotiation Etiquette',
      keyConcept: 'Never state a single rigid number prematurely; anchor to market research and total compensation.',
      modelScript: '"Based on my market research for this role in our geographical tier, as well as my demonstrable experience in full-stack engineering and distributed systems, I am targeting a compensation range between ₹12 LPA and ₹15 LPA. However, I am primarily interested in finding the right team culture and high-impact engineering challenges, and I am flexible based on the total compensation package including performance bonuses and benefits."'
    },
    {
      id: 'strengths-weaknesses',
      title: 'Strengths & Real Weaknesses',
      keyConcept: 'State genuine weaknesses with self-awareness and explain the active systems you use to overcome them.',
      modelScript: '"My greatest strength is rapid technical execution and debugging under pressure—I enjoy breaking down complex problems and writing clean, maintainable code. My area for improvement is that early in projects, I sometimes dive into implementation before fully documenting edge cases. To address this, I have adopted a strict personal workflow: I write a short RFC or bulleted architectural checklist before writing code, which has significantly improved my design clarity."'
    },
    {
      id: 'why-our-company',
      title: 'Why Do You Want to Work Here?',
      keyConcept: 'Connect their product, engineering blog, or business trajectory to your personal goals.',
      modelScript: '"I have been following your engineering blog, particularly your post on migrating to distributed event-driven microservices to handle flash sales. That scale is exactly where I want to focus my career. I want to work with a team that values engineering rigor and high-throughput reliability, where I can immediately contribute my backend optimization skills while growing under senior mentorship."'
    }
  ]
};
