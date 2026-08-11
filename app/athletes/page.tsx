import React from 'react';
import Button from '@/components/ui/Button';

export default function AthletesPage() {
  // Placeholder data for Phase 1
  const athletes = [
    { name: 'Athlete 01', sport: 'Basketball', vertical: '38"', status: 'Elite' },
    { name: 'Athlete 02', sport: 'High Jump', vertical: '36"', status: 'Advanced' },
    { name: 'Athlete 03', sport: 'Volleyball', vertical: '34"', status: 'Advanced' },
    { name: 'Athlete 04', sport: 'Basketball', vertical: '32"', status: 'Intermediate' },
  ];

  return (
    <div className="min-h-screen bg-brand-black">
      <header className="pt-32 pb-16 px-6 text-center border-b border-brand-gray-900 bg-brand-surface">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-white uppercase">
            The <span className="text-brand-crimson">Roster.</span>
          </h1>
          <p className="text-brand-gray-400 text-lg uppercase tracking-widest font-bold">
            Sri Lanka's most explosive athletes.
          </p>
        </div>
      </header>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {athletes.map((athlete, i) => (
              <div key={i} className="bg-brand-surface border border-brand-gray-900 group hover:border-brand-crimson transition-colors cursor-pointer">
                {/* Image Placeholder */}
                <div className="aspect-[4/5] bg-brand-black border-b border-brand-gray-900 flex items-center justify-center">
                  <span className="text-brand-gray-800 font-bold uppercase tracking-widest text-xs">[ Photo ]</span>
                </div>
                {/* Athlete Details */}
                <div className="p-6">
                  <p className="text-brand-crimson text-xs font-black uppercase tracking-widest mb-1">{athlete.status}</p>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">{athlete.name}</h3>
                  <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-brand-gray-400">
                    <span>{athlete.sport}</span>
                    <span className="text-white">{athlete.vertical}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button href="/join" variant="outline">Join The Leaderboard</Button>
          </div>
        </div>
      </section>
    </div>
  );
}