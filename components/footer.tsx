import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-neutral-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-red-600 text-white font-bold font-mono px-2 py-1 text-sm tracking-wider">
                SD
              </div>
              <span className="font-extrabold tracking-tight uppercase text-lg">
                Sri Lanka Dunks
              </span>
            </Link>
            <p className="text-neutral-500 text-sm max-w-sm">
              Modern athletic performance training for the next generation of Sri Lankan athletes. The goal was never just to dunk. It was to build better athletes.
            </p>
          </div>

          <div>
            <h4 className="text-white font-mono text-xs uppercase tracking-widest mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li><Link href="/training" className="hover:text-red-500 transition-colors">Training</Link></li>
              <li><Link href="/camps" className="hover:text-red-500 transition-colors">Camps</Link></li>
              <li><Link href="/athletes" className="hover:text-red-500 transition-colors">Athletes</Link></li>
              <li><Link href="/leaderboard" className="hover:text-red-500 transition-colors">Leaderboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-mono text-xs uppercase tracking-widest mb-6">Connect</h4>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li><Link href="/join" className="hover:text-red-500 transition-colors">Join Community</Link></li>
              <li><Link href="/contact" className="hover:text-red-500 transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-red-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-red-500 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-600 font-mono">
          <p>© {new Date().getFullYear()} Sri Lanka Dunks. All rights reserved.</p>
          <p>RISE ABOVE.</p>
        </div>
      </div>
    </footer>
  );
}