/**
 * Documentation Card Components
 *
 * Card components for displaying linked documentation sections.
 * Used on index pages to show navigation to child pages.
 *
 * @component
 */

import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

/** Props for the DocCard component */
interface DocCardProps {
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** Link destination */
  href: string;
  /** Optional icon */
  icon?: LucideIcon;
  /** Additional CSS classes */
  className?: string;
}

/** Props for the DocCardGrid component */
interface DocCardGridProps {
  /** Child card components */
  children: React.ReactNode;
  /** Number of columns (default: 2) */
  columns?: 2 | 3;
  /** Additional CSS classes */
  className?: string;
}

// ============================================================================
// Components
// ============================================================================

/**
 * Documentation navigation card
 * @param props - Card configuration
 */
export function DocCard({
  title,
  description,
  href,
  icon: Icon,
  className,
}: DocCardProps) {
  return (
    <Link href={href} className={cn("group block", className)}>
      <Card className="h-full transition-all duration-200 hover:border-primary/50 hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="rounded-lg bg-primary/10 p-2 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Icon className="h-5 w-5" />
              </div>
            )}
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
          <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            Learn more
            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

/**
 * Grid container for documentation cards
 * @param props - Grid configuration
 */
export function DocCardGrid({
  children,
  columns = 2,
  className,
}: DocCardGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        columns === 2 && "md:grid-cols-2",
        columns === 3 && "md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
}

