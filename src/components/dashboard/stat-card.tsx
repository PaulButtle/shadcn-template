/**
 * Stat Card Component
 * 
 * A card displaying a metric with optional trend indicator.
 * Used on dashboard home and analytics pages.
 * 
 * Memoised with React.memo for performance optimisation as this is a
 * pure presentation component that only depends on its props.
 * 
 * @component
 * @example
 * ```tsx
 * <StatCard
 *   title="Total Revenue"
 *   value="£45,231.89"
 *   description="+20.1% from last month"
 *   trend={20.1}
 *   trendDirection="up"
 *   icon="PoundSterling"
 * />
 * ```
 */

import { memo } from "react";
import {
  PoundSterling,
  Users,
  CreditCard,
  Activity,
  TrendingUp,
  TrendingDown,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { StatCard as StatCardType } from "@/types";

/** Map of icon names to Lucide icon components */
const iconMap: Record<string, LucideIcon> = {
  PoundSterling,
  Users,
  CreditCard,
  Activity,
};

/** Props for the StatCard component */
interface StatCardProps extends StatCardType {
  /** Additional CSS classes */
  className?: string;
}

/**
 * Statistics card with icon and trend indicator
 * Memoised to prevent unnecessary re-renders when parent updates
 * @param props - Card data and styling
 */
export const StatCard = memo(function StatCard({
  title,
  value,
  description,
  trend,
  trendDirection,
  icon,
  className,
}: StatCardProps) {
  // Get the icon component from the map
  const Icon = icon ? iconMap[icon] : null;

  // Determine trend styling based on direction
  const isPositive = trendDirection === "up";
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <div className="rounded-full bg-muted p-2">
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        {/* Main Value */}
        <div className="text-2xl font-bold">{value}</div>

        {/* Description with Trend */}
        {(description || trend !== undefined) && (
          <div className="mt-1 flex items-center gap-2 text-xs">
            {trend !== undefined && (
              <span
                className={cn(
                  "flex items-center gap-0.5 font-medium",
                  isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                )}
              >
                <TrendIcon className="h-3 w-3" />
                {trend}%
              </span>
            )}
            {description && (
              <span className="text-muted-foreground">{description}</span>
            )}
          </div>
        )}
      </CardContent>

      {/* Decorative gradient - colour based on trend direction */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 h-1",
          isPositive ? "bg-gradient-to-r from-green-500/20 to-green-500/0" : "bg-gradient-to-r from-red-500/20 to-red-500/0"
        )}
      />
    </Card>
  );
});

// Display name for React DevTools
StatCard.displayName = "StatCard";

