"use client";

import { useState, useMemo } from "react";
import { Calculator, Ruler, Layers, Droplets } from "lucide-react";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

/* ─────────────────────────────────────────
   Service types & rates
   ───────────────────────────────────────── */
const RATES = {
  wallpaper: 140,
  ceiling: 140,
  epoxy: 450,
};

const SERVICES = [
  { key: "wallpaper", label: "Wallpaper", rate: RATES.wallpaper, icon: Layers },
  { key: "ceiling", label: "Ceiling Paper", rate: RATES.ceiling, icon: Ruler },
  { key: "epoxy", label: "Epoxy Floor", rate: RATES.epoxy, icon: Droplets },
];

const BREAKDOWN_BY_SERVICE = {
  wallpaper: ["oneWall", "fourWalls", "ceiling", "fullRoom"],
  ceiling: ["ceiling"],
  epoxy: ["floor"],
};

const BREAKDOWN_LABELS = {
  oneWall: "1 Wall",
  fourWalls: "All 4 Walls",
  ceiling: "Ceiling",
  floor: "Floor",
  fullRoom: "Full Room Package",
};

/* ─────────────────────────────────────────
   PriceCalculator Section
   ───────────────────────────────────────── */
export default function PriceCalculator() {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [service, setService] = useState("wallpaper");
  const [calculated, setCalculated] = useState(false);

  const results = useMemo(() => {
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    if (w <= 0 || h <= 0) return null;

    const oneWallArea = w * h;
    const fourWallsArea = 4 * w * h;
    const ceilingArea = w * w;
    const floorArea = w * w;

    return {
      oneWall: { area: oneWallArea, cost: oneWallArea * RATES.wallpaper },
      fourWalls: { area: fourWallsArea, cost: fourWallsArea * RATES.wallpaper },
      ceiling: { area: ceilingArea, cost: ceilingArea * RATES.ceiling },
      floor: { area: floorArea, cost: floorArea * RATES.epoxy },
      fullRoom: {
        area: fourWallsArea + ceilingArea,
        cost:
          fourWallsArea * RATES.wallpaper + ceilingArea * RATES.ceiling,
      },
    };
  }, [width, height]);

  const visibleBreakdown = BREAKDOWN_BY_SERVICE[service] || [];

  const handleCalculate = () => {
    if (parseFloat(width) > 0 && parseFloat(height) > 0) {
      setCalculated(true);
    }
  };

  const formatBDT = (num) =>
    new Intl.NumberFormat("en-BD").format(Math.round(num));

  return (
    <section id="price-calculator" className="py-16 md:py-24 bg-white">
      <Container>
        <SectionTitle
          subtitle="Instant Estimate"
          title="Calculate Your Room Cost"
          description="Get an instant price estimate for wallpaper, ceiling paper, or epoxy floor installation."
        />

        <div className="max-w-3xl mx-auto">
          <div className="bg-light rounded-2xl shadow-md border border-light-muted/50 overflow-hidden">
            {/* Top accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-secondary" />

            <div className="p-6 md:p-8">
              {/* Service type selector */}
              <div className="mb-6">
                <label className="block text-xs font-semibold uppercase tracking-widest text-dark-muted mb-3">
                  Select Service
                </label>
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  {SERVICES.map((svc) => (
                    <button
                      key={svc.key}
                      onClick={() => {
                        setService(svc.key);
                        setCalculated(false);
                      }}
                      className={cn(
                        "flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl border-2 transition-all duration-200 text-center",
                        service === svc.key
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-light-muted bg-white text-dark-muted hover:border-primary/30"
                      )}
                    >
                      <svc.icon className="w-5 h-5" />
                      <span className="text-xs md:text-sm font-semibold">
                        {svc.label}
                      </span>
                      <span className="text-[10px] text-dark-muted">
                        ৳{svc.rate}/sqft
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimension inputs */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label
                    htmlFor="calc-width"
                    className="block text-xs font-semibold uppercase tracking-widest text-dark-muted mb-2"
                  >
                    Width (ft)
                  </label>
                  <input
                    id="calc-width"
                    type="number"
                    min="1"
                    step="0.5"
                    value={width}
                    onChange={(e) => {
                      setWidth(e.target.value);
                      setCalculated(false);
                    }}
                    placeholder="e.g. 12"
                    className="w-full h-12 px-4 text-sm bg-white border border-light-muted rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="calc-height"
                    className="block text-xs font-semibold uppercase tracking-widest text-dark-muted mb-2"
                  >
                    Height (ft)
                  </label>
                  <input
                    id="calc-height"
                    type="number"
                    min="1"
                    step="0.5"
                    value={height}
                    onChange={(e) => {
                      setHeight(e.target.value);
                      setCalculated(false);
                    }}
                    placeholder="e.g. 10"
                    className="w-full h-12 px-4 text-sm bg-white border border-light-muted rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                </div>
              </div>

              {/* Calculate button */}
              <Button
                variant="filled"
                size="lg"
                className="w-full"
                onClick={handleCalculate}
              >
                <Calculator className="w-4 h-4" />
                Calculate Cost
              </Button>

              {/* Results */}
              {calculated && results && (
                <div className="mt-8 pt-6 border-t border-light-muted">
                  <h4 className="text-sm font-heading font-bold text-dark mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Cost Breakdown
                  </h4>

                  <div
                    className={cn(
                      "grid gap-3",
                      visibleBreakdown.length > 1
                        ? "grid-cols-1 sm:grid-cols-2"
                        : "grid-cols-1 max-w-sm mx-auto",
                    )}
                  >
                    {visibleBreakdown.map((key) => {
                      const item = results[key];
                      const isFullRoom = key === "fullRoom";

                      return (
                        <div
                          key={key}
                          className={cn(
                            "flex items-center justify-between p-4 rounded-xl border",
                            isFullRoom
                              ? "bg-primary/5 border-2 border-primary/20"
                              : "bg-white border-light-muted",
                          )}
                        >
                          <div>
                            <p
                              className={cn(
                                "text-xs",
                                isFullRoom
                                  ? "font-semibold text-primary"
                                  : "text-dark-muted",
                              )}
                            >
                              {BREAKDOWN_LABELS[key]}
                            </p>
                            <p className="text-xs text-dark-muted mt-0.5">
                              {item.area} sqft
                            </p>
                          </div>
                          <p
                            className={cn(
                              "font-bold text-primary",
                              isFullRoom ? "text-xl" : "text-lg",
                            )}
                          >
                            ৳{formatBDT(item.cost)}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <p className="text-[11px] text-dark-muted/60 mt-4 text-center">
                    * Prices are estimates. Final cost may vary based on design
                    selection and site conditions.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
