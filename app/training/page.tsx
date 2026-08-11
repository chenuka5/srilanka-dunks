import React from 'react';
import Button from '@/components/ui/Button';

export default function TrainingPage() {
  const trainingPillars = [
    { title: 'Vertical Jump', desc: 'Jump mechanics, elasticity, and explosive intent.' },
    { title: 'Strength', desc: 'Force production and maximal athletic strength.' },
    { title: 'Plyometrics', desc: 'Reactivity, tendon stiffness, and the shock method.' },
    { title: 'Explosiveness', desc: 'Rate of force development and first-step quickness.' },
  ];

  return (
    <div className="min-h-screen bg-brand-black">
      <header className="pt-32 pb-24 px-6 border-b border-brand-gray-900 bg-brand-surface text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 text-white uppercase leading-none">
            Train With <br /><span className="text-brand-crimson">Purpose.</span>
          </h1>
          <p className="text-brand-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            We don't do random workouts. Every session is engineered to increase force production, elasticity, and overall athletic dominance.
          </p>
        </div>
      </header>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
              The Four Pillars
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trainingPillars.map((pillar, index) => (
              <div key={index} className="bg-brand-surface p-10 border border-brand-gray-900 hover:border-brand-crimson transition-all duration-300 group cursor-pointer">
                <h3 className="text-3xl font-black text-brand-gray-400 group-hover:text-white uppercase tracking-tighter mb-4 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-brand-gray-400 text-sm uppercase tracking-widest font-bold">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-brand-crimson">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">
            Ready to start?
          </h2>
          <p className="text-white text-lg font-bold uppercase tracking-widest mb-10">
            Get the free 4-week foundation block.
          </p>
          <Button href="/join" variant="secondary">Unlock Free Program</Button>
        </div>
      </section>
    </div>
  );
}