'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AGENT_TAGS = ['Finance', 'Customer Support', 'DevOps', 'NLP', 'OpenSource', 'Productivity'];
const AGENTS = [
  {
    id: 1,
    name: 'LexiAI',
    description: 'Summarizes legal contracts with high accuracy.',
    tags: ['Finance', 'NLP'],
    icon: '/logo-mark.svg',
  },
  {
    id: 2,
    name: 'SupportBot',
    description: 'Automates customer support ticket triage.',
    tags: ['Customer Support', 'Productivity'],
    icon: '/logo-mark.svg',
  },
  {
    id: 3,
    name: 'DevOpsGenie',
    description: 'Deploys and monitors cloud infrastructure.',
    tags: ['DevOps', 'OpenSource'],
    icon: '/logo-mark.svg',
  },
  {
    id: 4,
    name: 'Insightly',
    description: 'Extracts insights from business data.',
    tags: ['Finance', 'Productivity'],
    icon: '/logo-mark.svg',
  },
];

export default function ExploreAgentsPage() {
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredAgents = AGENTS.filter(agent =>
    (search === '' || agent.name.toLowerCase().includes(search.toLowerCase()) || agent.description.toLowerCase().includes(search.toLowerCase())) &&
    (selectedTags.length === 0 || selectedTags.every(tag => agent.tags.includes(tag)))
  );

  return (
    <div className="relative min-h-screen bg-white pb-16">
      {/* Faint SVG background and radial fade */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1440 900" fill="none" className="w-full h-full absolute opacity-2">
          <circle cx="300" cy="200" r="80" stroke="#a5b4fc" strokeWidth="2" />
          <circle cx="1100" cy="600" r="100" stroke="#fbcfe8" strokeWidth="2" />
          <line x1="300" y1="200" x2="1100" y2="600" stroke="#e0e7ef" strokeWidth="1.5" opacity="0.5" />
          <circle cx="700" cy="400" r="60" stroke="#e0e7ef" strokeWidth="2" />
        </svg>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-radial from-blue-50/30 via-white/0 to-transparent opacity-20 blur-2xl" />
      </div>
      {/* Header */}
      <div className="relative z-10 max-w-3xl mx-auto pt-24 pb-2 px-4 flex flex-col items-center">
        <Link href="/agents/new" className="absolute top-2 right-4 rounded-full bg-blue-600 text-white text-sm font-semibold px-4 py-2 shadow hover:bg-blue-700">+ Publish Agent</Link>
        <h1 className="text-3xl md:text-5xl font-extrabold text-black mb-4 tracking-tight text-center max-w-3xl">Explore Modular Intelligence</h1>
        <p className="text-lg text-gray-500 mb-2 text-center max-w-2xl">Browse AI agents built by the community, tailored for enterprise workflows.</p>
      </div>
      {/* Search bar and filters anchored together */}
      <div className="relative z-10 max-w-screen-xl mx-auto flex flex-col gap-3 px-4">
        <div className="relative w-full flex items-center">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          </span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search agents by name or function…"
            className="w-full pl-10 pr-4 py-2 rounded-3xl border border-gray-200 bg-white text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-200 shadow-sm focus-within:shadow-lg"
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center mt-0">
          {AGENT_TAGS.map(tag => (
            <button
              key={tag}
              className={`px-4 py-1.5 rounded-full text-sm border transition-all duration-200 cursor-pointer ${selectedTags.includes(tag)
                ? 'bg-blue-50 text-blue-600 font-semibold border-blue-200'
                : 'bg-white text-gray-600 font-medium border-gray-200 hover:bg-gray-100 hover:font-semibold'}`}
              onClick={() => setSelectedTags(selectedTags.includes(tag) ? selectedTags.filter(t => t !== tag) : [...selectedTags, tag])}
              type="button"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
      {/* Agents grid */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-10 mt-8">
        {filteredAgents.map(agent => (
          <div
            key={agent.id}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-2 flex flex-col items-start p-6 cursor-pointer relative overflow-hidden"
          >
            {/* Animated orb/icon */}
            <div className="mb-4 self-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 via-pink-100 to-white flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                <Image src={agent.icon} alt={agent.name} width={40} height={40} className="transition-transform duration-300 group-hover:scale-110 group-hover:animate-pulse-slow" />
              </div>
            </div>
            <div className="font-semibold text-xl text-black mb-1 text-left tracking-tight leading-tight">{agent.name}</div>
            <div className="text-gray-500 text-sm mb-2 text-left line-clamp-2 leading-relaxed">{agent.description}</div>
            <div className="flex flex-wrap gap-1 mb-4 justify-start">
              {agent.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 rounded-full bg-gray-100 text-xs text-gray-600 font-medium">#{tag}</span>
              ))}
            </div>
            <div className="flex gap-2 w-full justify-start mt-auto">
              <button className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 text-sm font-semibold transition-all">Quick Deploy</button>
              <Link href={`/agents/${agent.id}`} className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-700 hover:scale-105 transition-all">View Agent</Link>
            </div>
          </div>
        ))}
        {filteredAgents.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-12">No agents found.</div>
        )}
      </div>
    </div>
  );
} 