import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { Badge } from '@/components/ui/badge';
import { initInViewAnimations } from '@/utils/scrollAnimations';

export const FeaturedResourcesSection = () => {
  const { data: posts, isLoading } = useBlogPosts();
  const featuredPosts = posts?.slice(0, 6) || [];

  // Re-initialize scroll animations when content loads
  useEffect(() => {
    if (!isLoading && featuredPosts.length > 0) {
      // Small delay to ensure DOM is fully updated
      setTimeout(() => {
        initInViewAnimations();
      }, 100);
    }
  }, [isLoading, featuredPosts.length]);

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white/[0.02] to-transparent border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="mb-12">
            <div className="h-10 w-64 bg-white/5 rounded-lg mb-4 animate-pulse"></div>
            <div className="h-6 w-96 bg-white/5 rounded-lg animate-pulse"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="relative overflow-hidden backdrop-blur-sm bg-white/5 rounded-2xl ring-1 ring-white/10">
                {/* Shimmer overlay */}
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                
                {/* Image skeleton */}
                <div className="aspect-video bg-white/10 animate-pulse"></div>
                
                {/* Content skeleton */}
                <div className="p-6 space-y-4">
                  {/* Badge */}
                  <div className="h-6 w-24 bg-white/10 rounded-full animate-pulse"></div>
                  
                  {/* Title */}
                  <div className="space-y-2">
                    <div className="h-6 w-full bg-white/10 rounded animate-pulse"></div>
                    <div className="h-6 w-4/5 bg-white/10 rounded animate-pulse"></div>
                  </div>
                  
                  {/* Excerpt */}
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-white/10 rounded animate-pulse"></div>
                    <div className="h-4 w-full bg-white/10 rounded animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse"></div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="h-4 w-20 bg-white/10 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-white/10 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white/[0.02] to-transparent border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="mb-12 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-white mb-4">
            Featured Resources
          </h2>
          <p className="text-lg text-white/60 max-w-3xl">
            Latest insights, guides, and case studies from our team
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group animate-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative backdrop-blur-sm bg-white/5 rounded-2xl ring-1 ring-white/10 overflow-hidden hover:bg-white/10 hover:ring-white/20 transition-all duration-300">
                  {post.featured_image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    {post.category && (
                      <Badge variant="secondary" className="mb-3">
                        {post.category}
                      </Badge>
                    )}
                    
                    <h3 className="text-xl font-medium text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm text-white/60 mb-4 line-clamp-3">
                      {post.excerpt || post.meta_description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-white/40">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>5 min read</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                        Read Article
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center animate-on-scroll">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
