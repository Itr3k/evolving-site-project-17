import { Award, Users, Database, Briefcase, Lightbulb, Code } from 'lucide-react';

const credentials = [
  {
    icon: Award,
    stat: "20+",
    label: "Years Enterprise IT Leadership",
    color: "text-cyan-400"
  },
  {
    icon: Users,
    stat: "1,700+",
    label: "Team Members Supported Globally",
    color: "text-emerald-400"
  },
  {
    icon: Database,
    stat: "575TB",
    label: "SAN Storage Managed at Major Studios",
    color: "text-purple-400"
  },
  {
    icon: Briefcase,
    stat: "$6.5K",
    label: "Average Setup + $2.5K/mo Recurring",
    color: "text-amber-400"
  },
  {
    icon: Lightbulb,
    stat: "3",
    label: "SaaS Products: ArchiPrompt, FreshCheck, PluginEnthusiasts",
    color: "text-pink-400"
  },
  {
    icon: Code,
    stat: "Enterprise",
    label: "Legendary Entertainment, DeviantArt/Wix, Hecho Studios",
    color: "text-blue-400"
  }
];

export const CredentialsSection = () => {
  return (
    <section className="relative z-10 py-16 md:py-24 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.2s_both]">
          <h2 className="text-3xl md:text-4xl font-normal tracking-tight font-geist mb-4">
            Why Elevated AI?
          </h2>
          <p className="text-lg text-muted-foreground font-geist max-w-2xl mx-auto">
            Real credentials, proven experience, authentic results
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {credentials.map((item, index) => {
            const Icon = item.icon;
            const delay = 0.3 + index * 0.1;
            return (
              <div
                key={index}
                className={`backdrop-blur-sm bg-white/5 rounded-2xl ring-1 ring-white/10 p-6 hover:bg-white/8 hover:ring-white/15 transition-all duration-500 animate-on-scroll [animation:fadeSlideIn_1s_ease-out_${delay}s_both]`}
              >
                <div className="flex items-start gap-4">
                  <div className={`${item.color} shrink-0`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div>
                    <div className={`text-3xl font-light font-geist mb-2 ${item.color}`}>
                      {item.stat}
                    </div>
                    <p className="text-sm text-muted-foreground font-geist leading-relaxed">
                      {item.label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center backdrop-blur-sm bg-white/5 rounded-2xl ring-1 ring-white/10 p-8 animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.9s_both]">
          <p className="text-sm text-muted-foreground font-geist mb-4">
            <span className="text-cyan-400 font-medium">Former Apple Certified Trainer</span> with deep experience using:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['ElevenLabs', 'Thoughtly', 'MindStudio.ai', 'n8n', 'Windsurf', 'Lovable'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-geist backdrop-blur-sm bg-white/5 ring-1 ring-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
