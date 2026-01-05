/**
 * Architecture Documentation Page
 *
 * Deep dive into the architectural decisions and patterns used.
 *
 * @component
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "Understand the architectural patterns and design decisions in ShadCN Template. Learn about data flow, state management, and component patterns.",
};

/**
 * Architecture documentation page
 */
export default function ArchitecturePage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Architecture</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          A deep dive into the architectural decisions, patterns, and best practices
          used throughout the template.
        </p>
      </div>

      {/* Route Groups */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Route Groups</h2>
        <p className="text-muted-foreground">
          The application uses Next.js App Router with route groups to organise pages
          by feature while sharing layouts:
        </p>
        <CodeBlock language="bash" title="Route Group Structure">
{`app/
├── (auth)/           # Auth pages share centered card layout
│   ├── login/
│   ├── register/
│   └── layout.tsx    # Auth-specific layout
│
├── (dashboard)/      # Dashboard pages share shell layout
│   ├── dashboard/
│   ├── analytics/
│   └── layout.tsx    # Dashboard shell with sidebar
│
└── (marketing)/      # Marketing pages share navbar/footer
    ├── page.tsx      # Landing page at /
    └── layout.tsx    # Marketing layout`}
        </CodeBlock>
        <p className="text-sm text-muted-foreground">
          Route groups (folders in parentheses) don&apos;t affect the URL structure—
          <code>/login</code> not <code>/(auth)/login</code>.
        </p>
      </section>

      <Separator />

      {/* Data Flow */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Data Flow</h2>
        <p className="text-muted-foreground">
          The template follows a unidirectional data flow pattern:
        </p>
        <CodeBlock language="text" title="Data Flow Diagram">
{`┌─────────────────────────────────────────────────────────────┐
│                         App Layout                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              ThemeProvider (next-themes)             │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │           AuthProvider (React Context)       │    │   │
│  │  │                                              │    │   │
│  │  │   ┌─────────────┐    ┌─────────────────┐    │    │   │
│  │  │   │   Public    │    │    Protected    │    │    │   │
│  │  │   │   Routes    │    │     Routes      │    │    │   │
│  │  │   │ (Marketing) │    │   (Dashboard)   │    │    │   │
│  │  │   └─────────────┘    └─────────────────┘    │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Component Patterns */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Component Patterns</h2>

        <h3 className="text-xl font-semibold mt-6">Server vs Client Components</h3>
        <p className="text-muted-foreground">
          By default, all components are Server Components. Add{" "}
          <code>&quot;use client&quot;</code> when you need interactivity:
        </p>
        <CodeBlock language="typescript" title="Component Types">
{`// Server Component (default) - Can fetch data, no hooks
export function StaticContent() {
  return <div>Static content rendered on server</div>;
}

// Client Component - Required for interactivity
"use client";
export function InteractiveButton() {
  const [clicked, setClicked] = useState(false);
  return <button onClick={() => setClicked(true)}>Click me</button>;
}`}
        </CodeBlock>

        <h3 className="text-xl font-semibold mt-6">Composition Pattern</h3>
        <p className="text-muted-foreground">
          Complex components use composition for flexibility:
        </p>
        <CodeBlock language="typescript" title="Composition Example">
{`// ShadCN Card component uses composition
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function ProfileCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Profile content here</p>
      </CardContent>
    </Card>
  );
}`}
        </CodeBlock>

        <h3 className="text-xl font-semibold mt-6">Props Interface Pattern</h3>
        <p className="text-muted-foreground">
          Every component has a typed props interface with JSDoc comments:
        </p>
        <CodeBlock language="typescript" title="Props Interface">
{`/** Props for the StatCard component */
interface StatCardProps {
  /** Card title */
  title: string;
  /** Main value to display */
  value: string | number;
  /** Trend percentage */
  trend?: number;
  /** Trend direction */
  trendDirection?: "up" | "down" | "neutral";
  /** Additional CSS classes */
  className?: string;
}

export function StatCard({
  title,
  value,
  trend,
  trendDirection = "neutral",
  className,
}: StatCardProps) {
  // Component implementation
}`}
        </CodeBlock>
      </section>

      <Separator />

      {/* State Management */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">State Management</h2>

        <h3 className="text-xl font-semibold mt-6">Authentication Context</h3>
        <p className="text-muted-foreground">
          Auth state is managed via React Context with localStorage persistence:
        </p>
        <CodeBlock language="typescript" title="Auth Context Usage">
{`// Access auth state anywhere in the app
import { useAuth } from "@/stores/auth-context";

function DashboardHeader() {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <div>
      <span>Welcome, {user.name}</span>
      <button onClick={logout}>Log out</button>
    </div>
  );
}`}
        </CodeBlock>

        <h3 className="text-xl font-semibold mt-6">Theme State</h3>
        <p className="text-muted-foreground">
          Theme preference is managed by <code>next-themes</code>:
        </p>
        <CodeBlock language="typescript" title="Theme Usage">
{`import { useTheme } from "next-themes";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Toggle theme
    </button>
  );
}`}
        </CodeBlock>

        <h3 className="text-xl font-semibold mt-6">Local Component State</h3>
        <p className="text-muted-foreground">
          For component-specific state, use React hooks with memoisation:
        </p>
        <CodeBlock language="typescript" title="Local State">
{`function ExpensiveList({ items }) {
  // Simple state
  const [filter, setFilter] = useState("");

  // Memoized expensive computation
  const filteredItems = useMemo(
    () => items.filter(item => item.name.includes(filter)),
    [items, filter]
  );

  // Memoized callback
  const handleSelect = useCallback((id: string) => {
    console.log("Selected:", id);
  }, []);

  return <List items={filteredItems} onSelect={handleSelect} />;
}`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Form Architecture */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Form Architecture</h2>
        <p className="text-muted-foreground">
          Forms use React Hook Form with Zod for type-safe validation:
        </p>
        <CodeBlock language="typescript" title="Form Pattern">
{`import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/schemas/auth";

function LoginForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    // data is fully typed and validated
    const success = await login(data);
    if (success) {
      router.push("/dashboard");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Form fields */}
      </form>
    </Form>
  );
}`}
        </CodeBlock>
        <Alert>
          <AlertTitle>Type Safety</AlertTitle>
          <AlertDescription>
            Zod schemas provide runtime validation and TypeScript types from a single source of truth.
            Changes to the schema automatically update the TypeScript types.
          </AlertDescription>
        </Alert>
      </section>

      <Separator />

      {/* API Layer */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">API Layer</h2>
        <p className="text-muted-foreground">
          The API service provides a typed HTTP client with error handling:
        </p>
        <CodeBlock language="typescript" title="API Client">
{`import { api, ApiError, withApiResponse } from "@/services/api";

// Simple request
const users = await api.get<User[]>("/users");

// With error handling
try {
  const user = await api.post<User>("/users", { name: "John" });
} catch (error) {
  if (error instanceof ApiError) {
    console.error(\`Error \${error.status}: \${error.message}\`);
  }
}

// With standardised response wrapper
const result = await withApiResponse(api.get<User>("/users/1"));
if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error);
}`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Performance Patterns */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Performance Patterns</h2>

        <h3 className="text-xl font-semibold mt-6">Component Memoisation</h3>
        <CodeBlock language="typescript" title="React.memo">
{`// Pure presentational components are memoised
export const StatCard = memo(function StatCard({
  title,
  value,
  trend,
}: StatCardProps) {
  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      <span>{value}</span>
    </Card>
  );
});`}
        </CodeBlock>

        <h3 className="text-xl font-semibold mt-6">Lazy Loading</h3>
        <CodeBlock language="typescript" title="Dynamic Imports">
{`import { lazy, Suspense } from "react";

// Lazy load heavy components
const LazyChart = lazy(() => import("recharts").then(m => ({
  default: m.AreaChart
})));

function Dashboard() {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <LazyChart data={data} />
    </Suspense>
  );
}`}
        </CodeBlock>

        <h3 className="text-xl font-semibold mt-6">useSyncExternalStore</h3>
        <p className="text-muted-foreground">
          For SSR-safe external state (localStorage, media queries), we use{" "}
          <code>useSyncExternalStore</code>:
        </p>
        <CodeBlock language="typescript" title="SSR-Safe State">
{`function useLocalStorage<T>(key: string, initialValue: T) {
  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener("storage", callback);
    return () => window.removeEventListener("storage", callback);
  }, []);

  const getSnapshot = useCallback(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  }, [key, initialValue]);

  const getServerSnapshot = useCallback(() => initialValue, [initialValue]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Error Handling */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Error Handling</h2>
        <p className="text-muted-foreground">
          The template includes comprehensive error handling at multiple levels:
        </p>
        <CodeBlock language="typescript" title="Error Boundary">
{`// Wrap components with ErrorBoundary
import { ErrorBoundary } from "@/components/shared";

function DashboardLayout({ children }) {
  return (
    <DashboardShell>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </DashboardShell>
  );
}

// Or use the HOC
import { withErrorBoundary } from "@/components/shared";

const SafeComponent = withErrorBoundary(RiskyComponent, {
  fallback: <CustomErrorUI />
});`}
        </CodeBlock>
      </section>

      {/* Next Steps */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Next Steps</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/docs/typescript">
              TypeScript Guide
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

