import { LucideIcon, Zap, Brain, MessageSquare, FileText, Eye, Wrench } from 'lucide-react';

export interface UseCase {
  title: string;
  problem: string;
  solution: string;
  outcome: string;
  metrics: string[];
}

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  details?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Integration {
  name: string;
  category: string;
}

export interface SolutionDetail {
  id: string;
  slug: string;
  name: string;
  icon: LucideIcon;
  tagline: string;
  valueProposition: string;
  problemStatement: string;
  howItWorks: {
    step: number;
    title: string;
    description: string;
  }[];
  useCases: UseCase[];
  features: Feature[];
  integrations: Integration[];
  faqs: FAQ[];
  relatedSolutions: string[];
  metrics: {
    label: string;
    value: string;
  }[];
}

export const solutionDetails: Record<string, SolutionDetail> = {
  'intelligent-automation': {
    id: '1',
    slug: 'intelligent-automation',
    name: 'Intelligent Automation',
    icon: Zap,
    tagline: 'Reduce manual work by 80% with AI that learns',
    valueProposition: 'We provide systems that transform repetitive workflows into intelligent, self-improving automation that frees your team to focus on high-value work.',
    problemStatement: 'Manual data entry, repetitive approvals, and routine tasks consume 60% of knowledge worker time. Traditional automation breaks when exceptions occur, requiring constant human intervention.',
    howItWorks: [
      {
        step: 1,
        title: 'Process Discovery',
        description: 'AI analyzes your existing workflows to identify automation opportunities and map decision logic.',
      },
      {
        step: 2,
        title: 'Smart Integration',
        description: 'Connect to your existing systems (CRM, ERP, email) without replacing infrastructure.',
      },
      {
        step: 3,
        title: 'Intelligent Execution',
        description: 'AI handles tasks autonomously, learning from exceptions to improve over time.',
      },
      {
        step: 4,
        title: 'Continuous Optimization',
        description: 'System adapts to changing patterns and provides insights for further efficiency gains.',
      },
    ],
    useCases: [
      {
        title: 'Invoice Processing Automation',
        problem: 'Many accounting teams spend 20+ hours weekly manually entering invoice data, matching purchase orders, and routing for approval.',
        solution: 'We provide AI systems that extract data from invoices (any format), validate against POs, flag discrepancies, and route approvals based on your business rules.',
        outcome: 'Clients typically see processing time reduced from 15 minutes to 30 seconds per invoice',
        metrics: ['95% accuracy', '80% time reduction', '$120K annual savings'],
      },
      {
        title: 'Customer Onboarding Automation',
        problem: 'Many businesses struggle with customer setup that requires coordination across multiple departments, taking 2-3 weeks with frequent delays and errors.',
        solution: 'We provide AI systems that orchestrate entire onboarding workflows: document collection, verification, account setup, and stakeholder notifications.',
        outcome: 'Clients typically see onboarding time reduced from 18 days to 2 days',
        metrics: ['90% faster', '60% error reduction', '4.8/5 customer satisfaction'],
      },
      {
        title: 'HR Document Processing',
        problem: 'HR teams often manually process employee forms, time-off requests, and compliance documents across fragmented systems.',
        solution: 'We provide intelligent automation that extracts data, validates completeness, routes for signatures, and updates multiple systems simultaneously.',
        outcome: 'Clients typically see HR admin time reduced by 70%, with improved compliance',
        metrics: ['70% time savings', '100% compliance', '98% accuracy'],
      },
    ],
    features: [
      {
        icon: Brain,
        title: 'Intelligent Decision Making',
        description: 'AI handles complex logic and exceptions without pre-programming every scenario.',
      },
      {
        icon: Zap,
        title: 'Real-Time Processing',
        description: 'Processes tasks instantly as they arrive, eliminating queue delays.',
      },
      {
        icon: FileText,
        title: 'Document Intelligence',
        description: 'Extracts data from any document format with 95%+ accuracy.',
      },
      {
        icon: MessageSquare,
        title: 'Smart Notifications',
        description: 'Alerts the right people at the right time with contextual information.',
      },
      {
        icon: Eye,
        title: 'Process Analytics',
        description: 'Real-time dashboards show bottlenecks and optimization opportunities.',
      },
      {
        icon: Wrench,
        title: 'No-Code Configuration',
        description: 'Business users can modify workflows without IT involvement.',
      },
    ],
    integrations: [
      { name: 'Salesforce', category: 'CRM' },
      { name: 'Microsoft Dynamics', category: 'ERP' },
      { name: 'SAP', category: 'ERP' },
      { name: 'Gmail / Outlook', category: 'Email' },
      { name: 'Slack / Teams', category: 'Communication' },
      { name: 'DocuSign', category: 'E-signature' },
    ],
    faqs: [
      {
        question: 'How long does implementation take?',
        answer: 'Typical implementation ranges from 4-8 weeks depending on process complexity. We start with a proof of concept (2 weeks) to demonstrate value before full deployment.',
      },
      {
        question: 'Will this replace my existing systems?',
        answer: 'No. Intelligent Automation integrates with your existing tools through APIs and connectors. No rip-and-replace required.',
      },
      {
        question: 'What happens when the AI encounters something new?',
        answer: 'The system routes exceptions to human reviewers and learns from their decisions. Over time, it handles more scenarios autonomously.',
      },
      {
        question: 'How do you ensure data security?',
        answer: 'All data is encrypted in transit and at rest. We support on-premise deployment or private cloud options with full audit trails.',
      },
      {
        question: 'What ROI can we expect?',
        answer: 'Most clients see 60-80% reduction in processing time within 3 months, with full ROI achieved in 6-12 months.',
      },
    ],
    relatedSolutions: ['document-intelligence', 'decision-intelligence'],
    metrics: [
      { label: 'Average Time Savings', value: '80%' },
      { label: 'Typical ROI Timeline', value: '6-12 months' },
      { label: 'Accuracy Rate', value: '95%+' },
    ],
  },
  
  'decision-intelligence': {
    id: '2',
    slug: 'decision-intelligence',
    name: 'Decision Intelligence',
    icon: Brain,
    tagline: 'Turn data into confident decisions with predictive AI',
    valueProposition: 'We provide systems that move you from reactive reporting to proactive insights. Our AI analyzes patterns across your data to predict outcomes and recommend optimal actions.',
    problemStatement: 'Business decisions rely on lagging indicators and gut instinct. By the time you spot trends in reports, market conditions have changed.',
    howItWorks: [
      {
        step: 1,
        title: 'Data Integration',
        description: 'Connect all your data sources into unified intelligence layer.',
      },
      {
        step: 2,
        title: 'Pattern Recognition',
        description: 'AI identifies correlations and trends that humans miss.',
      },
      {
        step: 3,
        title: 'Predictive Modeling',
        description: 'Generate forecasts with confidence intervals for key metrics.',
      },
      {
        step: 4,
        title: 'Actionable Recommendations',
        description: 'Receive prioritized recommendations with expected impact.',
      },
    ],
    useCases: [
      {
        title: 'Demand Forecasting',
        problem: 'Many businesses make inventory decisions based on last year sales, leading to stockouts and overstock.',
        solution: 'We provide AI systems that analyze sales history, seasonality, weather, and social trends to predict demand 3 months ahead.',
        outcome: 'Clients typically see inventory costs reduced by 30%, stockouts decreased 65%',
        metrics: ['94% forecast accuracy', '30% cost reduction', '40% waste reduction'],
      },
      {
        title: 'Customer Churn Prevention',
        problem: 'For many businesses, customer cancellations seem random, and by the time you notice, it is too late.',
        solution: 'We provide AI systems that identify leading indicators of churn and alert your team 30-60 days early with specific retention offers.',
        outcome: 'Clients typically see churn reduced by 25%, with retention teams focused on high-risk accounts',
        metrics: ['25% churn reduction', '85% prediction accuracy', '$2M revenue saved'],
      },
    ],
    features: [
      {
        icon: Brain,
        title: 'Predictive Analytics',
        description: 'Forecast outcomes 3-6 months ahead with confidence intervals.',
      },
      {
        icon: Zap,
        title: 'Real-Time Insights',
        description: 'Dashboards update continuously as new data arrives.',
      },
      {
        icon: Eye,
        title: 'Anomaly Detection',
        description: 'Automatically alerts when metrics deviate from expected patterns.',
      },
      {
        icon: FileText,
        title: 'Natural Language Queries',
        description: 'Ask questions in plain English about your business metrics.',
      },
    ],
    integrations: [
      { name: 'Salesforce', category: 'CRM' },
      { name: 'Google Analytics', category: 'Analytics' },
      { name: 'Tableau / Power BI', category: 'BI Tools' },
      { name: 'Snowflake', category: 'Data Warehouse' },
    ],
    faqs: [
      {
        question: 'How accurate are the predictions?',
        answer: 'Most models achieve 85-95% accuracy within 3 months of deployment. Accuracy improves over time as the model learns from actual outcomes.',
      },
      {
        question: 'Do we need a data science team?',
        answer: 'No. We build and maintain the models. Your team interacts through intuitive dashboards.',
      },
    ],
    relatedSolutions: ['intelligent-automation', 'conversational-ai'],
    metrics: [
      { label: 'Typical Forecast Accuracy', value: '85-95%' },
      { label: 'Decision Speed', value: '10x faster' },
      { label: 'ROI Timeline', value: '3-6 months' },
    ],
  },

  'conversational-ai': {
    id: '3',
    slug: 'conversational-ai',
    name: 'Conversational AI',
    icon: MessageSquare,
    tagline: 'Scale customer engagement with AI that sounds human',
    valueProposition: 'We provide systems that handle thousands of customer interactions simultaneously with AI that understands context and escalates intelligently.',
    problemStatement: 'Customer expectations for instant responses conflict with team capacity. Support costs scale linearly with volume.',
    howItWorks: [
      {
        step: 1,
        title: 'Knowledge Integration',
        description: 'AI learns from your help docs, past tickets, and product information.',
      },
      {
        step: 2,
        title: 'Natural Conversations',
        description: 'Customers interact via chat, email, or voice using natural language.',
      },
      {
        step: 3,
        title: 'Intelligent Resolution',
        description: 'AI handles complete resolution, escalating complex issues with full context.',
      },
      {
        step: 4,
        title: 'Continuous Learning',
        description: 'System learns from agent resolutions to expand capabilities.',
      },
    ],
    useCases: [
      {
        title: 'Customer Support Automation',
        problem: 'Many support teams are overwhelmed with 500+ daily tickets, where 70% are simple questions.',
        solution: 'We provide AI chatbots that handle tier-1 support 24/7 across web, email, and SMS channels.',
        outcome: 'Clients typically see support ticket volume reduced by 60%, with agent capacity redirected',
        metrics: ['60% ticket reduction', '95% CSAT score', '24/7 availability'],
      },
    ],
    features: [
      {
        icon: MessageSquare,
        title: 'Multi-Channel Support',
        description: 'Deploy across web chat, SMS, email, Slack, Teams, and voice.',
      },
      {
        icon: Brain,
        title: 'Context Understanding',
        description: 'Remembers conversation history and user preferences.',
      },
      {
        icon: Zap,
        title: 'Instant Responses',
        description: 'Sub-second response times even during peak volume.',
      },
      {
        icon: Eye,
        title: 'Sentiment Analysis',
        description: 'Detects frustration and escalates before issues escalate.',
      },
    ],
    integrations: [
      { name: 'Zendesk', category: 'Support' },
      { name: 'Intercom', category: 'Support' },
      { name: 'Salesforce Service Cloud', category: 'CRM' },
      { name: 'Slack / Teams', category: 'Communication' },
    ],
    faqs: [
      {
        question: 'How human-like are the conversations?',
        answer: 'Most users cannot distinguish AI from human agents in text conversations. We use advanced language models that understand context naturally.',
      },
      {
        question: 'What happens when AI cannot answer?',
        answer: 'The system recognizes its limitations and seamlessly transfers to a human agent with complete conversation history.',
      },
    ],
    relatedSolutions: ['intelligent-automation', 'document-intelligence'],
    metrics: [
      { label: 'Typical Automation Rate', value: '70-80%' },
      { label: 'Customer Satisfaction', value: '4.5/5' },
      { label: 'Cost Savings', value: '60-70%' },
    ],
  },

  'document-intelligence': {
    id: '4',
    slug: 'document-intelligence',
    name: 'Document Intelligence',
    icon: FileText,
    tagline: 'Extract insights from any document instantly',
    valueProposition: 'We provide systems that transform unstructured documents into structured data. Our AI reads and extracts information from any format or language.',
    problemStatement: 'Teams spend hours manually reviewing documents. PDFs and scanned images trap valuable information in inaccessible formats.',
    howItWorks: [
      {
        step: 1,
        title: 'Document Ingestion',
        description: 'Upload documents via API, email, or drag-and-drop.',
      },
      {
        step: 2,
        title: 'Intelligent OCR',
        description: 'AI reads text and understands document structure.',
      },
      {
        step: 3,
        title: 'Data Extraction',
        description: 'Extracts specific fields with 95%+ accuracy.',
      },
      {
        step: 4,
        title: 'System Integration',
        description: 'Automatically populates your systems.',
      },
    ],
    useCases: [
      {
        title: 'Contract Analysis',
        problem: 'Many legal teams manually review 100+ vendor contracts annually to track renewal dates and pricing terms.',
        solution: 'We provide AI systems that extract key terms, flag risky clauses, and build searchable contract databases.',
        outcome: 'Clients typically see contract review time reduced from 2 hours to 5 minutes',
        metrics: ['95% faster review', '100% compliance tracking', '$200K savings'],
      },
    ],
    features: [
      {
        icon: FileText,
        title: 'Universal Format Support',
        description: 'Handles PDFs, scans, images, Word docs, even handwritten notes.',
      },
      {
        icon: Brain,
        title: 'Contextual Understanding',
        description: 'Understands document meaning, not just text extraction.',
      },
      {
        icon: Eye,
        title: 'Table Extraction',
        description: 'Accurately extracts data from complex tables and forms.',
      },
      {
        icon: Zap,
        title: 'Real-Time Processing',
        description: 'Processes documents in seconds, handle thousands per day.',
      },
    ],
    integrations: [
      { name: 'SharePoint', category: 'Document Management' },
      { name: 'Box / Dropbox', category: 'Cloud Storage' },
      { name: 'SAP / Oracle', category: 'ERP' },
      { name: 'NetSuite', category: 'Accounting' },
    ],
    faqs: [
      {
        question: 'What types of documents can you process?',
        answer: 'Any business document: invoices, contracts, forms, receipts, reports, statements, medical records, legal documents.',
      },
      {
        question: 'How accurate is the extraction?',
        answer: '95-99% accuracy for standard documents. Accuracy improves as the system learns your specific formats.',
      },
    ],
    relatedSolutions: ['intelligent-automation', 'decision-intelligence'],
    metrics: [
      { label: 'Extraction Accuracy', value: '95-99%' },
      { label: 'Processing Speed', value: 'Seconds per doc' },
      { label: 'Cost Reduction', value: '70-80%' },
    ],
  },

  'computer-vision': {
    id: '5',
    slug: 'computer-vision',
    name: 'Computer Vision',
    icon: Eye,
    tagline: 'AI that sees, understands, and acts on visual data',
    valueProposition: 'We provide AI systems that process images and video in real-time for quality control, safety monitoring, and inventory management.',
    problemStatement: 'Visual inspection requires constant human attention. Quality issues and safety violations go unnoticed until they become costly problems.',
    howItWorks: [
      {
        step: 1,
        title: 'Camera Integration',
        description: 'Connect existing cameras or deploy new ones.',
      },
      {
        step: 2,
        title: 'AI Training',
        description: 'Train models on your specific use case using your images.',
      },
      {
        step: 3,
        title: 'Real-Time Analysis',
        description: 'AI processes video continuously, detecting patterns and anomalies.',
      },
      {
        step: 4,
        title: 'Intelligent Alerts',
        description: 'System alerts humans only when action is needed.',
      },
    ],
    useCases: [
      {
        title: 'Manufacturing Quality Control',
        problem: 'Human inspectors typically catch 85-90% of defects, with the remaining 10-15% reaching customers.',
        solution: 'We provide computer vision systems that inspect 100% of products at full production speed.',
        outcome: 'Clients typically see defect detection improved from 88% to 99.5%',
        metrics: ['99.5% detection', '100% inspection', '90% cost reduction'],
      },
    ],
    features: [
      {
        icon: Eye,
        title: 'Object Detection',
        description: 'Identify and locate specific objects or components.',
      },
      {
        icon: Brain,
        title: 'Anomaly Detection',
        description: 'Spot defects and unusual patterns that deviate from normal.',
      },
      {
        icon: Zap,
        title: 'Real-Time Processing',
        description: 'Analyze video streams in real-time with sub-second latency.',
      },
      {
        icon: MessageSquare,
        title: 'Custom Training',
        description: 'Train AI on your specific products and environments.',
      },
    ],
    integrations: [
      { name: 'IP Cameras', category: 'Hardware' },
      { name: 'SCADA Systems', category: 'Manufacturing' },
      { name: 'Warehouse Management', category: 'Logistics' },
      { name: 'POS Systems', category: 'Retail' },
    ],
    faqs: [
      {
        question: 'Do we need special cameras?',
        answer: 'Usually no. We work with most existing IP cameras and security systems.',
      },
      {
        question: 'How accurate is the AI?',
        answer: 'Accuracy typically exceeds human inspectors at 99%+. We guarantee performance levels in deployment.',
      },
    ],
    relatedSolutions: ['intelligent-automation', 'decision-intelligence'],
    metrics: [
      { label: 'Detection Accuracy', value: '99%+' },
      { label: 'Processing Speed', value: '30+ FPS' },
      { label: 'Cost Savings', value: '80-90%' },
    ],
  },

  'custom-solutions': {
    id: '6',
    slug: 'custom-solutions',
    name: 'Custom AI Solutions',
    icon: Wrench,
    tagline: 'Purpose-built AI for your unique business challenges',
    valueProposition: 'When off-the-shelf solutions do not fit, we build custom AI systems tailored to your specific processes and objectives.',
    problemStatement: 'Your competitive advantage comes from unique capabilities. Generic AI tools force you to adapt your processes.',
    howItWorks: [
      {
        step: 1,
        title: 'Discovery & Strategy',
        description: '2-4 week engagement to understand your challenges and define ROI model.',
      },
      {
        step: 2,
        title: 'Proof of Concept',
        description: 'Build working prototype to validate approach before full investment.',
      },
      {
        step: 3,
        title: 'Production Development',
        description: 'Engineer scalable, production-ready solution with full integration.',
      },
      {
        step: 4,
        title: 'Deployment',
        description: 'Deploy with training, documentation, and ongoing support.',
      },
    ],
    useCases: [
      {
        title: 'Proprietary Algorithm Enhancement',
        problem: 'Many financial services firms have competitive advantages through proprietary algorithms but struggle with optimization.',
        solution: 'We build custom AI that optimizes algorithm parameters in real-time based on market conditions.',
        outcome: 'Clients can see algorithm performance improved by 34%, manual oversight reduced 80%',
        metrics: ['34% performance gain', '80% less manual work', '15% risk reduction'],
      },
    ],
    features: [
      {
        icon: Wrench,
        title: 'Fully Customized',
        description: 'Built specifically for your use case and data.',
      },
      {
        icon: Brain,
        title: 'Your IP',
        description: 'You own all models, code, and intellectual property.',
      },
      {
        icon: Zap,
        title: 'Enterprise Integration',
        description: 'Deep integration with your existing systems.',
      },
      {
        icon: Eye,
        title: 'Explainable AI',
        description: 'Understand how and why AI makes decisions.',
      },
    ],
    integrations: [
      { name: 'Any System', category: 'Custom APIs' },
      { name: 'Legacy Databases', category: 'Data' },
      { name: 'Enterprise Software', category: 'ERP/CRM' },
      { name: 'Cloud Platforms', category: 'Infrastructure' },
    ],
    faqs: [
      {
        question: 'How much does custom development cost?',
        answer: 'Projects range from $100K to $1M+ depending on complexity. We start with discovery to provide fixed-price proposal.',
      },
      {
        question: 'How long does development take?',
        answer: 'Discovery: 2-4 weeks. POC: 4-8 weeks. Full production: 3-9 months depending on complexity.',
      },
    ],
    relatedSolutions: ['intelligent-automation', 'decision-intelligence'],
    metrics: [
      { label: 'Typical Timeline', value: '4-9 months' },
      { label: 'Average ROI', value: '12-18 months' },
      { label: 'Client Satisfaction', value: '4.8/5' },
    ],
  },
};
