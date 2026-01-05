"use client";

/**
 * Forgot Password Form Component
 * 
 * A form for requesting password reset emails.
 * Features email validation and success state.
 * 
 * @component
 * @example
 * ```tsx
 * <ForgotPasswordForm />
 * ```
 */

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/schemas/auth";

// ============================================================================
// Component
// ============================================================================

/**
 * Forgot password form with email validation
 */
export function ForgotPasswordForm() {
  // Track success state
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  
  // Initialise form with react-hook-form and zod
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isSubmitting } = form.formState;

  /**
   * Handles form submission
   * Mock implementation - simulates API delay
   * @param data - Validated form data
   */
  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setSubmittedEmail(data.email);
      setIsSuccess(true);
      
      toast.success("Email sent!", {
        description: "Check your inbox for the password reset link.",
      });
    } catch (error: unknown) {
      console.error("Password reset error:", error);
      toast.error("Something went wrong", {
        description: "Please try again later.",
      });
    }
  };

  /**
   * Handles resending the reset email
   */
  const handleResend = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success("Email resent!", {
        description: "A new password reset link has been sent.",
      });
    } catch (error: unknown) {
      console.error("Resend email error:", error);
      toast.error("Something went wrong", {
        description: "Please try again later.",
      });
    }
  };

  // Success state view
  if (isSuccess) {
    return (
      <div className="w-full space-y-6 text-center">
        {/* Success Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        
        {/* Success Message */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Check your email</h3>
          <p className="text-sm text-muted-foreground">
            We&apos;ve sent a password reset link to{" "}
            <span className="font-medium text-foreground">{submittedEmail}</span>
          </p>
        </div>
        
        {/* Instructions */}
        <p className="text-sm text-muted-foreground">
          Didn&apos;t receive the email? Check your spam folder or{" "}
          <button
            onClick={handleResend}
            className="text-primary hover:underline font-medium"
          >
            click here to resend
          </button>
        </p>
        
        {/* Back to Login */}
        <Button variant="outline" className="w-full" asChild>
          <Link href="/login">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send reset link"
            )}
          </Button>
        </form>
      </Form>

      {/* Back to Login */}
      <Button variant="ghost" className="w-full" asChild>
        <Link href="/login">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to login
        </Link>
      </Button>
    </div>
  );
}

