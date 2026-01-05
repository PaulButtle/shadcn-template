/**
 * CTA (Call-to-Action) Section Component
 * 
 * A prominent section encouraging users to take action.
 * Features a newsletter signup and main CTA button.
 * 
 * @component
 * @example
 * ```tsx
 * <CTA />
 * ```
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Container } from "@/components/shared";
import { cn } from "@/lib/utils";

/**
 * Call-to-action section with newsletter signup
 * Features animated gradient background
 */
export function CTA() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles newsletter form submission
   * Currently a mock implementation - replace with actual API call
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !email.includes("@")) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setIsSubmitted(true);
    setEmail("");
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-muted/80 to-muted" />
      
      {/* Decorative orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <Container className="relative z-10">
        <div
          className={cn(
            "text-center max-w-3xl mx-auto",
            "bg-card/50 backdrop-blur-sm rounded-2xl",
            "border border-border/50 p-8 md:p-12 lg:p-16",
            "shadow-xl shadow-primary/5"
          )}
        >
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Ready to get{" "}
            <span className="text-primary">started?</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of developers who are already building amazing 
            products with our template. Start your free trial today.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-12 px-8 text-base font-medium" asChild>
              <Link href="/register">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base font-medium"
              asChild
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>

          {/* Divider */}
          <div className="my-10 flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground">or subscribe to updates</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                  disabled={isLoading || isSubmitted}
                  required
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-12 px-6"
                disabled={isLoading || isSubmitted}
              >
                {isLoading ? (
                  <span className="animate-pulse">Subscribing...</span>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Subscribed!
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}

