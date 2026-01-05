/**
 * Deployment Documentation Page
 *
 * Guide to deploying the template to various platforms.
 *
 * @component
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, AlertCircle, Cloud, Server, Container } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata: Metadata = {
  title: "Deployment",
  description:
    "Deploy your ShadCN Template application to Vercel, Docker, or your own infrastructure.",
};

/**
 * Deployment documentation page
 */
export default function DeploymentPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold tracking-tight">Deployment</h1>
          <Badge variant="secondary" className="text-xs">New</Badge>
        </div>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Deploy your application to production with these platform-specific guides.
        </p>
      </div>

      {/* Platform Options */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Deployment Options</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <PlatformCard
            icon={<Cloud className="h-5 w-5" />}
            name="Vercel"
            description="Recommended. Zero-config deployment."
            recommended
          />
          <PlatformCard
            icon={<Container className="h-5 w-5" />}
            name="Docker"
            description="Containerised deployment anywhere."
          />
          <PlatformCard
            icon={<Server className="h-5 w-5" />}
            name="Self-Hosted"
            description="Run on your own infrastructure."
          />
        </div>
      </section>

      <Separator />

      {/* Pre-deployment Checklist */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Pre-Deployment Checklist</h2>
        <p className="text-muted-foreground">
          Before deploying, ensure you&apos;ve completed these steps:
        </p>
        <div className="space-y-2">
          <ChecklistItem>Run type check: <code>npm run type-check</code></ChecklistItem>
          <ChecklistItem>Run linter: <code>npm run lint</code></ChecklistItem>
          <ChecklistItem>Test production build: <code>npm run build</code></ChecklistItem>
          <ChecklistItem>Set all required environment variables</ChecklistItem>
          <ChecklistItem>Update metadata in <code>layout.tsx</code></ChecklistItem>
          <ChecklistItem>Configure your domain</ChecklistItem>
        </div>
      </section>

      <Separator />

      {/* Vercel */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Cloud className="h-6 w-6 text-primary" />
          Vercel Deployment
        </h2>
        <p className="text-muted-foreground">
          Vercel is the easiest way to deploy Next.js applications. It&apos;s made by the
          creators of Next.js and offers zero-configuration deployment.
        </p>

        <h3 className="text-xl font-semibold mt-6">Option 1: Import from Git</h3>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li>Push your code to GitHub, GitLab, or Bitbucket</li>
          <li>Go to <Link href="https://vercel.com/new" className="text-primary hover:underline">vercel.com/new</Link></li>
          <li>Import your repository</li>
          <li>Configure environment variables</li>
          <li>Click Deploy</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6">Option 2: Vercel CLI</h3>
        <CodeBlock language="bash" title="Terminal">
{`# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod`}
        </CodeBlock>

        <h3 className="text-xl font-semibold mt-6">Environment Variables</h3>
        <p className="text-muted-foreground">
          Set environment variables in the Vercel dashboard under Project Settings → Environment Variables:
        </p>
        <CodeBlock language="bash" title="Required Variables">
{`NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME=Your App Name

# Add your other variables:
# DATABASE_URL=your_database_url
# NEXTAUTH_SECRET=your_secret
# NEXTAUTH_URL=https://your-domain.com`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Docker */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Container className="h-6 w-6 text-primary" />
          Docker Deployment
        </h2>
        <p className="text-muted-foreground">
          Deploy with Docker for consistent environments across development and production.
        </p>

        <h3 className="text-xl font-semibold mt-6">Dockerfile</h3>
        <CodeBlock language="dockerfile" title="Dockerfile">
{`# syntax=docker.io/docker/dockerfile:1

FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]`}
        </CodeBlock>

        <h3 className="text-xl font-semibold mt-6">Docker Compose</h3>
        <CodeBlock language="yaml" title="docker-compose.yml">
{`version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_APP_URL=http://localhost:3000
    restart: unless-stopped`}
        </CodeBlock>

        <h3 className="text-xl font-semibold mt-6">Build and Run</h3>
        <CodeBlock language="bash" title="Terminal">
{`# Build the image
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app

# Or with Docker Compose
docker compose up -d`}
        </CodeBlock>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Standalone Output</AlertTitle>
          <AlertDescription>
            Add <code>output: &quot;standalone&quot;</code> to your <code>next.config.ts</code> for
            optimal Docker builds with minimal image size.
          </AlertDescription>
        </Alert>
      </section>

      <Separator />

      {/* Self-Hosted */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Server className="h-6 w-6 text-primary" />
          Self-Hosted Deployment
        </h2>
        <p className="text-muted-foreground">
          Run on your own server with Node.js.
        </p>

        <h3 className="text-xl font-semibold mt-6">Build</h3>
        <CodeBlock language="bash" title="Terminal">
{`# Install dependencies
npm ci

# Build for production
npm run build`}
        </CodeBlock>

        <h3 className="text-xl font-semibold mt-6">Start</h3>
        <CodeBlock language="bash" title="Terminal">
{`# Start the production server
npm run start

# Or with a process manager (PM2)
npm install -g pm2
pm2 start npm --name "my-app" -- start
pm2 save
pm2 startup`}
        </CodeBlock>

        <h3 className="text-xl font-semibold mt-6">Nginx Reverse Proxy</h3>
        <CodeBlock language="nginx" title="/etc/nginx/sites-available/my-app">
{`server {
    listen 80;
    server_name example.com www.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# For HTTPS, use certbot:
# sudo certbot --nginx -d example.com -d www.example.com`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Environment Variables */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Environment Variables</h2>
        <p className="text-muted-foreground">
          Production environment variables to configure:
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium">Variable</th>
                <th className="text-left p-3 font-medium">Description</th>
                <th className="text-left p-3 font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <EnvRow name="NODE_ENV" desc="Set to 'production'" required />
              <EnvRow name="NEXT_PUBLIC_APP_URL" desc="Your production URL" required />
              <EnvRow name="NEXT_PUBLIC_APP_NAME" desc="Application name" />
              <EnvRow name="DATABASE_URL" desc="Database connection string" />
              <EnvRow name="NEXTAUTH_SECRET" desc="NextAuth.js secret key" />
              <EnvRow name="NEXTAUTH_URL" desc="Production URL for NextAuth" />
            </tbody>
          </table>
        </div>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Security</AlertTitle>
          <AlertDescription>
            Never commit sensitive environment variables to version control. Use your
            platform&apos;s secrets management or environment configuration.
          </AlertDescription>
        </Alert>
      </section>

      <Separator />

      {/* Post-Deployment */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Post-Deployment</h2>
        <p className="text-muted-foreground">
          After deploying, verify these items:
        </p>
        <div className="space-y-2">
          <ChecklistItem>Application loads correctly</ChecklistItem>
          <ChecklistItem>Authentication flows work</ChecklistItem>
          <ChecklistItem>Dark mode functions properly</ChecklistItem>
          <ChecklistItem>Forms submit successfully</ChecklistItem>
          <ChecklistItem>API endpoints respond</ChecklistItem>
          <ChecklistItem>HTTPS is configured</ChecklistItem>
          <ChecklistItem>Analytics are tracking (if enabled)</ChecklistItem>
        </div>
      </section>

      <Separator />

      {/* Monitoring */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Monitoring & Analytics</h2>
        <p className="text-muted-foreground">
          Consider adding these services for production monitoring:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <MonitoringCard
            name="Vercel Analytics"
            description="Built-in performance and audience insights"
          />
          <MonitoringCard
            name="Sentry"
            description="Error tracking and performance monitoring"
          />
          <MonitoringCard
            name="PostHog"
            description="Product analytics and feature flags"
          />
          <MonitoringCard
            name="Plausible / Fathom"
            description="Privacy-friendly analytics"
          />
        </div>
      </section>

      {/* Next Steps */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Next Steps</h2>
        <p className="text-muted-foreground">
          Congratulations! Your application is now deployed. Here are some next steps:
        </p>
        <div className="flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/docs">
              Back to Documentation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="https://github.com/acme/shadcn-template/issues" target="_blank">
              Report Issues
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// Helper Components
// ============================================================================

/** Platform card */
function PlatformCard({
  icon,
  name,
  description,
  recommended,
}: {
  icon: React.ReactNode;
  name: string;
  description: string;
  recommended?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border p-4 relative">
      {recommended && (
        <Badge className="absolute -top-2 right-2 text-xs">Recommended</Badge>
      )}
      <div className="rounded-lg bg-primary/10 p-2 text-primary w-fit">
        {icon}
      </div>
      <h3 className="font-medium mt-3">{name}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

/** Checklist item */
function ChecklistItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle2 className="h-5 w-5 text-primary" />
      <span className="text-sm">{children}</span>
    </div>
  );
}

/** Environment variable table row */
function EnvRow({
  name,
  desc,
  required,
}: {
  name: string;
  desc: string;
  required?: boolean;
}) {
  return (
    <tr className="border-t border-border">
      <td className="p-3 font-mono text-sm text-primary">{name}</td>
      <td className="p-3 text-sm text-muted-foreground">{desc}</td>
      <td className="p-3">
        {required ? (
          <Badge variant="outline" className="text-xs">Required</Badge>
        ) : (
          <span className="text-muted-foreground text-xs">Optional</span>
        )}
      </td>
    </tr>
  );
}

/** Monitoring service card */
function MonitoringCard({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-border p-4">
      <h4 className="font-medium">{name}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

