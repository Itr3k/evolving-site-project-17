import { useEffect } from "react";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { GridOverlay } from "@/components/GridOverlay";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { TrustBar } from "@/components/solutions/TrustBar";
import { WhatWeDoSection } from "@/components/WhatWeDoSection";
import { WhyElevatedAISection } from "@/components/WhyElevatedAISection";
import { MethodologySection } from "@/components/MethodologySection";
import { CaseStudiesSection } from "@/components/solutions/CaseStudiesSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { initInViewAnimations } from "@/utils/scrollAnimations";
import { PageMeta } from "@/components/seo/PageMeta";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";

const Index = () => {
  useEffect(() => {
    // Initialize scroll animations after component mounts
    const timer = setTimeout(() => {
      initInViewAnimations();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <OrganizationSchema />
      <PageMeta 
        title="Transforming Business Through Intelligent Automation | Elevated AI"
        description="AI consulting and automation solutions for businesses. 20+ years enterprise experience. We transform businesses through intelligent automation—Voice AI, workflow automation, and strategic AI implementation without enterprise agency overhead."
        keywords="AI consultant, intelligent automation, business automation, voice AI systems, AI strategy, enterprise AI, workflow automation, AI implementation"
        canonical="https://elevatedai.co/"
        ogImage="https://elevatedai.co/og-image.jpg"
      />
      {/* Hero Container with background */}
      <div className="overflow-hidden h-screen relative">
        {/* Particles Background */}
        <ParticlesBackground />
        
        {/* Grid Overlay */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <GridOverlay />
        </div>

        {/* Background image */}
        <img 
          src="https://images.unsplash.com/photo-1621619856624-42fd193a0661?w=1080&q=80" 
          alt="" 
          className="w-full h-full object-cover z-10 absolute top-0 right-0 bottom-0 left-0"
        />

        {/* Main Content */}
        <div className="relative">
          <Header />
          <HeroSection />
        </div>

        {/* Subtle vignette */}
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0"></div>
      </div>

      {/* Sections Container */}
      <section className="overflow-hidden lg:py-20 pt-8 pb-8 relative" id="solutions">
        {/* Decorative grid lines */}
        <div className="pointer-events-none z-0 absolute top-0 right-0 bottom-0 left-0">
          <div className="absolute inset-y-0 left-[15%] w-px bg-gradient-to-b from-transparent to-transparent via-white/5"></div>
          <div className="absolute inset-y-0 left-[35%] w-px bg-gradient-to-b from-transparent to-transparent via-white/5"></div>
          <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent to-transparent via-white/8"></div>
          <div className="absolute inset-y-0 left-[65%] w-px bg-gradient-to-b from-transparent to-transparent via-white/5"></div>
          <div className="absolute inset-y-0 left-[85%] w-px bg-gradient-to-b from-transparent to-transparent via-white/5"></div>
          <div className="absolute inset-x-0 top-[25%] h-px bg-gradient-to-r from-transparent to-transparent via-white/5"></div>
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent to-transparent via-white/8"></div>
          <div className="absolute inset-x-0 top-[75%] h-px bg-gradient-to-r from-transparent to-transparent via-white/5"></div>
        </div>

        <TrustBar />
        <WhatWeDoSection />
        <WhyElevatedAISection />
        <MethodologySection />
        <CaseStudiesSection />
        <FAQSection />
        <CTASection />
      </section>
      <Footer />
    </div>
  );
};

export default Index;
