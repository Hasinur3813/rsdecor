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
const SERVICES = [
  { key: "wallpaper", label: "Wallpaper", rate: 140, icon: Layers },
  { key: "ceiling", label: "Ceiling Paper", rate: 140, icon: Ruler },
  { key: "epoxy", label: "Epoxy Floor", rate: 450, icon: Droplets },
];

/* ─────────────────────────────────────────
   PriceCalculator Section
   ───────────────────────────────────────── */
export default function PriceCalculator() {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [service, setService] = useState("wallpaper");
  const [calculated, setCalculated] = useState(false);

  const rate = SERVICES.find((s) => s.key === service)?.rate || 140;

  const results = useMemo(() => {
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    if (w <= 0 || h <= 0) return null;

    const oneWall = w * h;
    const fourWalls = 2 * (w * h + w * h); // simplified: 2 pairs of walls
    const ceiling = w * w; // assuming square room for simplicity, using width
    const fullRoom = fourWalls + ceiling;

    return {
      oneWall: { area: oneWall, cost: oneWall * rate },
      fourWalls: { area: fourWalls, cost: fourWalls * rate },
      ceiling: { area: w * (parseFloat(width) || 0), cost: w * w * rate },
      fullRoom: { area: fullRoom, cost: fullRoom * rate },
    };
  }, [width, height, rate]);

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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* 1 Wall */}
                    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-light-muted">
                      <div>
                        <p className="text-xs text-dark-muted">1 Wall</p>
                        <p className="text-xs text-dark-muted mt-0.5">
                          {results.oneWall.area} sqft
                        </p>
                      </div>
                      <p className="text-lg font-bold text-primary">
                        ৳{formatBDT(results.oneWall.cost)}
                      </p>
                    </div>

                    {/* All 4 Walls */}
                    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-light-muted">
                      <div>
                        <p className="text-xs text-dark-muted">All 4 Walls</p>
                        <p className="text-xs text-dark-muted mt-0.5">
                          {results.fourWalls.area} sqft
                        </p>
                      </div>
                      <p className="text-lg font-bold text-primary">
                        ৳{formatBDT(results.fourWalls.cost)}
                      </p>
                    </div>

                    {/* Ceiling */}
                    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-light-muted">
                      <div>
                        <p className="text-xs text-dark-muted">Ceiling</p>
                        <p className="text-xs text-dark-muted mt-0.5">
                          {results.ceiling.area} sqft
                        </p>
                      </div>
                      <p className="text-lg font-bold text-primary">
                        ৳{formatBDT(results.ceiling.cost)}
                      </p>
                    </div>

                    {/* Full Room Package */}
                    <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border-2 border-primary/20">
                      <div>
                        <p className="text-xs font-semibold text-primary">
                          Full Room Package
                        </p>
                        <p className="text-xs text-dark-muted mt-0.5">
                          {results.fullRoom.area} sqft
                        </p>
                      </div>
                      <p className="text-xl font-bold text-primary">
                        ৳{formatBDT(results.fullRoom.cost)}
                      </p>
                    </div>
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
