import { Layers } from "lucide-react";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-[calc(100vh-150px)] bg-[#FAF7F2] flex">
      {/* Left Panel - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#2C2C2C] flex-col justify-between p-12 text-white">
        {/* Top Section */}
        <div className="flex items-center gap-2">
          <Layers className="w-8 h-8 text-[#C8956C]" />
          <span className="font-playfair text-2xl font-bold">RS Wallpaper</span>
        </div>

        {/* Center Section - Quote */}
        <div className="flex flex-col gap-6">
          <div className="text-[#C8956C] text-8xl font-serif leading-none">
            “
          </div>
          <p className="text-xl text-gray-300 italic leading-relaxed">
            Transform your home into a masterpiece with premium 3D wallpapers
            and epoxy floors that last a lifetime.
          </p>
          <p className="text-sm text-gray-400">
            — RS 3D Wallpaper & Floor, Est. 2017
          </p>
        </div>

        {/* Bottom Section - Pills */}
        <div className="flex flex-wrap gap-3">
          <div className="bg-white/10 rounded-full px-4 py-2 text-white text-sm">
            7+ Years
          </div>
          <div className="bg-white/10 rounded-full px-4 py-2 text-white text-sm">
            4000+ Clients
          </div>
          <div className="bg-white/10 rounded-full px-4 py-2 text-white text-sm">
            All Bangladesh
          </div>
        </div>
      </div>

      {/* Right Panel - Main Auth Area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="max-w-md w-full mx-auto">
          {/* Mobile-only Header Logo */}
          {/* <div className="lg:hidden flex items-center justify-center gap-2 mb-10">
            <Layers className="w-6 h-6 text-[#C8956C]" />
            <span className="font-playfair text-xl font-bold text-[#2C2C2C]">
              RS Wallpaper
            </span>
          </div> */}

          {/* Title and Subtitle */}
          <div className="mb-8">
            <h1 className="font-playfair text-3xl font-bold text-[#2C2C2C] mb-2">
              {title}
            </h1>
            <p className="text-gray-500 text-sm">{subtitle}</p>
          </div>

          {/* Form Content */}
          {children}
        </div>
      </div>
    </div>
  );
}
