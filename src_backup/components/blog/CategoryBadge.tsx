import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface CategoryBadgeProps {
  category: string;
  clickable?: boolean;
}

const categoryColors: Record<string, string> = {
  'AI News': 'bg-blue-500/10 text-blue-400 ring-blue-500/20 hover:ring-blue-500/40',
  'AI Services': 'bg-purple-500/10 text-purple-400 ring-purple-500/20 hover:ring-purple-500/40',
  'AI Thought Leadership': 'bg-cyan-500/10 text-cyan-400 ring-cyan-500/20 hover:ring-cyan-500/40',
  'AI Tips': 'bg-green-500/10 text-green-400 ring-green-500/20 hover:ring-green-500/40',
  'AI Consulting': 'bg-orange-500/10 text-orange-400 ring-orange-500/20 hover:ring-orange-500/40',
  'AI in the Workplace': 'bg-pink-500/10 text-pink-400 ring-pink-500/20 hover:ring-pink-500/40',
};

export const CategoryBadge = ({ category, clickable = true }: CategoryBadgeProps) => {
  const colorClass = categoryColors[category] || 'bg-secondary text-secondary-foreground';
  
  const badge = (
    <Badge 
      variant="outline" 
      className={`${colorClass} ring-1 transition-all ${clickable ? 'cursor-pointer hover:scale-105' : ''}`}
    >
      {category}
    </Badge>
  );

  if (!clickable) return badge;

  return (
    <Link to={`/blog?category=${encodeURIComponent(category)}`}>
      {badge}
    </Link>
  );
};
