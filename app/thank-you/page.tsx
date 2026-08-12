import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <main className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <div className="flex-grow pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center">
        <div className="bg-green-500/10 border border-green-500/20 text-green-500 font-mono text-sm uppercase tracking-widest px-4 py-2 rounded mb-8">
          Success
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tight mb-6">You're In.</h1>
        <p className="text-neutral-400 max-w-md mx-auto mb-12 text-lg">
          Your information has been received. Welcome to the Sri Lanka Dunks movement. We will be in touch with your next steps.
        </p>
        <Link 
          href="/"
          className="border border-neutral-700 hover:border-white text-white font-mono uppercase tracking-widest text-sm px-8 py-4 rounded transition-all"
        >
          ← Back to Home
        </Link>
      </div>
      <Footer />
    </main>
  );
}