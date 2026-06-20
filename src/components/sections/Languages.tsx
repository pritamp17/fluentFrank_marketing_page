import { LanguageChip } from "@/components/languages/LanguageChip";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LANGUAGES_SECTION } from "@/lib/content";
import { SectionId } from "@/lib/enums";
import { LANGUAGES } from "@/lib/languages";

/** The multi-language roster — the same honest coaching across every language. */
export function Languages() {
  return (
    <Section id={SectionId.Languages} className="relative overflow-hidden bg-surface/40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-mist" aria-hidden />
      <Container className="relative">
        <SectionHeading
          eyebrow={LANGUAGES_SECTION.eyebrow}
          title={LANGUAGES_SECTION.title}
          subtitle={LANGUAGES_SECTION.subtitle}
        />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {LANGUAGES.map((language, i) => (
            <Reveal key={language.id} delay={Math.min(i * 0.04, 0.32)} className="h-full">
              <LanguageChip language={language} />
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-fg-subtle">
          {LANGUAGES_SECTION.footnote}
        </p>
      </Container>
    </Section>
  );
}
