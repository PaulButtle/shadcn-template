/**
 * Auth Layout
 * 
 * Layout wrapper for authentication pages (login, register, forgot password).
 * Features a split layout with a decorative side panel.
 * 
 * @component
 */

import Link from "next/link";
import { Logo, ThemeToggle } from "@/components/shared";
import { cn } from "@/lib/utils";

/** Props for the auth layout */
interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * Authentication pages layout with decorative side panel
 * @param props - Layout props containing child components
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Decorative Side Panel - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-muted">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        
        {/* Gradient Orbs */}
        <div className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-primary/15 to-transparent blur-3xl" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Logo href="/" size="lg" />
          
          <div className="max-w-md">
            <blockquote className="space-y-4">
              <p className="text-2xl font-medium leading-relaxed text-foreground">
                &ldquo;This template has transformed the way we build applications. 
                The developer experience is incredible.&rdquo;
              </p>
              <footer className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full bg-cover bg-center border-2 border-primary/20"
                  style={{
                    backgroundImage: "url(https://api.dicebear.com/7.x/avataaars/svg?seed=testimonial)",
                  }}
                />
                <div>
                  <p className="font-semibold text-foreground">Sarah Mitchell</p>
                  <p className="text-sm text-muted-foreground">CTO at TechStart UK</p>
                </div>
              </footer>
            </blockquote>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © 2024 Acme. All rights reserved.
          </p>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-6">
          <div className="lg:hidden">
            <Logo href="/" size="sm" />
          </div>
          <div className="ml-auto flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/"
              className={cn(
                "text-sm font-medium text-muted-foreground",
                "hover:text-foreground transition-colors"
              )}
            >
              Back to home
            </Link>
          </div>
        </header>
        
        {/* Form Container - target for skip link */}
        <main id="main-content" className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

