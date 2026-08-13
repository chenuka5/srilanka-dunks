'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navLinks = [
    { name: 'Start Here', href: '/start-here' },
    { name: 'Training', href: '/training' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'Camps', href: '/camps/upcoming' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="font-black text-xl md:text-2xl tracking-tighter uppercase text-white hover:scale-105 transition-transform">
          Sri Lanka <span className="text-red-600">Dunks.</span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`font-mono text-xs uppercase tracking-widest transition-colors hover:text-white ${isActive ? 'text-red-500 font-bold' : 'text-neutral-400'}`}
              >
                {link.name}
              </Link>
            );
          })}
          
          {user ? (
            <Link href="/dashboard" className="bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest px-6 py-2.5 rounded font-bold transition-all shadow-lg shadow-red-600/20">
              Portal →
            </Link>
          ) : (
            <Link href="/login" className="bg-transparent border border-neutral-700 hover:border-white text-white font-mono text-xs uppercase tracking-widest px-6 py-2.5 rounded font-bold transition-all hover:bg-white hover:text-black">
              Log In
            </Link>
          )}
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button 
          className="md:hidden text-white p-2" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-black border-b border-neutral-900 absolute w-full left-0 top-20 flex flex-col p-6 space-y-4 shadow-2xl animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)} 
              className="text-neutral-400 hover:text-white font-mono text-sm uppercase tracking-widest transition-colors border-b border-neutral-900 pb-4"
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-red-600 font-mono text-sm uppercase tracking-widest transition-colors pb-2 pt-2 font-bold">
              Athlete Portal →
            </Link>
          ) : (
            <Link href="/login" onClick={() => setIsOpen(false)} className="text-white font-mono text-sm uppercase tracking-widest transition-colors pb-2 pt-2 font-bold">
              Log In →
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}