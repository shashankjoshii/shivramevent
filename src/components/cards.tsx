import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

/* --------------------------------------------------------------------------
   Service card — centred, bordered, with a gold rule that wipes across the top
   edge on hover and a lift-and-scale on the card itself.
   -------------------------------------------------------------------------- */

type ServiceCardProps = {
  /** Either a two-digit sequence number or a glyph, as in the original. */
  number?: string;
  icon?: string;
  title: string;
  text: string;
  href?: string;
  linkLabel?: string;
};

export function ServiceCard({
  number,
  icon,
  title,
  text,
  href,
  linkLabel = "View Details",
}: ServiceCardProps) {
  return (
    <article className="group relative z-[1] overflow-hidden rounded-lg border border-ink-border bg-ink-card px-6 py-10 text-center transition-[transform,border-color,box-shadow] duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2.5 hover:scale-[1.03] hover:border-gold hover:shadow-[0_20px_40px_rgba(0,0,0,0.7),0_0_30px_rgba(197,160,89,0.28)] before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:scale-x-0 before:bg-[linear-gradient(90deg,transparent,var(--color-gold),transparent)] before:transition-transform before:duration-[450ms] before:ease-[cubic-bezier(0.16,1,0.3,1)] before:content-[''] hover:before:scale-x-100">
      {number ? (
        <div className="mb-2 font-heading text-[2.5rem] text-gold-dark opacity-60 transition-all duration-[400ms] group-hover:scale-110 group-hover:text-gold-light group-hover:opacity-100">
          {number}
        </div>
      ) : null}

      {icon ? (
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full border border-gold-dark text-2xl text-gold transition-[transform,background,border-color,box-shadow] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[8deg] group-hover:scale-110 group-hover:border-gold-light group-hover:bg-[rgba(197,160,89,0.15)] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]">
          {icon}
        </div>
      ) : null}

      <h3 className="mb-3 font-heading text-lg font-semibold text-cream transition-colors duration-300 group-hover:text-gold-light">
        {title}
      </h3>
      <p className="text-[0.9375rem] text-muted">{text}</p>

      {href ? (
        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-gold transition-colors hover:text-gold-light"
        >
          {linkLabel}
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      ) : null}
    </article>
  );
}

/* --------------------------------------------------------------------------
   Image card — photo on top, copy below, with a slow zoom on the photo.
   -------------------------------------------------------------------------- */

type EventCardProps = {
  image: string;
  alt: string;
  title: string;
  text: string;
  href?: string;
  linkLabel?: string;
  priority?: boolean;
};

export function EventCard({
  image,
  alt,
  title,
  text,
  href,
  linkLabel = "View Details",
  priority = false,
}: EventCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-lg border border-ink-border bg-ink-card transition-[transform,border-color,box-shadow] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:scale-[1.02] hover:border-gold hover:shadow-[0_16px_36px_rgba(0,0,0,0.6),0_0_25px_rgba(197,160,89,0.25)]">
      <div className="relative h-[220px] overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1140px) 50vw, 360px"
          className="object-cover transition-[transform,filter] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:rotate-[0.5deg] group-hover:brightness-110"
        />
      </div>

      <div className="p-6">
        <h3 className="mb-3 font-heading text-xl font-semibold text-gold-light transition-colors duration-300 group-hover:text-gold">
          {title}
        </h3>
        <p className="text-[0.9375rem] text-muted">{text}</p>

        {href ? (
          <Link
            href={href}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-gold transition-colors hover:text-gold-light"
          >
            {linkLabel}
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        ) : null}
      </div>
    </article>
  );
}

/* --------------------------------------------------------------------------
   Testimonial — oversized quote glyph behind the text, avatar initial below.
   -------------------------------------------------------------------------- */

type TestimonialCardProps = {
  quote: string;
  name: string;
  role: string;
  initial: string;
};

export function TestimonialCard({
  quote,
  name,
  role,
  initial,
}: TestimonialCardProps) {
  return (
    <figure className="relative h-full rounded-lg border border-ink-border bg-ink-card p-8 transition-[transform,border-color,box-shadow] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-gold-dark hover:shadow-[0_14px_32px_rgba(0,0,0,0.5)] before:absolute before:left-6 before:top-4 before:font-heading before:text-[4rem] before:leading-none before:text-gold-dark before:opacity-30 before:content-['\201C']">
      <div className="mb-3 tracking-[2px] text-gold" aria-label="5 out of 5 stars">
        ★★★★★
      </div>
      <blockquote className="mb-6 pt-6 italic text-muted">{quote}</blockquote>
      <figcaption className="flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gold-dark text-sm font-bold text-ink">
          {initial}
        </div>
        <div>
          <strong className="block text-[0.9375rem] text-cream">{name}</strong>
          <span className="text-[0.8125rem] text-muted">{role}</span>
        </div>
      </figcaption>
    </figure>
  );
}

/* --------------------------------------------------------------------------
   Layout helpers
   -------------------------------------------------------------------------- */

export function CardGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
      {children}
    </div>
  );
}

export function Section({
  children,
  alt = false,
  className = "",
}: {
  children: ReactNode;
  alt?: boolean;
  className?: string;
}) {
  return (
    <section
      className={`py-20 max-[480px]:py-14 ${alt ? "bg-ink-soft" : ""} ${className}`.trim()}
    >
      <div className="shell">{children}</div>
    </section>
  );
}
