import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { IconBadge } from "@/components/ui/IconBadge";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROBLEM, PROBLEM_POINTS } from "@/lib/content";
import { SectionId } from "@/lib/enums";

export function Problem() {
  return (
    <Section id={SectionId.Problem}>
      <Container>
        <SectionHeading eyebrow={PROBLEM.eyebrow} title={PROBLEM.title} />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEM_POINTS.map((point, index) => (
            <Reveal key={point.title} delay={index * 0.06}>
              <Card className="h-full">
                <IconBadge icon={point.icon} />
                <h3 className="mt-4 text-base font-semibold text-fg">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{point.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-2xl text-balance text-center font-display text-xl leading-relaxed text-fg sm:text-2xl">
            {PROBLEM.closer}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
