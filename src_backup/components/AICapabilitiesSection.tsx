import { Phone, Workflow, Bot, Rocket } from 'lucide-react';

const capabilities = [
  {
    icon: Phone,
    title: "Voice AI Systems",
    items: [
      "Appointment scheduling",
      "CRM updates",
      "Account management",
      "Tier 1/Tier 2 support",
      "Knowledge base Q&A",
      "Billing lookups",
      "Custom workflows",
      "Multi-channel support (voice, email, SMS)"
    ],
    color: "text-cyan-400"
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    items: [
      "Email triage & response",
      "Sales qualification automations",
      "CRM sync",
      "Calendar scheduling",
      "Slack/Teams notifications",
      "Ticketing & operational workflows"
    ],
    color: "text-emerald-400"
  },
  {
    icon: Bot,
    title: "AI Agent Engineering",
    items: [
      "ElevenLabs conversational voice agents",
      "MindStudio.ai contextual agents",
      "RAG-powered internal tools",
      "SOP automation",
      "Department-specific internal copilots"
    ],
    color: "text-purple-400"
  },
  {
    icon: Rocket,
    title: "SaaS & Platform Consulting",
    items: [
      "Early-stage product scoping",
      "MVP planning",
      "Monetization strategy",
      "System architecture"
    ],
    color: "text-amber-400"
  }
];

export const AICapabilitiesSection = () => {
  return (
    <section className="relative z-10 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.2s_both]">
          <h2 className="text-3xl md:text-4xl font-normal tracking-tight font-geist mb-4">
            AI Systems We Build
          </h2>
          <p className="text-lg text-muted-foreground font-geist max-w-2xl mx-auto">
            From voice agents to workflow automation—comprehensive AI solutions for modern businesses
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {capabilities.map((category, index) => {
            const Icon = category.icon;
            const delay = 0.3 + index * 0.1;
            return (
              <div
                key={index}
                className={`backdrop-blur-sm bg-white/5 rounded-2xl ring-1 ring-white/10 p-8 hover:bg-white/8 hover:ring-white/15 transition-all duration-500 animate-on-scroll [animation:fadeSlideIn_1s_ease-out_${delay}s_both]`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Icon className={`w-8 h-8 ${category.color}`} />
                  <h3 className="text-xl font-medium font-geist">
                    {category.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start gap-3 text-sm text-muted-foreground font-geist"
                    >
                      <span className={`${category.color} text-lg leading-none mt-0.5`}>•</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
