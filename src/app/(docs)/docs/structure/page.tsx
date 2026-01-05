/**
 * Project Structure Documentation Page
 *
 * Overview of the folder structure and file organisation.
 *
 * @component
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Folder, FileCode, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata: Metadata = {
  title: "Project Structure",
  description:
    "Understand how the ShadCN Template codebase is organised. Learn about folder conventions, file naming, and where to find things.",
};

/**
 * Project structure documentation page
 */
export default function StructurePage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Project Structure</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          A well-organised codebase is the foundation of maintainable software.
          Here&apos;s how everything is structured.
        </p>
      </div>

      {/* Overview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
        <p className="text-muted-foreground">
          The template follows Next.js App Router conventions with a clear separation
          of concerns. Here&apos;s the top-level structure:
        </p>
        <CodeBlock language="bash" title="Project Root">
{`├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # React components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities and configuration
│   ├── schemas/         # Zod validation schemas
│   ├── services/        # API service layer
│   ├── stores/          # State management (Context)
│   └── types/           # TypeScript type definitions
├── docs/                # Internal documentation
├── .env.example         # Environment variables template
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts`}
        </CodeBlock>
      </section>

      <Separator />

      {/* App Directory */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <FolderOpen className="h-6 w-6 text-primary" />
          src/app/
        </h2>
        <p className="text-muted-foreground">
          The App Router directory contains all pages and layouts. We use{" "}
          <strong>route groups</strong> (folders with parentheses) to organise pages
          by feature without affecting the URL structure.
        </p>
        <CodeBlock language="bash" title="App Directory Structure">
{`src/app/
├── (auth)/              # Authentication pages
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   ├── forgot-password/
│   │   └── page.tsx
│   └── layout.tsx       # Shared auth layout
│
├── (dashboard)/         # Protected dashboard pages
│   ├── dashboard/
│   │   └── page.tsx
│   ├── analytics/
│   │   └── page.tsx
│   ├── users/
│   │   └── page.tsx
│   ├── settings/
│   │   └── page.tsx
│   └── layout.tsx       # Dashboard shell layout
│
├── (marketing)/         # Public marketing pages
│   ├── page.tsx         # Landing page (/)
│   └── layout.tsx       # Marketing layout
│
├── (docs)/              # Documentation pages
│   └── docs/
│       └── ...
│
├── globals.css          # Global styles and CSS variables
└── layout.tsx           # Root layout (providers)`}
        </CodeBlock>

        <div className="rounded-lg border border-border p-4 bg-muted/30">
          <h4 className="font-medium mb-2">Why Route Groups?</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• <code>(auth)</code> pages share a centered card layout</li>
            <li>• <code>(dashboard)</code> pages share the sidebar/header shell</li>
            <li>• <code>(marketing)</code> pages share the navbar/footer</li>
            <li>• URLs remain clean: <code>/login</code>, <code>/dashboard</code>, etc.</li>
          </ul>
        </div>
      </section>

      <Separator />

      {/* Components Directory */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Folder className="h-6 w-6 text-primary" />
          src/components/
        </h2>
        <p className="text-muted-foreground">
          Components are organised by feature and purpose. Each folder contains
          related components and an <code>index.ts</code> barrel file for easy imports.
        </p>
        <CodeBlock language="bash" title="Components Structure">
{`src/components/
├── ui/                  # ShadCN UI components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ...
│
├── shared/              # Cross-feature components
│   ├── container.tsx    # Layout container
│   ├── logo.tsx         # Brand logo
│   ├── theme-toggle.tsx # Dark mode toggle
│   ├── error-boundary.tsx
│   ├── loading-spinner.tsx
│   ├── skip-link.tsx
│   └── index.ts
│
├── auth/                # Authentication components
│   ├── login-form.tsx
│   ├── register-form.tsx
│   ├── forgot-password-form.tsx
│   ├── protected-route.tsx
│   └── index.ts
│
├── dashboard/           # Dashboard-specific components
│   ├── sidebar.tsx
│   ├── header.tsx
│   ├── stat-card.tsx
│   ├── chart-card.tsx
│   ├── users-table.tsx
│   └── index.ts
│
├── landing/             # Landing page sections
│   ├── hero.tsx
│   ├── features.tsx
│   ├── pricing.tsx
│   ├── testimonials.tsx
│   ├── faq.tsx
│   ├── footer.tsx
│   └── index.ts
│
├── providers/           # Context providers
│   └── theme-provider.tsx
│
└── docs/                # Documentation components
    ├── docs-sidebar.tsx
    ├── docs-header.tsx
    ├── code-block.tsx
    └── index.ts`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Other Directories */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Other Directories</h2>

        {/* Hooks */}
        <DirectorySection
          name="src/hooks/"
          description="Custom React hooks for reusable stateful logic."
          files={[
            { name: "use-local-storage.ts", desc: "Persist state to localStorage" },
            { name: "use-media-query.ts", desc: "Responsive breakpoint detection" },
            { name: "use-debounce.ts", desc: "Debounce values and callbacks" },
            { name: "use-copy-to-clipboard.ts", desc: "Clipboard API wrapper" },
            { name: "index.ts", desc: "Barrel export" },
          ]}
        />

        {/* Lib */}
        <DirectorySection
          name="src/lib/"
          description="Utility functions and configuration."
          files={[
            { name: "utils.ts", desc: "cn(), formatDate(), formatCurrency()" },
            { name: "constants.ts", desc: "Site config, nav items, content" },
            { name: "env.ts", desc: "Environment variable validation" },
            { name: "mock-data.ts", desc: "Sample data for development" },
          ]}
        />

        {/* Schemas */}
        <DirectorySection
          name="src/schemas/"
          description="Zod validation schemas for forms and data."
          files={[
            { name: "auth.ts", desc: "Login, register, password schemas" },
            { name: "user.ts", desc: "User profile schemas" },
            { name: "storage.ts", desc: "localStorage data schemas" },
            { name: "index.ts", desc: "Barrel export" },
          ]}
        />

        {/* Services */}
        <DirectorySection
          name="src/services/"
          description="API client and service layer."
          files={[
            { name: "api.ts", desc: "HTTP client with error handling" },
            { name: "index.ts", desc: "Barrel export" },
          ]}
        />

        {/* Stores */}
        <DirectorySection
          name="src/stores/"
          description="Global state management using React Context."
          files={[
            { name: "auth-context.tsx", desc: "Authentication state and methods" },
          ]}
        />

        {/* Types */}
        <DirectorySection
          name="src/types/"
          description="TypeScript type definitions."
          files={[
            { name: "index.ts", desc: "All shared type definitions" },
          ]}
        />
      </section>

      <Separator />

      {/* File Naming Conventions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Naming Conventions</h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">Convention</th>
                <th className="text-left p-3 font-medium">Example</th>
              </tr>
            </thead>
            <tbody>
              <ConventionRow type="Components" convention="kebab-case" example="user-menu.tsx" />
              <ConventionRow type="Hooks" convention="use-*.ts" example="use-debounce.ts" />
              <ConventionRow type="Pages" convention="page.tsx" example="app/login/page.tsx" />
              <ConventionRow type="Layouts" convention="layout.tsx" example="app/(auth)/layout.tsx" />
              <ConventionRow type="Types" convention="PascalCase" example="User, NavItem" />
              <ConventionRow type="Constants" convention="SCREAMING_SNAKE_CASE" example="SITE_NAME" />
              <ConventionRow type="Functions" convention="camelCase" example="formatCurrency()" />
            </tbody>
          </table>
        </div>
      </section>

      <Separator />

      {/* Import Paths */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Import Paths</h2>
        <p className="text-muted-foreground">
          We use path aliases for clean imports. The <code>@/</code> alias points to
          the <code>src/</code> directory:
        </p>
        <CodeBlock language="typescript" title="Example Imports">
{`// Components
import { Button } from "@/components/ui/button";
import { Logo, ThemeToggle } from "@/components/shared";
import { LoginForm } from "@/components/auth";

// Hooks
import { useLocalStorage, useMediaQuery } from "@/hooks";

// Utilities
import { cn, formatDate } from "@/lib/utils";
import { SITE_NAME, FEATURES } from "@/lib/constants";

// Types
import type { User, NavItem } from "@/types";

// Schemas
import { loginSchema } from "@/schemas/auth";

// Services
import { api, ApiError } from "@/services/api";

// Stores
import { useAuth } from "@/stores/auth-context";`}
        </CodeBlock>
      </section>

      {/* Next Steps */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Next Steps</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/docs/architecture">
              Architecture
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/components">
              Components
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// Helper Components
// ============================================================================

/** Directory section with file list */
function DirectorySection({
  name,
  description,
  files,
}: {
  name: string;
  description: string;
  files: { name: string; desc: string }[];
}) {
  return (
    <div className="rounded-lg border border-border p-4">
      <h3 className="font-semibold flex items-center gap-2 mb-2">
        <Folder className="h-4 w-4 text-primary" />
        {name}
      </h3>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      <ul className="space-y-1">
        {files.map((file) => (
          <li key={file.name} className="flex items-center gap-2 text-sm">
            <FileCode className="h-3.5 w-3.5 text-muted-foreground" />
            <code className="text-primary">{file.name}</code>
            <span className="text-muted-foreground">— {file.desc}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Naming convention table row */
function ConventionRow({
  type,
  convention,
  example,
}: {
  type: string;
  convention: string;
  example: string;
}) {
  return (
    <tr className="border-t border-border">
      <td className="p-3 font-medium">{type}</td>
      <td className="p-3 font-mono text-sm">{convention}</td>
      <td className="p-3 font-mono text-sm text-primary">{example}</td>
    </tr>
  );
}

