import { Brain, Zap, TrendingUp, ShieldCheck } from "lucide-react";

export const CoreServicesSection = () => {
  const services = [
    {
      title: "AI Strategy & Consulting",
      description: "Transform your business with strategic AI implementation roadmaps",
    },
    {
      title: "Custom Automation Solutions",
      description: "Streamline operations with tailored AI-powered workflows",
    },
    {
      title: "Voice AI Systems",
      description: "Deploy intelligent voice interfaces for enhanced customer engagement",
    },
  ];

  const aiAgents = [
    {
      name: "CogniCore.AI",
      tag: "Deep Learning",
      icon: Brain,
      image: "https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/6d09277c-88d3-4681-8a06-18307469ce9f_800w.jpg",
    },
    {
      name: "FlowMaster",
      tag: "Process Engine",
      icon: Zap,
      image: "https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/0e60f1bd-bde0-4ec4-8c23-24383a8b650a_800w.jpg",
    },
    {
      name: "DataMind Pro",
      tag: "Data Intelligence",
      icon: TrendingUp,
      image: "https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/ac4a631c-975f-4482-9cef-2a1f99a48178_800w.jpg",
    },
    {
      name: "SecureGuard AI",
      tag: "Cyber Defense",
      icon: ShieldCheck,
      image: "https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/0129262d-84f8-4262-b816-efd622faf4e8_800w.jpg",
    },
  ];

  return (
    <section className="relative z-10 max-w-7xl sm:px-6 lg:px-8 mr-auto ml-auto pt-16 pr-4 pb-16 pl-4">
      <div className="ring-1 ring-white/10 rounded-3xl bg-neutral-900/50 backdrop-blur-md p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Services */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tighter font-geist mb-8">
              Core Services
            </h2>
            <div className="space-y-8">
              {services.map((service, idx) => (
                <div key={idx}>
                  <h3 className="text-xl font-medium tracking-tight font-geist mb-2">
                    {service.title}
                  </h3>
                  <p className="text-neutral-400 font-geist text-sm">
                    {service.description}
                  </p>
                  {idx < services.length - 1 && (
                    <div className="mt-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: AI Agents Grid */}
          <div className="grid grid-cols-2 gap-4">
            {aiAgents.map((agent, idx) => {
              const Icon = agent.icon;
              return (
                <article key={idx} className="relative overflow-hidden h-[200px] bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-800 rounded-2xl">
                  <div className="absolute inset-0 bg-cover hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url(${agent.image})` }}></div>
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100/90 text-zinc-900 border border-zinc-700">
                      <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 rounded-md bg-zinc-900/60 backdrop-blur text-[11px] text-zinc-300 font-normal border border-zinc-800 font-geist">
                      {agent.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-lg font-medium tracking-tight leading-tight font-geist">
                      {agent.name}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
