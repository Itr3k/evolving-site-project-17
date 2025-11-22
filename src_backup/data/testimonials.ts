export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'Elevated AI reduced our processing time by 65% and saved us $2M annually. The Document Intelligence solution transformed our entire intake workflow.',
    name: 'Sarah Chen',
    role: 'VP of Operations',
    company: 'HealthTech Solutions',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    rating: 5,
  },
  {
    id: '2',
    quote: 'Their Decision Intelligence platform gave us predictive insights we never had before. We can now forecast demand 3 months ahead with 94% accuracy.',
    name: 'Marcus Johnson',
    role: 'Chief Data Officer',
    company: 'RetailCorp',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    rating: 5,
  },
  {
    id: '3',
    quote: 'The Conversational AI solution handles 80% of our customer inquiries automatically, with higher satisfaction scores than our previous human-only approach.',
    name: 'Emily Rodriguez',
    role: 'Customer Experience Director',
    company: 'FinanceHub',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    rating: 5,
  },
];
