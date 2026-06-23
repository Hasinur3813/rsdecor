"use client";

import { useState, useEffect, useRef } from "react";
import { Award, Users, CheckCircle, Palette } from "lucide-react";
import Container from "@/components/ui/Container";

const STATS = [
  { target: 7, suffix: "+", label: "Years of Experience", icon: Award },
  { target: 4000, suffix: "+", label: "Happy Clients", icon: Users },
  { target: 5000, suffix: "+", label: "Projects Completed", icon: CheckCircle },
  { target: 6000, suffix: "+", label: "Designs Available", icon: Palette },
];

function useCountUp(target, active, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step += 1;
      current = Math.min(Math.round(increment * step), target);
      setCount(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target, active, duration]);

  return count;
}

function StatItem({ target, suffix, label, icon: Icon, active }) {
  const count = useCountUp(target, active);

  return (
    <div className="flex flex-col items-center text-center px-4">
      <Icon className="w-7 h-7 text-primary mb-3" />
      <p className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="text-sm text-white/70">{label}</p>
    </div>
  );
}

export default function StatsCounter() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stats-counter"
      ref={sectionRef}
      className="scroll-mt-20 py-14 md:py-20 bg-dark"
    >
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {STATS.map((stat) => (
            <StatItem key={stat.label} {...stat} active={active} />
          ))}
        </div>
      </Container>
    </section>
  );
}
