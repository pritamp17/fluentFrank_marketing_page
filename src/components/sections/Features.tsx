import { Check } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { IconBadge } from "@/components/ui/IconBadge";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FEATURES, FEATURES_SECTION } from "@/lib/content";
import { SectionId } from "@/lib/enums";

export function Features() {
  return (
    <Section id={SectionId.Features}>
      <Container>
        <SectionHeading eyebrow={FEATURES_SECTION.eyebrow} title={FEATURES_SECTION.title} />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <Reveal key={feature.id} delay={index * 0.08}>
              <Card className="flex h-full flex-col">
                <IconBadge icon={feature.icon} />
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-accent-strong">
                  {feature.eyebrow}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-fg">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{feature.description}</p>
                <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 text-sm text-fg">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
