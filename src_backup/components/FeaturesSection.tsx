import { Workflow, Phone, Target, ArrowRight, BarChart3 } from "lucide-react";
import { ContactFormModal } from "./ContactFormModal";
import { useState } from "react";

export const FeaturesSection = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <section className="overflow-hidden lg:py-24 bg-[url(https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/72c90007-7638-4902-8dda-5a6c20e92741_3840w.jpg)] bg-cover pt-16 pb-16 relative" id="resources">
      {/* Decorative grid lines */}
      <div className="pointer-events-none z-0 absolute inset-0">
        <div className="absolute inset-y-0 left-[12.5%] w-px bg-gradient-to-b from-transparent to-transparent via-white/5"></div>
        <div className="absolute inset-y-0 left-[37.5%] w-px bg-gradient-to-b from-transparent to-transparent via-white/5"></div>
        <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent to-transparent via-white/8"></div>
        <div className="absolute inset-y-0 left-[62.5%] w-px bg-gradient-to-b from-transparent to-transparent via-white/5"></div>
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent to-transparent via-white/5"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        {/* Section header */}
        <div className="max-w-3xl">
          <div className="inline-flex text-[11px] ring-1 animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.05s_both] font-medium font-geist rounded-full pt-1.5 pr-3 pb-1.5 pl-3 gap-x-2 gap-y-2 items-center ring-white/10 text-white/70 bg-white/5">Our Solutions</div>
          <h2 className="mt-4 sm:text-5xl md:text-6xl text-4xl font-normal tracking-tighter font-geist animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.15s_both]">
            Experience Enterprise-Grade AI Transformation
          </h2>
          <p className="md:mt-4 mt-3 md:text-lg text-base leading-relaxed font-geist animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.25s_both] text-white/70">
            Elevated AI helps organizations harness artificial intelligence to automate workflows, enhance customer experiences, and scale operations intelligently — combining strategy, automation, and Voice AI systems.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-10 gap-x-6 gap-y-6">
          {/* Card 1 - Intelligent Automation */}
          <div className="md:p-6 overflow-hidden animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.2s_both] ring-1 rounded-3xl pt-5 pr-5 pb-5 pl-5 backdrop-blur-md bg-neutral-900/50 ring-white/10">
            <h3 className="text-xl md:text-2xl font-normal tracking-tighter font-geist">Intelligent Automation</h3>
            <p className="mt-2 text-sm font-geist text-neutral-400">
              Automate your most time-consuming workflows with precision. From CRM updates to data processing, our systems integrate seamlessly with your existing tools to eliminate friction and human error.
            </p>

            {/* Automation flow UI */}
            <div className="mt-5 rounded-2xl ring-1 p-4 bg-black/30 ring-white/10">
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center gap-2 text-xs font-geist text-neutral-300">
                  <Workflow className="w-4 h-4 opacity-80" strokeWidth={1.5} />
                  Active workflow
                </div>
                <div className="inline-flex items-center gap-2 ring-1 px-2 py-1 rounded-full bg-cyan-500/10 ring-cyan-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                  <span className="text-[10px] font-geist text-cyan-300">70% time saved</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 text-[11px] font-geist text-neutral-300/90 bg-white/5 rounded-lg p-2">CRM Update</div>
                <ArrowRight className="w-3 h-3 text-cyan-400" strokeWidth={1.5} />
                <div className="flex-1 text-[11px] font-geist text-neutral-300/90 bg-white/5 rounded-lg p-2">Data Sync</div>
                <ArrowRight className="w-3 h-3 text-cyan-400" strokeWidth={1.5} />
                <div className="flex-1 text-[11px] font-geist text-neutral-300/90 bg-white/5 rounded-lg p-2">Report Gen</div>
              </div>
            </div>
          </div>

          {/* Card 2 - Voice AI Systems (featured) */}
          <div className="relative rounded-3xl overflow-hidden ring-1 bg-gradient-to-b backdrop-blur-md animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.28s_both] ring-white/15 from-white/10 to-white/5">
            <div className="absolute inset-0">
              <img src="https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/459579f4-e2d0-4218-a12d-f974a4b89651_800w.jpg" alt="Voice AI customer interaction" className="opacity-70 w-full h-full object-cover" />
              <div className="bg-gradient-to-t to-transparent via-cyan-500/5 absolute top-0 right-0 bottom-0 left-0 from-neutral-950/80 via-neutral-950/30"></div>
            </div>
            <div className="relative p-5 md:p-6">
              <h3 className="text-xl md:text-2xl font-normal tracking-tighter font-geist">Voice AI Systems</h3>
              <p className="mt-2 text-sm font-geist text-neutral-200/80">
                Transform customer interactions with natural, human-sounding voice automation powered by ElevenLabs. Our custom voice agents handle calls, schedule appointments, and integrate with your CRM for real-time updates.
              </p>
            </div>
            <div className="relative p-5 md:p-6 pt-0">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] ring-1 font-geist bg-cyan-500/10 text-cyan-300 ring-cyan-500/20">
                <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
                3.5× ROI in 6 months
              </div>
            </div>
          </div>

          {/* Card 3 - Strategic AI Consulting */}
          <div className="md:p-6 overflow-hidden animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.36s_both] ring-1 rounded-3xl pt-5 pr-5 pb-5 pl-5 backdrop-blur-md bg-neutral-900/50 ring-white/10">
            <h3 className="text-xl md:text-2xl font-normal tracking-tighter font-geist">Strategic AI Consulting</h3>
            <p className="mt-2 text-sm font-geist text-neutral-400">
              Gain clarity and confidence with expert AI strategy and implementation planning. We guide organizations from audit to automation to ensure measurable ROI and sustainable growth.
            </p>

            {/* Strategic planning card */}
            <div className="mt-5 rounded-2xl bg-[radial-gradient(ellipse_at_top_left,rgba(0,212,255,0.06),rgba(2,6,23,0.6))] ring-1 p-4 ring-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg ring-1 flex items-center justify-center bg-cyan-500/10 ring-cyan-500/20">
                  <Target className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-normal font-geist text-neutral-200">AI Strategy Audit</p>
                  <p className="text-[11px] font-geist text-neutral-400">Opportunities worth millions identified</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 md:mt-16 text-center animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.45s_both]">
          <h3 className="text-2xl md:text-3xl font-normal tracking-tighter font-geist text-white">
            Elevate What's Possible.
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-neutral-900 hover:bg-cyan-100 transition-colors font-geist font-medium text-sm"
            >
              Book a Consultation
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </button>
            <a
              href="#showcase"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/15 transition-colors font-geist font-medium text-sm"
            >
              See Client Results
              <BarChart3 className="w-4 h-4" strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>

      <ContactFormModal 
        open={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
      />
    </section>
  );
};
