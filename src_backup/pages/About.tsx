import { Link } from 'react-router-dom';
import { PageLayout, SectionContainer } from '@/components/layout';
import { Heading1, Heading2, Heading3, Body } from '@/components/ui/typography';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Award, Database, TrendingUp, Users, Globe, Clock, Target, Shield, Heart, Zap, Calendar } from 'lucide-react';
import { PageMeta } from '@/components/seo/PageMeta';
import { FounderBioSection } from '@/components/FounderBioSection';
import { MissionVisionSection } from '@/components/MissionVisionSection';
import { PartnerNetworkSection } from '@/components/PartnerNetworkSection';

const About = () => {
  const stats = [
    {
      icon: Award,
      value: '20+',
      label: 'Years Enterprise IT Experience',
      description: 'Proven track record in infrastructure management and digital transformation',
    },
    {
      icon: Database,
      value: 'Enterprise',
      label: 'Large-Scale Data Infrastructure Experience',
      description: 'Fortune 500 experience in media and entertainment infrastructure',
    },
    {
      icon: TrendingUp,
      value: 'Growth',
      label: 'Growth-Oriented AI Partner',
      description: 'Focused on delivering measurable business value and ROI',
    },
    {
      icon: Users,
      value: '100%',
      label: 'Client Success Focus',
      description: 'Your success is our success—we partner for the long term',
    },
    {
      icon: Globe,
      value: 'SoCal',
      label: 'Los Angeles-Based, Serving Southern California',
      description: 'From LA to Orange County, San Diego to Santa Barbara',
    },
    {
      icon: Clock,
      value: '99.9%',
      label: 'System Uptime Target',
      description: 'Mission-critical reliability for enterprise deployments',
    },
  ];

  const values = [
    {
      icon: Target,
      title: 'Transparency',
      description: 'Clear explanations of how AI systems work with realistic expectations from day one.',
    },
    {
      icon: Shield,
      title: 'Ethical AI',
      description: 'Responsible AI that augments human capability rather than replacing people.',
    },
    {
      icon: Heart,
      title: 'Business Results',
      description: 'Success measured by business outcomes, not just technical metrics.',
    },
    {
      icon: Zap,
      title: 'Strategic Partnership',
      description: 'Long-term relationships built on trust, communication, and shared success.',
    },
  ];

  const methodology = [
    {
      step: 1,
      title: 'Discovery & Assessment',
      description: 'Deep dive into your challenges, data landscape, and success criteria.',
    },
    {
      step: 2,
      title: 'Strategy & Planning',
      description: 'Define roadmap, ROI model, and implementation approach.',
    },
    {
      step: 3,
      title: 'Proof of Concept',
      description: 'Validate approach with working prototype before major investment.',
    },
    {
      step: 4,
      title: 'Implementation & Training',
      description: 'Deploy production solution with comprehensive team enablement.',
    },
    {
      step: 5,
      title: 'Support & Optimization',
      description: 'Ongoing partnership to maximize value and adapt to evolving needs.',
    },
  ];

  return (
    <PageLayout>
      <PageMeta 
        title="About Johnathan Scott - Founder & AI Automation Expert"
        description="Meet Johnathan Scott, founder of Elevated AI. 20+ years enterprise IT leadership, transforming businesses through intelligent automation. Expert in Voice AI, workflow automation, and strategic AI implementation."
        keywords="Johnathan Scott, AI consultant, Elevated AI founder, enterprise AI expert, voice AI expert, automation consultant, N3RD Labs LLC"
        canonical="https://elevatedai.co/about"
      />
      {/* Hero */}
      <SectionContainer background="default" padding="large" className="text-center">
        <div className="max-w-4xl mx-auto space-y-6 animate-on-scroll">
          <Heading1>Transforming Businesses Through Intelligent Automation</Heading1>
          <Body className="text-white/70 text-lg max-w-3xl mx-auto">
            I'm Johnathan Scott, founder of Elevated AI. For over 20 years, I've turned complex enterprise technology into practical business tools. Now I'm doing the same with AI automation—helping businesses leverage intelligent systems without the enterprise agency overhead.
          </Body>
        </div>
      </SectionContainer>

      {/* Founder Bio */}
      <FounderBioSection />

      {/* Mission & Vision */}
      <MissionVisionSection />

      {/* Our Story */}
      <SectionContainer background="default" padding="large">
        <div className="max-w-4xl mx-auto space-y-8 animate-on-scroll">
          <div className="text-center">
            <Heading2 className="mb-4">The Journey to Elevated AI</Heading2>
            <Body className="text-white/70 text-lg">
              From enterprise infrastructure to intelligent automation—how 20 years of experience shaped a new approach to AI consulting.
            </Body>
          </div>
          
          <GlassCard className="p-8 md:p-10">
            <div className="space-y-6 text-white/70">
              <Body className="text-lg leading-relaxed">
                Elevated AI was born from a simple observation: businesses struggle with AI not because the technology isn't ready, but because it's inaccessible, overhyped, or poorly implemented by agencies focused on billable hours rather than business outcomes.
              </Body>
              
              <Body className="text-lg leading-relaxed">
                After two decades managing enterprise infrastructure at Legendary Entertainment, DeviantArt/Wix, and Hecho Studios—overseeing 575TB SAN storage systems, 11 professional edit bays, and supporting 1,700+ team members across international offices—I learned that technology succeeds or fails based on implementation, not just features.
              </Body>

              <Body className="text-lg leading-relaxed">
                As a former Apple Certified Trainer, I discovered that the best technology is transparent to its users. It augments capabilities without requiring users to become engineers. That philosophy now drives every AI system I build: make it powerful, make it practical, make it work.
              </Body>

              <Body className="text-lg leading-relaxed">
                Today, I combine enterprise infrastructure expertise with modern AI automation tools—ElevenLabs, MindStudio.ai, n8n, Thoughtly—to build voice agents, workflow automation, and operational AI systems that deliver measurable business value. No account managers, no junior staff handoffs, no agency overhead. Just direct access to senior-level expertise and a strategic partner network when specialized skills are needed.
              </Body>

              <Body className="text-lg leading-relaxed">
                My mission: make enterprise-grade AI automation accessible, affordable, and useful for companies of all sizes. Building toward becoming a recognized $50M+ leader in practical AI automation by 2030.
              </Body>
            </div>
          </GlassCard>
        </div>
      </SectionContainer>

      {/* Stats Grid */}
      <SectionContainer background="gradient" padding="large">
        <div className="max-w-6xl mx-auto space-y-12 animate-on-scroll">
          <div className="text-center">
            <Heading2 className="mb-4">Experience & Credentials</Heading2>
            <Body className="text-white/70 text-lg max-w-3xl mx-auto">
              Real enterprise experience, measurable results, and a proven track record of turning AI concepts into operational systems.
            </Body>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <GlassCard key={index} className="p-6 space-y-4 text-center group hover:ring-cyan-500/40 transition-all duration-300">
                <stat.icon className="w-10 h-10 text-cyan-400 mx-auto" />
                <div className="text-4xl font-semibold text-white">{stat.value}</div>
                <Heading3 className="text-base text-cyan-400">{stat.label}</Heading3>
                <Body className="text-white/60 text-sm">{stat.description}</Body>
              </GlassCard>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Partner Network */}
      <PartnerNetworkSection />

      {/* Values */}
      <SectionContainer background="gradient" padding="large">
        <div className="max-w-6xl mx-auto space-y-12 animate-on-scroll">
          <div className="text-center">
            <Heading2 className="mb-4">Core Values & Approach</Heading2>
            <Body className="text-white/70 text-lg max-w-3xl mx-auto">
              The principles that guide every engagement, partnership, and implementation.
            </Body>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <GlassCard key={index} className="p-8 space-y-4">
                <value.icon className="w-8 h-8 text-cyan-400" />
                <Heading3>{value.title}</Heading3>
                <Body className="text-white/70">{value.description}</Body>
              </GlassCard>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Methodology */}
      <SectionContainer background="default" padding="large">
        <div className="max-w-6xl mx-auto space-y-12 animate-on-scroll">
          <Heading2 className="text-center">How I Work</Heading2>
          <Body className="text-center text-white/70 max-w-2xl mx-auto">
            A proven methodology ensuring successful AI implementation from concept to production
          </Body>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
            
            <div className="grid md:grid-cols-5 gap-6 relative z-10">
              {methodology.map((phase) => (
                <GlassCard key={phase.step} className="p-6 space-y-4 text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/10 ring-2 ring-cyan-500/30 text-xl font-semibold text-cyan-400 mx-auto">
                    {phase.step}
                  </div>
                  <Heading3 className="text-sm">{phase.title}</Heading3>
                  <Body className="text-white/60 text-xs">{phase.description}</Body>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* CTA */}
      <SectionContainer background="gradient" padding="large">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-on-scroll">
          <Heading2>Let's Talk About Your AI Strategy</Heading2>
          <Body className="text-white/70 max-w-2xl mx-auto">
            Whether you need a voice agent, workflow automation, or strategic AI planning—let's discuss how 20+ years of enterprise experience can help your business move faster and operate smarter.
          </Body>
          
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link to="/contact">
              <Button size="lg" className="gap-2">
                Schedule a Call with Johnathan
                <Calendar className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/solutions">
              <Button size="lg" variant="outline">
                View Solutions & Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </SectionContainer>
    </PageLayout>
  );
};

export default About;
