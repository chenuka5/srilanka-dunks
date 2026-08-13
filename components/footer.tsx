import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-neutral-900 pt-20 pb-10 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        <div className="col-span-1 md:col-span-2 space-y-6">
          <Link href="/" className="font-black text-2xl tracking-tighter uppercase text-white inline-block">
            Sri Lanka <span className="text-red-600">Dunks.</span>
          </Link>
          <p className="text-neutral-500 font-mono text-xs leading-relaxed max-w-sm uppercase tracking-widest">
            Modern athletic performance training for the next generation of Sri Lankan athletes.
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="text-white font-bold uppercase tracking-tight">Platform</h4>
          <ul className="space-y-4 flex flex-col">
            <Link href="/start-here" className="text-neutral-500 hover:text-red-600 font-mono text-xs uppercase tracking-widest transition-colors">Start Here</Link>
            <Link href="/training" className="text-neutral-500 hover:text-red-600 font-mono text-xs uppercase tracking-widest transition-colors">Training Methodology</Link>
            <Link href="/leaderboard" className="text-neutral-500 hover:text-red-600 font-mono text-xs uppercase tracking-widest transition-colors">Public Leaderboard</Link>
            <Link href="/camps/upcoming" className="text-neutral-500 hover:text-red-600 font-mono text-xs uppercase tracking-widest transition-colors">Live Camps</Link>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-white font-bold uppercase tracking-tight">Connect</h4>
          <ul className="space-y-4 flex flex-col">
            <Link href="/community" className="text-neutral-500 hover:text-red-600 font-mono text-xs uppercase tracking-widest transition-colors">Join Community</Link>
            <Link href="/about" className="text-neutral-500 hover:text-red-600 font-mono text-xs uppercase tracking-widest transition-colors">Our Story</Link>
            <Link href="/contact" className="text-neutral-500 hover:text-red-600 font-mono text-xs uppercase tracking-widest transition-colors">Contact Us</Link>
            <Link href="/login" className="text-neutral-500 hover:text-red-600 font-mono text-xs uppercase tracking-widest transition-colors">Athlete Login</Link>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p className="text-neutral-600 font-mono text-[10px] uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Sri Lanka Dunks. All rights reserved.
        </p>
        <div className="flex gap-4">
          <span className="text-neutral-600 font-mono text-[10px] uppercase tracking-widest cursor-not-allowed">Privacy Policy</span>
          <span className="text-neutral-600 font-mono text-[10px] uppercase tracking-widest cursor-not-allowed">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}