import { LucideIcon } from 'lucide-react';

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'automation' | 'audit' | 'voiceai' | 'saas' | 'executive' | 'training';
  type: 'guide' | 'template' | 'video' | 'download' | 'blog';
  link?: string;
  downloadUrl?: string;
  isPremium?: boolean;
  isPlaceholder?: boolean;
  fileSize?: string;
}

export interface ResourceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Downloadable {
  id: string;
  title: string;
  description: string;
  fileType: 'PDF' | 'DOCX' | 'XLSX' | 'ZIP';
  fileSize: string;
  downloadUrl: string;
  thumbnail?: string;
  isPremium?: boolean;
  isPlaceholder?: boolean;
}

export const resourceCategories: ResourceCategory[] = [
  {
    id: 'automation',
    name: 'AI Automation Guides',
    icon: 'Zap',
    description: 'Practical guides for implementing workflow automation and intelligent process optimization',
  },
  {
    id: 'audit',
    name: 'AI Audit Frameworks',
    icon: 'ClipboardCheck',
    description: 'Comprehensive frameworks for assessing organizational AI readiness and opportunities',
  },
  {
    id: 'voiceai',
    name: 'Voice AI Resources',
    icon: 'Mic',
    description: 'Everything you need to implement Voice AI systems in your business',
  },
  {
    id: 'saas',
    name: 'SaaS & Platform Strategy',
    icon: 'Layers',
    description: 'Strategies for building and scaling AI-powered SaaS platforms',
  },
  {
    id: 'executive',
    name: 'Executive Briefings',
    icon: 'TrendingUp',
    description: 'Strategic insights and frameworks for C-suite decision makers',
  },
  {
    id: 'training',
    name: 'Training & Workshops',
    icon: 'GraduationCap',
    description: 'Educational programs and certification paths for your team',
  },
];

export const resources: Resource[] = [
  // Voice AI Resources (Real Content)
  {
    id: 'voice-ai-overview',
    title: 'Voice AI Systems Overview',
    description: 'Comprehensive guide to implementing Voice AI in your business, covering technology stack, use cases, and ROI considerations',
    category: 'voiceai',
    type: 'guide',
    link: '/solutions/conversational-ai',
  },
  {
    id: 'voice-ai-pricing',
    title: 'Voice AI Pricing Tiers Explained',
    description: 'Detailed breakdown of Small ($3K setup), Medium ($7.5K setup), and Enterprise ($15K setup) Voice AI tiers',
    category: 'voiceai',
    type: 'guide',
  },
  {
    id: 'voice-ai-timeline',
    title: 'Voice AI Implementation Timeline',
    description: 'What to expect during 4-8 week deployment: discovery, design, integration, testing, and optimization phases',
    category: 'voiceai',
    type: 'guide',
  },
  {
    id: 'voice-ai-roi',
    title: 'Voice AI ROI Calculator',
    description: 'Calculate potential savings and returns from implementing Voice AI in customer support, sales, or scheduling',
    category: 'voiceai',
    type: 'template',
    isPlaceholder: true,
  },
  {
    id: 'voice-ai-use-cases',
    title: 'Voice AI Use Case Library',
    description: 'Real-world examples: customer support automation, sales qualification, appointment scheduling, and more',
    category: 'voiceai',
    type: 'guide',
  },

  // AI Audit Frameworks (Placeholders for Notion Content)
  {
    id: 'ai-audit-template',
    title: 'AI Audit Template Overview',
    description: 'Comprehensive framework for assessing organizational AI readiness across technology, processes, and people',
    category: 'audit',
    type: 'download',
    downloadUrl: '#',
    isPremium: true,
    isPlaceholder: true,
  },
  {
    id: 'ai-audit-questions',
    title: 'Best Practices & Questions Guide',
    description: 'Detailed question bank covering infrastructure, data quality, team capabilities, and strategic alignment',
    category: 'audit',
    type: 'download',
    downloadUrl: '#',
    isPlaceholder: true,
  },
  {
    id: 'ai-audit-deliverable',
    title: 'Deliverable Framework',
    description: 'Templates for presenting audit findings, prioritized recommendations, and implementation roadmaps',
    category: 'audit',
    type: 'template',
    downloadUrl: '#',
    isPlaceholder: true,
  },
  {
    id: 'ai-audit-roi',
    title: 'ROI Assessment Worksheet',
    description: 'Framework for quantifying AI opportunities and building business cases for implementation',
    category: 'audit',
    type: 'template',
    downloadUrl: '#',
    isPlaceholder: true,
  },

  // Automation Guides (Mix of real and placeholder)
  {
    id: 'n8n-getting-started',
    title: 'Getting Started with n8n Automation',
    description: 'Introduction to workflow automation using n8n: setup, common patterns, and best practices',
    category: 'automation',
    type: 'guide',
    isPlaceholder: true,
  },
  {
    id: 'automation-patterns',
    title: 'Common Automation Patterns',
    description: 'Proven workflow patterns for CRM sync, data enrichment, notification systems, and reporting automation',
    category: 'automation',
    type: 'guide',
    isPlaceholder: true,
  },
  {
    id: 'ai-workflow-design',
    title: 'AI Workflow Design Principles',
    description: 'How to design effective AI-powered workflows that balance automation with human oversight',
    category: 'automation',
    type: 'guide',
    isPlaceholder: true,
  },

  // SaaS Strategy (Placeholders)
  {
    id: 'saas-architecture',
    title: 'Building Multi-Tenant SaaS',
    description: 'Architectural patterns for building scalable, secure multi-tenant SaaS platforms with AI capabilities',
    category: 'saas',
    type: 'guide',
    isPlaceholder: true,
  },
  {
    id: 'saas-monetization',
    title: 'Platform Monetization Strategies',
    description: 'Pricing models, feature gating, and growth strategies for AI-powered SaaS products',
    category: 'saas',
    type: 'guide',
    isPlaceholder: true,
  },
  {
    id: 'micro-saas-framework',
    title: 'Micro-SaaS Product Framework',
    description: 'How to identify, validate, and launch focused SaaS products like ArchiPrompt, FreshCheck, and PluginEnthusiasts',
    category: 'saas',
    type: 'guide',
    isPlaceholder: true,
  },

  // Executive Briefings (Placeholders for Notion LinkedIn Content)
  {
    id: 'ai-strategy-roadmap',
    title: 'AI Strategy Roadmap Template',
    description: 'Executive framework for planning and executing AI transformation initiatives',
    category: 'executive',
    type: 'template',
    downloadUrl: '#',
    isPlaceholder: true,
  },
  {
    id: 'ai-readiness-assessment',
    title: 'Executive AI Readiness Assessment',
    description: 'Strategic assessment tool for C-suite to evaluate organizational AI preparedness',
    category: 'executive',
    type: 'template',
    downloadUrl: '#',
    isPlaceholder: true,
  },
  {
    id: 'ai-trends-2025',
    title: '2025 AI Trends Report',
    description: 'Key trends in enterprise AI adoption, infrastructure evolution, and competitive landscape',
    category: 'executive',
    type: 'guide',
    isPlaceholder: true,
  },
  {
    id: 'build-vs-buy',
    title: 'Build vs Buy Decision Framework',
    description: 'Strategic framework for evaluating whether to build custom AI solutions or leverage existing platforms',
    category: 'executive',
    type: 'guide',
    isPlaceholder: true,
  },

  // Training (Placeholders)
  {
    id: 'implementation-workshop',
    title: 'AI Implementation Workshop Series',
    description: 'Hands-on workshops covering AI strategy, tool selection, implementation, and change management',
    category: 'training',
    type: 'guide',
    isPlaceholder: true,
  },
  {
    id: 'team-enablement',
    title: 'Team Enablement Programs',
    description: 'Training packages to upskill your team on AI tools, automation platforms, and best practices',
    category: 'training',
    type: 'guide',
    isPlaceholder: true,
  },
  {
    id: 'certification-paths',
    title: 'Certification Paths',
    description: 'Structured learning paths for AI implementation, automation engineering, and platform development',
    category: 'training',
    type: 'guide',
    isPlaceholder: true,
  },
];

