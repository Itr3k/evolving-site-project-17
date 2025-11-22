import { ReactNode, useEffect } from "react";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { GridOverlay } from "@/components/GridOverlay";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { initInViewAnimations } from "@/utils/scrollAnimations";

interface PageLayoutProps {
  children: ReactNode;
  hero?: ReactNode;
  showParticles?: boolean;
  showFullHeightHero?: boolean;
  className?: string;
}

/**
 * PageLayout - Consistent layout wrapper for all pages
 * 
 * Provides:
 * - Particles background (optional)
 * - Grid overlay
 * - Header
 * - Footer
 * - Scroll animations
 * - Consistent dark theme structure
 */
export const PageLayout = ({ 
  children, 
  hero, 
  showParticles = false,
  showFullHeightHero = false,
  className = ""
}: PageLayoutProps) => {
  useEffect(() => {
    // Initialize scroll animations after component mounts
    const timer = setTimeout(() => {
      initInViewAnimations();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Container - only if hero content provided */}
      {hero && (
        <div className={`overflow-hidden relative ${showFullHeightHero ? 'h-screen' : 'min-h-[60vh]'}`}>
          {/* Particles Background - optional */}
          {showParticles && <ParticlesBackground />}
          
          {/* Grid Overlay */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <GridOverlay />
          </div>

          {/* Background gradient for non-full-height heroes */}
          {!showFullHeightHero && (
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
          )}

          {/* Main Content */}
          <div className="relative z-10">
            <Header />
            {hero}
          </div>
        </div>
      )}

      {/* If no hero, show header standalone */}
      {!hero && (
        <div className="relative">
          <Header />
        </div>
      )}

      {/* Main Content Container */}
      <div className={`relative ${className}`}>
        {children}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};