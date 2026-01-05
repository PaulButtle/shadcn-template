"use client";

/**
 * Authentication Context
 * 
 * Provides authentication state and methods throughout the application.
 * This is a mock implementation - replace with real auth logic for production.
 * 
 * Features:
 * - User state management
 * - Login/logout/register methods
 * - Session persistence via localStorage
 * - Loading state handling
 * 
 * @module stores/auth-context
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import type { User, LoginCredentials, RegisterData, AuthState } from "@/types";
import { MOCK_USER } from "@/lib/mock-data";

// ============================================================================
// Types
// ============================================================================

/** Authentication context value type */
interface AuthContextValue extends AuthState {
  /** Log in a user with credentials */
  login: (credentials: LoginCredentials) => Promise<boolean>;
  /** Log out the current user */
  logout: () => void;
  /** Register a new user */
  register: (data: RegisterData) => Promise<boolean>;
  /** Update the current user's profile */
  updateUser: (updates: Partial<User>) => void;
}

/** Storage key for persisting auth state */
const AUTH_STORAGE_KEY = "auth_user";

// ============================================================================
// Context
// ============================================================================

/** Auth context with undefined initial value */
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ============================================================================
// Provider Component
// ============================================================================

/** Props for the AuthProvider component */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Authentication Provider Component
 * 
 * Wraps the application to provide authentication state and methods.
 * Handles session persistence and restoration on mount.
 * 
 * @component
 * @example
 * ```tsx
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * ```
 */
export function AuthProvider({ children }: AuthProviderProps) {
  // Authentication state
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Computed authentication status
  const isAuthenticated = user !== null;

  /**
   * Restore session from localStorage on mount
   * Checks for existing auth state and validates it
   */
  useEffect(() => {
    const restoreSession = () => {
      try {
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
          const parsedUser = JSON.parse(stored) as User;
          // Restore dates that were serialised as strings
          parsedUser.createdAt = new Date(parsedUser.createdAt);
          parsedUser.updatedAt = new Date(parsedUser.updatedAt);
          setUser(parsedUser);
        }
      } catch (error) {
        // Clear corrupted data
        console.error("Failed to restore session:", error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  /**
   * Persist user to localStorage when it changes
   */
  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  /**
   * Log in a user with email and password
   * Mock implementation - simulates API delay
   * 
   * @param credentials - User login credentials
   * @returns Promise resolving to success status
   */
  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock validation - accept any valid email format
      if (!credentials.email.includes("@") || credentials.password.length < 6) {
        return false;
      }

      // Create user from mock data with provided email
      const loggedInUser: User = {
        ...MOCK_USER,
        email: credentials.email,
        updatedAt: new Date(),
      };

      setUser(loggedInUser);
      return true;
    } catch (error: unknown) {
      console.error("Login failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Log out the current user
   * Clears state and localStorage
   */
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  /**
   * Register a new user
   * Mock implementation - simulates API delay
   * 
   * @param data - User registration data
   * @returns Promise resolving to success status
   */
  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock validation
      if (
        !data.email.includes("@") ||
        data.password.length < 8 ||
        data.password !== data.confirmPassword ||
        data.name.length < 2
      ) {
        return false;
      }

      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}`,
        email: data.email,
        name: data.name,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setUser(newUser);
      return true;
    } catch (error: unknown) {
      console.error("Registration failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Update the current user's profile
   * 
   * @param updates - Partial user object with fields to update
   */
  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((currentUser) => {
      if (!currentUser) return null;
      return {
        ...currentUser,
        ...updates,
        updatedAt: new Date(),
      };
    });
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      login,
      logout,
      register,
      updateUser,
    }),
    [user, isAuthenticated, isLoading, login, logout, register, updateUser]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// ============================================================================
// Hook
// ============================================================================

/**
 * Custom hook to access authentication context
 * 
 * @returns Authentication context value
 * @throws Error if used outside AuthProvider
 * 
 * @example
 * ```tsx
 * const { user, login, logout, isAuthenticated } = useAuth();
 * ```
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}

