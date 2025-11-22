import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Fetch latest 50 published blog posts
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('publish_date', { ascending: false })
      .limit(50);

    if (error) throw error;

    const baseUrl = 'https://elevatedai.co';
    const buildDate = new Date().toUTCString();

    let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Elevated AI Blog</title>
    <description>AI consulting insights, automation strategies, and business intelligence from Los Angeles-based AI experts</description>
    <link>${baseUrl}/blog</link>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>Elevated AI</title>
      <link>${baseUrl}</link>
    </image>`;

    for (const post of posts || []) {
      const pubDate = new Date(post.publish_date).toUTCString();
      const link = `${baseUrl}/blog/${post.slug}`;
      
      // Strip HTML for description
      const description = escapeXml(
        post.excerpt || post.meta_description || post.content_html.replace(/<[^>]*>/g, '').substring(0, 200)
      );

      rss += `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
      <author>korra@elevatedai.co (Elevated AI Team)</author>
      <category>${escapeXml(post.category)}</category>`;

      if (post.featured_image) {
        rss += `
      <enclosure url="${post.featured_image}" type="image/jpeg"/>`;
      }

      rss += `
    </item>`;
    }

    rss += `
  </channel>
</rss>`;

    return new Response(rss, {
      headers: {
        'Content-Type': 'application/rss+xml',
        'Cache-Control': 'public, max-age=3600',
        ...corsHeaders
      }
    });

  } catch (error) {
    console.error('Error generating RSS:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});