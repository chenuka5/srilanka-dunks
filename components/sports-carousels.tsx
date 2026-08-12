'use client';

import { useState, useEffect } from 'react';

interface Slide {
  id: number;
  title: string;
  sport: string;
  description: string;
  image: string;
  badge: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Basketball Dunkers",
    sport: "Basketball",
    description: "Developing rim reach, fast ankle stiffness, and two-foot explosive takeoff power.",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop",
    badge: "Vertical & Rim Force"
  },
  {
    id: 2,
    title: "High Jumpers & Field Athletes",
    sport: "Track & Field",
    description: "Mastering curved approach speed, plant foot stiffness, and vertical height displacement.",
    image: "https://images.unsplash.com/photo-1569517282132-25d22f4573e6?q=80&w=1200&auto=format&fit=crop",
    badge: "Approach & Plant Mechanics"
  },
  {
    id: 3,
    title: "Sprinting & Track Runners",
    sport: "Track & Field",
    description: "Maximizing horizontal force vector transfer, drive phase accelerations, and stride frequency.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop",
    badge: "Acceleration & Speed"
  },
  {
    id: 4,
    title: "Volleyball Hitters & Blockers",
    sport: "Volleyball",
    description: "Optimizing pen-ultimate steps, arm swing kinetic chains, and explosive spike elevation.",
    image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1200&auto=format&fit=crop",
    badge: "Spike Reach & Landing"
  }
];

export default function SportsCarousel() {
  const [current, setCurrent] = useState(0);

  // Auto-play timer (changes slide every 5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="py-20 bg-black text-white border-t border-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-red-600 font-mono text-xs uppercase tracking-widest mb-2">
              Multi-Sport Integration
            </p>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
              Built For High Performers
            </h2>
          </div>
          <p className="text-neutral-400 font-mono text-xs max-w-md leading-relaxed">
            Our system transfers explosiveness across court, track, and field disciplines.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl h-[450px] md:h-[550px] group">
          
          {/* Background Images */}
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center filter brightness-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              {/* Slide Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20 flex flex-col items-start space-y-3">
                <span className="bg-red-600 text-white font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded font-bold">
                  {slide.badge}
                </span>
                <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
                  {slide.title}
                </h3>
                <p className="text-neutral-300 font-mono text-xs md:text-sm max-w-xl leading-relaxed">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}

          {/* Navigation Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-red-600 text-white p-3 rounded-full backdrop-blur-md border border-neutral-700 hover:border-red-600 transition-all opacity-80 group-hover:opacity-100"
            aria-label="Previous Slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-red-600 text-white p-3 rounded-full backdrop-blur-md border border-neutral-700 hover:border-red-600 transition-all opacity-80 group-hover:opacity-100"
            aria-label="Next Slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Pagination Indicators */}
          <div className="absolute bottom-4 right-8 z-30 flex space-x-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  idx === current ? 'w-8 bg-red-600' : 'w-2 bg-neutral-600 hover:bg-white'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}