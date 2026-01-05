# ShadCN Template

A comprehensive, production-ready Next.js template featuring a polished landing page, authentication system, and full-featured dashboard. Built with modern technologies and best practices.

[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC.svg)](https://tailwindcss.com/)

## 🚀 Features

### Landing Page
- **Hero Section** - Eye-catching animated gradient background with dual CTAs
- **Features Grid** - 6-card showcase of product benefits with icons
- **Pricing Table** - 3-tier comparison with popular badge highlight
- **Testimonials** - Customer quotes with avatars and ratings
- **FAQ Accordion** - Expandable questions and answers
- **CTA Section** - Newsletter signup and final call-to-action
- **Footer** - Navigation links and social media icons

### Authentication
- **Login** - Email/password with validation and "Remember me"
- **Register** - Password strength indicator with requirements checklist
- **Forgot Password** - Email submission with success state
- **Auth Context** - React context with localStorage persistence
- **Protected Routes** - Automatic redirect for unauthenticated users

### Dashboard
- **Collapsible Sidebar** - Responsive navigation with collapse toggle
- **Header** - Breadcrumbs, search, notifications, theme toggle
- **Dashboard Home** - Statistics cards and revenue charts
- **Analytics** - Multiple chart types (bar, line, pie, area)
- **Users Table** - Full-featured data table with sorting, filtering, pagination
- **Settings** - Profile, notifications, and appearance tabs

### Design
- **Dark/Light Mode** - System preference detection with manual toggle
- **Responsive** - Mobile-first design for all screen sizes
- **Accessible** - ARIA labels, keyboard navigation, focus management, skip links
- **Distinctive Theme** - Custom emerald/teal colour palette (not generic purple)

### Developer Experience
- **Custom Hooks** - useLocalStorage (with Zod validation), useMediaQuery, useDebounce, useCopyToClipboard
- **Centralised Schemas** - Reusable Zod validation schemas for forms and storage
- **API Service Layer** - Type-safe HTTP client with error handling
- **Error Boundary** - Graceful error handling with fallback UI (wraps dashboard)
- **Environment Validation** - Zod-based env var validation
- **Lazy Loading** - Code-split heavy components (charts)
- **React.memo** - Memoised presentation components for performance

## 📦 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org/) | 16.x | App Router, Server Components |
| [React](https://react.dev/) | 19.x | UI Library |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type Safety (strict mode) |
| [ShadCN UI](https://ui.shadcn.com/) | Latest | Component Library |
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | Styling |
| [next-themes](https://github.com/pacocoursey/next-themes) | Latest | Dark/Light Mode |
| [Recharts](https://recharts.org/) | Latest | Dashboard Charts |
| [TanStack Table](https://tanstack.com/table) | Latest | Data Tables |
| [Lucide React](https://lucide.dev/) | Latest | Icons |
| [Zod](https://zod.dev/) | Latest | Validation |
| [React Hook Form](https://react-hook-form.com/) | Latest | Form Management |
| [date-fns](https://date-fns.org/) | Latest | Date Formatting |

## 🏗️ Project Structure

```
src/
├── app/
│   ├── (auth)/              # Auth route group
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (dashboard)/         # Dashboard route group
│   │   ├── dashboard/
│   │   ├── analytics/
│   │   ├── users/
│   │   └── settings/
│   ├── (marketing)/         # Marketing route group
│   │   └── page.tsx         # Landing page
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles + theme
├── components/
│   ├── ui/                  # ShadCN components
│   ├── landing/             # Landing page sections
│   ├── dashboard/           # Dashboard components
│   ├── auth/                # Auth forms
│   ├── shared/              # Shared components
│   └── providers/           # Context providers
├── hooks/                   # Custom React hooks
│   ├── use-local-storage.ts # LocalStorage with SSR + Zod validation
│   ├── use-media-query.ts   # Responsive design helpers
│   ├── use-debounce.ts      # Debounce value/callback
│   └── use-copy-to-clipboard.ts # Clipboard API
├── lib/                     # Utilities
│   ├── utils.ts             # Helper functions
│   ├── env.ts               # Environment validation
│   ├── constants.ts         # App constants
│   └── mock-data.ts         # Sample data
├── schemas/                 # Zod validation schemas
│   ├── auth.ts              # Authentication schemas
│   ├── user.ts              # User & settings schemas
│   └── storage.ts           # LocalStorage validation
├── services/                # API layer
│   └── api.ts               # HTTP client
├── stores/                  # State management
│   └── auth-context.tsx     # Auth context
├── types/                   # TypeScript definitions
│   └── index.ts             # All type exports
└── docs/                    # Documentation
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shadcn-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
npm run lint:fix    # Auto-fix linting issues
npm run type-check  # TypeScript validation
```

## 🎨 Customisation

### Theme Colours

Theme colours are defined in `src/app/globals.css` using CSS custom properties with OKLCH colour space:

```css
:root {
  --primary: oklch(0.55 0.15 160);  /* Emerald */
  --background: oklch(0.985 0.002 90);
  /* ... other variables */
}

.dark {
  --primary: oklch(0.7 0.18 160);   /* Luminous emerald */
  --background: oklch(0.13 0.02 260);
  /* ... other variables */
}
```

### Adding New ShadCN Components

```bash
npx shadcn@latest add [component-name]
```

### Fonts

The template uses:
- **Outfit** - Primary sans-serif font
- **JetBrains Mono** - Monospace font for code

To change fonts, update `src/app/layout.tsx`:

```typescript
import { YourFont } from "next/font/google";

const yourFont = YourFont({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
```

## 🔐 Authentication

The authentication system is a mock implementation for demonstration. To integrate real authentication:

1. **Replace the auth context** (`src/stores/auth-context.tsx`) with your authentication provider (e.g., NextAuth.js, Clerk, Firebase)

2. **Update the login/register functions** to call your API

3. **Modify the protected route wrapper** if needed

### Example with NextAuth.js

```typescript
// Install NextAuth
npm install next-auth

// Create auth config
// app/api/auth/[...nextauth]/route.ts
```

## 📊 Adding Real Data

Replace mock data files with your API calls:

1. **Charts**: Update `src/lib/mock-data.ts` or create custom hooks
2. **Users Table**: Replace `MOCK_USERS` with your API data
3. **Notifications**: Connect to your notification service

## 🧩 Key Components

### StatCard
Display statistics with trend indicators:

```tsx
<StatCard
  title="Total Revenue"
  value="£45,231.89"
  description="+20.1% from last month"
  trend={20.1}
  trendDirection="up"
  icon="PoundSterling"
/>
```

### ChartCard
Wrapper for Recharts visualisations:

```tsx
<ChartCard title="Revenue" description="Monthly data">
  <AreaChart data={data}>...</AreaChart>
</ChartCard>
```

### UsersTable
Full-featured data table:

```tsx
<UsersTable data={users} />
```

## 📱 Responsive Breakpoints

The template follows Tailwind's default breakpoints:

| Breakpoint | Width |
|------------|-------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

## ♿ Accessibility

- Proper heading hierarchy
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible indicators
- Colour contrast meets WCAG AA
- Skip links for main content

## 📄 License

This template is free to use for personal and commercial projects.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For questions or issues, please open a GitHub issue.

---

Built with ❤️ using Next.js, ShadCN UI, and Tailwind CSS.
