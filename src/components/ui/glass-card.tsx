import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  interactive?: boolean;
}

/**
 * GlassCard - Reusable glassmorphic card component
 * 
 * Features:
 * - Consistent glass effect styling
 * - Optional hover states
 * - Optional interactive states (cursor pointer, scale on hover)
 */
export const GlassCard = ({ 
  children, 
  className = "",
  hover = true,
  interactive = false,
}: GlassCardProps) => {
  return (
    <div
      className={cn(
        // Base glass effect
        "bg-white/5 backdrop-blur-md",
        "ring-1 ring-white/10",
        "rounded-xl",
        // Hover effect
        hover && "transition-all duration-300",
        hover && "hover:bg-white/8 hover:ring-white/15",
        // Interactive
        interactive && "cursor-pointer",
        interactive && "hover:scale-[1.02]",
        className
      )}
    >
      {children}
    </div>
  );
};