"use client";

/**
 * Landing Page Navbar Component
 * 
 * A responsive navigation bar with:
 * - Logo and navigation links
 * - Mobile drawer menu using Sheet component
 * - Theme toggle (dark/light mode)
 * - CTA buttons for login and sign up
 * 
 * @component
 * @example
 * ```tsx
 * <Navbar />
 * ```
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Logo, ThemeToggle } from "@/components/shared";
import { MARKETING_NAV_ITEMS } from "@/lib/constants";

/**
 * Main navigation bar for the marketing/landing pages
 * Features a sticky header that becomes solid on scroll
 */
export function Navbar() {
  // Track scroll position to add background on scroll
  const [isScrolled, setIsScrolled] = useState(false);
  // Track mobile menu open state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Add scroll listener to detect when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Logo href="/" size="md" />
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {MARKETING_NAV_ITEMS.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium text-muted-foreground",
                  "hover:text-foreground transition-colors rounded-md",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Desktop Actions - Theme toggle and auth buttons */}
          <div className="hidden md:flex md:items-center md:gap-3">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu - Hamburger and Sheet */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80">
                <SheetHeader className="text-left">
                  <SheetTitle>
                    <Logo size="sm" />
                  </SheetTitle>
                </SheetHeader>
                
                {/* Mobile Navigation Links */}
                <nav className="mt-8 flex flex-col gap-1">
                  {MARKETING_NAV_ITEMS.map((item) => (
                    <SheetClose asChild key={item.title}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center px-4 py-3 text-base font-medium",
                          "text-muted-foreground hover:text-foreground",
                          "hover:bg-accent rounded-lg transition-colors"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                {/* Mobile Auth Buttons */}
                <div className="mt-8 flex flex-col gap-3 px-4">
                  <SheetClose asChild>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/login">Sign In</Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button className="w-full" asChild>
                      <Link href="/register">Get Started</Link>
                    </Button>
                  </SheetClose>
                </div>

                {/* Mobile Footer Note */}
                <p className="mt-8 px-4 text-xs text-muted-foreground">
                  © 2024 Acme. All rights reserved.
                </p>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}

