"use client";

/**
 * Register Form Component
 * 
 * A comprehensive registration form with:
 * - Name, email, and password fields with validation
 * - Password strength indicator
 * - Password confirmation
 * - Terms acceptance checkbox
 * - Social signup buttons (mock)
 * 
 * @component
 * @example
 * ```tsx
 * <RegisterForm />
 * ```
 */

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock, User, Loader2, Check, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/stores/auth-context";
import { cn } from "@/lib/utils";
import {
  registerSchema,
  checkPasswordStrength,
  getPasswordStrengthScore,
  type RegisterFormData,
} from "@/schemas/auth";

// ============================================================================
// Password Strength Display
// ============================================================================

/** Password requirement labels for display */
const PASSWORD_REQUIREMENT_LABELS = [
  { key: "hasMinLength", label: "At least 8 characters" },
  { key: "hasUppercase", label: "Contains uppercase letter" },
  { key: "hasLowercase", label: "Contains lowercase letter" },
  { key: "hasNumber", label: "Contains number" },
  { key: "hasSpecialChar", label: "Contains special character" },
] as const;

/**
 * Gets password strength label and colour based on score
 * @param score - Strength score (0-5)
 * @returns Label and colour class
 */
function getStrengthInfo(score: number): { label: string; color: string } {
  if (score === 0) return { label: "Very Weak", color: "bg-destructive" };
  if (score <= 2) return { label: "Weak", color: "bg-orange-500" };
  if (score <= 3) return { label: "Fair", color: "bg-yellow-500" };
  if (score <= 4) return { label: "Good", color: "bg-primary" };
  return { label: "Strong", color: "bg-green-500" };
}

// ============================================================================
// Component
// ============================================================================

/**
 * Registration form with validation and password strength indicator
 */
export function RegisterForm() {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  
  // Track password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Initialise form with react-hook-form and zod
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const { isSubmitting } = form.formState;
  
  // Note: form.watch() is flagged by React Compiler as incompatible with memoization.
  // This is expected behaviour for React Hook Form and doesn't affect functionality.
  const watchedPassword = form.watch("password");

  // Calculate password strength using centralised schema helpers
  const passwordStrengthScore = useMemo(
    () => getPasswordStrengthScore(watchedPassword || ""),
    [watchedPassword]
  );
  const passwordStrengthChecks = useMemo(
    () => checkPasswordStrength(watchedPassword || ""),
    [watchedPassword]
  );
  const strengthInfo = getStrengthInfo(passwordStrengthScore);

  /**
   * Handles form submission
   * @param data - Validated form data
   */
  const onSubmit = async (data: RegisterFormData) => {
    try {
      const success = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      if (success) {
        toast.success("Account created!", {
          description: "Welcome! Your account has been created successfully.",
        });
        router.push("/dashboard");
      } else {
        toast.error("Registration failed", {
          description: "Please check your details and try again.",
        });
      }
    } catch (error: unknown) {
      console.error("Registration error:", error);
      toast.error("Something went wrong", {
        description: "Please try again later.",
      });
    }
  };

  /**
   * Handles social signup (mock implementation)
   * @param provider - Social provider name
   */
  const handleSocialSignup = (provider: string) => {
    toast.info(`${provider} signup`, {
      description: "Social signup is not implemented in this demo.",
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="John Doe"
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

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                      disabled={isSubmitting}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                
                {/* Password Strength Indicator */}
                {watchedPassword && (
                  <div className="mt-3 space-y-2">
                    {/* Strength Bar */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn("h-full transition-all duration-300", strengthInfo.color)}
                          style={{ width: `${(passwordStrengthScore / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground min-w-[60px]">
                        {strengthInfo.label}
                      </span>
                    </div>

                    {/* Requirements List - using centralised schema checks */}
                    <div className="grid grid-cols-1 gap-1">
                      {PASSWORD_REQUIREMENT_LABELS.map(({ key, label }) => {
                        const passes = passwordStrengthChecks[key];
                        return (
                          <div
                            key={key}
                            className={cn(
                              "flex items-center gap-2 text-xs",
                              passes ? "text-green-600 dark:text-green-400" : "text-muted-foreground"
                            )}
                          >
                            {passes ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <X className="h-3 w-3" />
                            )}
                            {label}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                      disabled={isSubmitting}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Terms and Conditions */}
          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-normal cursor-pointer">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </FormLabel>
                  <FormMessage />
                </div>
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
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>
      </Form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      {/* Social Signup Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={() => handleSocialSignup("Google")}
          disabled={isSubmitting}
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </Button>
        <Button
          variant="outline"
          onClick={() => handleSocialSignup("GitHub")}
          disabled={isSubmitting}
        >
          <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
          GitHub
        </Button>
      </div>

      {/* Sign in link */}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}

