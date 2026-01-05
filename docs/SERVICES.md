# API Services

This template includes a typed API service layer for making HTTP requests.

## Usage

### Basic Requests

```tsx
import { api } from "@/services";

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
await api.delete("/users/1");
```

### With Query Parameters

```tsx
const users = await api.get<User[]>("/users", {
  params: {
    page: 1,
    limit: 10,
    search: "john",
  },
});
// Results in: /users?page=1&limit=10&search=john
```

### With Custom Options

```tsx
const data = await api.get<Data>("/data", {
  headers: {
    "X-Custom-Header": "value",
  },
  timeout: 5000, // 5 seconds
  cache: "no-store",
});
```

## Error Handling

### Using try/catch

```tsx
import { api, ApiError } from "@/services";

try {
  const user = await api.get<User>("/users/1");
  console.log(user);
} catch (error) {
  if (error instanceof ApiError) {
    console.error(`API Error ${error.status}: ${error.message}`);
    // Handle specific status codes
    if (error.status === 404) {
      // Not found
    } else if (error.status === 401) {
      // Unauthorized - redirect to login
    }
  }
}
```

### Using withApiResponse

For a more functional approach with standardised responses:

```tsx
import { api, withApiResponse } from "@/services";

const result = await withApiResponse(api.get<User>("/users/1"));

if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error);
}
```

## Configuration

### Base URL

Update the base URL in `src/services/api.ts`:

```tsx
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";
```

### Authentication

The API client automatically includes auth headers. Update `getAuthHeaders()`:

```tsx
function getAuthHeaders(): HeadersInit {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("auth_token");
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
  }
  return {};
}
```

### Timeout

Default timeout is 10 seconds. Override per-request:

```tsx
const data = await api.get("/slow-endpoint", { timeout: 30000 });
```

## TypeScript Types

All API methods are generic:

```tsx
interface User {
  id: string;
  name: string;
  email: string;
}

// Type-safe response
const user = await api.get<User>("/users/1");
// user is typed as User

const users = await api.get<User[]>("/users");
// users is typed as User[]
```

## Creating Service Modules

For larger applications, create domain-specific service modules:

```tsx
// src/services/users.ts
import { api } from "./api";
import type { User } from "@/types";

export const usersService = {
  getAll: () => api.get<User[]>("/users"),
  getById: (id: string) => api.get<User>(`/users/${id}`),
  create: (data: Omit<User, "id">) => api.post<User>("/users", data),
  update: (id: string, data: Partial<User>) => api.patch<User>(`/users/${id}`, data),
  delete: (id: string) => api.delete(`/users/${id}`),
};
```

Then use:

```tsx
import { usersService } from "@/services/users";

const users = await usersService.getAll();
const user = await usersService.getById("1");
```

## Integration with React Query

The API service works well with TanStack Query:

```tsx
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/services";

function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => api.get<User[]>("/users"),
  });
}

function useCreateUser() {
  return useMutation({
    mutationFn: (data: CreateUserData) => api.post<User>("/users", data),
  });
}
```

