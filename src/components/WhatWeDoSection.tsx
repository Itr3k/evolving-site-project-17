import { Brain, Phone, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const WhatWeDoSection = () => {
  const services = [
    {
      icon: Brain,
      title: "AI Strategy & Consulting",
      description: "Transform your business with strategic AI implementation roadmaps tailored to your enterprise needs.",
      capabilities: [
        "AI readiness assessments",
        "Implementation roadmaps",
        "ROI modeling & projections",
        "Technology stack recommendations"
      ],
      pricing: "$750-$2,500/hr or $5K-$15K/month retainers",
      cta: "Learn More",
      link: "/solutions",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      ringColor: "ring-blue-500/20"
    },
    {
      icon: Phone,
      title: "Voice AI Systems",
      description: "Deploy intelligent voice interfaces that handle customer interactions 24/7 with enterprise-grade reliability.",
      capabilities: [
        "Appointment scheduling automation",
        "CRM updates & account management",
        "Tier 1/Tier 2 customer support",
        "Multi-channel integration (voice, email, SMS)"
      ],
      pricing: "From $3K setup + $1K/month",
      cta: "View Pricing",
      link: "/solutions",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      ringColor: "ring-cyan-500/20"
    },
    {
      icon: Zap,
      title: "Workflow Automation",
      description: "Streamline operations with AI-powered workflows that integrate seamlessly with your existing systems.",
      capabilities: [
        "Email triage & intelligent routing",
        "Sales qualification automation",
        "CRM sync & data processing",
        "Slack/Teams notifications & workflows"
      ],
      pricing: "Custom solutions tailored to your needs",
      cta: "Get Started",
      link: "/contact",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      ringColor: "ring-emerald-500/20"
    }
  ];

  return (
    <section className="relative z-10 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.2s_both]">
          <div className="inline-flex text-[11px] ring-1 font-medium font-geist rounded-full pt-1.5 pr-3 pb-1.5 pl-3 gap-x-2 mb-4 items-center ring-white/10 text-white/70 bg-white/5">
            Our Solutions
          </div>
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight font-geist mb-4">
            Enterprise AI Solutions That Drive Results
          </h2>
          <p className="text-lg text-muted-foreground font-geist max-w-3xl mx-auto">
            From strategic consulting to Voice AI deployment—comprehensive solutions for modern enterprises seeking intelligent automation
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const delay = 0.3 + index * 0.1;
            return (
              <div
                key={index}
                className={`backdrop-blur-sm bg-white/5 rounded-2xl ring-1 ring-white/10 p-8 hover:bg-white/8 hover:ring-white/15 transition-all duration-500 animate-on-scroll [animation:fadeSlideIn_1s_ease-out_${delay}s_both] flex flex-col`}
              >
                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${service.bgColor} ring-1 ${service.ringColor}`}>
                    <Icon className={`w-6 h-6 ${service.color}`} />
                  </div>
                  <h3 className="text-xl font-medium font-geist">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground font-geist mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Capabilities List */}
                <ul className="space-y-2 mb-6 flex-1">
                  {service.capabilities.map((capability, capIndex) => (
                    <li
                      key={capIndex}
                      className="flex items-start gap-2 text-sm text-muted-foreground font-geist"
                    >
                      <span className={`${service.color} text-lg leading-none mt-0.5`}>•</span>
                      <span className="leading-relaxed">{capability}</span>
                    </li>
                  ))}
                </ul>

                {/* Pricing */}
                <div className="mb-6 pt-4 border-t border-white/10">
                  <p className="text-xs text-muted-foreground font-geist mb-1">Starting at</p>
                  <p className="text-sm font-medium font-geist">{service.pricing}</p>
                </div>

                {/* CTA */}
                <Link
                  to={service.link}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20 transition-all duration-300 text-sm font-geist group"
                >
                  {service.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.7s_both]">
          <p className="text-sm text-muted-foreground font-geist mb-4">
            Not sure which solution fits your needs?
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 transition-all duration-300 text-sm font-geist font-medium"
          >
            Book a Free Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
