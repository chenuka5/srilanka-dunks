import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

export default function TrainingPage() {
  const pillars = [
    {
      title: 'Force Production',
      subtitle: 'Maximum Strength Base',
      desc: 'You cannot shoot a cannon from a canoe. Absolute strength is the prerequisite for explosive power. We focus on heavy, bilateral lower-body movements to build a structural foundation capable of producing massive ground reaction forces.',
      metrics: ['Squat variations', 'Deadlifts', 'Core stability']
    },
    {
      title: 'Rate of Force Development',
      subtitle: 'Velocity & Power',
      desc: 'Having a massive engine means nothing if you cannot rev it quickly. RFD is how fast you can access your strength. Jumpers need to generate peak force in less than 200 milliseconds. We train this through Olympic variations and weighted jumps.',
      metrics: ['Loaded jumps', 'Dynamic effort', 'Med ball throws']
    },
    {
      title: 'Elasticity & Plyometrics',
      subtitle: 'The Stretch-Shortening Cycle',
      desc: 'Tendons are springs. We train the Achilles and patellar tendons to absorb, store, and release kinetic energy rapidly. This is what separates a "muscle jumper" from a fluid, effortless, bouncy athlete.',
      metrics: ['Depth jumps', 'Pogo hops', 'Extensive plyos']
    },
    {
      title: 'Jump Biomechanics',
      subtitle: 'Movement Efficiency',
      desc: 'Raw power must be channeled efficiently. We break down the penultimate step, arm swing mechanics, block foot placement, and torso angle to ensure zero energy is leaked during your approach.',
      metrics: ['Approach technique', 'Arm block', 'Penultimate step']
    }
  ];

  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans antialiased selection:bg-red-600 selection:text-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-6 border-b border-neutral-900 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-red-600 font-mono text-xs uppercase tracking-widest font-bold">
            The Methodology
          </p>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none">
            The Science of <br />
            <span className="text-white">Flight.</span>
          </h1>
          <p className="text-neutral-400 font-mono text-sm max-w-xl mx-auto leading-relaxed">
            We don't use gimmicks or magic shoes. We use physics, biomechanics, and progressive overload to build dominant athletes.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-neutral-950 flex-grow">
        <div className="max-w-5xl mx-auto space-y-24">
          
          {/* THE PILLARS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, index) => (
              <div key={index} className="bg-black border border-neutral-800 p-8 rounded hover:border-red-600 transition-colors group">
                <div className="mb-6">
                  <span className="text-red-600 font-mono text-xs uppercase tracking-widest font-bold block mb-2">
                    0{index + 1} // {pillar.subtitle}
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-white group-hover:text-red-500 transition-colors">
                    {pillar.title}
                  </h2>
                </div>
                
                <p className="text-neutral-400 font-mono text-sm leading-relaxed mb-8">
                  {pillar.desc}
                </p>

                <div className="pt-6 border-t border-neutral-900">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-600 mb-3">Key Modalities:</h3>
                  <div className="flex flex-wrap gap-2">
                    {pillar.metrics.map((metric, idx) => (
                      <span key={idx} className="bg-neutral-900 text-neutral-300 font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded">
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* WHO IS IT FOR SECTION */}
          <div className="pt-24 border-t border-neutral-900">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-sm font-mono text-red-600 uppercase tracking-widest font-bold">The Target</h2>
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">Who is this for?</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-black border border-neutral-800 p-8 rounded hover:bg-neutral-900 transition-colors">
                <h4 className="text-xl font-bold uppercase tracking-tight text-white mb-2">Court Athletes</h4>
                <p className="text-neutral-400 font-mono text-sm leading-relaxed">Basketball and volleyball players looking to play above the rim, increase their block radius, and dominate the airspace.</p>
              </div>
              <div className="bg-black border border-neutral-800 p-8 rounded hover:bg-neutral-900 transition-colors">
                <h4 className="text-xl font-bold uppercase tracking-tight text-white mb-2">Field Athletes</h4>
                <p className="text-neutral-400 font-mono text-sm leading-relaxed">Rugby and football players needing explosive first-step acceleration, higher top-end speed, and raw power for contact.</p>
              </div>
              <div className="bg-black border border-neutral-800 p-8 rounded hover:bg-neutral-900 transition-colors">
                <h4 className="text-xl font-bold uppercase tracking-tight text-white mb-2">Track & Field</h4>
                <p className="text-neutral-400 font-mono text-sm leading-relaxed">High jumpers, long jumpers, and sprinters seeking to optimize their force application and stretch-shortening cycle.</p>
              </div>
              <div className="bg-black border border-neutral-800 p-8 rounded hover:bg-neutral-900 transition-colors">
                <h4 className="text-xl font-bold uppercase tracking-tight text-white mb-2">Everyday Competitors</h4>
                <p className="text-neutral-400 font-mono text-sm leading-relaxed">Anyone tired of feeling heavy on their feet. If your goal is to build structural resilience and effortless bounce, this is for you.</p>
              </div>
            </div>
          </div>

          {/* CTA SECTION */}
          <div className="text-center pt-24 border-t border-neutral-900 space-y-8">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              Ready to execute?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/free-program" 
                className="bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest px-8 py-4 rounded font-bold transition-all shadow-lg shadow-red-600/20"
              >
                Get The Starter Program →
              </Link>
              <Link 
                href="/vertical-jump-test" 
                className="bg-transparent border border-neutral-700 hover:border-white text-white font-mono text-xs uppercase tracking-widest px-8 py-4 rounded font-bold transition-all hover:bg-white hover:text-black"
              >
                Calculate Your Baseline
              </Link>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}