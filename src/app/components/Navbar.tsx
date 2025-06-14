'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true for demo
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`w-full flex items-center justify-between py-4 px-8 fixed top-0 left-0 z-30 transition-all duration-300 backdrop-blur-md ${
        scrolled ? 'bg-white/70 shadow-lg' : 'bg-white/40 shadow-none'
      }`}
      style={{backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)'}}
    >
      {/* Logo (left) */}
      <div className="flex items-center gap-2 min-w-[56px]">
        <Link href="/" aria-label="OpenAgents Home">
          <div className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center relative overflow-visible group">
            {/* Animated ring */}
            <span className="absolute inset-0 rounded-full border-2 border-blue-300 opacity-0 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] animate-pulse pointer-events-none" />
            <Image src="/logo-mark.svg" alt="OpenAgents Logo Mark" width={32} height={32} className="z-10" />
          </div>
        </Link>
      </div>
      {/* Navigation Links (center) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-8 text-base font-medium text-gray-700">
        {[
          { label: 'Explore Agents', href: '/agents' },
          { label: 'How it Works', href: '/how-it-works' },
          { label: 'Stories', href: '#stories' },
          { label: 'Developers Hub', href: '/developers-hub' },
        ].map((link) => (
          link.href.startsWith('/') ? (
            <Link
              key={link.href}
              href={link.href}
              className={`relative transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-black ${pathname === link.href ? 'text-blue-600 font-bold' : ''}`}
            >
              <span>{link.label}</span>
              {pathname === link.href && (
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-2 h-2 bg-blue-500 rounded-full"></span>
              )}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:w-full hover:w-full" />
            </Link>
          ) : (
            <a
              key={link.href}
              href={link.href}
              className="relative transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-black"
            >
              <span>{link.label}</span>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:w-full hover:w-full" />
            </a>
          )
        ))}
      </div>
      {/* Sign In Button (right) */}
      <div className="flex items-center min-w-[120px] justify-end relative">
        {isAuthenticated ? (
          <>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold shadow transition-all duration-200"
              onClick={() => setDropdownOpen(v => !v)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              <span className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700">U</span>
              <span className="hidden sm:inline">Profile</span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-50 py-2">
                <Link href="/user/settings" className="block px-5 py-2 text-gray-700 hover:bg-blue-50 transition-all">Account Settings</Link>
                <button className="block w-full text-left px-5 py-2 text-red-600 hover:bg-red-50 transition-all" onClick={() => setIsAuthenticated(false)}>Sign Out</button>
              </div>
            )}
          </>
        ) : (
          <Link
            href="/signin"
            className="border border-gray-400 rounded-full px-5 py-2 text-gray-700 bg-white/60 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] font-semibold backdrop-blur-md"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
} 