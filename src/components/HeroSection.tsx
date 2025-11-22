import { Sparkles, Award, Database, TrendingUp, Users, ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <main className="flex h-[calc(100vh-80px)] z-10 relative items-end">
      <section className="md:px-8 md:pb-16 lg:pb-20 w-full max-w-7xl mr-auto ml-auto pr-6 pb-12 pl-6">
        {/* Top divider */}
        <div className="mb-12 h-px bg-gradient-to-r from-transparent to-transparent via-white/10"></div>

        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-6 lg:gap-10 gap-x-8 gap-y-8 items-center">
          {/* Column 1: Tag + Headline */}
          <div className="md:col-span-5 lg:col-span-5 relative">
            <div className="inline-flex text-xs font-medium font-geist ring-1 rounded-full mb-5 pt-1.5 pr-3 pb-1.5 pl-3 backdrop-blur-sm gap-x-2 gap-y-2 items-center [animation:fadeSlideIn_1s_ease-out_0.1s_both] text-white/80 bg-white/5 ring-white/10">
              <Sparkles className="w-3.5 h-3.5 text-accent-blue" strokeWidth={1.5} />
              Transforming Business Through Intelligent Automation
            </div>
            <h1 className="leading-tight sm:text-5xl md:text-5xl lg:text-6xl [animation:fadeSlideIn_1s_ease-out_0.2s_both] text-4xl tracking-tighter font-geist">
              AI Consultant & Automation Specialist
            </h1>
          </div>

          {/* Vertical divider */}
          <div className="hidden md:block md:col-span-1 lg:col-span-1 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b -translate-x-1/2 from-white/20 via-white/10 to-white/5"></div>
          </div>

          {/* Column 2: Description */}
          <div className="md:col-span-4 lg:col-span-3 [animation:fadeSlideIn_1s_ease-out_0.3s_both] relative">
            <p className="leading-relaxed md:text-lg text-base font-geist">Transforming businesses through intelligent automation. We help companies harness AI to automate workflows, enhance customer experiences, and scale operations—without the enterprise agency overhead.</p>
            <div className="border-t mt-6 pt-6 border-white/10">
              <div className="flex flex-wrap gap-4 text-sm gap-x-4 gap-y-4 items-center text-white/50">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                  <span className="font-geist">20+ Years Enterprise IT Leadership</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                  <span className="font-geist">Fortune 500 Experience in Media & Entertainment</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                  <span className="font-geist">Large-Scale Infrastructure & AI Strategy Expertise</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                  <span className="font-geist">Based in Los Angeles, Serving Southern California</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vertical divider */}
          <div className="hidden lg:block lg:col-span-1 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b -translate-x-1/2 from-white/20 via-white/10 to-white/5"></div>
          </div>

          {/* Column 3: Buttons */}
          <div className="md:col-span-12 lg:col-span-2 relative">
            <div className="flex flex-row lg:flex-col gap-x-3 gap-y-3">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 transition whitespace-nowrap [animation:fadeSlideIn_1s_ease-out_0.3s_both] hover:bg-white/15 hover:ring-white/25 text-sm font-medium text-white/90 font-geist bg-white/10 rounded-full ring-white/15 ring-1 pt-2.5 pr-4 pb-2.5 pl-4 backdrop-blur-sm">
                Book a Consultation
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
              <a href="#showcase" className="inline-flex items-center justify-center gap-2 ring-1 transition whitespace-nowrap [animation:fadeSlideIn_1s_ease-out_0.5s_both] text-sm font-medium font-geist rounded-full pt-2.5 pr-4 pb-2.5 pl-4 ring-white/20 hover:bg-cyan-100 text-cyan-900 bg-white">
                See Our Work
                <Calendar className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
