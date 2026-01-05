/**
 * Testimonials Section Component
 * 
 * Displays customer testimonials in a responsive grid.
 * Each testimonial includes avatar, name, role, company, and quote.
 * 
 * @component
 * @example
 * ```tsx
 * <Testimonials />
 * ```
 */

import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Container } from "@/components/shared";
import { TESTIMONIALS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Testimonials section showcasing customer feedback
 * Uses a responsive 2-column grid layout
 */
export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-muted/30">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Loved by{" "}
            <span className="text-primary">developers</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Don&apos;t just take our word for it. Here&apos;s what our customers 
            have to say about their experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

/** Props for the TestimonialCard component */
interface TestimonialCardProps {
  /** Testimonial data to display */
  testimonial: {
    id: string;
    name: string;
    role: string;
    company: string;
    content: string;
    avatarUrl?: string;
    rating?: number;
  };
}

/**
 * Individual testimonial card with quote and author info
 * @param props - Testimonial data
 */
function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { name, role, company, content, avatarUrl, rating } = testimonial;

  // Get initials for avatar fallback
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card
      className={cn(
        "group relative overflow-hidden",
        "border-border/50 bg-card/50 backdrop-blur-sm",
        "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
        "transition-all duration-300"
      )}
    >
      <CardContent className="p-6 lg:p-8">
        {/* Quote Icon */}
        <div className="mb-4">
          <Quote
            className={cn(
              "w-8 h-8 text-primary/30",
              "group-hover:text-primary/50 transition-colors"
            )}
          />
        </div>

        {/* Star Rating */}
        {rating && (
          <div className="flex gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-4 h-4",
                  i < rating
                    ? "fill-yellow-500 text-yellow-500"
                    : "fill-muted text-muted"
                )}
              />
            ))}
          </div>
        )}

        {/* Quote Content */}
        <blockquote className="text-foreground leading-relaxed">
          &ldquo;{content}&rdquo;
        </blockquote>

        {/* Author Info */}
        <div className="mt-6 flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-border">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">
              {role} at {company}
            </p>
          </div>
        </div>

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

