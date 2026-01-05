"use client";

/**
 * Chart Card Component
 * 
 * A wrapper card for Recharts visualisations with:
 * - Title and description
 * - Loading state
 * - Responsive container
 * 
 * Memoised with React.memo for performance optimisation as this is a
 * presentation component that wraps chart children.
 * 
 * @component
 * @example
 * ```tsx
 * <ChartCard title="Revenue" description="Monthly revenue data">
 *   <AreaChart data={data}>...</AreaChart>
 * </ChartCard>
 * ```
 */

import { memo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/** Props for the ChartCard component */
interface ChartCardProps {
  /** Card title */
  title: string;
  /** Optional description */
  description?: string;
  /** Chart content */
  children: React.ReactNode;
  /** Whether data is loading */
  isLoading?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Card wrapper for chart visualisations
 * Memoised to prevent unnecessary re-renders when parent updates
 * @param props - Card configuration and chart children
 */
export const ChartCard = memo(function ChartCard({
  title,
  description,
  children,
  isLoading = false,
  className,
}: ChartCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <ChartSkeleton />
        ) : (
          <div className="h-[300px] w-full">{children}</div>
        )}
      </CardContent>
    </Card>
  );
});

// Display name for React DevTools
ChartCard.displayName = "ChartCard";

/**
 * Loading skeleton for charts
 */
function ChartSkeleton() {
  return (
    <div className="h-[300px] w-full space-y-4">
      <div className="flex gap-4">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-[250px] w-full" />
    </div>
  );
}

