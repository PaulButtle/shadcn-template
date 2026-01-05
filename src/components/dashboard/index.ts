/**
 * Dashboard Components Index
 * 
 * Re-exports all dashboard-related components.
 * 
 * @example
 * ```tsx
 * import { Sidebar, DashboardHeader, StatCard } from "@/components/dashboard";
 * ```
 */

export { Sidebar } from "./sidebar";
export { DashboardHeader } from "./header";
export { DashboardShell } from "./dashboard-shell";
export { NotificationDropdown } from "./notification-dropdown";
export { UserMenu } from "./user-menu";
export { MobileSidebar } from "./mobile-sidebar";
export { StatCard } from "./stat-card";
export { ChartCard } from "./chart-card";
export { RecentActivity } from "./recent-activity";
export { UsersTable } from "./users-table";
export {
  LazyAreaChart,
  LazyBarChart,
  LazyLineChart,
  LazyPieChart,
  ChartLoadingSkeleton,
} from "./lazy-charts";

