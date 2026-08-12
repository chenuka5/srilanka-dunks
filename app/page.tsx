import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

export default function Home() {
  const pillars = [
    {
      title: "Vertical Jump",
      desc: "Tendon stiffness, rate of force development, and launch mechanics.",
      link: "/training"
    },
    {
      title: "Strength",
      desc: "Barbell velocity, peak force production, and lower-body output.",
      link: "/training"
    },
    {
      title: "Power",
      desc: "Explosive triple-extension and impulse optimization.",
      link: "/training"
    },
    {
      title: "Plyometrics",
      desc: "Elastic energy recoil, landing mechanics, and ground contact speed.",
      link: "/training"
    },
    {
      title: "Speed",
      desc: "Sprint acceleration, force vector transfer, and rapid foot strikes.",
      link: "/training"
    },
    {
      title: "Athlete Development",
      desc: "Injury mitigation, joint longevity, and biomechanical balance.",
      link: "/training"
    }
  ];

  return (
    <main className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 lg:px-12 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 via-transparent to-black pointer-events-none -z-10"></div>
        <p className="text-red-600 font-mono text-xs uppercase tracking-widest mb-4">
          The Premier Sri Lankan Performance System
        </p>
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tight max-w-5xl">
          Rise Above.
        </h1>
        <p className="mt-6 text-neutral-400 font-light text-base md:text-xl max-w-2xl leading-relaxed">
          Modern athletic performance training for the next generation of Sri Lankan athletes.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link 
            href="/vertical-jump-test"
            className="bg-red-600 hover:bg-red-700 text-white font-mono text-sm uppercase tracking-widest px-8 py-4 rounded font-bold transition-all hover:scale-105"
          >
            Take The Vertical Jump Test →
          </Link>
          <Link 
            href="/join"
            className="border border-neutral-800 hover:border-white text-white font-mono text-sm uppercase tracking-widest px-8 py-4 rounded font-bold transition-all hover:bg-white/5"
          >
            Join The Movement →
          </Link>
        </div>
      </section>

      {/* Pillars Section: Built For Performance */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full border-t border-neutral-900">
        <div className="text-center mb-16">
          <p className="text-red-600 font-mono text-xs uppercase tracking-widest mb-2">
            System Methodologies
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight">
            Built For Performance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <Link 
              key={idx}
              href={pillar.link}
              className="group border border-neutral-800 bg-neutral-950/60 p-8 rounded hover:border-red-600/80 hover:bg-neutral-900/80 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="text-red-600 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:translate-y-[-2px]">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wide text-white group-hover:text-red-500 transition-colors">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-neutral-400 font-mono text-xs leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-neutral-900 text-neutral-500 font-mono text-[10px] uppercase tracking-widest group-hover:text-white transition-colors flex items-center justify-between">
                <span>Explore Protocol</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/training"
            className="inline-block border border-red-600/50 hover:border-red-600 hover:bg-red-600/10 text-white font-mono text-xs uppercase tracking-widest px-8 py-4 rounded transition-all"
          >
            View Complete Training System →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}