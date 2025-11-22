import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BlogCard } from './BlogCard';

interface RelatedPostsProps {
  category: string;
  currentPostId: string;
}

export const RelatedPosts = ({ category, currentPostId }: RelatedPostsProps) => {
  const { data: relatedPosts } = useQuery({
    queryKey: ['related-posts', category, currentPostId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, category, excerpt, publish_date, views, featured_image')
        .eq('category', category)
        .eq('status', 'published')
        .neq('id', currentPostId)
        .order('publish_date', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data;
    }
  });

  if (!relatedPosts || relatedPosts.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-3">Continue Learning</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore more insights on AI implementation and business transformation
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
