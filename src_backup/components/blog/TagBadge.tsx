import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface TagBadgeProps {
  name: string;
  slug: string;
}

export const TagBadge = ({ name, slug }: TagBadgeProps) => {
  return (
    <Link to={`/blog/tag/${slug}`}>
      <Badge 
        variant="secondary" 
        className="cursor-pointer hover:bg-primary/20 hover:text-primary transition-all hover:scale-105"
      >
        {name}
      </Badge>
    </Link>
  );
};
