import React from 'react';
import Button from '@/components/ui/Button';

export default function ResourcesPage() {
  const articles = [
    { title: 'The Science of the Stretch-Shortening Cycle', category: 'Biomechanics' },
    { title: 'Why Heavy Squats Aren\'t Enough to Jump Higher', category: 'Training' },
    { title: 'Force-Velocity Profiling for Sri Lankan Athletes', category: 'Testing' },
  ];

  return (
    <div className="min-h-screen bg-brand-black">
      <header className="pt-32 pb-16 px-6 text-center border-b border-brand-gray-900">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-white uppercase">
            Knowledge <br />Base.
          </h1>
          <p className="text-brand-gray-400 text-lg uppercase tracking-widest font-bold">
            No secrets. Just science.
          </p>
        </div>
      </header>

      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {articles.map((article, i) => (
            <div key={i} className="bg-brand-surface p-8 border border-brand-gray-900 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-brand-crimson transition-colors group cursor-pointer">
              <div>
                <p className="text-brand-gray-400 text-xs font-black uppercase tracking-widest mb-2">{article.category}</p>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter group-hover:text-brand-crimson transition-colors">
                  {article.title}
                </h2>
              </div>
              <Button variant="outline" className="md:w-auto w-full whitespace-nowrap">Read Article</Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}