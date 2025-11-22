import { FileDown } from 'lucide-react';
import { useState } from 'react';
import { trackEvent } from '@/utils/analytics';

export const LeadMagnetSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleDownload = () => {
    trackEvent('lead_magnet_click', {
      resource: 'AI Implementation Checklist',
      location: 'solutions_page',
    });
    setIsSubmitted(true);
    // In production, this would trigger a modal or redirect to a download page
  };

  return (
    <section className="relative z-10 py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <div className="animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.2s_both]">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-cyan-500/10 to-blue-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative backdrop-blur-sm bg-white/5 rounded-3xl ring-1 ring-white/10 p-8 md:p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 ring-1 ring-white/10 flex items-center justify-center">
                <FileDown className="w-8 h-8 text-cyan-300" />
              </div>
              <h3 className="text-2xl md:text-3xl font-normal tracking-tight font-geist mb-4">
                Free AI Readiness Assessment
              </h3>
              <p className="text-white/70 text-base md:text-lg mb-8 font-geist leading-relaxed max-w-xl mx-auto">
                Get our comprehensive 10-step checklist to prepare your organization for successful AI adoption. No credit card required.
              </p>
              {!isSubmitted ? (
                <button
                  onClick={handleDownload}
                  className="px-8 py-4 bg-white text-slate-950 rounded-full font-medium font-geist hover:bg-white/90 transition-all duration-300 ring-1 ring-white/20"
                >
                  Download Free Checklist
                </button>
              ) : (
                <div className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-500/20 ring-1 ring-emerald-500/30 text-emerald-300 font-medium font-geist">
                  ✓ Check your email for the download link
                </div>
              )}
              <p className="text-xs text-white/50 mt-4 font-geist">
                Join 10,000+ professionals preparing for AI transformation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
