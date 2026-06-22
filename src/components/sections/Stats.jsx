"use client";

import { useEffect, useRef, useState } from "react";
import { Award, Users, CheckCircle, Palette } from "lucide-react";
import Container from "@/components/ui/Container";

/* ─────────────────────────────────────────
   Stats data
   ───────────────────────────────────────── */
const STATS_DATA = [
  { icon: Award, value: 7, suffix: "+", label: "Years Experience" },
  { icon: Users, value: 4000, suffix: "+", label: "Happy Clients" },
  { icon: CheckCircle, value: 5000, suffix: "+", label: "Projects Done" },
  { icon: Palette, value: 6000, suffix: "+", label: "Designs" },
];

/* ─────────────────────────────────────────
   AnimatedCounter — count-up on scroll
   ───────────────────────────────────────── */
const AnimatedCounter = ({ target, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

/* ─────────────────────────────────────────
   Stats Section
   ───────────────────────────────────────── */
export default function Stats() {
  return (
    <section id="stats" className="relative py-16 md:py-20 bg-dark overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-secondary/5 blur-3xl" />

      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {STATS_DATA.map((stat) => (
            <div
              key={stat.label}
              className="text-center group"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-xl bg-white/5 mb-4 group-hover:bg-primary/15 transition-colors duration-300">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Number */}
              <p className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                />
              </p>

              {/* Label */}
              <p className="mt-2 text-sm text-white/60 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
