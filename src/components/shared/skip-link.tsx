/**
 * Skip Link Component
 *
 * An accessibility component that allows keyboard users to skip
 * directly to the main content, bypassing navigation and other
 * repeated content.
 *
 * The link is visually hidden until focused, following WCAG guidelines.
 *
 * @module components/shared/skip-link
 *
 * @example
 * ```tsx
 * // In your layout
 * <body>
 *   <SkipLink />
 *   <nav>...</nav>
 *   <main id="main-content">...</main>
 * </body>
 * ```
 */

import { cn } from "@/lib/utils";

/** Props for the SkipLink component */
interface SkipLinkProps {
  /** Target element ID (default: "main-content") */
  targetId?: string;
  /** Link text (default: "Skip to main content") */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Accessible skip link for keyboard navigation.
 * Hidden until focused, then appears at the top of the viewport.
 *
 * @param props - Skip link configuration
 */
export function SkipLink({
  targetId = "main-content",
  children = "Skip to main content",
  className,
}: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        // Base styles
        "fixed left-4 top-4 z-[100]",
        "px-4 py-2 rounded-md",
        "bg-primary text-primary-foreground",
        "font-medium text-sm",
        // Hidden by default, visible on focus
        "opacity-0 pointer-events-none",
        "focus:opacity-100 focus:pointer-events-auto",
        // Transform animation
        "-translate-y-full focus:translate-y-0",
        "transition-all duration-200",
        // Focus ring
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className
      )}
    >
      {children}
    </a>
  );
}

export default SkipLink;

