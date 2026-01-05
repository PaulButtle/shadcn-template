"use client";

/**
 * Dashboard Header Component
 * 
 * Top header bar for the dashboard with:
 * - Search input
 * - Notifications dropdown
 * - Theme toggle
 * - User menu
 * - Breadcrumbs
 * 
 * @component
 * @example
 * ```tsx
 * <DashboardHeader />
 * ```
 */

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/shared";
import { NotificationDropdown } from "./notification-dropdown";
import { UserMenu } from "./user-menu";
import { MobileSidebar } from "./mobile-sidebar";

// ============================================================================
// Types
// ============================================================================

/** Breadcrumb item */
interface BreadcrumbItem {
  label: string;
  href?: string;
}

// ============================================================================
// Helpers
// ============================================================================

/**
 * Generates breadcrumb items from pathname
 * @param pathname - Current route pathname
 * @returns Array of breadcrumb items
 */
function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Home", href: "/dashboard" },
  ];

  let currentPath = "";
  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    breadcrumbs.push({
      label,
      href: currentPath,
    });
  });

  return breadcrumbs;
}

// ============================================================================
// Component
// ============================================================================

/**
 * Dashboard header with search, notifications, and user menu
 */
export function DashboardHeader() {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * Handles search form submission
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Search:", searchQuery);
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 lg:px-6">
      {/* Mobile Menu Trigger */}
      <MobileSidebar />

      {/* Breadcrumbs - Hidden on mobile */}
      <nav className="hidden md:flex items-center gap-2 text-sm" aria-label="Breadcrumb">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <div key={crumb.label} className="flex items-center gap-2">
              {index > 0 && (
                <span className="text-muted-foreground">/</span>
              )}
              {isLast || !crumb.href ? (
                <span className={cn(
                  isLast ? "font-medium text-foreground" : "text-muted-foreground"
                )}>
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search - Hidden on mobile */}
      <form onSubmit={handleSearch} className="hidden lg:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 pl-10 bg-muted/50"
          />
        </div>
      </form>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Mobile Search */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="h-auto">
            <SheetHeader>
              <SheetTitle>Search</SheetTitle>
            </SheetHeader>
            <form onSubmit={handleSearch} className="mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10"
                  autoFocus
                />
              </div>
            </form>
          </SheetContent>
        </Sheet>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <NotificationDropdown />

        {/* User Menu */}
        <UserMenu />
      </div>
    </header>
  );
}

