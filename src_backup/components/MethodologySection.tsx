import { ClipboardCheck, Map, TestTube, Cog, TrendingUp } from "lucide-react";
import { SectionContainer } from "@/components/layout";
import { Heading2, Body } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const methodologySteps = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "AI Audit & Discovery",
    description: "Comprehensive assessment of your current systems, processes, and AI readiness. We identify high-impact automation opportunities and define success metrics.",
    duration: "1-2 weeks",
    delay: "0.1s"
  },
  {
    number: "02",
    icon: Map,
    title: "Strategic Roadmap",
    description: "Detailed implementation plan with phased approach, ROI projections, technology stack recommendations, and risk mitigation strategy.",
    duration: "1 week",
    delay: "0.2s"
  },
  {
    number: "03",
    icon: TestTube,
    title: "Proof of Concept",
    description: "Build and validate working prototype before major investment. Test assumptions, refine approach, and demonstrate value with real data.",
    duration: "2-4 weeks",
    delay: "0.3s"
  },
  {
    number: "04",
    icon: Cog,
    title: "Implementation & Integration",
    description: "Production deployment with comprehensive testing, team training, and documentation. Seamless integration with existing systems and workflows.",
    duration: "4-8 weeks",
    delay: "0.4s"
  },
  {
    number: "05",
    icon: TrendingUp,
    title: "Optimization & Support",
    description: "Ongoing monitoring, performance tuning, and feature enhancements. We stay engaged to maximize ROI and adapt to evolving business needs.",
    duration: "Ongoing",
    delay: "0.5s"
  }
];

export const MethodologySection = () => {
  return (
    <SectionContainer 
      id="methodology"
      background="default"
      padding="large"
      className="relative"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column: Header and Description */}
          <div className="flex flex-col justify-center animate-on-scroll">
            <Heading2 className="mb-6">
              Our Methodology
            </Heading2>
            <Body className="text-lg mb-8">
              A structured, proven approach that minimizes risk and maximizes value. We don't just build solutions—we partner with you through every phase, from discovery to optimization.
            </Body>
            <Body className="text-base mb-8">
              Every project follows our battle-tested 5-phase methodology, ensuring transparency, accountability, and measurable outcomes at each stage.
            </Body>
            <div>
              <Button asChild size="lg" className="animate-on-scroll">
                <Link to="/contact">Schedule Your AI Audit</Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Timeline */}
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/30 to-transparent hidden md:block" />

            {/* Steps */}
            <div className="space-y-8">
              {methodologySteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={index}
                    className="relative flex gap-6 animate-on-scroll"
                  >
                    {/* Number Badge */}
                    <div className="flex-shrink-0 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center ring-4 ring-background">
                        <span className="text-sm font-bold text-primary-foreground">
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 pb-2">
                      <div className="backdrop-blur-sm bg-white/5 ring-1 ring-white/10 rounded-lg p-6 hover:bg-white/8 hover:ring-white/15 transition-all duration-300 border-l-2 border-primary/50">
                        {/* Icon and Title */}
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-foreground mb-1">
                              {step.title}
                            </h3>
                            <span className="inline-block px-2 py-1 text-xs rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
                              {step.duration}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-foreground/70 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};
