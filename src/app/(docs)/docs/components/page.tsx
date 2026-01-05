/**
 * Components Documentation Page
 *
 * Overview of all available components in the template.
 *
 * @component
 */

import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  LayoutDashboard,
  Shield,
  PanelLeft,
  FileCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/docs/code-block";
import { PropsTable } from "@/components/docs/props-table";

export const metadata: Metadata = {
  title: "Components",
  description:
    "Explore all available components in ShadCN Template. UI components, dashboard components, auth forms, and more.",
};

/**
 * Components documentation page
 */
export default function ComponentsPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Components</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          A comprehensive library of components organised by feature. All components
          are fully typed, accessible, and customisable.
        </p>
      </div>

      {/* Overview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
        <p className="text-muted-foreground">
          Components are organised into the following categories:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <CategoryCard
            icon={<Blocks className="h-5 w-5" />}
            title="UI Components"
            description="30+ ShadCN UI primitives like Button, Card, Input"
            count={30}
          />
          <CategoryCard
            icon={<LayoutDashboard className="h-5 w-5" />}
            title="Dashboard"
            description="Sidebar, header, stat cards, charts, tables"
            count={10}
          />
          <CategoryCard
            icon={<Shield className="h-5 w-5" />}
            title="Authentication"
            description="Login, register, forgot password forms"
            count={4}
          />
          <CategoryCard
            icon={<PanelLeft className="h-5 w-5" />}
            title="Landing Page"
            description="Hero, features, pricing, testimonials, FAQ"
            count={8}
          />
        </div>
      </section>

      <Separator />

      {/* UI Components */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Blocks className="h-6 w-6 text-primary" />
          UI Components
        </h2>
        <p className="text-muted-foreground">
          Core UI primitives from ShadCN UI. These are located in{" "}
          <code>src/components/ui/</code>.
        </p>
        
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium">Component</th>
                <th className="text-left p-3 font-medium">Description</th>
                <th className="text-left p-3 font-medium">Import</th>
              </tr>
            </thead>
            <tbody>
              <ComponentRow name="Button" desc="Primary action element" import="@/components/ui/button" />
              <ComponentRow name="Card" desc="Container with header, content, footer" import="@/components/ui/card" />
              <ComponentRow name="Input" desc="Text input field" import="@/components/ui/input" />
              <ComponentRow name="Label" desc="Form field label" import="@/components/ui/label" />
              <ComponentRow name="Checkbox" desc="Toggleable checkbox" import="@/components/ui/checkbox" />
              <ComponentRow name="Switch" desc="Toggle switch" import="@/components/ui/switch" />
              <ComponentRow name="Select" desc="Dropdown selection" import="@/components/ui/select" />
              <ComponentRow name="Textarea" desc="Multi-line text input" import="@/components/ui/textarea" />
              <ComponentRow name="Badge" desc="Status indicator" import="@/components/ui/badge" />
              <ComponentRow name="Alert" desc="Contextual messages" import="@/components/ui/alert" />
              <ComponentRow name="Dialog" desc="Modal dialog" import="@/components/ui/dialog" />
              <ComponentRow name="Sheet" desc="Slide-out panel" import="@/components/ui/sheet" />
              <ComponentRow name="Tabs" desc="Tabbed interface" import="@/components/ui/tabs" />
              <ComponentRow name="Table" desc="Data table" import="@/components/ui/table" />
              <ComponentRow name="Tooltip" desc="Hover information" import="@/components/ui/tooltip" />
              <ComponentRow name="Avatar" desc="User avatar" import="@/components/ui/avatar" />
              <ComponentRow name="Separator" desc="Visual divider" import="@/components/ui/separator" />
              <ComponentRow name="Skeleton" desc="Loading placeholder" import="@/components/ui/skeleton" />
            </tbody>
          </table>
        </div>

        <CodeBlock language="tsx" title="Example: Using Button">
{`import { Button } from "@/components/ui/button";

function MyComponent() {
  return (
    <div className="flex gap-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  );
}`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Dashboard Components */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          Dashboard Components
        </h2>
        <p className="text-muted-foreground">
          Components specific to the dashboard layout. Located in{" "}
          <code>src/components/dashboard/</code>.
        </p>

        <ComponentDetail
          name="StatCard"
          description="Displays a metric with optional trend indicator. Memoised for performance."
          props={[
            { name: "title", type: "string", required: true, description: "Card title" },
            { name: "value", type: "string | number", required: true, description: "Main value to display" },
            { name: "description", type: "string", description: "Additional context" },
            { name: "trend", type: "number", description: "Trend percentage" },
            { name: "trendDirection", type: '"up" | "down" | "neutral"', default: '"neutral"', description: "Trend direction" },
            { name: "icon", type: "string", description: "Icon name from iconMap" },
            { name: "className", type: "string", description: "Additional CSS classes" },
          ]}
          example={`<StatCard
  title="Total Revenue"
  value="£45,231.89"
  description="from last month"
  trend={20.1}
  trendDirection="up"
  icon="PoundSterling"
/>`}
        />

        <ComponentDetail
          name="Sidebar"
          description="Collapsible navigation sidebar with user menu."
          props={[
            { name: "isCollapsed", type: "boolean", required: true, description: "Whether sidebar is collapsed" },
            { name: "onToggle", type: "() => void", required: true, description: "Callback to toggle state" },
          ]}
          example={`<Sidebar
  isCollapsed={isCollapsed}
  onToggle={() => setIsCollapsed(!isCollapsed)}
/>`}
        />

        <ComponentDetail
          name="UsersTable"
          description="Full-featured data table with sorting, filtering, and pagination using TanStack Table."
          props={[
            { name: "data", type: "UserTableData[]", required: true, description: "Array of user data" },
          ]}
          example={`import { UsersTable } from "@/components/dashboard";
import { MOCK_USERS } from "@/lib/mock-data";

<UsersTable data={MOCK_USERS} />`}
        />
      </section>

      <Separator />

      {/* Auth Components */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          Authentication Components
        </h2>
        <p className="text-muted-foreground">
          Components for authentication flows. Located in{" "}
          <code>src/components/auth/</code>.
        </p>

        <ComponentDetail
          name="LoginForm"
          description="Complete login form with email, password, remember me, and social login buttons."
          props={[]}
          example={`import { LoginForm } from "@/components/auth";

// In your page
<LoginForm />`}
        />

        <ComponentDetail
          name="RegisterForm"
          description="Registration form with password strength indicator and terms acceptance."
          props={[]}
          example={`import { RegisterForm } from "@/components/auth";

<RegisterForm />`}
        />

        <ComponentDetail
          name="ProtectedRoute"
          description="Wrapper component that restricts access to authenticated users only."
          props={[
            { name: "children", type: "React.ReactNode", required: true, description: "Protected content" },
            { name: "redirectTo", type: "string", default: '"/login"', description: "Redirect URL when not authenticated" },
          ]}
          example={`import { ProtectedRoute } from "@/components/auth";

<ProtectedRoute redirectTo="/login">
  <DashboardContent />
</ProtectedRoute>`}
        />
      </section>

      <Separator />

      {/* Shared Components */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <FileCode className="h-6 w-6 text-primary" />
          Shared Components
        </h2>
        <p className="text-muted-foreground">
          Cross-feature components used throughout the app. Located in{" "}
          <code>src/components/shared/</code>.
        </p>

        <div className="space-y-4">
          <SharedComponent
            name="Logo"
            description="Brand logo with optional text and link"
            usage={`<Logo href="/" size="md" showText />`}
          />
          <SharedComponent
            name="ThemeToggle"
            description="Dark/light mode toggle button"
            usage={`<ThemeToggle />`}
          />
          <SharedComponent
            name="Container"
            description="Max-width wrapper with responsive padding"
            usage={`<Container>{children}</Container>`}
          />
          <SharedComponent
            name="LoadingSpinner"
            description="Animated loading indicator with size variants"
            usage={`<LoadingSpinner size="lg" />`}
          />
          <SharedComponent
            name="ErrorBoundary"
            description="Catches JavaScript errors and displays fallback UI"
            usage={`<ErrorBoundary>{children}</ErrorBoundary>`}
          />
          <SharedComponent
            name="SkipLink"
            description="Accessibility skip link for keyboard navigation"
            usage={`<SkipLink />`}
          />
        </div>
      </section>

      <Separator />

      {/* Import Patterns */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Import Patterns</h2>
        <p className="text-muted-foreground">
          Each component folder has an <code>index.ts</code> barrel file for clean imports:
        </p>
        <CodeBlock language="tsx" title="Import Examples">
{`// UI components - import individually
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

// Feature components - use barrel exports
import { LoginForm, RegisterForm, ProtectedRoute } from "@/components/auth";
import { Sidebar, StatCard, UsersTable } from "@/components/dashboard";
import { Hero, Features, Pricing } from "@/components/landing";
import { Logo, ThemeToggle, Container } from "@/components/shared";`}
        </CodeBlock>
      </section>

      {/* Next Steps */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Next Steps</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/docs/hooks">
              Custom Hooks
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/forms">
              Forms & Validation
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

/** Category overview card */
function CategoryCard({
  icon,
  title,
  description,
  count,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  count: number;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border p-4">
      <div className="rounded-lg bg-primary/10 p-2 text-primary">{icon}</div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{title}</h3>
          <Badge variant="secondary" className="text-xs">
            {count}+
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

/** Component table row */
function ComponentRow({
  name,
  desc,
  import: importPath,
}: {
  name: string;
  desc: string;
  import: string;
}) {
  return (
    <tr className="border-t border-border">
      <td className="p-3 font-medium">{name}</td>
      <td className="p-3 text-muted-foreground">{desc}</td>
      <td className="p-3">
        <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{importPath}</code>
      </td>
    </tr>
  );
}

/** Detailed component documentation */
function ComponentDetail({
  name,
  description,
  props,
  example,
}: {
  name: string;
  description: string;
  props: Array<{
    name: string;
    type: string;
    required?: boolean;
    default?: string;
    description: string;
  }>;
  example: string;
}) {
  return (
    <div className="rounded-lg border border-border p-4 space-y-4">
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      
      {props.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-2">Props</h4>
          <PropsTable props={props} />
        </div>
      )}
      
      <div>
        <h4 className="text-sm font-medium mb-2">Example</h4>
        <CodeBlock language="tsx">{example}</CodeBlock>
      </div>
    </div>
  );
}

/** Simple shared component display */
function SharedComponent({
  name,
  description,
  usage,
}: {
  name: string;
  description: string;
  usage: string;
}) {
  return (
    <div className="rounded-lg border border-border p-4">
      <h4 className="font-medium">{name}</h4>
      <p className="text-sm text-muted-foreground mb-2">{description}</p>
      <code className="text-xs bg-muted px-2 py-1 rounded">{usage}</code>
    </div>
  );
}

