/**
 * FAQ Section Component
 * 
 * Displays frequently asked questions in an accordion format.
 * Uses ShadCN Accordion component for expand/collapse functionality.
 * 
 * @component
 * @example
 * ```tsx
 * <FAQ />
 * ```
 */

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/shared";
import { FAQ_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * FAQ section with expandable questions
 * Questions are displayed in a centered column layout
 */
export function FAQ() {
  return (
    <section id="faq" className="py-20 lg:py-32">
      <Container size="md">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Frequently asked{" "}
            <span className="text-primary">questions</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Got questions? We&apos;ve got answers. If you can&apos;t find what 
            you&apos;re looking for, feel free to contact our support team.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-4"
        >
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className={cn(
                "border border-border/50 rounded-lg px-6",
                "bg-card/50 backdrop-blur-sm",
                "data-[state=open]:border-primary/30",
                "transition-colors duration-200"
              )}
            >
              <AccordionTrigger
                className={cn(
                  "text-left font-semibold hover:no-underline",
                  "py-5 text-base",
                  "[&[data-state=open]]:text-primary"
                )}
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-muted-foreground leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}

