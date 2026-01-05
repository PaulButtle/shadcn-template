/**
 * Documentation Home Page
 *
 * The main entry point for the documentation section.
 * Provides an overview and quick links to key sections.
 *
 * @component
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  Rocket,
  Layers,
  Blocks,
  Code2,
  Palette,
  FileCode,
  Shield,
  Settings,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DocCard, DocCardGrid } from "@/components/docs/doc-card";

export const metadata: Metadata = {
  title: "Introduction",
  description:
    "Welcome to the ShadCN Template documentation. Learn how to get started, understand the architecture, and build amazing applications.",
};

/**
 * Documentation introduction page
 */
export default function DocsPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="space-y-4">
        <Badge variant="secondary" className="mb-2">
          Documentation v2.0
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          Welcome to{" "}
          <span className="text-primary">ShadCN Template</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
          A comprehensive, production-ready Next.js template featuring ShadCN UI,
          TypeScript, authentication, and a beautiful dashboard.
        </p>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 pt-4">
          <Button size="lg" asChild>
            <Link href="/docs/installation">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/docs/components">
              Browse Components
            </Link>
          </Button>
        </div>
      </div>

      <Separator />

      {/* Features Overview */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">What&apos;s Included</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureItem
            icon={<Blocks className="h-5 w-5" />}
            title="ShadCN UI Components"
            description="30+ beautifully designed, accessible components"
          />
          <FeatureItem
            icon={<Shield className="h-5 w-5" />}
            title="Authentication System"
            description="Complete auth flow with protected routes"
          />
          <FeatureItem
            icon={<Layers className="h-5 w-5" />}
            title="Dashboard Layout"
            description="Responsive sidebar, header, and navigation"
          />
          <FeatureItem
            icon={<Code2 className="h-5 w-5" />}
            title="Strict TypeScript"
            description="Full type safety with no any types"
          />
          <FeatureItem
            icon={<Palette className="h-5 w-5" />}
            title="Dark Mode"
            description="System-aware theme with smooth transitions"
          />
          <FeatureItem
            icon={<FileCode className="h-5 w-5" />}
            title="Form Validation"
            description="React Hook Form + Zod integration"
          />
        </div>
      </div>

      <Separator />

      {/* Quick Links */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Getting Started</h2>
        <DocCardGrid>
          <DocCard
            title="Installation"
            description="Get up and running in under 5 minutes with our quick start guide."
            href="/docs/installation"
            icon={Rocket}
          />
          <DocCard
            title="Project Structure"
            description="Understand how the codebase is organised and where to find things."
            href="/docs/structure"
            icon={Layers}
          />
          <DocCard
            title="Architecture"
            description="Learn about the architectural decisions and patterns used."
            href="/docs/architecture"
            icon={Blocks}
          />
          <DocCard
            title="Styling & Theming"
            description="Customise colours, fonts, and create your own theme."
            href="/docs/styling"
            icon={Palette}
          />
        </DocCardGrid>
      </div>

      <Separator />

      {/* Core Features */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Core Features</h2>
        <DocCardGrid>
          <DocCard
            title="Components"
            description="Explore all available components with examples and API references."
            href="/docs/components"
            icon={FileCode}
          />
          <DocCard
            title="Custom Hooks"
            description="Reusable hooks for common patterns like localStorage and media queries."
            href="/docs/hooks"
            icon={Code2}
          />
          <DocCard
            title="Forms & Validation"
            description="Build type-safe forms with React Hook Form and Zod."
            href="/docs/forms"
            icon={Settings}
          />
          <DocCard
            title="Authentication"
            description="Protect routes and manage user sessions with the auth system."
            href="/docs/authentication"
            icon={Shield}
          />
        </DocCardGrid>
      </div>

      <Separator />

      {/* Tech Stack */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          <TechBadge>Next.js 15</TechBadge>
          <TechBadge>React 19</TechBadge>
          <TechBadge>TypeScript 5</TechBadge>
          <TechBadge>Tailwind CSS 4</TechBadge>
          <TechBadge>ShadCN UI</TechBadge>
          <TechBadge>React Hook Form</TechBadge>
          <TechBadge>Zod</TechBadge>
          <TechBadge>Recharts</TechBadge>
          <TechBadge>TanStack Table</TechBadge>
          <TechBadge>Lucide Icons</TechBadge>
        </div>
      </div>

      {/* Support */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-semibold text-lg">Need Help?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              If you have questions or run into issues, we&apos;re here to help.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="https://github.com/acme/shadcn-template/issues" target="_blank">
                Report Issue
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="https://github.com/acme/shadcn-template/discussions" target="_blank">
                Discussions
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Helper Components
// ============================================================================

/** Feature item for the overview grid */
function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border p-4">
      <div className="rounded-lg bg-primary/10 p-2 text-primary">{icon}</div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

/** Technology badge */
function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge variant="outline" className="px-3 py-1 text-sm">
      {children}
    </Badge>
  );
}

