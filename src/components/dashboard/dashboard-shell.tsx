"use client";

/**
 * Dashboard Shell Component
 * 
 * The main layout wrapper for dashboard pages providing:
 * - Collapsible sidebar
 * - Header with breadcrumbs
 * - Main content area
 * 
 * @component
 * @example
 * ```tsx
 * <DashboardShell>
 *   <DashboardContent />
 * </DashboardShell>
 * ```
 */

import { useCallback, useSyncExternalStore } from "react";
import { Sidebar } from "./sidebar";
import { DashboardHeader } from "./header";
import { ProtectedRoute } from "@/components/auth";

/** Props for the DashboardShell component */
interface DashboardShellProps {
  children: React.ReactNode;
}

/** Local storage key for sidebar state */
const SIDEBAR_STATE_KEY = "dashboard_sidebar_collapsed";

/**
 * Custom hook to read sidebar collapsed state from localStorage
 * Uses useSyncExternalStore for proper SSR hydration
 */
function useSidebarState(): [boolean, (collapsed: boolean) => void] {
  // Subscribe to localStorage changes (for cross-tab sync)
  const subscribe = useCallback((callback: () => void) => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === SIDEBAR_STATE_KEY) {
        callback();
      }
    };
    
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Get current snapshot from localStorage
  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") {
      return false;
    }
    const stored = localStorage.getItem(SIDEBAR_STATE_KEY);
    return stored === "true";
  }, []);

  // Server snapshot (always false)
  const getServerSnapshot = useCallback(() => false, []);

  // Get current state using useSyncExternalStore
  const isCollapsed = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  // Setter function to update localStorage and trigger re-render
  const setIsCollapsed = useCallback((collapsed: boolean) => {
    localStorage.setItem(SIDEBAR_STATE_KEY, String(collapsed));
    // Dispatch a storage event to trigger useSyncExternalStore update
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: SIDEBAR_STATE_KEY,
        newValue: String(collapsed),
      })
    );
  }, []);

  return [isCollapsed, setIsCollapsed];
}

/**
 * Hook to safely track mounted state using useSyncExternalStore
 * This avoids the React Compiler warning about setState in useEffect
 */
function useMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

/**
 * Dashboard shell providing the main layout structure
 * @param props - Shell configuration with children
 */
export function DashboardShell({ children }: DashboardShellProps) {
  // Track sidebar collapsed state with localStorage persistence
  const [isCollapsed, setIsCollapsed] = useSidebarState();
  
  // Track mounted state to prevent hydration mismatch
  const isHydrated = useMounted();

  /**
   * Toggle sidebar collapsed state
   */
  const handleToggle = useCallback(() => {
    setIsCollapsed(!isCollapsed);
  }, [isCollapsed, setIsCollapsed]);

  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Sidebar - Hidden on mobile, shown on larger screens */}
        {/* Only render after hydration to prevent mismatch */}
        <div className="hidden lg:block">
          {isHydrated && (
            <Sidebar isCollapsed={isCollapsed} onToggle={handleToggle} />
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <DashboardHeader />

          {/* Page Content - target for skip link */}
          <main id="main-content" className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-4 lg:p-6 space-y-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
