/**
 * Storage Schemas
 *
 * Zod validation schemas for localStorage data.
 * Provides runtime type safety for data retrieved from storage.
 *
 * @module schemas/storage
 *
 * @example
 * ```ts
 * import { createStorageSchema, userSchema } from "@/schemas";
 *
 * // Create a schema for validating user data from storage
 * const storedUser = createStorageSchema(userSchema).safeParse(
 *   JSON.parse(localStorage.getItem("user") ?? "null")
 * );
 * ```
 */

import { z, type ZodType } from "zod";

// ============================================================================
// Generic Storage Value Type
// ============================================================================

/**
 * Union type representing any valid JSON value
 */
export type StorageValue = string | number | boolean | null | StorageValue[] | { [key: string]: StorageValue };

// ============================================================================
// Storage Schema Factory
// ============================================================================

/**
 * Creates a schema that wraps another schema for localStorage validation.
 * Handles the case where storage might contain null or invalid JSON.
 *
 * @template T - The expected type of the stored value
 * @param schema - The Zod schema to validate the stored value
 * @returns A new schema that handles null/undefined gracefully
 *
 * @example
 * ```ts
 * const userStorageSchema = createStorageSchema(userSchema);
 *
 * // Returns { success: true, data: User } or { success: false, error: ... }
 * const result = userStorageSchema.safeParse(parsedData);
 * ```
 */
export function createStorageSchema<T>(schema: ZodType<T>) {
  return schema.nullable();
}

// ============================================================================
// Common Storage Schemas
// ============================================================================

/**
 * Schema for theme preference stored in localStorage
 */
export const themeStorageSchema = z.enum(["light", "dark", "system"]).nullable();

/**
 * Schema for sidebar collapsed state
 */
export const sidebarStateSchema = z.boolean().nullable();

/**
 * Schema for authentication token
 */
export const authTokenSchema = z.string().min(1).nullable();

// ============================================================================
// Validation Helpers
// ============================================================================

/**
 * Safely parses JSON from localStorage with schema validation.
 *
 * @template T - The expected type of the stored value
 * @param key - localStorage key to read from
 * @param schema - Zod schema to validate the parsed value
 * @param fallback - Value to return if parsing or validation fails
 * @returns The validated value or fallback
 *
 * @example
 * ```ts
 * const user = safeStorageParse("auth_user", userSchema, null);
 * // Returns validated User object or null
 * ```
 */
export function safeStorageParse<T>(
  key: string,
  schema: ZodType<T>,
  fallback: T
): T {
  // Handle SSR - localStorage not available
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const item = window.localStorage.getItem(key);

    // Key doesn't exist in storage
    if (item === null) {
      return fallback;
    }

    // Parse JSON and validate against schema
    const parsed: unknown = JSON.parse(item);
    const result = schema.safeParse(parsed);

    if (result.success) {
      return result.data;
    }

    // Log validation errors in development
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `Storage validation failed for key "${key}":`,
        result.error.flatten()
      );
    }

    return fallback;
  } catch (error) {
    // JSON parsing failed
    if (process.env.NODE_ENV === "development") {
      console.warn(`Failed to parse storage key "${key}":`, error);
    }
    return fallback;
  }
}

/**
 * Safely stores a value in localStorage after validation.
 *
 * @template T - The type of the value to store
 * @param key - localStorage key to write to
 * @param value - Value to store
 * @param schema - Optional Zod schema to validate before storing
 * @returns true if storage was successful, false otherwise
 *
 * @example
 * ```ts
 * const success = safeStorageSet("auth_user", user, userSchema);
 * ```
 */
export function safeStorageSet<T>(
  key: string,
  value: T,
  schema?: ZodType<T>
): boolean {
  // Handle SSR - localStorage not available
  if (typeof window === "undefined") {
    return false;
  }

  try {
    // Validate against schema if provided
    if (schema) {
      const result = schema.safeParse(value);
      if (!result.success) {
        if (process.env.NODE_ENV === "development") {
          console.warn(
            `Storage validation failed for key "${key}":`,
            result.error.flatten()
          );
        }
        return false;
      }
    }

    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Failed to set storage key "${key}":`, error);
    }
    return false;
  }
}

