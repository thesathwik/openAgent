'use client';
import React, { useEffect, useState } from 'react';

export default function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <section className="w-full flex flex-col items-center justify-center text-center pt-40 pb-24 relative z-10">
      {/* Radial gradient background behind headline */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[340px] pointer-events-none -z-10" aria-hidden>
        <div className="w-full h-full rounded-full bg-gradient-radial from-blue-100/60 via-pink-100/40 to-transparent blur-2xl opacity-70" />
      </div>
      <h1 className={`text-4xl md:text-6xl font-extrabold text-black mb-6 font-sans tracking-tight leading-relaxed transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>A Living Workspace for AI Agents</h1>
      <p className="text-base text-gray-600 opacity-80 leading-relaxed tracking-tight mb-10 max-w-full whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]">The platform where ideas become agents—and agents transform industries.</p>
      <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full max-w-md justify-center items-center">
        <a href="#agents" className="border border-gray-300 rounded-full px-7 py-3 text-base font-semibold text-gray-800 bg-white/70 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]">Explore Agents</a>
        <a href="#deploy" className="bg-gradient-to-r from-blue-500 to-pink-400 text-white rounded-full px-7 py-3 text-base font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]">Deploy Yours</a>
      </div>
    </section>
  );
} 