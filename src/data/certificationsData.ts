import { CertificationItem } from '../types/career';

export const certificationsList: CertificationItem[] = [
  // 1. AWS SOLUTIONS ARCHITECT ASSOCIATE
  {
    id: 'cert-aws-saa',
    code: 'SAA-C03',
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    trackSlug: 'cloud-computing',
    level: 'Associate',
    description: 'Validates ability to design and implement distributed systems on AWS, focusing on high availability, cost optimization, fault tolerance, and cloud security.',
    officialUrl: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
    costUsd: 150,
    durationMinutes: 130,
    questionCount: '65 questions (Multiple Choice & Multiple Response)',
    passingScore: '720 / 1000',
    validityYears: 3,
    recommendedPrepWeeks: 8,
    skillsAssessed: [
      'Design Secure Architectures (IAM, VPC, KMS, Security Groups)',
      'Design Resilient Architectures (Multi-AZ, Auto Scaling, ALB, SQS)',
      'Design High-Performing Architectures (EC2 instances, S3, RDS, CloudFront, ElastiCache)',
      'Design Cost-Optimized Architectures (Savings Plans, S3 Tiering, Right-sizing)'
    ],
    domains: [
      { name: 'Design Secure Architectures', weightPercentage: 30, keyTopics: ['IAM Policies', 'VPC Peering & Transit Gateway', 'Data Encryption in transit and at rest'] },
      { name: 'Design Resilient Architectures', weightPercentage: 26, keyTopics: ['Decoupling with SQS/SNS', 'Route 53 Routing Policies', 'Disaster Recovery RTO/RPO'] },
      { name: 'Design High-Performing Architectures', weightPercentage: 24, keyTopics: ['RDS Multi-AZ vs Read Replicas', 'ElastiCache Redis', 'S3 Performance'] },
      { name: 'Design Cost-Optimized Architectures', weightPercentage: 20, keyTopics: ['Storage Lifecycle Rules', 'Spot vs On-Demand EC2', 'AWS Cost Explorer'] }
    ],
    officialFreeStudyGuideUrl: 'https://d1.awsstatic.com/training-and-certification/docs-sa-assoc/AWS-Certified-Solutions-Architect-Associate_Exam-Guide.pdf',
    isHighValueForFreshers: true
  },

  // 2. AWS CLOUD PRACTITIONER
  {
    id: 'cert-aws-clf',
    code: 'CLF-C02',
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    trackSlug: 'cloud-computing',
    level: 'Foundational',
    description: 'An entry-level credential validating high-level understanding of AWS Cloud concepts, core services, security, architecture, pricing models, and billing support.',
    officialUrl: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
    costUsd: 100,
    durationMinutes: 90,
    questionCount: '65 questions',
    passingScore: '700 / 1000',
    validityYears: 3,
    recommendedPrepWeeks: 3,
    skillsAssessed: ['Cloud Concepts & Value Proposition', 'Security and Compliance in the AWS Cloud', 'Core AWS Services (EC2, S3, RDS, Lambda)', 'Billing & Pricing Models'],
    domains: [
      { name: 'Cloud Concepts', weightPercentage: 24, keyTopics: ['Benefits of Cloud', 'Cloud Economics', 'Well-Architected Framework'] },
      { name: 'Security and Compliance', weightPercentage: 30, keyTopics: ['Shared Responsibility Model', 'IAM', 'AWS Shield & WAF'] },
      { name: 'Cloud Technology and Services', weightPercentage: 34, keyTopics: ['Compute, Storage, Database, Networking Services'] },
      { name: 'Billing, Pricing, and Support', weightPercentage: 12, keyTopics: ['AWS Budgets', 'Total Cost of Ownership', 'AWS Support Plans'] }
    ],
    officialFreeStudyGuideUrl: 'https://d1.awsstatic.com/training-and-certification/docs-cloud-practitioner/AWS-Certified-Cloud-Practitioner_Exam-Guide.pdf',
    isHighValueForFreshers: true
  },

  // 3. CERTIFIED KUBERNETES ADMINISTRATOR (CKA)
  {
    id: 'cert-k8s-cka',
    code: 'CKA',
    name: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'Cloud Native Computing Foundation (CNCF)',
    trackSlug: 'devops-sre',
    level: 'Professional',
    description: 'A 100% hands-on performance-based exam where candidates solve real command-line tasks on live Kubernetes clusters.',
    officialUrl: 'https://www.cncf.io/certification/cka/',
    costUsd: 395,
    durationMinutes: 120,
    questionCount: '15–20 performance-based tasks in live terminal',
    passingScore: '66%',
    validityYears: 3,
    recommendedPrepWeeks: 8,
    skillsAssessed: [
      'Cluster Architecture, Installation & Configuration (kubeadm)',
      'Workloads & Scheduling (Deployments, DaemonSets, Resource Quotas)',
      'Services & Networking (Ingress, CoreDNS, NetworkPolicies)',
      'Storage (PersistentVolumes, PersistentVolumeClaims, StorageClasses)',
      'Troubleshooting (Cluster components, worker node failures, pod logs)'
    ],
    domains: [
      { name: 'Storage', weightPercentage: 10, keyTopics: ['PV, PVC, StorageClasses', 'Volume access modes'] },
      { name: 'Troubleshooting', weightPercentage: 30, keyTopics: ['Worker node systemd kubelet failure', 'Broken networking', 'Pending pods'] },
      { name: 'Workloads & Scheduling', weightPercentage: 15, keyTopics: ['NodeSelector, Affinity, Taints & Tolerations'] },
      { name: 'Cluster Architecture & Config', weightPercentage: 25, keyTopics: ['kubeadm cluster upgrades', 'etcd backup and restore', 'RBAC roles'] },
      { name: 'Services & Networking', weightPercentage: 20, keyTopics: ['Ingress controllers', 'ClusterIP vs NodePort', 'Network Policies'] }
    ],
    officialFreeStudyGuideUrl: 'https://github.com/cncf/curriculum',
    isHighValueForFreshers: false
  },

  // 4. COMPTIA SECURITY+
  {
    id: 'cert-comptia-sec',
    code: 'SY0-701',
    name: 'CompTIA Security+ Certification',
    issuer: 'CompTIA',
    trackSlug: 'cybersecurity',
    level: 'Foundational',
    description: 'The global standard benchmark for establishing a cybersecurity career, covering network security, threat detection, cryptography, and enterprise defense.',
    officialUrl: 'https://www.comptia.org/certifications/security',
    costUsd: 392,
    durationMinutes: 90,
    questionCount: 'Max 90 questions (Performance-based & MCQs)',
    passingScore: '750 / 900',
    validityYears: 3,
    recommendedPrepWeeks: 6,
    skillsAssessed: [
      'General Security Concepts (CIA Triad, Zero Trust, AAA)',
      'Threats, Vulnerabilities & Mitigations (Malware, Phishing, Social Engineering)',
      'Security Architecture & Network Hardening (Firewalls, Segmentation, VPNs)',
      'Security Operations (Incident Response, Digital Forensics, SIEM)',
      'Security Program Management and Oversight (Compliance, Risk Assessment)'
    ],
    domains: [
      { name: 'General Security Concepts', weightPercentage: 12, keyTopics: ['Zero Trust', 'Authentication factors', 'Cryptographic basics'] },
      { name: 'Threats, Vulnerabilities & Mitigations', weightPercentage: 22, keyTopics: ['Ransomware', 'Supply chain attacks', 'CVEs'] },
      { name: 'Security Architecture', weightPercentage: 18, keyTopics: ['Cloud security', 'Network defense-in-depth', 'Segmentation'] },
      { name: 'Security Operations', weightPercentage: 28, keyTopics: ['Log analysis', 'Incident containment', 'EDR and SIEM'] },
      { name: 'Security Program Management', weightPercentage: 20, keyTopics: ['Risk management', 'Privacy regulations (GDPR)', 'Disaster recovery'] }
    ],
    officialFreeStudyGuideUrl: 'https://www.comptia.org/training/resources/exam-objectives',
    isHighValueForFreshers: true
  },

  // 5. GOOGLE ASSOCIATE CLOUD ENGINEER
  {
    id: 'cert-gcp-ace',
    code: 'GCP-ACE',
    name: 'Google Cloud Associate Cloud Engineer',
    issuer: 'Google Cloud',
    trackSlug: 'cloud-computing',
    level: 'Associate',
    description: 'Demonstrates ability to deploy applications, monitor operations, and manage enterprise solutions on Google Cloud Platform using Google Cloud Console and gcloud CLI.',
    officialUrl: 'https://cloud.google.com/learn/certification/cloud-engineer',
    costUsd: 125,
    durationMinutes: 120,
    questionCount: '50–60 questions',
    passingScore: 'Pass / Fail (Approx 70%)',
    validityYears: 3,
    recommendedPrepWeeks: 6,
    skillsAssessed: [
      'Setting up a cloud solution environment (Projects, Billing, IAM)',
      'Planning and configuring a cloud solution (Compute Engine, GKE, Cloud Run, Cloud Storage)',
      'Deploying and implementing cloud solutions',
      'Ensuring successful operation of a cloud solution',
      'Configuring access and security'
    ],
    domains: [
      { name: 'Setting Up Solution Environment', weightPercentage: 20, keyTopics: ['Resource hierarchy', 'IAM roles', 'Cloud Identity'] },
      { name: 'Planning and Configuring', weightPercentage: 18, keyTopics: ['Compute options comparison', 'Storage classes', 'VPC networks'] },
      { name: 'Deploying and Implementing', weightPercentage: 25, keyTopics: ['Deploying to GKE', 'Cloud Run microservices', 'Cloud SQL'] },
      { name: 'Operating Cloud Solutions', weightPercentage: 20, keyTopics: ['Cloud Monitoring & Logging', 'Resource resizing', 'Backups'] },
      { name: 'Configuring Access & Security', weightPercentage: 17, keyTopics: ['Service accounts', 'Audit logs', 'VPC firewall rules'] }
    ],
    officialFreeStudyGuideUrl: 'https://cloud.google.com/learn/certification/guides/cloud-engineer',
    isHighValueForFreshers: true
  },

  // 6. META FRONT-END DEVELOPER CERTIFICATION
  {
    id: 'cert-meta-frontend',
    code: 'META-FE',
    name: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Meta',
    trackSlug: 'frontend',
    level: 'Foundational',
    description: 'An industry-recognized credential developed by Meta engineers validating mastery of HTML5, CSS, modern JavaScript, React 19, responsive design, and interview coding.',
    officialUrl: 'https://www.coursera.org/professional-certificates/meta-front-end-developer',
    costUsd: 49,
    durationMinutes: 180,
    questionCount: 'Graded hands-on assignments & Capstone project',
    passingScore: '80% on all module assessments',
    validityYears: 99,
    recommendedPrepWeeks: 8,
    skillsAssessed: ['HTML5 & Semantic Web', 'CSS & Responsive Frameworks', 'JavaScript & DOM Manipulation', 'React Components & Hooks', 'UI Version Control with Git', 'Front-End Coding Interview Preparation'],
    domains: [
      { name: 'Web Development Basics', weightPercentage: 20, keyTopics: ['HTML5', 'CSS Flexbox & Grid', 'Bootstrap'] },
      { name: 'Programming with JavaScript', weightPercentage: 30, keyTopics: ['ES6 Syntax', 'Data Structures', 'Testing with Jest'] },
      { name: 'React Development', weightPercentage: 35, keyTopics: ['JSX', 'Hooks', 'Context API', 'Forms & Validation'] },
      { name: 'Coding Interview Prep & Capstone', weightPercentage: 15, keyTopics: ['Algorithms', 'Data structures', 'Portfolio deployment'] }
    ],
    officialFreeStudyGuideUrl: 'https://www.coursera.org/professional-certificates/meta-front-end-developer',
    isHighValueForFreshers: true
  },

  // 7. CISCO CCNA (200-301)
  {
    id: 'cert-cisco-ccna',
    code: '200-301',
    name: 'Cisco Certified Network Associate (CCNA)',
    issuer: 'Cisco Systems',
    trackSlug: 'networking-systems',
    level: 'Associate',
    description: 'The foundational enterprise networking credential certifying skills in IP services, security fundamentals, network access, routing, and network automation.',
    officialUrl: 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/associate/ccna.html',
    costUsd: 300,
    durationMinutes: 120,
    questionCount: '100–120 questions',
    passingScore: 'Approx 825 / 1000',
    validityYears: 3,
    recommendedPrepWeeks: 10,
    skillsAssessed: ['Network Fundamentals', 'Network Access (VLANs, Trunking, EtherChannel)', 'IP Connectivity (OSPFv2)', 'IP Services (NTP, DHCP, DNS, SNMP)', 'Security Fundamentals', 'Automation and Programmability (REST APIs, Puppet/Chef/Ansible)'],
    domains: [
      { name: 'Network Fundamentals', weightPercentage: 20, keyTopics: ['Routers, switches, firewalls', 'IPv4/IPv6 Subnetting'] },
      { name: 'Network Access', weightPercentage: 20, keyTopics: ['VLANs', '802.1Q trunking', 'Spanning Tree (RSTP)'] },
      { name: 'IP Connectivity', weightPercentage: 25, keyTopics: ['Routing table components', 'Single area OSPFv2'] },
      { name: 'IP Services', weightPercentage: 10, keyTopics: ['NAT (Inside/Outside/Overload)', 'NTP and DHCP'] },
      { name: 'Security Fundamentals', weightPercentage: 15, keyTopics: ['Access control lists (ACLs)', 'Port security', 'WPA3 wireless'] },
      { name: 'Automation & Programmability', weightPercentage: 10, keyTopics: ['REST APIs', 'JSON data format', 'Cisco DNA Center'] }
    ],
    officialFreeStudyGuideUrl: 'https://learningnetwork.cisco.com/s/ccna-exam-topics',
    isHighValueForFreshers: true
  },

  // 8. ORACLE CERTIFIED PROFESSIONAL JAVA SE 21
  {
    id: 'cert-oracle-java21',
    code: '1Z0-830',
    name: 'Java SE 21 Developer Professional',
    issuer: 'Oracle',
    trackSlug: 'java-enterprise',
    level: 'Professional',
    description: 'Validates profound expertise in modern Java 21, Virtual Threads, Pattern Matching, Record Patterns, Generics, and concurrency primitives.',
    officialUrl: 'https://education.oracle.com/java-se-21-developer/pexam_1Z0-830',
    costUsd: 245,
    durationMinutes: 120,
    questionCount: '50 questions',
    passingScore: '68%',
    validityYears: 99,
    recommendedPrepWeeks: 8,
    skillsAssessed: ['Java Language Primitives & Flow Control', 'OOP, Records, Sealed Classes', 'Virtual Threads & Structured Concurrency', 'Streams, Lambdas & Collections', 'I/O, NIO.2 & Serialization'],
    domains: [
      { name: 'Core Language & OOP', weightPercentage: 25, keyTopics: ['Records', 'Sealed interfaces', 'Pattern matching'] },
      { name: 'Collections & Generics', weightPercentage: 20, keyTopics: ['Sequenced collections', 'Wildcards', 'Comparator'] },
      { name: 'Concurrency & Threads', weightPercentage: 25, keyTopics: ['Project Loom virtual threads', 'ReentrantLock', 'CompletableFuture'] },
      { name: 'Streams & Lambda Expressions', weightPercentage: 20, keyTopics: ['Parallel streams', 'Collectors', 'Optional API'] },
      { name: 'Modules & Security', weightPercentage: 10, keyTopics: ['module-info.java', 'ServiceLoader', 'Serialization filtering'] }
    ],
    officialFreeStudyGuideUrl: 'https://education.oracle.com/java-se-21-developer/pexam_1Z0-830',
    isHighValueForFreshers: true
  },

  // 9. HASHICORP TERRAFORM ASSOCIATE
  {
    id: 'cert-hashicorp-terraform',
    code: 'TA-003',
    name: 'HashiCorp Certified: Terraform Associate',
    issuer: 'HashiCorp',
    trackSlug: 'devops-sre',
    level: 'Associate',
    description: 'Certifies Infrastructure as Code (IaC) principles, Terraform state management, modules, providers, variables, and cloud provisioning.',
    officialUrl: 'https://www.hashicorp.com/certification/terraform-associate',
    costUsd: 70,
    durationMinutes: 60,
    questionCount: '57 questions',
    passingScore: '70%',
    validityYears: 2,
    recommendedPrepWeeks: 4,
    skillsAssessed: ['Understand IaC Concepts', 'Terraform Basics & CLI', 'Terraform State Management', 'Terraform Modules', 'Terraform Cloud / Enterprise Capabilities'],
    domains: [
      { name: 'IaC Fundamentals', weightPercentage: 15, keyTopics: ['Declarative vs Imperative', 'Idempotency'] },
      { name: 'Terraform State', weightPercentage: 25, keyTopics: ['State locking', 'Remote backend S3/Consul', 'terraform import'] },
      { name: 'Configuration & Modules', weightPercentage: 35, keyTopics: ['Variables, outputs, locals', 'Child modules', 'Resource dependencies'] },
      { name: 'Terraform Workflow', weightPercentage: 25, keyTopics: ['init, plan, apply, destroy', 'Workspace isolation'] }
    ],
    officialFreeStudyGuideUrl: 'https://developer.hashicorp.com/terraform/tutorials/certification-003',
    isHighValueForFreshers: true
  },

  // 10. MICROSOFT AZURE FUNDAMENTALS
  {
    id: 'cert-azure-az900',
    code: 'AZ-900',
    name: 'Microsoft Certified: Azure Fundamentals',
    issuer: 'Microsoft',
    trackSlug: 'cloud-computing',
    level: 'Foundational',
    description: 'Foundational validation of cloud concepts, Azure architectural components, core compute/storage services, and Azure governance & compliance.',
    officialUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/',
    costUsd: 99,
    durationMinutes: 45,
    questionCount: '35–50 questions',
    passingScore: '700 / 1000',
    validityYears: 99,
    recommendedPrepWeeks: 3,
    skillsAssessed: ['Cloud Concepts (IaaS, PaaS, SaaS)', 'Azure Architecture and Services', 'Azure Management and Governance'],
    domains: [
      { name: 'Describe Cloud Concepts', weightPercentage: 30, keyTopics: ['High Availability', 'Disaster Recovery', 'CapEx vs OpEx'] },
      { name: 'Azure Architecture & Services', weightPercentage: 40, keyTopics: ['Resource Groups', 'Virtual Networks', 'Blob Storage', 'Cosmos DB'] },
      { name: 'Azure Management & Governance', weightPercentage: 30, keyTopics: ['Cost Management', 'Microsoft Entra ID', 'Azure Policy'] }
    ],
    officialFreeStudyGuideUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900',
    isHighValueForFreshers: true
  },

  // 11. MICROSOFT POWER BI DATA ANALYST
  {
    id: 'cert-powerbi-pl300',
    code: 'PL-300',
    name: 'Microsoft Certified: Power BI Data Analyst Associate',
    issuer: 'Microsoft',
    trackSlug: 'data-analytics',
    level: 'Associate',
    description: 'Validates ability to transform raw business data into actionable visual insights, design scalable data models in Power BI, and write complex DAX expressions.',
    officialUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate/',
    costUsd: 165,
    durationMinutes: 100,
    questionCount: '45–60 questions',
    passingScore: '700 / 1000',
    validityYears: 1,
    recommendedPrepWeeks: 6,
    skillsAssessed: ['Prepare the Data (Power Query transformations)', 'Model the Data (Star Schema, Relationships, DAX)', 'Visualize and Analyze the Data', 'Deploy and Maintain Assets'],
    domains: [
      { name: 'Prepare the Data', weightPercentage: 28, keyTopics: ['Power Query M', 'Data profiling', 'Extracting from SQL/APIs'] },
      { name: 'Model the Data', weightPercentage: 32, keyTopics: ['Star schema design', 'DAX measures (CALCULATE, FILTER)', 'Row-level security'] },
      { name: 'Visualize the Data', weightPercentage: 25, keyTopics: ['Custom visuals', 'Drill-through', 'KPI cards'] },
      { name: 'Deploy and Maintain', weightPercentage: 15, keyTopics: ['Power BI Workspaces', 'Scheduled refresh', 'Data lineage'] }
    ],
    officialFreeStudyGuideUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300',
    isHighValueForFreshers: true
  },

  // 12. ISTQB TESTER FOUNDATION LEVEL
  {
    id: 'cert-istqb-ctfl',
    code: 'CTFL-4.0',
    name: 'ISTQB Certified Tester Foundation Level (CTFL 4.0)',
    issuer: 'ISTQB',
    trackSlug: 'software-testing-qa',
    level: 'Foundational',
    description: 'The universally recognized testing qualification covering the testing lifecycle, static vs dynamic testing, test design techniques, and test automation strategies.',
    officialUrl: 'https://www.istqb.org/certifications/certified-tester-foundation-level',
    costUsd: 220,
    durationMinutes: 60,
    questionCount: '40 questions',
    passingScore: '65% (26 / 40)',
    validityYears: 99,
    recommendedPrepWeeks: 4,
    skillsAssessed: ['Fundamentals of Testing', 'Testing Throughout the SDLC', 'Static Testing & Reviews', 'Test Analysis & Design Techniques (BVA, Equivalence Partitioning)', 'Managing Test Activities'],
    domains: [
      { name: 'Fundamentals of Testing', weightPercentage: 20, keyTopics: ['7 Testing principles', 'Defects vs Failures', 'Psychology of testing'] },
      { name: 'Testing Throughout the SDLC', weightPercentage: 15, keyTopics: ['Test levels (Unit, Integration, System, Acceptance)', 'Test types'] },
      { name: 'Static Testing', weightPercentage: 10, keyTopics: ['Code reviews', 'Static analysis tools'] },
      { name: 'Test Design Techniques', weightPercentage: 35, keyTopics: ['Boundary Value Analysis', 'Equivalence partitioning', 'State transition testing'] },
      { name: 'Managing Test Activities', weightPercentage: 20, keyTopics: ['Defect management', 'Test metrics', 'Risk-based testing'] }
    ],
    officialFreeStudyGuideUrl: 'https://www.istqb.org/certifications/certified-tester-foundation-level',
    isHighValueForFreshers: true
  },

  // 13. GOOGLE UX DESIGN PROFESSIONAL
  {
    id: 'cert-google-ux',
    code: 'GOOGLE-UX',
    name: 'Google UX Design Professional Certificate',
    issuer: 'Google',
    trackSlug: 'ui-ux',
    level: 'Foundational',
    description: 'Comprehensive design credential created by Google design leads, validating human-centered UX research, wireframing in Figma, accessibility, and portfolio creation.',
    officialUrl: 'https://www.coursera.org/professional-certificates/google-ux-design',
    costUsd: 49,
    durationMinutes: 180,
    questionCount: 'Peer-reviewed project portfolio (3 Case Studies)',
    passingScore: '80% per peer assignment',
    validityYears: 99,
    recommendedPrepWeeks: 10,
    skillsAssessed: ['User-Centered Design & Empathy', 'User Research & Personas', 'Wireframing & Prototyping (Figma)', 'Usability Testing & Iteration', 'Responsive Web & Mobile Portfolio Case Studies'],
    domains: [
      { name: 'Foundations of UX', weightPercentage: 15, keyTopics: ['Design sprint frameworks', 'Design ethics', 'User psychology'] },
      { name: 'Research & Empathy', weightPercentage: 25, keyTopics: ['User interviews', 'Empathy maps', 'Competitive audit'] },
      { name: 'Wireframing & Lo-Fi Prototyping', weightPercentage: 25, keyTopics: ['Information architecture', 'Figma layout grids', 'Paper wireframes'] },
      { name: 'Hi-Fi Prototyping & Testing', weightPercentage: 35, keyTopics: ['Design systems in Figma', 'Micro-interactions', 'WCAG accessibility'] }
    ],
    officialFreeStudyGuideUrl: 'https://grow.google/certificates/ux-design/',
    isHighValueForFreshers: true
  },

  // 14. PYTHON INSTITUTE PCAP
  {
    id: 'cert-python-pcap',
    code: 'PCAP-31-03',
    name: 'PCAP – Certified Associate in Python Programming',
    issuer: 'Python Institute',
    trackSlug: 'python',
    level: 'Associate',
    description: 'Certifies fundamental Python syntax, modular programming, object-oriented concepts, exception handling, string processing, and file I/O operations.',
    officialUrl: 'https://pythoninstitute.org/pcap',
    costUsd: 295,
    durationMinutes: 65,
    questionCount: '40 single and multiple-choice questions',
    passingScore: '70% (28 / 40)',
    validityYears: 99,
    recommendedPrepWeeks: 4,
    skillsAssessed: ['Control and Evaluations (Loops, Conditionals)', 'Data Aggregates (Lists, Tuples, Dictionaries)', 'Functions and Modules (Lambdas, Generators)', 'Classes and Objects (Inheritance, Polymorphism)'],
    domains: [
      { name: 'Control and Evaluations', weightPercentage: 25, keyTopics: ['Bitwise operators', 'Nested loops', 'Logical expressions'] },
      { name: 'Data Aggregates', weightPercentage: 25, keyTopics: ['List comprehensions', 'Dictionary manipulation', 'Slicing'] },
      { name: 'Functions & Modules', weightPercentage: 25, keyTopics: ['import mechanics', 'sys and math modules', 'Recursion'] },
      { name: 'OOP & Exceptions', weightPercentage: 25, keyTopics: ['Class vs Instance variables', 'Custom exceptions', '__init__ and dunder methods'] }
    ],
    officialFreeStudyGuideUrl: 'https://pythoninstitute.org/pcap-exam-syllabus',
    isHighValueForFreshers: true
  },

  // 15. TENSORFLOW DEVELOPER CERTIFICATE
  {
    id: 'cert-tensorflow-dev',
    code: 'TF-DEV',
    name: 'TensorFlow Developer Certificate',
    issuer: 'Google TensorFlow',
    trackSlug: 'ai-ml',
    level: 'Associate',
    description: 'Hands-on practical coding examination validating the construction, training, and tuning of Deep Learning neural networks (CNNs, RNNs, NLP) using TensorFlow and Keras.',
    officialUrl: 'https://www.tensorflow.org/certificate',
    costUsd: 100,
    durationMinutes: 300,
    questionCount: '5 practical model training problems in PyCharm',
    passingScore: 'Pass (Graded by automated model test harness)',
    validityYears: 3,
    recommendedPrepWeeks: 8,
    skillsAssessed: ['TF / Keras Sequential & Functional APIs', 'Computer Vision & Convolutional Neural Networks', 'Natural Language Processing with Tokenizers & Embeddings', 'Time Series Forecasting with LSTMs'],
    domains: [
      { name: 'TF Basics & Linear Regression', weightPercentage: 20, keyTopics: ['Tensors, Layers, Loss functions', 'Adam optimizer'] },
      { name: 'Computer Vision with CNNs', weightPercentage: 25, keyTopics: ['Conv2D, MaxPooling', 'ImageDataGenerator', 'Transfer learning'] },
      { name: 'NLP & Text Classification', weightPercentage: 25, keyTopics: ['Word embeddings', 'Bidirectional LSTMs', 'Padding'] },
      { name: 'Sequences & Time Series', weightPercentage: 30, keyTopics: ['RNN, Conv1D for sequences', 'Learning rate schedulers'] }
    ],
    officialFreeStudyGuideUrl: 'https://www.tensorflow.org/site-assets/downloads/marketing/cert/TF_Certificate_Candidate_Handbook.pdf',
    isHighValueForFreshers: true
  }
];

export const getCertificationsByTrack = (trackSlug: string): CertificationItem[] => {
  if (trackSlug === 'all') return certificationsList;
  return certificationsList.filter(c => c.trackSlug.toLowerCase() === trackSlug.toLowerCase());
};
