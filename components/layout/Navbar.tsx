'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  // Force hydration check
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const links = [
    { name: 'Training', href: '/training' },
    { name: 'About', href: '/about' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'Jump Test', href: '/vertical-jump-test' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[999999] bg-brand-black/95 border-b border-brand-gray-900 h-20">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between relative">
        
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 cursor-pointer select-none relative z-[100000]">
          <div className="w-8 h-8 flex-shrink-0 bg-brand-crimson rounded-sm flex items-center justify-center font-heading font-bold text-white leading-none">
            SD
          </div>
          <span className="font-heading font-bold text-lg sm:text-xl tracking-widest uppercase text-white">
            Sri Lanka Dunks
          </span>
        </a>

        {/* Desktop Links */}
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

        {/* Mobile Button - Using onPointerDown for instant raw hardware touch mapping */}
        {isMounted && (
          <div 
            className="md:hidden absolute right-0 top-0 h-20 w-24 flex flex-col items-end justify-center pr-6 z-[999999] cursor-pointer touch-none"
            onPointerDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen((prev) => !prev);
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen((prev) => !prev);
            }}
            role="button"
            tabIndex={0}
          >
            <div className={`w-7 h-0.5 bg-white transition-all duration-300 pointer-events-none ${isOpen ? 'rotate-45 translate-y-2' : 'mb-1.5'}`}></div>
            <div className={`w-7 h-0.5 bg-white transition-all duration-300 pointer-events-none ${isOpen ? 'opacity-0' : 'mb-1.5'}`}></div>
            <div className={`w-7 h-0.5 bg-white transition-all duration-300 pointer-events-none ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-brand-surface border-b border-brand-gray-900 flex flex-col p-6 gap-6 shadow-2xl z-[999990]">
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