import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  showGrid?: boolean;
  background?: "default" | "gradient" | "none";
  maxWidth?: "default" | "wide" | "narrow" | "full";
  padding?: "default" | "large" | "small" | "none";
}

/**
 * SectionContainer - Standardized section wrapper for consistent spacing and styling
 * 
 * Features:
 * - Consistent max-width and padding
 * - Optional decorative grid lines
 * - Background variations
 * - Scroll animation support (add 'animate-on-scroll' class to children)
 */
export const SectionContainer = ({
  children,
  className = "",
  containerClassName = "",
  id,
  showGrid = false,
  background = "default",
  maxWidth = "default",
  padding = "default",
}: SectionContainerProps) => {
  const maxWidthClasses = {
    default: "max-w-7xl",
    wide: "max-w-[1400px]",
    narrow: "max-w-5xl",
    full: "max-w-none",
  };

  const paddingClasses = {
    default: "py-16 md:py-20 lg:py-24",
    large: "py-20 md:py-28 lg:py-32",
    small: "py-8 md:py-12 lg:py-16",
    none: "",
  };

  const backgroundClasses = {
    default: "bg-slate-950",
    gradient: "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950",
    none: "",
  };

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden",
        backgroundClasses[background],
        paddingClasses[padding],
        className
      )}
    >
      {/* Optional decorative grid lines */}
      {showGrid && (
        <div className="pointer-events-none z-0 absolute inset-0">
          {/* Vertical lines */}
          <div className="absolute inset-y-0 left-[15%] w-px bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
          <div className="absolute inset-y-0 left-[35%] w-px bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
          <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/8 to-transparent"></div>
          <div className="absolute inset-y-0 left-[65%] w-px bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
          <div className="absolute inset-y-0 left-[85%] w-px bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
          
          {/* Horizontal lines */}
          <div className="absolute inset-x-0 top-[25%] h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="absolute inset-x-0 top-[50%] h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="absolute inset-x-0 top-[75%] h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>
      )}

      {/* Content Container */}
      <div
        className={cn(
          "relative z-10 mx-auto px-6 md:px-8",
          maxWidthClasses[maxWidth],
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
};