# Architecture Overview

This document explains the architectural decisions and patterns used in this template.

## Application Structure

### Route Groups

The application uses Next.js App Router with route groups to organise pages:

```
app/
├── (auth)/           # Authentication pages - shared auth layout
├── (dashboard)/      # Protected dashboard pages - shared dashboard layout
└── (marketing)/      # Public marketing pages - shared marketing layout
```

Route groups (folders with parentheses) allow sharing layouts without affecting the URL structure.

### Data Flow

```
┌─────────────────────────────────────────────────────────────┐
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
└─────────────────────────────────────────────────────────────┘
```

## Component Organisation

### Component Categories

1. **UI Components** (`components/ui/`)
   - ShadCN components (Button, Card, Input, etc.)
   - Low-level, highly reusable
   - No business logic

2. **Feature Components** (`components/landing/`, `components/dashboard/`, `components/auth/`)
   - Feature-specific components
   - May contain business logic
   - Compose UI components

3. **Shared Components** (`components/shared/`)
   - Cross-feature components (Logo, ThemeToggle, Container)
   - Used throughout the application
   - No feature-specific logic

4. **Provider Components** (`components/providers/`)
   - Context providers (ThemeProvider)
   - Wrap the application

### Component Patterns

#### Client vs Server Components

```typescript
// Server Component (default) - Can fetch data, no hooks
export function StaticContent() {
  return <div>Static content</div>;
}

// Client Component - Required for interactivity
"use client";
export function InteractiveComponent() {
  const [state, setState] = useState();
  return <button onClick={() => setState()}>Click</button>;
}
```

#### Composition Pattern

```typescript
// Parent component provides structure
function Card({ children }) {
  return <div className="card">{children}</div>;
}

// Child components handle specific areas
Card.Header = function CardHeader({ children }) {
  return <div className="card-header">{children}</div>;
};

Card.Content = function CardContent({ children }) {
  return <div className="card-content">{children}</div>;
};
```

## State Management

### Auth Context

The authentication state is managed via React Context:

```typescript
// stores/auth-context.tsx
interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  register: (data: RegisterData) => Promise<boolean>;
  updateUser: (updates: Partial<User>) => void;
}
```

**Key Features:**
- Session persistence via localStorage
- Loading state for async operations
- Type-safe with TypeScript

### Theme State

Theme preference is managed by `next-themes`:

```typescript
// Usage in components
const { theme, setTheme } = useTheme();
```

**Features:**
- System preference detection
- Manual override
- No flash of incorrect theme

### Local Component State

For component-specific state, use React hooks:

```typescript
// Simple state
const [isOpen, setIsOpen] = useState(false);

// Complex state
const [state, dispatch] = useReducer(reducer, initialState);

// Derived state
const filteredItems = useMemo(
  () => items.filter(item => item.active),
  [items]
);
```

## Type System

### Type Organisation

All types are centralised in `types/index.ts`:

```typescript
// User types
interface User { ... }
type UserRole = "admin" | "user" | "viewer";

// Feature types
interface StatCard { ... }
interface Notification { ... }

// API types
interface ApiResponse<T> { ... }
interface PaginatedResponse<T> { ... }
```

### Type Safety Patterns

```typescript
// Props with required and optional fields
interface ComponentProps {
  required: string;
  optional?: number;
  children: React.ReactNode;
}

// Discriminated unions for state
type LoadingState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: Data }
  | { status: "error"; error: Error };

// Strict function return types
const fetchData = async (): Promise<Data | null> => { ... };
```

## Styling Architecture

### Tailwind CSS

The template uses Tailwind CSS v4 with CSS custom properties:

```css
/* globals.css */
:root {
  --primary: oklch(0.55 0.15 160);
  --background: oklch(0.985 0.002 90);
}

.dark {
  --primary: oklch(0.7 0.18 160);
  --background: oklch(0.13 0.02 260);
}
```

### Component Styling

```typescript
// Using cn() for conditional classes
import { cn } from "@/lib/utils";

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className // Allow override
)} />
```

### Responsive Design

Mobile-first approach:

```tsx
<div className="
  w-full          // Mobile default
  sm:w-1/2        // Small screens
  md:w-1/3        // Medium screens
  lg:w-1/4        // Large screens
"/>
```

## Form Handling

### React Hook Form + Zod

```typescript
// Define schema
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Create form
const form = useForm<z.infer<typeof schema>>({
  resolver: zodResolver(schema),
  defaultValues: { email: "", password: "" },
});

// Handle submission
const onSubmit = async (data) => { ... };
```

## Data Fetching (Future)

The template is prepared for data fetching patterns:

### Server Components

```typescript
// app/(dashboard)/users/page.tsx
async function UsersPage() {
  const users = await fetchUsers();
  return <UsersTable data={users} />;
}
```

### Client-Side with React Query

```typescript
// hooks/use-users.ts
export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
}
```

## Security Considerations

### Client-Side Validation

All forms use Zod for validation, but remember:
- Client validation is for UX
- Always validate on the server

### Protected Routes

The `ProtectedRoute` component handles:
- Redirect to login if unauthenticated
- Loading state during auth check
- Preserving intended destination

### Environment Variables

```env
# .env.local (not committed)
DATABASE_URL=...
JWT_SECRET=...
```

Access in code:
```typescript
const dbUrl = process.env.DATABASE_URL;
```

## Performance Optimisations

### Code Splitting

- Route-based splitting (automatic with App Router)
- Dynamic imports for heavy components

```typescript
const HeavyChart = dynamic(() => import("./HeavyChart"), {
  loading: () => <Skeleton />,
});
```

### Memoisation

```typescript
// Memoize expensive computations
const filteredData = useMemo(() => 
  data.filter(complexFilter), 
  [data]
);

// Memoize callbacks
const handleClick = useCallback(() => {
  // handler logic
}, [dependencies]);

// Memoize components
const MemoizedComponent = React.memo(Component);
```

### Image Optimisation

Use Next.js Image component:

```tsx
import Image from "next/image";

<Image
  src="/image.png"
  width={800}
  height={600}
  alt="Description"
  priority // For above-the-fold images
/>
```

## Testing Strategy (Recommendations)

### Unit Tests

```typescript
// __tests__/utils.test.ts
import { cn } from "@/lib/utils";

test("cn merges classes correctly", () => {
  expect(cn("a", "b")).toBe("a b");
  expect(cn("a", false && "b")).toBe("a");
});
```

### Component Tests

```typescript
// __tests__/components/button.test.tsx
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

test("renders button with text", () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole("button")).toHaveTextContent("Click me");
});
```

### E2E Tests

```typescript
// e2e/auth.spec.ts (Playwright)
test("user can log in", async ({ page }) => {
  await page.goto("/login");
  await page.fill('[name="email"]', "test@example.com");
  await page.fill('[name="password"]', "password123");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL("/dashboard");
});
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Deploy automatically

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

### Environment Variables

Set these in your deployment platform:
- `NEXT_PUBLIC_*` - Exposed to client
- All others - Server-only

