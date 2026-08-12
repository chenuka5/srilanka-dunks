import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Temporary Placeholder Hero to see the layout - We will build the real one in Phase 2 */}
      <div className="flex-grow flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center">
        <p className="text-red-600 font-mono text-sm uppercase tracking-widest mb-4">
          Sri Lanka Dunks
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tight mb-8">
          Public Website <br/> <span className="text-neutral-500">Coming Soon</span>
        </h1>
        <Link 
          href="/dashboard"
          className="border border-neutral-700 hover:border-white text-white font-mono uppercase tracking-widest text-sm px-8 py-4 rounded transition-all"
        >
          Go to Athlete Dashboard →
        </Link>
      </div>

      <Footer />
    </main>
  );
}