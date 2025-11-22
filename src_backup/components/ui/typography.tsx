import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TypographyProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
}

/**
 * Typography components with consistent styling based on design system
 */

export const Heading1 = ({ children, className, as: Component = "h1" }: TypographyProps) => (
  <Component className={cn(
    "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
    "tracking-tighter font-normal leading-tight",
    "text-foreground",
    className
  )}>
    {children}
  </Component>
);

export const Heading2 = ({ children, className, as: Component = "h2" }: TypographyProps) => (
  <Component className={cn(
    "text-3xl sm:text-4xl md:text-5xl",
    "tracking-tight font-normal leading-tight",
    "text-foreground",
    className
  )}>
    {children}
  </Component>
);

export const Heading3 = ({ children, className, as: Component = "h3" }: TypographyProps) => (
  <Component className={cn(
    "text-2xl sm:text-3xl",
    "tracking-tight font-medium leading-tight",
    "text-foreground",
    className
  )}>
    {children}
  </Component>
);

export const Heading4 = ({ children, className, as: Component = "h4" }: TypographyProps) => (
  <Component className={cn(
    "text-xl sm:text-2xl",
    "tracking-tight font-medium",
    "text-foreground",
    className
  )}>
    {children}
  </Component>
);

export const Heading5 = ({ children, className, as: Component = "h5" }: TypographyProps) => (
  <Component className={cn(
    "text-lg sm:text-xl",
    "font-medium",
    "text-foreground",
    className
  )}>
    {children}
  </Component>
);

export const Heading6 = ({ children, className, as: Component = "h6" }: TypographyProps) => (
  <Component className={cn(
    "text-base sm:text-lg",
    "font-medium",
    "text-foreground",
    className
  )}>
    {children}
  </Component>
);

export const BodyLarge = ({ children, className, as: Component = "p" }: TypographyProps) => (
  <Component className={cn(
    "text-lg leading-relaxed",
    "text-foreground/80",
    className
  )}>
    {children}
  </Component>
);

export const Body = ({ children, className, as: Component = "p" }: TypographyProps) => (
  <Component className={cn(
    "text-base leading-relaxed",
    "text-foreground/70",
    className
  )}>
    {children}
  </Component>
);

export const BodySmall = ({ children, className, as: Component = "p" }: TypographyProps) => (
  <Component className={cn(
    "text-sm leading-relaxed",
    "text-foreground/60",
    className
  )}>
    {children}
  </Component>
);

export const Label = ({ children, className, as: Component = "span" }: TypographyProps) => (
  <Component className={cn(
    "text-xs font-medium uppercase tracking-wider",
    "text-foreground/50",
    className
  )}>
    {children}
  </Component>
);