/**
 * Cookie Policy Page
 * 
 * Comprehensive cookie policy explaining what cookies are used,
 * why they're used, and how users can manage their preferences.
 * Compliant with UK GDPR and PECR requirements.
 * 
 * @component
 */

import { Container } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SITE_NAME, SUPPORT_EMAIL } from "@/lib/constants";
import { 
  Cookie, 
  Info, 
  Shield, 
  Settings, 
  BarChart3, 
  Target,
  Clock,
  Mail,
  ExternalLink
} from "lucide-react";

/** Cookie type data structure */
interface CookieType {
  icon: React.ElementType;
  title: string;
  description: string;
  required: boolean;
}

/** Individual cookie information */
interface CookieInfo {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
  type: string;
}

/** Types of cookies used */
const COOKIE_TYPES: CookieType[] = [
  {
    icon: Shield,
    title: "Essential Cookies",
    description: "These cookies are necessary for the website to function and cannot be switched off. They are usually set in response to actions you take, such as setting your privacy preferences, logging in, or filling in forms. Without these cookies, the services you've asked for cannot be provided.",
    required: true,
  },
  {
    icon: Settings,
    title: "Functional Cookies",
    description: "These cookies enable enhanced functionality and personalisation, such as remembering your preferences, language settings, and customisation choices. If you do not allow these cookies, some or all of these features may not function properly.",
    required: false,
  },
  {
    icon: BarChart3,
    title: "Analytics Cookies",
    description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve how our website works and the content we provide.",
    required: false,
  },
  {
    icon: Target,
    title: "Marketing Cookies",
    description: "These cookies may be set through our site by our advertising partners. They may be used to build a profile of your interests and show you relevant adverts on other sites. They do not store directly personal information but are based on uniquely identifying your browser and device.",
    required: false,
  },
];

/** Specific cookies used on the site */
const COOKIES_USED: CookieInfo[] = [
  {
    name: "session_id",
    provider: SITE_NAME,
    purpose: "Maintains your session state across page requests",
    duration: "Session",
    type: "Essential",
  },
  {
    name: "auth_token",
    provider: SITE_NAME,
    purpose: "Authenticates your identity when logged in",
    duration: "7 days",
    type: "Essential",
  },
  {
    name: "csrf_token",
    provider: SITE_NAME,
    purpose: "Protects against cross-site request forgery attacks",
    duration: "Session",
    type: "Essential",
  },
  {
    name: "theme",
    provider: SITE_NAME,
    purpose: "Remembers your light/dark mode preference",
    duration: "1 year",
    type: "Functional",
  },
  {
    name: "locale",
    provider: SITE_NAME,
    purpose: "Stores your language and region preferences",
    duration: "1 year",
    type: "Functional",
  },
  {
    name: "_ga",
    provider: "Google Analytics",
    purpose: "Distinguishes unique users and calculates visitor statistics",
    duration: "2 years",
    type: "Analytics",
  },
  {
    name: "_gid",
    provider: "Google Analytics",
    purpose: "Distinguishes unique users for daily statistics",
    duration: "24 hours",
    type: "Analytics",
  },
  {
    name: "_gat",
    provider: "Google Analytics",
    purpose: "Limits the rate of requests to Google Analytics",
    duration: "1 minute",
    type: "Analytics",
  },
];

/** Browser instructions for managing cookies */
const BROWSER_INSTRUCTIONS = [
  {
    browser: "Google Chrome",
    url: "https://support.google.com/chrome/answer/95647",
  },
  {
    browser: "Mozilla Firefox",
    url: "https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox",
  },
  {
    browser: "Safari",
    url: "https://support.apple.com/en-gb/guide/safari/sfri11471/mac",
  },
  {
    browser: "Microsoft Edge",
    url: "https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09",
  },
];

/**
 * Cookie Policy page component
 */
