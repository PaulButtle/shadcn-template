/**
 * Changelog Page
 * 
 * Version history and release notes.
 * Displays all product updates in chronological order.
 * 
 * @component
 */

import { Container } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  History, 
  Sparkles, 
  Bug, 
  Zap,
  Shield,
  Package
} from "lucide-react";
import { cn } from "@/lib/utils";

/** Changelog entry type */
type ChangeType = "feature" | "improvement" | "fix" | "security";

/** Changelog entry data structure */
interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  description: string;
  changes: {
    type: ChangeType;
    text: string;
  }[];
}

/** Icon mapping for change types */
const CHANGE_TYPE_CONFIG: Record<ChangeType, { icon: React.ElementType; label: string; color: string }> = {
  feature: { 
    icon: Sparkles, 
    label: "New", 
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
  },
  improvement: { 
    icon: Zap, 
    label: "Improved", 
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20" 
  },
  fix: { 
    icon: Bug, 
    label: "Fixed", 
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20" 
  },
  security: { 
    icon: Shield, 
    label: "Security", 
    color: "bg-red-500/10 text-red-500 border-red-500/20" 
  },
};

/** Changelog entries */
const CHANGELOG_ENTRIES: ChangelogEntry[] = [
  {
    version: "2.1.0",
    date: "02/01/2026",
    title: "Dark mode improvements & new components",
    description: "This release focuses on improving the dark mode experience and adds several new UI components.",
    changes: [
      { type: "feature", text: "Added new Drawer component for mobile-friendly modals" },
      { type: "feature", text: "Introduced Command palette for keyboard navigation" },
      { type: "improvement", text: "Enhanced dark mode colour palette for better contrast" },
      { type: "improvement", text: "Optimised bundle size by 15% through tree shaking" },
      { type: "fix", text: "Fixed dropdown menu positioning on scroll" },
      { type: "fix", text: "Resolved focus trap issue in modal dialogs" },
    ],
  },
  {
    version: "2.0.0",
    date: "15/12/2025",
    title: "Major release with breaking changes",
    description: "A significant update with new features, improved performance, and some breaking changes. Please review the migration guide.",
    changes: [
      { type: "feature", text: "Complete redesign of the dashboard layout" },
      { type: "feature", text: "Added real-time notifications system" },
      { type: "feature", text: "New analytics dashboard with customisable widgets" },
      { type: "improvement", text: "Upgraded to Next.js 15 with React 19 support" },
      { type: "improvement", text: "Migrated to Tailwind CSS 4 with OKLCH colours" },
      { type: "security", text: "Updated authentication flow with enhanced security" },
      { type: "fix", text: "Fixed memory leak in chart components" },
    ],
  },
  {
    version: "1.5.0",
    date: "28/11/2025",
    title: "Authentication enhancements",
    description: "Improved authentication flows and added new security features.",
    changes: [
      { type: "feature", text: "Added two-factor authentication support" },
      { type: "feature", text: "Introduced social login options (Google, GitHub)" },
      { type: "improvement", text: "Enhanced password strength indicator" },
      { type: "improvement", text: "Improved session management and timeout handling" },
      { type: "security", text: "Implemented CSRF protection across all forms" },
      { type: "fix", text: "Fixed race condition in token refresh logic" },
    ],
  },
  {
    version: "1.4.0",
    date: "10/11/2025",
    title: "Table improvements & data export",
    description: "Major enhancements to data tables including sorting, filtering, and export capabilities.",
    changes: [
      { type: "feature", text: "Added CSV and Excel export functionality" },
      { type: "feature", text: "Introduced column visibility toggle" },
      { type: "improvement", text: "Enhanced table sorting with multi-column support" },
      { type: "improvement", text: "Added debounced search filter" },
      { type: "fix", text: "Fixed pagination reset on filter change" },
      { type: "fix", text: "Resolved column resize flickering issue" },
    ],
  },
  {
    version: "1.3.0",
    date: "25/10/2025",
    title: "Form validation & error handling",
    description: "Comprehensive form validation using Zod and improved error handling throughout the application.",
    changes: [
      { type: "feature", text: "Integrated Zod schema validation" },
      { type: "feature", text: "Added custom form field components with validation" },
      { type: "improvement", text: "Better error messages with field-level feedback" },
      { type: "improvement", text: "Added form state persistence on navigation" },
      { type: "fix", text: "Fixed form submission on Enter key" },
    ],
  },
  {
    version: "1.2.0",
    date: "08/10/2025",
    title: "Performance optimisations",
    description: "Focused on improving application performance and reducing bundle size.",
    changes: [
      { type: "improvement", text: "Implemented lazy loading for dashboard charts" },
      { type: "improvement", text: "Added React.memo to prevent unnecessary re-renders" },
      { type: "improvement", text: "Optimised image loading with next/image" },
      { type: "fix", text: "Fixed hydration mismatch warnings" },
      { type: "fix", text: "Resolved layout shift on initial page load" },
    ],
  },
  {
    version: "1.1.0",
    date: "22/09/2025",
    title: "Documentation & accessibility",
    description: "Added comprehensive documentation and improved accessibility across all components.",
    changes: [
      { type: "feature", text: "Launched interactive documentation site" },
      { type: "feature", text: "Added skip link for keyboard navigation" },
      { type: "improvement", text: "Enhanced ARIA labels throughout" },
      { type: "improvement", text: "Improved focus indicators for all interactive elements" },
      { type: "fix", text: "Fixed screen reader announcements for notifications" },
    ],
  },
  {
    version: "1.0.0",
    date: "01/09/2025",
    title: "Initial release",
    description: "The first public release of the Acme platform with core features.",
    changes: [
      { type: "feature", text: "Landing page with hero, features, pricing, and FAQ" },
      { type: "feature", text: "Authentication system (login, register, forgot password)" },
      { type: "feature", text: "Dashboard with analytics and user management" },
      { type: "feature", text: "Dark mode support with system detection" },
      { type: "feature", text: "Responsive design for all screen sizes" },
    ],
  },
];

