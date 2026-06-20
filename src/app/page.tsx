import { About } from "@/components/sections/About";
import { DemoSection } from "@/components/sections/DemoSection";
import { EndorsementBar } from "@/components/sections/EndorsementBar";
import { Faq } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Languages } from "@/components/sections/Languages";
import { Pricing } from "@/components/sections/Pricing";
import { Problem } from "@/components/sections/Problem";
import { Proof } from "@/components/sections/Proof";
import { ValueProp } from "@/components/sections/ValueProp";

export default function HomePage() {
  return (
    <>
      <Hero />
      <EndorsementBar />
      <Problem />
      <ValueProp />
      <HowItWorks />
      <DemoSection />
      <Features />
      <Languages />
      <About />
      <Proof />
      <Pricing />
      <Faq />
      <FinalCta />
    </>
  );
}
