/**
 * User Schemas
 *
 * Zod validation schemas for user-related data.
 * These schemas ensure type-safe validation for user profiles
 * and settings forms.
 *
 * @module schemas/user
 *
 * @example
 * ```ts
 * import { profileSettingsSchema } from "@/schemas/user";
 *
 * const result = profileSettingsSchema.safeParse({
 *   name: "John Doe",
 *   email: "john@example.com"
 * });
 * ```
 */

import { z } from "zod";

// ============================================================================
// User Schema
// ============================================================================

/**
 * Schema for validating user data
 *
 * Validates the complete user object structure
 */
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(1),
  avatarUrl: z.string().url().optional(),
  role: z.enum(["admin", "user", "viewer"]),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

/** Type inference from the user schema */
export type UserData = z.infer<typeof userSchema>;

// ============================================================================
// Profile Settings Schema
// ============================================================================

/**
 * Schema for profile settings form validation
 *
 * Validates:
 * - Name: Required, 2-100 characters
 * - Email: Required, valid email format
 * - Bio: Optional, max 500 characters
 * - AvatarUrl: Optional, valid URL
 */
export const profileSettingsSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  bio: z
    .string()
    .max(500, "Bio must be less than 500 characters")
    .optional(),
  avatarUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
});

/** Type inference from the profile settings schema */
export type ProfileSettingsData = z.infer<typeof profileSettingsSchema>;

// ============================================================================
// Notification Settings Schema
// ============================================================================

/**
 * Schema for notification settings form validation
 *
 * All fields are boolean toggles for notification preferences
 */
export const notificationSettingsSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  marketingEmails: z.boolean(),
  securityAlerts: z.boolean(),
  weeklyDigest: z.boolean(),
});

/** Type inference from the notification settings schema */
export type NotificationSettingsData = z.infer<typeof notificationSettingsSchema>;

// ============================================================================
// Appearance Settings Schema
// ============================================================================

/**
 * Schema for appearance settings form validation
 *
 * Validates:
 * - Theme: light, dark, or system
 * - FontSize: sm, md, or lg
 * - ReducedMotion: boolean for accessibility
 */
export const appearanceSettingsSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  fontSize: z.enum(["sm", "md", "lg"]),
  reducedMotion: z.boolean(),
});

/** Type inference from the appearance settings schema */
export type AppearanceSettingsData = z.infer<typeof appearanceSettingsSchema>;

