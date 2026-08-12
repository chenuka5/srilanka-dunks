'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

// --- Carousel Slide Interface & Data ---
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
    title: "Basketball Dunkers & Guards",
    sport: "Basketball",
    description: "Developing rim reach, fast ankle stiffness, and explosive two-foot/one-foot takeoff power.",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop",
    badge: "Vertical & Rim Elevation"
  },
  {
    id: 2,
    title: "High Jumpers & Field Athletes",
    sport: "Track & Field",
    description: "Mastering curved approach velocity, plant foot stiffness, and maximum vertical height displacement.",
    image: "https://images.unsplash.com/photo-1569517282132-25d22f4573e6?q=80&w=1200&auto=format&fit=crop",
    badge: "Approach & Plant Mechanics"
  },
  {
    id: 3,
    title: "Sprinting & Track Runners",
    sport: "Track & Field",
    description: "Maximizing horizontal force vector transfer, drive phase accelerations, and rapid ground contact times.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop",
    badge: "Acceleration & Top Speed"
  },
  {
    id: 4,
    title: "Volleyball Hitters & Blockers",
    sport: "Volleyball",
    description: "Optimizing penultimate steps, arm swing kinetic chains, and explosive spike reach over the net.",
    image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1200&auto=format&fit=crop",
    badge: "Spike Reach & Landing Safety"
  }
];

