/**
 * Terms of Service Page
 * 
 * Legal terms and conditions governing the use of the platform.
 * Includes acceptance of terms, user responsibilities, and legal disclaimers.
 * 
 * @component
 */

import { Container } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SITE_NAME, SUPPORT_EMAIL } from "@/lib/constants";
import { 
  FileText, 
  CheckCircle, 
  UserCheck, 
  CreditCard, 
  Shield, 
  AlertTriangle,
  Scale,
  XCircle,
  RefreshCw,
  Mail,
  Info
} from "lucide-react";

/** Section data structure for terms content */
interface TermsSection {
  icon: React.ElementType;
  title: string;
  content: string[];
}

/** Terms of service sections */
const TERMS_SECTIONS: TermsSection[] = [
  {
    icon: CheckCircle,
    title: "Acceptance of Terms",
    content: [
      "By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations.",
      "If you do not agree with any of these terms, you are prohibited from using or accessing our services.",
      "We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.",
      "These terms constitute the entire agreement between you and us regarding the use of our services.",
    ],
  },
  {
    icon: UserCheck,
    title: "Account Registration",
    content: [
      "You must be at least 16 years old to create an account and use our services.",
      "You are responsible for maintaining the confidentiality of your account credentials.",
      "You agree to provide accurate, current, and complete information during registration.",
      "You are responsible for all activities that occur under your account.",
      "You must notify us immediately of any unauthorised use of your account.",
      "We reserve the right to suspend or terminate accounts that violate these terms.",
    ],
  },
  {
    icon: Shield,
    title: "Acceptable Use",
    content: [
      "You agree to use our services only for lawful purposes and in accordance with these terms.",
      "You shall not use our services to transmit harmful, offensive, or illegal content.",
      "You shall not attempt to gain unauthorised access to our systems or other users' accounts.",
      "You shall not interfere with or disrupt the integrity or performance of our services.",
      "You shall not use automated systems or software to extract data from our services without permission.",
      "You shall not impersonate any person or entity or misrepresent your affiliation.",
    ],
  },
  {
    icon: CreditCard,
    title: "Payments and Billing",
    content: [
      "Paid services are billed in advance on a monthly or annual basis, as selected during subscription.",
      "All fees are quoted in British Pounds (£) unless otherwise stated.",
      "You authorise us to charge your payment method for all fees due.",
      "Prices are subject to change with 30 days' notice for existing subscribers.",
      "Refunds may be available within 14 days of purchase in accordance with UK consumer rights.",
      "Failure to pay may result in suspension or termination of your account.",
    ],
  },
  {
    icon: RefreshCw,
    title: "Subscription and Cancellation",
    content: [
      "Subscriptions automatically renew unless cancelled before the renewal date.",
      "You may cancel your subscription at any time through your account settings.",
      "Cancellation takes effect at the end of the current billing period.",
      "No refunds are provided for partial billing periods unless required by law.",
      "Upon cancellation, you retain access to your account until the end of the paid period.",
      "We may offer a pro-rata refund at our discretion for annual subscriptions.",
    ],
  },
  {
    icon: FileText,
    title: "Intellectual Property",
    content: [
      "All content, features, and functionality of our services are owned by us and protected by intellectual property laws.",
      "You retain ownership of any content you submit to our services.",
      "By submitting content, you grant us a licence to use, display, and distribute it in connection with our services.",
      "You may not copy, modify, distribute, or create derivative works of our services without permission.",
      "Our trademarks and trade dress may not be used without our prior written consent.",
    ],
  },
  {
    icon: XCircle,
    title: "Termination",
    content: [
      "We may terminate or suspend your access immediately, without prior notice, for any breach of these terms.",
      "Upon termination, your right to use our services will cease immediately.",
      "We may retain and use your information as necessary to comply with legal obligations.",
      "All provisions of these terms that should survive termination will survive.",
      "You may request export of your data within 30 days of termination.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Limitation of Liability",
    content: [
      "Our services are provided \"as is\" and \"as available\" without warranties of any kind.",
      "We do not warrant that our services will be uninterrupted, secure, or error-free.",
      "In no event shall we be liable for any indirect, incidental, special, or consequential damages.",
      "Our total liability shall not exceed the amount paid by you in the 12 months preceding the claim.",
      "Nothing in these terms excludes liability for death, personal injury, or fraud caused by our negligence.",
      "These limitations apply to the fullest extent permitted by UK law.",
    ],
  },
  {
    icon: Scale,
    title: "Governing Law and Disputes",
    content: [
      "These terms are governed by the laws of England and Wales.",
      "Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.",
      "If you are a consumer, you may also have rights under the laws of your country of residence.",
      "We encourage you to contact us first to resolve any disputes informally.",
      "Nothing in these terms affects your statutory rights as a consumer under UK law.",
    ],
  },
];

/**
 * Terms of Service page component
 */
export default function TermsPage() {
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
              <FileText className="w-3 h-3 mr-1" />
              Legal
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Terms of Service
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Please read these terms carefully before using {SITE_NAME}&apos;s services.
              By using our platform, you agree to these terms.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>
        </Container>
      </section>

      {/* Important Notice */}
      <section className="py-6 border-y border-border bg-muted/30">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> These terms constitute a legally binding agreement 
                between you and {SITE_NAME}. Please read them carefully and contact us if you 
                have any questions before using our services.
              </AlertDescription>
            </Alert>
          </div>
        </Container>
      </section>

      {/* Terms Sections */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            {TERMS_SECTIONS.map((section, index) => (
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

            {/* Indemnification */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <span>10. Indemnification</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  You agree to defend, indemnify, and hold harmless {SITE_NAME}, its officers, 
                  directors, employees, and agents from and against any claims, damages, obligations, 
                  losses, liabilities, costs, or debt arising from: (a) your use of our services; 
                  (b) your violation of these terms; (c) your violation of any third-party right, 
                  including intellectual property rights; or (d) any content you submit to our services.
                </p>
              </CardContent>
            </Card>

            {/* Severability */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Scale className="w-5 h-5 text-primary" />
                  </div>
                  <span>11. Severability</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  If any provision of these terms is found to be unenforceable or invalid under 
                  applicable law, the unenforceable or invalid provision will be modified to 
                  reflect the parties&apos; intention or eliminated to the minimum extent necessary, 
                  and all other provisions will remain in full force and effect.
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
              Questions About These Terms?
            </h2>
            <p className="text-muted-foreground mb-6">
              If you have any questions about these Terms of Service, please contact our legal team.
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
              <p>
                <strong className="text-foreground">Company Number:</strong>{" "}
                12345678 (Registered in England and Wales)
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Separator />
    </div>
  );
}

