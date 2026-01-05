# Component Documentation

This document provides detailed API documentation for the custom components in this template.

## Shared Components

### ThemeToggle

A dropdown button for switching between light, dark, and system themes.

```tsx
import { ThemeToggle } from "@/components/shared";

<ThemeToggle />
```

**Features:**
- Hydration-safe (prevents flash)
- Shows current theme with checkmark
- Animated sun/moon icon transition

---

### Container

A responsive wrapper providing consistent max-width and padding.

```tsx
import { Container } from "@/components/shared";

<Container size="xl">
  <h1>Content</h1>
</Container>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content to render |
| `className` | `string` | - | Additional CSS classes |
| `size` | `"sm" \| "md" \| "lg" \| "xl" \| "full"` | `"xl"` | Max-width variant |
| `as` | `"div" \| "section" \| "article" \| "main"` | `"div"` | HTML element |

---

### Logo

Site logo with optional text and link wrapper.

```tsx
import { Logo } from "@/components/shared";

<Logo href="/" size="md" showText={true} />
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size variant |
| `showText` | `boolean` | `true` | Show "Acme" text |
| `href` | `string` | - | If provided, wraps in Link |

---

### LoadingSpinner

Animated loading indicator with size variants.

```tsx
import { LoadingSpinner, PageLoader, LoadingOverlay } from "@/components/shared";

<LoadingSpinner size="md" />
<PageLoader />
<LoadingOverlay />
```

**Props (LoadingSpinner):**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `size` | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | Size variant |

---

## Dashboard Components

### StatCard

Statistics display card with trend indicator.

```tsx
import { StatCard } from "@/components/dashboard";

<StatCard
  title="Total Revenue"
  value="£45,231.89"
  description="+20.1% from last month"
  trend={20.1}
  trendDirection="up"
  icon="PoundSterling"
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Card title |
| `value` | `string \| number` | - | Main metric value |
| `description` | `string` | - | Subtitle/context |
| `trend` | `number` | - | Percentage change |
| `trendDirection` | `"up" \| "down" \| "neutral"` | - | Trend direction |
| `icon` | `string` | - | Lucide icon name |
| `className` | `string` | - | Additional CSS classes |

**Available Icons:** `PoundSterling`, `Users`, `CreditCard`, `Activity`

---

### ChartCard

Wrapper card for Recharts visualisations.

```tsx
import { ChartCard } from "@/components/dashboard";

<ChartCard 
  title="Revenue" 
  description="Monthly data" 
  isLoading={false}
>
  <AreaChart data={data}>...</AreaChart>
</ChartCard>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Card title |
| `description` | `string` | - | Card description |
| `children` | `ReactNode` | - | Chart component |
| `isLoading` | `boolean` | `false` | Show skeleton |
| `className` | `string` | - | Additional CSS classes |

---

### RecentActivity

Activity feed with avatars and timestamps.

```tsx
import { RecentActivity } from "@/components/dashboard";

<RecentActivity limit={5} />
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `limit` | `number` | `5` | Max items to show |
| `className` | `string` | - | Additional CSS classes |

---

### NotificationDropdown

Notification bell with dropdown list.

```tsx
import { NotificationDropdown } from "@/components/dashboard";

<NotificationDropdown />
```

**Features:**
- Unread count badge
- Mark all as read
- Individual mark as read
- Scrollable list
- Type-based icons

---

### UsersTable

Full-featured data table for user management.

```tsx
import { UsersTable } from "@/components/dashboard/users-table";

<UsersTable data={users} />
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `UserTableData[]` | - | User data array |

**Features:**
- Column sorting
- Text filtering
- Role filtering
- Pagination
- Row selection
- Column visibility toggle
- Row actions menu

---

### Sidebar

Collapsible sidebar navigation.

```tsx
import { Sidebar } from "@/components/dashboard";

<Sidebar 
  isCollapsed={false} 
  onToggle={() => setCollapsed(!collapsed)} 
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isCollapsed` | `boolean` | - | Collapsed state |
| `onToggle` | `() => void` | - | Toggle callback |

---

### DashboardHeader

Top header with breadcrumbs and actions.

```tsx
import { DashboardHeader } from "@/components/dashboard";

<DashboardHeader />
```

**Features:**
- Dynamic breadcrumbs from route
- Search input (desktop)
- Mobile search sheet
- Theme toggle
- Notifications
- User menu

