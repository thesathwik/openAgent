'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '../components';

const AGENT_TAGS = ['Finance', 'Customer Support', 'DevOps', 'NLP', 'OpenSource', 'Productivity'];
const AGENTS = [
  {
    id: 1,
    name: 'LexiAI',
    description: 'Summarizes legal contracts with high accuracy.',
    tags: ['Finance', 'NLP'],
    icon: '🧠',
    category: 'finance',
    rating: 4.9,
  },
  {
    id: 2,
    name: 'SupportBot',
    description: 'Automates customer support ticket triage.',
    tags: ['Customer Support', 'Productivity'],
    icon: '🤖',
    category: 'support',
    rating: 4.7,
  },
  {
    id: 3,
    name: 'DevOpsGenie',
    description: 'Deploys and monitors cloud infrastructure.',
    tags: ['DevOps', 'OpenSource'],
    icon: '🛠️',
    category: 'operations',
    rating: 4.8,
  },
  {
    id: 4,
    name: 'Insightly',
    description: 'Extracts insights from business data.',
    tags: ['Finance', 'Productivity'],
    icon: '📊',
    category: 'data',
    rating: 4.6,
  },
];

const CATEGORIES = [
  {
    id: 'sales',
    icon: '📈',
    title: 'Sales',
    description: 'Automate lead generation, follow-ups, and CRM handoffs.',
    agentCount: 12,
  },
  {
    id: 'marketing',
    icon: '📣',
    title: 'Marketing',
    description: 'Campaign automation, content, and analytics.',
    agentCount: 8,
  },
  {
    id: 'product',
    icon: '🛠️',
    title: 'Product / Service Delivery',
    description: 'Streamline delivery, QA, and feedback loops.',
    agentCount: 7,
  },
  {
    id: 'support',
    icon: '💬',
    title: 'Customer Support',
    description: 'Automate ticketing, chat, and helpdesk workflows.',
    agentCount: 10,
  },
  {
    id: 'finance',
    icon: '💰',
    title: 'Finance & Accounting',
    description: 'Automate invoicing, reconciliation, and reporting.',
    agentCount: 6,
  },
  {
    id: 'hr',
    icon: '🧑‍💼',
    title: 'HR & Talent',
    description: 'Recruitment, onboarding, and HR automation.',
    agentCount: 5,
  },
  {
    id: 'operations',
    icon: '⚙️',
    title: 'Operations',
    description: 'Optimize logistics, procurement, and workflows.',
    agentCount: 9,
  },
  {
    id: 'data',
    icon: '📊',
    title: 'Data & Analytics',
    description: 'Insights, dashboards, and data pipelines.',
    agentCount: 11,
  },
];

type CategoryCardProps = {
  icon: string;
  title: string;
  description: string;
  agentCount: number;
  onClick: () => void;
};

function CategoryCard({ icon, title, description, agentCount, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl bg-gradient-to-br from-white via-gray-50 to-blue-50 hover:scale-105 transition-transform duration-200 shadow-sm hover:shadow-md border border-gray-100 flex flex-col items-start p-5 gap-2 focus:outline-none group relative overflow-hidden"
      style={{ minHeight: 140 }}
    >
      <span className="text-2xl mb-1">{icon}</span>
      <span className="font-bold text-lg text-gray-800 mb-1">{title}</span>
      <span className="text-sm text-gray-700 mb-2">{description}</span>
      <span className="text-xs bg-blue-100 text-blue-700 rounded-full px-3 py-1 font-semibold absolute top-4 right-4 group-hover:bg-blue-200 transition">+{agentCount} Agents</span>
      <span className="absolute inset-0 rounded-xl pointer-events-none group-hover:shadow-inner group-hover:bg-blue-50/30 transition-all duration-200" />
    </button>
  );
}

function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="w-full flex items-center justify-center py-4">
      <div className="relative w-full max-w-2xl">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
        </span>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Search agents by name or function…"
          className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 bg-white text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-200 shadow-sm focus-within:shadow-lg"
        />
      </div>
    </div>
  );
}

type CategoryTabsProps = {
  categories: typeof CATEGORIES;
  active: string;
  onSelect: (id: string) => void;
};

function CategoryTabs({ categories, active, onSelect }: CategoryTabsProps) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className="sticky top-[90px] z-20 bg-white/95 border-b border-gray-100 w-full flex items-center justify-center py-2 mb-8">
      <div className="flex gap-2 overflow-x-auto px-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`px-5 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-200
              ${active === cat.id ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-blue-50'}`}
          >
            {cat.icon} {cat.title}
          </button>
        ))}
      </div>
    </div>
  );
}

type AgentCardProps = {
  name: string;
  description: string;
  tags: string[];
  icon: string;
  rating?: number;
  onClick: () => void;
};

function AgentCard({ name, description, tags, icon, rating, onClick }: AgentCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col items-start group hover:scale-[1.02] cursor-pointer" onClick={onClick}>
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 via-pink-100 to-white flex items-center justify-center text-2xl mb-3 shadow-inner">{icon}</div>
      <div className="font-bold text-lg text-gray-800 mb-1 truncate w-full">{name}</div>
      <div className="text-gray-700 text-sm mb-2 line-clamp-2 w-full">{description}</div>
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.slice(0, 3).map(tag => (
          <span key={tag} className="rounded-full bg-gray-100 text-xs text-gray-700 px-3 py-1 font-medium">#{tag}</span>
        ))}
      </div>
      {rating && (
        <div className="flex items-center gap-1 text-xs text-yellow-500 mb-2">
          <span>★</span>
          <span className="font-semibold text-gray-700">{rating}/5</span>
        </div>
      )}
      <button className="mt-auto bg-blue-600 text-white px-5 py-2 rounded-full font-semibold text-sm shadow hover:bg-blue-700 transition-all duration-200 focus:outline-none">View Agent</button>
    </div>
  );
}

export default function ExploreAgentsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter agents by search and category
  const filteredAgents = AGENTS.filter(agent => {
    const matchesSearch =
      search === '' ||
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.description.toLowerCase().includes(search.toLowerCase()) ||
      agent.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || agent.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative min-h-screen bg-white pb-16 font-sans">
      <Navbar />
      <div className="max-w-4xl mx-auto pt-24 pb-2 px-4 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-black mb-4 tracking-tight text-center max-w-3xl font-sans">Explore Modular Intelligence</h1>
      </div>
      <div className="max-w-3xl mx-auto w-full px-4">
        <SearchInput value={search} onChange={setSearch} />
      </div>
      <div className="max-w-6xl mx-auto w-full px-4">
        <CategoryTabs
          categories={[{ id: 'all', icon: '✨', title: 'All', description: '', agentCount: AGENTS.length }, ...CATEGORIES]}
          active={activeCategory}
          onSelect={setActiveCategory}
        />
      </div>
      <div className="max-w-6xl mx-auto w-full px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-12">
          {filteredAgents.length > 0 ? (
            filteredAgents.map(agent => (
              <AgentCard
                key={agent.id}
                name={agent.name}
                description={agent.description}
                tags={agent.tags}
                icon={agent.icon}
                rating={agent.rating}
                onClick={() => {}}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 py-12 font-sans">No agents found.</div>
          )}
        </div>
      </div>
      {/* TODO: Featured/View All sections in next step */}
    </div>
  );
} 