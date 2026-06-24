import Link from "next/link";

export default function ServicesHero() {
  return (
    <section className="relative bg-[#1C1C1C] text-white overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(#C8956C 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />

      <div className="relative container mx-auto px-4 py-16 lg:py-20">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-8">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-primary">Services</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm font-medium mb-6">
              Professional Installation Since 2017
            </span>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Premium Home Decoration Services
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
              From stunning 3D wallpapers to seamless epoxy floors — we
              transform every surface of your home with quality that lasts
              decades.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-5 py-2 rounded-full bg-white/10 text-sm font-medium">
                Free Site Visit
              </span>
              <span className="px-5 py-2 rounded-full bg-white/10 text-sm font-medium">
                3–4 Day Install
              </span>
              <span className="px-5 py-2 rounded-full bg-white/10 text-sm font-medium">
                All Bangladesh
              </span>
            </div>
          </div>

          {/* Right stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Wallpaper stat */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-2">
                3D Wallpapers
              </h3>
              <p className="text-primary text-2xl font-playfair font-bold mb-1">
                ৳140
              </p>
              <p className="text-sm text-gray-400">/sqft</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-300">
                <Shield className="w-4 h-4" />
                10 Year Warranty
              </div>
            </div>

            {/* Ceiling stat */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-colors">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                <Square className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-2">
                Ceiling Papers
              </h3>
              <p className="text-primary text-2xl font-playfair font-bold mb-1">
                ৳140
              </p>
              <p className="text-sm text-gray-400">/sqft</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-300">
                <Shield className="w-4 h-4" />
                10 Year Warranty
              </div>
            </div>

            {/* Epoxy stat */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Grid className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-2">
                Epoxy Floors
              </h3>
              <p className="text-primary text-2xl font-playfair font-bold mb-1">
                ৳450
              </p>
              <p className="text-sm text-gray-400">/sqft</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-300">
                <Shield className="w-4 h-4" />
                Lifetime Guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Required icons
import { Layers, Square, Grid, Shield } from "lucide-react";
