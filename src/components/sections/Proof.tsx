import { Star } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROOF, TESTIMONIALS } from "@/lib/content";
import { SectionId } from "@/lib/enums";

/** User testimonials. PLACEHOLDER quotes — replace with real ones before launch. */
export function Proof() {
  return (
    <Section id={SectionId.Proof}>
      <Container>
        <SectionHeading eyebrow={PROOF.eyebrow} title={PROOF.title} />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.08}>
              <Card className="flex h-full flex-col">
                <div className="flex gap-0.5" aria-hidden>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-pretty text-[0.95rem] leading-relaxed text-fg">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent-strong">
                    {testimonial.initials}
                  </span>
                  <span className="text-sm">
                    <span className="font-semibold text-fg">{testimonial.name}</span>
                    <span className="block text-xs text-fg-subtle">{testimonial.role}</span>
                  </span>
                </figcaption>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
