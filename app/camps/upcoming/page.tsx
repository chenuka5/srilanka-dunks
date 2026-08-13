import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

export default function UpcomingCampPage() {
  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans antialiased">
      <Navbar />

      <section className="pt-40 pb-32 px-6 flex-grow flex flex-col justify-center items-center text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <p className="text-red-600 font-mono text-xs uppercase tracking-widest font-bold">
            Sri Lanka Dunks
          </p>
          
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none">
            Next Vertical Jump Camp
          </h1>
          
          <div className="inline-block border border-neutral-800 bg-neutral-950 px-6 py-3 rounded text-neutral-300 font-mono text-sm uppercase tracking-widest">
            Coming Soon
          </div>

          <p className="text-neutral-400 font-mono text-xs md:text-sm max-w-xl mx-auto leading-relaxed pt-4">
            Details for our next live in-person training camp are currently being finalized. Join the priority waitlist to be notified the moment dates are announced.
          </p>

          <div className="pt-8">
            <Link 
              href="/join" 
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-mono text-xs md:text-sm uppercase tracking-widest px-10 py-5 rounded font-bold shadow-lg shadow-red-600/20 hover:scale-105 transition-all"
            >
              Join The Waitlist →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}