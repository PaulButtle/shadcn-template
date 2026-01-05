/**
 * Roadmap Page
 * 
 * Product roadmap showing planned features and future direction.
 * Displays items by quarter with status indicators.
 * 
 * @component
 */

import { Container } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Map, 
  CheckCircle2, 
  Circle,
  Clock,
  Rocket,
  Target,
  Lightbulb,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";

/** Roadmap item status */
type RoadmapStatus = "completed" | "in-progress" | "planned" | "considering";

/** Roadmap item data structure */
interface RoadmapItem {
  title: string;
  description: string;
  status: RoadmapStatus;
  category: string;
}

/** Roadmap quarter data structure */
interface RoadmapQuarter {
  period: string;
  description: string;
  items: RoadmapItem[];
}

/** Status configuration */
const STATUS_CONFIG: Record<RoadmapStatus, { icon: React.ElementType; label: string; color: string }> = {
  completed: { 
    icon: CheckCircle2, 
    label: "Completed", 
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
  },
  "in-progress": { 
    icon: Clock, 
    label: "In Progress", 
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20" 
  },
  planned: { 
    icon: Circle, 
    label: "Planned", 
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20" 
  },
  considering: { 
    icon: Lightbulb, 
    label: "Considering", 
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20" 
  },
};

/** Category colours */
const CATEGORY_COLORS: Record<string, string> = {
  "Platform": "bg-rose-500/10 text-rose-500",
  "Dashboard": "bg-indigo-500/10 text-indigo-500",
  "API": "bg-cyan-500/10 text-cyan-500",
  "Security": "bg-red-500/10 text-red-500",
  "Analytics": "bg-violet-500/10 text-violet-500",
  "Integrations": "bg-teal-500/10 text-teal-500",
  "Performance": "bg-orange-500/10 text-orange-500",
  "Mobile": "bg-pink-500/10 text-pink-500",
};

/** Roadmap data by quarter */
const ROADMAP_DATA: RoadmapQuarter[] = [
  {
    period: "Q1 2026",
    description: "Focus on platform stability and enterprise features",
    items: [
      {
        title: "Enterprise SSO",
        description: "SAML and OIDC single sign-on support for enterprise customers",
        status: "in-progress",
        category: "Security",
      },
      {
        title: "Advanced Analytics Dashboard",
        description: "Customisable widgets and real-time metrics visualisation",
        status: "in-progress",
        category: "Analytics",
      },
      {
        title: "API Rate Limiting v2",
        description: "More granular control over API rate limits per endpoint",
        status: "planned",
        category: "API",
      },
      {
        title: "Audit Logging",
        description: "Comprehensive audit trail for all user actions",
        status: "planned",
        category: "Security",
      },
    ],
  },
  {
    period: "Q2 2026",
    description: "Expanding integration ecosystem and mobile experience",
    items: [
      {
        title: "Slack Integration",
        description: "Native Slack app for notifications and quick actions",
        status: "planned",
        category: "Integrations",
      },
      {
        title: "Mobile App (iOS)",
        description: "Native iOS application for on-the-go access",
        status: "planned",
        category: "Mobile",
      },
      {
        title: "Webhook Management UI",
        description: "Visual interface for creating and managing webhooks",
        status: "planned",
        category: "Platform",
      },
      {
        title: "Custom Dashboards",
        description: "Build and save personalised dashboard layouts",
        status: "planned",
        category: "Dashboard",
      },
    ],
  },
  {
    period: "Q3 2026",
    description: "AI-powered features and enhanced collaboration",
    items: [
      {
        title: "AI-Powered Insights",
        description: "Machine learning-based recommendations and anomaly detection",
        status: "considering",
        category: "Analytics",
      },
      {
        title: "Mobile App (Android)",
        description: "Native Android application for on-the-go access",
        status: "considering",
        category: "Mobile",
      },
      {
        title: "Team Workspaces",
        description: "Dedicated workspaces for team collaboration",
        status: "considering",
        category: "Platform",
      },
      {
        title: "GraphQL API",
        description: "Alternative GraphQL endpoint for flexible queries",
        status: "considering",
        category: "API",
      },
    ],
  },
  {
    period: "Q4 2025 (Completed)",
    description: "Foundation building and core feature development",
    items: [
      {
        title: "Dark Mode",
        description: "System-aware dark mode with smooth transitions",
        status: "completed",
        category: "Platform",
      },
      {
        title: "Real-time Notifications",
        description: "WebSocket-based notification system",
        status: "completed",
        category: "Platform",
      },
      {
        title: "Data Export",
        description: "CSV and Excel export for all data tables",
        status: "completed",
        category: "Dashboard",
      },
      {
        title: "Two-Factor Authentication",
        description: "TOTP-based 2FA for enhanced account security",
        status: "completed",
        category: "Security",
      },
    ],
  },
];

