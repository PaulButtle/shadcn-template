/**
 * Landing Page
 * 
 * The main entry point of the marketing site.
 * Combines all landing page sections in order.
 * 
 * @component
 */

import { Hero, Features, Pricing, Testimonials, FAQ, CTA } from "@/components/landing";

/**
 * Home page component for the marketing site
 * Renders all landing page sections in sequence
 */
export default function HomePage() {
  return (
    <>
      {/* Hero section with main value proposition */}
      <Hero />
      
      {/* Features grid showcasing product benefits */}
      <Features />
      
      {/* Pricing comparison table */}
      <Pricing />
      
      {/* Customer testimonials */}
      <Testimonials />
      
      {/* FAQ accordion */}
      <FAQ />
      
      {/* Final call-to-action with newsletter */}
      <CTA />
    </>
  );
}

