"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { navigation, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  /** Any link click inside the sheet navigates, so close it on the way out. */
  const closeMenu = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };

  /**
   * Active state is derived from the route, so no page has to hand-set it.
   * "/services" also lights up for its detail pages, matching the old markup
   * where service pages marked both the parent and their own dropdown entry.
   */
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-[1000] border-b border-ink-border bg-[rgba(10,10,10,0.95)] backdrop-blur-[12px]">
      <div className="shell flex h-header items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-3.5">
          <Image
            src="/logo/logo-256.png"
            alt=""
            width={80}
            height={80}
            priority
            className="size-[52px] shrink-0 object-contain sm:size-20"
          />
          <span className="flex flex-col justify-center gap-[0.15rem] leading-[1.15]">
            <span className="font-heading text-[0.95rem] font-semibold uppercase tracking-[0.08em] text-gold-light whitespace-nowrap sm:text-2xl sm:tracking-[0.12em]">
              {site.wordmark}
            </span>
            <span
              aria-hidden
              className="relative my-[0.2rem] hidden h-px w-full max-w-[120px] bg-[linear-gradient(90deg,var(--color-gold-dark),var(--color-gold-light))] min-[381px]:block sm:max-w-[180px] after:absolute after:left-1/2 after:top-1/2 after:size-[5px] after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-45 after:bg-gold-light after:content-['']"
            />
            <span className="hidden font-body text-[0.5rem] font-semibold uppercase tracking-[0.1em] text-gold whitespace-nowrap min-[381px]:block sm:text-[0.6875rem] sm:tracking-[0.18em]">
              {site.tagline}
            </span>
          </span>
        </Link>

        <nav
          id="main-nav"
          onClick={closeMenu}
          className={`max-md:fixed max-md:inset-x-0 max-md:top-[calc(var(--spacing-header)+40px)] max-md:border-b max-md:border-ink-border max-md:bg-ink max-md:p-4 max-md:transition-all max-md:duration-300 ${
            menuOpen
              ? "max-md:visible max-md:translate-y-0 max-md:opacity-100"
              : "max-md:invisible max-md:-translate-y-[120%] max-md:opacity-0"
          }`}
        >
          <ul className="flex items-center max-md:flex-col max-md:items-stretch">
            {navigation.map((item) =>
              "children" in item ? (
                <li key={item.href} className="group relative">
                  <div className="flex items-center max-md:justify-between max-md:border-b max-md:border-ink-border">
                    <Link
                      href={item.href}
                      className={`block rounded px-2 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.02em] transition-colors hover:text-gold max-md:px-4 max-md:py-3 max-md:text-[0.8125rem] ${
                        isActive(item.href) ? "text-gold" : "text-cream"
                      }`}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-label="Toggle services menu"
                      aria-expanded={servicesOpen}
                      onClick={(event) => {
                        // Expanding the submenu must not close the sheet.
                        event.stopPropagation();
                        setServicesOpen((open) => !open);
                      }}
                      className="cursor-pointer px-4 py-3 text-[0.6rem] text-gold-dark md:pointer-events-none md:px-0 md:py-0"
                    >
                      ▾
                    </button>
                  </div>

                  <ul
                    className={`min-w-[210px] md:absolute md:left-0 md:top-[calc(100%+0.5rem)] md:z-[100] md:rounded-md md:border md:border-ink-border md:bg-ink-card md:py-2 md:shadow-[0_8px_24px_rgba(0,0,0,0.4)] md:invisible md:translate-y-[6px] md:opacity-0 md:transition-all md:duration-300 md:group-hover:visible md:group-hover:translate-y-0 md:group-hover:opacity-100 max-md:bg-ink-soft ${
                      servicesOpen ? "max-md:block" : "max-md:hidden"
                    }`}
                  >
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={`block px-4 py-2 text-[0.6875rem] transition-colors hover:bg-[rgba(197,160,89,0.08)] hover:text-gold max-md:border-b max-md:border-ink-border max-md:py-3 max-md:pl-7 max-md:text-xs ${
                            pathname === child.href ? "text-gold" : "text-cream"
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded px-2 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.02em] transition-colors hover:text-gold max-md:border-b max-md:border-ink-border max-md:px-4 max-md:py-3 max-md:text-[0.8125rem] ${
                      isActive(item.href) ? "text-gold" : "text-cream"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            href="/contact"
            variant="outline"
            className="hidden px-3.5 py-[0.45rem] text-[0.625rem] md:inline-flex"
          >
            Get a Quote
          </Button>
          <Button
            href={site.phoneHref}
            className="px-3.5 py-[0.45rem] text-[0.625rem]"
          >
            Call Now
          </Button>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex cursor-pointer flex-col gap-[5px] p-2 md:hidden"
          >
            <span
              className={`block h-0.5 w-6 bg-gold transition-transform duration-300 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-gold transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-gold transition-transform duration-300 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
