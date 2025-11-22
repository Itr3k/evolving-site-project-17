import { useState } from "react";
import { Sparkles, ArrowRight, Linkedin, MessageCircle } from "lucide-react";
import { ContactFormModal } from "./ContactFormModal";

export const CTASection = () => {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <>
    <section className="overflow-hidden lg:py-24 bg-[url(https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/32b67867-f241-44ab-a57c-c87e60b99c25_3840w.webp)] bg-cover pt-16 pb-16 relative" id="start">
      {/* Decorative grid lines */}
      <div className="pointer-events-none z-0 absolute inset-0">
        <div className="absolute inset-y-0 left-[12.5%] w-px bg-gradient-to-b from-transparent to-transparent via-white/5"></div>
        <div className="absolute inset-y-0 left-[37.5%] w-px bg-gradient-to-b from-transparent to-transparent via-white/5"></div>
        <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent to-transparent via-white/8"></div>
        <div className="absolute inset-y-0 left-[62.5%] w-px bg-gradient-to-b from-transparent to-transparent via-white/5"></div>
      </div>

      <div className="z-10 md:px-8 animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.1s_both] max-w-7xl mr-auto ml-auto pr-6 pl-6 relative">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br ring-1 backdrop-blur-md from-neutral-900/90 to-neutral-950/90 ring-white/10">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl bg-pink-400/20"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl bg-pink-400/10"></div>
          </div>

          <div className="relative px-6 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ring-1 font-geist mb-6 bg-white/5 text-white/80 ring-white/10">
                <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
                Ready to get started?
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tighter font-geist">
                Ready to Elevate Your Business?
              </h2>
              <p className="mt-6 text-lg leading-relaxed font-geist text-neutral-300">
                Lets design your next intelligent system together and unlock measurable growth with Elevated AI.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setContactModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full ring-1 px-6 py-3 text-base font-medium font-geist transition bg-white text-cyan-900 ring-white/20 hover:bg-cyan-100"
                >
                  Schedule Consultation
                  <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
                </button>
                <a href="https://www.linkedin.com/in/johnathan-scott/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full ring-1 px-6 py-3 text-base font-medium font-geist transition bg-white/10 text-white ring-white/15 hover:bg-white/15">
                  Connect on LinkedIn
                  <Linkedin className="w-5 h-5" strokeWidth={1.5} />
                </a>
              </div>

              <div className="mt-8 flex items-center justify-center gap-6 text-sm font-geist text-neutral-400">
                <button 
                  onClick={() => setContactModalOpen(true)}
                  className="inline-flex items-center gap-2 hover:text-white transition"
                >
                  <MessageCircle className="w-4 h-4 text-blue-300" strokeWidth={1.5} />
                  <span>Contact Elevated AI</span>
                </button>
                <a href="https://www.linkedin.com/in/johnathan-scott/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white transition">
                  <Linkedin className="w-4 h-4 text-blue-300" strokeWidth={1.5} />
                  <span>LinkedIn · Johnathan Scott</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactFormModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
    </section>
    </>
  );
};
