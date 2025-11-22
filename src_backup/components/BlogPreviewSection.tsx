import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { format } from 'date-fns';

export const BlogPreviewSection = () => {
  const { data: posts, isLoading } = useBlogPosts();
  const latestPosts = posts?.slice(0, 3) || [];

  if (isLoading) {
    return (
      <section className="relative z-10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-normal tracking-tight font-geist mb-4">
              Insights & AI Resources
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="backdrop-blur-sm bg-white/5 rounded-2xl ring-1 ring-white/10 h-80 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!latestPosts.length) return null;

  return (
    <section className="relative z-10 py-16 md:py-24 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.2s_both]">
          <h2 className="text-3xl md:text-4xl font-normal tracking-tight font-geist mb-4">
            Insights & AI Resources
          </h2>
          <p className="text-lg text-muted-foreground font-geist max-w-2xl mx-auto">
            AI audits, voice agent strategies, automation frameworks, and executive guides
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {latestPosts.map((post, index) => {
            const delay = 0.3 + index * 0.1;
            return (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className={`group block animate-on-scroll [animation:fadeSlideIn_1s_ease-out_${delay}s_both]`}
              >
                <div className="backdrop-blur-sm bg-white/5 rounded-2xl ring-1 ring-white/10 overflow-hidden hover:ring-cyan-500/30 transition-all duration-500 h-full flex flex-col">
                  {post.featured_image && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-xs text-cyan-400 mb-2 font-geist uppercase tracking-wider">
                      {post.category}
                    </div>
                    <h3 className="text-xl font-medium mb-2 group-hover:text-cyan-300 transition-colors font-geist line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 font-geist leading-relaxed line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-geist">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(post.publish_date), 'MMM d, yyyy')}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-cyan-300 group-hover:gap-3 transition-all">
                        Read more
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium font-geist backdrop-blur-sm bg-white/10 ring-1 ring-white/20 hover:bg-white/15 hover:ring-white/30 transition-all text-white"
          >
            View All Insights
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
