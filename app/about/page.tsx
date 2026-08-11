import React from 'react';
import Button from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-black">
      <header className="pt-32 pb-16 px-6 border-b border-brand-gray-900 bg-brand-surface">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white">ORIGIN STORY</h1>
          <p className="text-brand-gray-400 text-lg uppercase tracking-widest font-bold">
            Sri Lankan Roots. Global Performance.
          </p>
        </div>
      </header>

      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-brand-gray-400 leading-relaxed space-y-8 text-lg">
          <p>
            <strong className="text-white">Sri Lanka Dunks</strong> was founded in June 2024 to solve a simple problem: there was a massive gap in Sri Lanka for modern, structured athletic performance and vertical jump training.
          </p>
          <p>
            The founder, an athlete with a strong background in high jump and basketball, relocated to Australia but saw the immense, untapped physical potential back home.
          </p>
          <blockquote className="border-l-4 border-brand-crimson pl-6 py-2 text-white font-heading text-2xl uppercase italic my-12">
            "The goal isn't simply to make people dunk. The goal is to create better athletes."
          </blockquote>
          <p>
            Potential is not fixed. Training should have a purpose, and athletes should understand why they train. Long-term development matters over quick fixes.
          </p>
          <div className="pt-12 flex justify-center">
             <Button href="/contact" variant="outline">Contact Us</Button>
          </div>
        </div>
      </section>
    </div>
  );
}