/**
 * Application Constants
 * 
 * Central location for all static configuration values.
 * Update these values to customise the template for your project.
 */

import type { 
  Feature, 
  PricingTier, 
  Testimonial, 
  FAQItem, 
  NavItem 
} from "@/types";

// ============================================================================
// Site Configuration
// ============================================================================

/** Site name used in titles and branding */
export const SITE_NAME = "Acme";

/** Site description for SEO */
export const SITE_DESCRIPTION = "The modern platform for building exceptional digital experiences.";

/** Support email address */
export const SUPPORT_EMAIL = "support@acme.com";

/** Social media links */
export const SOCIAL_LINKS = {
  twitter: "https://twitter.com/acme",
  github: "https://github.com/acme",
  linkedin: "https://linkedin.com/company/acme",
  instagram: "https://instagram.com/acme",
} as const;

// ============================================================================
// Navigation
// ============================================================================

/** Main navigation items for the marketing site */
export const MARKETING_NAV_ITEMS: NavItem[] = [
  { title: "Features", href: "#features" },
  { title: "Pricing", href: "#pricing" },
  { title: "Testimonials", href: "#testimonials" },
  { title: "FAQ", href: "#faq" },
];

/** Dashboard sidebar navigation items */
export const DASHBOARD_NAV_ITEMS: NavItem[] = [
  { 
    title: "Dashboard", 
    href: "/dashboard", 
    icon: "LayoutDashboard" 
  },
  { 
    title: "Analytics", 
    href: "/analytics", 
    icon: "BarChart3" 
  },
  { 
    title: "Users", 
    href: "/users", 
    icon: "Users" 
  },
  { 
    title: "Settings", 
    href: "/settings", 
    icon: "Settings" 
  },
];

// ============================================================================
// Landing Page Content
// ============================================================================

/** Features displayed on the landing page */
export const FEATURES: Feature[] = [
  {
    title: "Lightning Fast",
    description: "Built on Next.js 15 with server components for optimal performance and instant page loads.",
    icon: "Zap",
  },
  {
    title: "Beautiful Design",
    description: "Crafted with ShadCN UI components and a carefully curated design system that looks stunning.",
    icon: "Palette",
  },
  {
    title: "Fully Responsive",
    description: "Every component is mobile-first and works beautifully on all screen sizes and devices.",
    icon: "Smartphone",
  },
  {
    title: "Type Safe",
    description: "Written in strict TypeScript with comprehensive type definitions for a bug-free experience.",
    icon: "Shield",
  },
  {
    title: "Dark Mode",
    description: "Native dark mode support with automatic system detection and smooth transitions.",
    icon: "Moon",
  },
  {
    title: "Accessible",
    description: "Built with accessibility in mind, following WCAG guidelines and best practices.",
    icon: "Heart",
  },
];

/** Pricing tiers displayed on the landing page */
export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Starter",
    price: 0,
    frequency: "monthly",
    description: "Perfect for trying out our platform",
    features: [
      "Up to 3 projects",
      "Basic analytics",
      "48-hour support response time",
      "1GB storage",
      "Community access",
    ],
    buttonText: "Get Started",
    buttonHref: "/register",
  },
  {
    name: "Professional",
    price: 29,
    frequency: "monthly",
    description: "For growing teams and businesses",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "24-hour support response time",
      "100GB storage",
      "API access",
      "Custom integrations",
      "Team collaboration",
    ],
    isPopular: true,
    buttonText: "Start Free Trial",
    buttonHref: "/register",
  },
  {
    name: "Enterprise",
    price: 99,
    frequency: "monthly",
    description: "For large-scale operations",
    features: [
      "Everything in Professional",
      "Unlimited storage",
      "1-hour support response time",
      "Dedicated account manager",
      "Custom contracts",
      "SLA guarantee",
      "On-premise deployment",
      "Advanced security",
    ],
    buttonText: "Contact Sales",
    buttonHref: "/contact",
  },
];

/** Testimonials displayed on the landing page */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    role: "CTO",
    company: "TechStart UK",
    content: "This template saved us weeks of development time. The code quality is exceptional and the documentation made onboarding new developers a breeze.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    rating: 5,
  },
  {
    id: "2",
    name: "James Chen",
    role: "Lead Developer",
    company: "Digital Solutions",
    content: "The best Next.js template I've used. TypeScript support is flawless, and the component architecture is exactly what we needed.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    rating: 5,
  },
  {
    id: "3",
    name: "Emma Williams",
    role: "Product Manager",
    company: "InnovateCo",
    content: "Our team was able to launch our MVP in record time. The authentication and dashboard features were particularly impressive.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    rating: 5,
  },
  {
    id: "4",
    name: "Michael Roberts",
    role: "Founder",
    company: "StartupLabs",
    content: "Incredible attention to detail. The dark mode implementation and responsive design work perfectly across all our test devices.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    rating: 5,
  },
];

/** FAQ items displayed on the landing page */
export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What's included in the template?",
    answer: "The template includes a complete landing page, authentication system (login, register, forgot password), and a full-featured dashboard with analytics, user management, and settings pages. All components are built with ShadCN UI and styled with Tailwind CSS.",
  },
  {
    question: "Is the authentication real or just for demonstration?",
    answer: "The authentication is a mock implementation for demonstration purposes. It uses React Context and localStorage to simulate user sessions. You can easily integrate it with your preferred authentication provider like NextAuth.js, Clerk, or a custom backend.",
  },
  {
    question: "Can I use this template for commercial projects?",
    answer: "Yes, absolutely! This template is free to use for both personal and commercial projects. You can customise it however you like and use it as the foundation for your own applications.",
  },
  {
    question: "What technologies does this template use?",
    answer: "The template is built with Next.js 15, React 19, TypeScript (strict mode), Tailwind CSS 4, ShadCN UI, Recharts for charts, TanStack Table for data tables, and Zod for validation.",
  },
  {
    question: "Is the template accessible?",
    answer: "Yes, we've built the template with accessibility in mind. All components include proper ARIA labels, keyboard navigation support, and follow WCAG guidelines. The colour contrast ratios meet AA standards.",
  },
  {
    question: "How do I customise the theme colours?",
    answer: "Theme colours are defined in globals.css using CSS custom properties. You can easily modify the colour palette by updating the values in the :root and .dark selectors. The template uses OKLCH colour space for better colour consistency.",
  },
];

// ============================================================================
// Footer Configuration
// ============================================================================

/** Footer navigation sections */
export const FOOTER_LINKS = {
  product: {
    title: "Product",
    links: [
      { title: "Features", href: "#features" },
      { title: "Pricing", href: "#pricing" },
      { title: "Changelog", href: "/changelog" },
      { title: "Roadmap", href: "/roadmap" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { title: "About", href: "/about" },
      { title: "Blog", href: "/blog" },
      { title: "Careers", href: "/careers" },
      { title: "Contact", href: "/contact" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { title: "Documentation", href: "/docs" },
      { title: "Components", href: "/docs/components" },
      { title: "Custom Hooks", href: "/docs/hooks" },
      { title: "API Reference", href: "/docs/api" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Service", href: "/terms" },
      { title: "Cookie Policy", href: "/cookies" },
    ],
  },
} as const;

