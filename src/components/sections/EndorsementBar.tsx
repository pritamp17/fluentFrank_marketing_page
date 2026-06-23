import { Quote } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { ENDORSEMENT } from "@/lib/content";

/**
 * Opinion-leader endorsement, placed high (above user testimonials) per the
 * Kulkov landing rule. PLACEHOLDER quote, swap for a real endorsement.
 */
export function EndorsementBar() {
  return (
    <section className="border-y border-border bg-surface/50">
      <Container className="py-10">
        <Reveal>
          <figure className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <Quote className="h-6 w-6 text-accent" aria-hidden />
            <blockquote className="text-balance font-display text-lg leading-relaxed text-fg sm:text-xl">
              “{ENDORSEMENT.quote}”
            </blockquote>
            <figcaption className="text-sm text-fg-muted">
              <span className="font-semibold text-fg">{ENDORSEMENT.name}</span> · {ENDORSEMENT.title}
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
