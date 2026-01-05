/**
 * Dashboard Layout
 * 
 * Layout wrapper for all dashboard pages.
 * Provides the shell with sidebar and header.
 * Includes error boundary for graceful error handling.
 * 
 * @component
 */

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ErrorBoundary } from "@/components/shared";

/** Props for the dashboard layout */
interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout for dashboard pages
 * Wraps all dashboard routes with the DashboardShell and ErrorBoundary.
 * The ErrorBoundary catches any runtime errors in dashboard pages
 * and displays a fallback UI instead of crashing the entire app.
 * @param props - Layout props containing child components
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <DashboardShell>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </DashboardShell>
  );
}

