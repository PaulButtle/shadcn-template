/**
 * About Page
 * 
 * Company story, mission, values and team members.
 * Showcases the brand identity and the people behind the product.
 * 
 * @component
 */

import Image from "next/image";
import { Container } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Target, 
  Lightbulb, 
  Users, 
  Heart, 
  Globe,
  Rocket,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";

/** Team member data structure */
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
}

/** Company value data structure */
interface CompanyValue {
  icon: React.ElementType;
  title: string;
  description: string;
}

/** Company statistics */
const STATS = [
  { label: "Founded", value: "2021" },
  { label: "Team Members", value: "45+" },
  { label: "Countries", value: "12" },
  { label: "Customers", value: "10,000+" },
];

/** Core company values */
const VALUES: CompanyValue[] = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We constantly push boundaries and explore new technologies to deliver cutting-edge solutions.",
  },
  {
    icon: Users,
    title: "Customer Obsessed",
    description: "Every decision we make starts with understanding our customers' needs and exceeding their expectations.",
  },
  {
    icon: Heart,
    title: "Craft with Care",
    description: "We take pride in the quality of our work, paying attention to every detail that makes a difference.",
  },
  {
    icon: Globe,
    title: "Think Global",
    description: "We build products that work for everyone, embracing diversity and inclusivity in everything we do.",
  },
];

/** Team members */
const TEAM: TeamMember[] = [
  {
    name: "Alexandra Wright",
    role: "Chief Executive Officer",
    bio: "Former tech lead at major fintech. 15 years in software development.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandra",
  },
  {
    name: "Marcus Thompson",
    role: "Chief Technology Officer",
    bio: "Ex-Google engineer. Specialises in scalable distributed systems.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
  },
  {
    name: "Sophie Chen",
    role: "Head of Design",
    bio: "Award-winning designer. Previously at leading design agencies.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
  },
  {
    name: "Daniel Okonkwo",
    role: "Head of Engineering",
    bio: "Full-stack expert. Open source contributor and tech speaker.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel",
  },
  {
    name: "Emma Richardson",
    role: "Head of Product",
    bio: "Product strategist with experience at multiple successful startups.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=EmmaR",
  },
  {
    name: "James Patel",
    role: "Head of Customer Success",
    bio: "Customer experience specialist. Passionate about user satisfaction.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=JamesP",
  },
];

/** Milestones in company history */
const MILESTONES = [
  { year: "2021", title: "Founded", description: "Started with a vision to simplify digital experiences" },
  { year: "2022", title: "Seed Funding", description: "Raised £2M to accelerate product development" },
  { year: "2023", title: "Launch", description: "Released v1.0 and acquired first 1,000 customers" },
  { year: "2024", title: "Series A", description: "Secured £15M funding to expand globally" },
  { year: "2025", title: "10K Users", description: "Reached milestone of 10,000 active customers" },
];

/**
 * About page component showcasing company information
 */
export default function AboutPage() {
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
              <Award className="w-3 h-3 mr-1" />
              About Us
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Building the future of{" "}
              <span className="text-primary">digital experiences</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              We&apos;re a team of passionate builders, designers, and dreamers 
              working to create tools that empower businesses to thrive in the digital age.
            </p>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border bg-muted/30">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-primary mb-4">
                <Target className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">Our Mission</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Empowering creators to build without limits
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We believe that great software should be accessible to everyone. Our mission 
                is to provide the tools, templates, and resources that help developers and 
                businesses bring their ideas to life faster than ever before.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you&apos;re a solo founder, a growing startup, or an enterprise team, 
                we&apos;re here to help you succeed with beautiful, functional, and scalable solutions.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-8 flex items-center justify-center">
                <Rocket className="w-32 h-32 text-primary/60" />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
            </div>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value) => (
              <Card 
                key={value.title} 
                className="bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline Section */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground">
              Key milestones that shaped who we are today
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 w-px h-full bg-border transform -translate-x-1/2" />
              
              {MILESTONES.map((milestone, index) => (
                <div 
                  key={milestone.year}
                  className={cn(
                    "relative flex items-center gap-8 mb-12 last:mb-0",
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  {/* Content */}
                  <div className={cn(
                    "flex-1 pl-8 md:pl-0",
                    index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                  )}>
                    <Badge variant="outline" className="mb-2">{milestone.year}</Badge>
                    <h3 className="font-semibold text-lg mb-1">{milestone.title}</h3>
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  </div>
                  
                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background transform -translate-x-1/2" />
                  
                  {/* Empty space for alignment */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground">
              The talented people behind our success
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((member) => (
              <Card 
                key={member.name}
                className="bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 overflow-hidden">
                    <Image
                      src={member.avatarUrl}
                      alt={member.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-sm text-primary mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <Separator />
    </div>
  );
}

