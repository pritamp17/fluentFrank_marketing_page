"use client";

import { useState } from "react";
import { Check, Minus, ShieldCheck, Sparkles } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  PLAN_CAPABILITIES,
  PLANS,
  PRICING_NOTE,
  PRICING_SECTION,
} from "@/lib/content";
import { BillingInterval, PlanId, SectionId } from "@/lib/enums";
import { PRICING, PRIMARY_CTA } from "@/lib/site";
import type { PlanCapabilityValue } from "@/lib/types";
import { cn } from "@/lib/utils";

function CapabilityCell({ value }: { readonly value: PlanCapabilityValue }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="mx-auto h-4 w-4 text-accent" aria-label="Included" />
    ) : (
      <Minus className="mx-auto h-4 w-4 text-fg-subtle" aria-label="Not included" />
    );
  }
  return <span className="text-sm text-fg">{value}</span>;
}

function formatPrice(amount: number): string {
  return `${PRICING.symbol}${amount}`;
}

export function Pricing() {
  const [interval, setInterval] = useState<BillingInterval>(BillingInterval.Yearly);
  const isYearly = interval === BillingInterval.Yearly;

  const weeklyRunRate = PRICING.byInterval[BillingInterval.Weekly] * PRICING.weeksPerYear;
  const yearlySaved = Math.round(weeklyRunRate - PRICING.byInterval[BillingInterval.Yearly]);

  return (
    <Section id={SectionId.Pricing} className="bg-surface/40">
      <Container>
        <SectionHeading
          eyebrow={PRICING_SECTION.eyebrow}
          title={PRICING_SECTION.title}
          subtitle={PRICING_SECTION.subtitle}
        />

        {/* Billing toggle */}
        <div className="mt-8 flex items-center justify-center">
          <div className="inline-flex items-center rounded-full border border-border bg-surface p-1">
            {[BillingInterval.Weekly, BillingInterval.Yearly].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setInterval(value)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors",
                  interval === value ? "bg-accent text-accent-fg" : "text-fg-muted hover:text-fg",
                )}
              >
                {value}
                {value === BillingInterval.Yearly ? (
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[0.65rem] font-semibold",
                      interval === value ? "bg-accent-fg/15 text-accent-fg" : "bg-accent-soft text-accent-strong",
                    )}
                  >
                    Save {PRICING.annualSavingsPct}%
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>

        {/* Plan cards */}
        <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-2">
          {PLANS.map((plan) => {
            const price = plan.priceByInterval[interval];
            const isFree = plan.id === PlanId.Free;
            return (
              <Reveal key={plan.id}>
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-3xl border bg-surface p-7 shadow-soft",
                    plan.featured ? "border-accent/50 ring-1 ring-accent/30" : "border-border",
                  )}
                >
                  {plan.featured ? (
                    <span className="absolute -top-3 left-7 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-fg">
                      <Sparkles className="h-3 w-3" /> Most popular
                    </span>
                  ) : null}

                  <h3 className="text-lg font-semibold text-fg">{plan.name}</h3>
                  <p className="mt-1 text-sm text-fg-muted">{plan.tagline}</p>

                  <div className="mt-5 flex items-baseline gap-1.5">
                    <span className="font-display text-4xl font-semibold text-fg">
                      {isFree ? "Free" : formatPrice(price)}
                    </span>
                    {!isFree ? (
                      <span className="text-sm text-fg-subtle">
                        {isYearly ? "/year" : "/week"}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 min-h-[1.25rem] text-xs text-fg-subtle">
                    {isFree
                      ? ""
                      : isYearly
                        ? `Billed yearly · about ${PRICING.symbol}${(price / 12).toFixed(2)}/mo · just ${PRICING.symbol}${(price / PRICING.weeksPerYear).toFixed(2)}/wk`
                        : `${PRICING.trialDays}-day free trial · billed weekly`}
                  </p>
                  {!isFree && isYearly ? (
                    <p className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent-strong">
                      Save {PRICING.symbol}
                      {yearlySaved}/yr · {PRICING.annualSavingsPct}% off
                    </p>
                  ) : null}

                  <Button
                    href={PRIMARY_CTA.href}
                    variant={plan.featured ? "primary" : "secondary"}
                    size="md"
                    className="mt-5 w-full"
                  >
                    {plan.ctaLabel}
                  </Button>

                  <ul className="mt-6 space-y-2.5 border-t border-border pt-5">
                    {plan.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5 text-sm text-fg">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Capability comparison */}
        <Reveal>
          <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-border bg-surface">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-fg-subtle">
                  <th className="px-5 py-3 font-medium">What you get</th>
                  <th className="px-3 py-3 text-center font-medium">Free</th>
                  <th className="px-3 py-3 text-center font-medium text-accent-strong">Pro</th>
                </tr>
              </thead>
              <tbody>
                {PLAN_CAPABILITIES.map((row) => (
                  <tr key={row.label} className="border-b border-border/60 last:border-0">
                    <td className="px-5 py-3 text-sm text-fg">{row.label}</td>
                    <td className="px-3 py-3 text-center">
                      <CapabilityCell value={row.free} />
                    </td>
                    <td className="px-3 py-3 text-center">
                      <CapabilityCell value={row.pro} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <p className="mx-auto mt-6 flex max-w-2xl items-center justify-center gap-2 text-center text-xs text-fg-subtle">
          <ShieldCheck className="h-4 w-4 text-accent" aria-hidden />
          Secure checkout · Cancel anytime · Powered by Dodo (Merchant of Record)
        </p>
        <p className="mx-auto mt-2 max-w-2xl text-center text-xs text-fg-subtle">{PRICING_NOTE}</p>
      </Container>
    </Section>
  );
}
