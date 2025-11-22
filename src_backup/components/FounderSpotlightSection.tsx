import { Link } from 'react-router-dom';
import { Calendar, Linkedin } from 'lucide-react';
import headshotImage from '@/assets/johnathan-scott-headshot.jpg';

export const FounderSpotlightSection = () => {
  return (
    <section className="relative z-10 py-16 md:py-24 bg-white/[0.02]">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <div className="backdrop-blur-sm bg-white/5 rounded-2xl ring-1 ring-white/10 overflow-hidden animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.2s_both]">
          <div className="md:flex items-center">
            <div className="md:w-2/5 relative h-64 md:h-96 overflow-hidden">
              <img 
                src={headshotImage} 
                alt="Johnathan Scott - Founder & CEO of Elevated AI" 
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
            
            <div className="md:w-3/5 p-8 md:p-12">
              <div className="mb-4">
                <h2 className="text-3xl font-normal tracking-tight font-geist mb-2">
                  Johnathan Scott
                </h2>
                <p className="text-cyan-400 font-geist text-sm uppercase tracking-wider">
                  Founder & CEO of Elevated AI
                </p>
                <p className="text-muted-foreground font-geist text-sm mt-1">
                  AI Automation Strategist | Enterprise IT Veteran | Apple Certified Trainer
                </p>
              </div>

              <p className="text-muted-foreground font-geist leading-relaxed mb-6">
                With 20+ years of enterprise technology leadership across entertainment and media, Johnathan specializes in turning AI concepts into real-world operational systems. He has developed enterprise voice agents, automation frameworks, and multiple SaaS products, helping teams move faster, reduce costs, and expand capabilities.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium font-geist backdrop-blur-sm bg-cyan-500/10 ring-1 ring-cyan-500/20 hover:bg-cyan-500/15 hover:ring-cyan-500/30 transition-all text-cyan-300"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule a Call
                </Link>
                <a
                  href="https://www.linkedin.com/in/johnathan-scott/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium font-geist backdrop-blur-sm bg-white/5 ring-1 ring-white/10 hover:bg-white/8 hover:ring-white/15 transition-all text-white"
                >
                  <Linkedin className="w-4 h-4" />
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
