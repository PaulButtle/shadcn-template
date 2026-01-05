"use client";

/**
 * Documentation Sidebar Component
 *
 * Navigation sidebar for the documentation section.
 * Features collapsible sections and active state highlighting.
 *
 * @component
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Blocks,
  Code2,
  Palette,
  Shield,
  Rocket,
  Settings,
  FileCode,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

/** Navigation item for the documentation sidebar */
interface DocNavItem {
  /** Display title */
  title: string;
  /** Route path */
  href: string;
  /** Icon component */
  icon: LucideIcon;
  /** Whether this item is new */
  isNew?: boolean;
}

/** Navigation section with grouped items */
interface DocNavSection {
  /** Section title */
  title: string;
  /** Navigation items in this section */
  items: DocNavItem[];
}

// ============================================================================
// Navigation Configuration
// ============================================================================

/** Documentation navigation structure */
const DOC_NAV_SECTIONS: DocNavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs", icon: BookOpen },
      { title: "Installation", href: "/docs/installation", icon: Rocket },
      { title: "Project Structure", href: "/docs/structure", icon: Layers },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { title: "Architecture", href: "/docs/architecture", icon: Blocks },
      { title: "TypeScript", href: "/docs/typescript", icon: Code2 },
      { title: "Styling & Theming", href: "/docs/styling", icon: Palette },
    ],
  },
  {
    title: "Features",
    items: [
      { title: "Components", href: "/docs/components", icon: FileCode },
      { title: "Custom Hooks", href: "/docs/hooks", icon: Code2 },
      { title: "Forms & Validation", href: "/docs/forms", icon: Settings },
      { title: "Authentication", href: "/docs/authentication", icon: Shield },
    ],
  },
  {
    title: "Advanced",
    items: [
      { title: "API Services", href: "/docs/api", icon: Code2 },
      { title: "Deployment", href: "/docs/deployment", icon: Rocket, isNew: true },
    ],
  },
];

// ============================================================================
// Component
// ============================================================================

/**
 * Documentation sidebar with navigation links
 */
export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-6" aria-label="Documentation navigation">
      {DOC_NAV_SECTIONS.map((section) => (
        <div key={section.title}>
          {/* Section Title */}
          <h4 className="text-sm font-semibold text-foreground mb-2 px-2">
            {section.title}
          </h4>

          {/* Section Items */}
          <ul className="space-y-1">
            {section.items.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{item.title}</span>
                    {item.isNew && (
                      <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        New
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

