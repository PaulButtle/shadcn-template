/**
 * Careers Page
 * 
 * Job openings, company culture, and benefits.
 * Showcases open positions and what it's like to work at the company.
 * 
 * @component
 */

import Link from "next/link";
import { Container } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Building2,
  Heart,
  Zap,
  Globe,
  GraduationCap,
  Coffee,
  Laptop,
  Plane,
  DollarSign,
  ChevronRight,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

/** Job position data structure */
interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  remote: boolean;
}

/** Benefit data structure */
interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
}

/** Company departments */
const DEPARTMENTS = [
  "All",
  "Engineering",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Operations",
];

/** Company benefits */
const BENEFITS: Benefit[] = [
  {
    icon: DollarSign,
    title: "Competitive Salary",
    description: "We offer market-leading salaries benchmarked against top tech companies.",
  },
  {
    icon: Laptop,
    title: "Remote First",
    description: "Work from anywhere in the world. We're a fully distributed team.",
  },
  {
    icon: Heart,
    title: "Health & Wellbeing",
    description: "Comprehensive private health insurance and mental health support.",
  },
  {
    icon: Plane,
    title: "Generous Holiday",
    description: "30 days annual leave plus bank holidays and your birthday off.",
  },
  {
    icon: GraduationCap,
    title: "Learning Budget",
    description: "£2,000 annual budget for courses, conferences, and books.",
  },
  {
    icon: Coffee,
    title: "Home Office Setup",
    description: "£1,500 budget to create your perfect home office environment.",
  },
];

/** Culture values */
const CULTURE_VALUES = [
  {
    icon: Zap,
    title: "Move Fast",
    description: "We ship quickly and iterate based on real feedback.",
  },
  {
    icon: Users,
    title: "Collaborate",
    description: "Great things happen when we work together openly.",
  },
  {
    icon: Heart,
    title: "Care Deeply",
    description: "We care about our craft, our customers, and each other.",
  },
  {
    icon: Globe,
    title: "Think Big",
    description: "We're building something that will impact millions.",
  },
];

/** Open job positions */
const JOB_POSITIONS: JobPosition[] = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "London / Remote",
    type: "Full-time",
    remote: true,
  },
  {
    id: "2",
    title: "Backend Engineer",
    department: "Engineering",
    location: "London / Remote",
    type: "Full-time",
    remote: true,
  },
  {
    id: "3",
    title: "Staff Engineer",
    department: "Engineering",
    location: "London",
    type: "Full-time",
    remote: false,
  },
  {
    id: "4",
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    remote: true,
  },
  {
    id: "5",
    title: "Senior Product Manager",
    department: "Product",
    location: "London / Remote",
    type: "Full-time",
    remote: true,
  },
  {
    id: "6",
    title: "Growth Marketing Manager",
    department: "Marketing",
    location: "London",
    type: "Full-time",
    remote: false,
  },
  {
    id: "7",
    title: "Enterprise Account Executive",
    department: "Sales",
    location: "London",
    type: "Full-time",
    remote: false,
  },
  {
    id: "8",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Contract",
    remote: true,
  },
];

/**
 * Careers page component showcasing job opportunities
 */
export default function CareersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-background to-teal-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.1),transparent_50%)]" />
        
        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              <Briefcase className="w-3 h-3 mr-1" />
              Careers
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Join us in building{" "}
              <span className="text-emerald-500">something great</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              We&apos;re looking for talented people who are passionate about 
              creating exceptional digital experiences. Come grow with us.
            </p>
            <Button 
              size="lg" 
              className="h-12 px-8 bg-emerald-500 hover:bg-emerald-600 text-white"
              asChild
            >
              <Link href="#open-positions">
                View Open Positions
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Culture Section */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <Container>
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Culture</h2>
            <p className="text-lg text-muted-foreground">
              What it&apos;s like to work at Acme
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CULTURE_VALUES.map((value) => (
              <Card 
                key={value.title}
                className="bg-background/50 backdrop-blur-sm border-border/50 hover:border-emerald-500/30 transition-all text-center"
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-emerald-500" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <Badge variant="secondary" className="mb-4 bg-emerald-500/10 text-emerald-600">
                Benefits
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                We take care of our team
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe happy, healthy people do their best work. That&apos;s why we 
                offer a comprehensive benefits package designed to support your 
                wellbeing and growth.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {BENEFITS.map((benefit) => (
                <Card 
                  key={benefit.title}
                  className="bg-background/50 border-border/50 hover:border-emerald-500/30 transition-colors"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                        <benefit.icon className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Open Positions Section */}
      <section id="open-positions" className="py-20 lg:py-28 bg-muted/30 scroll-mt-20">
        <Container>
          <div className="max-w-2xl mx-auto text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-emerald-500/10 text-emerald-600">
              {JOB_POSITIONS.length} Open Roles
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
            <p className="text-lg text-muted-foreground">
              Find your next opportunity and help us shape the future
            </p>
          </div>

          {/* Department filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
            {DEPARTMENTS.map((dept) => (
              <Button
                key={dept}
                variant={dept === "All" ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "shrink-0",
                  dept === "All" && "bg-emerald-500 hover:bg-emerald-600 text-white"
                )}
              >
                {dept}
              </Button>
            ))}
          </div>

          {/* Job listings */}
          <div className="space-y-4">
            {JOB_POSITIONS.map((job) => (
              <Link key={job.id} href={`/careers/${job.id}`}>
                <Card className="group border-border/50 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg group-hover:text-emerald-500 transition-colors">
                            {job.title}
                          </h3>
                          {job.remote && (
                            <Badge variant="outline" className="text-xs">
                              Remote
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            {job.department}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.type}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="shrink-0 group-hover:text-emerald-500">
                        View Role
                        <ChevronRight className="ml-1 w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* No Match CTA */}
      <section className="py-20 lg:py-28">
        <Container>
          <Card className="bg-gradient-to-br from-emerald-500/10 via-background to-teal-500/10 border-emerald-500/20">
            <CardContent className="p-8 lg:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Don&apos;t see a match?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                We&apos;re always looking for talented people. If you think you&apos;d be a great 
                fit but don&apos;t see an open role, we&apos;d still love to hear from you.
              </p>
              <Button 
                size="lg"
                variant="outline"
                className="border-emerald-500/50 hover:bg-emerald-500/10"
                asChild
              >
                <Link href="/contact">
                  Get in Touch
                </Link>
              </Button>
            </CardContent>
          </Card>
        </Container>
      </section>

      <Separator />
    </div>
  );
}

