/**
 * Environment Configuration
 *
 * Validates and exports environment variables using Zod.
 * Fails fast at build/startup if required variables are missing.
 *
 * @module lib/env
 *
 * @example
 * ```ts
 * import { env } from "@/lib/env";
 *
 * // Type-safe environment access
 * console.log(env.NEXT_PUBLIC_APP_URL);
 * ```
 */

import { z } from "zod";

// ============================================================================
// Schema Definition
// ============================================================================

/**
 * Server-side environment variables schema.
 * These are only available on the server and should never be exposed to the client.
 */
const serverSchema = z.object({
  // Node environment
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  // Database (example - uncomment when needed)
  // DATABASE_URL: z.string().url(),

  // Authentication secrets (example - uncomment when needed)
  // JWT_SECRET: z.string().min(32),
  // NEXTAUTH_SECRET: z.string().min(32),
  // NEXTAUTH_URL: z.string().url(),

  // API keys (example - uncomment when needed)
  // STRIPE_SECRET_KEY: z.string().startsWith("sk_"),
  // SENDGRID_API_KEY: z.string(),
});

/**
 * Client-side environment variables schema.
 * These are exposed to the browser and must be prefixed with NEXT_PUBLIC_.
 */
const clientSchema = z.object({
  // App configuration
  NEXT_PUBLIC_APP_URL: z.string().url().optional().default("http://localhost:3000"),
  NEXT_PUBLIC_APP_NAME: z.string().optional().default("ShadCN Template"),

  // Analytics (example - uncomment when needed)
  // NEXT_PUBLIC_GA_ID: z.string().optional(),
  // NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),

  // Feature flags (example)
  // NEXT_PUBLIC_ENABLE_ANALYTICS: z.coerce.boolean().default(false),
});

/**
 * Combined schema for all environment variables
 */
const envSchema = serverSchema.merge(clientSchema);

// ============================================================================
// Validation
// ============================================================================

/**
 * Type for the validated environment
 */
export type Env = z.infer<typeof envSchema>;

/**
 * Validate environment variables.
 * This function should be called at app startup.
 */
function validateEnv(): Env {
  // Get all environment variables
  const envVars = {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    // Add other env vars here as you uncomment them in the schema
  };

  // Parse and validate
  const parsed = envSchema.safeParse(envVars);

  if (!parsed.success) {
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors
    );

    // In development, show detailed errors
    if (process.env.NODE_ENV !== "production") {
      console.error("\nMissing or invalid environment variables:");
      Object.entries(parsed.error.flatten().fieldErrors).forEach(
        ([key, errors]) => {
          console.error(`  ${key}: ${errors?.join(", ")}`);
        }
      );
      console.error("\nPlease check your .env file.\n");
    }

    throw new Error("Invalid environment variables");
  }

  return parsed.data;
}

// ============================================================================
// Export
// ============================================================================

/**
 * Validated environment variables.
 * Access these instead of process.env directly for type safety.
 */
export const env = validateEnv();

/**
 * Check if we're in production
 */
export const isProduction = env.NODE_ENV === "production";

/**
 * Check if we're in development
 */
export const isDevelopment = env.NODE_ENV === "development";

/**
 * Check if we're in test
 */
export const isTest = env.NODE_ENV === "test";

export default env;

