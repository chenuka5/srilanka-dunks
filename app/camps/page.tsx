import React from 'react';
import Button from '@/components/ui/Button';

export default function CampsPage() {
  return (
    <div className="min-h-screen bg-brand-black">
      <header className="pt-32 pb-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 text-white uppercase leading-none">
            Vertical Jump <br /><span className="text-brand-gold">Camps.</span>
          </h1>
          <p className="text-brand-gray-400 text-lg uppercase tracking-widest font-bold">
            The standard for physical athletic testing in Sri Lanka.
          </p>
        </div>
      </header>

      <section className="py-12 px-6 border-y border-brand-gray-900 bg-brand-surface">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="border border-brand-gray-900 p-8 hover:border-brand-gold transition-colors">
            <h2 className="text-4xl font-black text-white mb-2 tracking-tighter">2025 CAMP</h2>
            <p className="text-brand-crimson font-bold uppercase tracking-widest text-sm mb-6">Completed</p>
            <p className="text-brand-gray-400 text-sm leading-relaxed mb-8">
              Building on the foundation. More athletes, higher jumps, and the introduction of advanced force-velocity profiling.
            </p>
            <div className="w-full aspect-video bg-brand-black border border-brand-gray-800 flex items-center justify-center">
              <span className="text-brand-gray-800 font-bold uppercase tracking-widest text-xs">[ 2025 Media Placeholder ]</span>
            </div>
          </div>

          <div className="border border-brand-gray-900 p-8 hover:border-brand-gold transition-colors">
            <h2 className="text-4xl font-black text-white mb-2 tracking-tighter">2024 CAMP</h2>
            <p className="text-brand-gray-400 font-bold uppercase tracking-widest text-sm mb-6">The Beginning</p>
            <p className="text-brand-gray-400 text-sm leading-relaxed mb-8">
              The inaugural Sri Lanka Dunks physical camp. We set out to prove there was a demand for structured vertical jump training.
            </p>
            <div className="w-full aspect-video bg-brand-black border border-brand-gray-800 flex items-center justify-center">
              <span className="text-brand-gray-800 font-bold uppercase tracking-widest text-xs">[ 2024 Media Placeholder ]</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6">
            The Next Camp
          </h2>
          <p className="text-brand-gray-400 text-lg mb-10">
            Spots for our physical camps are strictly limited. Join the waitlist to get priority registration before it opens to the public.
          </p>
          <Button href="/contact" variant="outline">Join The Waitlist →</Button>
        </div>
      </section>
    </div>
  );
}