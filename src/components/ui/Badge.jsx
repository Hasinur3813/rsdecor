import { cn } from "@/lib/utils";

/**
 * Badge — small label used for product tags, category counts, etc.
 *
 * Variants:
 *   primary  — filled terracotta
 *   secondary — filled sage
 *   accent   — filled soft gold
 *   outline  — bordered, transparent bg
 *   dark     — dark bg, white text
 */
const VARIANT_CLASSES = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-white",
  accent: "bg-accent-light text-dark",
  outline: "bg-transparent border border-primary/30 text-primary",
  dark: "bg-dark text-white",
};

export default function Badge({
  children,
  variant = "primary",
  size = "sm",
  className,
  ...props
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center w-fit font-semibold font-body tracking-wide uppercase rounded-full",
        size === "xs" && "px-2 py-0.5 text-[10px]",
        size === "sm" && "px-2.5 py-1 text-[11px]",
        size === "md" && "px-3 py-1 text-xs",
        VARIANT_CLASSES[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
