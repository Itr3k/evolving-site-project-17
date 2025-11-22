import { SectionContainer } from '@/components/layout';
import { Heading2, Heading3, Body } from '@/components/ui/typography';
import { GlassCard } from '@/components/ui/glass-card';
import { Network, Zap, Code, Brain, Workflow, Database } from 'lucide-react';

export const PartnerNetworkSection = () => {
  const capabilities = [
    {
      icon: Code,
      title: 'Full-Stack Development',
      description: 'Custom web applications, APIs, and integrations built by specialized development partners.',
    },
    {
      icon: Brain,
      title: 'Machine Learning Engineering',
      description: 'Advanced AI model development, training, and optimization for specialized use cases.',
    },
    {
      icon: Workflow,
      title: 'Enterprise Integration',
      description: 'Deep expertise in connecting AI systems with ERP, CRM, and legacy enterprise platforms.',
    },
    {
      icon: Database,
      title: 'Data Engineering',
      description: 'Data pipeline architecture, warehousing, and analytics infrastructure for AI-ready data.',
    },
  ];

  return (
    <SectionContainer background="default" padding="large">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-on-scroll">
          <div className="inline-flex items-center gap-3 mb-4">
            <Network className="w-8 h-8 text-purple-400" />
            <Heading2>Strategic Partner Network</Heading2>
          </div>
          <Body className="text-white/70 text-lg max-w-3xl mx-auto">
            Why the traditional agency model doesn't work for AI automation—and what we do instead.
          </Body>
        </div>

        <div className="space-y-8">
          {/* Explanation Card */}
          <GlassCard className="p-8 md:p-10" hover={false}>
            <div className="space-y-4 text-white/70">
              <Body className="text-lg leading-relaxed">
                <strong className="text-white">You work directly with the founder.</strong> Every consultation, strategy session, and implementation review is handled personally by Johnathan Scott—not handed off to junior staff or account managers. This ensures continuity, deep contextual understanding, and direct access to 20+ years of enterprise expertise.
              </Body>
              
              <Body className="text-lg leading-relaxed">
                <strong className="text-white">Specialized expertise when you need it.</strong> Rather than maintaining a large full-time team with broad but shallow skills, Elevated AI maintains strategic partnerships with world-class specialists in machine learning, data engineering, full-stack development, and enterprise integration. You get senior-level talent only when projects require it—without paying agency overhead.
              </Body>
              
              <Body className="text-lg leading-relaxed">
                <strong className="text-white">Better economics, better results.</strong> This model means faster decision-making, lower costs, and solutions tailored to your specific needs—not constrained by internal agency capabilities or billable hour pressures. It's the agility of a consultant with the capabilities of a full-service firm.
              </Body>
            </div>
          </GlassCard>

          {/* Capabilities Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {capabilities.map((capability, index) => (
              <GlassCard 
                key={index}
                className="p-6 [animation:fadeSlideIn_1s_ease-out_both]"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
                    <capability.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <Heading3 className="text-lg mb-2">{capability.title}</Heading3>
                    <Body className="text-white/60 text-sm">{capability.description}</Body>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Bottom Note */}
          <div className="text-center pt-4">
            <Body className="text-white/60">
              <Zap className="inline w-4 h-4 text-purple-400 mr-2" />
              All partners are vetted for technical excellence, reliability, and alignment with our client-first philosophy.
            </Body>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};
