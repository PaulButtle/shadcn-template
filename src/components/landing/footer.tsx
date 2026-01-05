/**
 * Footer Component
 * 
 * Site footer with navigation links, social media icons, and copyright.
 * Responsive layout that stacks on mobile and spreads on desktop.
 * 
 * @component
 * @example
 * ```tsx
 * <Footer />
 * ```
 */

import Link from "next/link";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Container, Logo } from "@/components/shared";
import { FOOTER_LINKS, SOCIAL_LINKS, SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Social media icon components mapped by platform */
const socialIcons = {
  twitter: Twitter,
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
};

/**
 * Site footer with navigation and social links
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t border-border">
      <Container>
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <Logo href="/" size="md" />
              <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
                The modern platform for building exceptional digital experiences. 
                Start creating today.
              </p>
              
              {/* Social Links */}
              <div className="mt-6 flex gap-3">
                {Object.entries(SOCIAL_LINKS).map(([platform, url]) => {
                  const Icon = socialIcons[platform as keyof typeof socialIcons];
                  if (!Icon) return null;
                  
                  return (
                    <Link
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center",
                        "bg-muted hover:bg-primary/10 hover:text-primary",
                        "text-muted-foreground transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      )}
                      aria-label={`Follow us on ${platform}`}
                    >
                      <Icon className="w-4 h-4" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Navigation Columns */}
            {Object.values(FOOTER_LINKS).map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-foreground mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        className={cn(
                          "text-sm text-muted-foreground",
                          "hover:text-foreground transition-colors",
                          "focus-visible:outline-none focus-visible:text-primary"
                        )}
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link 
              href="/privacy" 
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link 
              href="/terms" 
              className="hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <Link 
              href="/cookies" 
              className="hover:text-foreground transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

