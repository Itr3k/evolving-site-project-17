import { SectionContainer } from '@/components/layout';
import { Heading2, Body } from '@/components/ui/typography';
import { GlassCard } from '@/components/ui/glass-card';
import { Target, Eye } from 'lucide-react';

export const MissionVisionSection = () => {
  return (
    <SectionContainer background="gradient" padding="large">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <GlassCard className="p-8 md:p-10" hover={false}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
              <Heading2 className="text-2xl">Our Mission</Heading2>
            </div>
            <Body className="text-white/70 text-lg leading-relaxed">
              Transform businesses through intelligent automation. We make enterprise-grade AI practical and accessible, creating operational systems that augment human capability and deliver measurable business value—without the enterprise agency overhead.
            </Body>
          </GlassCard>

          {/* Vision */}
          <GlassCard className="p-8 md:p-10" hover={false}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                <Eye className="w-6 h-6 text-pink-400" />
              </div>
              <Heading2 className="text-2xl">Our Vision</Heading2>
            </div>
            <Body className="text-white/70 text-lg leading-relaxed">
              To be the recognized $50M+ leader in practical AI automation by 2030. A future where every business—from startups to enterprises—can leverage AI as a strategic advantage, making teams more effective, customers happier, and operations more efficient.
            </Body>
          </GlassCard>
        </div>
      </div>
    </SectionContainer>
  );
};
