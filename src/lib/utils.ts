/**
 * Utility Functions
 * 
 * Common utility functions used throughout the application.
 * @module lib/utils
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and tailwind-merge.
 * This utility handles conditional classes and merges Tailwind CSS classes
 * intelligently to avoid conflicts (e.g., `px-2 px-4` becomes `px-4`).
 * 
 * @param inputs - Class values to combine (strings, objects, arrays, etc.)
 * @returns Merged class name string
 * 
 * @example
 * ```tsx
 * // Basic usage
 * cn("px-4", "py-2") // "px-4 py-2"
 * 
 * // Conditional classes
 * cn("base-class", isActive && "active-class") // "base-class active-class" or "base-class"
 * 
 * // With objects
 * cn({ "text-red-500": hasError, "text-green-500": !hasError })
 * 
 * // Tailwind merge (resolves conflicts)
 * cn("px-2 py-1", "px-4") // "py-1 px-4"
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as British Pounds currency.
 * 
 * @param value - The numeric value to format
 * @returns Formatted currency string
 * 
 * @example
 * ```ts
 * formatCurrency(1234.56) // "£1,234.56"
 * formatCurrency(0) // "£0.00"
 * ```
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);
}

/**
 * Formats a date using the British date format (DD/MM/YYYY).
 * 
 * @param date - The date to format (Date object or string)
 * @returns Formatted date string
 * 
 * @example
 * ```ts
 * formatDate(new Date("2024-01-15")) // "15/01/2024"
 * formatDate("2024-01-15") // "15/01/2024"
 * ```
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}

/**
 * Truncates a string to a specified length with ellipsis.
 * 
 * @param str - The string to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated string with ellipsis if needed
 * 
 * @example
 * ```ts
 * truncate("Hello, World!", 5) // "Hello..."
 * truncate("Hi", 5) // "Hi"
 * ```
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
}

/**
 * Capitalises the first letter of each word in a string.
 * 
 * @param str - The string to capitalise
 * @returns Capitalised string
 * 
 * @example
 * ```ts
 * capitalise("hello world") // "Hello World"
 * capitalise("john doe") // "John Doe"
 * ```
 */
export function capitalise(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Generates initials from a full name.
 * 
 * @param name - Full name to extract initials from
 * @param maxInitials - Maximum number of initials to return (default: 2)
 * @returns Uppercase initials
 * 
 * @example
 * ```ts
 * getInitials("John Doe") // "JD"
 * getInitials("John Paul Doe", 3) // "JPD"
 * getInitials("John") // "J"
 * ```
 */
export function getInitials(name: string, maxInitials: number = 2): string {
  return name
    .split(" ")
    .slice(0, maxInitials)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

/**
 * Safely parses JSON with a fallback value.
 * 
 * @param json - JSON string to parse
 * @param fallback - Value to return if parsing fails
 * @returns Parsed value or fallback
 * 
 * @example
 * ```ts
 * safeJsonParse('{"key": "value"}', {}) // { key: "value" }
 * safeJsonParse('invalid json', {}) // {}
 * ```
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/**
 * Delays execution for a specified number of milliseconds.
 * Useful for simulating API calls in development.
 * 
 * @param ms - Number of milliseconds to delay
 * @returns Promise that resolves after the delay
 * 
 * @example
 * ```ts
 * await delay(1000); // Wait 1 second
 * ```
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