export const downloadables: Downloadable[] = [
  {
    id: 'ai-audit-summary',
    title: 'AI Audit Template Summary',
    description: 'Comprehensive framework for assessing AI readiness across your organization',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    downloadUrl: '#',
    isPremium: true,
    isPlaceholder: true,
  },
  {
    id: 'voice-ai-pricing-sheet',
    title: 'Voice AI Pricing Sheet',
    description: 'Detailed breakdown of Voice AI tiers, capabilities, and implementation costs',
    fileType: 'PDF',
    fileSize: '1.8 MB',
    downloadUrl: '#',
    isPlaceholder: true,
  },
  {
    id: 'transformation-guide',
    title: 'AI Transformation Guide',
    description: 'Step-by-step guide to planning and executing successful AI adoption initiatives',
    fileType: 'PDF',
    fileSize: '3.2 MB',
    downloadUrl: '#',
    isPlaceholder: true,
  },
  {
    id: 'sales-one-sheet',
    title: 'Sales One Sheet',
    description: 'Quick-reference guide to Elevated AI services, pricing, and success stories',
    fileType: 'PDF',
    fileSize: '1.2 MB',
    downloadUrl: '#',
    isPlaceholder: true,
  },
  {
    id: 'strategic-roadmap',
    title: 'Strategic Roadmap Framework',
    description: '90-day AI implementation planning template with milestones and KPIs',
    fileType: 'PDF',
    fileSize: '1.5 MB',
    downloadUrl: '#',
    isPlaceholder: true,
  },
  {
    id: 'proposal-template',
    title: 'Voice AI Proposal Template',
    description: 'Customizable proposal template for Voice AI projects with ROI projections',
    fileType: 'DOCX',
    fileSize: '890 KB',
    downloadUrl: '#',
    isPlaceholder: true,
  },
];

export const resourceFAQs = [
  {
    question: 'Are these resources free to access?',
    answer: 'Most resources are freely available. Some premium templates and frameworks require a consultation or are available to clients.',
  },
  {
    question: 'Do I need technical knowledge to use these guides?',
    answer: 'Our resources are designed for various skill levels. Executive briefings are non-technical, while implementation guides assume some technical familiarity. Each resource indicates its intended audience.',
  },
  {
    question: 'Can I share these resources with my team?',
    answer: 'Yes, you\'re welcome to share resources within your organization. For external distribution or republication, please contact us for permission.',
  },
  {
    question: 'Are the templates customizable?',
    answer: 'Absolutely. All templates and frameworks are designed to be customized to your specific business needs, industry, and organizational context.',
  },
  {
    question: 'Do you offer implementation support?',
    answer: 'Yes, we offer consulting packages to help you apply these frameworks to your specific situation. Schedule a consultation to discuss your needs.',
  },
  {
    question: 'How often are resources updated?',
    answer: 'We regularly update our resource library with new guides, case studies, and frameworks based on client work and industry developments. Check back frequently for new content.',
  },
];
