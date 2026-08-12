import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

export default function TrainingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-24 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="mb-16">
          <p className="text-red-600 font-mono text-sm uppercase tracking-widest mb-4">Methodology</p>
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">Our Training System</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          <Link href="/training/vertical-jump" className="border border-neutral-800 p-8 rounded hover:border-neutral-600 transition-colors group">
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-2 group-hover:text-red-500 transition-colors">Vertical Jump</h2>
            <p className="text-neutral-400 font-mono text-xs uppercase tracking-widest leading-relaxed">Jump mechanics, elasticity, and explosive intent.</p>
          </Link>
          
          <Link href="/training/strength" className="border border-neutral-800 p-8 rounded hover:border-neutral-600 transition-colors group">
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-2 group-hover:text-red-500 transition-colors">Strength</h2>
            <p className="text-neutral-400 font-mono text-xs uppercase tracking-widest leading-relaxed">Force production and maximal athletic strength.</p>
          </Link>
          
          <Link href="/training/plyometrics" className="border border-neutral-800 p-8 rounded hover:border-neutral-600 transition-colors group">
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-2 group-hover:text-red-500 transition-colors">Plyometrics</h2>
            <p className="text-neutral-400 font-mono text-xs uppercase tracking-widest leading-relaxed">Reactivity, tendon stiffness, and the shock method.</p>
          </Link>
          
          <Link href="/training/explosiveness" className="border border-neutral-800 p-8 rounded hover:border-neutral-600 transition-colors group">
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-2 group-hover:text-red-500 transition-colors">Explosiveness</h2>
            <p className="text-neutral-400 font-mono text-xs uppercase tracking-widest leading-relaxed">Rate of force development and first-step quickness.</p>
          </Link>
        </div>

        <div className="text-center py-16 border-t border-neutral-900">
          <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-4">Ready to Start?</h2>
          <p className="text-neutral-400 font-mono uppercase tracking-widest text-sm mb-10">Get the free 4-week foundation block.</p>
          
          <Link 
            href="/free-program"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold font-mono uppercase tracking-widest text-sm px-10 py-5 rounded transition-colors shadow-[0_0_30px_-10px_rgba(220,38,38,0.5)]"
          >
            Join Free Program →
          </Link>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}