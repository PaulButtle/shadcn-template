"use client";

/**
 * useLocalStorage Hook
 *
 * A type-safe hook for persisting state in localStorage with SSR support.
 * Handles hydration mismatches and provides automatic JSON serialisation.
 * Uses useSyncExternalStore for proper React 18+ compatibility.
 *
 * Now includes optional Zod schema validation for runtime type safety.
 *
 * @module hooks/use-local-storage
 *
 * @example
 * ```tsx
 * // Basic usage
 * const [theme, setTheme] = useLocalStorage("theme", "light");
 *
 * // With Zod schema validation
 * import { userSchema } from "@/schemas";
 * const [user, setUser] = useLocalStorage<User | null>("user", null, userSchema.nullable());
 * ```
 */

import { useCallback, useSyncExternalStore } from "react";
import type { ZodType } from "zod";

/**
 * Helper to safely read from localStorage with optional schema validation.
 * Provides runtime type safety when a Zod schema is provided.
 *
 * @param key - The localStorage key
 * @param fallback - Fallback value if key doesn't exist or on server
 * @param schema - Optional Zod schema for runtime validation
 */
function getStorageValue<T>(key: string, fallback: T, schema?: ZodType<T>): T {
  // Handle SSR - localStorage not available on server
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const item = window.localStorage.getItem(key);

    // Key doesn't exist in storage
    if (item === null) {
      return fallback;
    }

    // Parse the JSON
    const parsed: unknown = JSON.parse(item);

    // If schema provided, validate the parsed data
    if (schema) {
      const result = schema.safeParse(parsed);
      if (result.success) {
        return result.data;
      }

      // Log validation errors in development
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `localStorage validation failed for key "${key}":`,
          result.error.flatten()
        );
      }
      return fallback;
    }

    // No schema - use type assertion (less safe but backwards compatible)
    return parsed as T;
  } catch {
    return fallback;
  }
}

/**
 * Creates a subscribe function for localStorage changes
 * Listens to both storage events (cross-tab) and custom events (same-tab)
 * @param key - The localStorage key to watch
 */
function createSubscribe(key: string) {
  return (callback: () => void) => {
    // Listen for storage events from other tabs
    const handleStorage = (e: StorageEvent) => {
      if (e.key === key) {
        callback();
      }
    };
    
    // Listen for custom events from same tab updates
    const handleCustom = (e: Event) => {
      if ((e as CustomEvent).detail?.key === key) {
        callback();
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("local-storage-update", handleCustom);
    
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("local-storage-update", handleCustom);
    };
  };
}

/**
 * Dispatches a custom event to notify other hooks about localStorage changes
 * @param key - The localStorage key that changed
 */
function dispatchStorageEvent(key: string): void {
  window.dispatchEvent(
    new CustomEvent("local-storage-update", { detail: { key } })
  );
}

/**
 * Custom hook for managing localStorage state with TypeScript support.
 * Uses useSyncExternalStore for proper SSR hydration and React Compiler compatibility.
 *
 * @template T - The type of the stored value
 * @param key - The localStorage key
 * @param initialValue - Default value if key doesn't exist
 * @param schema - Optional Zod schema for runtime validation (recommended for complex types)
 * @returns Tuple of [storedValue, setValue, removeValue]
 *
 * @example
 * ```tsx
 * // Without schema (simple types)
 * const [count, setCount] = useLocalStorage("count", 0);
 *
 * // With schema (complex types - recommended)
 * import { z } from "zod";
 * const userSchema = z.object({ id: z.string(), name: z.string() });
 * const [user, setUser] = useLocalStorage("user", null, userSchema.nullable());
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  schema?: ZodType<T>
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Create subscribe function for this key
  const subscribe = useCallback(
    (callback: () => void) => createSubscribe(key)(callback),
    [key]
  );

  // Create snapshot getter for client with optional schema validation
  const getSnapshot = useCallback(
    () => getStorageValue(key, initialValue, schema),
    [key, initialValue, schema]
  );

  // Create snapshot getter for server (always returns initial value)
  const getServerSnapshot = useCallback(() => initialValue, [initialValue]);

  // Use useSyncExternalStore for SSR-safe localStorage access
  const storedValue = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  /**
   * Wrapped setter that persists to localStorage.
   * Validates data against schema if provided before storing.
   */
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        // Get current value for functional updates
        const currentValue = getStorageValue(key, initialValue, schema);

        // Allow value to be a function (like useState)
        const valueToStore =
          value instanceof Function ? value(currentValue) : value;

        // Validate against schema if provided
        if (schema) {
          const result = schema.safeParse(valueToStore);
          if (!result.success) {
            console.warn(
              `localStorage validation failed when setting key "${key}":`,
              result.error.flatten()
            );
            return; // Don't store invalid data
          }
        }

        // Save to localStorage
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          // Dispatch event to notify other hooks in the same tab
          dispatchStorageEvent(key);
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, initialValue, schema]
  );

  /**
   * Remove the value from localStorage
   */
  const removeValue = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
        // Dispatch event to notify other hooks in the same tab
        dispatchStorageEvent(key);
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key]);

  return [storedValue, setValue, removeValue];
}

export default useLocalStorage;
