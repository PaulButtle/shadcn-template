/**
 * Documentation Layout
 *
 * Layout wrapper for all documentation pages.
 * Provides sidebar navigation and main content area.
 *
 * @component
 */

import type { Metadata } from "next";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { DocsHeader } from "@/components/docs/docs-header";

export const metadata: Metadata = {
  title: {
    template: "%s | Documentation",
    default: "Documentation",
  },
  description:
    "Comprehensive documentation for the ShadCN Template. Learn how to get started, understand the architecture, and use all features.",
};

/** Props for the documentation layout */
interface DocsLayoutProps {
  children: React.ReactNode;
}

/**
 * Documentation layout with sidebar navigation
 * @param props - Layout props containing child components
 */
export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <DocsHeader />

      <div className="container mx-auto flex">
        {/* Sidebar - Hidden on mobile, shown on larger screens */}
        <aside className="hidden lg:block w-64 shrink-0 border-r border-border">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-6 pr-4">
            <DocsSidebar />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-4 lg:px-8 py-8 lg:py-12">
          <div className="max-w-3xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

