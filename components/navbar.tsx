import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-neutral-800 px-6 lg:px-12 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo Link */}
        <Link href="/" className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="Sri Lanka Dunks Logo" 
            className="h-10 w-auto object-contain"
          />
          <span className="font-extrabold uppercase tracking-tighter text-lg text-white">
            Sri Lanka Dunks
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-neutral-400">
          <Link href="/training" className="hover:text-red-600 transition-colors">Training</Link>
          <Link href="/camps" className="hover:text-red-600 transition-colors">Camps</Link>
          <Link href="/athletes" className="hover:text-red-600 transition-colors">Athletes</Link>
          <Link href="/vertical-jump-test" className="hover:text-red-600 transition-colors">Jump Test</Link>
          <Link href="/about" className="hover:text-red-600 transition-colors">About</Link>
        </div>

        {/* Action Button */}
        <div>
          <Link 
            href="/join" 
            className="bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest px-5 py-2.5 rounded transition-colors"
          >
            Join Now
          </Link>
        </div>

      </div>
    </nav>
  );
}