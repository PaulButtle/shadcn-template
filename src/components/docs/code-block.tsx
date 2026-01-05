"use client";

/**
 * Code Block Component
 *
 * A styled code block with copy functionality and language indication.
 * Used throughout the documentation to display code examples.
 *
 * @component
 * @example
 * ```tsx
 * <CodeBlock language="typescript" title="Example">
 *   {`const greeting = "Hello, World!";`}
 * </CodeBlock>
 * ```
 */

import { useState } from "react";
import { Check, Copy, Terminal, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

/** Props for the CodeBlock component */
interface CodeBlockProps {
  /** The code content to display */
  children: string;
  /** Programming language for syntax indication */
  language?: string;
  /** Optional title for the code block */
  title?: string;
  /** Whether to show line numbers */
  showLineNumbers?: boolean;
  /** Additional CSS classes */
  className?: string;
}

// ============================================================================
// Language Icons
// ============================================================================

/** Map of language names to icons */
const languageIcons: Record<string, React.ReactNode> = {
  bash: <Terminal className="h-4 w-4" />,
  shell: <Terminal className="h-4 w-4" />,
  terminal: <Terminal className="h-4 w-4" />,
};

// ============================================================================
// Component
// ============================================================================

/**
 * Styled code block with copy functionality
 * @param props - Code block configuration
 */
export function CodeBlock({
  children,
  language = "typescript",
  title,
  showLineNumbers = false,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  /**
   * Copies the code content to clipboard
   */
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  // Get the icon for this language
  const LanguageIcon = languageIcons[language] ?? <FileCode className="h-4 w-4" />;

  // Split code into lines for line numbering
  const lines = children.trim().split("\n");

  return (
    <div
      className={cn(
        "group relative rounded-lg border border-border bg-muted/50 overflow-hidden",
        className
      )}
    >
      {/* Header with title and language */}
      {(title || language) && (
        <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {LanguageIcon}
            <span className="font-medium">{title ?? language}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleCopy}
            aria-label={copied ? "Copied!" : "Copy code"}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      )}

      {/* Code Content */}
      <div className="relative overflow-x-auto">
        <pre className="p-4 text-sm leading-relaxed">
          <code className="font-mono">
            {showLineNumbers ? (
              <table className="border-collapse w-full">
                <tbody>
                  {lines.map((line, index) => (
                    <tr key={index} className="hover:bg-muted/50">
                      <td className="select-none pr-4 text-right text-muted-foreground/50 w-8">
                        {index + 1}
                      </td>
                      <td className="whitespace-pre">{line}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              children.trim()
            )}
          </code>
        </pre>

        {/* Copy button for blocks without header */}
        {!title && !language && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleCopy}
            aria-label={copied ? "Copied!" : "Copy code"}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

