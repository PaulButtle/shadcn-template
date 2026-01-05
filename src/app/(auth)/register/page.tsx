/**
 * Register Page
 * 
 * User registration page with form validation and password strength.
 * 
 * @component
 */

import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RegisterForm } from "@/components/auth/register-form";

/** Page metadata */
export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a new account to get started.",
};

/**
 * Registration page component
 */
export default function RegisterPage() {
  return (
    <Card className="border-0 shadow-none lg:border lg:shadow-sm">
      <CardHeader className="space-y-1 text-center lg:text-left">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>
          Enter your details below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  );
}

