'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './animate-pulse-slow.css';

export default function SignInSignUpPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">
      {/* Faint radial glow behind card */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-[480px] h-[320px] rounded-full bg-gradient-radial from-blue-100/40 via-white/60 to-transparent blur-2xl opacity-70" />
      </div>
      {/* Soft header with logo and nav */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center justify-between w-full max-w-md px-4">
        <Link href="/" className="mr-2" aria-label="Back to home">
          <Image src="/logo-mark.svg" alt="OpenAgents Logo" width={36} height={36} />
        </Link>
        <Link href="/" className="text-gray-400 hover:text-blue-500 text-sm font-medium transition-all">Back to Home</Link>
      </div>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200/60 p-8 flex flex-col gap-6 relative mt-16">
        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-2">
          <button
            className={`px-6 py-2 rounded-full text-base font-semibold transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ${mode === 'signin' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'border border-gray-300 text-gray-500 bg-white hover:bg-gray-50'}`}
            onClick={() => setMode('signin')}
            type="button"
          >
            Sign In
          </button>
          <button
            className={`px-6 py-2 rounded-full text-base font-semibold transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ${mode === 'signup' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'border border-gray-300 text-gray-500 bg-white hover:bg-gray-50'}`}
            onClick={() => setMode('signup')}
            type="button"
          >
            Sign Up
          </button>
        </div>
        {/* Tagline */}
        <div className="text-center text-gray-800 text-sm mb-2 opacity-90 font-medium tracking-tight max-w-full whitespace-nowrap overflow-hidden text-ellipsis">
          {mode === 'signin'
            ? 'Welcome back to the living workspace for AI agents.'
            : 'Join a living ecosystem—where ideas become agents.'}
        </div>
        {/* Social Auth Buttons */}
        <div className="flex flex-col gap-3 mb-2">
          <button type="button" className="flex items-center justify-center gap-2 w-full rounded-full py-2.5 border border-gray-200 bg-white text-gray-800 font-semibold shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200">
            <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" width={20} height={20} />
            Continue with Google
          </button>
          <button type="button" className="flex items-center justify-center gap-2 w-full rounded-full py-2.5 border border-gray-200 bg-white text-gray-800 font-semibold shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200">
            <Image src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" width={20} height={20} />
            Continue with GitHub
          </button>
        </div>
        {/* Divider */}
        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-700">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        {/* Form */}
        {mode === 'signin' ? (
          <form className="flex flex-col gap-4">
            <input type="email" placeholder="Email" className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-200" />
            <input type="password" placeholder="Password" className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-200" />
            <button type="submit" className="w-full rounded-full py-3 mt-2 font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] animate-pulse-slow">Sign In</button>
            <div className="flex justify-between items-center mt-2 text-sm text-gray-700">
              <a href="#" className="hover:underline">Forgot your password?</a>
              <span>or <button type="button" className="text-blue-500 hover:underline" onClick={() => setMode('signup')}>Sign Up</button></span>
            </div>
          </form>
        ) : (
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Name" className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-200" />
            <input type="email" placeholder="Email" className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-200" />
            <input type="password" placeholder="Password" className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-200" />
            <button type="submit" className="w-full rounded-full py-3 mt-2 font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] animate-pulse-slow">Sign Up</button>
            <div className="flex justify-center items-center mt-2 text-sm text-gray-700">
              <span>Already have an account? <button type="button" className="text-blue-500 hover:underline" onClick={() => setMode('signin')}>Sign In</button></span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
} 