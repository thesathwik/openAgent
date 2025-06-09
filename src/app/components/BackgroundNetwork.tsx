'use client';
import React, { useEffect, useRef } from 'react';

export default function BackgroundNetwork() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      svg.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <svg ref={ref} className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-20 transition-all duration-300" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Blurred orbs */}
      <ellipse cx="300" cy="200" rx="80" ry="60" fill="#a5b4fc" opacity="0.12" filter="url(#blur1)" />
      <ellipse cx="1100" cy="600" rx="100" ry="70" fill="#fbcfe8" opacity="0.10" filter="url(#blur2)" />
      {/* Network nodes and lines */}
      <circle cx="200" cy="200" r="40" stroke="#E5E7EB" strokeWidth="2" />
      <circle cx="600" cy="300" r="30" stroke="#E5E7EB" strokeWidth="2" />
      <circle cx="1200" cy="500" r="50" stroke="#E5E7EB" strokeWidth="2" />
      <circle cx="900" cy="150" r="25" stroke="#E5E7EB" strokeWidth="2" />
      <circle cx="400" cy="700" r="35" stroke="#E5E7EB" strokeWidth="2" />
      <line x1="200" y1="200" x2="600" y2="300" stroke="#E5E7EB" strokeWidth="1.5" />
      <line x1="600" y1="300" x2="1200" y2="500" stroke="#E5E7EB" strokeWidth="1.5" />
      <line x1="1200" y1="500" x2="900" y2="150" stroke="#E5E7EB" strokeWidth="1.5" />
      <line x1="900" y1="150" x2="400" y2="700" stroke="#E5E7EB" strokeWidth="1.5" />
      <line x1="400" y1="700" x2="200" y2="200" stroke="#E5E7EB" strokeWidth="1.5" />
      <defs>
        <filter id="blur1" x="0" y="0" width="600" height="400">
          <feGaussianBlur stdDeviation="60" />
        </filter>
        <filter id="blur2" x="800" y="400" width="600" height="400">
          <feGaussianBlur stdDeviation="80" />
        </filter>
      </defs>
    </svg>
  );
} 