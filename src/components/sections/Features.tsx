import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FEATURES, FEATURES_SECTION } from "@/lib/content";
import { SectionId } from "@/lib/enums";

export function Features() {
  return (
    <Section id={SectionId.Features}>
      <Container>
        <SectionHeading eyebrow={FEATURES_SECTION.eyebrow} title={FEATURES_SECTION.title} />
        <FeatureGrid features={FEATURES} />
      </Container>
    </Section>
  );
}
