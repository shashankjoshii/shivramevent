import { Counter } from "@/components/ui/Counter";

export type Stat = {
  /** Numeric stats count up; string stats (e.g. "★★★★★") render as-is. */
  value: number | string;
  suffix?: string;
  label: string;
};

type StatsProps = {
  items: readonly Stat[];
  className?: string;
  bordered?: boolean;
};

export function Stats({
  items,
  className = "",
  bordered = true,
}: StatsProps) {
  return (
    <dl
      className={`flex flex-wrap gap-6 sm:gap-10 ${
        bordered ? "border-t border-ink-border pt-8" : ""
      } ${className}`.trim()}
    >
      {items.map((item) => (
        <div key={item.label}>
          <dt className="sr-only">{item.label}</dt>
          <dd>
            <strong className="block font-heading text-[1.75rem] font-semibold text-gold">
              {typeof item.value === "number" ? (
                <Counter value={item.value} suffix={item.suffix} />
              ) : (
                item.value
              )}
            </strong>
            <span className="text-[0.8125rem] uppercase tracking-[0.05em] text-muted">
              {item.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
