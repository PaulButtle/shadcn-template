"use client";

/**
 * Dashboard Home Page
 * 
 * The main dashboard view with:
 * - Statistics cards
 * - Revenue chart
 * - Recent activity
 * 
 * Uses lazy-loaded chart components for better initial bundle size
 * and page load performance.
 * 
 * @component
 */

import { Suspense } from "react";
import { StatCard } from "@/components/dashboard/stat-card";
import { ChartCard } from "@/components/dashboard/chart-card";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import {
  LazyAreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  ChartLoadingSkeleton,
} from "@/components/dashboard/lazy-charts";
import { MOCK_STATS, MOCK_REVENUE_DATA } from "@/lib/mock-data";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

/**
 * Chart configuration for revenue visualisation
 */
const chartConfig = {
  value: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  secondaryValue: {
    label: "Expenses",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

/**
 * Dashboard home page component
 */
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your performance.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MOCK_STATS.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            trend={stat.trend}
            trendDirection={stat.trendDirection}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Charts and Activity Grid */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Revenue Chart - Takes up more space */}
        <ChartCard
          title="Revenue Overview"
          description="Monthly revenue and expenses for the current year"
          className="lg:col-span-4"
        >
          {/* Lazy-loaded chart with Suspense fallback for better performance */}
          <Suspense fallback={<ChartLoadingSkeleton />}>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <LazyAreaChart
                data={MOCK_REVENUE_DATA}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
              <defs>
                <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                tickFormatter={(value) => `£${value}`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => `£${Number(value).toLocaleString()}`}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--chart-1)"
                strokeWidth={2}
                fill="url(#fillRevenue)"
                name="Revenue"
              />
              <Area
                type="monotone"
                dataKey="secondaryValue"
                stroke="var(--chart-2)"
                strokeWidth={2}
                fill="url(#fillExpenses)"
                name="Expenses"
              />
            </LazyAreaChart>
          </ChartContainer>
          </Suspense>
        </ChartCard>

        {/* Recent Activity */}
        <RecentActivity className="lg:col-span-3" limit={5} />
      </div>
    </div>
  );
}

