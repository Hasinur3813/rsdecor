"use client";

import { useState, useEffect } from "react";
import { Play, X } from "lucide-react";
import Container from "@/components/ui/Container";

const VIDEO_URL =
  "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Frsintl%2Fvideos%2F612535400840208%2F&show_text=false&width=560";

export default function VideoModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <section
      id="video"
      className="scroll-mt-20 py-16 md:py-24 bg-secondary/10"
    >
      <Container>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark text-center mb-10 md:mb-12">
          See Our Work in Action
        </h2>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative w-full max-w-3xl mx-auto aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-secondary/30 via-primary/20 to-dark/40 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Watch our installation process video"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <span className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary text-white flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-200">
              <Play className="w-7 h-7 md:w-8 md:h-8 ml-1" fill="currentColor" />
            </span>
            <span className="text-sm md:text-base font-semibold text-white drop-shadow">
              Watch Our Installation Process
            </span>
          </div>
        </button>
      </Container>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Installation video"
        >
          <div
            className="relative w-full max-w-2xl bg-dark rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full aspect-video">
              <iframe
                src={VIDEO_URL}
                title="RS 3D Wallpaper & Floor installation video"
                className="absolute inset-0 w-full h-full border-0"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
