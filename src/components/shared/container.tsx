/**
 * Container Component
 * 
 * A responsive container that provides consistent max-width and padding
 * across all pages. Supports different size variants.
 * 
 * @component
 * @example
 * ```tsx
 * <Container>
 *   <h1>Content here</h1>
 * </Container>
 * 
 * <Container size="sm">
 *   <p>Narrow content</p>
 * </Container>
 * ```
 */

import { cn } from "@/lib/utils";

/** Props for the Container component */
interface ContainerProps {
  /** Child elements to render inside the container */
  children: React.ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
  /** Size variant affecting max-width */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** HTML element to render as (default: div) */
  as?: "div" | "section" | "article" | "main";
}

/** Size variant configurations */
const sizeClasses = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
} as const;

/**
 * Responsive container with consistent spacing
 * @param props - Container configuration
 */
export function Container({
  children,
  className,
  size = "xl",
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Component>
  );
}

