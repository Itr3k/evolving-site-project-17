import { SectionContainer } from '@/components/layout';
import { Heading2, Body } from '@/components/ui/typography';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, Linkedin } from 'lucide-react';
import headshotImage from '@/assets/johnathan-scott-headshot.jpg';

export const FounderBioSection = () => {
  return (
    <SectionContainer background="default" padding="large">
      <div className="max-w-6xl mx-auto">
        <GlassCard className="p-8 md:p-12">
          <div className="grid md:grid-cols-[300px_1fr] gap-8 md:gap-12 items-start">
            {/* Professional Headshot Placeholder */}
            <div className="mx-auto md:mx-0">
              <div className="relative">
                <div className="w-64 h-64 rounded-2xl overflow-hidden ring-2 ring-white/10">
                  <img 
                    src={headshotImage} 
                    alt="Johnathan Scott - Founder & CEO of Elevated AI" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 blur-2xl opacity-50"></div>
              </div>
            </div>

            {/* Bio Content */}
            <div className="space-y-6">
              <div>
                <Heading2 className="mb-2">Johnathan Scott</Heading2>
                <p className="text-xl text-purple-400 mb-4">
                  Founder & CEO | AI Automation Strategist
                </p>
                <p className="text-sm text-white/60 mb-1">
                  Former Apple Certified Trainer | Enterprise IT Veteran
                </p>
              </div>

              <div className="space-y-4 text-white/70">
                <Body>
                  With over 20 years of enterprise technology leadership across entertainment, media, and corporate environments, Johnathan specializes in turning AI concepts into real-world operational systems that drive measurable business value.
                </Body>

                <Body>
                  His career spans from managing 575TB SAN storage systems and 11 professional edit bays at major entertainment studios, to supporting 1,700+ team members across international offices. As a former Apple Certified Trainer, he built his foundation on making complex technology accessible and practical for business users.
                </Body>

                <Body>
                  At Legendary Entertainment, DeviantArt/Wix, and Hecho Studios, Johnathan led digital transformation initiatives that combined infrastructure expertise with operational excellence. This unique blend of hands-on technical depth and strategic business thinking now powers Elevated AI's approach to intelligent automation.
                </Body>

                <Body>
                  Today, Johnathan architects enterprise-grade voice AI systems using ElevenLabs, MindStudio.ai, n8n, Thoughtly, Windsurf, and Lovable. He's also the founder of multiple SaaS products including ArchiPrompt.io (AI prompt management), FreshCheck.app (property maintenance automation), and PluginEnthusiasts.com (creator tools marketplace).
                </Body>

                <Body>
                  His philosophy: AI should elevate human capability, not replace it. Every system is designed to augment teams, reduce operational friction, and create space for higher-value work.
                </Body>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg">
                  <Link to="/contact">
                    <Calendar className="mr-2 h-5 w-5" />
                    Schedule a Call
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a 
                    href="https://www.linkedin.com/in/johnathan-scott/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="mr-2 h-5 w-5" />
                    Connect on LinkedIn
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </SectionContainer>
  );
};
