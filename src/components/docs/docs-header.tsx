"use client";

/**
 * Documentation Header Component
 *
 * Header navigation for the documentation section.
 * Includes logo, search, and navigation links.
 *
 * @component
 */

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo, ThemeToggle } from "@/components/shared";
import { DocsSidebar } from "./docs-sidebar";
import { cn } from "@/lib/utils";

/**
 * Documentation header with navigation and search
 */
export function DocsHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left: Logo and Navigation */}
        <div className="flex items-center gap-6">
          <Logo href="/" size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/docs"
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                "text-foreground hover:bg-muted"
              )}
            >
              Docs
            </Link>
            <Link
              href="/docs/components"
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              Components
            </Link>
            <Link
              href="/docs/hooks"
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              Hooks
            </Link>
          </nav>
        </div>

        {/* Right: Search and Actions */}
        <div className="flex items-center gap-2">
          {/* Search - Desktop */}
          <div className="hidden lg:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search documentation..."
                className="w-64 pl-10 bg-muted/50"
              />
              <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>

          {/* GitHub Link */}
          <Button variant="ghost" size="icon" asChild>
            <Link
              href="https://github.com/acme/shadcn-template"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Back to Site */}
          <Button variant="outline" size="sm" className="hidden md:flex" asChild>
            <Link href="/">
              Back to Site
              <ExternalLink className="ml-2 h-3 w-3" />
            </Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Documentation</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                {/* Mobile Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-10"
                  />
                </div>
                <DocsSidebar />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