export default function TrainingPage() {
  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play timer for slide transitions
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  // "Who Is This For" Data
  const targetAudience = [
    {
      title: "Basketball Players",
      desc: "Athletes aiming to throw down their first dunk, gain rim height, and improve explosive first-step quickness.",
      tag: "Court Performance"
    },
    {
      title: "Volleyball & Multi-Sport",
      desc: "Hitters and jumpers wanting higher spike reach, faster reaction times, and safer landing mechanics.",
      tag: "Vertical Reach"
    },
    {
      title: "Track & Field Jumpers",
      desc: "High jumpers, long jumpers, and sprinters seeking faster approach velocity and reactive ground response.",
      tag: "Track & Field"
    },
    {
      title: "Athletes Rebuilding Power",
      desc: "Players looking to fix knee pain (patellar tendonitis), strengthen tendons, and build durable joint resilience.",
      tag: "Durability & Recovery"
    }
  ];

  // System Methodology Pillars
  const pillars = [
    {
      title: "Vertical Jump System",
      focus: "Tendon Stiffness & Force Vectoring",
      description: "Dedicated protocols targeting rate of force development (RFD), ankle stiffness, and penultimate step speed.",
      specs: "3 Days / Week • 45 Mins • Plyo & Barbell"
    },
    {
      title: "Absolute Power & Strength",
      focus: "Lower Body Output & Velocity",
      description: "Focuses on heavy compound movements, trap-bar deadlifts, squat variations, and ballistic velocity power.",
      specs: "2-3 Days / Week • 60 Mins • Free Weights"
    },
    {
      title: "Plyometric Elasticity",
      focus: "Ground Contact Time Reduction",
      description: "Shock jumps, depth drops, and reactive bounding routines designed to increase elastic recoil energy.",
      specs: "2 Days / Week • 30 Mins • Bodyweight & Boxes"
    },
    {
      title: "Speed & Acceleration",
      focus: "Sprint Kinematics & Mechanics",
      description: "First-step drive mechanics, wall acceleration drills, and sprint posture for rapid multidirectional speed.",
      specs: "2 Days / Week • 40 Mins • Turf / Track"
    }
  ];

  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans antialiased">
      <Navbar />

      {/* Header Banner */}
      <section className="pt-36 pb-16 px-6 lg:px-12 max-w-7xl mx-auto w-full text-center">
        <p className="text-red-600 font-mono text-xs uppercase tracking-widest mb-3">
          High Performance Architecture
        </p>
        <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight">
          The Training System
        </h1>
        <p className="mt-4 text-neutral-400 font-mono text-sm max-w-2xl mx-auto leading-relaxed">
          Scientific, ground-based performance protocols tailored for explosive output, vertical displacement, and athletic longevity.
        </p>
      </section>

      {/* Section 1: Multi-Sport Interactive Photo Carousel */}
      <section className="py-12 bg-black border-t border-neutral-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <p className="text-red-600 font-mono text-xs uppercase tracking-widest mb-1">
                Field & Court Discipline
              </p>
              <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight">
                Built For High Performers
              </h2>
            </div>
            <p className="text-neutral-400 font-mono text-xs max-w-md">
              Explosive athletic development transfers seamlessly across basketball, track & field, and volleyball.
            </p>
          </div>

          {/* Carousel Viewport */}
          <div className="relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 h-[400px] md:h-[500px] group">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center filter brightness-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20 flex flex-col items-start space-y-2">
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

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-red-600 text-white p-3 rounded-full backdrop-blur-md border border-neutral-700 hover:border-red-600 transition-all"
              aria-label="Previous Slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-red-600 text-white p-3 rounded-full backdrop-blur-md border border-neutral-700 hover:border-red-600 transition-all"
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
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    idx === currentSlide ? 'w-8 bg-red-600' : 'w-2 bg-neutral-600 hover:bg-white'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Section 2: Who Is This For? */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto w-full border-t border-neutral-900">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-red-600 font-mono text-xs uppercase tracking-widest mb-2">
            Pre-Qualification
          </p>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
            Who Is This System Built For?
          </h2>
          <p className="mt-4 text-neutral-400 font-mono text-xs md:text-sm">
            Sri Lanka Dunks is built for dedicated athletes seeking measurable physical outputs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {targetAudience.map((item, idx) => (
            <div 
              key={idx} 
              className="border border-neutral-800 bg-neutral-950 p-6 rounded hover:border-red-600/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="text-red-600 font-mono text-[10px] uppercase tracking-widest block mb-3 font-bold">
                  {item.tag}
                </span>
                <h3 className="text-lg font-bold uppercase tracking-wide text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-neutral-400 font-mono text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Training System Protocols */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto w-full border-t border-neutral-900">
        <div className="mb-12">
          <p className="text-red-600 font-mono text-xs uppercase tracking-widest mb-2">
            System Pillars
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight">
            Core Training Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, idx) => (
            <div 
              key={idx}
              className="border border-neutral-800 bg-neutral-950/80 p-8 rounded hover:border-red-600/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <p className="text-red-600 font-mono text-xs uppercase tracking-widest font-semibold mb-1">
                  {pillar.focus}
                </p>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-4">
                  {pillar.title}
                </h3>
                <p className="text-neutral-400 font-mono text-xs leading-relaxed mb-6">
                  {pillar.description}
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-900 text-neutral-500 font-mono text-[11px] uppercase tracking-wider flex items-center justify-between">
                <span>{pillar.specs}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Free Workout Incentive Callout */}
      <section className="py-16 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="border border-red-600/40 bg-gradient-to-r from-red-950/30 via-neutral-950 to-neutral-950 p-8 md:p-12 rounded-xl flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-2xl space-y-3">
            <span className="bg-red-600/20 text-red-500 font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded border border-red-600/30 font-bold inline-block">
              Free Baseline Protocol
            </span>
            <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
              Take The Jump Test & Unlock Your Free 7-Day Routine
            </h3>
            <p className="text-neutral-400 font-mono text-xs leading-relaxed">
              Submit your vertical jump test results to get instant access to a targeted 7-day workout routine built to prime your ankles, hips, and tendons for immediate launch improvement.
            </p>
          </div>

          <div className="shrink-0 w-full lg:w-auto">
            <Link
              href="/vertical-jump-test"
              className="block bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest px-8 py-4 rounded font-bold text-center transition-all hover:scale-105"
            >
              Take Jump Test & Claim Free Routine →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}