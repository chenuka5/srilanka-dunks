'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: 'Training', href: '/training' },
    { name: 'About', href: '/about' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'Jump Test', href: '/vertical-jump-test' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[99999] bg-brand-black/95 border-b border-brand-gray-900 h-20">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center relative">
        
        {/* Logo - Pinned Left */}
        <a href="/" className="flex items-center gap-2 cursor-pointer select-none relative z-[100000]">
          <div className="w-8 h-8 flex-shrink-0 bg-brand-crimson rounded-sm flex items-center justify-center font-heading font-bold text-white leading-none">
            SD
          </div>
          <span className="font-heading font-bold text-lg sm:text-xl tracking-widest uppercase text-white">
            Sri Lanka Dunks
          </span>
        </a>

        {/* Desktop Links - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-8 ml-auto mr-8">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                pathname === link.href ? 'text-brand-crimson' : 'text-brand-gray-400 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-bold uppercase tracking-widest text-brand-gray-400 hover:text-white transition-colors">
            Login
          </Link>
          <Link href="/join" className="px-5 py-2 bg-brand-crimson text-white text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-brand-black transition-colors">
            Join
          </Link>
        </div>

        {/* Mobile Button - Ripped out of flex flow, absolute pinned to right side, massive tap target */}
        <button 
          className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-[100000] p-4 text-white cursor-pointer touch-manipulation pointer-events-auto"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <div className={`w-7 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : 'mb-1.5'}`}></div>
          <div className={`w-7 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : 'mb-1.5'}`}></div>
          <div className={`w-7 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-brand-surface border-b border-brand-gray-900 flex flex-col p-6 gap-6 shadow-2xl z-[99990]">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-heading tracking-widest uppercase text-white py-2"
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-brand-gray-800 w-full my-2"></div>
          <Link href="/login" onClick={() => setIsOpen(false)} className="text-lg font-heading tracking-widest uppercase text-brand-gray-400 py-2">Login</Link>
          <Link href="/join" onClick={() => setIsOpen(false)} className="text-lg font-heading tracking-widest uppercase text-brand-crimson py-2">Join Platform</Link>
        </div>
      )}
    </nav>
  );
}