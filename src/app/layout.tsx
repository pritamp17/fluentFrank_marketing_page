import type { Metadata, Viewport } from "next";

import "@/app/globals.css";
import { Providers } from "@/app/providers";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SectionId } from "@/lib/enums";
import { ASSETS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Finally speak Spanish without freezing`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "learn Spanish speaking",
    "AI language coach",
    "speak Spanish without freezing",
    "conversational AI Spanish tutor",
    "Spanish conversation practice",
    "honest correction language app",
  ],
  authors: [{ name: SITE.company }],
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Finally speak Spanish without freezing`,
    description: SITE.description,
    images: [{ url: ASSETS.ogImage, width: 1200, height: 630, alt: `${SITE.name}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Finally speak Spanish without freezing`,
    description: SITE.description,
    images: [ASSETS.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#090c0a" },
  ],
};

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* Fonts loaded at runtime (keeps the build offline-friendly). */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- intentional runtime font load to keep the build offline-friendly */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap"
          rel="stylesheet"
        />

        <Providers>
          <a
            href={`#${SectionId.Hero}`}
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-fg"
          >
            Skip to content
          </a>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
