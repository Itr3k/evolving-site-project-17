import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageMeta } from '@/components/seo/PageMeta';
import { SectionContainer } from '@/components/layout/SectionContainer';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { BlogCard } from '@/components/blog/BlogCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

const categories = [
  'All Categories',
  'AI News',
  'AI Services',
  'AI Thought Leadership',
  'AI Tips',
  'AI Consulting',
  'AI in the Workplace'
];

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All Categories';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const { data: posts, isLoading } = useBlogPosts(selectedCategory);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All Categories') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  return (
    <PageLayout>
      <PageMeta 
        title="AI Insights & Resources - Blog"
        description="Expert insights on AI consulting, automation, and workplace AI from Los Angeles-based AI consultants. Discover the latest AI trends, tips, and strategies for Southern California businesses."
        keywords="AI blog, AI consulting insights, AI automation tips, Los Angeles AI, Southern California AI, AI thought leadership, workplace AI, AI services"
        canonical="https://elevatedai.co/blog"
      />

      {/* Hero Section */}
      <SectionContainer className="text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            AI Insights & Resources
          </h1>
          <p className="text-xl text-muted-foreground">
            Latest articles on AI consulting, automation strategies, and workplace transformation from our Los Angeles-based team
          </p>
        </div>
      </SectionContainer>

      {/* Category Filter */}
      <SectionContainer>
        <div className="max-w-xs mx-auto">
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </SectionContainer>

      {/* Blog Grid */}
      <SectionContainer>
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              No articles found in this category yet. Check back soon!
            </p>
          </div>
        )}
      </SectionContainer>
    </PageLayout>
  );
};

export default Blog;
