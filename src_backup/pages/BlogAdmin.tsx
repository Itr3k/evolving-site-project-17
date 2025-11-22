import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, CheckCircle, XCircle, RefreshCw, Eye, Edit, Trash2, TrendingUp, AlertTriangle, FileText, Zap, LogOut } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  status: string;
  category: string;
  views: number;
  publish_date: string;
  last_enhanced_at: string | null;
  enhancement_version: number;
  needs_refresh: boolean;
}

interface GenerationError {
  id: string;
  error_type: string;
  error_message: string;
  created_at: string;
  resolved: boolean;
}

interface Stats {
  total: number;
  published: number;
  draft: number;
  errors: number;
  totalViews: number;
}

const categories = [
  'AI News',
  'AI Services',
  'AI Thought Leadership',
  'AI Tips',
  'AI Consulting',
  'AI in the Workplace'
];

export default function BlogAdmin() {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [errors, setErrors] = useState<GenerationError[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, published: 0, draft: 0, errors: 0, totalViews: 0 });
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [generatingCategory, setGeneratingCategory] = useState<string | null>(null);
  const [generationResults, setGenerationResults] = useState<Record<string, { success: boolean; title?: string; error?: string }>>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Fetch all posts
      const { data: postsData, error: postsError } = await supabase
        .from('blog_posts')
        .select('*')
        .order('publish_date', { ascending: false });

      if (postsError) throw postsError;

      setPosts(postsData || []);

      // Calculate stats
      const stats: Stats = {
        total: postsData?.length || 0,
        published: postsData?.filter(p => p.status === 'published').length || 0,
        draft: postsData?.filter(p => p.status === 'draft').length || 0,
        errors: 0,
        totalViews: postsData?.reduce((sum, p) => sum + (p.views || 0), 0) || 0
      };

      // Fetch unresolved errors
      const { data: errorsData, error: errorsError } = await supabase
        .from('blog_generation_errors')
        .select('*')
        .eq('resolved', false)
        .order('created_at', { ascending: false })
        .limit(10);

      if (!errorsError && errorsData) {
        setErrors(errorsData);
        stats.errors = errorsData.length;
      }

      setStats(stats);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const generateArticle = async (category: string) => {
    setGeneratingCategory(category);
    toast.info(`Generating article for ${category}...`);

    try {
      const { data, error } = await supabase.functions.invoke('generate-blog-post-manual', {
        body: { category },
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });

      if (error) throw error;

      if (data.success) {
        setGenerationResults(prev => ({
          ...prev,
          [category]: { success: true, title: data.post.title }
        }));
        toast.success(`✓ ${category}: "${data.post.title}"`);
        loadData(); // Refresh the list
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to generate article';
      setGenerationResults(prev => ({
        ...prev,
        [category]: { success: false, error: errorMsg }
      }));
      toast.error(`✗ ${category}: ${errorMsg}`);
    } finally {
      setGeneratingCategory(null);
    }
  };

  const generateAll = async () => {
    for (const category of categories) {
      if (!generationResults[category]?.success) {
        await generateArticle(category);
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }
    toast.success('All articles generated!');
  };

  const updatePostStatus = async (postId: string, newStatus: string) => {
    setActionLoading(postId);
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ status: newStatus })
        .eq('id', postId);

      if (error) throw error;

      toast.success(`Post ${newStatus === 'published' ? 'published' : 'unpublished'} successfully`);
      loadData();
    } catch (error) {
      toast.error('Failed to update post status');
    } finally {
      setActionLoading(null);
    }
  };

  const deletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post? This cannot be undone.')) return;

    setActionLoading(postId);
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      toast.success('Post deleted successfully');
      loadData();
    } catch (error) {
      toast.error('Failed to delete post');
    } finally {
      setActionLoading(null);
    }
  };

  const triggerEnhancement = async (postId: string) => {
    setActionLoading(postId);
    toast.info('Triggering Editor Agent...');

    try {
      const { data, error } = await supabase.functions.invoke('enhance-blog-post', {
        body: { postId },
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });

      if (error) throw error;

      toast.success('Enhancement complete!');
      loadData();
    } catch (error) {
      toast.error('Enhancement failed');
    } finally {
      setActionLoading(null);
    }
  };

  const triggerRefresh = async () => {
    setActionLoading('refresh');
    toast.info('Triggering Content Refresh Agent...');

    try {
      const { data, error } = await supabase.functions.invoke('content-refresh-agent', {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });

      if (error) throw error;

      toast.success(data.message || 'Refresh complete!');
      loadData();
    } catch (error) {
      toast.error('Refresh failed');
    } finally {
      setActionLoading(null);
    }
  };

  const enhanceAllPosts = async () => {
    setActionLoading('enhance-all');
    const publishedPosts = posts.filter(p => p.status === 'published');
    toast.info(`Enhancing ${publishedPosts.length} published posts...`);

    let successCount = 0;
    let failCount = 0;

    for (const post of publishedPosts) {
      try {
        const { error } = await supabase.functions.invoke('enhance-blog-post', {
          body: { postId: post.id },
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });

        if (error) throw error;
        successCount++;
        toast.success(`Enhanced: ${post.title.substring(0, 30)}...`);
        
        // Small delay between enhancements
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        failCount++;
        console.error(`Failed to enhance ${post.title}:`, error);
      }
    }

    toast.success(`Bulk enhancement complete! ${successCount} succeeded, ${failCount} failed`);
    setActionLoading(null);
    loadData();
  };

  const resolveError = async (errorId: string) => {
    try {
      const { error } = await supabase
        .from('blog_generation_errors')
        .update({ resolved: true })
        .eq('id', errorId);

      if (error) throw error;

      toast.success('Error marked as resolved');
      loadData();
    } catch (error) {
      toast.error('Failed to resolve error');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Autonomous Blog System</h1>
            <p className="text-muted-foreground">
              AI-powered content generation, enhancement, and optimization dashboard
            </p>
          </div>
          <Button onClick={handleSignOut} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Total Posts</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.total}</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-muted-foreground">Published</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.published}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Edit className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-muted-foreground">Drafts</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.draft}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-medium text-muted-foreground">Total Views</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.totalViews.toLocaleString()}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium text-muted-foreground">Errors</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.errors}</p>
          </Card>
        </div>

        <Tabs defaultValue="posts" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="errors">Errors</TabsTrigger>
          </TabsList>

          {/* Posts Management */}
          <TabsContent value="posts" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-foreground">All Blog Posts</h2>
              <div className="flex gap-2">
                <Button
                  onClick={enhanceAllPosts}
                  disabled={actionLoading === 'enhance-all' || posts.filter(p => p.status === 'published').length === 0}
                  variant="default"
                  size="sm"
                >
                  {actionLoading === 'enhance-all' ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Enhancing All...</>
                  ) : (
                    <><Zap className="w-4 h-4 mr-2" /> Enhance All Posts</>
                  )}
                </Button>
                <Button
                  onClick={triggerRefresh}
                  disabled={actionLoading === 'refresh'}
                  variant="outline"
                  size="sm"
                >
                  {actionLoading === 'refresh' ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Refreshing...</>
                  ) : (
                    <><RefreshCw className="w-4 h-4 mr-2" /> Trigger Content Refresh</>
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id} className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{post.title}</h3>
                        <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                          {post.status}
                        </Badge>
                        {post.needs_refresh && (
                          <Badge variant="outline" className="text-orange-500">
                            Needs Refresh
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span>{post.category}</span>
                        <span>•</span>
                        <span>{new Date(post.publish_date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{post.views} views</span>
                        {post.last_enhanced_at && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Zap className="w-3 h-3" />
                              Enhanced v{post.enhancement_version}
                            </span>
                          </>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground">/blog/{post.slug}</p>
                    </div>

                    <div className="flex flex-col gap-2 min-w-[200px]">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>

                      {post.status === 'published' ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updatePostStatus(post.id, 'draft')}
                          disabled={actionLoading === post.id}
                        >
                          {actionLoading === post.id ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <XCircle className="w-4 h-4 mr-2" />
                          )}
                          Unpublish
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => updatePostStatus(post.id, 'published')}
                          disabled={actionLoading === post.id}
                        >
                          {actionLoading === post.id ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <CheckCircle className="w-4 h-4 mr-2" />
                          )}
                          Publish
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => triggerEnhancement(post.id)}
                        disabled={actionLoading === post.id}
                      >
                        {actionLoading === post.id ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <TrendingUp className="w-4 h-4 mr-2" />
                        )}
                        Enhance
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deletePost(post.id)}
                        disabled={actionLoading === post.id}
                      >
                        {actionLoading === post.id ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4 mr-2" />
                        )}
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Manual Generation */}
          <TabsContent value="generate" className="space-y-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Generate Initial Articles</h2>
              <p className="text-muted-foreground mb-4">
                Generate articles manually for each category. The daily CRON job (6 AM PST) will automatically generate and publish one article per day.
              </p>
              
              <Button 
                onClick={generateAll} 
                disabled={generatingCategory !== null}
                size="lg"
                className="w-full md:w-auto"
              >
                {generatingCategory ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>Generate All {categories.length} Articles</>
                )}
              </Button>
            </div>

            <div className="space-y-4">
              {categories.map((category) => {
                const result = generationResults[category];
                const isGenerating = generatingCategory === category;

                return (
                  <Card key={category} className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-1">{category}</h3>
                        {result?.success && (
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {result.title}
                          </p>
                        )}
                        {result?.error && (
                          <p className="text-sm text-destructive flex items-center gap-2">
                            <XCircle className="w-4 h-4" />
                            {result.error}
                          </p>
                        )}
                      </div>
                      <Button
                        onClick={() => generateArticle(category)}
                        disabled={generatingCategory !== null || result?.success}
                        variant={result?.success ? 'outline' : 'default'}
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Generating...
                          </>
                        ) : result?.success ? (
                          'Generated ✓'
                        ) : (
                          'Generate'
                        )}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="mt-8 p-6 bg-muted rounded-lg">
              <h3 className="text-lg font-semibold text-foreground mb-2">Automation Status</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Daily CRON: Generates 1 article at 6 AM PST (2 PM UTC)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Editor Agent: Automatically enhances all published posts
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Weekly Refresh: Updates old posts every Sunday at 3 AM PST
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  SEO: Sitemap & RSS automatically updated
                </li>
              </ul>
            </div>
          </TabsContent>

          {/* Error Logs */}
          <TabsContent value="errors" className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground mb-4">Error Log</h2>
            
            {errors.length === 0 ? (
              <Card className="p-8 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground">No errors!</p>
                <p className="text-sm text-muted-foreground">All systems running smoothly.</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {errors.map((error) => (
                  <Card key={error.id} className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                          <Badge variant="destructive">{error.error_type}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(error.created_at).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-foreground font-medium mb-2">{error.error_message}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => resolveError(error.id)}
                      >
                        Mark Resolved
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}