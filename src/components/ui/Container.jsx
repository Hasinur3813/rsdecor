import { cn } from "@/lib/utils";

/**
 * Container — global wrapper that controls max-width & horizontal padding
 * for every section across the site.
 *
 * Usage:
 *   <Container>…</Container>
 *   <Container as="section" className="py-20">…</Container>
 */
export default function Container({
  as: Tag = "div",
  className,
  children,
  ...props
}) {
  return (
    <Tag className={cn("container", className)} {...props}>
      {children}
    </Tag>
  );
}
