/**
 * Contact Page
 * 
 * Contact form, office locations, and support information.
 * Allows users to get in touch with the company.
 * 
 * @component
 */

import Link from "next/link";
import { Container } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Mail, 
  MessageSquare, 
  MapPin, 
  Phone,
  Clock,
  Send,
  HelpCircle,
  Building,
  Headphones
} from "lucide-react";
import { SUPPORT_EMAIL } from "@/lib/constants";

/** Contact method data structure */
interface ContactMethod {
  icon: React.ElementType;
  title: string;
  description: string;
  value: string;
  action?: string;
}

/** Office location data structure */
interface OfficeLocation {
  city: string;
  country: string;
  address: string;
  phone: string;
}

/** Contact methods */
const CONTACT_METHODS: ContactMethod[] = [
  {
    icon: Mail,
    title: "Email Us",
    description: "We'll respond within 24 hours",
    value: SUPPORT_EMAIL,
    action: `mailto:${SUPPORT_EMAIL}`,
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Available Mon-Fri, 9am-6pm GMT",
    value: "Start a conversation",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "For urgent enquiries",
    value: "+44 20 1234 5678",
    action: "tel:+442012345678",
  },
];

/** Office locations */
const OFFICES: OfficeLocation[] = [
  {
    city: "London",
    country: "United Kingdom",
    address: "123 Tech Hub, Shoreditch, EC2A 4BX",
    phone: "+44 20 1234 5678",
  },
  {
    city: "Manchester",
    country: "United Kingdom",
    address: "45 Innovation Quarter, M1 5AN",
    phone: "+44 161 234 5678",
  },
];

/** Contact form topics */
const CONTACT_TOPICS = [
  "General Enquiry",
  "Sales",
  "Technical Support",
  "Partnership",
  "Press & Media",
  "Careers",
  "Other",
];

/**
 * Contact page component with form and contact information
 */
export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-background to-purple-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.1),transparent_50%)]" />
        
        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              <MessageSquare className="w-3 h-3 mr-1" />
              Contact
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Let&apos;s start a{" "}
              <span className="text-violet-500">conversation</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Have a question, feedback, or just want to say hello? We&apos;d love to 
              hear from you. Our team is here to help.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Methods */}
      <section className="py-12 border-y border-border bg-muted/30">
        <Container>
          <div className="grid md:grid-cols-3 gap-6">
            {CONTACT_METHODS.map((method) => (
              <Card 
                key={method.title}
                className="bg-background/50 backdrop-blur-sm border-border/50 hover:border-violet-500/30 transition-colors"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-violet-500/10 flex items-center justify-center mx-auto mb-4">
                    <method.icon className="w-6 h-6 text-violet-500" />
                  </div>
                  <h3 className="font-semibold mb-1">{method.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                  {method.action ? (
                    <a 
                      href={method.action}
                      className="text-sm font-medium text-violet-500 hover:text-violet-600 transition-colors"
                    >
                      {method.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-violet-500">{method.value}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Form */}
            <div>
              <Badge variant="secondary" className="mb-4 bg-violet-500/10 text-violet-600">
                <Send className="w-3 h-3 mr-1" />
                Send a Message
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Get in touch
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>
              
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input 
                      id="firstName"
                      placeholder="John"
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input 
                      id="lastName"
                      placeholder="Doe"
                      className="bg-background/50"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="bg-background/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company (optional)</Label>
                  <Input 
                    id="company"
                    placeholder="Your company name"
                    className="bg-background/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic</Label>
                  <Select>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {CONTACT_TOPICS.map((topic) => (
                        <SelectItem key={topic} value={topic.toLowerCase().replace(/\s+/g, "-")}>
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message"
                    placeholder="Tell us how we can help..."
                    rows={5}
                    className="bg-background/50 resize-none"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full sm:w-auto bg-violet-500 hover:bg-violet-600 text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
            
            {/* Support Info */}
            <div className="space-y-8">
              {/* Support card */}
              <Card className="bg-gradient-to-br from-violet-500/10 via-background to-purple-500/10 border-violet-500/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-violet-500/20 flex items-center justify-center shrink-0">
                      <Headphones className="w-6 h-6 text-violet-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Need immediate help?</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Our support team is available Monday to Friday, 9am-6pm GMT.
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>Average response time: &lt;2 hours</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ link */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <HelpCircle className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Check our FAQ</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Find quick answers to common questions about our platform.
                      </p>
                      <Link 
                        href="/#faq" 
                        className="text-sm font-medium text-violet-500 hover:text-violet-600 transition-colors"
                      >
                        Browse FAQ →
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Office locations */}
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-violet-500" />
                  Our Offices
                </h3>
                <div className="space-y-4">
                  {OFFICES.map((office) => (
                    <Card key={office.city} className="border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">{office.city}, {office.country}</p>
                            <p className="text-sm text-muted-foreground">{office.address}</p>
                            <a 
                              href={`tel:${office.phone.replace(/\s/g, "")}`}
                              className="text-sm text-violet-500 hover:text-violet-600 transition-colors"
                            >
                              {office.phone}
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Separator />
    </div>
  );
}

