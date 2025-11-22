# Layout Components - Design System Foundation

## Overview

This directory contains reusable layout components that ensure visual consistency across all pages of the Elevated AI site. These components implement the design system defined in `src/index.css` and `tailwind.config.ts`.

## Components

### PageLayout

The main layout wrapper for all pages. Provides consistent structure with header, footer, and optional hero sections.

**Usage:**

```tsx
import { PageLayout } from "@/components/layout";
import { HeroSection } from "@/components/HeroSection";

function MyPage() {
  return (
    <PageLayout
      hero={<HeroSection />}
      showParticles={true}
      showFullHeightHero={true}
    >
      <SectionContainer>
        {/* Your page content */}
      </SectionContainer>
    </PageLayout>
  );
}
```

**Props:**

- `children` (ReactNode) - Main page content
- `hero` (ReactNode, optional) - Hero section content
- `showParticles` (boolean, default: false) - Enable particle animation background
- `showFullHeightHero` (boolean, default: false) - Make hero full viewport height
- `className` (string, optional) - Additional CSS classes

### SectionContainer

Standardized section wrapper with consistent spacing, optional grid overlay, and background variations.

**Usage:**

```tsx
import { SectionContainer } from "@/components/layout";

function MySection() {
  return (
    <SectionContainer
      id="features"
      showGrid={true}
      background="gradient"
      padding="large"
      maxWidth="default"
    >
      <h2>Features</h2>
      <p>Section content here...</p>
    </SectionContainer>
  );
}
```

**Props:**

- `children` (ReactNode) - Section content
- `id` (string, optional) - Section ID for anchor links
- `showGrid` (boolean, default: false) - Show decorative grid lines
- `background` (string, default: "default") - Options: "default" | "gradient" | "none"
- `maxWidth` (string, default: "default") - Options: "default" (7xl) | "wide" | "narrow" | "full"
- `padding` (string, default: "default") - Options: "default" | "large" | "small" | "none"
- `className` (string, optional) - Additional section classes
- `containerClassName` (string, optional) - Additional container classes

## Reusable UI Components

### GlassCard

Glassmorphic card component with consistent styling.

**Usage:**

```tsx
import { GlassCard } from "@/components/ui/glass-card";

<GlassCard hover={true} interactive={true} className="p-6">
  <h3>Card Title</h3>
  <p>Card content</p>
</GlassCard>
```

**Props:**

- `children` (ReactNode) - Card content
- `hover` (boolean, default: true) - Enable hover effects
- `interactive` (boolean, default: false) - Add cursor pointer and scale on hover
- `className` (string, optional) - Additional CSS classes

### Typography Components

Standardized heading and body text components.

**Usage:**

```tsx
import { Heading1, Heading2, Body, BodyLarge } from "@/components/ui/typography";

<Heading1>Main Page Title</Heading1>
<Heading2>Section Heading</Heading2>
<BodyLarge>Large introductory text</BodyLarge>
<Body>Regular body text</Body>
```

**Available Components:**

- `Heading1` - H1, 4xl-7xl, tracking-tighter
- `Heading2` - H2, 3xl-5xl, tracking-tight
- `Heading3` - H3, 2xl-3xl, tracking-tight
- `Heading4` - H4, xl-2xl
- `Heading5` - H5, lg-xl
- `Heading6` - H6, base-lg
- `BodyLarge` - Large body text (18px)
- `Body` - Regular body text (16px)
- `BodySmall` - Small body text (14px)
- `Label` - Uppercase labels (12px)

All components accept:
- `as` prop to change the underlying HTML element
- `className` prop for additional styling

## Design System Tokens

### Colors (from index.css)

All colors use HSL format for easy customization.

**Semantic Colors:**
- `--background` - Main background color
- `--foreground` - Main text color
- `--primary` - Primary accent color
- `--secondary` - Secondary accent color
- `--muted` - Muted/subdued elements
- `--accent` - General accent color
- `--border` - Border color
- `--destructive` - Error/destructive actions

**Brand Accent Colors:**
- `--accent-cyan: 189 94% 43%` → Use as `bg-accent-cyan` or `text-accent-cyan`
- `--accent-purple: 271 91% 65%` → Use as `bg-accent-purple` or `text-accent-purple`
- `--accent-blue: 217 91% 60%` → Use as `bg-accent-blue` or `text-accent-blue`

