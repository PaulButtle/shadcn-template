"use client";

/**
 * Analytics Page
 * 
 * Displays multiple chart types for data analysis:
 * - Bar chart for user growth
 * - Line chart for trends
 * - Pie chart for traffic sources
 * - Area chart for weekly activity
 * 
 * @component
 */

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import { ChartCard } from "@/components/dashboard/chart-card";
import {
  MOCK_USER_GROWTH_DATA,
  MOCK_REVENUE_DATA,
  MOCK_TRAFFIC_DATA,
  MOCK_WEEKLY_ACTIVITY,
} from "@/lib/mock-data";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

/**
 * Chart configurations
 */
const userGrowthConfig = {
  value: {
    label: "Users",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const revenueConfig = {
  value: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  secondaryValue: {
    label: "Expenses",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const trafficConfig = {
  direct: { label: "Direct", color: "var(--chart-1)" },
  organic: { label: "Organic Search", color: "var(--chart-2)" },
  social: { label: "Social Media", color: "var(--chart-3)" },
  referral: { label: "Referral", color: "var(--chart-4)" },
  email: { label: "Email", color: "var(--chart-5)" },
} satisfies ChartConfig;

const activityConfig = {
  value: {
    label: "Sessions",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

/** Pie chart colours */
const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

/**
 * Analytics page component
 */
export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Detailed insights and data visualisations for your business.
        </p>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* User Growth - Bar Chart */}
        <ChartCard
          title="User Growth"
          description="Monthly new user registrations"
        >
          <ChartContainer config={userGrowthConfig} className="h-[300px] w-full">
            <BarChart data={MOCK_USER_GROWTH_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="value"
                fill="var(--chart-1)"
                radius={[4, 4, 0, 0]}
                name="New Users"
              />
            </BarChart>
          </ChartContainer>
        </ChartCard>

        {/* Revenue Trend - Line Chart */}
        <ChartCard
          title="Revenue Trend"
          description="Revenue vs expenses comparison"
        >
          <ChartContainer config={revenueConfig} className="h-[300px] w-full">
            <LineChart data={MOCK_REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={{ r: 4, fill: "var(--chart-1)" }}
                activeDot={{ r: 6 }}
                name="Revenue"
              />
              <Line
                type="monotone"
                dataKey="secondaryValue"
                stroke="var(--chart-2)"
                strokeWidth={2}
                dot={{ r: 4, fill: "var(--chart-2)" }}
                activeDot={{ r: 6 }}
                name="Expenses"
              />
            </LineChart>
          </ChartContainer>
        </ChartCard>

        {/* Traffic Sources - Pie Chart */}
        <ChartCard
          title="Traffic Sources"
          description="Breakdown of website traffic by source"
        >
          <ChartContainer config={trafficConfig} className="h-[300px] w-full">
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => `${Number(value).toLocaleString()} visits`}
                  />
                }
              />
              <Pie
                data={MOCK_TRAFFIC_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {MOCK_TRAFFIC_DATA.map((_, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </ChartCard>

        {/* Weekly Activity - Area Chart */}
        <ChartCard
          title="Weekly Activity"
          description="User sessions by day of week"
        >
          <ChartContainer config={activityConfig} className="h-[300px] w-full">
            <AreaChart data={MOCK_WEEKLY_ACTIVITY} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="fillActivity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
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
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--chart-1)"
                strokeWidth={2}
                fill="url(#fillActivity)"
                name="Sessions"
              />
            </AreaChart>
          </ChartContainer>
        </ChartCard>
      </div>
    </div>
  );
}

