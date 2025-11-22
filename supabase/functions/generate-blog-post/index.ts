import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const categories = [
  'AI News',
  'AI Services',
  'AI Thought Leadership',
  'AI Tips',
  'AI Consulting',
  'AI in the Workplace'
];

async function selectCategory(supabase: any) {
  const { data: lastPost } = await supabase
    .from('blog_posts')
    .select('category')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  
  if (!lastPost) return categories[0];
  
  const lastIndex = categories.indexOf(lastPost.category);
  return categories[(lastIndex + 1) % categories.length];
}

async function callLovableAI(messages: any[]) {
  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Lovable AI error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function findTrendingTopic(category: string, recentTopics: any[]) {
  const recentKeywords = recentTopics.flatMap(t => t.keywords || []);
  
  const content = await callLovableAI([
    {
      role: "system",
      content: `You are an AI research assistant specializing in technology trends and business ROI. Your task is to identify trending AI news from THIS WEEK that would make compelling blog articles for an AI consulting firm based in Los Angeles serving Southern California businesses.

CRITICAL FOCUS AREAS:
1. What AI news broke THIS WEEK (last 7 days)?
2. How can businesses use this to:
   - Reduce operational costs (provide $ estimates)
   - Increase revenue (provide growth % examples)
   - Improve efficiency (provide time savings examples)
3. Include specific use cases for:
   - Small businesses (1-50 employees)
   - Mid-size businesses (50-500 employees)
   - Enterprises (500+ employees)`
    },
    {
      role: "user",
      content: `Find a trending AI news topic from THIS WEEK (last 7 days) in the category "${category}" for today (${new Date().toDateString()}).
      
REQUIREMENTS:
- Topic must be from AI news THIS WEEK (last 7 days)
- Focus on business ROI: cost savings, revenue generation, or efficiency gains
- Include concrete $ or % estimates where possible
- Emphasize practical implementation for Southern California businesses
- Avoid these recently covered keywords: ${recentKeywords.join(', ') || 'none'}

Return ONLY a JSON object with:
{
  "topic": "Main topic title (include 'This Week' or date reference)",
  "keywords": ["keyword1", "keyword2", "keyword3", "business ROI term"],
  "angle": "Specific business value angle (e.g., 'How this saves SMBs 30% on ops costs')",
  "why_trending": "Brief explanation of why this broke THIS WEEK and business impact",
  "roi_focus": "cost_savings OR revenue_generation OR efficiency_improvement"
}`
    }
  ]);

  try {
    // Robust JSON extraction (handles fenced blocks and stray text)
    const block = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    const cleanedContent = block ? block[1] : (() => {
      const start = content.indexOf('{');
      const end = content.lastIndexOf('}');
      return start !== -1 && end !== -1 && end > start ? content.slice(start, end + 1) : content;
    })();
    return JSON.parse(cleanedContent);
  } catch (e) {
    console.error("Failed to parse trending topic response:", content);
    throw new Error("Invalid JSON response from AI");
  }
}

async function generateArticle(trendingTopic: any, category: string) {
  const content = await callLovableAI([
    {
      role: "system",
      content: `You are a professional content writer for Elevated AI, a Los Angeles-based AI consulting firm serving Southern California businesses. Write engaging, informative, SEO-optimized blog articles about AI news and business ROI.

Writing Style:
- Professional yet approachable
- Focus on tangible business outcomes and ROI
- Include specific $ or % metrics for cost savings/revenue
- Provide real-world implementation examples
- Use clear section headings (H2, H3)
- Include a compelling introduction and conclusion
- Length: 700-1000 words

TONE: Focus on business value, not just technology features. Use phrases like:
- "save 20-40% on operational costs"
- "increase productivity by 3x"
- "reduce manual work by 15 hours/week"
- "generate 25% more revenue"`
    },
    {
      role: "user",
      content: `Write a blog article about THIS WEEK'S AI news: ${trendingTopic.topic}

Category: ${category}
Business Angle: ${trendingTopic.angle}
ROI Focus: ${trendingTopic.roi_focus || 'cost_savings'}
Keywords to incorporate: ${trendingTopic.keywords.join(', ')}, AI consultant Los Angeles, AI automation Southern California

CRITICAL HTML FORMATTING RULES:
- DO NOT include H1 tags (title is rendered separately)
- Start content with a compelling intro paragraph using <p> tags
- Use <h2> for main sections
- Use <h3> for subsections
- Use <ul> and <li> for bullet lists
- Use <strong> for emphasis on key metrics and phrases
- Wrap every paragraph in <p> tags
- Add proper spacing between sections

REQUIRED SECTIONS:
1. Opening paragraph (2-3 sentences introducing the topic)
2. <h2>What Happened This Week</h2> - Latest news (2-3 paragraphs)
3. <h2>Business Impact Analysis</h2> - Bottom line effects (use <strong> for metrics)
4. <h2>ROI Breakdown</h2> - Specific savings/revenue (bullet list with <ul><li>)
5. <h2>Implementation Roadmap</h2> - 3-5 steps (numbered list <ol><li>)
6. <h2>Why Southern California Businesses Should Act Now</h2> - Local urgency
7. <h2>Key Takeaways</h2> - Summary bullets (<ul><li>)
8. DO NOT include a CTA section

CONTENT REQUIREMENTS:
- Reference news from THIS WEEK (last 7 days)
- Include at least 3 specific <strong>$ or % metrics</strong>
- Provide concrete implementation examples
- Mention at least 1 real company/product name
- Include business size recommendations (SMB vs Enterprise)

Also research and provide 3-5 reputable sources (URLs) from this week's news.

Return ONLY a JSON object:
{
  "title": "Article title (NO 'This Week:' prefix, just the topic)",
  "content": "Full HTML with <h2>, <h3>, <p>, <ul>, <li>, <strong> tags properly structured",
  "excerpt": "Compelling 150-character excerpt highlighting business value",
  "sources": [
    {"title": "Source title", "url": "https://...", "date": "2024-XX-XX"}
  ]
}`
    }
  ]);

  try {
    // Robust JSON extraction (handles fenced blocks and stray text)
    const block = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    const cleanedContent = block ? block[1] : (() => {
      const start = content.indexOf('{');
      const end = content.lastIndexOf('}');
      return start !== -1 && end !== -1 && end > start ? content.slice(start, end + 1) : content;
    })();
    return JSON.parse(cleanedContent);
  } catch (e) {
    console.error("Failed to parse article response:", content);
    throw new Error("Invalid JSON response from AI");
  }
}

async function generateSEOMetadata(article: any) {
  const content = await callLovableAI([
    {
      role: "system",
      content: `Generate SEO metadata for blog articles. Focus on click-worthy, keyword-rich titles and descriptions.`
    },
    {
      role: "user",
      content: `Create SEO metadata for this article:

Title: ${article.title}
Content preview: ${article.content.substring(0, 300)}...

Requirements:
- Meta title: 50-60 characters, include primary keyword
- Meta description: 150-160 characters, compelling with CTA
- Keywords: 8-12 relevant keywords including location terms (Los Angeles, Southern California)

Return ONLY a JSON object:
{
  "title": "SEO title",
  "description": "Meta description",
  "keywords": ["keyword1", "keyword2"]
}`
    }
  ]);

  try {
    // Robust JSON extraction (handles fenced blocks and stray text)
    const block = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    const cleanedContent = block ? block[1] : (() => {
      const start = content.indexOf('{');
      const end = content.lastIndexOf('}');
      return start !== -1 && end !== -1 && end > start ? content.slice(start, end + 1) : content;
    })();
    return JSON.parse(cleanedContent);
  } catch (e) {
    console.error("Failed to parse SEO metadata response:", content);
    throw new Error("Invalid JSON response from AI");
  }
}

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 100);
}

