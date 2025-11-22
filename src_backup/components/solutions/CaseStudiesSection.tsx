import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Clock, Users, DollarSign } from 'lucide-react';

const caseStudy = {
  company: "CDW",
  industry: "Technology Distribution",
  challenge: "CDW faced increasing customer support demands, inconsistent response times, and growing repetitive Tier 1 calls.",
  solution: "Elevated AI implemented an enterprise-grade voice automation system using ElevenLabs, MindStudio.ai, n8n, and Thoughtly.",
  outcomes: [
    { label: "Tier 1 Support Reduction", value: "45%", icon: TrendingUp, color: "text-emerald-400" },
    { label: "Faster Resolution Time", value: "62%", icon: Clock, color: "text-cyan-400" },
    { label: "24/7 Support Coverage", value: "100%", icon: Users, color: "text-purple-400" },
    { label: "Customer Satisfaction Increase", value: "22%", icon: Users, color: "text-amber-400" }
  ],
  investment: {
    setup: "$6,500",
    monthly: "$2,500"
  },
  thumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
};

export const CaseStudiesSection = () => {
  return (
    <section className="relative z-10 py-16 md:py-24 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.2s_both]">
          <h2 className="text-3xl md:text-4xl font-normal tracking-tight font-geist mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-muted-foreground font-geist max-w-2xl mx-auto">
            Real results from organizations that transformed with AI
          </p>
        </div>

        <div className="backdrop-blur-sm bg-white/5 rounded-2xl ring-1 ring-white/10 overflow-hidden hover:ring-cyan-500/30 transition-all duration-500 animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.3s_both]">
          <div className="md:flex">
            <div className="md:w-2/5 relative h-64 md:h-auto">
              <img
                src={caseStudy.thumbnail}
                alt={`${caseStudy.company} case study`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
            </div>
            
            <div className="md:w-3/5 p-8 md:p-12">
              <div className="text-xs text-cyan-400 mb-3 font-geist uppercase tracking-wider">
                {caseStudy.industry}
              </div>
              <h3 className="text-3xl font-medium mb-6 font-geist">
                {caseStudy.company}
              </h3>

              <div className="space-y-6 mb-8">
                <div>
                  <h4 className="text-sm font-medium text-cyan-400 mb-2 font-geist uppercase tracking-wider">
                    Challenge
                  </h4>
                  <p className="text-sm text-muted-foreground font-geist leading-relaxed">
                    {caseStudy.challenge}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-emerald-400 mb-2 font-geist uppercase tracking-wider">
                    Solution
                  </h4>
                  <p className="text-sm text-muted-foreground font-geist leading-relaxed">
                    {caseStudy.solution}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {caseStudy.outcomes.map((outcome, index) => {
                  const Icon = outcome.icon;
                  return (
                    <div key={index} className="backdrop-blur-sm bg-white/5 rounded-xl ring-1 ring-white/10 p-4">
                      <Icon className={`w-5 h-5 ${outcome.color} mb-2`} />
                      <div className={`text-2xl font-light font-geist mb-1 ${outcome.color}`}>
                        {outcome.value}
                      </div>
                      <p className="text-xs text-muted-foreground font-geist leading-tight">
                        {outcome.label}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  <div>
                    <p className="text-xs text-muted-foreground font-geist">Setup</p>
                    <p className="text-sm font-medium font-geist">{caseStudy.investment.setup}</p>
                  </div>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  <div>
                    <p className="text-xs text-muted-foreground font-geist">Monthly</p>
                    <p className="text-sm font-medium font-geist">{caseStudy.investment.monthly}</p>
                  </div>
                </div>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium font-geist backdrop-blur-sm bg-cyan-500/10 ring-1 ring-cyan-500/20 hover:bg-cyan-500/15 hover:ring-cyan-500/30 transition-all text-cyan-300"
              >
                Start Your Transformation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
