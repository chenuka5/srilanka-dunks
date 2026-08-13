'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // Initialize Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    // Check initial user
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    // Listen for auth changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMobileMenuOpen(false);
    router.push('/login');
  };

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
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Sri Lanka Dunks Logo" 
            className="h-[50px] sm:h-[70px] md:h-[90px] w-auto object-contain transition-all"
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

        {/* Action Button Group: Smart Auth Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {user ? (
            <>
              {/* Logged In State */}
              <button 
                onClick={handleLogout}
                className="border border-neutral-700 hover:border-white text-neutral-300 hover:text-white font-mono text-xs sm:text-sm uppercase tracking-widest px-3 sm:px-4 py-2 sm:py-2.5 rounded transition-all font-semibold"
              >
                Logout
              </button>
              <Link 
                href="/dashboard" 
                className="bg-red-600 hover:bg-red-700 text-white font-mono text-xs sm:text-sm uppercase tracking-widest px-4 sm:px-6 py-2 sm:py-2.5 rounded transition-colors font-bold shadow-md shadow-red-600/20"
              >
                Portal
              </Link>
            </>
          ) : (
            <>
              {/* Logged Out State */}
              <Link 
                href="/login" 
                className="border border-neutral-700 hover:border-white text-neutral-300 hover:text-white font-mono text-xs sm:text-sm uppercase tracking-widest px-3 sm:px-4 py-2 sm:py-2.5 rounded transition-all font-semibold"
              >
                Login
              </Link>
              <Link 
                href="/join" 
                className="bg-red-600 hover:bg-red-700 text-white font-mono text-xs sm:text-sm uppercase tracking-widest px-4 sm:px-6 py-2 sm:py-2.5 rounded transition-colors font-bold shadow-md shadow-red-600/20"
              >
                Join Now
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-red-600 focus:outline-none ml-1"
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

      {/* Mobile Slide-down Navigation */}
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
          
          {/* Mobile Smart Auth Links */}
          <div className="pt-4 mt-4 border-t border-neutral-900 flex flex-col gap-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-red-500 font-bold hover:text-red-400 py-2"
                >
                  Athlete Portal
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left text-neutral-400 hover:text-white py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block hover:text-white py-2"
                >
                  Login
                </Link>
                <Link
                  href="/join"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-red-500 font-bold hover:text-red-400 py-2"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}