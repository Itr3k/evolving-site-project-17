import { Button } from '@/components/ui/button';
import { Linkedin, Twitter, Facebook } from 'lucide-react';
import { trackEvent } from '@/utils/analytics';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export const ShareButtons = ({ url, title }: ShareButtonsProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleShare = (platform: string, shareUrl: string) => {
    trackEvent('blog_share', { post_title: title, platform });
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="text-sm text-muted-foreground">Share this article:</span>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleShare('linkedin', shareLinks.linkedin)}
        >
          <Linkedin className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleShare('twitter', shareLinks.twitter)}
        >
          <Twitter className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleShare('facebook', shareLinks.facebook)}
        >
          <Facebook className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
