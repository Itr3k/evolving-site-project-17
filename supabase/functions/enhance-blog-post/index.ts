import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper to call Lovable AI
async function callLovableAI(messages: any[]) {
  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
  
  const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${LOVABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash',
      messages,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// Phase 2: Post-Publication Editor Agent
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

    const { postId } = await req.json();
    
    if (!postId) {
      throw new Error('postId is required');
    }

    console.log(`🤖 Editor Agent starting enhancement for post: ${postId}`);

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch the blog post
    const { data: post, error: fetchError } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('id', postId)
      .single();

    if (fetchError || !post) {
      throw new Error('Post not found');
    }

    console.log('📝 Analyzing post:', post.title);

    // Get current revision number
    const { data: revisions } = await supabaseAdmin
      .from('blog_post_revisions')
      .select('revision_number')
      .eq('post_id', postId)
      .order('revision_number', { ascending: false })
      .limit(1);

    const nextRevisionNumber = (revisions && revisions[0]?.revision_number || 0) + 1;

    // Save original as revision
    await supabaseAdmin.from('blog_post_revisions').insert({
      post_id: postId,
      revision_number: nextRevisionNumber,
      title: post.title,
      content_html: post.content_html,
      meta_title: post.meta_title,
      meta_description: post.meta_description,
      keywords: post.keywords,
      changed_by: 'editor_agent',
      change_summary: 'Initial version before enhancement'
    });

    let enhancedContent = post.content_html;
    let improvements: string[] = [];
    const enhancementRecords: any[] = [];

    // 1. ADD/IMPROVE IMAGES
    console.log('🖼️ Analyzing image needs...');
    try {
      const imageAnalysis = await callLovableAI([
        {
          role: 'system',
          content: `You are an image placement expert. Analyze blog content and suggest 2-3 strategic image placements.
          
          Return a JSON array of image suggestions:
          [
            {
              "section": "section heading or first few words",
              "query": "unsplash search query (e.g., 'artificial intelligence technology')",
              "altText": "descriptive alt text for SEO",
              "placement": "after" or "before"
            }
          ]`
        },
        {
          role: 'user',
          content: `Article Title: ${post.title}\n\nContent:\n${post.content_html.substring(0, 2000)}`
        }
      ]);

      const imageSuggestions = JSON.parse(imageAnalysis.replace(/```json\n?|\n?```/g, ''));
      
      for (const suggestion of imageSuggestions.slice(0, 2)) {
        const unsplashUrl = `https://images.unsplash.com/photo-${Math.random().toString(36).substring(7)}?auto=format&fit=crop&w=800&q=80`;
        const imageHtml = `<figure class="my-8"><img src="${unsplashUrl}" alt="${suggestion.altText}" class="w-full rounded-lg shadow-lg" /><figcaption class="text-sm text-muted-foreground mt-2 text-center">${suggestion.altText}</figcaption></figure>`;
        
        // Insert image near suggested section
        if (enhancedContent.includes(suggestion.section)) {
          const position = enhancedContent.indexOf(suggestion.section);
          if (suggestion.placement === 'after') {
            const afterPosition = enhancedContent.indexOf('</p>', position) + 4;
            enhancedContent = enhancedContent.slice(0, afterPosition) + imageHtml + enhancedContent.slice(afterPosition);
          }
        }
        
        enhancementRecords.push({
          post_id: postId,
          enhancement_type: 'image_added',
          details: { query: suggestion.query, altText: suggestion.altText },
          status: 'completed'
        });
      }
      
      improvements.push('Added strategic images with alt text');
    } catch (error) {
      console.error('Image enhancement error:', error);
      enhancementRecords.push({
        post_id: postId,
        enhancement_type: 'image_added',
        details: { error: error instanceof Error ? error.message : 'Unknown error' },
        status: 'failed'
      });
    }

    // 2. ADD INTERNAL LINKS
    console.log('🔗 Adding internal links...');
    try {
      const linkAnalysis = await callLovableAI([
        {
          role: 'system',
          content: `You are an internal linking expert for Elevated AI, a Los Angeles-based AI consulting firm.
          
          Available pages to link to:
          - /solutions/intelligent-automation - AI automation services
          - /solutions/conversational-ai - Voice AI and chatbots
          - /solutions/computer-vision - Computer vision solutions
          - /solutions/document-intelligence - Document processing
          - /solutions/decision-intelligence - AI decision systems
          - /contact - Contact page
          - /about - About Elevated AI
          
          Return a JSON array of internal link suggestions:
          [
            {
              "anchorText": "exact text to make clickable",
              "url": "/path/to/page",
              "reason": "why this link adds value"
            }
          ]
          
          Add 2-4 contextually relevant internal links.`
        },
        {
          role: 'user',
          content: `Article: ${post.title}\n\n${post.content_html.substring(0, 1500)}`
        }
      ]);

      const linkSuggestions = JSON.parse(linkAnalysis.replace(/```json\n?|\n?```/g, ''));
      let linkCount = 0;
      
      for (const link of linkSuggestions.slice(0, 4)) {
        const searchText = link.anchorText;
        if (enhancedContent.includes(searchText) && !enhancedContent.includes(`href="${link.url}"`)) {
          const linkedText = `<a href="${link.url}" class="text-primary hover:underline">${searchText}</a>`;
          enhancedContent = enhancedContent.replace(searchText, linkedText);
          linkCount++;
        }
      }
      
      enhancementRecords.push({
        post_id: postId,
        enhancement_type: 'internal_links',
        details: { linksAdded: linkCount, suggestions: linkSuggestions },
        status: 'completed'
      });
      
      improvements.push(`Added ${linkCount} internal links`);
    } catch (error) {
      console.error('Internal linking error:', error);
    }

    // 3. IMPROVE READABILITY & FORMATTING
    console.log('✍️ Improving readability and HTML structure...');
    try {
      const readabilityImprovements = await callLovableAI([
        {
          role: 'system',
          content: `You are an expert HTML formatter for blog content. Transform content into visually stunning, properly structured HTML.

CRITICAL RULES - MUST FOLLOW:
1. REMOVE ALL <h1> TAGS - title is rendered separately in the UI
2. Start content with a compelling <p> intro paragraph (2-3 sentences)
3. Use <h2> for EVERY major section (5-7 sections minimum)
4. Use <h3> for subsections when breaking down complex topics
5. Wrap EVERY paragraph in <p> tags - max 3-4 sentences per paragraph
6. Add <strong> tags to ALL numbers, percentages, dollar amounts, and key phrases
7. Convert any bullet points to <ul><li> format
8. Add a short intro sentence before every list
9. Ensure proper spacing: blank lines between <h2> sections, <ul>, and <p> blocks
10. Use descriptive, action-oriented section headings

SECTION STRUCTURE EXAMPLE:
- Intro paragraph
- <h2>What Happened This Week</h2> (2-3 paragraphs)
- <h2>Business Impact Analysis</h2> (2-3 paragraphs with <strong> metrics)
- <h2>ROI Breakdown</h2> (intro + <ul> list)
- <h2>Implementation Roadmap</h2> (intro + <ol> list)
- <h2>Why [Region] Businesses Should Act Now</h2>
- <h2>Key Takeaways</h2> (<ul> list)

Return ONLY the improved HTML, no markdown code blocks.`
        },
        {
          role: 'user',
          content: `Transform this content:\n\n${enhancedContent}`
        }
      ]);

      // Clean any markdown formatting from AI response
      const cleanHTML = readabilityImprovements
        .replace(/```html\n?|\n?```/g, '')
        .replace(/```\n?|\n?```/g, '')
        .trim();

      enhancedContent = cleanHTML;
      improvements.push('Restructured HTML with proper formatting');
      
      enhancementRecords.push({
        post_id: postId,
        enhancement_type: 'formatting',
        details: { action: 'html_restructure_and_readability' },
        status: 'completed'
      });
    } catch (error) {
      console.error('Readability improvement error:', error);
    }

    // 4. GENERATE TAGS
    console.log('🏷️ Generating tags...');
    try {
      const tagAnalysis = await callLovableAI([
        {
          role: 'system',
          content: `Extract 3-5 relevant tags for this AI blog post. Focus on:
          - AI technologies (e.g., "LLMs", "Computer Vision", "NLP")
          - Business applications (e.g., "Automation", "Cost Savings", "Efficiency")
          - Industries (e.g., "Healthcare", "Finance", "Retail")
          
          Return a JSON array of tag names: ["tag1", "tag2", "tag3"]`
        },
        {
          role: 'user',
          content: `${post.title}\n\n${post.content_html.substring(0, 500)}`
        }
      ]);

      const tags = JSON.parse(tagAnalysis.replace(/```json\n?|\n?```/g, ''));
      
      for (const tagName of tags) {
        const slug = tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        // Upsert tag
        const { data: tag } = await supabaseAdmin
          .from('blog_tags')
          .upsert({ name: tagName, slug }, { onConflict: 'slug' })
          .select()
          .single();
        
        if (tag) {
          // Link tag to post (ignore if already exists)
          try {
            await supabaseAdmin
              .from('blog_post_tags')
              .insert({ post_id: postId, tag_id: tag.id });
          } catch (e) {
            // Ignore duplicate key errors
            console.log('Tag already linked:', tagName);
          }
        }
      }
      
      improvements.push(`Generated ${tags.length} tags`);
    } catch (error) {
      console.error('Tag generation error:', error);
    }

    // 5. ENHANCE SEO METADATA
    console.log('🔍 Optimizing SEO...');
    try {
      const seoEnhancement = await callLovableAI([
        {
          role: 'system',
          content: `Optimize SEO metadata for this blog post:
          
          Return JSON:
          {
            "metaTitle": "improved title (max 60 chars)",
            "metaDescription": "improved description (max 160 chars)",
            "keywords": ["keyword1", "keyword2", "keyword3"]
          }
          
          Focus on: AI consulting, Los Angeles, Southern California, business ROI`
        },
        {
          role: 'user',
          content: `Current Title: ${post.meta_title}\nCurrent Description: ${post.meta_description}\n\nArticle:\n${post.content_html.substring(0, 1000)}`
        }
      ]);

      const seoData = JSON.parse(seoEnhancement.replace(/```json\n?|\n?```/g, ''));
      
      // Update with enhanced SEO
      await supabaseAdmin
        .from('blog_posts')
        .update({
          content_html: enhancedContent,
          meta_title: seoData.metaTitle,
          meta_description: seoData.metaDescription,
          keywords: seoData.keywords,
          last_enhanced_at: new Date().toISOString(),
          enhancement_version: (post.enhancement_version || 0) + 1,
          internal_links_count: (enhancedContent.match(/href="\//g) || []).length,
          outbound_links_count: (enhancedContent.match(/href="http/g) || []).length,
          images_count: (enhancedContent.match(/<img/g) || []).length
        })
        .eq('id', postId);
      
      improvements.push('Optimized SEO metadata');
    } catch (error) {
      console.error('SEO enhancement error:', error);
    }

    // Save all enhancement records
    if (enhancementRecords.length > 0) {
      await supabaseAdmin.from('blog_enhancements').insert(enhancementRecords);
    }

    // Save new revision
    await supabaseAdmin.from('blog_post_revisions').insert({
      post_id: postId,
      revision_number: nextRevisionNumber + 1,
      title: post.title,
      content_html: enhancedContent,
      meta_title: post.meta_title,
      meta_description: post.meta_description,
      keywords: post.keywords,
      changed_by: 'editor_agent',
      change_summary: improvements.join(', ')
    });

    console.log('✅ Enhancement complete:', improvements.join(', '));

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Post enhanced successfully',
        improvements
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error in enhance-blog-post:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Log error
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    
    await supabaseAdmin.from('blog_generation_errors').insert({
      error_type: 'enhancement_failed',
      error_message: errorMessage,
      error_details: { error: String(error) }
    });

    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});