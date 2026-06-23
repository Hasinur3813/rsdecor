import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import StatsCounter from "@/components/about/StatsCounter";
import MissionValues from "@/components/about/MissionValues";
import WhatWeOffer from "@/components/about/WhatWeOffer";
import HowWeWork from "@/components/about/HowWeWork";
import TeamSection from "@/components/about/TeamSection";
import VideoModal from "@/components/about/VideoModal";
import TestimonialSlider from "@/components/about/TestimonialSlider";
import CertificatesBadges from "@/components/about/CertificatesBadges";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata = {
  title: "About Us | RS Wallpaper & Floor",
  description:
    "Learn about RS 3D Wallpaper & Floor — 7+ years of transforming homes across Bangladesh with premium 3D wallpapers, ceiling papers, and epoxy floors.",
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <AboutHero />
      <OurStory />
      <StatsCounter />
      <MissionValues />
      <WhatWeOffer />
      <HowWeWork />
      <TeamSection />
      <VideoModal />
      <TestimonialSlider />
      <CertificatesBadges />
      <AboutCTA />
    </main>
  );
}
