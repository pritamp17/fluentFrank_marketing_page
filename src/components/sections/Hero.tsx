import { ArrowRight, Globe, Star } from "lucide-react";

import { AppDemoCompact } from "@/components/appdemo/AppDemoCompact";
import { AmbientBackdrop } from "@/components/hero/AmbientBackdrop";
import { LanguageCycler } from "@/components/hero/LanguageCycler";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HERO, HERO_STATS } from "@/lib/content";
import { HERO_CYCLE_WORDS } from "@/lib/languages";
import { SectionId } from "@/lib/enums";
import { PRIMARY_CTA, SECONDARY_CTA, SOCIAL_PROOF } from "@/lib/site";

export function Hero() {
  return (
    <section id={SectionId.Hero} className="relative isolate overflow-hidden pb-16 pt-24 sm:pt-32 lg:pb-24 lg:pt-40">
      <AmbientBackdrop />

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div className="flex flex-col items-start">
            <Reveal>
              <Eyebrow className="text-[0.65rem] sm:text-xs">{HERO.eyebrow}</Eyebrow>
            </Reveal>

            <Reveal delay={0.05}>
              {/* leading-[1.14] gives the cycling word's descenders (e.g. Português) clear room above the next line. */}
              <h1 className="mt-4 max-w-xl text-balance text-[2.35rem] font-semibold leading-[1.14] tracking-[-0.01em] sm:mt-5 sm:text-5xl lg:text-[3.6rem]">
                {HERO.headlineLead}
                <LanguageCycler words={HERO_CYCLE_WORDS} />
                {HERO.headlineTail}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              {/* fg/80 (not fg-muted) so the pitch stays legible over the warm ambient backdrop. */}
              <p className="mt-4 max-w-lg text-pretty text-[0.95rem] leading-relaxed text-fg/80 sm:mt-5 sm:text-lg">
                {HERO.subhead}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-6 flex w-full flex-col gap-3 sm:mt-7 sm:w-auto sm:flex-row sm:items-center">
                <Button href={PRIMARY_CTA.href} size="lg" className="w-full justify-center sm:w-auto" iconRight={<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}>
                  {PRIMARY_CTA.label}
                </Button>
                <Button href={SECONDARY_CTA.href} variant="secondary" size="lg" className="w-full justify-center sm:w-auto">
                  {SECONDARY_CTA.label}
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              {/* Web-first positioning, a real edge over the mobile-only rivals. */}
              <p className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-fg/70">
                <Globe className="h-3.5 w-3.5 text-accent" aria-hidden />
                {HERO.webFirst}
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-5 flex items-center gap-3 text-sm text-fg/80">
                {/* PLACEHOLDER rating, replace SOCIAL_PROOF in site.ts with real numbers. */}
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

            <Reveal delay={0.3}>
              {/* 3-col at sm+; on the narrowest phones (< 380px) each stat still fits because the labels are short. */}
              <dl className="mt-10 grid w-full max-w-md grid-cols-3 gap-3 border-t border-border pt-6 sm:gap-4">
                {HERO_STATS.map((stat) => (
                  <div key={stat.label}>
                    <dt className="font-display text-xl font-semibold text-fg">{stat.value}</dt>
                    <dd className="mt-1 text-xs leading-snug text-fg/70">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-full sm:max-w-md lg:max-w-lg">
              <div className="pointer-events-none absolute -inset-6 -z-10 bg-mist blur-2xl" aria-hidden />
              <AppDemoCompact />
              <p className="mt-3 text-center text-xs font-medium text-fg/90">{HERO.microProof}</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
