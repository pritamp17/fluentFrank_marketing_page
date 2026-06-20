import { CorrectionDemo } from "@/components/demo/CorrectionDemo";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DEMO } from "@/lib/content";
import { SectionId } from "@/lib/enums";

export function DemoSection() {
  return (
    <Section id={SectionId.Demo} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-1/4 h-96 bg-mist" aria-hidden />
      <Container className="relative">
        <SectionHeading eyebrow={DEMO.eyebrow} title={DEMO.title} subtitle={DEMO.subtitle} />
        <Reveal className="mt-12 flex justify-center">
          <CorrectionDemo />
        </Reveal>
        <p className="mt-4 text-center text-xs text-fg-subtle">{DEMO.footnote}</p>
      </Container>
    </Section>
  );
}
