import { cn } from "@/lib/utils";

/**
 * SectionTitle — consistent heading block for page sections.
 *
 * Props:
 *   subtitle   — small label above heading (e.g. "Our Services")
 *   title      — main heading text
 *   description — optional paragraph below heading
 *   align      — "center" (default) | "left"
 *   dark       — true for white text on dark backgrounds
 */
export default function SectionTitle({
  subtitle,
  title,
  description,
  align = "center",
  dark = false,
  className,
}) {
  return (
    <div
      className={cn(
        "max-w-2xl mb-10 md:mb-14",
        align === "center" && "mx-auto text-center",
        align === "left" && "text-left",
        className
      )}
    >
      {subtitle && (
        <span
          className={cn(
            "inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-3 font-body",
            dark ? "text-primary-light" : "text-primary"
          )}
        >
          {subtitle}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-[2.75rem] font-heading font-bold leading-tight",
          dark ? "text-white" : "text-dark"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base md:text-lg leading-relaxed",
            dark ? "text-white/60" : "text-dark-muted"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
