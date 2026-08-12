'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Training', href: '/training' },
    { name: 'Camps', href: '/camps' },
    { name: 'Athletes', href: '/athletes' },
    { name: 'Resources', href: '/resources' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-red-600 text-white font-bold font-mono px-2 py-1 text-sm tracking-wider">
              SD
            </div>
            <span className="font-extrabold tracking-tight uppercase text-lg hidden sm:block">
              Sri Lanka Dunks
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/login"
              className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/join"
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold font-mono uppercase tracking-widest px-6 py-3 rounded transition-colors"
            >
              Join Free →
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-neutral-400 hover:text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-b border-neutral-900">
          <div className="px-6 pt-4 pb-8 space-y-6 flex flex-col">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-bold uppercase tracking-wide text-neutral-300 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-4 border-t border-neutral-900">
              <Link 
                href="/login"
                onClick={() => setIsOpen(false)}
                className="text-center border border-neutral-800 py-3 rounded text-sm font-mono uppercase tracking-widest text-neutral-300"
              >
                Login
              </Link>
              <Link 
                href="/join"
                onClick={() => setIsOpen(false)}
                className="text-center bg-red-600 py-3 rounded text-sm font-bold font-mono uppercase tracking-widest text-white"
              >
                Join Free →
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}