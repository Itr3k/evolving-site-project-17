import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { GridOverlay } from "@/components/GridOverlay";
import { initInViewAnimations } from "@/utils/scrollAnimations";
import { useScrollDepth } from "@/hooks/useScrollDepth";
import { trackCTAClick, trackPageView } from "@/utils/analytics";
import { TrustBar } from "@/components/solutions/TrustBar";
import { TestimonialsSection } from "@/components/solutions/TestimonialsSection";
import { CaseStudiesSection } from "@/components/solutions/CaseStudiesSection";
import { LeadMagnetSection } from "@/components/solutions/LeadMagnetSection";
import { MidPageCTA } from "@/components/solutions/MidPageCTA";
import { PageMeta } from "@/components/seo/PageMeta";
import { ProjectIntakeModal } from "@/components/ProjectIntakeModal";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Brain, 
  MessageSquare, 
  FileText, 
  Eye, 
  Wrench, 
  Check, 
  ArrowRight, 
  Layers,
  Calendar,
  Briefcase,
  HeartPulse,
  ShoppingCart,
  Factory,
  ChevronDown
} from "lucide-react";

const Solutions = () => {
  const [expandedUseCase, setExpandedUseCase] = useState<number | null>(null);
  const [showIntakeModal, setShowIntakeModal] = useState(false);

  useScrollDepth(); // Track scroll depth for analytics

  useEffect(() => {
    initInViewAnimations();
    trackPageView('/solutions');
  }, []);

  const toggleUseCase = (index: number) => {
    setExpandedUseCase(expandedUseCase === index ? null : index);
  };

  const solutions = [
    {
      icon: Zap,
      title: "Intelligent Automation",
      slug: "intelligent-automation",
      description: "Multi-agent systems that learn, adapt, and execute complex workflows across your entire organization—reducing manual work by up to 80% while maintaining precision.",
      features: [
        { text: "Process mining & optimization", benefit: "Identify bottlenecks and optimize workflows automatically" },
        { text: "Cross-platform orchestration", benefit: "Connect disparate systems seamlessly" },
        { text: "Self-healing workflows", benefit: "Detect and resolve issues before they impact operations" },
        { text: "Real-time monitoring & alerts", benefit: "Stay informed with intelligent notifications" }
      ],
      useCase: {
        industry: "Manufacturing",
        example: "Global manufacturer reduced production downtime by 75% using intelligent automation for predictive maintenance and quality control.",
        metrics: ["↓ 75% downtime", "$5M saved annually"]
      },
      gradient: "from-cyan-500/10 via-blue-500/5",
      iconBg: "from-cyan-500/20 to-blue-500/20",
      iconColor: "text-cyan-300",
      checkColor: "text-cyan-400",
      linkColor: "text-cyan-300 hover:text-cyan-200"
    },
    {
      icon: Brain,
      title: "Decision Intelligence",
      slug: "decision-intelligence",
      description: "Advanced analytics and predictive models that turn data into actionable insights, helping you make smarter decisions faster with confidence.",
      features: [
        { text: "Predictive analytics & forecasting", benefit: "Anticipate demand shifts 3 months ahead with 94% accuracy" },
        { text: "Natural language queries", benefit: "Ask questions in plain English, get instant insights" },
        { text: "Anomaly detection", benefit: "Identify outliers and opportunities automatically" },
        { text: "Interactive dashboards", benefit: "Visualize complex data in real-time" }
      ],
      useCase: {
        industry: "Retail",
        example: "Major retailer achieved 94% demand forecasting accuracy, reducing waste by 40% and improving stock availability.",
        metrics: ["↑ 94% accuracy", "↓ 40% waste"]
      },
      gradient: "from-cyan-500/10 via-blue-500/5",
      iconBg: "from-cyan-500/20 to-blue-500/20",
      iconColor: "text-cyan-300",
      checkColor: "text-cyan-400",
      linkColor: "text-cyan-300 hover:text-cyan-200"
    },
    {
      icon: MessageSquare,
      title: "Conversational AI",
      slug: "conversational-ai",
      description: "Natural, context-aware chatbots and voice assistants that understand intent, remember conversations, and deliver exceptional customer experiences 24/7.",
      features: [
        { text: "Multi-channel deployment", benefit: "Consistent experience across web, mobile, and voice" },
        { text: "Sentiment analysis", benefit: "Detect emotions and adapt responses accordingly" },
        { text: "Multi-language support", benefit: "Serve global customers in their native language" },
        { text: "Seamless human handoff", benefit: "Escalate complex issues intelligently" }
      ],
      useCase: {
        industry: "Financial Services",
        example: "Banking institution automated 80% of customer inquiries while improving satisfaction scores by 25%.",
        metrics: ["↑ 80% automation", "↑ 25% satisfaction"]
      },
      gradient: "from-cyan-500/10 via-blue-500/5",
      iconBg: "from-cyan-500/20 to-blue-500/20",
      iconColor: "text-cyan-300",
      checkColor: "text-cyan-400",
      linkColor: "text-cyan-300 hover:text-cyan-200"
    },
    {
      icon: FileText,
      title: "Document Intelligence",
      slug: "document-intelligence",
      description: "Extract, classify, and process information from any document format with human-level accuracy—from invoices to contracts to medical records.",
      features: [
        { text: "OCR & handwriting recognition", benefit: "Process any document format with 99%+ accuracy" },
        { text: "Smart data extraction", benefit: "Pull critical information automatically" },
        { text: "Automatic classification", benefit: "Categorize documents without manual sorting" },
        { text: "Validation & verification", benefit: "Ensure data accuracy with built-in checks" }
      ],
      useCase: {
        industry: "Healthcare",
        example: "Healthcare provider reduced patient intake processing time by 65%, saving $2M annually.",
        metrics: ["↓ 65% time saved", "$2M savings"]
      },
      gradient: "from-cyan-500/10 via-blue-500/5",
      iconBg: "from-cyan-500/20 to-blue-500/20",
      iconColor: "text-cyan-300",
      checkColor: "text-cyan-400",
      linkColor: "text-cyan-300 hover:text-cyan-200"
    },
    {
      icon: Eye,
      title: "Computer Vision",
      slug: "computer-vision",
      description: "Visual intelligence that sees, understands, and acts on image and video data—enabling quality control, safety monitoring, and visual search at scale.",
      features: [
        { text: "Object detection & tracking", benefit: "Monitor assets and inventory in real-time" },
        { text: "Defect identification", benefit: "Catch quality issues before they reach customers" },
        { text: "Facial recognition", benefit: "Enhance security and personalization" },
        { text: "Real-time video analysis", benefit: "Process live feeds for instant insights" }
      ],
      useCase: {
        industry: "Manufacturing",
        example: "Production facility improved quality control, reducing defects by 85% with automated visual inspection.",
        metrics: ["↓ 85% defects", "↑ 3x throughput"]
      },
      gradient: "from-cyan-500/10 via-blue-500/5",
      iconBg: "from-cyan-500/20 to-blue-500/20",
      iconColor: "text-cyan-300",
      checkColor: "text-cyan-400",
      linkColor: "text-cyan-300 hover:text-cyan-200"
    },
    {
      icon: Wrench,
      title: "Custom Solutions",
      slug: "custom-solutions",
      description: "Bespoke AI systems tailored to your unique challenges and requirements—from concept to deployment, built with your team and scaled to your needs.",
      features: [
        { text: "Requirements analysis", benefit: "Deep dive into your specific needs and constraints" },
        { text: "Architecture design", benefit: "Scalable solutions built for your infrastructure" },
        { text: "Integration & deployment", benefit: "Seamless rollout with minimal disruption" },
        { text: "Ongoing support", benefit: "Continuous optimization and expert guidance" }
      ],
      useCase: {
        industry: "Enterprise",
        example: "Fortune 500 company deployed custom AI platform, achieving 10x ROI within 18 months.",
        metrics: ["10x ROI", "18 months"]
      },
      gradient: "from-cyan-500/10 via-blue-500/5",
      iconBg: "from-cyan-500/20 to-blue-500/20",
      iconColor: "text-cyan-300",
      checkColor: "text-cyan-400",
      linkColor: "text-cyan-300 hover:text-cyan-200"
    }
  ];

  const industries = [
    {
      icon: Briefcase,
      title: "Financial Services",
      description: "Risk analysis, fraud detection, trading automation",
      iconBg: "from-blue-500/20 to-indigo-500/20",
      iconColor: "text-blue-300"
    },
    {
      icon: HeartPulse,
      title: "Healthcare",
      description: "Diagnostics, patient care, research acceleration",
      iconBg: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-300"
    },
    {
      icon: ShoppingCart,
      title: "Retail & E-commerce",
      description: "Personalization, inventory, customer service",
      iconBg: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-300"
    },
    {
      icon: Factory,
      title: "Manufacturing",
      description: "Quality control, predictive maintenance, supply chain",
      iconBg: "from-orange-500/20 to-amber-500/20",
      iconColor: "text-orange-300"
    }
  ];

  const renderSolutionCard = (solution: typeof solutions[0], index: number) => {
    const Icon = solution.icon;
    const delay = 0.2 + index * 0.1;
    const isExpanded = expandedUseCase === index;
    
    return (
      <div 
        key={index} 
        className="group animate-on-scroll relative"
        style={{
          animation: `fadeSlideIn 1s ease-out ${delay}s both`,
          animationPlayState: 'paused'
        }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
        <div className="relative h-full backdrop-blur-sm bg-white/5 rounded-3xl ring-1 ring-white/10 p-8 md:p-10 transition-all duration-500 group-hover:bg-white/[0.07] group-hover:ring-white/20 flex flex-col">
          {/* Icon */}
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${solution.iconBg} ring-1 ring-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
            <Icon className={`w-7 h-7 ${solution.iconColor}`} />
          </div>

          {/* Content */}
          <h3 className="text-2xl md:text-3xl font-normal tracking-tight font-geist mb-4">
            {solution.title}
          </h3>
          <p className="text-base leading-relaxed font-geist text-white/70 mb-6">
            {solution.description}
          </p>

          {/* Features list with benefits */}
          <ul className="space-y-3 mb-6 flex-grow">
            {solution.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm font-geist">
                <Check className={`w-4 h-4 ${solution.checkColor} mt-0.5 shrink-0`} />
                <div>
                  <div className="text-white/80 font-medium">{feature.text}</div>
                  <div className="text-white/50 text-xs mt-0.5">{feature.benefit}</div>
                </div>
              </li>
            ))}
          </ul>

          {/* Use Case Accordion */}
          <div className="border-t border-white/10 pt-6 mt-auto">
            <button 
              onClick={() => toggleUseCase(index)} 
              className="flex items-center justify-between w-full text-left group/btn"
              aria-expanded={isExpanded}
            >
              <span className="text-sm font-medium text-cyan-300 group-hover/btn:text-cyan-200 transition-colors">
                See Real-World Example
              </span>
              <ChevronDown className={`w-4 h-4 text-cyan-300 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
            {isExpanded && (
              <div className="mt-4 p-4 bg-white/5 rounded-xl ring-1 ring-white/10 animate-accordion-down">
                <div className="text-xs text-cyan-400 mb-2 font-geist uppercase tracking-wider">
                  {solution.useCase.industry}
                </div>
                <p className="text-sm text-white/80 mb-3 font-geist leading-relaxed">
                  {solution.useCase.example}
                </p>
                <div className="flex items-center gap-4 text-xs font-medium">
                  {solution.useCase.metrics.map((metric, idx) => (
                    <span key={idx} className={idx === 0 ? "text-emerald-400" : "text-cyan-400"}>
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Enhanced CTAs */}
          <div className="flex items-center gap-3 pt-6 border-t border-white/5 mt-6">
            <Link 
              to={`/solutions/${solution.slug}`}
              className="flex-1 text-center px-4 py-2.5 rounded-lg bg-cyan-500/10 ring-1 ring-cyan-500/20 hover:bg-cyan-500/20 transition-all text-sm font-medium text-cyan-300"
            >
              Learn More
            </Link>
            <Button
              onClick={() => {
                setShowIntakeModal(true);
                trackCTAClick('solution_card', 'high', 'Get Started');
              }}
              className="flex-1 px-4 py-2.5 rounded-lg bg-white text-slate-950 hover:bg-white/90 transition-all text-sm font-medium h-auto"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased overflow-x-hidden">
      <PageMeta 
        title="AI Solutions - Intelligent Automation & Strategic AI Services"
        description="Transform your business through intelligent automation. Voice AI Systems, Workflow Automation, Decision Intelligence, and Strategic AI Consulting. Enterprise-grade solutions without the agency overhead."
        keywords="AI automation services, voice AI systems, intelligent automation, decision intelligence, workflow automation, AI consulting, strategic AI implementation"
        canonical="https://elevatedai.co/solutions"
      />
      <ParticlesBackground />
      <GridOverlay />
      <Header />

      {/* Hero Section */}
      <section className="relative z-10 overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ring-1 font-geist mb-6 [animation:fadeSlideIn_1s_ease-out_0.1s_both] bg-white/5 text-white/80 ring-white/10 backdrop-blur-sm">
              <Layers className="w-3.5 h-3.5" />
              Our Solutions
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tighter font-geist [animation:fadeSlideIn_1s_ease-out_0.2s_both]">
              Transforming Business<br />Through Intelligent Automation
            </h1>
            <p className="mt-6 text-lg md:text-xl leading-relaxed font-geist text-white/70 [animation:fadeSlideIn_1s_ease-out_0.3s_both] max-w-3xl mx-auto">
              Enterprise-grade AI solutions that reduce costs by 70%, automate workflows, and unlock predictive insights—without the enterprise agency overhead.{' '}
              <span className="text-primary font-medium">See results in weeks, not months.</span>
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 [animation:fadeSlideIn_1s_ease-out_0.4s_both]">
              <button 
                onClick={() => {
                  trackCTAClick('hero', 'high', 'Start Your AI Journey');
                  setShowIntakeModal(true);
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium font-geist text-base bg-white text-slate-950 hover:bg-white/90 transition-all duration-300 ring-1 ring-white/20 group"
              >
                Start Your AI Journey
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </button>
              <a 
                href="#solutions-grid" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium font-geist text-base backdrop-blur-sm bg-white/10 ring-1 ring-white/20 hover:bg-white/15 hover:ring-white/30 transition-all text-white"
              >
                Explore Solutions
                <ChevronDown className="w-5 h-5" />
              </a>
            </div>

            {/* Trust Signal */}
            <p className="text-xs text-white/50 mt-6 font-geist [animation:fadeSlideIn_1s_ease-out_0.5s_both]">
              Free consultation • No credit card required • Results guaranteed
            </p>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* Solutions Grid */}
      <section id="solutions-grid" className="relative z-10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {solutions.map((solution, index) => {
              // Insert mid-page CTA after third card
              if (index === 3) {
                return (
                  <>
                    <MidPageCTA key="mid-page-cta" />
                    {renderSolutionCard(solution, index)}
                  </>
                );
              }
              return renderSolutionCard(solution, index);
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Case Studies Section */}
      <CaseStudiesSection />

      {/* Lead Magnet Section */}
      <LeadMagnetSection />

      {/* Industries Section */}
      <section className="relative z-10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16 animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.2s_both]">
            <h2 className="text-4xl md:text-5xl font-normal tracking-tight font-geist mb-4">
              Industries We Serve
            </h2>
            <p className="text-lg text-white/70 font-geist max-w-2xl mx-auto">
              Domain expertise meets cutting-edge AI across sectors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              const delay = 0.3 + index * 0.1;
              
              return (
                <div 
                  key={index} 
                  className="group animate-on-scroll backdrop-blur-sm bg-white/5 rounded-2xl ring-1 ring-white/10 p-6 transition-all duration-500 hover:bg-white/[0.07] hover:ring-white/20"
                  style={{
                    animation: `fadeSlideIn 1s ease-out ${delay}s both`,
                    animationPlayState: 'paused'
                  }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${industry.iconBg} ring-1 ring-white/10 flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${industry.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-medium font-geist mb-2">{industry.title}</h3>
                  <p className="text-sm text-white/60 font-geist">{industry.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="relative animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.2s_both]">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-cyan-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative backdrop-blur-sm bg-white/5 rounded-3xl ring-1 ring-white/10 p-12 md:p-16 text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight font-geist mb-6">
                Ready to Transform Your Operations?
              </h2>
              <p className="text-lg md:text-xl text-white/70 font-geist mb-10 max-w-2xl mx-auto">
                Let's discuss how our AI solutions can solve your unique challenges and drive measurable results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/contact" 
                  onClick={() => trackCTAClick('bottom_cta', 'high', 'Schedule a Consultation')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium font-geist text-base bg-white text-slate-950 hover:bg-white/90 transition-all duration-300 ring-1 ring-white/20"
                >
                  Schedule a Consultation
                  <Calendar className="w-5 h-5" />
                </Link>
                <Link 
                  to="/showcase" 
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium font-geist text-base backdrop-blur-sm bg-white/10 ring-1 ring-white/20 hover:bg-white/15 hover:ring-white/30 transition-all duration-300 text-white"
                >
                  View Case Studies
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      <ProjectIntakeModal
        isOpen={showIntakeModal}
        onClose={() => setShowIntakeModal(false)}
      />
    </div>
  );
};

export default Solutions;
