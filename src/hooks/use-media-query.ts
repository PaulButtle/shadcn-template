"use client";

/**
 * useMediaQuery Hook
 *
 * A hook for responsive design that tracks CSS media query matches.
 * Uses useSyncExternalStore for SSR-safe implementation with proper hydration.
 *
 * @module hooks/use-media-query
 *
 * @example
 * ```tsx
 * // Basic usage
 * const isMobile = useMediaQuery("(max-width: 768px)");
 *
 * // With Tailwind breakpoints
 * const isDesktop = useMediaQuery("(min-width: 1024px)");
 *
 * // Prefer reduced motion
 * const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
 * ```
 */

import { useCallback, useSyncExternalStore } from "react";

/**
 * Custom hook that tracks whether a CSS media query matches.
 * Uses useSyncExternalStore for proper SSR hydration and React Compiler compatibility.
 *
 * @param query - CSS media query string
 * @returns Boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  // Subscribe to media query changes
  const subscribe = useCallback(
    (callback: () => void) => {
      // Check if we're in the browser
      if (typeof window === "undefined") {
        return () => {};
      }

      const mediaQuery = window.matchMedia(query);

      // Add listener using modern API with fallback
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", callback);
      } else {
        // Fallback for older browsers
        mediaQuery.addListener(callback);
      }

      // Cleanup
      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener("change", callback);
        } else {
          mediaQuery.removeListener(callback);
        }
      };
    },
    [query]
  );

  // Get current snapshot (client-side)
  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.matchMedia(query).matches;
  }, [query]);

  // Get server snapshot (always false to prevent hydration mismatch)
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Predefined media query hooks for common Tailwind breakpoints
 */

/** Returns true when viewport is smaller than 640px (mobile) */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 639px)");
}

/** Returns true when viewport is 640px or larger (sm breakpoint) */
export function useIsSmall(): boolean {
  return useMediaQuery("(min-width: 640px)");
}

/** Returns true when viewport is 768px or larger (md breakpoint) */
export function useIsMedium(): boolean {
  return useMediaQuery("(min-width: 768px)");
}

/** Returns true when viewport is 1024px or larger (lg breakpoint) */
export function useIsLarge(): boolean {
  return useMediaQuery("(min-width: 1024px)");
}

/** Returns true when viewport is 1280px or larger (xl breakpoint) */
export function useIsExtraLarge(): boolean {
  return useMediaQuery("(min-width: 1280px)");
}

/** Returns true if user prefers reduced motion */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** Returns true if user prefers dark colour scheme */
export function usePrefersDarkMode(): boolean {
  return useMediaQuery("(prefers-color-scheme: dark)");
}

export default useMediaQuery;
