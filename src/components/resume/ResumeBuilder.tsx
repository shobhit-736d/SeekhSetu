import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeProfile } from '../../types/placement';
import { sampleStarterResume } from '../../data/resumeTemplatesData';
import { useStudy } from '../../context/StudyContext';
import {
  Download,
  Sparkles,
  Plus,
  Trash2,
  Eye,
  FileText,
  Check,
  Palette,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Code2,
  Award,
  Globe,
  Phone,
  Mail,
  MapPin,
  Trophy,
  Terminal,
  Layers,
  Calendar,
  CheckCircle2,
  Bookmark
} from 'lucide-react';

interface ResumeBuilderProps {
  initialProfile?: ResumeProfile;
}

type TemplateType = 'modern-tech' | 'classic-executive' | 'minimal-clean' | 'ivy-compact' | 'two-column-sidebar';

interface TemplateOption {
  id: TemplateType;
  label: string;
  badge: string;
  desc: string;
}

const TEMPLATE_OPTIONS: TemplateOption[] = [
  { id: 'modern-tech', label: 'Modern Tech', badge: 'Silicon Valley SDE', desc: 'Vibrant accents, modern typography & skill pills' },
  { id: 'classic-executive', label: 'Classic Harvard', badge: 'Wall Street & FAANG', desc: 'Authoritative serif, centered academic layout' },
  { id: 'minimal-clean', label: 'Minimalist Clean', badge: 'High ATS Match', desc: 'Monochrome Scandinavian design & clear hierarchy' },
  { id: 'ivy-compact', label: 'Ivy Compact', badge: '1-Page High Density', desc: 'Dense single-page layout with metric-first bullets' },
  { id: 'two-column-sidebar', label: 'Two-Column Sidebar', badge: 'Full Stack Standout', desc: 'Modern sidebar for skills & education, main panel for experience' }
];

