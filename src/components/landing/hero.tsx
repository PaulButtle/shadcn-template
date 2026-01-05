"use client";

/**
 * Hero Section Component
 * 
 * The main hero section of the landing page featuring:
 * - Animated gradient background
 * - Bold headline and tagline
 * - Dual CTA buttons
 * - Floating decorative elements
 * 
 * @component
 * @example
 * ```tsx
 * <Hero />
 * ```
 */

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/shared";
import { cn } from "@/lib/utils";

/**
 * Main hero section for the landing page
 * Features an animated background with floating geometric shapes
 */
export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <HeroBackground />

      {/* Content Container */}
      <Container className="relative z-10 pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Announcement Badge */}
          <Badge
            variant="secondary"
            className={cn(
              "mb-6 px-4 py-1.5 text-sm font-medium",
              "bg-primary/10 text-primary border border-primary/20",
              "hover:bg-primary/15 transition-colors cursor-pointer"
            )}
          >
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            Introducing v2.0 with AI features
            <ArrowRight className="ml-2 h-3.5 w-3.5" />
          </Badge>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="block text-foreground">Build faster,</span>
            <span className="block mt-2">
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                ship smarter
              </span>
            </span>
          </h1>

          {/* Tagline */}
          <p className="mt-6 md:mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            The modern platform for building exceptional digital experiences. 
            Create stunning websites, powerful apps, and scalable solutions 
            with our comprehensive template.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Button size="lg" className="h-12 px-8 text-base font-medium" asChild>
              <Link href="/register">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base font-medium"
              asChild
            >
              <Link href="#demo">
                <Play className="mr-2 h-4 w-4 fill-current" />
                Watch Demo
              </Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div className="mt-12 md:mt-16 flex flex-col items-center gap-4">
            <div className="flex -space-x-3">
              {/* Avatar stack using Next.js Image for optimisation */}
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "relative w-10 h-10 rounded-full border-2 border-background overflow-hidden",
                    "bg-gradient-to-br from-primary/20 to-primary/40"
                  )}
                >
                  <Image
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`}
                    alt={`User ${i} avatar`}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-background bg-primary flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">
                  +2k
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">2,500+</span> developers 
              already building with us
            </p>
          </div>
        </div>

        {/* Hero Image/Screenshot placeholder */}
        <div className="mt-16 lg:mt-24 relative">
          <div className={cn(
            "relative mx-auto max-w-5xl rounded-xl overflow-hidden",
            "border border-border/50 bg-card/50 backdrop-blur-sm",
            "shadow-2xl shadow-primary/5"
          )}>
            {/* Browser chrome mockup */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 bg-background/50 rounded-md text-xs text-muted-foreground">
                  dashboard.acme.com
                </div>
              </div>
            </div>
            
            {/* Dashboard preview mockup */}
            <div className="aspect-[16/9] bg-gradient-to-br from-background via-muted/30 to-muted/50 p-6 md:p-8">
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-24 rounded-lg bg-card border border-border/50 animate-pulse"
                  />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 h-64 rounded-lg bg-card border border-border/50 animate-pulse" />
                <div className="h-64 rounded-lg bg-card border border-border/50 animate-pulse" />
              </div>
            </div>
          </div>
          
          {/* Decorative gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </div>
      </Container>
    </section>
  );
}

/**
 * Animated background with floating shapes and gradients
 * Uses CSS animations for performance
 */
function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      {/* Radial gradient orbs */}
      <div
        className={cn(
          "absolute -top-1/2 -left-1/4 w-[800px] h-[800px] rounded-full",
          "bg-gradient-to-br from-primary/20 to-transparent blur-3xl",
          "animate-pulse"
        )}
        style={{ animationDuration: "4s" }}
      />
      <div
        className={cn(
          "absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full",
          "bg-gradient-to-bl from-primary/15 to-transparent blur-3xl",
          "animate-pulse"
        )}
        style={{ animationDuration: "5s", animationDelay: "1s" }}
      />
      
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
      
      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64">
        <div
          className={cn(
            "absolute w-2 h-2 rounded-full bg-primary/40",
            "animate-bounce"
          )}
          style={{ animationDuration: "3s" }}
        />
      </div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64">
        <div
          className={cn(
            "absolute w-3 h-3 rounded-full bg-primary/30",
            "animate-bounce"
          )}
          style={{ animationDuration: "4s", animationDelay: "0.5s" }}
        />
      </div>
      <div className="absolute bottom-1/3 left-1/3 w-64 h-64">
        <div
          className={cn(
            "absolute w-2 h-2 rounded-full bg-primary/35",
            "animate-bounce"
          )}
          style={{ animationDuration: "3.5s", animationDelay: "1s" }}
        />
      </div>
    </div>
  );
}