---

## Auth Components

### ProtectedRoute

Route wrapper requiring authentication.

```tsx
import { ProtectedRoute } from "@/components/auth";

<ProtectedRoute redirectTo="/login">
  <DashboardContent />
</ProtectedRoute>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Protected content |
| `redirectTo` | `string` | `"/login"` | Redirect URL |

---

### LoginForm

Email/password login form.

```tsx
import { LoginForm } from "@/components/auth";

<LoginForm />
```

**Features:**
- Email validation
- Password visibility toggle
- "Remember me" checkbox
- Forgot password link
- Social login buttons (mock)
- Loading state

---

### RegisterForm

User registration form with password strength.

```tsx
import { RegisterForm } from "@/components/auth";

<RegisterForm />
```

**Features:**
- Name, email, password fields
- Password strength indicator
- Requirements checklist
- Confirm password
- Terms acceptance
- Social signup buttons (mock)

---

### ForgotPasswordForm

Password reset request form.

```tsx
import { ForgotPasswordForm } from "@/components/auth";

<ForgotPasswordForm />
```

**Features:**
- Email validation
- Success state with resend
- Back to login link

---

## Landing Components

### Navbar

Responsive navigation with mobile drawer.

```tsx
import { Navbar } from "@/components/landing";

<Navbar />
```

**Features:**
- Sticky header
- Transparent to solid on scroll
- Desktop navigation links
- Mobile Sheet menu
- Theme toggle
- Auth buttons

---

### Hero

Hero section with animated background.

```tsx
import { Hero } from "@/components/landing";

<Hero />
```

**Features:**
- Announcement badge
- Gradient headline
- Dual CTA buttons
- Social proof avatars
- Dashboard preview mockup
- Animated gradient orbs

---

### Features

Feature showcase grid.

```tsx
import { Features } from "@/components/landing";

<Features />
```

**Uses:** `FEATURES` from constants

---

### Pricing

Three-tier pricing comparison.

```tsx
import { Pricing } from "@/components/landing";

<Pricing />
```

**Uses:** `PRICING_TIERS` from constants

**Features:**
- Popular badge
- Feature checklist
- CTA buttons

---

### Testimonials

Customer testimonials grid.

```tsx
import { Testimonials } from "@/components/landing";

<Testimonials />
```

**Uses:** `TESTIMONIALS` from constants

**Features:**
- Star ratings
- Avatar with fallback
- Quote icon

---

### FAQ

Expandable FAQ accordion.

```tsx
import { FAQ } from "@/components/landing";

<FAQ />
```

**Uses:** `FAQ_ITEMS` from constants

---

### CTA

Call-to-action section with newsletter.

```tsx
import { CTA } from "@/components/landing";

<CTA />
```

**Features:**
- Primary/secondary CTAs
- Newsletter form
- Success state
- Gradient background

---

### Footer

Site footer with navigation.

```tsx
import { Footer } from "@/components/landing";

<Footer />
```

**Uses:** `FOOTER_LINKS`, `SOCIAL_LINKS` from constants

---

## Hooks

### useAuth

Access authentication context.

```tsx
import { useAuth } from "@/stores/auth-context";

function Component() {
  const { user, isAuthenticated, login, logout, register, updateUser } = useAuth();
  
  // Use auth state and methods
}
```

**Returns:**

| Property | Type | Description |
|----------|------|-------------|
| `user` | `User \| null` | Current user |
| `isAuthenticated` | `boolean` | Auth status |
| `isLoading` | `boolean` | Loading state |
| `login` | `(credentials) => Promise<boolean>` | Login function |
| `logout` | `() => void` | Logout function |
| `register` | `(data) => Promise<boolean>` | Register function |
| `updateUser` | `(updates) => void` | Update user |

---

## Type Definitions

See `src/types/index.ts` for all type definitions:

- `User`, `UserRole`, `LoginCredentials`, `RegisterData`
- `NavItem`, `StatCard`, `ChartDataPoint`
- `Notification`, `NotificationType`
- `UserTableData`, `PaginationState`, `SortingState`
- `ProfileSettings`, `NotificationSettings`, `AppearanceSettings`
- `Feature`, `PricingTier`, `Testimonial`, `FAQItem`
- `ApiResponse<T>`, `PaginatedResponse<T>`

