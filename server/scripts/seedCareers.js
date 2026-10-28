import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { CareerTrack } from '../models/CareerTrack.js';
import { LearningResource } from '../models/LearningResource.js';
import { GuidedProject } from '../models/GuidedProject.js';
import { Certification } from '../models/Certification.js';
import { JobListing } from '../models/JobListing.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/seekhsetu_db';

const SEED_CAREER_TRACKS = [
  {
    slug: 'fullstack-web',
    title: 'Full Stack Web Development',
    category: 'Software Engineering',
    icon: 'Layers',
    accentColor: '#FA4616',
    shortDescription: 'Modern web engineering across React 19, Node.js/Express, relational & document databases, and cloud deployments.',
    overview: 'Full Stack Developers architect end-to-end applications from dynamic reactive user interfaces down to high-throughput backend APIs, caching layers, database schemas, and continuous delivery pipelines.',
    marketDemand: 'Extremely High',
    averageSalary: { fresher: '₹6.5–14 LPA', mid: '₹16–28 LPA', senior: '₹30–55+ LPA' },
    commonJobRoles: ['Full Stack Software Engineer', 'MERN Stack Developer', 'Software Engineer (Web)'],
    prerequisites: ['Basic programming fundamentals', 'HTML5 / CSS3 basics', 'Logical reasoning'],
    skills: {
      core: ['TypeScript', 'React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'REST APIs', 'Git'],
      recommended: ['Next.js', 'Tailwind CSS', 'Redis', 'Docker', 'JWT Authentication'],
      tools: ['VS Code', 'Postman', 'Vite', 'npm / pnpm', 'GitHub Actions']
    },
    totalEstimatedHours: 150,
    displayOrder: 1,
    isPublished: true
  },
  {
    slug: 'frontend',
    title: 'Frontend Engineering',
    category: 'Software Engineering',
    icon: 'Monitor',
    accentColor: '#38BDF8',
    shortDescription: 'Craft blazing-fast, accessible, responsive user interfaces using React, Next.js, TypeScript, and modern CSS.',
    overview: 'Frontend Engineers translate complex product specifications into interactive, accessible, and performant web applications.',
    marketDemand: 'Extremely High',
    averageSalary: { fresher: '₹6–12 LPA', mid: '₹14–24 LPA', senior: '₹26–48+ LPA' },
    commonJobRoles: ['Frontend Developer', 'UI Engineer', 'React Developer'],
    prerequisites: ['HTML/CSS basics', 'Basic programming logic'],
    skills: {
      core: ['JavaScript ES6+', 'TypeScript', 'React.js', 'Tailwind CSS', 'HTML5 Semantic Web', 'Git'],
      recommended: ['Next.js', 'Zustand / Redux', 'Framer Motion', 'Web Performance'],
      tools: ['Vite', 'Chrome DevTools', 'Figma', 'Lighthouse']
    },
    totalEstimatedHours: 130,
    displayOrder: 2,
    isPublished: true
  },
  {
    slug: 'backend',
    title: 'Backend Engineering',
    category: 'Software Engineering',
    icon: 'Server',
    accentColor: '#10B981',
    shortDescription: 'Build high-performance distributed microservices, robust REST & GraphQL APIs, caching layers, and database clusters.',
    overview: 'Backend Engineers architect the server-side brain of applications. They handle data integrity, business logic, authentication, system throughput, and database reliability.',
    marketDemand: 'Extremely High',
    averageSalary: { fresher: '₹6.5–13 LPA', mid: '₹15–26 LPA', senior: '₹28–52+ LPA' },
    commonJobRoles: ['Backend Software Engineer', 'API Developer', 'Node.js Engineer'],
    prerequisites: ['Basic programming', 'Understanding of client-server model'],
    skills: {
      core: ['Node.js / Express', 'PostgreSQL / MySQL', 'RESTful API Design', 'Data Structures & Algorithms', 'Git'],
      recommended: ['Redis', 'Docker', 'Kafka / RabbitMQ', 'System Design fundamentals'],
      tools: ['Postman', 'Docker Desktop', 'DBeaver', 'Linux Bash']
    },
    totalEstimatedHours: 140,
    displayOrder: 3,
    isPublished: true
  },
  {
    slug: 'java-enterprise',
    title: 'Java Enterprise Development',
    category: 'Software Engineering',
    icon: 'Coffee',
    accentColor: '#F59E0B',
    shortDescription: 'Enterprise backend development with Java 21, Spring Boot 3, Hibernate/JPA, Microservices architecture, and cloud deployment.',
    overview: 'Java is the backbone of banking, fintech, enterprise cloud platforms, and large-scale global corporations.',
    marketDemand: 'Extremely High',
    averageSalary: { fresher: '₹6–14 LPA', mid: '₹15–28 LPA', senior: '₹28–50+ LPA' },
    commonJobRoles: ['Java Developer', 'Spring Boot Engineer', 'Enterprise Backend Developer'],
    prerequisites: ['OOP concepts', 'Basic math and logic'],
    skills: {
      core: ['Core Java (Java 17/21)', 'OOP Principles', 'Spring Boot 3', 'Spring Data JPA', 'PostgreSQL / Oracle'],
      recommended: ['Spring Security 6', 'Microservices Architecture', 'Docker', 'Kafka'],
      tools: ['IntelliJ IDEA', 'Postman', 'Maven', 'Docker']
    },
    totalEstimatedHours: 150,
    displayOrder: 4,
    isPublished: true
  },
  {
    slug: 'ai-ml',
    title: 'Artificial Intelligence & Machine Learning',
    category: 'Data & AI',
    icon: 'Brain',
    accentColor: '#8B5CF6',
    shortDescription: 'Develop machine learning pipelines, deep learning neural networks, LLM integrations, and MLOps deployment architectures.',
    overview: 'AI/ML Engineers develop algorithms that learn from data to make predictions, automate intelligent decisions, and power generative AI applications.',
    marketDemand: 'Extremely High',
    averageSalary: { fresher: '₹7.5–16 LPA', mid: '₹18–32 LPA', senior: '₹35–65+ LPA' },
    commonJobRoles: ['Machine Learning Engineer', 'AI Engineer', 'Data Scientist (Modeling)'],
    prerequisites: ['Python proficiency', 'Linear algebra, calculus & probability'],
    skills: {
      core: ['Python', 'NumPy & Pandas', 'Scikit-Learn', 'PyTorch / TensorFlow', 'Mathematics for ML'],
      recommended: ['Hugging Face Transformers', 'LangChain', 'RAG Architecture', 'FastAPI'],
      tools: ['Jupyter Notebook', 'Google Colab', 'Docker', 'Git']
    },
    totalEstimatedHours: 160,
    displayOrder: 5,
    isPublished: true
  },
  {
    slug: 'cloud-computing',
    title: 'Cloud Computing & Infrastructure',
    category: 'Cloud & Infrastructure',
    icon: 'Cloud',
    accentColor: '#0EA5E9',
    shortDescription: 'Architect resilient, scalable, cost-efficient cloud infrastructures across Amazon Web Services (AWS), Azure, and Google Cloud.',
    overview: 'Cloud Engineers build, deploy, and manage distributed infrastructure in the cloud with zero downtime.',
    marketDemand: 'Extremely High',
    averageSalary: { fresher: '₹6.5–13 LPA', mid: '₹15–28 LPA', senior: '₹30–55+ LPA' },
    commonJobRoles: ['Cloud Engineer', 'AWS Cloud Architect', 'Cloud Solutions Associate'],
    prerequisites: ['Basic networking concepts (IP, DNS)', 'Linux operating systems'],
    skills: {
      core: ['AWS Core Services (EC2, S3, VPC, IAM, RDS)', 'Linux Administration', 'Networking', 'Terraform'],
      recommended: ['Serverless (Lambda, API Gateway)', 'CloudWatch', 'Cost Optimization'],
      tools: ['AWS Console', 'AWS CLI', 'Terraform', 'Linux Bash']
    },
    totalEstimatedHours: 130,
    displayOrder: 6,
    isPublished: true
  },
  {
    slug: 'devops-sre',
    title: 'DevOps & Site Reliability Engineering',
    category: 'Cloud & Infrastructure',
    icon: 'GitBranch',
    accentColor: '#14B8A6',
    shortDescription: 'Master CI/CD pipelines, Docker containerization, Kubernetes cluster orchestration, Terraform, and monitoring systems.',
    overview: 'DevOps & SRE engineers bridge development and operations to automate releases and maintain 99.99% system uptime.',
    marketDemand: 'Extremely High',
    averageSalary: { fresher: '₹7–15 LPA', mid: '₹16–30 LPA', senior: '₹32–60+ LPA' },
    commonJobRoles: ['DevOps Engineer', 'Site Reliability Engineer (SRE)', 'Platform Engineer'],
    prerequisites: ['Linux fundamentals', 'Basic scripting (Bash/Python)'],
    skills: {
      core: ['Docker', 'Kubernetes (K8s)', 'CI/CD (GitHub Actions)', 'Linux & Bash', 'Git'],
      recommended: ['Terraform', 'Prometheus & Grafana', 'ArgoCD', 'Helm'],
      tools: ['Docker Desktop', 'kubectl', 'GitHub Actions', 'Prometheus']
    },
    totalEstimatedHours: 150,
    displayOrder: 7,
    isPublished: true
  },
  {
    slug: 'cybersecurity',
    title: 'Cybersecurity & Ethical Hacking',
    category: 'Security',
    icon: 'Shield',
    accentColor: '#EF4444',
    shortDescription: 'Defend systems, analyze network threats, master OWASP Top 10 vulnerabilities, penetration testing, and digital forensics.',
    overview: 'Cybersecurity specialists protect organizations against data breaches, ransomware, and vulnerabilities across networks and web apps.',
    marketDemand: 'Extremely High',
    averageSalary: { fresher: '₹6–13 LPA', mid: '₹14–27 LPA', senior: '₹28–55+ LPA' },
    commonJobRoles: ['Security Analyst', 'SOC Analyst', 'Penetration Tester'],
    prerequisites: ['Networking basics', 'Linux / Windows OS'],
    skills: {
      core: ['Networking & Security Protocols', 'Linux Security', 'OWASP Top 10', 'Burp Suite', 'Wireshark'],
      recommended: ['SIEM (Splunk)', 'Cryptography', 'Python for Security', 'Incident Response'],
      tools: ['Kali Linux', 'Burp Suite', 'Wireshark', 'Nmap', 'Splunk']
    },
    totalEstimatedHours: 140,
    displayOrder: 8,
    isPublished: true
  }
];

export async function seedDatabase() {
  console.log('🔄 Connecting to MongoDB to seed Career Ecosystem data...');
  try {
    await mongoose.connect(MONGO_URI, { dbName: 'seekhsetu_db' });
    console.log('✅ Connected to MongoDB Atlas successfully!');

    // 1. Seed Career Tracks (Upsert)
    console.log('📦 Seeding Career Tracks...');
    for (const track of SEED_CAREER_TRACKS) {
      await CareerTrack.findOneAndUpdate(
        { slug: track.slug },
        track,
        { upsert: true, new: true, runValidators: true }
      );
    }
    const trackCount = await CareerTrack.countDocuments();
    console.log(`✅ Career Tracks synced! Total in DB: ${trackCount}`);

    console.log('🎉 Seed complete!');
  } catch (err) {
    console.error('❌ Error during seeding:', err);
  } finally {
    await mongoose.disconnect().catch(() => {});
  }
}

// Allow standalone execution: node server/scripts/seedCareers.js
if (process.argv[1] && process.argv[1].endsWith('seedCareers.js')) {
  seedDatabase().then(() => process.exit(0));
}
