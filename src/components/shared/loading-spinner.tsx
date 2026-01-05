/**
 * Loading Spinner Component
 * 
 * A customisable loading spinner with size variants.
 * Uses CSS animations for smooth performance.
 * 
 * @component
 * @example
 * ```tsx
 * <LoadingSpinner />
 * <LoadingSpinner size="lg" />
 * <LoadingSpinner className="text-primary" />
 * ```
 */

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

/** Props for the LoadingSpinner component */
interface LoadingSpinnerProps {
  /** Additional CSS classes */
  className?: string;
  /** Size variant */
  size?: "sm" | "md" | "lg" | "xl";
}

/** Size configurations */
const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
} as const;

/**
 * Animated loading spinner
 * @param props - Spinner configuration
 */
export function LoadingSpinner({ className, size = "md" }: LoadingSpinnerProps) {
  return (
    <Loader2
      className={cn(
        "animate-spin text-muted-foreground",
        sizeClasses[size],
        className
      )}
      aria-label="Loading"
    />
  );
}

/**
 * Full page loading state
 * Centers the spinner in the viewport
 */
export function PageLoader() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center">
      <LoadingSpinner size="lg" className="text-primary" />
    </div>
  );
}

/**
 * Loading overlay for sections
 * Can be used with position relative parent
 */
export function LoadingOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <LoadingSpinner size="lg" className="text-primary" />
    </div>
  );
}

