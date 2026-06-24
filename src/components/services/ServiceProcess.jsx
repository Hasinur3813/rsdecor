export default function ServiceProcess() {
  const steps = [
    {
      number: 1,
      icon: Phone,
      title: "Initial Contact",
      description:
        "Call or WhatsApp with your room details. Get a rough estimate instantly.",
    },
    {
      number: 2,
      icon: MapPin,
      title: "Site Visit",
      description:
        "Our expert visits for precise measurement - No travel cost in Dhaka.",
    },
    {
      number: 3,
      icon: Palette,
      title: "Design Selection",
      description:
        "Choose from 6000+ designs. We bring samples to your home if needed.",
    },
    {
      number: 4,
      icon: CreditCard,
      title: "Confirm & Advance",
      description:
        "Finalize design and pay 50% advance. Receive a signed money receipt.",
    },
    {
      number: 5,
      icon: Hammer,
      title: "Professional Install",
      description:
        "Our trained team installs with care and precision in 3–4 working days.",
    },
    {
      number: 6,
      icon: CheckCircle,
      title: "Handover & Warranty",
      description:
        "Quality check done together. Balance payment after your full satisfaction.",
    },
  ];

  return (
    <section id="process" className="bg-dark text-white py-16 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl font-bold mb-3">Our Process</h2>
          <p className="text-gray-400">Simple, transparent, fast</p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-700 -translate-y-1/2" />
            <div
              className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary/30 -translate-y-1/2"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, #C8956C 0, #C8956C 8px, transparent 8px, transparent 16px)",
              }}
            />

            {/* Steps */}
            <div className="grid grid-cols-6 gap-4 relative">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="text-center relative z-10">
                    <div className="w-16 h-16 rounded-full bg-dark border-2 border-primary flex items-center justify-center mx-auto mb-4">
                      <span className="font-playfair text-2xl font-bold text-primary">
                        {step.number}
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex gap-4 items-start">
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-dark border-2 border-primary flex items-center justify-center absolute -top-2 -right-2">
                    <span className="font-playfair font-bold text-primary text-sm">
                      {step.number}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="absolute top-12 left-1/2 w-0.5 h-16 bg-primary/30 -translate-x-1/2" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import {
  Phone,
  MapPin,
  Palette,
  CreditCard,
  Hammer,
  CheckCircle,
} from "lucide-react";
