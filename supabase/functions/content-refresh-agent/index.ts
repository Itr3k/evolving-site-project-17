import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
    throw new Error(`AI API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// Phase 5: Content Refresh Agent
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

    console.log('🔄 Content Refresh Agent starting...');

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Mark posts that need refresh
    await supabaseAdmin.rpc('mark_posts_for_refresh');

    // Get next post to refresh
    const { data: postId } = await supabaseAdmin.rpc('get_next_post_for_refresh');

    if (!postId) {
      console.log('✅ No posts need refreshing');
      return new Response(
        JSON.stringify({ success: true, message: 'No posts need refreshing' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch the post
    const { data: post, error: fetchError } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('id', postId)
      .single();

    if (fetchError || !post) {
      throw new Error('Post not found');
    }

    console.log('📝 Refreshing post:', post.title);

    // Analyze if content needs updates
    const refreshAnalysis = await callLovableAI([
      {
        role: 'system',
        content: `You are a content refresh expert. Analyze this blog post and determine if it needs updates based on:
        1. Is the information still current and accurate?
        2. Have there been significant AI developments in this topic area since publication?
        3. Are there new statistics or examples that should be added?
        4. Does the title need updating to reflect current year/trends?
        
        Return JSON:
        {
          "needsUpdate": true/false,
          "updates": [
            {
              "section": "section to update",
              "update": "what to change and why",
              "priority": "high/medium/low"
            }
          ],
          "newTitle": "suggested updated title (if needed)",
          "addSections": ["new section to add"]
        }`
      },
      {
        role: 'user',
        content: `Article published: ${post.publish_date}\nTitle: ${post.title}\nCategory: ${post.category}\n\nContent:\n${post.content_html.substring(0, 2000)}`
      }
    ]);

    const analysis = JSON.parse(refreshAnalysis.replace(/```json\n?|\n?```/g, ''));

    if (!analysis.needsUpdate) {
      console.log('✅ Post is still current, no updates needed');
      await supabaseAdmin
        .from('blog_posts')
        .update({
          needs_refresh: false,
          last_refreshed_at: new Date().toISOString()
        })
        .eq('id', postId);

      return new Response(
        JSON.stringify({ success: true, message: 'Post is current' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('🔧 Applying updates...');

    // Generate refreshed content
    const refreshedContent = await callLovableAI([
      {
        role: 'system',
        content: `You are updating an existing blog post. Apply these updates while preserving the core structure and voice:
        
        Updates to apply:
        ${JSON.stringify(analysis.updates, null, 2)}
        
        ${analysis.addSections?.length ? `Add these new sections:\n${analysis.addSections.join('\n')}` : ''}
        
        Keep:
        - The original Call to Action section at the end
        - Internal and external links
        - The professional, business-focused tone
        - All contact information (korra@elevatedai.co, 1-424-484-3844)
        
        Return the complete refreshed HTML content.`
      },
      {
        role: 'user',
        content: `Original Title: ${post.title}\n\nOriginal Content:\n${post.content_html}`
      }
    ]);

    // Save current version as revision
    const { data: revisions } = await supabaseAdmin
      .from('blog_post_revisions')
      .select('revision_number')
      .eq('post_id', postId)
      .order('revision_number', { ascending: false })
      .limit(1);

    const nextRevisionNumber = (revisions && revisions[0]?.revision_number || 0) + 1;

    await supabaseAdmin.from('blog_post_revisions').insert({
      post_id: postId,
      revision_number: nextRevisionNumber,
      title: post.title,
      content_html: post.content_html,
      meta_title: post.meta_title,
      meta_description: post.meta_description,
      keywords: post.keywords,
      changed_by: 'refresh_agent',
      change_summary: 'Content refresh: ' + analysis.updates.map((u: any) => u.section).join(', ')
    });

    // Update the post
    const updateData: any = {
      content_html: refreshedContent,
      needs_refresh: false,
      last_refreshed_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (analysis.newTitle && analysis.newTitle !== post.title) {
      updateData.title = analysis.newTitle;
      updateData.meta_title = analysis.newTitle.substring(0, 60);
    }

    await supabaseAdmin
      .from('blog_posts')
      .update(updateData)
      .eq('id', postId);

    // Log the enhancement
    await supabaseAdmin.from('blog_enhancements').insert({
      post_id: postId,
      enhancement_type: 'content_refresh',
      details: { 
        updates: analysis.updates,
        sectionsAdded: analysis.addSections || []
      },
      status: 'completed'
    });

    console.log('✅ Content refreshed successfully');

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Post refreshed successfully',
        updates: analysis.updates.length
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error in content-refresh-agent:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    
    await supabaseAdmin.from('blog_generation_errors').insert({
      error_type: 'refresh_failed',
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