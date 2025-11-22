import { useParams, Link } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageMeta } from '@/components/seo/PageMeta';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { ArticleSchema } from '@/components/seo/ArticleSchema';
import { useBlogPost } from '@/hooks/useBlogPosts';
import { CategoryBadge } from '@/components/blog/CategoryBadge';
import { TagBadge } from '@/components/blog/TagBadge';
import { ArticleMeta } from '@/components/blog/ArticleMeta';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { SourcesList } from '@/components/blog/SourcesList';
import { InlineContactCTA } from '@/components/blog/InlineContactCTA';
import { ContactCTACard } from '@/components/blog/ContactCTACard';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { Loader2, Home, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';
import { trackEvent } from '@/utils/analytics';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = useBlogPost(slug!);

  useEffect(() => {
    if (post) {
      trackEvent('blog_post_view', {
        post_title: post.title,
        category: post.category,
      });
    }
  }, [post]);

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

  if (error || !post) {
    return (
      <PageLayout>
        <SectionContainer>
          <div className="text-center py-20 space-y-4">
            <h1 className="text-3xl font-bold text-foreground">Article Not Found</h1>
            <p className="text-muted-foreground">The article you're looking for doesn't exist or has been removed.</p>
            <Link to="/blog" className="text-primary hover:underline inline-block">
              ← Back to Blog
            </Link>
          </div>
        </SectionContainer>
      </PageLayout>
    );
  }

  const postUrl = `https://elevatedai.co/blog/${post.slug}`;
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.category, url: `/blog?category=${encodeURIComponent(post.category)}` },
    { name: post.title, url: postUrl }
  ];
  
  const sources = Array.isArray(post.sources) ? post.sources as Array<{ title: string; url: string }> : [];

  return (
    <PageLayout>
      <PageMeta 
        title={post.meta_title}
        description={post.meta_description}
        keywords={post.keywords.join(', ')}
        canonical={postUrl}
        ogImage={post.featured_image}
        ogType="article"
      />
      
      <ArticleSchema
        title={post.title}
        description={post.meta_description}
        author={post.author}
        publishDate={post.publish_date}
        modifiedDate={post.updated_at}
        imageUrl={post.featured_image}
        url={postUrl}
      />

      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Breadcrumb Navigation */}
      <SectionContainer>
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/blog" className="hover:text-primary transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{post.category}</span>
        </nav>
      </SectionContainer>

      {/* Article Header */}
      <SectionContainer>
        <div className="max-w-4xl mx-auto space-y-6">
          <CategoryBadge category={post.category} />
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            {post.title}
          </h1>
          
          <ArticleMeta 
            author={post.author}
            date={post.publish_date}
            views={post.views}
          />

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: any) => (
                <TagBadge key={tag.id} name={tag.name} slug={tag.slug} />
              ))}
            </div>
          )}
          
          {post.featured_image && (
            <div className="aspect-video rounded-lg overflow-hidden">
              <img 
                src={post.featured_image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </SectionContainer>

      {/* Article Content */}
      <SectionContainer>
        <div className="max-w-4xl mx-auto">
          <article 
            className="prose prose-lg max-w-none
              prose-headings:text-foreground prose-headings:font-bold
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b-2 prose-h2:border-primary/30
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-primary
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-primary prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
              prose-strong:text-primary prose-strong:font-bold
              prose-ul:my-6 prose-ul:space-y-3 prose-ul:text-muted-foreground 
              prose-ol:my-6 prose-ol:space-y-3 prose-ol:text-muted-foreground
              prose-li:leading-relaxed
              prose-li:marker:text-primary prose-li:marker:font-bold
              prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
              prose-figcaption:text-sm prose-figcaption:text-muted-foreground prose-figcaption:text-center prose-figcaption:mt-3
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: post.content_html }}
          />
        </div>
      </SectionContainer>

      {/* Mid-Article CTA */}
      <SectionContainer>
        <div className="max-w-4xl mx-auto">
          <InlineContactCTA />
        </div>
      </SectionContainer>

      {/* Sources */}
      {sources.length > 0 && (
        <SectionContainer>
          <div className="max-w-4xl mx-auto">
            <SourcesList sources={sources} />
          </div>
        </SectionContainer>
      )}

      {/* Share Buttons */}
      <SectionContainer>
        <div className="max-w-4xl mx-auto">
          <ShareButtons url={postUrl} title={post.title} />
        </div>
      </SectionContainer>

      {/* Bottom CTA */}
      <SectionContainer>
        <ContactCTACard />
      </SectionContainer>

      {/* Related Posts */}
      <SectionContainer>
        <RelatedPosts category={post.category} currentPostId={post.id} />
      </SectionContainer>
    </PageLayout>
  );
};

export default BlogPost;
