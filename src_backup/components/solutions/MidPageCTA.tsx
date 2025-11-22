import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { trackCTAClick } from '@/utils/analytics';

export const MidPageCTA = () => {
  const handleClick = () => {
    trackCTAClick('mid_page', 'medium', 'Schedule Demo');
  };

  return (
    <div className="md:col-span-3 animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.5s_both]">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-cyan-500/20 rounded-3xl blur-3xl"></div>
        <div className="relative backdrop-blur-sm bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-3xl ring-1 ring-cyan-500/20 p-8 md:p-10 text-center">
          <h3 className="text-2xl md:text-3xl font-semibold mb-3 font-geist">
            Ready to See It in Action?
          </h3>
          <p className="text-white/70 mb-6 font-geist text-base md:text-lg max-w-xl mx-auto">
            Book a 15-minute live demo tailored to your specific use case—no obligation, just actionable insights.
          </p>
          <Link
            to="/contact?intent=demo"
            onClick={handleClick}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-950 rounded-full font-medium font-geist hover:bg-white/90 transition-all duration-300 ring-1 ring-white/20 group"
          >
            Schedule Demo
            <Calendar className="w-5 h-5 transition-transform group-hover:scale-110" />
          </Link>
        </div>
      </div>
    </div>
  );
};
