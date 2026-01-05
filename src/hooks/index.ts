/**
 * Custom Hooks Index
 *
 * Re-exports all custom hooks for easy importing.
 *
 * @example
 * ```tsx
 * import {
 *   useLocalStorage,
 *   useMediaQuery,
 *   useDebounce,
 *   useCopyToClipboard,
 * } from "@/hooks";
 * ```
 */

export { useLocalStorage } from "./use-local-storage";
export {
  useMediaQuery,
  useIsMobile,
  useIsSmall,
  useIsMedium,
  useIsLarge,
  useIsExtraLarge,
  usePrefersReducedMotion,
  usePrefersDarkMode,
} from "./use-media-query";
export { useDebounce, useDebouncedCallback } from "./use-debounce";
export { useCopyToClipboard } from "./use-copy-to-clipboard";

