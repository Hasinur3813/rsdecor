"use client";

import { createPortal } from "react-dom";

export default function Portal({ children, to = "body" }) {
  // Check if we're in browser first
  if (typeof window === "undefined") {
    return null;
  }

  // Get target container
  const targetContainer =
    typeof to === "string" ? document.querySelector(to) || document.body : to;

  return createPortal(children, targetContainer);
}
