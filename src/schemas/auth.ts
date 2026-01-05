/**
 * Authentication Schemas
 *
 * Zod validation schemas for authentication-related forms.
 * These schemas ensure type-safe validation for login, registration,
 * and password recovery flows.
 *
 * @module schemas/auth
 *
 * @example
 * ```ts
 * import { loginSchema } from "@/schemas/auth";
 *
 * const result = loginSchema.safeParse({
 *   email: "user@example.com",
 *   password: "password123",
 *   rememberMe: true
 * });
 *
 * if (result.success) {
 *   // Type-safe access to validated data
 *   console.log(result.data.email);
 * }
 * ```
 */

import { z } from "zod";

// ============================================================================
// Password Requirements Constants
// ============================================================================

/**
 * Minimum password length requirement
 * Used for both login (basic check) and registration (full requirements)
 */
export const MIN_PASSWORD_LENGTH_LOGIN = 6;
export const MIN_PASSWORD_LENGTH_REGISTER = 8;

/**
 * Password requirement patterns for strength checking
 */
export const PASSWORD_PATTERNS = {
  hasUppercase: /[A-Z]/,
  hasLowercase: /[a-z]/,
  hasNumber: /[0-9]/,
  hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
} as const;

// ============================================================================
// Login Schema
// ============================================================================

/**
 * Schema for login form validation
 *
 * Validates:
 * - Email: Required, valid email format
 * - Password: Required, minimum 6 characters
 * - RememberMe: Boolean flag for session persistence
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(MIN_PASSWORD_LENGTH_LOGIN, `Password must be at least ${MIN_PASSWORD_LENGTH_LOGIN} characters`),
  rememberMe: z.boolean(),
});

/** Type inference from the login schema */
export type LoginFormData = z.infer<typeof loginSchema>;

// ============================================================================
// Registration Schema
// ============================================================================

/**
 * Schema for registration form validation
 *
 * Validates:
 * - Name: Required, minimum 2 characters
 * - Email: Required, valid email format
 * - Password: Required, minimum 8 characters
 * - ConfirmPassword: Must match password
 * - AcceptTerms: Must be true
 */
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(MIN_PASSWORD_LENGTH_REGISTER, `Password must be at least ${MIN_PASSWORD_LENGTH_REGISTER} characters`),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/** Type inference from the registration schema */
export type RegisterFormData = z.infer<typeof registerSchema>;

// ============================================================================
// Forgot Password Schema
// ============================================================================

/**
 * Schema for forgot password form validation
 *
 * Validates:
 * - Email: Required, valid email format
 */
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

/** Type inference from the forgot password schema */
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Checks password strength against all requirements
 *
 * @param password - Password to evaluate
 * @returns Object with each requirement check result
 *
 * @example
 * ```ts
 * const strength = checkPasswordStrength("MyP@ssw0rd");
 * // { hasMinLength: true, hasUppercase: true, hasLowercase: true, hasNumber: true, hasSpecialChar: true }
 * ```
 */
export function checkPasswordStrength(password: string): {
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
} {
  return {
    hasMinLength: password.length >= MIN_PASSWORD_LENGTH_REGISTER,
    hasUppercase: PASSWORD_PATTERNS.hasUppercase.test(password),
    hasLowercase: PASSWORD_PATTERNS.hasLowercase.test(password),
    hasNumber: PASSWORD_PATTERNS.hasNumber.test(password),
    hasSpecialChar: PASSWORD_PATTERNS.hasSpecialChar.test(password),
  };
}

/**
 * Calculates password strength score (0-5)
 *
 * @param password - Password to evaluate
 * @returns Score from 0 to 5
 */
export function getPasswordStrengthScore(password: string): number {
  const strength = checkPasswordStrength(password);
  return Object.values(strength).filter(Boolean).length;
}

