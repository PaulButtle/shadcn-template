/**
 * API Services Documentation Page
 *
 * Guide to the API client and service layer.
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
  title: "API Services",
  description:
    "Learn how to use the typed API client in ShadCN Template. Make HTTP requests, handle errors, and manage responses.",
};

/**
 * API services documentation page
 */
export default function ApiPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">API Services</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          A type-safe HTTP client for making API requests with built-in error
          handling, timeouts, and authentication.
        </p>
      </div>

      {/* Overview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Quick Start</h2>
        <CodeBlock language="tsx" title="Basic Usage">
{`import { api } from "@/services/api";

// GET request
const users = await api.get<User[]>("/users");

// POST request
const newUser = await api.post<User>("/users", {
  name: "John Doe",
  email: "john@example.com",
});

// PUT request
const updated = await api.put<User>("/users/1", { name: "Jane Doe" });

// PATCH request
const patched = await api.patch<User>("/users/1", { name: "Jane" });

// DELETE request
await api.delete("/users/1");`}
        </CodeBlock>
      </section>

      <Separator />

      {/* API Client Methods */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">API Client Methods</h2>
        <PropsTable
          props={[
            {
              name: "api.get<T>",
              type: "(endpoint, options?) => Promise<T>",
              description: "Make a GET request",
            },
            {
              name: "api.post<T>",
              type: "(endpoint, data?, options?) => Promise<T>",
              description: "Make a POST request",
            },
            {
              name: "api.put<T>",
              type: "(endpoint, data?, options?) => Promise<T>",
              description: "Make a PUT request",
            },
            {
              name: "api.patch<T>",
              type: "(endpoint, data?, options?) => Promise<T>",
              description: "Make a PATCH request",
            },
            {
              name: "api.delete<T>",
              type: "(endpoint, options?) => Promise<T>",
              description: "Make a DELETE request",
            },
          ]}
        />
      </section>

      <Separator />

      {/* Request Options */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Request Options</h2>
        <CodeBlock language="typescript" title="RequestOptions Interface">
{`interface RequestOptions extends Omit<RequestInit, "method" | "body"> {
  /** Query parameters to append to the URL */
  params?: Record<string, string | number | boolean | undefined>;
  /** Request timeout in milliseconds (default: 10000) */
  timeout?: number;
  /** Custom headers */
  headers?: HeadersInit;
  /** Caching strategy */
  cache?: RequestCache;
}`}
        </CodeBlock>
        <CodeBlock language="tsx" title="Using Options">
{`// With query parameters
const users = await api.get<User[]>("/users", {
  params: {
    page: 1,
    limit: 10,
    status: "active",
  },
});
// GET /users?page=1&limit=10&status=active

// With custom timeout
const data = await api.get("/slow-endpoint", {
  timeout: 30000, // 30 seconds
});

// With custom headers
const result = await api.post("/endpoint", data, {
  headers: {
    "X-Custom-Header": "value",
  },
});

// With cache control
const cached = await api.get("/data", {
  cache: "force-cache",
});`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Error Handling */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Error Handling</h2>
        <p className="text-muted-foreground">
          The API client throws <code>ApiError</code> for failed requests:
        </p>
        <CodeBlock language="typescript" title="ApiError Class">
{`export class ApiError extends Error {
  constructor(
    message: string,        // Error message
    public status: number,  // HTTP status code (0 for network errors)
    public data?: unknown   // Response body if available
  ) {
    super(message);
    this.name = "ApiError";
  }
}`}
        </CodeBlock>
        <CodeBlock language="tsx" title="Error Handling Example">
{`import { api, ApiError } from "@/services/api";
import { toast } from "sonner";

async function createUser(data: CreateUserData) {
  try {
    const user = await api.post<User>("/users", data);
    toast.success("User created!");
    return user;
  } catch (error) {
    if (error instanceof ApiError) {
      // Handle specific status codes
      switch (error.status) {
        case 400:
          toast.error("Invalid data provided");
          break;
        case 401:
          toast.error("Please log in again");
          // Redirect to login
          break;
        case 403:
          toast.error("You don't have permission");
          break;
        case 404:
          toast.error("Resource not found");
          break;
        case 409:
          toast.error("User already exists");
          break;
        case 408:
          toast.error("Request timed out");
          break;
        case 500:
          toast.error("Server error. Please try again.");
          break;
        default:
          toast.error(error.message);
      }
    } else {
      // Network error or unexpected error
      toast.error("Network error. Check your connection.");
    }
    return null;
  }
}`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Response Wrapper */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Response Wrapper</h2>
        <p className="text-muted-foreground">
          Use <code>withApiResponse</code> for standardised response handling:
        </p>
        <CodeBlock language="tsx" title="withApiResponse">
{`import { api, withApiResponse } from "@/services/api";

// Without wrapper - throws on error
const user = await api.get<User>("/users/1");

// With wrapper - returns success/error object
const result = await withApiResponse(api.get<User>("/users/1"));

if (result.success) {
  console.log(result.data); // User object
} else {
  console.log(result.error); // Error message
  console.log(result.message); // "Error 404: User not found"
}

// The ApiResponse type:
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Authentication */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Authentication</h2>
        <p className="text-muted-foreground">
          The API client automatically includes auth headers when a token is present:
        </p>
        <CodeBlock language="typescript" title="Auth Headers">
{`// The API client checks localStorage for auth token
function getAuthHeaders(): HeadersInit {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("auth_token");
    if (token) {
      return { Authorization: \`Bearer \${token}\` };
    }
  }
  return {};
}

// Headers are merged with each request:
// {
//   "Content-Type": "application/json",
//   "Authorization": "Bearer <token>",
//   ...customHeaders
// }`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Configuration */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Configuration</h2>
        <p className="text-muted-foreground">
          Configure the API client in <code>src/services/api.ts</code>:
        </p>
        <CodeBlock language="typescript" title="Configuration">
{`// Base URL for API requests
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";

// Default request timeout (10 seconds)
const DEFAULT_TIMEOUT = 10000;

// To change these, either:
// 1. Set NEXT_PUBLIC_API_URL in your .env file
// 2. Modify the constants in api.ts`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Creating API Services */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Creating API Services</h2>
        <p className="text-muted-foreground">
          For complex applications, create service modules for each resource:
        </p>
        <CodeBlock language="typescript" title="src/services/users.ts">
{`import { api, withApiResponse } from "./api";
import type { User, PaginatedResponse, ApiResponse } from "@/types";

interface CreateUserData {
  name: string;
  email: string;
  role: "admin" | "user" | "viewer";
}

interface UpdateUserData {
  name?: string;
  email?: string;
  role?: "admin" | "user" | "viewer";
}

interface UserFilters {
  page?: number;
  limit?: number;
  role?: string;
  status?: string;
  search?: string;
}

/**
 * User API service
 */
export const usersService = {
  /**
   * Get paginated list of users
   */
  async list(filters: UserFilters = {}): Promise<ApiResponse<PaginatedResponse<User>>> {
    return withApiResponse(
      api.get<PaginatedResponse<User>>("/users", { params: filters })
    );
  },

  /**
   * Get a single user by ID
   */
  async getById(id: string): Promise<ApiResponse<User>> {
    return withApiResponse(api.get<User>(\`/users/\${id}\`));
  },

  /**
   * Create a new user
   */
  async create(data: CreateUserData): Promise<ApiResponse<User>> {
    return withApiResponse(api.post<User>("/users", data));
  },

  /**
   * Update an existing user
   */
  async update(id: string, data: UpdateUserData): Promise<ApiResponse<User>> {
    return withApiResponse(api.patch<User>(\`/users/\${id}\`, data));
  },

  /**
   * Delete a user
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    return withApiResponse(api.delete(\`/users/\${id}\`));
  },
};`}
        </CodeBlock>
        <CodeBlock language="tsx" title="Using the Service">
{`import { usersService } from "@/services/users";

// In a component
async function loadUsers() {
  const result = await usersService.list({
    page: 1,
    limit: 10,
    status: "active",
  });

  if (result.success) {
    setUsers(result.data.items);
    setTotalPages(result.data.totalPages);
  } else {
    toast.error(result.error);
  }
}`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Server Actions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Server Actions</h2>
        <p className="text-muted-foreground">
          For data mutations, consider using Next.js Server Actions:
        </p>
        <CodeBlock language="typescript" title="Server Action Example">
{`// app/actions/users.ts
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

export async function createUser(formData: FormData) {
  const data = createUserSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
  });

  // Create user in database
  const user = await db.user.create({ data });

  // Revalidate the users page
  revalidatePath("/users");

  return { success: true, data: user };
}

// Usage in component
import { createUser } from "@/app/actions/users";

<form action={createUser}>
  <Input name="name" />
  <Input name="email" />
  <Button type="submit">Create</Button>
</form>`}
        </CodeBlock>
      </section>

      {/* Next Steps */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Next Steps</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/docs/deployment">
              Deployment
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

