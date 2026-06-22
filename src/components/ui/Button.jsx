import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Button — site-wide CTA / action button.
 *
 * Variants:
 *   filled    — primary bg, white text
 *   outline   — bordered, transparent bg
 *   ghost     — no bg, text only
 *   whatsapp  — green WhatsApp CTA
 *   dark      — dark bg, white text
 *
 * Sizes: sm | md | lg
 */
const VARIANT_CLASSES = {
  filled:
    "bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md",
  outline:
    "bg-transparent border-2 border-white/80 text-white hover:bg-white/10",
  "outline-primary":
    "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white",
  ghost:
    "bg-transparent text-primary hover:bg-primary/5",
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#1EBE57] shadow-sm hover:shadow-md",
  dark:
    "bg-dark text-white hover:bg-dark-muted shadow-sm hover:shadow-md",
};

const SIZE_CLASSES = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-2.5 text-sm gap-2",
  lg: "px-8 py-3.5 text-base gap-2",
};

export default function Button({
  children,
  variant = "filled",
  size = "md",
  href,
  className,
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center font-semibold rounded-lg",
    "active:scale-[0.97] transition-all duration-200 whitespace-nowrap",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
