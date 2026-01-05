/**
 * Logo Component
 * 
 * Displays the site logo with optional text. Can be used as a link
 * or standalone element. Supports different size variants.
 * 
 * @component
 * @example
 * ```tsx
 * <Logo />
 * <Logo size="sm" showText={false} />
 * <Logo href="/" />
 * ```
 */

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

/** Props for the Logo component */
interface LogoProps {
  /** Additional CSS classes */
  className?: string;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Whether to show the text alongside the icon */
  showText?: boolean;
  /** If provided, wraps logo in a link */
  href?: string;
}

/** Size configurations for icon and text */
const sizeConfig = {
  sm: {
    icon: "h-6 w-6",
    text: "text-lg",
    container: "gap-1.5",
  },
  md: {
    icon: "h-8 w-8",
    text: "text-xl",
    container: "gap-2",
  },
  lg: {
    icon: "h-10 w-10",
    text: "text-2xl",
    container: "gap-2.5",
  },
} as const;

/**
 * Site logo with optional link wrapper
 * @param props - Logo configuration
 */
export function Logo({
  className,
  size = "md",
  showText = true,
  href,
}: LogoProps) {
  const config = sizeConfig[size];
  
  const logoContent = (
    <div
      className={cn(
        "flex items-center font-bold tracking-tight",
        config.container,
        className
      )}
    >
      {/* Logo icon - distinctive emerald gradient */}
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
        <div className="relative bg-gradient-to-br from-primary to-primary/80 p-1.5 rounded-lg">
          <Sparkles className={cn(config.icon, "text-primary-foreground")} />
        </div>
      </div>
      
      {/* Logo text */}
      {showText && (
        <span className={cn(config.text, "text-foreground")}>
          Acme<span className="text-primary">.</span>
        </span>
      )}
    </div>
  );

  // Wrap in link if href provided
  if (href) {
    return (
      <Link 
        href={href} 
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
        aria-label="Go to homepage"
      >
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}

