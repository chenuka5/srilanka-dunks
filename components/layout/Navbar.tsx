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
    <nav className="fixed top-0 left-0 w-full z-[99999] bg-black border-b border-neutral-900 h-20">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between relative">
        
        {/* Bulletproof Logo */}
        <Link href="/" className="flex items-center gap-3 relative z-[100000]">
          <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center font-bold text-white leading-none">
            SD
          </div>
          <span className="font-bold text-lg tracking-widest uppercase text-white">
            Sri Lanka Dunks
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 ml-auto mr-8">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                pathname === link.href ? 'text-red-600' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">
            Login
          </Link>
          <Link href="/join" className="px-5 py-2 bg-red-600 text-white text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors rounded">
            Join
          </Link>
        </div>

        {/* Unkillable Mobile Hamburger Button - Absolutely positioned to the right edge */}
        <button 
          className="md:hidden absolute right-6 top-1/2 -translate-y-1/2 z-[100000] flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={`w-7 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-7 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-7 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-black border-b border-neutral-900 flex flex-col p-6 gap-6 shadow-2xl z-[99990]">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-bold tracking-widest uppercase text-white py-2"
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-neutral-800 w-full my-2"></div>
          <Link href="/login" onClick={() => setIsOpen(false)} className="text-lg font-bold tracking-widest uppercase text-neutral-400 py-2">Login</Link>
          <Link href="/join" onClick={() => setIsOpen(false)} className="text-lg font-bold tracking-widest uppercase text-red-600 py-2">Join Platform</Link>
        </div>
      )}
    </nav>
  );
}