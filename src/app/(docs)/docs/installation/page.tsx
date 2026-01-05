/**
 * Installation Documentation Page
 *
 * Step-by-step guide for installing and setting up the template.
 *
 * @component
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata: Metadata = {
  title: "Installation",
  description:
    "Get started with ShadCN Template in under 5 minutes. Clone the repository, install dependencies, and start building.",
};

/**
 * Installation guide page
 */
export default function InstallationPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Installation</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Get up and running with ShadCN Template in under 5 minutes.
        </p>
      </div>

      {/* Prerequisites */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Prerequisites</h2>
        <p className="text-muted-foreground">
          Before you begin, ensure you have the following installed:
        </p>
        <ul className="space-y-2">
          <PrerequisiteItem>Node.js 18.17 or later</PrerequisiteItem>
          <PrerequisiteItem>npm, pnpm, or yarn</PrerequisiteItem>
          <PrerequisiteItem>Git</PrerequisiteItem>
        </ul>
      </section>

      <Separator />

      {/* Step 1: Clone */}
      <section className="space-y-4">
        <StepHeader number={1} title="Clone the Repository" />
        <p className="text-muted-foreground">
          Start by cloning the template repository to your local machine:
        </p>
        <CodeBlock language="bash" title="Terminal">
{`git clone https://github.com/acme/shadcn-template.git my-project
cd my-project`}
        </CodeBlock>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Tip</AlertTitle>
          <AlertDescription>
            Replace <code className="text-primary">my-project</code> with your desired project name.
          </AlertDescription>
        </Alert>
      </section>

      <Separator />

      {/* Step 2: Install Dependencies */}
      <section className="space-y-4">
        <StepHeader number={2} title="Install Dependencies" />
        <p className="text-muted-foreground">
          Install all required packages using your preferred package manager:
        </p>
        <CodeBlock language="bash" title="npm">
{`npm install`}
        </CodeBlock>
        <p className="text-sm text-muted-foreground">
          Or with pnpm/yarn:
        </p>
        <CodeBlock language="bash" title="pnpm / yarn">
{`pnpm install
# or
yarn install`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Step 3: Environment Variables */}
      <section className="space-y-4">
        <StepHeader number={3} title="Configure Environment Variables" />
        <p className="text-muted-foreground">
          Create a local environment file by copying the example:
        </p>
        <CodeBlock language="bash" title="Terminal">
{`cp .env.example .env.local`}
        </CodeBlock>
        <p className="text-muted-foreground">
          Open <code className="text-primary">.env.local</code> and configure your environment variables:
        </p>
        <CodeBlock language="bash" title=".env.local">
{`# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="My Application"

# Add your API keys and secrets here
# DATABASE_URL=your_database_url
# NEXTAUTH_SECRET=your_secret_key`}
        </CodeBlock>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Never commit <code className="text-primary">.env.local</code> to version control.
            It&apos;s already included in <code className="text-primary">.gitignore</code>.
          </AlertDescription>
        </Alert>
      </section>

      <Separator />

      {/* Step 4: Start Development Server */}
      <section className="space-y-4">
        <StepHeader number={4} title="Start the Development Server" />
        <p className="text-muted-foreground">
          Run the development server to see the template in action:
        </p>
        <CodeBlock language="bash" title="Terminal">
{`npm run dev`}
        </CodeBlock>
        <p className="text-muted-foreground">
          Open{" "}
          <Link href="http://localhost:3000" className="text-primary hover:underline">
            http://localhost:3000
          </Link>{" "}
          in your browser. You should see the landing page!
        </p>
      </section>

      <Separator />

      {/* Step 5: Verify TypeScript */}
      <section className="space-y-4">
        <StepHeader number={5} title="Verify TypeScript Setup" />
        <p className="text-muted-foreground">
          Run the type checker to ensure everything is configured correctly:
        </p>
        <CodeBlock language="bash" title="Terminal">
{`npm run type-check`}
        </CodeBlock>
        <p className="text-muted-foreground">
          If there are no errors, your setup is complete! 🎉
        </p>
      </section>

      <Separator />

      {/* Available Scripts */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Available Scripts</h2>
        <p className="text-muted-foreground">
          The following scripts are available in <code className="text-primary">package.json</code>:
        </p>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium">Command</th>
                <th className="text-left p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <ScriptRow command="npm run dev" description="Start development server" />
              <ScriptRow command="npm run build" description="Build for production" />
              <ScriptRow command="npm run start" description="Start production server" />
              <ScriptRow command="npm run lint" description="Run ESLint" />
              <ScriptRow command="npm run lint:fix" description="Fix ESLint errors" />
              <ScriptRow command="npm run type-check" description="Check TypeScript types" />
            </tbody>
          </table>
        </div>
      </section>

      <Separator />

      {/* Next Steps */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Next Steps</h2>
        <p className="text-muted-foreground">
          Now that you&apos;re set up, explore the documentation to learn more:
        </p>
        <div className="flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/docs/structure">
              Project Structure
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/architecture">
              Architecture
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/components">
              Components
            </Link>
          </Button>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Troubleshooting</h2>
        
        <div className="space-y-4">
          <TroubleshootItem
            question="Getting 'Module not found' errors?"
            answer="Try deleting node_modules and package-lock.json, then run npm install again."
          />
          <TroubleshootItem
            question="Port 3000 already in use?"
            answer="Either stop the process using that port, or run npm run dev -- -p 3001 to use a different port."
          />
          <TroubleshootItem
            question="TypeScript errors after upgrading?"
            answer="Run npm run type-check to see detailed errors. You may need to update your types or fix any breaking changes."
          />
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// Helper Components
// ============================================================================

/** Prerequisite list item */
function PrerequisiteItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2">
      <CheckCircle2 className="h-5 w-5 text-primary" />
      <span>{children}</span>
    </li>
  );
}

/** Step header with number */
function StepHeader({ number, title }: { number: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
        {number}
      </div>
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
    </div>
  );
}

/** Script table row */
function ScriptRow({ command, description }: { command: string; description: string }) {
  return (
    <tr className="border-t border-border">
      <td className="p-3 font-mono text-primary">{command}</td>
      <td className="p-3 text-muted-foreground">{description}</td>
    </tr>
  );
}

/** Troubleshooting item */
function TroubleshootItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <h4 className="font-medium">{question}</h4>
      <p className="text-sm text-muted-foreground mt-1">{answer}</p>
    </div>
  );
}

