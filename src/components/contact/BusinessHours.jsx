"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";

const HOURS = [
  { day: "Saturday", hours: "9:00 AM – 8:00 PM", closed: false },
  { day: "Sunday", hours: "9:00 AM – 8:00 PM", closed: false },
  { day: "Monday", hours: "9:00 AM – 8:00 PM", closed: false },
  { day: "Tuesday", hours: "9:00 AM – 8:00 PM", closed: false },
  { day: "Wednesday", hours: "9:00 AM – 8:00 PM", closed: false },
  { day: "Thursday", hours: "9:00 AM – 8:00 PM", closed: false },
  { day: "Friday", hours: "Closed", closed: true },
];

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getBDTDate() {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }),
  );
}

function getStatus(now) {
  const dayName = DAY_NAMES[now.getDay()];
  const timeInMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = 9 * 60;
  const closeMinutes = 20 * 60;
  const openDays = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
  ];

  if (dayName === "Friday") {
    return { type: "closed-today", label: "Closed Today", dayName };
  }

  if (
    timeInMinutes >= openMinutes &&
    timeInMinutes < closeMinutes
  ) {
    return { type: "open", label: "Open Now", dayName };
  }

  let nextOpenDay;

  if (timeInMinutes < openMinutes) {
    nextOpenDay = dayName;
  } else if (dayName === "Thursday") {
    nextOpenDay = "Saturday";
  } else {
    const idx = openDays.indexOf(dayName);
    nextOpenDay =
      idx >= 0 && idx < openDays.length - 1
        ? openDays[idx + 1]
        : "Saturday";
  }

  return {
    type: "closed",
    label: `Closed Now — Opens ${nextOpenDay} at 9:00 AM`,
    dayName,
  };
}

export default function BusinessHours() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    const update = () => setNow(getBDTDate());
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  const status = now ? getStatus(now) : null;
  const currentDay = now ? DAY_NAMES[now.getDay()] : null;

  return (
    <section id="business-hours" className="scroll-mt-20 py-16 bg-white">
      <Container>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark text-center mb-8">
          Business Hours
        </h2>

        <div className="max-w-2xl mx-auto rounded-2xl shadow-md border border-light-muted/50 p-6 md:p-8">
          {status && (
            <div className="flex justify-center mb-8">
              <span
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold",
                  status.type === "open" &&
                    "bg-green-100 text-green-700",
                  status.type === "closed-today" &&
                    "bg-red-100 text-red-700",
                  status.type === "closed" &&
                    "bg-gray-100 text-gray-600",
                )}
              >
                {status.type === "open" && (
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                )}
                {status.label}
              </span>
            </div>
          )}

          <div className="space-y-2">
            {HOURS.map((row, i) => {
              const isToday = row.day === currentDay;
              const isFriday = row.closed;

              return (
                <div
                  key={row.day}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-lg text-sm",
                    isToday && !isFriday && "bg-primary/10 border-l-4 border-primary font-semibold text-dark",
                    isFriday && "bg-red-50 text-red-700",
                    !isToday && !isFriday && i % 2 === 0 && "bg-light",
                    !isToday && !isFriday && i % 2 !== 0 && "bg-white",
                  )}
                >
                  <span>{row.day}</span>
                  <span className={isFriday ? "font-semibold text-red-600" : "text-dark-muted"}>
                    {row.hours}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-dark-muted">
            <Clock className="w-4 h-4 text-primary" />
            Bangladesh Standard Time (UTC+6)
          </div>
        </div>
      </Container>
    </section>
  );
}
