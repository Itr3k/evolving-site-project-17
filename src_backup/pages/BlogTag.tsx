import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageMeta } from '@/components/seo/PageMeta';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { BlogCard } from '@/components/blog/BlogCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';

const BlogTag = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ['blog-tag', slug],
    queryFn: async () => {
      // Get tag info
      const { data: tag, error: tagError } = await supabase
        .from('blog_tags')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (tagError) throw tagError;

      // Get posts with this tag
      const { data: postTags, error: postsError } = await supabase
        .from('blog_post_tags')
        .select('blog_posts(*)')
        .eq('tag_id', tag.id);
      
      if (postsError) throw postsError;

      const posts = postTags
        .map((pt: any) => pt.blog_posts)
        .filter((p: any) => p && p.status === 'published')
        .sort((a: any, b: any) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime());

      return { tag, posts };
    }
  });

  if (isLoading) {
    return (
      <PageLayout>
        <SectionContainer>
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </SectionContainer>
      </PageLayout>
    );
  }

  if (!data) return null;

  const { tag, posts } = data;

  return (
    <PageLayout>
      <PageMeta 
        title={`${tag.name} - AI Blog Articles`}
        description={tag.description || `Explore our latest AI articles about ${tag.name}. Expert insights from Los Angeles-based AI consultants.`}
        keywords={`${tag.name}, AI blog, AI consulting, Los Angeles AI, artificial intelligence`}
        canonical={`https://elevatedai.co/blog/tag/${slug}`}
      />

      <SectionContainer className="text-center">
        <Link to="/blog">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          {tag.name}
        </h1>
        {tag.description && (
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            {tag.description}
          </p>
        )}
        <p className="text-muted-foreground">
          {posts.length} {posts.length === 1 ? 'article' : 'articles'}
        </p>
      </SectionContainer>

      <SectionContainer>
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              No articles found with this tag yet. Check back soon!
            </p>
          </div>
        )}
      </SectionContainer>
    </PageLayout>
  );
};

export default BlogTag;
