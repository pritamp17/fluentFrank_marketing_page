import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { IconBadge } from "@/components/ui/IconBadge";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HOW_IT_WORKS, HOW_STEPS } from "@/lib/content";
import { SectionId } from "@/lib/enums";

export function HowItWorks() {
  return (
    <Section id={SectionId.HowItWorks} className="bg-surface/40">
      <Container>
        <SectionHeading eyebrow={HOW_IT_WORKS.eyebrow} title={HOW_IT_WORKS.title} />

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_STEPS.map((step, index) => (
            <Reveal key={step.index} delay={index * 0.07}>
              <li className="relative flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-soft">
                <div className="flex items-center justify-between">
                  <IconBadge icon={step.icon} />
                  <span className="font-display text-3xl font-semibold text-border">
                    {step.index.toString().padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-fg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
