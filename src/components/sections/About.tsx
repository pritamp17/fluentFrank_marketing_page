import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { ABOUT, ABOUT_CHIPS } from "@/lib/content";
import { SectionId } from "@/lib/enums";
import { ASSETS } from "@/lib/site";

export function About() {
  return (
    <Section id={SectionId.About} className="bg-surface/40">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <Eyebrow>{ABOUT.eyebrow}</Eyebrow>
              <h2 className="mt-5 max-w-xl text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                {ABOUT.title}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-fg-muted">{ABOUT.body}</p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted">{ABOUT.body2}</p>

              <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {ABOUT_CHIPS.map((chip) => (
                  <li
                    key={chip.label}
                    className="inline-flex items-center gap-2.5 rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm font-medium text-fg"
                  >
                    <chip.icon className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                    {chip.label}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative">
              <div className="pointer-events-none absolute -inset-4 -z-10 bg-mist blur-2xl" aria-hidden />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ASSETS.heroImage}
                alt="Calm green mist — the feeling of speaking without fear"
                className="aspect-[4/3] w-full rounded-3xl border border-border object-cover shadow-card"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
