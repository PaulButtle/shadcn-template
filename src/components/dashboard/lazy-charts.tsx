"use client";

/**
 * Lazy-Loaded Chart Components
 *
 * Dynamically imports heavy chart components from Recharts to improve
 * initial bundle size and page load performance.
 *
 * @module components/dashboard/lazy-charts
 *
 * @example
 * ```tsx
 * import { LazyAreaChart, LazyBarChart } from "@/components/dashboard/lazy-charts";
 *
 * <Suspense fallback={<ChartSkeleton />}>
 *   <LazyAreaChart data={data} />
 * </Suspense>
 * ```
 */

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// ============================================================================
// Loading Fallback
// ============================================================================

/**
 * Loading skeleton displayed while charts are being loaded
 */
export function ChartLoadingSkeleton() {
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

// ============================================================================
// Lazy-Loaded Recharts Components
// ============================================================================

/**
 * Lazy-loaded AreaChart from Recharts
 */
export const LazyAreaChart = dynamic(
  () => import("recharts").then((mod) => mod.AreaChart),
  {
    loading: () => <ChartLoadingSkeleton />,
    ssr: false,
  }
);

/**
 * Lazy-loaded BarChart from Recharts
 */
export const LazyBarChart = dynamic(
  () => import("recharts").then((mod) => mod.BarChart),
  {
    loading: () => <ChartLoadingSkeleton />,
    ssr: false,
  }
);

/**
 * Lazy-loaded LineChart from Recharts
 */
export const LazyLineChart = dynamic(
  () => import("recharts").then((mod) => mod.LineChart),
  {
    loading: () => <ChartLoadingSkeleton />,
    ssr: false,
  }
);

/**
 * Lazy-loaded PieChart from Recharts
 */
export const LazyPieChart = dynamic(
  () => import("recharts").then((mod) => mod.PieChart),
  {
    loading: () => <ChartLoadingSkeleton />,
    ssr: false,
  }
);

// ============================================================================
// Re-export commonly used Recharts components
// These are lightweight and don't need lazy loading
// ============================================================================

export {
  Area,
  Bar,
  Line,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

