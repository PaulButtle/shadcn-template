/**
 * Props Table Component
 *
 * A table for displaying component prop documentation.
 * Shows prop name, type, default value, and description.
 *
 * @component
 * @example
 * ```tsx
 * <PropsTable
 *   props={[
 *     { name: "variant", type: '"default" | "destructive"', default: '"default"', description: "The button variant" },
 *   ]}
 * />
 * ```
 */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

/** Single prop definition */
interface PropDefinition {
  /** Prop name */
  name: string;
  /** TypeScript type */
  type: string;
  /** Default value (if any) */
  default?: string;
  /** Description of the prop */
  description: string;
  /** Whether the prop is required */
  required?: boolean;
}

/** Props for the PropsTable component */
interface PropsTableProps {
  /** Array of prop definitions */
  props: PropDefinition[];
  /** Additional CSS classes */
  className?: string;
}

// ============================================================================
// Component
// ============================================================================

/**
 * Table displaying component props documentation
 * @param props - Table configuration
 */
export function PropsTable({ props, className }: PropsTableProps) {
  return (
    <div className={cn("rounded-lg border border-border overflow-hidden", className)}>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="w-[150px] font-semibold">Prop</TableHead>
            <TableHead className="w-[200px] font-semibold">Type</TableHead>
            <TableHead className="w-[120px] font-semibold">Default</TableHead>
            <TableHead className="font-semibold">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.map((prop) => (
            <TableRow key={prop.name}>
              <TableCell className="font-mono text-sm">
                <span className="text-primary">{prop.name}</span>
                {prop.required && (
                  <Badge
                    variant="outline"
                    className="ml-2 text-xs bg-destructive/10 text-destructive border-destructive/20"
                  >
                    Required
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                  {prop.type}
                </code>
              </TableCell>
              <TableCell>
                {prop.default ? (
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                    {prop.default}
                  </code>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {prop.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

