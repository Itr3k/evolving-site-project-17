import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/ui/glass-card';
import { CategoryBadge } from './CategoryBadge';
import { Eye, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface BlogCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    publish_date: string;
    views: number;
    featured_image?: string;
  };
}

export const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link to={`/blog/${post.slug}`} className="block group">
      <GlassCard className="h-full overflow-hidden transition-all duration-300 hover:ring-2 hover:ring-primary/50 hover:scale-[1.02]">
        {post.featured_image && (
          <div className="aspect-video overflow-hidden">
            <img 
              src={post.featured_image} 
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-6 space-y-4">
          <CategoryBadge category={post.category} />
          
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          <p className="text-muted-foreground line-clamp-3">
            {post.excerpt}
          </p>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(post.publish_date), 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{post.views} views</span>
            </div>
          </div>
          
          <div className="text-primary font-medium group-hover:gap-2 transition-all flex items-center gap-1">
            Read More
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
};
