/**
 * Features Section Component
 * 
 * Displays the key features of the product in a responsive grid.
 * Each feature card includes an icon, title, and description.
 * 
 * @component
 * @example
 * ```tsx
 * <Features />
 * ```
 */

import {
  Zap,
  Palette,
  Smartphone,
  Shield,
  Moon,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/shared";
import { FEATURES } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Map of icon names to Lucide icon components */
const iconMap: Record<string, LucideIcon> = {
  Zap,
  Palette,
  Smartphone,
  Shield,
  Moon,
  Heart,
};

/**
 * Features section showcasing product benefits
 * Uses a 2-column mobile, 3-column desktop grid layout
 */
export function Features() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-muted/30">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Everything you need to{" "}
            <span className="text-primary">build amazing products</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our comprehensive template includes all the essential features and 
            components you need to create stunning web applications.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map((feature, index) => {
            // Get the icon component from the map, fallback to Zap if not found
            const IconComponent = iconMap[feature.icon] ?? Zap;
            
            return (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={IconComponent}
                index={index}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/** Props for the FeatureCard component */
interface FeatureCardProps {
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** Lucide icon component */
  icon: LucideIcon;
  /** Card index for staggered animations */
  index: number;
}

/**
 * Individual feature card with icon and hover effects
 * @param props - Card content and styling
 */
function FeatureCard({ title, description, icon: Icon, index }: FeatureCardProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden border-border/50",
        "bg-card/50 backdrop-blur-sm",
        "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
        "transition-all duration-300"
      )}
      style={{
        // Stagger animation delay based on index
        animationDelay: `${index * 100}ms`,
      }}
    >
      <CardContent className="p-6 lg:p-8">
        {/* Icon Container */}
        <div
          className={cn(
            "inline-flex items-center justify-center",
            "w-12 h-12 rounded-xl",
            "bg-primary/10 text-primary",
            "group-hover:bg-primary group-hover:text-primary-foreground",
            "transition-colors duration-300"
          )}
        >
          <Icon className="w-6 h-6" />
        </div>

        {/* Content */}
        <h3 className="mt-6 text-xl font-semibold text-foreground">
          {title}
        </h3>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Decorative gradient on hover */}
        <div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100",
            "bg-gradient-to-br from-primary/5 via-transparent to-transparent",
            "transition-opacity duration-300 pointer-events-none"
          )}
        />
      </CardContent>
    </Card>
  );
}

