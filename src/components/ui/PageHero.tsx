import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Reveal } from "./Reveal";

type Crumb = { label: string; href?: string };

type PageHeroProps = {
  title: string;
  image: string;
  imageAlt?: string;
  breadcrumbs: Crumb[];
};

/**
 * Inner-page banner. The legacy build set each page's background image in CSS
 * via a .page-hero--<name> modifier; here the image is a prop, so adding a page
 * no longer means touching the stylesheet.
 */
export function PageHero({
  title,
  image,
  imageAlt = "",
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-ink-border pt-28 pb-16">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,10,10,0.88)_0%,rgba(10,10,10,0.65)_50%,rgba(10,10,10,0.9)_100%)]" />

      <div className="shell relative z-[1] text-center">
        <Reveal>
          <h1 className="mb-3 font-heading text-[clamp(2rem,4vw,3rem)] font-semibold text-cream">
            {title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted">
            {breadcrumbs.map((crumb, index) => (
              <Fragment key={crumb.label}>
                {index > 0 ? <span className="text-muted">/</span> : null}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-muted transition-colors hover:text-gold"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-gold">{crumb.label}</span>
                )}
              </Fragment>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
