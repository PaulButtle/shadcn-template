/**
 * Custom Hooks Documentation Page
 *
 * Documentation for all custom React hooks in the template.
 *
 * @component
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/docs/code-block";
import { PropsTable } from "@/components/docs/props-table";

export const metadata: Metadata = {
  title: "Custom Hooks",
  description:
    "Explore the custom React hooks in ShadCN Template. Hooks for localStorage, media queries, debouncing, and more.",
};

/**
 * Custom hooks documentation page
 */
export default function HooksPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Custom Hooks</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Reusable hooks for common patterns. All hooks are SSR-safe and
          TypeScript-first.
        </p>
      </div>

      {/* Overview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Available Hooks</h2>
        <p className="text-muted-foreground">
          Import hooks from <code>@/hooks</code>:
        </p>
        <CodeBlock language="tsx" title="Importing Hooks">
{`import {
  useLocalStorage,
  useMediaQuery,
  useIsMobile,
  useDebounce,
  useDebouncedCallback,
  useCopyToClipboard,
  usePrefersReducedMotion,
  usePrefersDarkMode,
} from "@/hooks";`}
        </CodeBlock>
      </section>

      <Separator />

      {/* useLocalStorage */}
      <HookSection
        name="useLocalStorage"
        description="Persist state to localStorage with SSR support and optional Zod validation. Uses useSyncExternalStore for proper React 18+ compatibility."
        signature="useLocalStorage<T>(key: string, initialValue: T, schema?: ZodType<T>)"
        returns="[T, (value: T | ((prev: T) => T)) => void, () => void]"
        example={`// Basic usage
const [theme, setTheme] = useLocalStorage("theme", "light");

// With Zod validation
import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const [user, setUser, removeUser] = useLocalStorage(
  "user",
  null,
  userSchema.nullable()
);

// Functional updates
setTheme((prev) => prev === "light" ? "dark" : "light");

// Remove from localStorage
removeUser();`}
        features={[
          "SSR-safe with useSyncExternalStore",
          "Automatic JSON serialisation",
          "Cross-tab synchronisation",
          "Optional Zod schema validation",
          "Functional updates support",
        ]}
      />

      <Separator />

      {/* useMediaQuery */}
      <HookSection
        name="useMediaQuery"
        description="Track CSS media query matches with SSR support. Perfect for responsive design logic."
        signature="useMediaQuery(query: string)"
        returns="boolean"
        example={`// Custom query
const isDesktop = useMediaQuery("(min-width: 1024px)");

// Prefer reduced motion
const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

// Conditional rendering
function Hero() {
  const isMobile = useMediaQuery("(max-width: 639px)");
  
  return isMobile ? <MobileHero /> : <DesktopHero />;
}`}
        features={[
          "SSR-safe (returns false on server)",
          "Real-time updates on viewport changes",
          "Modern matchMedia API with fallback",
        ]}
      />

      <Separator />

      {/* Breakpoint Hooks */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Breakpoint Hooks</h2>
        <p className="text-muted-foreground">
          Pre-configured hooks for common Tailwind breakpoints:
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium">Hook</th>
                <th className="text-left p-3 font-medium">Query</th>
                <th className="text-left p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <BreakpointRow hook="useIsMobile()" query="max-width: 639px" desc="Below sm breakpoint" />
              <BreakpointRow hook="useIsSmall()" query="min-width: 640px" desc="sm and above" />
              <BreakpointRow hook="useIsMedium()" query="min-width: 768px" desc="md and above" />
              <BreakpointRow hook="useIsLarge()" query="min-width: 1024px" desc="lg and above" />
              <BreakpointRow hook="useIsExtraLarge()" query="min-width: 1280px" desc="xl and above" />
              <BreakpointRow hook="usePrefersReducedMotion()" query="prefers-reduced-motion" desc="Accessibility" />
              <BreakpointRow hook="usePrefersDarkMode()" query="prefers-color-scheme: dark" desc="System theme" />
            </tbody>
          </table>
        </div>
        <CodeBlock language="tsx" title="Breakpoint Hooks Example">
{`import { useIsMobile, usePrefersReducedMotion } from "@/hooks";

function AnimatedComponent() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  
  // Disable animations on mobile or when user prefers reduced motion
  const shouldAnimate = !isMobile && !prefersReducedMotion;
  
  return (
    <motion.div
      animate={{ opacity: 1 }}
      transition={{ duration: shouldAnimate ? 0.3 : 0 }}
    >
      Content
    </motion.div>
  );
}`}
        </CodeBlock>
      </section>

      <Separator />

      {/* useDebounce */}
      <HookSection
        name="useDebounce"
        description="Debounce a value, delaying updates until after a specified delay. Perfect for search inputs and expensive operations."
        signature="useDebounce<T>(value: T, delay?: number)"
        returns="T"
        example={`import { useDebounce } from "@/hooks";

function SearchInput() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  // Only fetch when debounced value changes
  useEffect(() => {
    if (debouncedSearch) {
      fetchSearchResults(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <Input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search..."
    />
  );
}`}
        features={[
          "Configurable delay (default: 500ms)",
          "Generic type support",
          "Automatic cleanup on unmount",
        ]}
      />

      <Separator />

      {/* useDebouncedCallback */}
      <HookSection
        name="useDebouncedCallback"
        description="Create a debounced callback function. Use this when you need to debounce a function rather than a value."
        signature="useDebouncedCallback<T extends Function>(callback: T, delay?: number)"
        returns="(...args: Parameters<T>) => void"
        example={`import { useDebouncedCallback } from "@/hooks";

function AutoSaveForm() {
  // Debounce the save function
  const debouncedSave = useDebouncedCallback(
    async (data: FormData) => {
      await saveToServer(data);
      toast.success("Saved!");
    },
    1000
  );

  return (
    <Form>
      <Input
        name="title"
        onChange={(e) => {
          debouncedSave({ title: e.target.value });
        }}
      />
    </Form>
  );
}`}
        features={[
          "Preserves callback identity",
          "Proper cleanup on unmount",
          "Type-safe with generics",
        ]}
      />

      <Separator />

      {/* useCopyToClipboard */}
      <HookSection
        name="useCopyToClipboard"
        description="Copy text to clipboard with success/error state tracking. Uses the modern Clipboard API with fallback for older browsers."
        signature="useCopyToClipboard(resetDelay?: number)"
        returns="{ copy: (text: string) => Promise<boolean>, copied: boolean, error: string | null, reset: () => void }"
        example={`import { useCopyToClipboard } from "@/hooks";

function CopyButton({ text }: { text: string }) {
  const { copy, copied, error } = useCopyToClipboard(2000);

  return (
    <Button
      onClick={() => copy(text)}
      variant={copied ? "secondary" : "outline"}
    >
      {copied ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="mr-2 h-4 w-4" />
          Copy
        </>
      )}
    </Button>
  );
}`}
        features={[
          "Modern Clipboard API",
          "Fallback for older browsers",
          "Auto-reset after delay",
          "Error state tracking",
        ]}
      />

      <Separator />

      {/* useAuth */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">useAuth</h2>
        <p className="text-muted-foreground">
          Access authentication state and methods. This hook is provided by the
          AuthProvider context.
        </p>
        <CodeBlock language="tsx" title="useAuth Example">
{`import { useAuth } from "@/stores/auth-context";

function UserMenu() {
  const { user, isAuthenticated, isLoading, login, logout, updateUser } = useAuth();

  if (isLoading) return <Spinner />;
  if (!isAuthenticated) return <LoginButton />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user.avatarUrl} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={logout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`}
        </CodeBlock>
        <PropsTable
          props={[
            { name: "user", type: "User | null", description: "Current authenticated user" },
            { name: "isAuthenticated", type: "boolean", description: "Whether user is logged in" },
            { name: "isLoading", type: "boolean", description: "Auth state loading" },
            { name: "login", type: "(credentials) => Promise<boolean>", description: "Log in user" },
            { name: "logout", type: "() => void", description: "Log out user" },
            { name: "register", type: "(data) => Promise<boolean>", description: "Register new user" },
            { name: "updateUser", type: "(updates) => void", description: "Update user profile" },
          ]}
        />
      </section>

      <Separator />

      {/* Creating Custom Hooks */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Creating Custom Hooks</h2>
        <p className="text-muted-foreground">
          Follow these patterns when creating your own hooks:
        </p>
        <CodeBlock language="tsx" title="Custom Hook Template">
{`"use client";

/**
 * useCustomHook
 *
 * Description of what this hook does.
 *
 * @param param - Description
 * @returns Description of return value
 *
 * @example
 * \`\`\`tsx
 * const value = useCustomHook(param);
 * \`\`\`
 */

import { useState, useCallback, useEffect } from "react";

interface UseCustomHookReturn {
  data: Data | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useCustomHook(param: string): UseCustomHookReturn {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.get(\`/endpoint/\${param}\`);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, [param]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}`}
        </CodeBlock>
      </section>

      {/* Next Steps */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Next Steps</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/docs/forms">
              Forms & Validation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/authentication">
              Authentication
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

/** Hook documentation section */
function HookSection({
  name,
  description,
  signature,
  returns,
  example,
  features,
}: {
  name: string;
  description: string;
  signature: string;
  returns: string;
  example: string;
  features: string[];
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">{name}</h2>
      <p className="text-muted-foreground">{description}</p>

      <div className="rounded-lg border border-border p-4 bg-muted/30">
        <h4 className="text-sm font-medium mb-2">Signature</h4>
        <code className="text-sm text-primary">{signature}</code>
        <h4 className="text-sm font-medium mt-4 mb-2">Returns</h4>
        <code className="text-sm">{returns}</code>
      </div>

      <CodeBlock language="tsx" title="Example">
        {example}
      </CodeBlock>

      <div className="rounded-lg border border-border p-4">
        <h4 className="font-medium mb-2">Features</h4>
        <ul className="space-y-1">
          {features.map((feature) => (
            <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Breakpoint table row */
function BreakpointRow({
  hook,
  query,
  desc,
}: {
  hook: string;
  query: string;
  desc: string;
}) {
  return (
    <tr className="border-t border-border">
      <td className="p-3 font-mono text-sm text-primary">{hook}</td>
      <td className="p-3 font-mono text-xs text-muted-foreground">{query}</td>
      <td className="p-3 text-sm text-muted-foreground">{desc}</td>
    </tr>
  );
}