function getFeaturedImage(category: string): string {
  // Rotate through AI/tech themed Unsplash images based on category
  const images: Record<string, string> = {
    'AI News': 'photo-1677442136019-21780ecad995', // AI brain visualization
    'AI Services': 'photo-1620712943543-bcc4688e7485', // Robot/automation
    'AI Thought Leadership': 'photo-1451187580459-43490279c0fa', // Digital network
    'AI Tips': 'photo-1535378620166-273708d44e4c', // Data visualization
    'AI Consulting': 'photo-1485827404703-89b55fcc595e', // Tech abstract
    'AI in the Workplace': 'photo-1552664730-d307ca884978' // Office/collaboration
  };
  
  const imageId = images[category] || images['AI News'];
  return `https://images.unsplash.com/photo-${imageId}?w=1200&h=630&fit=crop&q=80`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_PUBLISHABLE_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check admin role
    const { data: roleData } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (!roleData) {
      return new Response(JSON.stringify({ error: 'Forbidden: Admin access required' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log("Starting blog post generation...");
    
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    
    // 1. Determine category (rotate)
    console.log("Selecting category...");
    const category = await selectCategory(supabase);
    console.log(`Category selected: ${category}`);
    
    // 2. Check recent topics (last 30 days)
    console.log("Checking recent topics...");
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const { data: recentTopics } = await supabase
      .from('blog_generation_history')
      .select('topic, keywords')
      .gte('generated_at', thirtyDaysAgo.toISOString());
    
    console.log(`Found ${recentTopics?.length || 0} recent topics to avoid`);
    
    // 3. Find trending topic
    console.log("Finding trending topic...");
    const trendingTopic = await findTrendingTopic(category, recentTopics || []);
    console.log(`Trending topic: ${trendingTopic.topic}`);
    
    // 4. Generate article content
    console.log("Generating article content...");
    const article = await generateArticle(trendingTopic, category);
    console.log(`Article generated: ${article.title}`);
    
    // 5. Generate SEO metadata
    console.log("Generating SEO metadata...");
    const seoMeta = await generateSEOMetadata(article);
    console.log("SEO metadata generated");
    
    // 6. Get featured image
    const featuredImage = getFeaturedImage(category);
    
    // 7. Create slug
    const slug = createSlug(article.title);
    console.log(`Slug created: ${slug}`);
    
    // 8. Insert into blog_posts
    console.log("Inserting post into database...");
    const { data: post, error: insertError } = await supabase
      .from('blog_posts')
      .insert({
        title: article.title,
        slug,
        category,
        content_html: article.content,
        excerpt: article.excerpt,
        keywords: seoMeta.keywords,
        meta_title: seoMeta.title,
        meta_description: seoMeta.description,
        sources: article.sources,
        featured_image: featuredImage,
        publish_date: new Date().toISOString(),
        status: 'published' // AUTO-PUBLISH - Phase 1
      })
      .select()
      .single();
    
    if (insertError) {
      console.error("Database insert error:", insertError);
      
      // Log error
      await supabase.from('blog_generation_errors').insert({
        error_type: 'generation_failed',
        error_message: insertError.message,
        error_details: { error: insertError }
      });
      
      throw insertError;
    }
    
    console.log(`Post inserted with ID: ${post.id}`);
    
    // 9. Record in history
    console.log("Recording in generation history...");
    await supabase.from('blog_generation_history').insert({
      topic: trendingTopic.topic,
      keywords: trendingTopic.keywords,
      category,
      post_id: post.id
    });
    
    console.log("✅ Blog post generated and published");
    
    // PHASE 2: Trigger Post-Publication Editor Agent
    console.log('🤖 Triggering Editor Agent for post enhancement...');
    try {
      const enhanceResponse = await fetch(`${SUPABASE_URL}/functions/v1/enhance-blog-post`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId: post.id })
      });

      if (!enhanceResponse.ok) {
        console.error('Editor Agent failed:', await enhanceResponse.text());
      } else {
        console.log('✅ Editor Agent triggered successfully');
      }
    } catch (enhanceError) {
      console.error('Error triggering Editor Agent:', enhanceError);
      // Don't fail the whole generation if enhancement fails
    }
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Blog post generated, published, and enhancement triggered',
      post: {
        id: post.id,
        title: post.title,
        slug: post.slug,
        category: post.category,
        status: post.status
      }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
    
  } catch (error) {
    console.error("Error generating blog post:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    // Log error
    try {
      const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
      await supabase.from('blog_generation_errors').insert({
        error_type: 'generation_failed',
        error_message: errorMessage,
        error_details: { error: String(error) }
      });
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: errorMessage
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
