/**
 * Schemas Index
 *
 * Re-exports all Zod schemas for easy importing.
 * Centralised validation schemas used throughout the application.
 *
 * @module schemas
 *
 * @example
 * ```ts
 * import { loginSchema, registerSchema, userSchema } from "@/schemas";
 *
 * // Validate login data
 * const result = loginSchema.safeParse(data);
 * ```
 */

export {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  type LoginFormData,
  type RegisterFormData,
  type ForgotPasswordFormData,
} from "./auth";

export {
  userSchema,
  profileSettingsSchema,
  notificationSettingsSchema,
  appearanceSettingsSchema,
  type UserData,
  type ProfileSettingsData,
  type NotificationSettingsData,
  type AppearanceSettingsData,
} from "./user";

export {
  createStorageSchema,
  type StorageValue,
} from "./storage";

