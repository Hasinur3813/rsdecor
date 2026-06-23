"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Container from "@/components/ui/Container";

import "swiper/css";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Raihan Ahmed",
    city: "Dhaka",
    quote:
      "We got 3D wallpaper installed in our bedroom and living room. Absolutely stunning result! The team was professional and finished in just 2 days. Highly recommended.",
  },
  {
    id: 2,
    name: "Fatema Begum",
    city: "Chittagong",
    quote:
      "The epoxy floor they installed in our kitchen is flawless. No joints, super easy to clean. The lifetime guarantee gave us real peace of mind.",
  },
  {
    id: 3,
    name: "Sabbir Hossain",
    city: "Rajshahi",
    quote:
      "Very honest service. They came for the site visit first, gave us an accurate estimate, and there were no surprise charges at the end. 10/10.",
  },
  {
    id: 4,
    name: "Nasrin Akter",
    city: "Sylhet",
    quote:
      "My daughter's room ceiling paper looks like a dream! The workers were neat and respectful. Will definitely call them again for our new flat.",
  },
  {
    id: 5,
    name: "Karim Mia",
    city: "Gazipur",
    quote:
      "The 3D wallpaper quality is exceptional. It's been 3 years and it still looks brand new. I wash it every month and it's completely fine.",
  },
  {
    id: 6,
    name: "Sanjida Islam",
    city: "Dhaka",
    quote:
      "Got the full package — walls, ceiling, and floor for one room. Rasel bhai personally called to follow up after installation. Very caring owner.",
  },
];

function TestimonialCard({ quote, name, city }) {
  return (
    <div className="h-full bg-white rounded-2xl shadow-md border border-light-muted/50 border-l-4 border-l-primary p-6 md:p-8">
      <p className="text-amber-400 text-sm mb-4 tracking-wider">★★★★★</p>
      <p className="text-sm md:text-base text-dark-muted italic leading-relaxed mb-6">
        &ldquo;{quote}&rdquo;
      </p>
      <div>
        <p className="text-sm font-bold text-dark">{name}</p>
        <p className="text-xs text-dark-muted mt-0.5">{city}</p>
      </div>
    </div>
  );
}

export default function TestimonialSlider() {
  return (
    <section id="testimonials" className="scroll-mt-20 py-16 md:py-24 bg-light">
      <Container>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark text-center mb-10 md:mb-12">
          What Our Clients Say About Us
        </h2>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          grabCursor
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
          }}
        >
          {TESTIMONIALS.map((item) => (
            <SwiperSlide key={item.id} className="h-auto pb-2">
              <TestimonialCard {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}
