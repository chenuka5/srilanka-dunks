import React from 'react';
import Button from '@/components/ui/Button';

export default function HomePage() {
  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-brand-gray-900">
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent z-10" />
          <div className="w-full h-full opacity-50 bg-[url('https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop')] bg-cover bg-center" />
        </div>

        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto mt-20">
          <h1 className="text-6xl md:text-9xl font-black text-brand-white tracking-tighter leading-[0.85] mb-6 text-shadow-hero">
            RISE<br />ABOVE.
          </h1>
          <p className="text-lg md:text-xl text-brand-gray-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            Modern athletic performance training for the next generation of Sri Lankan athletes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/start-here" variant="primary">Start Your Journey →</Button>
            <Button href="/vertical-jump-test" variant="outline">Take The Jump Test →</Button>
          </div>
        </div>
      </section>

      {/* 2. BRAND STATEMENT */}
      <section className="py-32 bg-brand-black px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black leading-tight text-white mb-6">
            THE GOAL WAS NEVER <span className="text-brand-crimson">JUST TO DUNK.</span>
            <br />IT WAS TO BUILD <span className="text-brand-gold">BETTER ATHLETES.</span>
          </h2>
        </div>
      </section>

      {/* 3. JOURNEY / TIMELINE */}
      <section className="py-24 bg-brand-surface border-y border-brand-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="border-l-2 border-brand-gray-800 pl-6 hover:border-brand-crimson transition-colors duration-500">
              <h3 className="text-4xl font-black text-brand-gray-400 mb-2">2024</h3>
              <p className="text-xl font-bold uppercase tracking-widest text-white mb-4">The Beginning</p>
              <p className="text-brand-gray-400 text-sm leading-relaxed">The first major physical Vertical Jump Camp held in Sri Lanka, proving the demand for modern training.</p>
            </div>
            <div className="border-l-2 border-brand-gray-800 pl-6 hover:border-brand-crimson transition-colors duration-500">
              <h3 className="text-4xl font-black text-brand-gray-400 mb-2">2025</h3>
              <p className="text-xl font-bold uppercase tracking-widest text-white mb-4">The Next Level</p>
              <p className="text-brand-gray-400 text-sm leading-relaxed">Expanding the camps and laying the foundation for a comprehensive digital performance platform.</p>
            </div>
            <div className="border-l-2 border-brand-gold pl-6">
              <h3 className="text-4xl font-black text-brand-gold mb-2">2026+</h3>
              <p className="text-xl font-bold uppercase tracking-widest text-white mb-4">The Movement</p>
              <p className="text-brand-gray-400 text-sm leading-relaxed">Building Sri Lanka's leading athletic performance community and digital ecosystem.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BUILT FOR PERFORMANCE */}
      <section className="py-32 bg-brand-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter">BUILT FOR<br />PERFORMANCE.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-4">
            {['Vertical Jump', 'Strength', 'Power', 'Plyometrics', 'Speed', 'Athlete Development'].map((item, i) => (
              <div key={i} className="bg-brand-surface aspect-square flex items-end p-6 border border-brand-gray-900 hover:border-brand-crimson transition-colors group">
                <h3 className="text-lg md:text-2xl font-bold uppercase tracking-widest text-brand-gray-400 group-hover:text-white transition-colors">
                  {item}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PHILOSOPHY */}
      <section className="py-32 bg-brand-crimson text-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-7xl font-black leading-none mb-8 tracking-tighter text-white">
            NO SHORTCUTS.<br />NO MAGIC FORMULA.<br />JUST BETTER TRAINING.
          </h2>
          <Button href="/training" variant="secondary">Explore The Science</Button>
        </div>
      </section>
    </>
  );
}