/**
 * Changelog page component displaying version history
 */
export default function ChangelogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-background to-sky-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(6,182,212,0.1),transparent_50%)]" />
        
        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              <History className="w-3 h-3 mr-1" />
              Changelog
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              What&apos;s new in{" "}
              <span className="text-cyan-500">Acme</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Stay up to date with all the latest features, improvements, and bug fixes. 
              We ship updates regularly to make your experience better.
            </p>
          </div>
        </Container>
      </section>

      {/* Version indicator */}
      <section className="py-6 border-y border-border bg-muted/30">
        <Container>
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-cyan-500" />
              <span className="font-medium">Current Version:</span>
              <Badge className="bg-cyan-500 hover:bg-cyan-600 text-white">
                v{CHANGELOG_ENTRIES[0]?.version ?? "Unknown"}
              </Badge>
            </div>
          </div>
        </Container>
      </section>

      {/* Changelog entries */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-8 w-px h-full bg-border" />
              
              {CHANGELOG_ENTRIES.map((entry, index) => (
                <div key={entry.version} className="relative mb-12 last:mb-0">
                  {/* Version badge on timeline */}
                  <div className="absolute left-0 md:left-8 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-500 border-4 border-background" />
                  
                  {/* Entry content */}
                  <div className="pl-8 md:pl-20">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-sm font-mono",
                          index === 0 && "bg-cyan-500/10 text-cyan-500 border-cyan-500/30"
                        )}
                      >
                        v{entry.version}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{entry.date}</span>
                      {index === 0 && (
                        <Badge className="bg-cyan-500/10 text-cyan-500 border-cyan-500/30">
                          Latest
                        </Badge>
                      )}
                    </div>
                    
                    <h2 className="text-xl md:text-2xl font-bold mb-2">
                      {entry.title}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {entry.description}
                    </p>
                    
                    <Card className="border-border/50">
                      <CardContent className="p-4 md:p-6">
                        <ul className="space-y-3">
                          {entry.changes.map((change, changeIndex) => {
                            const config = CHANGE_TYPE_CONFIG[change.type];
                            const Icon = config.icon;
                            
                            return (
                              <li key={changeIndex} className="flex items-start gap-3">
                                <Badge 
                                  variant="outline" 
                                  className={cn("shrink-0 text-xs", config.color)}
                                >
                                  <Icon className="w-3 h-3 mr-1" />
                                  {config.label}
                                </Badge>
                                <span className="text-sm">{change.text}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Subscribe CTA */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <Container>
          <Card className="bg-gradient-to-br from-cyan-500/10 via-background to-sky-500/10 border-cyan-500/20">
            <CardContent className="p-8 lg:p-12 text-center">
              <Badge variant="secondary" className="mb-4 bg-cyan-500/10 text-cyan-500">
                Stay Updated
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Get notified of new releases
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Subscribe to our changelog and be the first to know about new features, 
                improvements, and fixes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 h-12 px-4 rounded-md border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
                <button className="h-12 px-6 rounded-md bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>

      <Separator />
    </div>
  );
}

