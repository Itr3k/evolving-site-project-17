// Analytics tracking utilities

interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

export const trackEvent = (eventName: string, properties?: EventProperties) => {
  if (typeof window === 'undefined') return;

  // Log to console in development
  if (import.meta.env.DEV) {
    console.log('[Analytics Event]', eventName, properties);
  }

  // Send to analytics platform (Google Analytics, Mixpanel, etc.)
  try {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', eventName, properties);
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('trackCustom', eventName, properties);
    }

    // Add other analytics platforms as needed
  } catch (error) {
    console.error('[Analytics Error]', error);
  }
};

export const trackPageView = (path: string) => {
  trackEvent('page_view', { page_path: path });
};

export const trackCTAClick = (location: string, intent: string, buttonText: string) => {
  trackEvent('cta_click', {
    location,
    intent,
    button_text: buttonText,
  });
};

export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll_depth', { depth });
};

export const trackBlogView = (postTitle: string, category: string) => {
  trackEvent('blog_post_view', {
    post_title: postTitle,
    category: category,
  });
};

export const trackBlogShare = (postTitle: string, platform: string) => {
  trackEvent('blog_share', {
    post_title: postTitle,
    platform: platform,
  });
};

// Extend window type for analytics
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}