**Glow Effects:**
- `--cyan-glow: 187 85% 53%` → Use as `bg-glow-cyan`
- `--purple-glow: 258 90% 66%` → Use as `bg-glow-purple`

**Glass Effects:**
- `--glass-bg` - Glass background with opacity
- `--glass-border` - Glass border with opacity
- `--glass-bg-hover` - Glass hover background
- `--glass-border-hover` - Glass hover border

### Typography Scale

All font sizes defined in rem units:
- `--text-xs: 0.75rem` (12px)
- `--text-sm: 0.875rem` (14px)
- `--text-base: 1rem` (16px)
- `--text-lg: 1.125rem` (18px)
- `--text-xl: 1.25rem` (20px)
- `--text-2xl: 1.5rem` (24px)
- `--text-3xl: 1.875rem` (30px)
- `--text-4xl: 2.25rem` (36px)
- `--text-5xl: 3rem` (48px)
- `--text-6xl: 3.75rem` (60px)
- `--text-7xl: 4.5rem` (72px)

### Spacing

- `--spacing-section: 5rem` (80px) - Default section spacing
- `--spacing-section-sm: 3rem` (48px) - Small section spacing
- `--spacing-section-lg: 7rem` (112px) - Large section spacing

### Transitions

- `--transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` - Standard transition
- `--transition-fast: all 0.15s cubic-bezier(0.4, 0, 0.2, 1)` - Quick transition

## Utility Classes

### Glass Effects

```tsx
<div className="glass-effect">...</div> // Basic glass effect
<div className="glass-effect glass-hover">...</div> // With hover effect
```

### Text Glows

```tsx
<h1 className="text-glow-cyan">Glowing Text</h1>
<h1 className="text-glow-purple">Purple Glow</h1>
```

### Font Family

```tsx
<p className="font-geist">Geist font text</p>
```

## Animation Classes

### Scroll-triggered Animations

Add `animate-on-scroll` class to elements that should animate when scrolled into view:

```tsx
<div className="animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.2s_both]">
  This will fade and slide in when scrolled into view
</div>
```

### Available Keyframe Animations

- `fadeSlideIn` - Fade in with upward slide and blur effect
- `float` - Subtle floating animation
- `pulse-glow` - Pulsing opacity for glow effects
- `ticker` - Horizontal scrolling animation

## Best Practices

1. **Always use semantic tokens** instead of direct colors (e.g., `text-foreground` not `text-white`)
2. **Use PageLayout for all pages** to maintain consistent header/footer
3. **Use SectionContainer for all sections** to maintain consistent spacing
4. **Use Typography components** for headings to ensure consistency
5. **Use GlassCard for card-like components** to maintain visual style
6. **Add animate-on-scroll class** to elements that should reveal on scroll
7. **Use showGrid={true}** on sections for visual interest
8. **Prefer background="gradient"** for alternating section backgrounds
9. **Use maxWidth="narrow"** for text-heavy content sections
10. **Always test dark mode** as this is the primary theme

## Examples

### Basic Page Structure

```tsx
import { PageLayout, SectionContainer } from "@/components/layout";
import { Heading1, Heading2, Body } from "@/components/ui/typography";
import { GlassCard } from "@/components/ui/glass-card";

export default function ExamplePage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <SectionContainer 
        background="gradient" 
        padding="large"
        showGrid={true}
      >
        <Heading1 className="mb-6">Page Title</Heading1>
        <Body>Page description...</Body>
      </SectionContainer>

      {/* Content Section */}
      <SectionContainer id="content" showGrid={true}>
        <Heading2 className="mb-8">Section Title</Heading2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <GlassCard key={i} hover interactive className="p-6">
              <h3 className="text-xl font-medium mb-2">Card {i}</h3>
              <Body>Card content...</Body>
            </GlassCard>
          ))}
        </div>
      </SectionContainer>
    </PageLayout>
  );
}
```

### Page with Hero

```tsx
import { PageLayout, SectionContainer } from "@/components/layout";
import { HeroSection } from "@/components/HeroSection";

export default function HomePage() {
  return (
    <PageLayout
      hero={<HeroSection />}
      showParticles={true}
      showFullHeightHero={true}
    >
      <SectionContainer showGrid={true}>
        {/* Page content */}
      </SectionContainer>
    </PageLayout>
  );
}
```
