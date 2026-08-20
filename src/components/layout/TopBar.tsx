import { site } from "@/lib/site";

export function TopBar() {
  return (
    <div className="border-b border-ink-border bg-ink-soft py-2 text-[0.8125rem]">
      <div className="shell flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-5">
          <a
            href={site.phoneHref}
            className="text-muted transition-colors hover:text-gold"
          >
            ☎ {site.phoneDisplay}
          </a>
          <a
            href={site.emailHref}
            className="text-muted transition-colors hover:text-gold"
          >
            ✉ {site.email}
          </a>
        </div>

        {/* Hidden below 768px in the original layout. */}
        <div className="hidden flex-wrap items-center gap-5 md:flex">
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener"
            className="text-muted transition-colors hover:text-gold"
          >
            Instagram
          </a>
          <a
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener"
            className="text-muted transition-colors hover:text-gold"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