export default function CookiesPage() {
  const lastUpdated = "05/01/2026";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(var(--primary-rgb),0.15),transparent)]" />
        
        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              <Cookie className="w-3 h-3 mr-1" />
              Legal
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Cookie Policy
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              This policy explains how {SITE_NAME} uses cookies and similar technologies 
              to recognise you when you visit our website.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>
        </Container>
      </section>

      {/* What Are Cookies */}
      <section className="py-12 border-y border-border bg-muted/30">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Info className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">What Are Cookies?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Cookies are small text files that are stored on your device (computer, tablet, 
                  or mobile) when you visit a website. They help the website remember your 
                  preferences and understand how you use the site. Cookies are widely used to 
                  make websites work more efficiently and to provide a better user experience.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Cookie Types */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Types of Cookies We Use
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {COOKIE_TYPES.map((type) => (
                <Card key={type.title} className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <type.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span>{type.title}</span>
                      {type.required && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          Required
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {type.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Cookies Table */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  Cookies Used on This Site
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cookie Name</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Purpose</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Type</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {COOKIES_USED.map((cookie) => (
                        <TableRow key={cookie.name}>
                          <TableCell className="font-mono text-sm">
                            {cookie.name}
                          </TableCell>
                          <TableCell>{cookie.provider}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {cookie.purpose}
                          </TableCell>
                          <TableCell>{cookie.duration}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {cookie.type}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Managing Cookies */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Managing Your Cookie Preferences
            </h2>

            <div className="space-y-8">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-primary" />
                    Cookie Consent
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    When you first visit our website, we will ask you to consent to the use 
                    of cookies. You can choose to accept or decline non-essential cookies. 
                    Essential cookies cannot be declined as they are necessary for the 
                    website to function properly.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    You can change your cookie preferences at any time by clicking the 
                    &quot;Cookie Settings&quot; link in the footer of any page.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-primary" />
                    Browser Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Most web browsers allow you to control cookies through their settings. 
                    You can usually find these settings in the &quot;Options&quot; or 
                    &quot;Preferences&quot; menu of your browser. You can set your browser 
                    to refuse cookies or to alert you when cookies are being sent.
                  </p>
                  
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Please note that if you disable cookies, some features of our website 
                      may not work properly, and you may not be able to access certain areas 
                      or features.
                    </AlertDescription>
                  </Alert>

                  <div className="pt-4">
                    <p className="font-medium mb-3">
                      Learn how to manage cookies in your browser:
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {BROWSER_INSTRUCTIONS.map((browser) => (
                        <a
                          key={browser.browser}
                          href={browser.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-primary hover:underline"
                        >
                          <ExternalLink className="w-4 h-4" />
                          {browser.browser}
                        </a>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-primary" />
                    Third-Party Cookies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Some cookies are placed by third-party services that appear on our pages. 
                    We do not control these third-party cookies and they are subject to the 
                    respective third party&apos;s privacy policies.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    You can opt out of interest-based advertising by visiting:
                  </p>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="https://optout.networkadvertising.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Network Advertising Initiative Opt-Out
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.youronlinechoices.eu/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Your Online Choices (EU/UK)
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://tools.google.com/dlpage/gaoptout"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Google Analytics Opt-Out
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Policy Updates */}
      <section className="py-12 border-y border-border">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl font-semibold mb-4">Updates to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in 
              technology, legislation, or our data practices. When we make significant 
              changes, we will notify you by posting a notice on our website and updating 
              the &quot;Last updated&quot; date at the top of this policy. We encourage you 
              to review this policy periodically.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-muted/30">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Questions About Cookies?
            </h2>
            <p className="text-muted-foreground mb-6">
              If you have any questions about our use of cookies or this Cookie Policy, 
              please contact us.
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p>
                <strong className="text-foreground">Email:</strong>{" "}
                <a 
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="text-primary hover:underline"
                >
                  {SUPPORT_EMAIL}
                </a>
              </p>
              <p>
                <strong className="text-foreground">Address:</strong>{" "}
                {SITE_NAME}, 123 Innovation Way, London, EC1A 1BB, United Kingdom
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Separator />
    </div>
  );
}

