import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-brand-surface border-t border-brand-gray-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-2xl font-black mb-4 text-white">SRI LANKA DUNKS</h2>
          <p className="text-brand-gray-400 text-sm mb-6 leading-relaxed">
            Sri Lankan Roots. Global Performance. Building the next generation of explosive athletes.
          </p>
        </div>

        <div>
          <h3 className="text-brand-white font-bold uppercase tracking-widest text-sm mb-6">Training</h3>
          <ul className="space-y-3 text-brand-gray-400 text-sm">
            <li><Link href="/training/vertical-jump" className="hover:text-brand-crimson transition-colors">Vertical Jump</Link></li>
            <li><Link href="/training/strength" className="hover:text-brand-crimson transition-colors">Strength</Link></li>
            <li><Link href="/training/plyometrics" className="hover:text-brand-crimson transition-colors">Plyometrics</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-brand-white font-bold uppercase tracking-widest text-sm mb-6">Platform</h3>
          <ul className="space-y-3 text-brand-gray-400 text-sm">
            <li><Link href="/camps" className="hover:text-brand-crimson transition-colors">Camps</Link></li>
            <li><Link href="/athletes" className="hover:text-brand-crimson transition-colors">Athletes</Link></li>
            <li><Link href="/vertical-jump-test" className="hover:text-brand-crimson transition-colors">Jump Calculator</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-brand-white font-bold uppercase tracking-widest text-sm mb-6">Connect</h3>
          <ul className="space-y-3 text-brand-gray-400 text-sm">
            <li><Link href="/about" className="hover:text-brand-crimson transition-colors">Our Story</Link></li>
            <li><Link href="/contact" className="hover:text-brand-crimson transition-colors">Contact</Link></li>
            <li><a href="#" className="hover:text-brand-crimson transition-colors">Instagram</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-brand-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-gray-400">
        <p>© {new Date().getFullYear()} Sri Lanka Dunks. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}