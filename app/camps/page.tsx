import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

export default function CampsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />

      <section className="pt-40 pb-24 px-6 lg:px-12 max-w-5xl mx-auto w-full text-center flex-grow flex flex-col justify-center items-center">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/30 px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
          <span className="text-red-500 font-mono text-xs uppercase tracking-widest font-bold">
            2026 Special Update
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight">
          2026 Free Online Webinar
        </h1>

        {/* Subtitle / Notice */}
        <p className="mt-6 text-neutral-300 font-mono text-xs md:text-sm max-w-2xl leading-relaxed">
          Due to unavoidable circumstances, all physical in-person camps are suspended for this year. Instead, we are hosting an exclusive, <span className="text-red-500 font-bold">100% FREE 2026 Live Online Webinar</span> covering complete vertical jump biomechanics, strength programming, and explosive performance training.
        </p>

        {/* Webinar Details Card */}
        <div className="mt-10 w-full max-w-xl border border-neutral-800 bg-neutral-950 p-8 rounded-xl text-left space-y-4">
          <div className="flex justify-between items-center border-b border-neutral-900 pb-3 font-mono text-xs">
            <span className="text-neutral-500 uppercase tracking-widest">Format</span>
            <span className="text-white font-bold uppercase">Live Interactive Webinar</span>
          </div>
          <div className="flex justify-between items-center border-b border-neutral-900 pb-3 font-mono text-xs">
            <span className="text-neutral-500 uppercase tracking-widest">Year</span>
            <span className="text-white font-bold">2026 Season</span>
          </div>
          <div className="flex justify-between items-center border-b border-neutral-900 pb-3 font-mono text-xs">
            <span className="text-neutral-500 uppercase tracking-widest">Cost</span>
            <span className="text-red-500 font-bold uppercase">Free (100% Subsidized)</span>
          </div>
          <div className="flex justify-between items-center font-mono text-xs">
            <span className="text-neutral-500 uppercase tracking-widest">Access</span>
            <span className="text-white font-bold uppercase">Registration Waitlist Only</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-10">
          <Link
            href="/join"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-mono text-xs md:text-sm uppercase tracking-widest px-8 py-4 rounded font-bold transition-all hover:scale-105 shadow-lg shadow-red-600/20"
          >
            Join Free Webinar Waitlist →
          </Link>
        </div>

      </section>

      <Footer />
    </main>
  );
}