"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ_ITEMS, FAQ_SECTION } from "@/lib/content";
import { SectionId } from "@/lib/enums";
import { cn } from "@/lib/utils";

const NONE = -1;

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <Section id={SectionId.Faq} className="bg-surface/40">
      <Container>
        <SectionHeading eyebrow={FAQ_SECTION.eyebrow} title={FAQ_SECTION.title} />

        <div className="mx-auto mt-10 max-w-3xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? NONE : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface-2/50"
                >
                  <span className="text-[0.95rem] font-medium text-fg">{item.question}</span>
                  <span className="shrink-0 text-accent" aria-hidden>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div
                  className={cn(
                    "grid px-5 transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr] pb-4 opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm leading-relaxed text-fg-muted">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
