import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-neutral-900 py-16 px-6 lg:px-12 text-neutral-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Column */}
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Sri Lanka Dunks Logo" 
              className="h-8 w-auto object-contain"
            />
            <span className="text-white font-black uppercase text-base tracking-tight">
              Sri Lanka Dunks
            </span>
          </div>
          <p className="text-neutral-500 max-w-sm leading-relaxed">
            The premier high-performance athletic and vertical jump development platform for Sri Lankan athletes worldwide.
          </p>
        </div>

        {/* Navigation Column */}
        <div>
          <p className="text-white font-bold uppercase mb-4 tracking-widest">Platform</p>
          <ul className="space-y-2">
            <li><Link href="/training" className="hover:text-white transition-colors">Programs</Link></li>
            <li><Link href="/camps" className="hover:text-white transition-colors">Camps & Clinics</Link></li>
            <li><Link href="/vertical-jump-test" className="hover:text-white transition-colors">Vertical Jump Test</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About Founder</Link></li>
          </ul>
        </div>

        {/* Portal Column */}
        <div>
          <p className="text-white font-bold uppercase mb-4 tracking-widest">Access</p>
          <ul className="space-y-2">
            <li><Link href="/login" className="hover:text-white transition-colors">Athlete Login</Link></li>
            <li><Link href="/signup" className="hover:text-white transition-colors">Register Account</Link></li>
            <li><Link href="/join" className="hover:text-white transition-colors">Join Movement</Link></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4 text-neutral-600">
        <p>© {new Date().getFullYear()} SRI LANKA DUNKS. ALL RIGHTS RESERVED.</p>
        <p>BUILT FOR ELITE PERFORMANCE</p>
      </div>
    </footer>
  );
}