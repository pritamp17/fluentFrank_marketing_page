import { ArrowRight, Star } from "lucide-react";

import { HeroPreview } from "@/components/demo/HeroPreview";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HERO, HERO_STATS } from "@/lib/content";
import { SectionId } from "@/lib/enums";
import { PRIMARY_CTA, SECONDARY_CTA, SOCIAL_PROOF } from "@/lib/site";

export function Hero() {
  return (
    <section id={SectionId.Hero} className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-40">
      <div className="pointer-events-none absolute inset-0 bg-mist" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-grid opacity-60" aria-hidden />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div className="flex flex-col items-start">
            <Reveal>
              <Eyebrow>{HERO.eyebrow}</Eyebrow>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-5 max-w-xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]">
                {HERO.headline}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
                {HERO.subhead}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href={PRIMARY_CTA.href} size="lg" iconRight={<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}>
                  {PRIMARY_CTA.label}
                </Button>
                <Button href={SECONDARY_CTA.href} variant="secondary" size="lg">
                  {SECONDARY_CTA.label}
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-5 flex items-center gap-3 text-sm text-fg-muted">
                {/* PLACEHOLDER rating — replace SOCIAL_PROOF in site.ts with real numbers. */}
                <span className="flex" aria-hidden>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </span>
                <span>
                  <span className="font-semibold text-fg">{SOCIAL_PROOF.rating}</span> from{" "}
                  {SOCIAL_PROOF.ratingCount} learners who stopped freezing
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <dl className="mt-10 grid w-full max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
                {HERO_STATS.map((stat) => (
                  <div key={stat.label}>
                    <dt className="font-display text-xl font-semibold text-fg">{stat.value}</dt>
                    <dd className="mt-1 text-xs leading-snug text-fg-subtle">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="pointer-events-none absolute -inset-6 -z-10 bg-mist blur-2xl" aria-hidden />
              <HeroPreview />
              <p className="mt-3 text-center text-xs text-fg-subtle">{HERO.microProof}</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
