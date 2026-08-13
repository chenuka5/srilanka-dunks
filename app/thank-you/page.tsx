import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <main className="min-h-screen flex flex-col bg-black text-white font-sans antialiased">
      <Navbar />

      <section className="flex-grow flex items-center justify-center pt-20 px-6">
        <div className="max-w-2xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          
          <div className="w-20 h-20 mx-auto bg-green-500/10 border border-green-500 rounded-full flex items-center justify-center mb-8">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
            You're <span className="text-red-600">In.</span>
          </h1>
          
          <div className="space-y-4 text-neutral-400 font-mono text-sm md:text-base leading-relaxed p-8 border border-neutral-900 bg-neutral-950 rounded">
            <p>Your request has been successfully received.</p>
            <p>We will be sending the details to your provided contact information shortly. Welcome to the Sri Lanka Dunks community.</p>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/" 
              className="bg-transparent border border-neutral-700 hover:border-white text-white font-mono text-xs uppercase tracking-widest px-8 py-4 rounded font-bold transition-all hover:bg-white hover:text-black"
            >
              Return Home
            </Link>
            <Link 
              href="/leaderboard" 
              className="bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest px-8 py-4 rounded font-bold transition-all shadow-lg shadow-red-600/20"
            >
              View Leaderboard →
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}