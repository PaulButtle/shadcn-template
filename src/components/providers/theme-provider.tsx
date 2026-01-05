"use client";

/**
 * Theme Provider Component
 * 
 * Wraps the application with next-themes ThemeProvider for dark/light mode support.
 * This component must be used as a client component due to next-themes requirements.
 * 
 * @component
 * @example
 * ```tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 */

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

/**
 * Theme provider that enables dark/light mode switching
 * @param props - Theme provider props including children and optional theme configuration
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

