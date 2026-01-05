/**
 * Forms & Validation Documentation Page
 *
 * Guide to building forms with React Hook Form and Zod.
 *
 * @component
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata: Metadata = {
  title: "Forms & Validation",
  description:
    "Build type-safe forms with React Hook Form and Zod validation in ShadCN Template.",
};

/**
 * Forms and validation documentation page
 */
export default function FormsPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Forms & Validation</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Build type-safe, accessible forms with React Hook Form and Zod validation.
        </p>
      </div>

      {/* Overview */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Stack Overview</h2>
        <p className="text-muted-foreground">
          The template uses a powerful combination for form handling:
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <TechCard
            title="React Hook Form"
            description="Performant form state management with minimal re-renders"
          />
          <TechCard
            title="Zod"
            description="TypeScript-first schema validation with type inference"
          />
          <TechCard
            title="ShadCN Form"
            description="Accessible form components with error handling"
          />
        </div>
      </section>

      <Separator />

      {/* Basic Form */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Basic Form Setup</h2>
        <p className="text-muted-foreground">
          Here&apos;s the pattern used throughout the template:
        </p>

        <h3 className="text-xl font-semibold mt-6">1. Define the Schema</h3>
        <CodeBlock language="typescript" title="src/schemas/contact.ts">
{`import { z } from "zod";

/**
 * Contact form validation schema
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be less than 500 characters"),
});

// Infer TypeScript type from schema
export type ContactFormData = z.infer<typeof contactSchema>;`}
        </CodeBlock>

        <h3 className="text-xl font-semibold mt-6">2. Create the Form Component</h3>
        <CodeBlock language="tsx" title="ContactForm.tsx">
{`"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { contactSchema, type ContactFormData } from "@/schemas/contact";

export function ContactForm() {
  // Initialise form with schema validation
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { isSubmitting } = form.formState;

  // Handle form submission
  const onSubmit = async (data: ContactFormData) => {
    try {
      // Send data to API
      await api.post("/contact", data);
      toast.success("Message sent successfully!");
      form.reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="How can we help?"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Max 500 characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send Message
        </Button>
      </form>
    </Form>
  );
}`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Zod Schema Patterns */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Zod Schema Patterns</h2>
        <p className="text-muted-foreground">
          Common validation patterns used in the template:
        </p>

        <h3 className="text-xl font-semibold mt-6">String Validation</h3>
        <CodeBlock language="typescript" title="String Validators">
{`import { z } from "zod";

// Required string
const required = z.string().min(1, "Required");

// Email
const email = z.string().email("Invalid email");

// URL
const url = z.string().url("Invalid URL");

// Length constraints
const username = z
  .string()
  .min(3, "Too short")
  .max(20, "Too long")
  .regex(/^[a-z0-9_]+$/, "Only lowercase letters, numbers, underscores");

// Password with requirements
const password = z
  .string()
  .min(8, "At least 8 characters")
  .regex(/[A-Z]/, "At least one uppercase letter")
  .regex(/[0-9]/, "At least one number");`}
        </CodeBlock>

        <h3 className="text-xl font-semibold mt-6">Number Validation</h3>
        <CodeBlock language="typescript" title="Number Validators">
{`// Basic number
const age = z.number().min(18, "Must be 18 or older");

// Coerce from string (for form inputs)
const price = z.coerce.number().positive("Must be positive");

// Integer only
const quantity = z.coerce.number().int().positive();`}
        </CodeBlock>

        <h3 className="text-xl font-semibold mt-6">Object Validation</h3>
        <CodeBlock language="typescript" title="Object Validators">
{`// Password confirmation
const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Error shown on this field
  });

// Optional fields
const profileSchema = z.object({
  name: z.string().min(1),
  bio: z.string().max(160).optional(),
  website: z.string().url().optional().or(z.literal("")),
});

// Nested objects
const addressSchema = z.object({
  user: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
  address: z.object({
    street: z.string(),
    city: z.string(),
    postcode: z.string(),
  }),
});`}
        </CodeBlock>

        <h3 className="text-xl font-semibold mt-6">Arrays and Enums</h3>
        <CodeBlock language="typescript" title="Arrays and Enums">
{`// Enum
const role = z.enum(["admin", "user", "viewer"]);

// Array of strings
const tags = z.array(z.string()).min(1, "At least one tag required");

// Array of objects
const items = z.array(
  z.object({
    id: z.string(),
    quantity: z.number().positive(),
  })
);

// Boolean
const acceptTerms = z.boolean().refine((val) => val === true, {
  message: "You must accept the terms",
});`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Form Field Types */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Form Field Examples</h2>

        <h3 className="text-xl font-semibold mt-6">Checkbox Field</h3>
        <CodeBlock language="tsx" title="Checkbox">
{`<FormField
  control={form.control}
  name="rememberMe"
  render={({ field }) => (
    <FormItem className="flex items-center space-x-2 space-y-0">
      <FormControl>
        <Checkbox
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      </FormControl>
      <FormLabel className="font-normal">
        Remember me for 30 days
      </FormLabel>
    </FormItem>
  )}
/>`}
        </CodeBlock>

        <h3 className="text-xl font-semibold mt-6">Select Field</h3>
        <CodeBlock language="tsx" title="Select">
{`<FormField
  control={form.control}
  name="role"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Role</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="viewer">Viewer</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>`}
        </CodeBlock>

        <h3 className="text-xl font-semibold mt-6">Switch Field</h3>
        <CodeBlock language="tsx" title="Switch">
{`<FormField
  control={form.control}
  name="emailNotifications"
  render={({ field }) => (
    <FormItem className="flex items-center justify-between rounded-lg border p-4">
      <div className="space-y-0.5">
        <FormLabel className="text-base">Email Notifications</FormLabel>
        <FormDescription>
          Receive emails about account activity
        </FormDescription>
      </div>
      <FormControl>
        <Switch
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      </FormControl>
    </FormItem>
  )}
/>`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Error Handling */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Error Handling</h2>
        <p className="text-muted-foreground">
          Handle form submission errors gracefully:
        </p>
        <CodeBlock language="tsx" title="Error Handling Pattern">
{`const onSubmit = async (data: FormData) => {
  try {
    const response = await api.post("/endpoint", data);
    
    if (response.success) {
      toast.success("Success!");
      form.reset();
      router.push("/dashboard");
    } else {
      // Server returned an error
      toast.error(response.error || "Something went wrong");
    }
  } catch (error) {
    // Network or unexpected error
    if (error instanceof ApiError) {
      // Handle specific error codes
      if (error.status === 409) {
        form.setError("email", {
          type: "server",
          message: "This email is already registered",
        });
      } else {
        toast.error(error.message);
      }
    } else {
      toast.error("Network error. Please try again.");
    }
  }
};`}
        </CodeBlock>
      </section>

      <Separator />

      {/* Best Practices */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Best Practices</h2>
        <div className="space-y-4">
          <BestPractice
            title="Keep schemas in dedicated files"
            description="Define schemas in src/schemas/ for reuse and testing"
          />
          <BestPractice
            title="Use type inference"
            description="Use z.infer<typeof schema> instead of manual types"
          />
          <BestPractice
            title="Show loading states"
            description="Disable submit button and show spinner during submission"
          />
          <BestPractice
            title="Provide helpful error messages"
            description="Write clear, actionable error messages in your schema"
          />
          <BestPractice
            title="Use FormDescription"
            description="Add helpful hints below form fields"
          />
        </div>
      </section>

      <Alert className="mt-6">
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>Accessibility</AlertTitle>
        <AlertDescription>
          The ShadCN Form components automatically handle ARIA attributes, error
          announcements, and keyboard navigation for accessible forms.
        </AlertDescription>
      </Alert>

      {/* Next Steps */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Next Steps</h2>
        <div className="flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/docs/authentication">
              Authentication
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/api">
              API Services
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

/** Technology card */
function TechCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-border p-4">
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
  );
}

/** Best practice item */
function BestPractice({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

