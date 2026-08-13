import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans antialiased selection:bg-red-600 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 border-b border-neutral-900">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-red-600 font-mono text-xs uppercase tracking-widest font-bold">
            The Origin
          </p>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none">
            Sri Lankan Roots.<br />
            <span className="text-neutral-500">Global Performance.</span>
          </h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6 bg-neutral-950">
        <div className="max-w-3xl mx-auto space-y-20">
          
          {/* Athlete -> Coach -> Founder */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tight text-white border-l-4 border-red-600 pl-4">
              Athlete → Coach → Founder
            </h2>
            <div className="space-y-4 text-neutral-300 font-mono text-sm leading-relaxed">
              <p>
                Sri Lanka Dunks was born out of a distinct gap in athletic development. Currently based in Australia, our founder recognized that while Sri Lanka possesses immense natural athletic talent, the access to modern, science-backed performance training—specifically in vertical jump biomechanics and explosive power—was missing.
              </p>
              <p>
                The journey started on the court as an athlete, transitioned into the science of coaching, and ultimately evolved into founding a dedicated platform. We exist to bring world-class athletic performance systems back to our roots.
              </p>
            </div>
          </div>

          {/* 2024 & 2025 Camps */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tight text-white border-l-4 border-neutral-700 pl-4">
              The Physical Movement
            </h2>
            <div className="space-y-4 text-neutral-300 font-mono text-sm leading-relaxed">
              <p>
                In <strong className="text-white">2024</strong>, Sri Lanka Dunks moved from a concept to reality, hosting our inaugural Vertical Jump Camp in Sri Lanka. It was the first step in proving the demand for high-intent, specialized performance training.
              </p>
              <p>
                We returned in <strong className="text-white">2025</strong> to elevate the standard, running a second successful camp that expanded our reach and solidified our training methodologies with a new wave of dedicated athletes.
              </p>
            </div>
          </div>

          {/* The Vision */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tight text-white border-l-4 border-gold-500 border-yellow-500 pl-4">
              The Long-Term Vision
            </h2>
            <div className="space-y-4 text-neutral-300 font-mono text-sm leading-relaxed">
              <p>
                We are building more than just a training program. Our vision is to cultivate Sri Lanka's leading athletic performance community—becoming the undisputed home of vertical jump development and explosive performance for Sri Lankan athletes worldwide.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="pt-12 border-t border-neutral-900 text-center">
            <Link 
              href="/join" 
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest px-8 py-4 rounded font-bold transition-all shadow-lg shadow-red-600/20 hover:scale-105"
            >
              Join The Community →
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}