/**
 * Type Definitions
 * 
 * Central location for all TypeScript type definitions used throughout the application.
 * Organised by domain for easy navigation and maintenance.
 */

// ============================================================================
// User & Authentication Types
// ============================================================================

/**
 * Represents a user in the system
 */
export interface User {
  /** Unique identifier for the user */
  id: string;
  /** User's email address */
  email: string;
  /** User's full name */
  name: string;
  /** URL to user's avatar image */
  avatarUrl?: string;
  /** User's role in the system */
  role: UserRole;
  /** Timestamp of user creation */
  createdAt: Date;
  /** Timestamp of last update */
  updatedAt: Date;
}

/**
 * Available user roles
 */
export type UserRole = "admin" | "user" | "viewer";

/**
 * Login credentials for authentication
 */
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Registration data for new users
 */
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/**
 * Authentication state
 */
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ============================================================================
// Navigation Types
// ============================================================================

/**
 * Navigation item for sidebar and menus
 */
export interface NavItem {
  /** Display title */
  title: string;
  /** Route path */
  href: string;
  /** Icon name from Lucide icons */
  icon?: string;
  /** Whether this is the active route */
  isActive?: boolean;
  /** Nested navigation items */
  items?: NavItem[];
  /** Badge text to display */
  badge?: string;
  /** Whether the item is disabled */
  disabled?: boolean;
}

// ============================================================================
// Dashboard Types
// ============================================================================

/**
 * Statistics card data
 */
export interface StatCard {
  /** Card title */
  title: string;
  /** Main value to display */
  value: string | number;
  /** Description or subtitle */
  description?: string;
  /** Trend percentage (positive or negative) */
  trend?: number;
  /** Trend direction */
  trendDirection?: "up" | "down" | "neutral";
  /** Icon name from Lucide icons */
  icon?: string;
}

/**
 * Chart data point
 */
export interface ChartDataPoint {
  /** Label for the data point (e.g., month name) */
  name: string;
  /** Numeric value */
  value: number;
  /** Optional secondary value */
  secondaryValue?: number;
}

/**
 * Notification item
 */
export interface Notification {
  /** Unique identifier */
  id: string;
  /** Notification title */
  title: string;
  /** Notification message */
  message: string;
  /** Type of notification */
  type: NotificationType;
  /** Whether it has been read */
  isRead: boolean;
  /** Timestamp of creation */
  createdAt: Date;
  /** Link to navigate to when clicked */
  href?: string;
}

/**
 * Types of notifications
 */
export type NotificationType = "info" | "success" | "warning" | "error";

// ============================================================================
// Table Types
// ============================================================================

/**
 * User data for the users table
 */
export interface UserTableData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "active" | "inactive" | "pending";
  createdAt: Date;
  lastLogin?: Date;
}

/**
 * Pagination state
 */
export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

/**
 * Sorting state
 */
export interface SortingState {
  id: string;
  desc: boolean;
}

// ============================================================================
// Settings Types
// ============================================================================

/**
 * User profile settings
 */
export interface ProfileSettings {
  name: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
}

/**
 * Notification preferences
 */
export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  securityAlerts: boolean;
  weeklyDigest: boolean;
}

/**
 * Appearance settings
 */
export interface AppearanceSettings {
  theme: "light" | "dark" | "system";
  fontSize: "sm" | "md" | "lg";
  reducedMotion: boolean;
}

// ============================================================================
// Landing Page Types
// ============================================================================

/**
 * Feature item for the features section
 */
export interface Feature {
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Icon name from Lucide icons */
  icon: string;
}

/**
 * Pricing tier
 */
export interface PricingTier {
  /** Tier name */
  name: string;
  /** Price in pounds */
  price: number;
  /** Billing frequency */
  frequency: "monthly" | "yearly";
  /** Description of the tier */
  description: string;
  /** List of features included */
  features: string[];
  /** Whether this is the most popular option */
  isPopular?: boolean;
  /** CTA button text */
  buttonText: string;
  /** Link for the CTA button */
  buttonHref: string;
}

/**
 * Testimonial item
 */
export interface Testimonial {
  /** Unique identifier */
  id: string;
  /** Customer name */
  name: string;
  /** Customer role/title */
  role: string;
  /** Company name */
  company: string;
  /** Avatar URL */
  avatarUrl?: string;
  /** Testimonial content */
  content: string;
  /** Rating out of 5 */
  rating?: number;
}

/**
 * FAQ item
 */
export interface FAQItem {
  /** Question text */
  question: string;
  /** Answer text */
  answer: string;
}

// ============================================================================
// API Response Types
// ============================================================================

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Paginated API response
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

