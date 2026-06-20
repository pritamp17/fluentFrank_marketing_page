import { Wordmark } from "@/components/brand/Wordmark";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionId } from "@/lib/enums";
import { NAV_LINKS, PRIMARY_CTA, SITE } from "@/lib/site";

const COMPANY_LINKS: readonly { label: string; href: string; newTab?: boolean }[] = [
  { label: "About", href: `#${SectionId.About}` },
  { label: "Privacy", href: `${SITE.appUrl}/privacy`, newTab: true },
  { label: "Terms", href: `${SITE.appUrl}/terms`, newTab: true },
  { label: "Contact", href: `mailto:${SITE.email}` },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/50">
      <Container className="py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Wordmark />
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">{SITE.tagline}</p>
            <Button href={PRIMARY_CTA.href} size="md" className="mt-5">
              {PRIMARY_CTA.label}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                Product
              </p>
              <ul className="mt-4 space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                Company
              </p>
              <ul className="mt-4 space-y-2.5">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      {...(link.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name} — a {SITE.company} product.
          </p>
          <p>English → Spanish · More languages on the way.</p>
        </div>
      </Container>
    </footer>
  );
}
