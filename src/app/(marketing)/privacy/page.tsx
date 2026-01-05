/**
 * Privacy Policy Page
 * 
 * Comprehensive privacy policy detailing how user data is collected,
 * processed, stored, and protected. Compliant with UK GDPR requirements.
 * 
 * @component
 */

import { Container } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SITE_NAME, SUPPORT_EMAIL } from "@/lib/constants";
import { 
  Shield, 
  Eye, 
  Database, 
  Share2, 
  Clock, 
  Lock, 
  UserCheck,
  Globe,
  Mail
} from "lucide-react";

/** Section data structure for privacy policy content */
interface PolicySection {
  icon: React.ElementType;
  title: string;
  content: string[];
}

/** Privacy policy sections */
const POLICY_SECTIONS: PolicySection[] = [
  {
    icon: Eye,
    title: "Information We Collect",
    content: [
      "Personal information you provide directly, such as your name, email address, and contact details when you register for an account or contact us.",
      "Usage data, including how you interact with our services, pages visited, features used, and time spent on our platform.",
      "Technical data such as your IP address, browser type, device information, and operating system.",
      "Cookie data and similar tracking technologies as described in our Cookie Policy.",
      "Payment information when you make purchases, processed securely through our payment providers.",
    ],
  },
  {
    icon: Database,
    title: "How We Use Your Information",
    content: [
      "To provide, maintain, and improve our services and features.",
      "To process transactions and send related information, including purchase confirmations and invoices.",
      "To send you technical notices, updates, security alerts, and support messages.",
      "To respond to your comments, questions, and customer service requests.",
      "To communicate with you about products, services, offers, and events, where you have opted in to receive such communications.",
      "To monitor and analyse trends, usage, and activities in connection with our services.",
      "To detect, investigate, and prevent fraudulent transactions and other illegal activities.",
    ],
  },
  {
    icon: Share2,
    title: "Information Sharing",
    content: [
      "We do not sell your personal information to third parties.",
      "We may share information with service providers who perform services on our behalf, such as hosting, analytics, and payment processing.",
      "We may disclose information if required by law, regulation, or legal process.",
      "We may share information in connection with a merger, acquisition, or sale of assets, with appropriate notice provided.",
      "We may share aggregated or anonymised information that cannot reasonably be used to identify you.",
    ],
  },
  {
    icon: Lock,
    title: "Data Security",
    content: [
      "We implement industry-standard security measures to protect your personal information.",
      "Data is encrypted in transit using TLS/SSL and at rest using AES-256 encryption.",
      "We regularly review and update our security practices to address emerging threats.",
      "Access to personal data is restricted to authorised personnel on a need-to-know basis.",
      "We conduct regular security audits and penetration testing.",
    ],
  },
  {
    icon: Clock,
    title: "Data Retention",
    content: [
      "We retain your personal information for as long as necessary to provide our services and fulfil the purposes outlined in this policy.",
      "Account data is retained while your account is active and for a reasonable period thereafter.",
      "You may request deletion of your data at any time, subject to legal retention requirements.",
      "Backup copies may be retained for a limited period for disaster recovery purposes.",
    ],
  },
  {
    icon: UserCheck,
    title: "Your Rights Under UK GDPR",
    content: [
      "Right of access: You can request a copy of the personal data we hold about you.",
      "Right to rectification: You can request correction of inaccurate or incomplete data.",
      "Right to erasure: You can request deletion of your personal data in certain circumstances.",
      "Right to restrict processing: You can request limitation of how we use your data.",
      "Right to data portability: You can request transfer of your data to another service.",
      "Right to object: You can object to processing based on legitimate interests or direct marketing.",
      "Rights related to automated decision-making: You can request human review of automated decisions.",
    ],
  },
  {
    icon: Globe,
    title: "International Transfers",
    content: [
      "Your information may be transferred to and processed in countries outside the UK.",
      "When we transfer data internationally, we ensure appropriate safeguards are in place.",
      "We use Standard Contractual Clauses approved by the UK Information Commissioner's Office.",
      "We only transfer data to countries with adequate data protection standards or to organisations with appropriate certifications.",
    ],
  },
];

/**
 * Privacy Policy page component
 */
export default function PrivacyPage() {
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
              <Shield className="w-3 h-3 mr-1" />
              Legal
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Your privacy is important to us. This policy explains how {SITE_NAME} collects, 
              uses, and protects your personal information.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>
        </Container>
      </section>

      {/* Introduction */}
      <section className="py-12 border-y border-border bg-muted/30">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground leading-relaxed">
              {SITE_NAME} (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to 
              protecting your privacy. This Privacy Policy explains how we collect, use, disclose, 
              and safeguard your information when you use our website and services. By using our 
              services, you agree to the collection and use of information in accordance with this policy.
            </p>
          </div>
        </Container>
      </section>

      {/* Policy Sections */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            {POLICY_SECTIONS.map((section, index) => (
              <Card key={section.title} className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span>{index + 1}. {section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li 
                        key={itemIndex} 
                        className="flex gap-3 text-muted-foreground leading-relaxed"
                      >
                        <span className="text-primary font-medium mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            {/* Children's Privacy */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-primary" />
                  </div>
                  <span>8. Children&apos;s Privacy</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are not intended for individuals under the age of 16. We do not 
                  knowingly collect personal information from children under 16. If you are a 
                  parent or guardian and believe your child has provided us with personal 
                  information, please contact us so we can take appropriate action.
                </p>
              </CardContent>
            </Card>

            {/* Policy Updates */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <span>9. Changes to This Policy</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any 
                  changes by posting the new Privacy Policy on this page and updating the 
                  &quot;Last updated&quot; date. We encourage you to review this Privacy Policy 
                  periodically for any changes. Changes are effective when they are posted on this page.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Questions About This Policy?
            </h2>
            <p className="text-muted-foreground mb-6">
              If you have any questions about this Privacy Policy or our data practices, 
              please contact our Data Protection Officer.
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

