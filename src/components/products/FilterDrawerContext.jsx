"use client";

import { createContext, useContext, useState, useCallback } from "react";

const FilterDrawerContext = createContext(null);

export function FilterDrawerProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = useCallback(() => setIsOpen(true), []);
  const closeDrawer = useCallback(() => setIsOpen(false), []);

  return (
    <FilterDrawerContext.Provider
      value={{ isOpen, openDrawer, closeDrawer, setIsOpen }}
    >
      {children}
    </FilterDrawerContext.Provider>
  );
}

export function useFilterDrawer() {
  const context = useContext(FilterDrawerContext);
  if (!context) {
    throw new Error("useFilterDrawer must be used within FilterDrawerProvider");
  }
  return context;
}
