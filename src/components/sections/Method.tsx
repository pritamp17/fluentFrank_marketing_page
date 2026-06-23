import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { METHOD_FEATURES, METHOD_SECTION } from "@/lib/content";
import { SectionId } from "@/lib/enums";

/**
 * The differentiators that make Frank a method, not a chatbot: a true
 * from-zero on-ramp (the writing system), pronunciation that names the sound,
 * and spaced review + CEFR progression. Pulled from the product PRDs.
 */
export function Method() {
  return (
    <Section id={SectionId.Method} className="bg-surface/40">
      <Container>
        <SectionHeading
          eyebrow={METHOD_SECTION.eyebrow}
          title={METHOD_SECTION.title}
          subtitle={METHOD_SECTION.subtitle}
        />
        <FeatureGrid features={METHOD_FEATURES} />
      </Container>
    </Section>
  );
}
