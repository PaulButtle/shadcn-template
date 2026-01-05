/**
 * Forgot Password Page
 * 
 * Page for requesting password reset emails.
 * 
 * @component
 */

import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

/** Page metadata */
export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your password to regain access to your account.",
};

/**
 * Forgot password page component
 */
export default function ForgotPasswordPage() {
  return (
    <Card className="border-0 shadow-none lg:border lg:shadow-sm">
      <CardHeader className="space-y-1 text-center lg:text-left">
        <CardTitle className="text-2xl font-bold">Forgot password?</CardTitle>
        <CardDescription>
          Enter your email and we&apos;ll send you a link to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm />
      </CardContent>
    </Card>
  );
}

