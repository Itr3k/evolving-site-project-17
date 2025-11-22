import { Link } from 'react-router-dom';
import { PageLayout, SectionContainer } from '@/components/layout';
import { Heading1, Heading2, Heading3, Body } from '@/components/ui/typography';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { solutionDetails } from '@/data/solutionDetails';
import { Calendar, ArrowRight, Check, Home } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PageMeta } from '@/components/seo/PageMeta';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';

const CustomSolutions = () => {
  const solution = solutionDetails['custom-solutions'];

  return (
    <PageLayout>
      <PageMeta 
        title="Custom AI Solutions - Bespoke AI Development"
        description="We provide custom AI solutions tailored to your unique needs. Los Angeles AI consultant specializing in bespoke AI development for Southern California enterprises."
        keywords="custom AI solutions Los Angeles, bespoke AI development Southern California, enterprise AI consulting, tailored AI systems, AI architecture design"
        canonical="https://elevatedai.co/solutions/custom-solutions"
      />
      {/* JSON-LD Structured Data for Breadcrumbs */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://elevatedai.com/" },
          { name: "Solutions", url: "https://elevatedai.com/solutions" },
          { name: solution.name, url: "https://elevatedai.com/solutions/custom-solutions" }
        ]}
      />
      
      {/* Breadcrumb Navigation */}
      <div className="relative z-10 pt-24 pb-6">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="flex items-center gap-1.5 text-white/60 hover:text-white/90 transition-colors">
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/solutions" className="text-white/60 hover:text-white/90 transition-colors">
                    Solutions
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white/90">
                  {solution.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <SectionContainer background="default" padding="large" className="text-center">
        <div className="max-w-4xl mx-auto space-y-6 animate-on-scroll">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-cyan-500/10 ring-1 ring-cyan-500/20 mb-6">
            <solution.icon className="w-10 h-10 text-cyan-400" />
          </div>
          <Heading1>{solution.name}</Heading1>
          <Heading3 className="text-white/70 font-normal">{solution.tagline}</Heading3>
          <Body className="text-white/60 max-w-2xl mx-auto">{solution.valueProposition}</Body>
          
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link to="/contact?solution=custom-solutions">
              <Button size="lg" className="gap-2">
                Book Strategy Call
                <Calendar className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/showcase">
              <Button size="lg" variant="outline" className="gap-2">
                See Success Stories
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-3 gap-6 pt-12">
            {solution.metrics.map((metric, index) => (
              <GlassCard key={index} className="p-6">
                <div className="text-3xl font-semibold text-cyan-400 mb-2">{metric.value}</div>
                <div className="text-sm text-white/70">{metric.label}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Problem Statement */}
      <SectionContainer background="gradient" padding="large">
        <div className="max-w-4xl mx-auto text-center space-y-4 animate-on-scroll">
          <Heading2>The Challenge</Heading2>
          <Body className="text-white/70 text-lg">{solution.problemStatement}</Body>
        </div>
      </SectionContainer>

      {/* How It Works */}
      <SectionContainer background="default" padding="large">
        <div className="max-w-6xl mx-auto space-y-12 animate-on-scroll">
          <Heading2 className="text-center">How It Works</Heading2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solution.howItWorks.map((step) => (
              <GlassCard key={step.step} className="p-6 space-y-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/10 ring-1 ring-cyan-500/20 text-xl font-semibold text-cyan-400">
                  {step.step}
                </div>
                <Heading3 className="text-lg">{step.title}</Heading3>
                <Body className="text-white/60 text-sm">{step.description}</Body>
              </GlassCard>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Use Cases */}
      <SectionContainer background="gradient" padding="large">
        <div className="max-w-4xl mx-auto space-y-8 animate-on-scroll">
          <Heading2 className="text-center">Real-World Applications</Heading2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {solution.useCases.map((useCase, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white/5 ring-1 ring-white/10 rounded-xl px-6 backdrop-blur-sm border-none">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  {useCase.title}
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div>
                    <div className="text-sm font-semibold text-cyan-400 mb-2">Problem</div>
                    <Body className="text-white/70">{useCase.problem}</Body>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-cyan-400 mb-2">Solution</div>
                    <Body className="text-white/70">{useCase.solution}</Body>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-cyan-400 mb-2">Outcome</div>
                    <Body className="text-white/70">{useCase.outcome}</Body>
                  </div>
                  <div className="flex flex-wrap gap-3 pt-2">
                    {useCase.metrics.map((metric, idx) => (
                      <span key={idx} className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 ring-1 ring-cyan-500/20 rounded-full text-sm text-cyan-400">
                        <Check className="w-4 h-4" />
                        {metric}
                      </span>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SectionContainer>

      {/* Features Grid */}
      <SectionContainer background="default" padding="large">
        <div className="max-w-6xl mx-auto space-y-12 animate-on-scroll">
          <Heading2 className="text-center">Key Features</Heading2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solution.features.map((feature, index) => (
              <GlassCard key={index} className="p-6 space-y-4 group hover:ring-cyan-500/40 transition-all duration-300">
                <feature.icon className="w-8 h-8 text-cyan-400" />
                <Heading3 className="text-lg">{feature.title}</Heading3>
                <Body className="text-white/60 text-sm">{feature.description}</Body>
              </GlassCard>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Integrations */}
      <SectionContainer background="gradient" padding="large">
        <div className="max-w-4xl mx-auto space-y-8 animate-on-scroll">
          <Heading2 className="text-center">Seamless Integrations</Heading2>
          <Body className="text-center text-white/70">
            Works with your existing tools and systems—no rip-and-replace required.
          </Body>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {solution.integrations.map((integration, index) => (
              <GlassCard key={index} className="p-4 text-center">
                <div className="font-medium">{integration.name}</div>
                <div className="text-xs text-white/50">{integration.category}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* FAQ */}
      <SectionContainer background="default" padding="large">
        <div className="max-w-4xl mx-auto space-y-8 animate-on-scroll">
          <Heading2 className="text-center">Frequently Asked Questions</Heading2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {solution.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="bg-white/5 ring-1 ring-white/10 rounded-xl px-6 backdrop-blur-sm border-none">
                <AccordionTrigger className="text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <Body className="text-white/70">{faq.answer}</Body>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SectionContainer>

      {/* Final CTA */}
      <SectionContainer background="gradient" padding="large">
        <div className="max-w-4xl mx-auto text-center space-y-6 animate-on-scroll">
          <Heading2>Ready to Build Your Custom AI Solution?</Heading2>
          <Body className="text-white/70 max-w-2xl mx-auto">
            Let's discuss how custom AI can give you a competitive edge and transform your unique business processes.
          </Body>
          
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link to="/contact?solution=custom-solutions">
              <Button size="lg" className="gap-2">
                Schedule Consultation
                <Calendar className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/solutions">
              <Button size="lg" variant="outline">
                Explore All Solutions
              </Button>
            </Link>
          </div>
        </div>
      </SectionContainer>
    </PageLayout>
  );
};

export default CustomSolutions;
