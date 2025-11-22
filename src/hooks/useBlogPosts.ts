import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useBlogPosts = (category?: string) => {
  return useQuery({
    queryKey: ['blog-posts', category],
    queryFn: async () => {
      let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('publish_date', { ascending: false });
      
      if (category && category !== 'All Categories') {
        query = query.eq('category', category);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });
};

export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data: post, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();
      
      if (error) throw error;
      
      // Fetch tags for this post
      const { data: tagData } = await supabase
        .from('blog_post_tags')
        .select('blog_tags(id, name, slug)')
        .eq('post_id', post.id);
      
      const tags = tagData?.map((t: any) => t.blog_tags).filter(Boolean) || [];
      
      // Increment view count using the database function
      await supabase.rpc('increment_post_views', { post_id: post.id });
      
      return { ...post, tags, views: post.views + 1 };
    }
  });
};
