import { useEffect, useState } from 'react';
import { trackScrollDepth } from '@/utils/analytics';

export const useScrollDepth = () => {
  const [tracked, setTracked] = useState({
    25: false,
    50: false,
    75: false,
    90: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );

      Object.entries(tracked).forEach(([threshold, hasTracked]) => {
        const numThreshold = parseInt(threshold);
        if (scrollPercent >= numThreshold && !hasTracked) {
          trackScrollDepth(numThreshold);
          setTracked((prev) => ({ ...prev, [threshold]: true }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tracked]);

  return tracked;
};
