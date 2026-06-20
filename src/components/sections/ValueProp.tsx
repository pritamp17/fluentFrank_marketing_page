import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { IconBadge } from "@/components/ui/IconBadge";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VALUE, VALUE_PILLARS } from "@/lib/content";

export function ValueProp() {
  return (
    <Section className="bg-surface/40">
      <Container>
        <SectionHeading eyebrow={VALUE.eyebrow} title={VALUE.title} subtitle={VALUE.subtitle} />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {VALUE_PILLARS.map((pillar, index) => (
            <Reveal key={pillar.kind} delay={index * 0.08}>
              <Card className="h-full">
                <IconBadge icon={pillar.icon} />
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-accent-strong">
                  {pillar.label}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-fg">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{pillar.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
