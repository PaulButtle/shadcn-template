/**
 * Authentication Documentation Page
 *
 * Guide to the authentication system and protected routes.
 *
 * @component
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, AlertCircle, Shield, Lock, User, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata: Metadata = {
  title: "Authentication",
  description:
    "Learn how the authentication system works in ShadCN Template. Protect routes, manage sessions, and integrate with auth providers.",
};

/**
 * Authentication documentation page
 */
export default function AuthenticationPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Authentication</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          The template includes a complete authentication system with login,
          registration, password recovery, and protected routes.
        </p>
      </div>

      {/* Overview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Demo Implementation</AlertTitle>
          <AlertDescription>
            The authentication system is a <strong>mock implementation</strong> for
            demonstration. It uses React Context and localStorage to simulate user
            sessions. For production, integrate with your preferred auth provider.
          </AlertDescription>
        </Alert>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-6">
          <FeatureCard
            icon={<User className="h-5 w-5" />}
            title="Login"
            description="Email & password authentication"
          />
          <FeatureCard
            icon={<Key className="h-5 w-5" />}
            title="Registration"
            description="New user signup with validation"
          />
          <FeatureCard
            icon={<Lock className="h-5 w-5" />}
            title="Protected Routes"
            description="Automatic redirect for guests"
          />
          <FeatureCard
            icon={<Shield className="h-5 w-5" />}
            title="Session Persistence"
            description="Remember me functionality"
          />
        </div>
      </section>

      <Separator />

      {/* Auth Context */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Auth Context</h2>
        <p className="text-muted-foreground">
          Authentication state is managed by the <code>AuthProvider</code> context.
          Access it anywhere with the <code>useAuth</code> hook:
        </p>
        <CodeBlock language="tsx" title="Using useAuth">
{`import { useAuth } from "@/stores/auth-context";

function ProfilePage() {
  const {
    user,           // Current user or null
    isAuthenticated, // Boolean
    isLoading,       // True during auth check
    login,           // (credentials) => Promise<boolean>
    logout,          // () => void
    register,        // (data) => Promise<boolean>
    updateUser,      // (updates) => void
  } = useAuth();

  if (isLoading) return <Spinner />;
  if (!isAuthenticated) return <Redirect to="/login" />;

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <Button onClick={logout}>Log out</Button>
    </div>
  );
}`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Protected Routes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Protected Routes</h2>
        <p className="text-muted-foreground">
          Use the <code>ProtectedRoute</code> component to restrict access:
        </p>
        <CodeBlock language="tsx" title="ProtectedRoute Component">
{`import { ProtectedRoute } from "@/components/auth";

// In a layout or page
function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute redirectTo="/login">
      <DashboardShell>
        {children}
      </DashboardShell>
    </ProtectedRoute>
  );
}

// The ProtectedRoute component:
// 1. Shows loading spinner while checking auth
// 2. Redirects to login if not authenticated
// 3. Preserves the intended destination in the URL
// 4. Renders children when authenticated`}
        </CodeBlock>
        <p className="text-sm text-muted-foreground">
          The redirect URL includes a <code>redirect</code> query parameter so users
          return to their intended page after logging in.
        </p>
      </section>

      <Separator />

      {/* Login Flow */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Login Flow</h2>
        <CodeBlock language="tsx" title="Login Implementation">
{`// In LoginForm component
const { login } = useAuth();
const router = useRouter();
const searchParams = useSearchParams();

const onSubmit = async (data: LoginFormData) => {
  try {
    const success = await login({
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
    });

    if (success) {
      toast.success("Welcome back!");
      
      // Redirect to intended destination or dashboard
      const redirect = searchParams.get("redirect") || "/dashboard";
      router.push(redirect);
    } else {
      toast.error("Invalid credentials");
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
};`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Registration Flow */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Registration Flow</h2>
        <p className="text-muted-foreground">
          The registration form includes password strength indication and terms
          acceptance:
        </p>
        <CodeBlock language="tsx" title="Registration Schema">
{`// src/schemas/auth.ts
export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });`}
        </CodeBlock>
        <CodeBlock language="tsx" title="Password Strength Helper">
{`// src/schemas/auth.ts
export function checkPasswordStrength(password: string) {
  return {
    hasMinLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*]/.test(password),
  };
}

export function getPasswordStrengthScore(password: string): number {
  const strength = checkPasswordStrength(password);
  return Object.values(strength).filter(Boolean).length;
}`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Session Persistence */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Session Persistence</h2>
        <p className="text-muted-foreground">
          The auth context persists sessions to localStorage:
        </p>
        <CodeBlock language="tsx" title="Session Persistence">
{`// In AuthProvider

// Restore session on mount
useEffect(() => {
  const restoreSession = () => {
    try {
      const stored = localStorage.getItem("auth_user");
      if (stored) {
        const user = JSON.parse(stored);
        // Restore Date objects
        user.createdAt = new Date(user.createdAt);
        user.updatedAt = new Date(user.updatedAt);
        setUser(user);
      }
    } catch (error) {
      localStorage.removeItem("auth_user");
    } finally {
      setIsLoading(false);
    }
  };
  restoreSession();
}, []);

// Persist user changes
useEffect(() => {
  if (user) {
    localStorage.setItem("auth_user", JSON.stringify(user));
  } else {
    localStorage.removeItem("auth_user");
  }
}, [user]);`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Integration Guide */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Production Integration</h2>
        <p className="text-muted-foreground">
          To integrate with a real authentication provider, modify the auth context:
        </p>

        <h3 className="text-xl font-semibold mt-6">NextAuth.js</h3>
        <CodeBlock language="tsx" title="NextAuth.js Integration">
{`// Install: npm install next-auth

// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        // Verify credentials against your database
        const user = await verifyUser(credentials);
        return user;
      },
    }),
  ],
});

export { handler as GET, handler as POST };

// Usage in components
import { useSession, signIn, signOut } from "next-auth/react";

function LoginButton() {
  const { data: session } = useSession();
  
  if (session) {
    return <Button onClick={() => signOut()}>Sign out</Button>;
  }
  return <Button onClick={() => signIn()}>Sign in</Button>;
}`}
        </CodeBlock>

        <h3 className="text-xl font-semibold mt-6">Clerk</h3>
        <CodeBlock language="tsx" title="Clerk Integration">
{`// Install: npm install @clerk/nextjs

// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";
export default clerkMiddleware();

// In components
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";

function Header() {
  const { isSignedIn, user } = useUser();

  return (
    <header>
      {isSignedIn ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <SignInButton mode="modal">
          <Button>Sign in</Button>
        </SignInButton>
      )}
    </header>
  );
}`}
        </CodeBlock>

        <h3 className="text-xl font-semibold mt-6">Supabase Auth</h3>
        <CodeBlock language="tsx" title="Supabase Integration">
{`// Install: npm install @supabase/supabase-js @supabase/ssr

// lib/supabase.ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Usage
const supabase = createClient();

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});

// Sign out
await supabase.auth.signOut();

// Get user
const { data: { user } } = await supabase.auth.getUser();`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Security Considerations */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Security Considerations</h2>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            The demo implementation stores the user object in localStorage, which
            is vulnerable to XSS attacks. For production, use httpOnly cookies
            and proper session management.
          </AlertDescription>
        </Alert>

        <div className="space-y-4 mt-6">
          <SecurityTip
            title="Use httpOnly cookies"
            description="Store session tokens in httpOnly cookies instead of localStorage"
          />
          <SecurityTip
            title="Implement CSRF protection"
            description="Add CSRF tokens to forms and validate on the server"
          />
          <SecurityTip
            title="Rate limit auth endpoints"
            description="Prevent brute force attacks with rate limiting"
          />
          <SecurityTip
            title="Validate on the server"
            description="Never trust client-side validation alone"
          />
          <SecurityTip
            title="Use HTTPS"
            description="Always use HTTPS in production"
          />
        </div>
      </section>

      {/* Next Steps */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Next Steps</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/docs/api">
              API Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/deployment">
              Deployment
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

/** Feature card */
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="rounded-lg bg-primary/10 p-2 text-primary w-fit">
        {icon}
      </div>
      <h3 className="font-medium mt-3">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

/** Security tip */
function SecurityTip({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Shield className="h-5 w-5 text-primary mt-0.5" />
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

