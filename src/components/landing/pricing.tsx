/**
 * Pricing Section Component
 * 
 * Displays pricing tiers in a responsive grid.
 * Features a highlighted "popular" tier with badge.
 * 
 * @component
 * @example
 * ```tsx
 * <Pricing />
 * ```
 */

import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/shared";
import { PRICING_TIERS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Pricing section with three-tier comparison
 * Middle tier is highlighted as "most popular"
 */
export function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-32">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Simple, transparent{" "}
            <span className="text-primary">pricing</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that works best for you. All plans include a 14-day 
            free trial with no credit card required.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6 max-w-6xl mx-auto">
          {PRICING_TIERS.map((tier) => (
            <PricingCard key={tier.name} tier={tier} />
          ))}
        </div>

        {/* Enterprise Note */}
        <p className="mt-12 text-center text-sm text-muted-foreground">
          Need a custom plan?{" "}
          <Link href="/contact" className="text-primary hover:underline">
            Contact our sales team
          </Link>{" "}
          for enterprise pricing.
        </p>
      </Container>
    </section>
  );
}

/** Props for the PricingCard component */
interface PricingCardProps {
  tier: {
    name: string;
    price: number;
    frequency: string;
    description: string;
    features: string[];
    isPopular?: boolean;
    buttonText: string;
    buttonHref: string;
  };
}

/**
 * Individual pricing tier card
 * @param props - Tier details and styling
 */
function PricingCard({ tier }: PricingCardProps) {
  const { name, price, frequency, description, features, isPopular, buttonText, buttonHref } = tier;

  return (
    <Card
      className={cn(
        "relative flex flex-col",
        "border-border/50 bg-card/50 backdrop-blur-sm",
        "transition-all duration-300",
        isPopular
          ? "border-primary shadow-lg shadow-primary/10 scale-[1.02] md:scale-105"
          : "hover:border-primary/30 hover:shadow-md"
      )}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground px-4 py-1">
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader className="pt-8 pb-4">
        {/* Tier Name */}
        <h3 className="text-xl font-semibold text-foreground">{name}</h3>
        
        {/* Price */}
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-4xl lg:text-5xl font-bold text-foreground">
            {price === 0 ? "Free" : `£${price}`}
          </span>
          {price > 0 && (
            <span className="text-muted-foreground">/{frequency}</span>
          )}
        </div>
        
        {/* Description */}
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </CardHeader>

      <CardContent className="flex-1">
        {/* Features List */}
        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <div
                className={cn(
                  "mt-0.5 flex-shrink-0 w-5 h-5 rounded-full",
                  "flex items-center justify-center",
                  isPopular ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                )}
              >
                <Check className="w-3 h-3" />
              </div>
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="pt-4 pb-8">
        <Button
          className="w-full"
          variant={isPopular ? "default" : "outline"}
          size="lg"
          asChild
        >
          <Link href={buttonHref}>{buttonText}</Link>
        </Button>
      </CardFooter>

      {/* Decorative gradient for popular tier */}
      {isPopular && (
        <div
          className={cn(
            "absolute inset-0 -z-10 rounded-xl",
            "bg-gradient-to-b from-primary/10 via-transparent to-transparent",
            "pointer-events-none"
          )}
        />
      )}
    </Card>
  );
}

