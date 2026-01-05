"use client";

/**
 * Theme Toggle Component
 * 
 * A button that toggles between light, dark, and system themes.
 * Uses next-themes for theme management and shows appropriate icons.
 * 
 * @component
 * @example
 * ```tsx
 * <ThemeToggle />
 * ```
 */

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Hook to safely track mounted state using useSyncExternalStore
 * This avoids the React Compiler warning about setState in useEffect
 */
function useMounted(): boolean {
  return useSyncExternalStore(
    // Subscribe is a no-op since mounted state never changes
    () => () => {},
    // Client is always mounted
    () => true,
    // Server is never mounted
    () => false
  );
}

/**
 * Theme toggle button with dropdown menu
 * Cycles through light, dark, and system themes
 */
export function ThemeToggle() {
  // Track mounted state to prevent hydration mismatch
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();

  // Show a placeholder during SSR to prevent layout shift
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9" disabled>
        <Sun className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9"
          aria-label="Toggle theme"
        >
          {/* Sun icon for light mode */}
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          {/* Moon icon for dark mode */}
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Sun className="h-4 w-4" />
          <span>Light</span>
          {theme === "light" && <span className="ml-auto text-primary">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Moon className="h-4 w-4" />
          <span>Dark</span>
          {theme === "dark" && <span className="ml-auto text-primary">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Monitor className="h-4 w-4" />
          <span>System</span>
          {theme === "system" && <span className="ml-auto text-primary">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
