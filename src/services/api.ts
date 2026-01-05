/**
 * API Service Layer
 *
 * Provides a typed HTTP client for making API requests.
 * Handles authentication, error handling, and response parsing.
 *
 * @module services/api
 *
 * @example
 * ```ts
 * import { api } from "@/services/api";
 *
 * // GET request
 * const users = await api.get<User[]>("/users");
 *
 * // POST request
 * const newUser = await api.post<User>("/users", { name: "John" });
 *
 * // With options
 * const data = await api.get("/data", {
 *   headers: { "X-Custom-Header": "value" },
 *   cache: "no-store"
 * });
 * ```
 */

import type { ApiResponse } from "@/types";

// ============================================================================
// Types
// ============================================================================

/** HTTP methods supported by the API client */
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/** Options for API requests */
interface RequestOptions extends Omit<RequestInit, "method" | "body"> {
  /** Query parameters to append to the URL */
  params?: Record<string, string | number | boolean | undefined>;
  /** Request timeout in milliseconds */
  timeout?: number;
}

/** Error thrown by the API client */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// ============================================================================
// Configuration
// ============================================================================

/** Base URL for API requests - update this for your backend */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";

/** Default request timeout (10 seconds) */
const DEFAULT_TIMEOUT = 10000;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Builds a URL with query parameters
 */
function buildUrl(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>
): string {
  const url = new URL(
    endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`
  );

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}

/**
 * Gets authentication headers if user is logged in
 */
function getAuthHeaders(): HeadersInit {
  // Get token from localStorage or cookies
  // This is a placeholder - implement based on your auth strategy
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("auth_token");
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
  }
  return {};
}

/**
 * Creates an AbortController with timeout
 */
function createTimeoutController(timeout: number): AbortController {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeout);
  return controller;
}

// ============================================================================
// Core Request Function
// ============================================================================

/**
 * Makes an HTTP request to the API
 *
 * @template T - Expected response data type
 * @param method - HTTP method
 * @param endpoint - API endpoint (relative to base URL)
 * @param data - Request body data
 * @param options - Additional request options
 * @returns Promise resolving to the response data
 * @throws ApiError if the request fails
 */
async function request<T>(
  method: HttpMethod,
  endpoint: string,
  data?: unknown,
  options: RequestOptions = {}
): Promise<T> {
  const { params, timeout = DEFAULT_TIMEOUT, headers, ...fetchOptions } = options;

  // Build URL with params
  const url = buildUrl(endpoint, params);

  // Create timeout controller
  const controller = createTimeoutController(timeout);

  // Prepare headers
  const requestHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...getAuthHeaders(),
    ...headers,
  };

  // Make the request
  try {
    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: data ? JSON.stringify(data) : undefined,
      signal: controller.signal,
      ...fetchOptions,
    });

    // Parse response
    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");
    const responseData = isJson ? await response.json() : await response.text();

    // Handle errors
    if (!response.ok) {
      const errorMessage =
        isJson && responseData?.message
          ? responseData.message
          : `Request failed with status ${response.status}`;

      throw new ApiError(errorMessage, response.status, responseData);
    }

    return responseData as T;
  } catch (error) {
    // Handle abort/timeout
    if (error instanceof Error && error.name === "AbortError") {
      throw new ApiError("Request timed out", 408);
    }

    // Re-throw ApiError
    if (error instanceof ApiError) {
      throw error;
    }

    // Handle network errors
    throw new ApiError(
      error instanceof Error ? error.message : "Network error",
      0
    );
  }
}

// ============================================================================
// API Client
// ============================================================================

/**
 * Type-safe API client with convenience methods
 */
export const api = {
  /**
   * GET request
   * @template T - Response data type
   */
  get: <T>(endpoint: string, options?: RequestOptions): Promise<T> =>
    request<T>("GET", endpoint, undefined, options),

  /**
   * POST request
   * @template T - Response data type
   */
  post: <T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> =>
    request<T>("POST", endpoint, data, options),

  /**
   * PUT request
   * @template T - Response data type
   */
  put: <T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> =>
    request<T>("PUT", endpoint, data, options),

  /**
   * PATCH request
   * @template T - Response data type
   */
  patch: <T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> =>
    request<T>("PATCH", endpoint, data, options),

  /**
   * DELETE request
   * @template T - Response data type
   */
  delete: <T>(endpoint: string, options?: RequestOptions): Promise<T> =>
    request<T>("DELETE", endpoint, undefined, options),
};

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Wraps an API call with standard response handling
 *
 * @template T - Data type
 * @param promise - API call promise
 * @returns Standardised API response
 *
 * @example
 * ```ts
 * const result = await withApiResponse(api.get<User>("/users/1"));
 * if (result.success) {
 *   console.log(result.data);
 * } else {
 *   console.error(result.error);
 * }
 * ```
 */
export async function withApiResponse<T>(
  promise: Promise<T>
): Promise<ApiResponse<T>> {
  try {
    const data = await promise;
    return { success: true, data };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message,
        message: `Error ${error.status}: ${error.message}`,
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export default api;

