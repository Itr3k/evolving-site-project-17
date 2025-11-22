import { Award, GraduationCap, Database, Mic, Layers, Building2 } from "lucide-react";
import { SectionContainer } from "@/components/layout";
import { Heading2, Body } from "@/components/ui/typography";
import { GlassCard } from "@/components/ui/glass-card";

const differentiators = [
  {
    icon: Award,
    stat: "20+ Years",
    title: "Enterprise IT Experience",
    description: "Fortune 500 IT leadership across media, entertainment, and enterprise infrastructure. Not a prompt-slinger—battle-tested system architect with production-scale experience.",
    delay: "0.1s"
  },
  {
    icon: GraduationCap,
    stat: "Certified",
    title: "Apple Certified Trainer",
    description: "Official Apple certification in training and enablement. Deep understanding of enterprise technology adoption and user experience.",
    delay: "0.2s"
  },
  {
    icon: Database,
    stat: "575TB+",
    title: "Massive-Scale Media Infrastructure",
    description: "Managed 575TB SAN infrastructure for legendary entertainment brands. Proven ability to handle mission-critical, high-volume data systems.",
    delay: "0.3s"
  },
  {
    icon: Mic,
    stat: "Expert",
    title: "Voice AI Mastery",
    description: "ElevenLabs partnership and advanced Voice AI implementation expertise. Delivered 45% support reduction for CDW through intelligent voice automation.",
    delay: "0.4s"
  },
  {
    icon: Layers,
    stat: "Multi-Platform",
    title: "Cutting-Edge AI Stack",
    description: "Expert in n8n, MindStudio.ai, RAG systems, and custom AI integrations. We architect solutions using the best tool for each job—not one-size-fits-all.",
    delay: "0.5s"
  },
  {
    icon: Building2,
    stat: "Multi-Industry",
    title: "Diverse Industry Experience",
    description: "Entertainment, manufacturing, SMB, and enterprise clients. We understand different business contexts and adapt solutions accordingly.",
    delay: "0.6s"
  }
];

export const WhyElevatedAISection = () => {
  return (
    <SectionContainer 
      id="why-elevated-ai"
      background="gradient"
      padding="large"
      className="relative"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <Heading2 className="mb-4">
            Why Elevated AI?
          </Heading2>
          <Body className="max-w-3xl mx-auto text-lg">
            Enterprise-grade expertise meets cutting-edge innovation. We're not generalists—we're specialists with real-world battle scars and proven results.
          </Body>
        </div>

        {/* Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <GlassCard
                key={index}
                hover
                className="p-6 animate-on-scroll transition-all duration-300"
              >
                {/* Icon Circle */}
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 ring-1 ring-primary/20">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                {/* Stat */}
                <div className="text-3xl font-semibold text-primary mb-2">
                  {item.stat}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {item.description}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
};
