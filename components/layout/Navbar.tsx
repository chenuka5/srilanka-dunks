'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: 'Training', href: '/training' },
    { name: 'Camps', href: '/camps' },
    { name: 'Athletes', href: '/athletes' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-brand-black/95 backdrop-blur-sm border-b border-brand-gray-900 h-20">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-crimson rounded-sm flex items-center justify-center font-heading font-bold text-white leading-none">
            SD
          </div>
          <span className="font-heading font-bold text-xl tracking-widest uppercase text-white">
            Sri Lanka Dunks
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
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

        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-6 h-0.5 bg-white mb-1.5"></div>
          <div className="w-6 h-0.5 bg-white mb-1.5"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-brand-surface border-b border-brand-gray-900 flex flex-col p-6 gap-6 shadow-2xl">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-heading tracking-widest uppercase text-white"
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-brand-gray-800 w-full my-2"></div>
          <Link href="/login" className="text-lg font-heading tracking-widest uppercase text-brand-gray-400">Login</Link>
          <Link href="/join" className="text-lg font-heading tracking-widest uppercase text-brand-crimson">Join Platform</Link>
        </div>
      )}
    </nav>
  );
}