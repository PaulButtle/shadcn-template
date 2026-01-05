import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/stores/auth-context";
import { Toaster } from "@/components/ui/sonner";
import { SkipLink } from "@/components/shared";

/**
 * Primary font - Outfit
 * A geometric sans-serif with a distinctive, modern feel
 * Used for all main text throughout the application
 */
const outfit = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Monospace font - JetBrains Mono
 * A developer-friendly monospace font for code snippets
 */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Site metadata configuration
 * Update these values for your specific project
 */
export const metadata: Metadata = {
  title: {
    default: "ShadCN Template",
    template: "%s | ShadCN Template",
  },
  description: "A comprehensive Next.js template with ShadCN UI, featuring a landing page, authentication, and dashboard.",
  keywords: ["Next.js", "React", "TypeScript", "ShadCN", "Tailwind CSS", "Dashboard"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_GB",
    title: "ShadCN Template",
    description: "A comprehensive Next.js template with ShadCN UI",
    siteName: "ShadCN Template",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShadCN Template",
    description: "A comprehensive Next.js template with ShadCN UI",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Root Layout Component
 * 
 * The root layout wraps all pages and provides:
 * - Skip link for keyboard accessibility
 * - Font configuration (Outfit + JetBrains Mono)
 * - Theme provider for dark/light mode
 * - Authentication context
 * - Toast notifications via Sonner
 * 
 * @component
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Skip link for keyboard accessibility */}
          <SkipLink />
          
          <AuthProvider>
            {children}
          </AuthProvider>
          <Toaster position="top-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
