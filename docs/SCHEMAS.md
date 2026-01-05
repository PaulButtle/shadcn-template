# Schemas Documentation

This document describes the centralised Zod validation schemas used throughout the application.

## Overview

All validation schemas are centralised in the `src/schemas/` directory. This approach provides:

- **Single source of truth** for validation rules
- **Type safety** with automatic TypeScript inference
- **Reusability** across components and API endpoints
- **Consistency** in error messages and validation behaviour

## Directory Structure

```
src/schemas/
├── index.ts        # Re-exports all schemas
├── auth.ts         # Authentication schemas
├── user.ts         # User and settings schemas
└── storage.ts      # localStorage validation schemas
```

## Authentication Schemas

Located in `src/schemas/auth.ts`

### loginSchema

Validates login form data.

```typescript
import { loginSchema, type LoginFormData } from "@/schemas";

const result = loginSchema.safeParse({
  email: "user@example.com",
  password: "password123",
  rememberMe: true,
});

if (result.success) {
  // result.data is type LoginFormData
}
```

**Fields:**
| Field | Type | Validation |
|-------|------|------------|
| email | string | Required, valid email format |
| password | string | Required, min 6 characters |
| rememberMe | boolean | Required |

### registerSchema

Validates registration form data with password confirmation.

```typescript
import { registerSchema, type RegisterFormData } from "@/schemas";

const result = registerSchema.safeParse({
  name: "John Doe",
  email: "john@example.com",
  password: "MyP@ssw0rd",
  confirmPassword: "MyP@ssw0rd",
  acceptTerms: true,
});
```

**Fields:**
| Field | Type | Validation |
|-------|------|------------|
| name | string | Required, min 2 characters |
| email | string | Required, valid email format |
| password | string | Required, min 8 characters |
| confirmPassword | string | Must match password |
| acceptTerms | boolean | Must be true |

### forgotPasswordSchema

Validates forgot password form data.

```typescript
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/schemas";

const result = forgotPasswordSchema.safeParse({
  email: "user@example.com",
});
```

### Password Strength Helpers

```typescript
import { checkPasswordStrength, getPasswordStrengthScore } from "@/schemas";

// Get detailed strength checks
const strength = checkPasswordStrength("MyP@ssw0rd");
// { hasMinLength: true, hasUppercase: true, hasLowercase: true, hasNumber: true, hasSpecialChar: true }

// Get overall score (0-5)
const score = getPasswordStrengthScore("MyP@ssw0rd");
// 5
```

## User Schemas

Located in `src/schemas/user.ts`

### userSchema

Validates complete user data.

```typescript
import { userSchema, type UserData } from "@/schemas";

const result = userSchema.safeParse({
  id: "user_123",
  email: "john@example.com",
  name: "John Doe",
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date(),
});
```

### profileSettingsSchema

Validates profile settings form data.

```typescript
import { profileSettingsSchema, type ProfileSettingsData } from "@/schemas";

const result = profileSettingsSchema.safeParse({
  name: "John Doe",
  email: "john@example.com",
  bio: "Software developer",
});
```

### notificationSettingsSchema

Validates notification preferences.

```typescript
import { notificationSettingsSchema, type NotificationSettingsData } from "@/schemas";

const result = notificationSettingsSchema.safeParse({
  emailNotifications: true,
  pushNotifications: true,
  marketingEmails: false,
  securityAlerts: true,
  weeklyDigest: true,
});
```

### appearanceSettingsSchema

Validates appearance settings.

```typescript
import { appearanceSettingsSchema, type AppearanceSettingsData } from "@/schemas";

const result = appearanceSettingsSchema.safeParse({
  theme: "system",
  fontSize: "md",
  reducedMotion: false,
});
```

## Storage Schemas

Located in `src/schemas/storage.ts`

These schemas provide runtime validation for localStorage data.

### createStorageSchema

Factory function to create nullable storage schemas.

```typescript
import { createStorageSchema } from "@/schemas";
import { userSchema } from "@/schemas";

const userStorageSchema = createStorageSchema(userSchema);
```

### safeStorageParse

Safely parses JSON from localStorage with schema validation.

```typescript
import { safeStorageParse } from "@/schemas/storage";
import { userSchema } from "@/schemas";

// Returns validated User or null
const user = safeStorageParse("auth_user", userSchema, null);
```

### safeStorageSet

Safely stores a value in localStorage after validation.

```typescript
import { safeStorageSet } from "@/schemas/storage";
import { userSchema } from "@/schemas";

const success = safeStorageSet("auth_user", user, userSchema);
```

## Usage in Components

### With React Hook Form

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/schemas";

function LoginForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    // data is fully typed and validated
  };
}
```

### With useLocalStorage Hook

```typescript
import { useLocalStorage } from "@/hooks";
import { userSchema } from "@/schemas";

function useAuthUser() {
  // Optional schema validation for runtime safety
  const [user, setUser] = useLocalStorage(
    "auth_user",
    null,
    userSchema.nullable()
  );
  
  return { user, setUser };
}
```

## Adding New Schemas

1. Create the schema in the appropriate file (or create a new file)
2. Export the schema and inferred type
3. Add to the index.ts barrel export
4. Document in this file

### Example

```typescript
// src/schemas/contact.ts
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

```typescript
// src/schemas/index.ts
export { contactSchema, type ContactFormData } from "./contact";
```

## Best Practices

1. **Always use schemas for form validation** - Provides consistent UX and type safety
2. **Use `safeParse` for external data** - Never trust data from localStorage, APIs, or user input
3. **Co-locate types with schemas** - Export inferred types alongside schemas
4. **Use meaningful error messages** - Customise validation messages for better UX
5. **Keep schemas focused** - Create separate schemas for different use cases

