/**
 * Styling & Theming Documentation Page
 *
 * Guide to customising colours, fonts, and theming.
 *
 * @component
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata: Metadata = {
  title: "Styling & Theming",
  description:
    "Learn how to customise colours, fonts, and create your own theme in ShadCN Template using Tailwind CSS and CSS custom properties.",
};

/**
 * Styling and theming documentation page
 */
export default function StylingPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Styling & Theming</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Customise the look and feel of your application with Tailwind CSS,
          CSS custom properties, and the built-in theming system.
        </p>
      </div>

      {/* Overview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
        <p className="text-muted-foreground">
          The template uses a layered approach to styling:
        </p>
        <ul className="space-y-2">
          <StyleLayer
            title="CSS Custom Properties"
            description="Define theme colours in globals.css using OKLCH colour space"
          />
          <StyleLayer
            title="Tailwind CSS"
            description="Utility classes that reference CSS variables"
          />
          <StyleLayer
            title="ShadCN Components"
            description="Pre-styled components using the design tokens"
          />
          <StyleLayer
            title="next-themes"
            description="Dark/light mode switching with system preference detection"
          />
        </ul>
      </section>

      <Separator />

      {/* Theme Configuration */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Theme Configuration</h2>
        <p className="text-muted-foreground">
          Theme colours are defined in <code>src/app/globals.css</code> using CSS
          custom properties. The template uses OKLCH colour space for better
          colour consistency:
        </p>
        <CodeBlock language="css" title="globals.css - Light Theme">
{`:root {
  --radius: 0.625rem;
  
  /* Light theme colours */
  --background: oklch(0.985 0.002 90);
  --foreground: oklch(0.15 0.01 250);
  
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.15 0.01 250);
  
  --primary: oklch(0.55 0.15 160);
  --primary-foreground: oklch(0.99 0 0);
  
  --secondary: oklch(0.96 0.01 90);
  --secondary-foreground: oklch(0.25 0.01 250);
  
  --muted: oklch(0.96 0.01 90);
  --muted-foreground: oklch(0.5 0.01 250);
  
  --accent: oklch(0.92 0.04 160);
  --accent-foreground: oklch(0.25 0.08 160);
  
  --destructive: oklch(0.55 0.22 25);
  
  --border: oklch(0.9 0.01 90);
  --input: oklch(0.9 0.01 90);
  --ring: oklch(0.55 0.15 160);
}`}
        </CodeBlock>
        <CodeBlock language="css" title="globals.css - Dark Theme">
{`.dark {
  /* Dark theme colours */
  --background: oklch(0.13 0.02 260);
  --foreground: oklch(0.95 0.01 90);
  
  --card: oklch(0.17 0.02 260);
  --card-foreground: oklch(0.95 0.01 90);
  
  --primary: oklch(0.7 0.18 160);
  --primary-foreground: oklch(0.13 0.02 260);
  
  --secondary: oklch(0.22 0.02 260);
  --secondary-foreground: oklch(0.95 0.01 90);
  
  --muted: oklch(0.22 0.02 260);
  --muted-foreground: oklch(0.65 0.01 90);
  
  --accent: oklch(0.25 0.05 160);
  --accent-foreground: oklch(0.85 0.1 160);
  
  --destructive: oklch(0.65 0.22 25);
  
  --border: oklch(0.25 0.02 260);
  --input: oklch(0.25 0.02 260);
  --ring: oklch(0.7 0.18 160);
}`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Colour Tokens */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Colour Tokens</h2>
        <p className="text-muted-foreground">
          The template uses semantic colour tokens. Here&apos;s what each one is for:
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium">Token</th>
                <th className="text-left p-3 font-medium">Usage</th>
              </tr>
            </thead>
            <tbody>
              <TokenRow token="background" usage="Page background colour" />
              <TokenRow token="foreground" usage="Primary text colour" />
              <TokenRow token="primary" usage="Brand colour, buttons, links" />
              <TokenRow token="secondary" usage="Secondary buttons, badges" />
              <TokenRow token="muted" usage="Subtle backgrounds, disabled states" />
              <TokenRow token="accent" usage="Highlighted areas, hover states" />
              <TokenRow token="destructive" usage="Error states, delete actions" />
              <TokenRow token="border" usage="Borders, dividers" />
              <TokenRow token="input" usage="Form input borders" />
              <TokenRow token="ring" usage="Focus ring colour" />
              <TokenRow token="card" usage="Card backgrounds" />
            </tbody>
          </table>
        </div>
      </section>

      <Separator />

      {/* Using Colours */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Using Colours</h2>
        <p className="text-muted-foreground">
          Use Tailwind classes that reference the CSS variables:
        </p>
        <CodeBlock language="tsx" title="Using Colour Tokens">
{`// Background colours
<div className="bg-background">Page background</div>
<div className="bg-card">Card background</div>
<div className="bg-muted">Subtle background</div>
<div className="bg-primary">Primary colour</div>

// Text colours
<p className="text-foreground">Primary text</p>
<p className="text-muted-foreground">Secondary text</p>
<p className="text-primary">Accent text</p>

// Borders
<div className="border border-border">Default border</div>
<div className="border border-input">Input border</div>

// Focus ring
<button className="focus-visible:ring-2 focus-visible:ring-ring">
  Focusable
</button>`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Custom Theme */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Creating a Custom Theme</h2>
        <p className="text-muted-foreground">
          To create your own theme, update the CSS variables in <code>globals.css</code>.
          Here&apos;s an example blue theme:
        </p>
        <CodeBlock language="css" title="Example: Blue Theme">
{`:root {
  /* Blue theme */
  --primary: oklch(0.55 0.18 250);
  --primary-foreground: oklch(0.99 0 0);
  
  --accent: oklch(0.92 0.04 250);
  --accent-foreground: oklch(0.25 0.1 250);
  
  --ring: oklch(0.55 0.18 250);
}

.dark {
  --primary: oklch(0.65 0.2 250);
  --primary-foreground: oklch(0.13 0.02 260);
  
  --accent: oklch(0.25 0.06 250);
  --accent-foreground: oklch(0.85 0.12 250);
  
  --ring: oklch(0.65 0.2 250);
}`}
        </CodeBlock>
        <Alert>
          <Palette className="h-4 w-4" />
          <AlertTitle>OKLCH Colour Space</AlertTitle>
          <AlertDescription>
            OKLCH provides perceptually uniform colours. The format is{" "}
            <code>oklch(lightness chroma hue)</code>. Adjust hue (0-360) to change
            the colour family while maintaining consistent brightness and saturation.
          </AlertDescription>
        </Alert>
      </section>

      <Separator />

      {/* Dark Mode */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Dark Mode</h2>
        <p className="text-muted-foreground">
          Dark mode is handled by <code>next-themes</code>. The theme is stored
          in localStorage and respects system preferences.
        </p>
        <CodeBlock language="tsx" title="Theme Toggle Component">
{`"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}`}
        </CodeBlock>
        <p className="text-sm text-muted-foreground">
          The theme provider is configured in the root layout with{" "}
          <code>defaultTheme=&quot;system&quot;</code> to respect user preferences.
        </p>
      </section>

      <Separator />

      {/* Typography */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Typography</h2>
        <p className="text-muted-foreground">
          The template uses two fonts loaded via <code>next/font/google</code>:
        </p>
        <CodeBlock language="tsx" title="Font Configuration">
{`// src/app/layout.tsx
import { Outfit, JetBrains_Mono } from "next/font/google";

// Primary font - geometric sans-serif
const outfit = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Monospace font - for code
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});`}
        </CodeBlock>
        <p className="text-muted-foreground">
          Use <code>font-sans</code> for body text and <code>font-mono</code> for code:
        </p>
        <CodeBlock language="tsx" title="Using Fonts">
{`<p className="font-sans">Body text using Outfit</p>
<code className="font-mono">Code using JetBrains Mono</code>`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Utility Classes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Utility Classes</h2>
        <p className="text-muted-foreground">
          The <code>cn()</code> utility combines Tailwind classes intelligently:
        </p>
        <CodeBlock language="tsx" title="cn() Utility">
{`import { cn } from "@/lib/utils";

// Merges classes and handles conflicts
<div className={cn(
  "px-4 py-2 rounded-lg",           // Base styles
  "bg-card text-card-foreground",   // Theme colours
  isActive && "bg-primary text-primary-foreground", // Conditional
  className                          // Allow override
)} />`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Custom Scrollbar */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Custom Scrollbar</h2>
        <p className="text-muted-foreground">
          The template includes a custom scrollbar utility class:
        </p>
        <CodeBlock language="tsx" title="Custom Scrollbar">
{`// Apply to scrollable containers
<div className="h-96 overflow-y-auto scrollbar-thin">
  {/* Scrollable content */}
</div>`}
        </CodeBlock>
      </section>

      {/* Next Steps */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Next Steps</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/docs/components">
              Components
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

/** Style layer list item */
function StyleLayer({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <li className="flex items-start gap-3 rounded-lg border border-border p-3">
      <div className="rounded bg-primary/10 p-1.5 text-primary">
        <Palette className="h-4 w-4" />
      </div>
      <div>
        <span className="font-medium">{title}</span>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </li>
  );
}

/** Token table row */
function TokenRow({ token, usage }: { token: string; usage: string }) {
  return (
    <tr className="border-t border-border">
      <td className="p-3">
        <code className="text-primary">--{token}</code>
      </td>
      <td className="p-3 text-muted-foreground">{usage}</td>
    </tr>
  );
}

