import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with clsx conditionals.
 * Handles conflicting utilities (e.g. `px-4` vs `px-6`) gracefully.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
