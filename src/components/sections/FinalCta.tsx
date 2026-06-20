import { ArrowRight } from "lucide-react";

import { AmbientVideo } from "@/components/motion/AmbientVideo";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FINAL_CTA } from "@/lib/content";
import { SectionId } from "@/lib/enums";
import { ASSETS, PRIMARY_CTA } from "@/lib/site";

export function FinalCta() {
  return (
    <section id={SectionId.Cta} className="relative isolate overflow-hidden py-24 sm:py-32">
      <AmbientVideo
        src={ASSETS.heroVideo}
        poster={ASSETS.heroImage}
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/85 to-bg/45"
        aria-hidden
      />

      <Container>
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Eyebrow>{FINAL_CTA.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            {FINAL_CTA.title}
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
            {FINAL_CTA.subtitle}
          </p>
          <Button
            href={PRIMARY_CTA.href}
            size="lg"
            className="mt-8"
            iconRight={<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
          >
            {PRIMARY_CTA.label}
          </Button>
          <p className="mt-4 text-xs text-fg-subtle">{FINAL_CTA.microProof}</p>
        </Reveal>
      </Container>
    </section>
  );
}
