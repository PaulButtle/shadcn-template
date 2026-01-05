"use client";

/**
 * useCopyToClipboard Hook
 *
 * A hook for copying text to the clipboard with success/error state tracking.
 * Uses the modern Clipboard API with fallback for older browsers.
 *
 * @module hooks/use-copy-to-clipboard
 *
 * @example
 * ```tsx
 * const { copy, copied, error } = useCopyToClipboard();
 *
 * <button onClick={() => copy("Hello, World!")}>
 *   {copied ? "Copied!" : "Copy"}
 * </button>
 * ```
 */

import { useState, useCallback, useRef, useEffect } from "react";

/** Return type for the useCopyToClipboard hook */
interface UseCopyToClipboardReturn {
  /** Function to copy text to clipboard */
  copy: (text: string) => Promise<boolean>;
  /** Whether the last copy operation was successful */
  copied: boolean;
  /** Error message if the copy failed */
  error: string | null;
  /** Reset the copied/error state */
  reset: () => void;
}

/**
 * Custom hook for copying text to the clipboard.
 *
 * @param resetDelay - Time in ms before resetting copied state (default: 2000)
 * @returns Object with copy function and state
 */
export function useCopyToClipboard(
  resetDelay: number = 2000
): UseCopyToClipboardReturn {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  /**
   * Reset the copied/error state
   */
  const reset = useCallback(() => {
    setCopied(false);
    setError(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  /**
   * Copy text to clipboard
   */
  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      // Reset any previous state
      reset();

      // Check if clipboard API is available
      if (!navigator?.clipboard) {
        // Fallback for older browsers
        try {
          const textArea = document.createElement("textarea");
          textArea.value = text;
          textArea.style.position = "fixed";
          textArea.style.left = "-999999px";
          textArea.style.top = "-999999px";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          const successful = document.execCommand("copy");
          document.body.removeChild(textArea);

          if (successful) {
            setCopied(true);
            timeoutRef.current = setTimeout(() => {
              setCopied(false);
            }, resetDelay);
            return true;
          } else {
            throw new Error("execCommand copy failed");
          }
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "Failed to copy to clipboard";
          setError(errorMessage);
          return false;
        }
      }

      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);

        // Auto-reset after delay
        timeoutRef.current = setTimeout(() => {
          setCopied(false);
        }, resetDelay);

        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to copy to clipboard";
        setError(errorMessage);
        return false;
      }
    },
    [reset, resetDelay]
  );

  return { copy, copied, error, reset };
}

export default useCopyToClipboard;

