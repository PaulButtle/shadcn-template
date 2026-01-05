# Custom Hooks

This template includes several custom React hooks to simplify common patterns.

## Available Hooks

### `useLocalStorage`

Type-safe localStorage with SSR support and automatic JSON serialisation.
Uses `useSyncExternalStore` for proper React 18+ hydration and cross-tab synchronisation.

```tsx
import { useLocalStorage } from "@/hooks";

function MyComponent() {
  const [theme, setTheme, removeTheme] = useLocalStorage("theme", "light");

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme("dark")}>Set Dark</button>
      <button onClick={() => setTheme((prev) => prev === "light" ? "dark" : "light")}>
        Toggle
      </button>
      <button onClick={removeTheme}>Reset</button>
    </div>
  );
}
```

**Features:**
- SSR-safe with proper hydration
- Cross-tab synchronisation via storage events
- Functional updates support `setTheme((prev) => ...)`
- Type-safe with generics

### `useMediaQuery`

Track CSS media query matches for responsive behaviour.
Uses `useSyncExternalStore` for proper SSR hydration.

```tsx
import { useMediaQuery, useIsMobile, usePrefersReducedMotion } from "@/hooks";

function MyComponent() {
  // Custom query
  const isLargeScreen = useMediaQuery("(min-width: 1200px)");

  // Predefined breakpoints
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div>
      {isMobile ? <MobileNav /> : <DesktopNav />}
      {!prefersReducedMotion && <AnimatedContent />}
    </div>
  );
}
```

**Predefined Hooks:**
- `useIsMobile()` - viewport < 640px
- `useIsSmall()` - viewport ≥ 640px
- `useIsMedium()` - viewport ≥ 768px
- `useIsLarge()` - viewport ≥ 1024px
- `useIsExtraLarge()` - viewport ≥ 1280px
- `usePrefersReducedMotion()` - user prefers reduced motion
- `usePrefersDarkMode()` - user prefers dark colour scheme

### `useDebounce`

Delay value updates for search inputs and expensive operations.

```tsx
import { useDebounce, useDebouncedCallback } from "@/hooks";

function SearchComponent() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    if (debouncedSearch) {
      fetchResults(debouncedSearch);
    }
  }, [debouncedSearch]);

  return <input value={search} onChange={(e) => setSearch(e.target.value)} />;
}

// Or use debounced callback directly
function AutoSaveComponent() {
  const debouncedSave = useDebouncedCallback(
    (value: string) => saveToServer(value),
    1000
  );

  return <textarea onChange={(e) => debouncedSave(e.target.value)} />;
}
```

### `useCopyToClipboard`

Copy text to clipboard with success state tracking.

```tsx
import { useCopyToClipboard } from "@/hooks";
import { toast } from "sonner";

function CopyButton({ text }: { text: string }) {
  const { copy, copied, error } = useCopyToClipboard();

  const handleCopy = async () => {
    const success = await copy(text);
    if (success) {
      toast.success("Copied to clipboard!");
    } else {
      toast.error("Failed to copy");
    }
  };

  return (
    <button onClick={handleCopy}>
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
```

## Best Practices

1. **Always import from the barrel file:**
   ```tsx
   import { useLocalStorage, useDebounce } from "@/hooks";
   ```

2. **Consider SSR:** All hooks handle server-side rendering safely with appropriate defaults.

3. **Use TypeScript generics:** All hooks are fully typed for type safety.
   ```tsx
   const [user, setUser] = useLocalStorage<User | null>("user", null);
   ```

4. **Clean up:** Hooks handle cleanup automatically when components unmount.

## React 18+ Patterns

This template uses modern React 18+ patterns for browser API access:

### `useSyncExternalStore`

For hooks that need to read from external sources (localStorage, mediaQuery, etc.),
we use `useSyncExternalStore` instead of `useState` + `useEffect`. This provides:

- **Proper SSR hydration** - No hydration mismatches
- **React Compiler compatibility** - No warnings about setState in effects
- **Concurrent rendering support** - Works correctly with React's concurrent features

Example pattern:

```tsx
import { useSyncExternalStore, useCallback } from "react";

function useExternalValue() {
  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener("change", callback);
    return () => window.removeEventListener("change", callback);
  }, []);

  const getSnapshot = useCallback(() => {
    return getValueFromBrowser();
  }, []);

  const getServerSnapshot = useCallback(() => {
    return defaultValue; // Safe default for SSR
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
```

## Creating New Hooks

When adding new hooks:

1. Create a new file in `src/hooks/`
2. Add comprehensive JSDoc documentation
3. Export from `src/hooks/index.ts`
4. Update this documentation

Example template:

```tsx
"use client";

/**
 * useMyHook
 *
 * Description of what the hook does.
 *
 * @module hooks/use-my-hook
 */

import { useSyncExternalStore, useCallback } from "react";

/**
 * Custom hook description
 * @param param - Parameter description
 * @returns Return value description
 */
export function useMyHook(param: string) {
  const subscribe = useCallback((callback: () => void) => {
    // Subscribe to changes
    return () => {
      // Cleanup
    };
  }, []);

  const getSnapshot = useCallback(() => {
    // Return current value (client)
    return value;
  }, []);

  const getServerSnapshot = useCallback(() => {
    // Return safe default (server)
    return defaultValue;
  }, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
```
