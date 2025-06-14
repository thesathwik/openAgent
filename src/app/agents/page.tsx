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
      {/* Agents grid */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-10 mt-8 font-sans">
        {filteredAgents.map(agent => (
          <div
            key={agent.id}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-2 flex flex-col items-start p-6 cursor-pointer relative overflow-hidden font-sans"
          >
            {/* Animated orb/icon */}
            <div className="mb-4 self-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 via-pink-100 to-white flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                <Image src={agent.icon} alt={agent.name} width={40} height={40} className="transition-transform duration-300 group-hover:scale-110 group-hover:animate-pulse-slow" />
              </div>
            </div>
            <div className="font-semibold text-xl text-black mb-1 text-left tracking-tight leading-tight font-sans">{agent.name}</div>
            <div className="text-gray-800 text-sm mb-2 text-left line-clamp-2 leading-relaxed font-sans">{agent.description}</div>
            <div className="flex flex-wrap gap-1 mb-4 justify-start font-sans">
              {agent.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 rounded-full bg-gray-100 text-xs text-gray-800 font-medium font-sans">#{tag}</span>
              ))}
            </div>
            <div className="flex w-full justify-start mt-auto font-sans">
              <Link
                href={`/agents/${agent.id}`}
                className="know-agent-btn"
                style={{ minWidth: '120px', fontWeight: 600, fontSize: '0.98rem', letterSpacing: '-0.01em', padding: '0.55rem 1.4rem' }}
              >
                Know Agent
              </Link>
            </div>
          </div>
        ))}
        {filteredAgents.length === 0 && (
          <div className="col-span-full text-center text-gray-800 py-12 font-sans">No agents found.</div>
        )}
      </div>
      {/* Fixed Publish Agent Button */}
      <Link
        href="/agents/new"
        className="publish-agent-btn"
        style={{ fontWeight: 600, fontSize: '0.98rem', letterSpacing: '-0.01em', padding: '0.55rem 1.4rem' }}
      >
        + Publish Agent
      </Link>
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 2.4s ease-in-out infinite;
        }
        .know-agent-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 2.2rem;
          border-radius: 9999px;
          background: linear-gradient(135deg, rgba(255,255,255,0.7) 60%, rgba(59,130,246,0.13) 100%);
          box-shadow: 0 4px 32px 0 rgba(59,130,246,0.13), 0 1.5px 8px 0 rgba(59,130,246,0.10), 0 0 0 0 rgba(59,130,246,0.10);
          border: 1.5px solid rgba(59,130,246,0.18);
          color: #2563eb;
          font-family: 'Inter', Arial, Helvetica, sans-serif;
          font-weight: 600;
          transition: all 0.18s cubic-bezier(.4,0,.2,1);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          position: relative;
          overflow: hidden;
        }
        .know-agent-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: radial-gradient(circle at 60% 40%, rgba(59,130,246,0.10) 0%, rgba(59,130,246,0.03) 100%);
          z-index: 0;
        }
        .know-agent-btn:hover, .know-agent-btn:focus {
          color: #fff;
          background: linear-gradient(135deg, #2563eb 60%, #60a5fa 100%);
          box-shadow: 0 8px 32px 0 rgba(59,130,246,0.18), 0 2px 12px 0 rgba(59,130,246,0.10);
          border: 1.5px solid #2563eb;
        }
        .know-agent-btn span {
          position: relative;
          z-index: 1;
        }
        .publish-agent-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.85rem 2.4rem;
          border-radius: 9999px;
          background: linear-gradient(135deg, rgba(255,255,255,0.85) 60%, rgba(59,130,246,0.15) 100%);
          box-shadow: 0 8px 32px 0 rgba(59,130,246,0.18), 0 2px 12px 0 rgba(59,130,246,0.10);
          border: 1.5px solid rgba(59,130,246,0.18);
          color: #2563eb;
          font-family: 'Inter', Arial, Helvetica, sans-serif;
          font-weight: 600;
          transition: all 0.18s cubic-bezier(.4,0,.2,1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          overflow: hidden;
        }
        .publish-agent-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: radial-gradient(circle at 60% 40%, rgba(59,130,246,0.13) 0%, rgba(59,130,246,0.04) 100%);
          z-index: 0;
        }
        .publish-agent-btn:hover, .publish-agent-btn:focus {
          color: #fff;
          background: linear-gradient(135deg, #2563eb 60%, #60a5fa 100%);
          box-shadow: 0 12px 36px 0 rgba(59,130,246,0.22), 0 4px 16px 0 rgba(59,130,246,0.13);
          border: 1.5px solid #2563eb;
        }
      `}</style>
    </div>
  );
} 