/**
 * Marketing Layout
 * 
 * Layout wrapper for all marketing/public pages.
 * Includes the navbar and footer components.
 * 
 * @component
 */

import { Navbar, Footer } from "@/components/landing";

/** Props for the marketing layout */
interface MarketingLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout for marketing pages (landing, about, pricing, etc.)
 * @param props - Layout props containing child components
 */
export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Fixed navigation bar */}
      <Navbar />
      
      {/* Main content area - target for skip link */}
      <main id="main-content" className="flex-1">
        {children}
      </main>
      
      {/* Site footer */}
      <Footer />
    </div>
  );
}