export const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ initialProfile }) => {
  const { activeResume, saveResumeProfile, showToast } = useStudy();

  const [profile, setProfile] = useState<ResumeProfile>(() => {
    const base = initialProfile || activeResume || sampleStarterResume;
    return {
      ...base,
      templateId: (base.templateId as TemplateType) || 'modern-tech',
      skills: {
        ...base.skills,
        coreCs: base.skills.coreCs || ['Data Structures & Algorithms', 'DBMS', 'Operating Systems', 'Computer Networks', 'OOP'],
      },
      education: base.education?.length ? base.education : [
        {
          id: 'edu-1',
          degree: 'B.Tech in Computer Science & Engineering',
          institution: 'National Institute of Technology',
          location: 'India',
          startDate: '2021',
          endDate: '2025',
          grade: 'CGPA: 8.8 / 10.0',
          coursework: ['Data Structures', 'Database Systems', 'Operating Systems', 'Computer Networks']
        }
      ],
      certifications: base.certifications?.length ? base.certifications : [
        {
          id: 'cert-1',
          name: 'AWS Certified Cloud Practitioner',
          issuer: 'Amazon Web Services',
          date: '2024',
          url: 'https://aws.amazon.com/certification/'
        }
      ],
      achievements: base.achievements?.length ? base.achievements : [
        'Secured Global Rank 412 out of 22,000+ participants in LeetCode Biweekly Contest.',
        'Finalist in Smart India Hackathon (SIH) 2024 out of 1,200 participating collegiate teams.',
        'Solved 450+ Data Structures & Algorithms problems across LeetCode & GeeksforGeeks.'
      ],
      extracurriculars: base.extracurriculars?.length ? base.extracurriculars : [
        'Lead Organizer at Google Developer Student Clubs (GDSC) — hosted 8+ tech workshops.',
        'Technical Mentor for 50+ junior students in Web Development & Competitive Coding.'
      ]
    };
  });

  const [activeTemplate, setActiveTemplate] = useState<TemplateType>(
    (profile.templateId as TemplateType) || 'modern-tech'
  );

  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState<'info' | 'skills' | 'experience' | 'projects' | 'education' | 'achievements'>('info');
  const resumePrintRef = useRef<HTMLDivElement>(null);

  // Quick field updates
  const updatePersonalInfo = (field: keyof ResumeProfile['personalInfo'], val: string) => {
    setProfile(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: val }
    }));
  };

  const updateSummary = (val: string) => {
    setProfile(prev => ({ ...prev, summary: val }));
  };

  // AI Polish summary
  const handleAiPolishSummary = () => {
    const polished = `Results-driven Software Engineer with a solid foundation in full-stack architecture, specializing in ${profile.skills.languages.slice(0, 3).join(', ')} and ${profile.skills.frameworks.slice(0, 2).join(', ')}. Track record of optimizing web performance by 35%+, designing modular microservices, and implementing resilient RESTful APIs. Passionate about clean code, scalable database schemas, and continuous delivery.`;
    setProfile(prev => ({ ...prev, summary: polished }));
    showToast('Summary polished with executive action verbs!', 'success');
  };

  // Add / Edit Experience
  const handleAddExperience = () => {
    setProfile(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: 'exp-' + Date.now(),
          role: 'Software Developer Intern',
          company: 'TechNovation Labs',
          location: 'Bengaluru, India',
          startDate: 'Jun 2024',
          endDate: 'Dec 2024',
          isCurrent: false,
          highlights: ['Engineered key full-stack modules improving application throughput by 25%.']
        }
      ]
    }));
  };

  const handleRemoveExperience = (id: string) => {
    setProfile(prev => ({
      ...prev,
      experience: prev.experience.filter(e => e.id !== id)
    }));
  };

  // Add / Edit Project
  const handleAddProject = () => {
    setProfile(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: 'proj-' + Date.now(),
          title: 'Distributed Real-Time Task Queue',
          techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
          liveUrl: 'https://demo-app.io',
          githubUrl: 'https://github.com/developer/project',
          description: 'Full-stack application processing real-time asynchronous background jobs.',
          highlights: ['Architected REST APIs handling 500+ requests/sec with sub-90ms latency.']
        }
      ]
    }));
  };

  const handleRemoveProject = (id: string) => {
    setProfile(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  // Add / Edit Education
  const handleAddEducation = () => {
    setProfile(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: 'edu-' + Date.now(),
          degree: 'Senior Secondary Education (Class XII - PCM)',
          institution: 'Delhi Public School',
          location: 'India',
          startDate: '2019',
          endDate: '2021',
          grade: '94.2%',
          coursework: ['Physics', 'Chemistry', 'Mathematics', 'Computer Science']
        }
      ]
    }));
  };

  const handleRemoveEducation = (id: string) => {
    setProfile(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id)
    }));
  };

  // Add / Edit Certification
  const handleAddCertification = () => {
    setProfile(prev => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          id: 'cert-' + Date.now(),
          name: 'Meta Front-End Developer Professional Certificate',
          issuer: 'Meta / Coursera',
          date: '2024',
          url: 'https://coursera.org'
        }
      ]
    }));
  };

  const handleRemoveCertification = (id: string) => {
    setProfile(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== id)
    }));
  };

  // Add / Edit Achievement
  const handleAddAchievement = () => {
    setProfile(prev => ({
      ...prev,
      achievements: [
        ...prev.achievements,
        'Ranked in top 5% globally in Google Kickstart Round.'
      ]
    }));
  };

  const handleRemoveAchievement = (idx: number) => {
    setProfile(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== idx)
    }));
  };

  // Add / Edit Extracurricular
  const handleAddExtracurricular = () => {
    setProfile(prev => ({
      ...prev,
      extracurriculars: [
        ...(prev.extracurriculars || []),
        'Active Open-Source Contributor to Developer Tooling repositories.'
      ]
    }));
  };

  const handleRemoveExtracurricular = (idx: number) => {
    setProfile(prev => ({
      ...prev,
      extracurriculars: (prev.extracurriculars || []).filter((_, i) => i !== idx)
    }));
  };

  const handleSave = () => {
    const updated = { ...profile, templateId: activeTemplate, lastUpdated: new Date().toISOString() };
    saveResumeProfile(updated);
    showToast('Resume draft and template saved successfully!', 'success');
  };

  // High-fidelity PDF Download
  const handleDownloadPdf = async () => {
    if (!resumePrintRef.current) return;
    setIsExportingPdf(true);
    showToast('Rendering high-resolution vector PDF...', 'info');

    try {
      const element = resumePrintRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#FFFFFF'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${profile.personalInfo.fullName.replace(/\s+/g, '_')}_Resume_${activeTemplate}.pdf`);
      showToast('Resume PDF downloaded successfully!', 'success');
    } catch (err: any) {
      console.error(err);
      window.print();
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Template switch handler
  const handleSelectTemplate = (templateId: TemplateType) => {
    setActiveTemplate(templateId);
    setProfile(prev => ({ ...prev, templateId }));
    showToast(`Switched to "${TEMPLATE_OPTIONS.find(t => t.id === templateId)?.label}" layout!`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Top Template Selector Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#FA4616]" />
            <h3 className="font-extrabold text-sm text-white">Choose ATS Resume Template</h3>
            <span className="text-[10px] text-aurora-text-secondary hidden md:inline">
              (Live preview updates instantly on click)
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-aurora-bg-surface hover:bg-aurora-bg-surface/80 border border-aurora-border text-xs font-bold text-white transition-all shadow-sm"
            >
              Save Draft
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isExportingPdf}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#FA4616] hover:bg-[#E03D0F] text-white text-xs font-bold shadow-md shadow-[#FA4616]/20 transition-all disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExportingPdf ? 'Exporting...' : 'Download PDF'}</span>
            </button>
          </div>
        </div>

        {/* 5 Clickable Template Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-1">
          {TEMPLATE_OPTIONS.map(tpl => {
            const isSelected = activeTemplate === tpl.id;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => handleSelectTemplate(tpl.id)}
                className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#FA4616] bg-[#FA4616]/10 shadow-sm ring-1 ring-[#FA4616]'
                    : 'border-aurora-border bg-aurora-bg-surface hover:border-[#FA4616]/40 hover:bg-aurora-bg-elevated'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-bold text-xs text-white truncate">{tpl.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#FA4616] shrink-0" />}
                  </div>
                  <span className="text-[10px] font-semibold text-[#FA4616] block leading-tight mb-1">
                    {tpl.badge}
                  </span>
                  <p className="text-[10px] text-aurora-text-secondary leading-tight line-clamp-2">
                    {tpl.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split Interface (Left Editor, Right Live Preview) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Comprehensive Form Editor */}
        <div className="space-y-4">
          {/* Subtabs for Easy Navigation */}
          <div className="flex items-center gap-1 p-1 bg-aurora-bg-surface rounded-xl border border-aurora-border overflow-x-auto">
            {[
              { id: 'info', label: 'Personal & Links' },
              { id: 'skills', label: 'Technical Skills' },
              { id: 'experience', label: 'Work Experience' },
              { id: 'projects', label: 'Projects' },
              { id: 'education', label: 'Education' },
              { id: 'achievements', label: 'Achievements & Certs' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveEditorTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  activeEditorTab === tab.id
                    ? 'bg-[#FA4616] text-white shadow-sm'
                    : 'text-aurora-text-secondary hover:text-white hover:bg-aurora-bg-elevated'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: Personal Details & Links */}
          {activeEditorTab === 'info' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-3">
                <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#FA4616]" />
                  <span>1. Contact Information & Professional Links</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-aurora-text-secondary block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profile.personalInfo.fullName}
                      onChange={e => updatePersonalInfo('fullName', e.target.value)}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-white outline-none focus:border-[#FA4616]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-aurora-text-secondary block mb-1">Professional Headline</label>
                    <input
                      type="text"
                      value={profile.personalInfo.title}
                      onChange={e => updatePersonalInfo('title', e.target.value)}
                      placeholder="e.g. Full Stack Software Engineer"
                      className="w-full p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-white outline-none focus:border-[#FA4616]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-aurora-text-secondary block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={profile.personalInfo.email}
                      onChange={e => updatePersonalInfo('email', e.target.value)}
                      placeholder="e.g. candidate@example.com"
                      className="w-full p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-white outline-none focus:border-[#FA4616]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-aurora-text-secondary block mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={profile.personalInfo.phone}
                      onChange={e => updatePersonalInfo('phone', e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-white outline-none focus:border-[#FA4616]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-aurora-text-secondary block mb-1">Location / City</label>
                    <input
                      type="text"
                      value={profile.personalInfo.location}
                      onChange={e => updatePersonalInfo('location', e.target.value)}
                      placeholder="e.g. Bengaluru, India"
                      className="w-full p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-white outline-none focus:border-[#FA4616]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-aurora-text-secondary block mb-1">Portfolio / Website URL</label>
                    <input
                      type="text"
                      value={profile.personalInfo.portfolio}
                      onChange={e => updatePersonalInfo('portfolio', e.target.value)}
                      placeholder="e.g. https://portfolio.dev"
                      className="w-full p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-white outline-none focus:border-[#FA4616]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-aurora-text-secondary block mb-1">LinkedIn Profile</label>
                    <input
                      type="text"
                      value={profile.personalInfo.linkedin}
                      onChange={e => updatePersonalInfo('linkedin', e.target.value)}
                      placeholder="e.g. linkedin.com/in/username"
                      className="w-full p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-white outline-none focus:border-[#FA4616]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-aurora-text-secondary block mb-1">GitHub Profile</label>
                    <input
                      type="text"
                      value={profile.personalInfo.github}
                      onChange={e => updatePersonalInfo('github', e.target.value)}
                      placeholder="e.g. github.com/username"
                      className="w-full p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-white outline-none focus:border-[#FA4616]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-bold text-aurora-text-secondary block mb-1">LeetCode / Coding Profile Handle</label>
                    <input
                      type="text"
                      value={profile.personalInfo.leetcode || ''}
                      onChange={e => updatePersonalInfo('leetcode' as any, e.target.value)}
                      placeholder="e.g. leetcode.com/u/knight_coder"
                      className="w-full p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-white outline-none focus:border-[#FA4616]"
                    />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#FA4616]" />
                    <span>2. Professional Summary & Career Objective</span>
                  </h4>
                  <button
                    onClick={handleAiPolishSummary}
                    className="flex items-center gap-1 text-[11px] font-bold text-[#FA4616] hover:underline"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Polish</span>
                  </button>
                </div>
                <textarea
                  value={profile.summary}
                  onChange={e => updateSummary(e.target.value)}
                  rows={4}
                  placeholder="Summarize your engineering background, core tech stack, and quantifiable achievements..."
                  className="w-full p-3 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-white placeholder:text-aurora-text-secondary outline-none focus:border-[#FA4616] leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* TAB 2: Technical Skills */}
          {activeEditorTab === 'skills' && (
            <div className="p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-3.5">
              <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#FA4616]" />
                <span>Technical Skills & Proficiencies</span>
              </h4>
              <p className="text-[11px] text-aurora-text-secondary">Separate technologies with commas. Parsers map skills directly to job descriptions.</p>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[11px] font-bold text-aurora-text-secondary block mb-1">Programming Languages</label>
                  <input
                    type="text"
                    value={profile.skills.languages.join(', ')}
                    onChange={e => setProfile(prev => ({
                      ...prev,
                      skills: { ...prev.skills, languages: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }
                    }))}
                    placeholder="e.g. C++, Java, Python, JavaScript, TypeScript, SQL"
                    className="w-full p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-white outline-none focus:border-[#FA4616]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-aurora-text-secondary block mb-1">Frameworks & Libraries</label>
                  <input
                    type="text"
                    value={profile.skills.frameworks.join(', ')}
                    onChange={e => setProfile(prev => ({
                      ...prev,
                      skills: { ...prev.skills, frameworks: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }
                    }))}
                    placeholder="e.g. React.js, Next.js, Node.js, Express, Spring Boot, FastAPI, Tailwind CSS"
                    className="w-full p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-white outline-none focus:border-[#FA4616]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-aurora-text-secondary block mb-1">Databases & Cloud Architecture</label>
                  <input
                    type="text"
                    value={profile.skills.databasesAndCloud.join(', ')}
                    onChange={e => setProfile(prev => ({
                      ...prev,
                      skills: { ...prev.skills, databasesAndCloud: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }
                    }))}
                    placeholder="e.g. PostgreSQL, MongoDB, Redis, MySQL, AWS (S3, EC2), Firebase, Docker"
                    className="w-full p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-white outline-none focus:border-[#FA4616]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-aurora-text-secondary block mb-1">Developer Tools & DevOps</label>
                  <input
                    type="text"
                    value={profile.skills.toolsAndDevops.join(', ')}
                    onChange={e => setProfile(prev => ({
                      ...prev,
                      skills: { ...prev.skills, toolsAndDevops: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }
                    }))}
                    placeholder="e.g. Git, GitHub Actions, Postman, Linux, Docker, Vite, Jest, Kubernetes"
                    className="w-full p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-white outline-none focus:border-[#FA4616]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-aurora-text-secondary block mb-1">Core Computer Science Fundamentals</label>
                  <input
                    type="text"
                    value={(profile.skills.coreCs || []).join(', ')}
                    onChange={e => setProfile(prev => ({
                      ...prev,
                      skills: { ...prev.skills, coreCs: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }
                    }))}
                    placeholder="e.g. Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, OOP"
                    className="w-full p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-white outline-none focus:border-[#FA4616]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-aurora-text-secondary block mb-1">Soft Skills & Methodologies</label>
                  <input
                    type="text"
                    value={profile.skills.softSkills.join(', ')}
                    onChange={e => setProfile(prev => ({
                      ...prev,
                      skills: { ...prev.skills, softSkills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }
                    }))}
                    placeholder="e.g. Agile/Scrum, Problem Solving, Technical Documentation, System Architecture"
                    className="w-full p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-white outline-none focus:border-[#FA4616]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Work Experience & Internships */}
          {activeEditorTab === 'experience' && (
            <div className="p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#FA4616]" />
                  <span>Work Experience & Internships</span>
                </h4>
                <button
                  onClick={handleAddExperience}
                  className="flex items-center gap-1 text-[11px] font-bold text-[#FA4616] hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Experience</span>
                </button>
              </div>

              <div className="space-y-4">
                {profile.experience.map((exp, idx) => (
                  <div key={exp.id} className="p-4 rounded-xl bg-aurora-bg-surface border border-aurora-border space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Experience #{idx + 1}</span>
                      <button
                        onClick={() => handleRemoveExperience(exp.id)}
                        className="text-rose-400 hover:text-rose-300 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Job Title (e.g. SDE Intern)"
                        value={exp.role}
                        onChange={e => {
                          const val = e.target.value;
                          setProfile(prev => ({
                            ...prev,
                            experience: prev.experience.map(x => x.id === exp.id ? { ...x, role: val } : x)
                          }));
                        }}
                        className="p-2.5 rounded-lg bg-aurora-bg-primary border border-aurora-border text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Company / Organization Name"
                        value={exp.company}
                        onChange={e => {
                          const val = e.target.value;
                          setProfile(prev => ({
                            ...prev,
                            experience: prev.experience.map(x => x.id === exp.id ? { ...x, company: val } : x)
                          }));
                        }}
                        className="p-2.5 rounded-lg bg-aurora-bg-primary border border-aurora-border text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Location (e.g. Bengaluru, India)"
                        value={exp.location}
                        onChange={e => {
                          const val = e.target.value;
                          setProfile(prev => ({
                            ...prev,
                            experience: prev.experience.map(x => x.id === exp.id ? { ...x, location: val } : x)
                          }));
                        }}
                        className="p-2.5 rounded-lg bg-aurora-bg-primary border border-aurora-border text-xs text-white"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Dates (e.g. Jun 2024 - Dec 2024)"
                          value={`${exp.startDate}${exp.endDate ? ` – ${exp.endDate}` : ''}`}
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              experience: prev.experience.map(x => x.id === exp.id ? { ...x, startDate: val, endDate: '' } : x)
                            }));
                          }}
                          className="flex-1 p-2.5 rounded-lg bg-aurora-bg-primary border border-aurora-border text-xs text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-aurora-text-secondary block mb-1">
                        Accomplishments & Metrics (one bullet per line)
                      </label>
                      <textarea
                        placeholder="• Architected microservice improving latency by 35%...\n• Spearheaded database indexing saving 150ms per request..."
                        value={exp.highlights.join('\n')}
                        onChange={e => {
                          const lines = e.target.value.split('\n');
                          setProfile(prev => ({
                            ...prev,
                            experience: prev.experience.map(x => x.id === exp.id ? { ...x, highlights: lines } : x)
                          }));
                        }}
                        rows={3}
                        className="w-full p-2.5 rounded-lg bg-aurora-bg-primary border border-aurora-border text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Key Projects */}
          {activeEditorTab === 'projects' && (
            <div className="p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#FA4616]" />
                  <span>Technical & Engineering Projects</span>
                </h4>
                <button
                  onClick={handleAddProject}
                  className="flex items-center gap-1 text-[11px] font-bold text-[#FA4616] hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="space-y-4">
                {profile.projects.map((proj, idx) => (
                  <div key={proj.id} className="p-4 rounded-xl bg-aurora-bg-surface border border-aurora-border space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Project #{idx + 1}</span>
                      <button
                        onClick={() => handleRemoveProject(proj.id)}
                        className="text-rose-400 hover:text-rose-300 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Project Title (e.g. Distributed Task Orchestrator)"
                        value={proj.title}
                        onChange={e => {
                          const val = e.target.value;
                          setProfile(prev => ({
                            ...prev,
                            projects: prev.projects.map(p => p.id === proj.id ? { ...p, title: val } : p)
                          }));
                        }}
                        className="p-2.5 rounded-lg bg-aurora-bg-primary border border-aurora-border text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Tech Stack (comma separated: React, Node.js, Redis)"
                        value={proj.techStack.join(', ')}
                        onChange={e => {
                          const val = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                          setProfile(prev => ({
                            ...prev,
                            projects: prev.projects.map(p => p.id === proj.id ? { ...p, techStack: val } : p)
                          }));
                        }}
                        className="p-2.5 rounded-lg bg-aurora-bg-primary border border-aurora-border text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Live Demo URL (optional)"
                        value={proj.liveUrl || ''}
                        onChange={e => {
                          const val = e.target.value;
                          setProfile(prev => ({
                            ...prev,
                            projects: prev.projects.map(p => p.id === proj.id ? { ...p, liveUrl: val } : p)
                          }));
                        }}
                        className="p-2.5 rounded-lg bg-aurora-bg-primary border border-aurora-border text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="GitHub Repository URL"
                        value={proj.githubUrl || ''}
                        onChange={e => {
                          const val = e.target.value;
                          setProfile(prev => ({
                            ...prev,
                            projects: prev.projects.map(p => p.id === proj.id ? { ...p, githubUrl: val } : p)
                          }));
                        }}
                        className="p-2.5 rounded-lg bg-aurora-bg-primary border border-aurora-border text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-aurora-text-secondary block mb-1">
                        Impact Bullet Points (one per line)
                      </label>
                      <textarea
                        placeholder="• Implemented asynchronous queues handling 1,500 ops/sec with exponential backoff...\n• Built real-time WebSocket broadcast dashboard with sub-50ms latency..."
                        value={proj.highlights.join('\n')}
                        onChange={e => {
                          const lines = e.target.value.split('\n');
                          setProfile(prev => ({
                            ...prev,
                            projects: prev.projects.map(p => p.id === proj.id ? { ...p, highlights: lines } : p)
                          }));
                        }}
                        rows={3}
                        className="w-full p-2.5 rounded-lg bg-aurora-bg-primary border border-aurora-border text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Education */}
          {activeEditorTab === 'education' && (
            <div className="p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#FA4616]" />
                  <span>Education & Academics</span>
                </h4>
                <button
                  onClick={handleAddEducation}
                  className="flex items-center gap-1 text-[11px] font-bold text-[#FA4616] hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Education</span>
                </button>
              </div>

              <div className="space-y-4">
                {profile.education.map((edu, idx) => (
                  <div key={edu.id} className="p-4 rounded-xl bg-aurora-bg-surface border border-aurora-border space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Degree #{idx + 1}</span>
                      <button
                        onClick={() => handleRemoveEducation(edu.id)}
                        className="text-rose-400 hover:text-rose-300 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Degree (e.g. B.Tech Computer Science)"
                        value={edu.degree}
                        onChange={e => {
                          const val = e.target.value;
                          setProfile(prev => ({
                            ...prev,
                            education: prev.education.map(x => x.id === edu.id ? { ...x, degree: val } : x)
                          }));
                        }}
                        className="p-2.5 rounded-lg bg-aurora-bg-primary border border-aurora-border text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Institution / University Name"
                        value={edu.institution}
                        onChange={e => {
                          const val = e.target.value;
                          setProfile(prev => ({
                            ...prev,
                            education: prev.education.map(x => x.id === edu.id ? { ...x, institution: val } : x)
                          }));
                        }}
                        className="p-2.5 rounded-lg bg-aurora-bg-primary border border-aurora-border text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Location (e.g. India)"
                        value={edu.location}
                        onChange={e => {
                          const val = e.target.value;
                          setProfile(prev => ({
                            ...prev,
                            education: prev.education.map(x => x.id === edu.id ? { ...x, location: val } : x)
                          }));
                        }}
                        className="p-2.5 rounded-lg bg-aurora-bg-primary border border-aurora-border text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="CGPA / Grade (e.g. CGPA: 8.8 / 10.0)"
                        value={edu.grade}
                        onChange={e => {
                          const val = e.target.value;
                          setProfile(prev => ({
                            ...prev,
                            education: prev.education.map(x => x.id === edu.id ? { ...x, grade: val } : x)
                          }));
                        }}
                        className="p-2.5 rounded-lg bg-aurora-bg-primary border border-aurora-border text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Graduation Period (e.g. 2021 – 2025)"
                        value={`${edu.startDate}${edu.endDate ? ` – ${edu.endDate}` : ''}`}
                        onChange={e => {
                          const val = e.target.value;
                          setProfile(prev => ({
                            ...prev,
                            education: prev.education.map(x => x.id === edu.id ? { ...x, startDate: val, endDate: '' } : x)
                          }));
                        }}
                        className="sm:col-span-2 p-2.5 rounded-lg bg-aurora-bg-primary border border-aurora-border text-xs text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: Achievements, Certifications & Extracurriculars */}
          {activeEditorTab === 'achievements' && (
            <div className="space-y-4">
              {/* Certifications */}
              <div className="p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-[#FA4616]" />
                    <span>Certifications & Verified Credentials</span>
                  </h4>
                  <button
                    onClick={handleAddCertification}
                    className="flex items-center gap-1 text-[11px] font-bold text-[#FA4616] hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Certification</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {profile.certifications.map((cert, idx) => (
                    <div key={cert.id} className="p-3.5 rounded-xl bg-aurora-bg-surface border border-aurora-border space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">Certification #{idx + 1}</span>
                        <button
                          onClick={() => handleRemoveCertification(cert.id)}
                          className="text-rose-400 hover:text-rose-300 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                          type="text"
                          placeholder="Certification Name"
                          value={cert.name}
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              certifications: prev.certifications.map(c => c.id === cert.id ? { ...c, name: val } : c)
                            }));
                          }}
                          className="sm:col-span-2 p-2 rounded-lg bg-aurora-bg-primary border border-aurora-border text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Issuer (e.g. AWS)"
                          value={cert.issuer}
                          onChange={e => {
                            const val = e.target.value;
                            setProfile(prev => ({
                              ...prev,
                              certifications: prev.certifications.map(c => c.id === cert.id ? { ...c, issuer: val } : c)
                            }));
                          }}
                          className="p-2 rounded-lg bg-aurora-bg-primary border border-aurora-border text-xs text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Honors & Achievements */}
              <div className="p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-[#FA4616]" />
                    <span>Honors & Competitive Achievements</span>
                  </h4>
                  <button
                    onClick={handleAddAchievement}
                    className="flex items-center gap-1 text-[11px] font-bold text-[#FA4616] hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {profile.achievements.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={e => {
                          const val = e.target.value;
                          setProfile(prev => ({
                            ...prev,
                            achievements: prev.achievements.map((x, i) => i === idx ? val : x)
                          }));
                        }}
                        className="flex-1 p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-white"
                      />
                      <button
                        onClick={() => handleRemoveAchievement(idx)}
                        className="text-rose-400 hover:text-rose-300 p-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extracurriculars */}
              <div className="p-5 rounded-2xl bg-aurora-bg-elevated border border-aurora-border space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#FA4616]" />
                    <span>Leadership & Extracurricular Activities</span>
                  </h4>
                  <button
                    onClick={handleAddExtracurricular}
                    className="flex items-center gap-1 text-[11px] font-bold text-[#FA4616] hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {(profile.extracurriculars || []).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={e => {
                          const val = e.target.value;
                          setProfile(prev => ({
                            ...prev,
                            extracurriculars: (prev.extracurriculars || []).map((x, i) => i === idx ? val : x)
                          }));
                        }}
                        className="flex-1 p-2.5 rounded-xl bg-aurora-bg-surface border border-aurora-border text-xs text-white"
                      />
                      <button
                        onClick={() => handleRemoveExtracurricular(idx)}
                        className="text-rose-400 hover:text-rose-300 p-2"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live ATS Formatted Preview */}
        <div className="sticky top-20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-aurora-text-secondary flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>Preview: </span>
              <span className="text-[#FA4616] font-bold">
                {TEMPLATE_OPTIONS.find(t => t.id === activeTemplate)?.label}
              </span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              ATS Compliant
            </span>
          </div>

          {/* DYNAMIC TEMPLATE RENDERER */}
          <div
            ref={resumePrintRef}
            className="w-full bg-white text-gray-900 rounded-lg shadow-2xl transition-all"
            style={{ minHeight: '842px', color: '#111827' }}
          >
            {/* TEMPLATE 1: MODERN TECH */}
            {activeTemplate === 'modern-tech' && (
              <div className="p-8 sm:p-10 font-sans text-[11px] leading-relaxed">
                {/* Header */}
                <div className="border-b-2 border-[#FA4616] pb-3 mb-4">
                  <div className="flex justify-between items-baseline">
                    <h1 className="text-2xl font-black tracking-tight text-gray-950 uppercase">
                      {profile.personalInfo.fullName}
                    </h1>
                    <span className="text-xs font-bold text-[#FA4616]">
                      {profile.personalInfo.title}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-600 mt-2 font-medium">
                    {profile.personalInfo.email && <span>{profile.personalInfo.email}</span>}
                    {profile.personalInfo.phone && <span>• {profile.personalInfo.phone}</span>}
                    {profile.personalInfo.location && <span>• {profile.personalInfo.location}</span>}
                    {profile.personalInfo.linkedin && <span className="text-[#FA4616] font-bold">• {profile.personalInfo.linkedin}</span>}
                    {profile.personalInfo.github && <span className="text-gray-800 font-bold">• {profile.personalInfo.github}</span>}
                    {profile.personalInfo.portfolio && <span className="text-blue-600 font-bold">• {profile.personalInfo.portfolio}</span>}
                    {profile.personalInfo.leetcode && <span className="text-amber-700 font-bold">• {profile.personalInfo.leetcode}</span>}
                  </div>
                </div>

                {/* Summary */}
                {profile.summary && (
                  <div className="mb-4">
                    <h2 className="text-xs font-black uppercase tracking-wider text-gray-950 border-l-4 border-[#FA4616] pl-2 mb-1.5">
                      Professional Summary
                    </h2>
                    <p className="text-gray-700 text-justify text-[10.5px]">
                      {profile.summary}
                    </p>
                  </div>
                )}

                {/* Technical Skills */}
                <div className="mb-4">
                  <h2 className="text-xs font-black uppercase tracking-wider text-gray-950 border-l-4 border-[#FA4616] pl-2 mb-1.5">
                    Technical Skills
                  </h2>
                  <div className="space-y-1 text-[10.5px]">
                    <div><strong className="text-gray-900">Languages:</strong> {profile.skills.languages.join(', ')}</div>
                    <div><strong className="text-gray-900">Frameworks & Libraries:</strong> {profile.skills.frameworks.join(', ')}</div>
                    <div><strong className="text-gray-900">Databases & Cloud:</strong> {profile.skills.databasesAndCloud.join(', ')}</div>
                    <div><strong className="text-gray-900">Developer Tools:</strong> {profile.skills.toolsAndDevops.join(', ')}</div>
                    {profile.skills.coreCs && profile.skills.coreCs.length > 0 && (
                      <div><strong className="text-gray-900">Core CS:</strong> {profile.skills.coreCs.join(', ')}</div>
                    )}
                  </div>
                </div>

                {/* Experience */}
                {profile.experience && profile.experience.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xs font-black uppercase tracking-wider text-gray-950 border-l-4 border-[#FA4616] pl-2 mb-2">
                      Work Experience & Internships
                    </h2>
                    <div className="space-y-3">
                      {profile.experience.map(e => (
                        <div key={e.id}>
                          <div className="flex justify-between items-baseline font-bold text-gray-950">
                            <span>{e.role} — <span className="text-[#FA4616] font-semibold">{e.company}</span></span>
                            <span className="text-[10px] text-gray-500 font-normal">{e.startDate} – {e.endDate}</span>
                          </div>
                          <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-gray-700 text-[10.5px]">
                            {e.highlights.map((h, i) => (
                              <li key={i}>{h.replace(/^•\s*/, '')}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {profile.projects && profile.projects.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xs font-black uppercase tracking-wider text-gray-950 border-l-4 border-[#FA4616] pl-2 mb-2">
                      Key Technical Projects
                    </h2>
                    <div className="space-y-3">
                      {profile.projects.map(p => (
                        <div key={p.id}>
                          <div className="flex justify-between items-baseline font-bold text-gray-950">
                            <span>
                              {p.title}
                              <span className="font-normal text-[10px] text-gray-500 ml-1.5">
                                [{p.techStack.join(', ')}]
                              </span>
                            </span>
                            {p.liveUrl && (
                              <span className="text-[10px] text-blue-600 font-normal underline">{p.liveUrl.replace('https://', '')}</span>
                            )}
                          </div>
                          <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-gray-700 text-[10.5px]">
                            {p.highlights.map((h, i) => (
                              <li key={i}>{h.replace(/^•\s*/, '')}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {profile.education && profile.education.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xs font-black uppercase tracking-wider text-gray-950 border-l-4 border-[#FA4616] pl-2 mb-1.5">
                      Education
                    </h2>
                    {profile.education.map(ed => (
                      <div key={ed.id} className="flex justify-between text-[10.5px]">
                        <div>
                          <strong className="text-gray-900">{ed.degree}</strong> — {ed.institution}
                        </div>
                        <div className="text-gray-600 font-semibold">{ed.grade} ({ed.startDate}–{ed.endDate})</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Certifications & Achievements */}
                {(profile.certifications?.length > 0 || profile.achievements?.length > 0) && (
                  <div>
                    <h2 className="text-xs font-black uppercase tracking-wider text-gray-950 border-l-4 border-[#FA4616] pl-2 mb-1.5">
                      Certifications & Key Achievements
                    </h2>
                    <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-700 text-[10.5px]">
                      {profile.certifications.map(c => (
                        <li key={c.id}><strong>{c.name}</strong> — {c.issuer} ({c.date})</li>
                      ))}
                      {profile.achievements.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* TEMPLATE 2: CLASSIC EXECUTIVE (HARVARD SERIF) */}
            {activeTemplate === 'classic-executive' && (
              <div className="p-8 sm:p-10 font-serif text-[11px] leading-relaxed">
                {/* Centered Academic Header */}
                <div className="border-b-2 border-black pb-2 mb-4 text-center">
                  <h1 className="text-2xl font-bold uppercase tracking-widest text-black">
                    {profile.personalInfo.fullName}
                  </h1>
                  <p className="text-xs font-semibold text-gray-800 italic mt-0.5">
                    {profile.personalInfo.title}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-1.5 text-[10px] text-gray-700 mt-1.5">
                    <span>{profile.personalInfo.email}</span>
                    <span>◆</span>
                    <span>{profile.personalInfo.phone}</span>
                    <span>◆</span>
                    <span>{profile.personalInfo.location}</span>
                    {profile.personalInfo.linkedin && (
                      <>
                        <span>◆</span>
                        <span>{profile.personalInfo.linkedin}</span>
                      </>
                    )}
                    {profile.personalInfo.github && (
                      <>
                        <span>◆</span>
                        <span>{profile.personalInfo.github}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Summary */}
                {profile.summary && (
                  <div className="mb-4">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-0.5 mb-1.5 text-center">
                      Professional Summary
                    </h2>
                    <p className="text-gray-800 text-justify text-[10.5px]">
                      {profile.summary}
                    </p>
                  </div>
                )}

                {/* Education at Top for Classic Format */}
                {profile.education && profile.education.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-0.5 mb-1.5 text-center">
                      Education
                    </h2>
                    {profile.education.map(ed => (
                      <div key={ed.id} className="flex justify-between text-[10.5px]">
                        <div>
                          <strong>{ed.institution}</strong>, {ed.location} — <em>{ed.degree}</em>
                        </div>
                        <div className="text-gray-800 font-bold">{ed.startDate}–{ed.endDate} | {ed.grade}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Technical Skills */}
                <div className="mb-4">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-0.5 mb-1.5 text-center">
                    Technical Proficiencies
                  </h2>
                  <div className="space-y-0.5 text-[10.5px]">
                    <div><strong>Languages:</strong> {profile.skills.languages.join(', ')}</div>
                    <div><strong>Frameworks & Libraries:</strong> {profile.skills.frameworks.join(', ')}</div>
                    <div><strong>Databases & Cloud:</strong> {profile.skills.databasesAndCloud.join(', ')}</div>
                    <div><strong>Developer Tools:</strong> {profile.skills.toolsAndDevops.join(', ')}</div>
                  </div>
                </div>

                {/* Experience */}
                {profile.experience && profile.experience.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-0.5 mb-1.5 text-center">
                      Professional Experience
                    </h2>
                    <div className="space-y-3">
                      {profile.experience.map(e => (
                        <div key={e.id}>
                          <div className="flex justify-between font-bold text-black">
                            <span>{e.company}, {e.location} — <em>{e.role}</em></span>
                            <span className="text-[10.5px] italic font-normal">{e.startDate} – {e.endDate}</span>
                          </div>
                          <ul className="list-disc list-outside ml-4 mt-0.5 space-y-0.5 text-gray-800 text-[10.5px]">
                            {e.highlights.map((h, i) => (
                              <li key={i}>{h.replace(/^•\s*/, '')}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {profile.projects && profile.projects.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-0.5 mb-1.5 text-center">
                      Technical Projects
                    </h2>
                    <div className="space-y-2.5">
                      {profile.projects.map(p => (
                        <div key={p.id}>
                          <div className="flex justify-between font-bold text-black">
                            <span>{p.title} <span className="font-normal italic text-[10px]">({p.techStack.join(', ')})</span></span>
                          </div>
                          <ul className="list-disc list-outside ml-4 mt-0.5 space-y-0.5 text-gray-800 text-[10.5px]">
                            {p.highlights.map((h, i) => (
                              <li key={i}>{h.replace(/^•\s*/, '')}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Honors & Certs */}
                {profile.achievements && profile.achievements.length > 0 && (
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-0.5 mb-1 text-center">
                      Honors & Awards
                    </h2>
                    <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-800 text-[10.5px]">
                      {profile.achievements.map((a, i) => <li key={i}>{a}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* TEMPLATE 3: MINIMALIST CLEAN */}
            {activeTemplate === 'minimal-clean' && (
              <div className="p-8 sm:p-10 font-sans text-[11px] leading-relaxed text-gray-900">
                {/* Header */}
                <div className="border-b border-gray-300 pb-3 mb-4">
                  <h1 className="text-2xl font-light tracking-wide text-black uppercase">
                    <span className="font-bold">{profile.personalInfo.fullName.split(' ')[0]}</span>{' '}
                    {profile.personalInfo.fullName.split(' ').slice(1).join(' ')}
                  </h1>
                  <p className="text-xs text-gray-600 tracking-wider uppercase mt-0.5">
                    {profile.personalInfo.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-500 mt-2 font-mono">
                    <span>{profile.personalInfo.email}</span>
                    <span>/</span>
                    <span>{profile.personalInfo.phone}</span>
                    <span>/</span>
                    <span>{profile.personalInfo.location}</span>
                    {profile.personalInfo.linkedin && (
                      <>
                        <span>/</span>
                        <span>{profile.personalInfo.linkedin}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Summary */}
                {profile.summary && (
                  <div className="mb-4">
                    <h2 className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1">
                      // Summary
                    </h2>
                    <p className="text-gray-700 text-[10.5px]">
                      {profile.summary}
                    </p>
                  </div>
                )}

                {/* Skills */}
                <div className="mb-4">
                  <h2 className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1">
                    // Skills & Technologies
                  </h2>
                  <div className="space-y-0.5 text-[10.5px]">
                    <div><strong>Languages:</strong> {profile.skills.languages.join(' • ')}</div>
                    <div><strong>Frameworks:</strong> {profile.skills.frameworks.join(' • ')}</div>
                    <div><strong>Cloud & DB:</strong> {profile.skills.databasesAndCloud.join(' • ')}</div>
                    <div><strong>Tools:</strong> {profile.skills.toolsAndDevops.join(' • ')}</div>
                  </div>
                </div>

                {/* Experience */}
                {profile.experience && profile.experience.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1.5">
                      // Experience
                    </h2>
                    <div className="space-y-3">
                      {profile.experience.map(e => (
                        <div key={e.id}>
                          <div className="flex justify-between items-baseline font-medium text-black">
                            <span className="font-bold">{e.role} <span className="text-gray-500 font-normal">at {e.company}</span></span>
                            <span className="text-[10px] text-gray-400 font-mono">{e.startDate} – {e.endDate}</span>
                          </div>
                          <ul className="list-disc list-outside ml-4 mt-0.5 space-y-0.5 text-gray-600 text-[10.5px]">
                            {e.highlights.map((h, i) => (
                              <li key={i}>{h.replace(/^•\s*/, '')}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {profile.projects && profile.projects.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1.5">
                      // Projects
                    </h2>
                    <div className="space-y-2.5">
                      {profile.projects.map(p => (
                        <div key={p.id}>
                          <div className="flex justify-between items-baseline font-bold text-black">
                            <span>{p.title}</span>
                            <span className="font-mono text-[9.5px] text-gray-400">{p.techStack.join(', ')}</span>
                          </div>
                          <ul className="list-disc list-outside ml-4 mt-0.5 space-y-0.5 text-gray-600 text-[10.5px]">
                            {p.highlights.map((h, i) => (
                              <li key={i}>{h.replace(/^•\s*/, '')}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {profile.education && profile.education.length > 0 && (
                  <div>
                    <h2 className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-1">
                      // Education
                    </h2>
                    {profile.education.map(ed => (
                      <div key={ed.id} className="flex justify-between text-[10.5px] text-gray-700">
                        <div><strong>{ed.degree}</strong>, {ed.institution}</div>
                        <div className="font-mono text-[10px]">{ed.grade} ({ed.startDate}–{ed.endDate})</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TEMPLATE 4: IVY COMPACT (HIGH-DENSITY FAANG) */}
            {activeTemplate === 'ivy-compact' && (
              <div className="p-7 sm:p-8 font-sans text-[10px] leading-tight text-gray-900">
                {/* Compact Navy Header */}
                <div className="border-b-2 border-blue-900 pb-1.5 mb-2.5 text-center">
                  <h1 className="text-xl font-extrabold uppercase tracking-tight text-blue-950">
                    {profile.personalInfo.fullName}
                  </h1>
                  <div className="flex flex-wrap items-center justify-center gap-2 text-[9.5px] text-gray-600 mt-0.5 font-medium">
                    <span>{profile.personalInfo.email}</span>
                    <span>|</span>
                    <span>{profile.personalInfo.phone}</span>
                    <span>|</span>
                    <span>{profile.personalInfo.location}</span>
                    <span>|</span>
                    <span className="font-bold text-blue-800">{profile.personalInfo.linkedin}</span>
                    <span>|</span>
                    <span className="font-bold text-gray-800">{profile.personalInfo.github}</span>
                  </div>
                </div>

                {/* Education Top */}
                {profile.education && profile.education.length > 0 && (
                  <div className="mb-2.5">
                    <h2 className="text-[10px] font-extrabold uppercase tracking-wide text-blue-900 border-b border-blue-900/30 pb-0.5 mb-1">
                      Education
                    </h2>
                    {profile.education.map(ed => (
                      <div key={ed.id} className="flex justify-between text-[9.5px]">
                        <div><strong>{ed.institution}</strong> — {ed.degree}</div>
                        <div className="font-bold text-gray-700">{ed.grade} | {ed.startDate}–{ed.endDate}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Skills */}
                <div className="mb-2.5">
                  <h2 className="text-[10px] font-extrabold uppercase tracking-wide text-blue-900 border-b border-blue-900/30 pb-0.5 mb-1">
                    Technical Skills
                  </h2>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[9.5px]">
                    <div><strong>Languages:</strong> {profile.skills.languages.join(', ')}</div>
                    <div><strong>Frameworks:</strong> {profile.skills.frameworks.join(', ')}</div>
                    <div><strong>Databases & Cloud:</strong> {profile.skills.databasesAndCloud.join(', ')}</div>
                    <div><strong>Tools:</strong> {profile.skills.toolsAndDevops.join(', ')}</div>
                  </div>
                </div>

                {/* Experience */}
                {profile.experience && profile.experience.length > 0 && (
                  <div className="mb-2.5">
                    <h2 className="text-[10px] font-extrabold uppercase tracking-wide text-blue-900 border-b border-blue-900/30 pb-0.5 mb-1">
                      Work Experience
                    </h2>
                    <div className="space-y-2">
                      {profile.experience.map(e => (
                        <div key={e.id}>
                          <div className="flex justify-between font-bold text-gray-900 text-[9.5px]">
                            <span>{e.role} <span className="font-normal text-gray-700">| {e.company}</span></span>
                            <span className="font-normal text-gray-500">{e.startDate} – {e.endDate}</span>
                          </div>
                          <ul className="list-disc list-outside ml-3.5 mt-0.5 space-y-0.5 text-gray-700 text-[9.5px]">
                            {e.highlights.map((h, i) => (
                              <li key={i}>{h.replace(/^•\s*/, '')}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {profile.projects && profile.projects.length > 0 && (
                  <div className="mb-2.5">
                    <h2 className="text-[10px] font-extrabold uppercase tracking-wide text-blue-900 border-b border-blue-900/30 pb-0.5 mb-1">
                      Projects
                    </h2>
                    <div className="space-y-1.5">
                      {profile.projects.map(p => (
                        <div key={p.id}>
                          <div className="flex justify-between font-bold text-gray-900 text-[9.5px]">
                            <span>{p.title} <span className="font-normal text-gray-500">[{p.techStack.join(', ')}]</span></span>
                          </div>
                          <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-gray-700 text-[9.5px]">
                            {p.highlights.map((h, i) => (
                              <li key={i}>{h.replace(/^•\s*/, '')}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {profile.achievements && profile.achievements.length > 0 && (
                  <div>
                    <h2 className="text-[10px] font-extrabold uppercase tracking-wide text-blue-900 border-b border-blue-900/30 pb-0.5 mb-0.5">
                      Key Honors & Achievements
                    </h2>
                    <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-gray-700 text-[9.5px]">
                      {profile.achievements.map((a, i) => <li key={i}>{a}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* TEMPLATE 5: TWO-COLUMN SIDEBAR */}
            {activeTemplate === 'two-column-sidebar' && (
              <div className="grid grid-cols-12 min-h-[842px] font-sans text-[10.5px]">
                {/* Left Column Sidebar (4 cols) */}
                <div className="col-span-4 bg-slate-50 border-r border-slate-200 p-6 space-y-4">
                  {/* Avatar Initial / Name */}
                  <div className="border-b border-slate-200 pb-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-white font-extrabold text-base flex items-center justify-center mb-2">
                      {profile.personalInfo.fullName.charAt(0)}
                    </div>
                    <h2 className="font-extrabold text-sm text-slate-900 leading-tight">
                      {profile.personalInfo.fullName}
                    </h2>
                    <p className="text-[10px] font-bold text-[#FA4616] mt-0.5">
                      {profile.personalInfo.title}
                    </p>
                  </div>

                  {/* Contact */}
                  <div className="space-y-1 text-[9.5px] text-slate-700 break-words">
                    <div className="font-bold text-slate-900 uppercase text-[9px] tracking-wider mb-1">Contact</div>
                    <div>{profile.personalInfo.email}</div>
                    <div>{profile.personalInfo.phone}</div>
                    <div>{profile.personalInfo.location}</div>
                    {profile.personalInfo.linkedin && <div className="text-blue-700 font-semibold">{profile.personalInfo.linkedin}</div>}
                    {profile.personalInfo.github && <div className="text-slate-900 font-semibold">{profile.personalInfo.github}</div>}
                    {profile.personalInfo.portfolio && <div className="text-indigo-600">{profile.personalInfo.portfolio}</div>}
                  </div>

                  {/* Skills by category */}
                  <div className="space-y-1.5 text-[9.5px]">
                    <div className="font-bold text-slate-900 uppercase text-[9px] tracking-wider border-b border-slate-200 pb-0.5">Skills</div>
                    <div>
                      <span className="font-bold block text-slate-800">Languages:</span>
                      <span className="text-slate-600">{profile.skills.languages.join(', ')}</span>
                    </div>
                    <div>
                      <span className="font-bold block text-slate-800">Frameworks:</span>
                      <span className="text-slate-600">{profile.skills.frameworks.join(', ')}</span>
                    </div>
                    <div>
                      <span className="font-bold block text-slate-800">Cloud & DB:</span>
                      <span className="text-slate-600">{profile.skills.databasesAndCloud.join(', ')}</span>
                    </div>
                    <div>
                      <span className="font-bold block text-slate-800">Tools:</span>
                      <span className="text-slate-600">{profile.skills.toolsAndDevops.join(', ')}</span>
                    </div>
                  </div>

                  {/* Education */}
                  {profile.education && profile.education.length > 0 && (
                    <div className="space-y-1.5 text-[9.5px]">
                      <div className="font-bold text-slate-900 uppercase text-[9px] tracking-wider border-b border-slate-200 pb-0.5">Education</div>
                      {profile.education.map(ed => (
                        <div key={ed.id}>
                          <div className="font-bold text-slate-900 leading-tight">{ed.degree}</div>
                          <div className="text-slate-600">{ed.institution}</div>
                          <div className="text-[#FA4616] font-bold text-[9px]">{ed.grade} ({ed.startDate}–{ed.endDate})</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Certifications */}
                  {profile.certifications && profile.certifications.length > 0 && (
                    <div className="space-y-1 text-[9.5px]">
                      <div className="font-bold text-slate-900 uppercase text-[9px] tracking-wider border-b border-slate-200 pb-0.5">Certifications</div>
                      {profile.certifications.map(c => (
                        <div key={c.id}>
                          <div className="font-bold text-slate-900">{c.name}</div>
                          <div className="text-slate-500 text-[9px]">{c.issuer} ({c.date})</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Column Main Panel (8 cols) */}
                <div className="col-span-8 p-6 space-y-4">
                  {/* Summary */}
                  {profile.summary && (
                    <div>
                      <h3 className="font-extrabold uppercase text-[11px] text-slate-900 tracking-wider border-b-2 border-slate-900 pb-0.5 mb-1.5">
                        Professional Summary
                      </h3>
                      <p className="text-slate-700 text-[10px] leading-relaxed">
                        {profile.summary}
                      </p>
                    </div>
                  )}

                  {/* Experience */}
                  {profile.experience && profile.experience.length > 0 && (
                    <div>
                      <h3 className="font-extrabold uppercase text-[11px] text-slate-900 tracking-wider border-b-2 border-slate-900 pb-0.5 mb-2">
                        Work Experience
                      </h3>
                      <div className="space-y-3">
                        {profile.experience.map(e => (
                          <div key={e.id}>
                            <div className="flex justify-between items-baseline font-bold text-slate-900 text-[10.5px]">
                              <span>{e.role} — <span className="text-[#FA4616] font-semibold">{e.company}</span></span>
                              <span className="text-[9.5px] text-slate-500 font-normal">{e.startDate} – {e.endDate}</span>
                            </div>
                            <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-slate-700 text-[10px]">
                              {e.highlights.map((h, i) => (
                                <li key={i}>{h.replace(/^•\s*/, '')}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Projects */}
                  {profile.projects && profile.projects.length > 0 && (
                    <div>
                      <h3 className="font-extrabold uppercase text-[11px] text-slate-900 tracking-wider border-b-2 border-slate-900 pb-0.5 mb-2">
                        Technical Projects
                      </h3>
                      <div className="space-y-3">
                        {profile.projects.map(p => (
                          <div key={p.id}>
                            <div className="flex justify-between items-baseline font-bold text-slate-900 text-[10.5px]">
                              <span>{p.title} <span className="font-normal text-[9.5px] text-slate-500">[{p.techStack.join(', ')}]</span></span>
                            </div>
                            <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-slate-700 text-[10px]">
                              {p.highlights.map((h, i) => (
                                <li key={i}>{h.replace(/^•\s*/, '')}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Achievements */}
                  {profile.achievements && profile.achievements.length > 0 && (
                    <div>
                      <h3 className="font-extrabold uppercase text-[11px] text-slate-900 tracking-wider border-b-2 border-slate-900 pb-0.5 mb-1.5">
                        Key Honors & Achievements
                      </h3>
                      <ul className="list-disc list-outside ml-4 space-y-0.5 text-slate-700 text-[10px]">
                        {profile.achievements.map((a, i) => <li key={i}>{a}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
