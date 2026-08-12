'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Training', href: '/training' },
    { name: 'Camps', href: '/camps' },
    { name: 'Athletes', href: '/athletes' },
    { name: 'Jump Test', href: '/vertical-jump-test' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-neutral-800 px-4 sm:px-6 lg:px-12 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo - Controlled height for mobile vs desktop */}
        <Link href="/" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Sri Lanka Dunks Logo" 
            className="h-[50px] sm:h-[70px] md:h-[100px] w-auto object-contain transition-all"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-mono text-sm md:text-base font-semibold uppercase tracking-wider text-neutral-300">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="hover:text-red-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link 
            href="/join" 
            className="bg-red-600 hover:bg-red-700 text-white font-mono text-xs sm:text-sm uppercase tracking-widest px-4 sm:px-6 py-2 sm:py-3 rounded transition-colors font-bold"
          >
            Join Now
          </Link>

          {/* Hamburger Icon (Mobile Only) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-red-600 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-800 bg-black/95 px-6 py-6 space-y-4 font-mono text-sm uppercase tracking-wider text-neutral-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-red-600 py-2 border-b border-neutral-900"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}