/**
 * Roadmap page component displaying planned features
 */
export default function RoadmapPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-background to-pink-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(244,63,94,0.1),transparent_50%)]" />
        
        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              <Map className="w-3 h-3 mr-1" />
              Roadmap
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Where we&apos;re{" "}
              <span className="text-rose-500">heading</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              A look at what we&apos;re building and where we&apos;re going. 
              Our roadmap is shaped by your feedback and our vision for the future.
            </p>
          </div>
        </Container>
      </section>

      {/* Status legend */}
      <section className="py-6 border-y border-border bg-muted/30">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {Object.entries(STATUS_CONFIG).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <div key={key} className="flex items-center gap-2">
                  <Icon className={cn("w-4 h-4", config.color.split(" ")[1])} />
                  <span className="text-sm text-muted-foreground">{config.label}</span>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Roadmap content */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="space-y-16">
            {ROADMAP_DATA.map((quarter, quarterIndex) => (
              <div key={quarter.period}>
                {/* Quarter header */}
                <div className="flex items-start gap-4 mb-8">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                    quarterIndex === 0 ? "bg-rose-500/10" : "bg-muted"
                  )}>
                    {quarterIndex === ROADMAP_DATA.length - 1 ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    ) : quarterIndex === 0 ? (
                      <Rocket className="w-6 h-6 text-rose-500" />
                    ) : (
                      <Target className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-1">
                      {quarter.period}
                    </h2>
                    <p className="text-muted-foreground">
                      {quarter.description}
                    </p>
                  </div>
                </div>
                
                {/* Quarter items */}
                <div className="grid md:grid-cols-2 gap-4 ml-0 md:ml-16">
                  {quarter.items.map((item) => {
                    const statusConfig = STATUS_CONFIG[item.status];
                    const StatusIcon = statusConfig.icon;
                    const categoryColor = CATEGORY_COLORS[item.category] || "bg-gray-500/10 text-gray-500";
                    
                    return (
                      <Card 
                        key={item.title}
                        className={cn(
                          "border-border/50 hover:border-rose-500/30 transition-colors",
                          item.status === "completed" && "opacity-75"
                        )}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge 
                                variant="outline" 
                                className={cn("text-xs", statusConfig.color)}
                              >
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {statusConfig.label}
                              </Badge>
                              <Badge variant="secondary" className={cn("text-xs", categoryColor)}>
                                {item.category}
                              </Badge>
                            </div>
                          </div>
                          <CardTitle className="text-lg mt-2">
                            {item.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                
                {quarterIndex < ROADMAP_DATA.length - 1 && (
                  <Separator className="mt-16" />
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Feedback CTA */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <Container>
          <Card className="bg-gradient-to-br from-rose-500/10 via-background to-pink-500/10 border-rose-500/20">
            <CardContent className="p-8 lg:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge variant="secondary" className="mb-4 bg-rose-500/10 text-rose-500">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Have Your Say
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Shape our roadmap
                  </h2>
                  <p className="text-muted-foreground">
                    Your feedback directly influences what we build next. Have a feature 
                    request or an idea that would make your life easier? We&apos;d love to hear it.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center h-12 px-6 rounded-md bg-rose-500 hover:bg-rose-600 text-white font-medium transition-colors"
                  >
                    Submit Feedback
                  </a>
                  <a
                    href="https://github.com/acme/feedback/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-12 px-6 rounded-md border border-rose-500/50 text-rose-500 hover:bg-rose-500/10 font-medium transition-colors"
                  >
                    Join Discussion
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>

      <Separator />
    </div>
  );
}

