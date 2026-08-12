import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import BrandImage from '@/components/brand-image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2980&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-luminosity"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center flex flex-col items-center">
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-extrabold uppercase tracking-tighter leading-none mb-6">
            Rise <br className="md:hidden" /> Above.
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl font-light mb-12">
            Modern athletic performance training for the next generation of Sri Lankan athletes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              href="/vertical-jump-test"
              className="bg-red-600 hover:bg-red-700 text-white font-bold font-mono uppercase tracking-widest text-sm px-8 py-4 rounded transition-colors text-center"
            >
              Take the Vertical Jump Test →
            </Link>
            <Link 
              href="/join"
              className="border border-neutral-700 hover:border-white text-white font-mono uppercase tracking-widest text-sm px-8 py-4 rounded transition-all text-center"
            >
              Join the Movement →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE GOAL */}
      <section className="py-24 md:py-32 bg-black border-t border-neutral-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight mb-6">
            The goal was never just to dunk.
            <br />
            <span className="text-red-600">It was to build better athletes.</span>
          </h2>
        </div>
      </section>

      {/* SECTION 3: OUR JOURNEY */}
      <section className="py-24 bg-neutral-950 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-red-600 font-mono text-sm uppercase tracking-widest mb-4">Our Story</p>
          <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-16">The Journey</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-neutral-800 p-8 rounded bg-black relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl font-black font-mono">01</div>
              <h3 className="text-2xl font-bold uppercase mb-2 text-white">2024</h3>
              <p className="text-red-500 font-mono text-xs uppercase tracking-widest mb-4">The Beginning</p>
              <p className="text-neutral-400">Sri Lanka Dunks launches and hosts its first Vertical Jump Camp, setting a new standard for athletic testing.</p>
            </div>
            
            <div className="border border-neutral-800 p-8 rounded bg-black relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl font-black font-mono">02</div>
              <h3 className="text-2xl font-bold uppercase mb-2 text-white">2025</h3>
              <p className="text-red-500 font-mono text-xs uppercase tracking-widest mb-4">The Next Level</p>
              <p className="text-neutral-400">Returning with another elite Vertical Jump Camp, expanding our reach and identifying the island's top talent.</p>
            </div>

            <div className="border border-neutral-800 p-8 rounded bg-black relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl font-black font-mono text-red-500">03</div>
              <h3 className="text-2xl font-bold uppercase mb-2 text-white">2026+</h3>
              <p className="text-yellow-500 font-mono text-xs uppercase tracking-widest mb-4">The Movement</p>
              <p className="text-neutral-400">Building an online athletic performance community and comprehensive future training ecosystem.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: BUILT FOR PERFORMANCE */}
      <section className="py-24 bg-black border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight">Built for Performance</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {['Vertical Jump', 'Strength', 'Power', 'Plyometrics', 'Speed', 'Athlete Development'].map((pillar, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-8 border border-neutral-900 rounded bg-neutral-950/50 hover:bg-neutral-900 transition-colors">
                <span className="text-red-600 mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </span>
                <h3 className="text-sm md:text-lg font-bold uppercase tracking-wide text-center">{pillar}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: THE PHILOSOPHY */}
      <section className="py-32 bg-red-950 border-t border-red-900 text-center px-6">
        <h2 className="text-3xl md:text-6xl font-extrabold uppercase tracking-tight mb-8 text-white leading-tight">
          No Shortcuts. <br />
          No Magic Formula. <br />
          <span className="text-red-500">Just Better Training.</span>
        </h2>
      </section>

      {/* SECTION 6: CAMPS */}
      <section className="py-24 bg-black border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <p className="text-red-600 font-mono text-sm uppercase tracking-widest mb-4">In Person</p>
              <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight">Training Camps</h2>
            </div>
            <Link href="/camps" className="text-neutral-400 hover:text-white font-mono uppercase tracking-widest text-xs border-b border-neutral-700 pb-1">
              View All Camps →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <BrandImage alt="2024 Camp Action Shot" className="aspect-[4/3] rounded" />
              <div>
                <h3 className="font-bold uppercase text-lg">2024 Vertical Camp</h3>
                <p className="text-neutral-500 text-sm font-mono mt-1">Completed</p>
              </div>
            </div>
            <div className="space-y-4">
              <BrandImage alt="2025 Camp Action Shot" className="aspect-[4/3] rounded" />
              <div>
                <h3 className="font-bold uppercase text-lg">2025 Vertical Camp</h3>
                <p className="text-neutral-500 text-sm font-mono mt-1">Completed</p>
              </div>
            </div>
            <div className="space-y-4 border border-neutral-800 p-6 rounded bg-neutral-950 flex flex-col justify-center items-center text-center aspect-[4/3] md:aspect-auto">
              <h3 className="font-bold uppercase text-xl text-yellow-500 mb-2">Upcoming Camp</h3>
              <p className="text-neutral-400 text-sm mb-6 max-w-[200px]">Join the waitlist for our next elite performance testing camp.</p>
              <Link href="/camps/upcoming" className="bg-white text-black hover:bg-neutral-200 font-bold font-mono uppercase tracking-widest text-xs px-6 py-3 rounded transition-colors">
                Join Waitlist
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: THE BIGGER VISION */}
      <section className="py-24 bg-neutral-900 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight mb-6">
            Sri Lanka has the talent.
          </h2>
          <p className="text-xl md:text-2xl text-neutral-400 font-light">
            We want to build the system around it.
          </p>
        </div>
      </section>

      {/* SECTION 8: JOIN THE MOVEMENT */}
      <section className="py-32 bg-black border-t border-neutral-900 text-center px-6">
        <h2 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tight mb-6">
          Join the <br className="md:hidden" /> Movement.
        </h2>
        <p className="text-neutral-400 text-lg mb-10">Don't just follow the journey. Be part of it.</p>
        <Link 
          href="/join"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold font-mono uppercase tracking-widest text-lg px-12 py-5 rounded transition-colors shadow-[0_0_40px_-10px_rgba(220,38,38,0.5)]"
        >
          Join Free →
        </Link>
      </section>

      <Footer />
    </main>
  );
}