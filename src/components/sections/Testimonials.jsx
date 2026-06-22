"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Star, Quote } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

import "swiper/css";

/* ─────────────────────────────────────────
   Testimonial data
   ───────────────────────────────────────── */
const TESTIMONIALS = [
  {
    id: 1,
    stars: 5,
    quote:
      "RS Wallpaper completely transformed our living room. The 3D wallpaper looks absolutely stunning — every guest compliments it! Professional team and excellent service.",
    name: "Arif Hossain",
    city: "Dhaka",
  },
  {
    id: 2,
    stars: 5,
    quote:
      "We got epoxy flooring done for our showroom. The finish is like glass — durable and beautiful. Worth every taka. Highly recommend RS Wallpaper & Floor!",
    name: "Fatema Akter",
    city: "Chittagong",
  },
  {
    id: 3,
    stars: 5,
    quote:
      "The ceiling paper in our bedroom is gorgeous. Installation was quick and clean. The team traveled to Rajshahi and did an amazing job. Very satisfied!",
    name: "Shakib Rahman",
    city: "Rajshahi",
  },
  {
    id: 4,
    stars: 4,
    quote:
      "Beautiful 3D wallpaper for our kids' room. My children love the design! The RS team was professional and the price was very reasonable. Great experience overall.",
    name: "Nusrat Jahan",
    city: "Sylhet",
  },
];

/* ─────────────────────────────────────────
   Star Rating
   ───────────────────────────────────────── */
const StarRating = ({ count }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < count
            ? "fill-amber-400 text-amber-400"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ))}
  </div>
);

/* ─────────────────────────────────────────
   Testimonial Card
   ───────────────────────────────────────── */
const TestimonialCard = ({ stars, quote, name, city }) => (
  <div className="bg-white rounded-2xl p-6 md:p-7 shadow-sm border border-light-muted/50 h-full flex flex-col">
    {/* Quote icon */}
    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
      <Quote className="w-5 h-5 text-primary" />
    </div>

    {/* Stars */}
    <StarRating count={stars} />

    {/* Quote text */}
    <p className="mt-4 text-sm text-dark-muted leading-relaxed flex-1">
      &ldquo;{quote}&rdquo;
    </p>

    {/* Client info */}
    <div className="flex items-center gap-3 mt-5 pt-4 border-t border-light-muted">
      {/* Avatar placeholder */}
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/40 flex items-center justify-center text-sm font-bold text-primary">
        {name.charAt(0)}
      </div>
      <div>
        <p className="text-sm font-heading font-bold text-dark">{name}</p>
        <p className="text-xs text-dark-muted">{city}, Bangladesh</p>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────
   Testimonials Section
   ───────────────────────────────────────── */
export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-light">
      <Container>
        <SectionTitle
          subtitle="Client Stories"
          title="What Our Clients Say"
          description="Real feedback from happy homeowners across Bangladesh."
        />

        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-2"
        >
          {TESTIMONIALS.map((t) => (
            <SwiperSlide key={t.id} className="!h-auto">
              <TestimonialCard {...t} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}
