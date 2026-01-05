"use client";

/**
 * Protected Route Component
 * 
 * A wrapper component that restricts access to authenticated users only.
 * Redirects unauthenticated users to the login page.
 * 
 * @component
 * @example
 * ```tsx
 * <ProtectedRoute>
 *   <DashboardContent />
 * </ProtectedRoute>
 * ```
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/stores/auth-context";
import { PageLoader } from "@/components/shared";

/** Props for the ProtectedRoute component */
interface ProtectedRouteProps {
  /** Child components to render when authenticated */
  children: React.ReactNode;
  /** URL to redirect to when not authenticated (default: /login) */
  redirectTo?: string;
}

/**
 * Protects routes by requiring authentication
 * Shows loading state while checking auth, redirects if not authenticated
 * 
 * @param props - Component props
 */
export function ProtectedRoute({
  children,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect after initial auth check is complete
    if (!isLoading && !isAuthenticated) {
      // Store intended destination for redirect after login
      const currentPath = window.location.pathname;
      const redirectUrl = currentPath !== "/" ? `?redirect=${currentPath}` : "";
      router.push(`${redirectTo}${redirectUrl}`);
    }
  }, [isAuthenticated, isLoading, redirectTo, router]);

  // Show loading state while checking authentication or redirecting
  // This prevents flash of content before redirect completes
  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PageLoader />
      </div>
    );
  }

  // Render protected content when authenticated
  return <>{children}</>;
}

