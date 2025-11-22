export interface CaseStudyOutcome {
  metric: string;
  value: string;
  icon: string;
  description?: string;
}

export interface CaseStudyDetail {
  id: string;
  slug: string;
  title: string;
  company: string;
  industry: string;
  solution: string;
  summary: string;
  thumbnail: string;
  tags: string[];
  challenge: string;
  timeline: string;
  stack: string[];
  outcomes: CaseStudyOutcome[];
  investment: {
    setup: string;
    recurring: string;
  };
  testimonial?: {
    quote: string;
    author: string;
    title: string;
  };
  isPlaceholder?: boolean;
  isFeatured?: boolean;
}

export const caseStudiesData: CaseStudyDetail[] = [
  {
    id: 'cdw-voice-ai',
    slug: 'cdw-voice-ai-support',
    title: 'CDW: 45% Support Volume Reduction with Voice AI',
    company: 'CDW',
    industry: 'Technology Distribution',
    solution: 'Voice AI Systems',
    challenge: 'High-volume Tier 1 technical support was overwhelming the human team, leading to extended wait times, inconsistent service quality, and 24/7 coverage gaps. Customer satisfaction was declining while support costs continued to escalate.',
    timeline: '8 weeks',
    stack: ['ElevenLabs', 'MindStudio.ai', 'n8n', 'Custom CRM Integration'],
    outcomes: [
      { metric: 'Tier 1 Support Reduction', value: '45%', icon: 'TrendingDown', description: 'Automated resolution of common inquiries' },
      { metric: 'Faster Resolution', value: '62%', icon: 'Zap', description: 'Instant response and routing' },
      { metric: 'Coverage', value: '24/7', icon: 'Clock', description: 'Always-on availability' },
      { metric: 'ROI', value: '3.5×', icon: 'DollarSign', description: 'Return within 6 months' },
    ],
    investment: { setup: '$6,500', recurring: '$2,500/month' },
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    summary: 'CDW reduced Tier 1 support 45% and achieved 3.5× ROI with Voice AI',
    tags: ['Voice AI', 'Customer Support', 'Automation'],
    isFeatured: true,
  },
  {
    id: 'naso-manufacturing',
    slug: 'naso-manufacturing-automation',
    title: 'NASO Industries: 40% Faster RFQ Cycles',
    company: 'NASO Industries',
    industry: 'Manufacturing & Engineering',
    solution: 'Intelligent Automation',
    challenge: 'Manual RFQ processing causing delays, engineering bottlenecks, and documentation errors.',
    timeline: '12 weeks',
    stack: ['Custom AI Models', 'n8n Automation', 'Real-time Analytics', 'ERP Integration'],
    outcomes: [
      { metric: 'Workload Reduction', value: '30-50%', icon: 'TrendingDown' },
      { metric: 'Faster RFQ Cycles', value: '40%', icon: 'Zap' },
      { metric: 'Error Reduction', value: '75%', icon: 'CheckCircle' },
      { metric: 'Production Visibility', value: 'Real-time', icon: 'Eye' },
    ],
    investment: { setup: 'Custom Quote', recurring: 'Custom Quote' },
    thumbnail: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&q=80',
    summary: 'NASO Industries cut manual quoting 30-50% with AI automation',
    tags: ['Manufacturing', 'Automation', 'AI'],
    isPlaceholder: true,
  },
];

export const aggregateMetrics = {
  clientsServed: 8,
  hoursSavedMonthly: 2400,
  averageROI: '3.5×',
  industries: ['Technology', 'Manufacturing', 'Healthcare', 'Financial Services'],
  successfulImplementations: 12,
  clientSatisfaction: 98,
};

export const technologyStack = [
  {
    id: 'n8n',
    name: 'n8n',
    category: 'Workflow Automation Platform',
    description: 'Enterprise-grade workflow orchestration connecting 400+ apps and services.',
    useCases: ['Data synchronization', 'Multi-system workflows', 'Event-driven automation'],
    logo: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80',
  },
  {
    id: 'mindstudio',
    name: 'MindStudio.ai',
    category: 'AI Agent Orchestration',
    description: 'Sophisticated AI agent platform for building intelligent systems.',
    useCases: ['Voice AI brains', 'Conversational logic', 'Intelligent routing'],
    logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80',
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    category: 'Natural Voice Synthesis',
    description: 'Industry-leading text-to-speech technology delivering human-quality voice.',
    useCases: ['Customer-facing voice AI', 'IVR systems', 'Voice assistants'],
    logo: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400&q=80',
  },
];
