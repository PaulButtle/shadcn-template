/**
 * TypeScript Documentation Page
 *
 * Guide to TypeScript usage and best practices in the template.
 *
 * @component
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata: Metadata = {
  title: "TypeScript",
  description:
    "TypeScript configuration and best practices in ShadCN Template. Learn about strict mode, type definitions, and type-safe patterns.",
};

/**
 * TypeScript documentation page
 */
export default function TypeScriptPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">TypeScript</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          This template uses strict TypeScript configuration for maximum type safety.
          No <code>any</code> types, no shortcuts.
        </p>
      </div>

      {/* Configuration */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Configuration</h2>
        <p className="text-muted-foreground">
          The <code>tsconfig.json</code> enables all strict options:
        </p>
        <CodeBlock language="json" title="tsconfig.json (excerpt)">
{`{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noUncheckedIndexedAccess": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  }
}`}
        </CodeBlock>
        <div className="rounded-lg border border-border p-4 bg-muted/30">
          <h4 className="font-medium mb-2">Key Settings Explained</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>
              • <code>noUncheckedIndexedAccess</code> — Array/object access returns <code>T | undefined</code>
            </li>
            <li>
              • <code>noUnusedLocals</code> — Errors on unused variables
            </li>
            <li>
              • <code>noImplicitReturns</code> — All code paths must return a value
            </li>
          </ul>
        </div>
      </section>

      <Separator />

      {/* Type Definitions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Type Definitions</h2>
        <p className="text-muted-foreground">
          All types are centralised in <code>src/types/index.ts</code> for easy discovery
          and maintenance:
        </p>
        <CodeBlock language="typescript" title="src/types/index.ts">
{`// User & Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = "admin" | "user" | "viewer";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Component Props */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Component Props Pattern</h2>
        <p className="text-muted-foreground">
          Every component has a typed props interface with JSDoc documentation:
        </p>
        <CodeBlock language="typescript" title="Props Interface Pattern">
{`/** Props for the Button component */
interface ButtonProps {
  /** Button content */
  children: React.ReactNode;
  /** Visual style variant */
  variant?: "default" | "destructive" | "outline" | "ghost";
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Primary button component with variants
 * @component
 */
export function Button({
  children,
  variant = "default",
  size = "md",
  disabled = false,
  onClick,
  className,
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
    >
      {children}
    </button>
  );
}`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Type-Safe Patterns */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Type-Safe Patterns</h2>

        <h3 className="text-xl font-semibold mt-6">Discriminated Unions</h3>
        <p className="text-muted-foreground">
          Use discriminated unions for state that can be in different modes:
        </p>
        <CodeBlock language="typescript" title="Discriminated Unions">
{`type LoadingState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

function UserProfile() {
  const [state, setState] = useState<LoadingState<User>>({ status: "idle" });

  // TypeScript knows what's available in each case
  switch (state.status) {
    case "loading":
      return <Spinner />;
    case "error":
      return <Error message={state.error.message} />;
    case "success":
      return <Profile user={state.data} />; // data is User, not undefined
    default:
      return <Button onClick={fetchUser}>Load Profile</Button>;
  }
}`}
        </CodeBlock>

        <h3 className="text-xl font-semibold mt-6">Generic Components</h3>
        <CodeBlock language="typescript" title="Generic Component">
{`interface SelectProps<T> {
  options: T[];
  value: T | null;
  onChange: (value: T) => void;
  getLabel: (option: T) => string;
  getValue: (option: T) => string;
}

function Select<T>({
  options,
  value,
  onChange,
  getLabel,
  getValue,
}: SelectProps<T>) {
  return (
    <select
      value={value ? getValue(value) : ""}
      onChange={(e) => {
        const selected = options.find(
          (opt) => getValue(opt) === e.target.value
        );
        if (selected) onChange(selected);
      }}
    >
      {options.map((option) => (
        <option key={getValue(option)} value={getValue(option)}>
          {getLabel(option)}
        </option>
      ))}
    </select>
  );
}

// Usage - fully typed!
<Select
  options={users}
  value={selectedUser}
  onChange={setSelectedUser}
  getLabel={(u) => u.name}
  getValue={(u) => u.id}
/>`}
        </CodeBlock>

        <h3 className="text-xl font-semibold mt-6">Type Guards</h3>
        <CodeBlock language="typescript" title="Type Guards">
{`// Type guard for error handling
function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

// Usage
try {
  await api.post("/users", data);
} catch (error) {
  if (isApiError(error)) {
    // TypeScript knows error is ApiError here
    toast.error(\`Error \${error.status}: \${error.message}\`);
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error("An unknown error occurred");
  }
}`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Zod Integration */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Zod Integration</h2>
        <p className="text-muted-foreground">
          Zod provides runtime validation and TypeScript types from a single source:
        </p>
        <CodeBlock language="typescript" title="Schema + Types">
{`import { z } from "zod";

// Define schema once
export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean(),
});

// Infer TypeScript type from schema
export type LoginFormData = z.infer<typeof loginSchema>;
// Equivalent to:
// {
//   email: string;
//   password: string;
//   rememberMe: boolean;
// }

// Use in form
const form = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
});`}
        </CodeBlock>
        <Alert>
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Single Source of Truth</AlertTitle>
          <AlertDescription>
            When you update the Zod schema, the TypeScript type updates automatically.
            No more keeping types and validation in sync manually.
          </AlertDescription>
        </Alert>
      </section>

      <Separator />

      {/* Best Practices */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Best Practices</h2>

        <div className="space-y-4">
          <BestPractice
            title="Never use 'any'"
            description="Use 'unknown' for truly unknown types, then narrow with type guards."
            good="catch (error: unknown) { if (error instanceof Error) ... }"
            bad="catch (error: any) { console.log(error.message) }"
          />

          <BestPractice
            title="Prefer interfaces for objects"
            description="Interfaces are more performant and can be extended."
            good="interface User { id: string; name: string; }"
            bad="type User = { id: string; name: string; }"
          />

          <BestPractice
            title="Use const assertions for literals"
            description="Preserve literal types with 'as const'."
            good={`const ROLES = ["admin", "user"] as const;`}
            bad={`const ROLES = ["admin", "user"]; // string[]`}
          />

          <BestPractice
            title="Type function returns explicitly"
            description="Make return types explicit for public APIs."
            good="function getUser(id: string): Promise<User | null>"
            bad="function getUser(id: string) { return fetch(...) }"
          />
        </div>
      </section>

      <Separator />

      {/* Running Type Check */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Type Checking</h2>
        <p className="text-muted-foreground">
          Run the type checker to ensure your code is type-safe:
        </p>
        <CodeBlock language="bash" title="Terminal">
{`# Check for type errors
npm run type-check

# Watch mode during development
npx tsc --watch --noEmit`}
        </CodeBlock>
      </section>

      {/* Next Steps */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Next Steps</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/docs/styling">
              Styling & Theming
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

/** Best practice comparison */
function BestPractice({
  title,
  description,
  good,
  bad,
}: {
  title: string;
  description: string;
  good: string;
  bad: string;
}) {
  return (
    <div className="rounded-lg border border-border p-4">
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-muted-foreground mt-1 mb-3">{description}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded bg-green-500/10 p-2">
          <span className="text-xs font-medium text-green-600 dark:text-green-400">✓ Good</span>
          <code className="block text-xs mt-1 text-green-700 dark:text-green-300">{good}</code>
        </div>
        <div className="rounded bg-red-500/10 p-2">
          <span className="text-xs font-medium text-red-600 dark:text-red-400">✗ Avoid</span>
          <code className="block text-xs mt-1 text-red-700 dark:text-red-300">{bad}</code>
        </div>
      </div>
    </div>
  );
}

