export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  industry: string;
  summary: string;
  metric1: string;
  metric2: string;
  thumbnail: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    slug: 'healthcare-document-automation',
    title: 'Healthcare Provider Automates Patient Intake',
    industry: 'Healthcare',
    summary: 'Reduced patient intake processing time by 65% using AI-powered document intelligence.',
    metric1: '↓ 65% processing time',
    metric2: '$2M annual savings',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
  },
  {
    id: '2',
    slug: 'retail-demand-forecasting',
    title: 'Retail Chain Optimizes Inventory',
    industry: 'Retail',
    summary: 'Achieved 94% forecasting accuracy, reducing waste and improving stock availability.',
    metric1: '↑ 94% accuracy',
    metric2: '↓ 40% waste',
    thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
  },
  {
    id: '3',
    slug: 'finance-customer-support',
    title: 'Financial Services Scales Support',
    industry: 'Financial Services',
    summary: 'Automated 80% of customer inquiries while improving satisfaction scores by 25%.',
    metric1: '↑ 80% automation',
    metric2: '↑ 25% satisfaction',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
];
