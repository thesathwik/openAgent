import React, { useState } from 'react';
import { Play, Info, MoreVertical, Star, Bookmark, Pin, Clock } from 'lucide-react';

const TABS = [
  { key: 'favorites', label: 'Favorites', icon: <Star size={16} className="text-yellow-400" /> },
  { key: 'recent', label: 'Recently Used', icon: <Clock size={16} className="text-blue-400" /> },
  { key: 'subscribed', label: 'Subscribed', icon: <Bookmark size={16} className="text-purple-500" /> },
  { key: 'pinned', label: 'Pinned', icon: <Pin size={16} className="text-green-500" /> },
];

const mockAgents = [
  {
    id: 1,
    name: 'Invoice Processor',
    description: 'Extracts and processes invoice data automatically.',
    tags: ['finance', 'automation'],
    lastUsed: '2024-06-01',
    favorite: true,
    subscribed: true,
    pinned: false,
  },
  {
    id: 2,
    name: 'HR Onboarding Assistant',
    description: 'Guides new employees through onboarding steps.',
    tags: ['hr', 'onboarding'],
    lastUsed: '2024-05-28',
    favorite: false,
    subscribed: false,
    pinned: true,
  },
  {
    id: 3,
    name: 'Customer Support Bot',
    description: 'Handles customer queries and support tickets.',
    tags: ['support', 'customer'],
    lastUsed: '2024-05-30',
    favorite: true,
    subscribed: false,
    pinned: false,
  },
];

const filterAgents = (tab: string) => {
  switch (tab) {
    case 'favorites':
      return mockAgents.filter(a => a.favorite);
    case 'recent':
      return mockAgents;
    case 'subscribed':
      return mockAgents.filter(a => a.subscribed);
    case 'pinned':
      return mockAgents.filter(a => a.pinned);
    default:
      return mockAgents;
  }
};

const AgentTile = ({ agent }: { agent: typeof mockAgents[0] }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col gap-2 hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">{agent.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-300">{agent.description}</p>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
          <MoreVertical size={18} />
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-10 z-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md w-40">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">{agent.pinned ? 'Unpin' : 'Pin'}</button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">{agent.subscribed ? 'Unsubscribe' : 'Subscribe'}</button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm text-red-600">Remove</button>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {agent.tags.map(tag => (
          <span key={tag} className="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-0.5 rounded text-xs">{tag}</span>
        ))}
      </div>
      <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
        <span>Last used: {agent.lastUsed}</span>
        <div className="flex gap-2">
          <button className="p-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900" title="Quick Run"><Play size={16} /></button>
          <button className="p-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900" title="Info"><Info size={16} /></button>
        </div>
      </div>
    </div>
  );
};

const MyLibrary = () => {
  const [activeTab, setActiveTab] = useState('favorites');
  const agents = filterAgents(activeTab);
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`flex items-center gap-1 px-4 py-2 font-medium text-sm border-b-2 transition-colors ${activeTab === tab.key ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 dark:text-gray-300 hover:text-blue-600'}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-12">No agents found in this category.</div>
        ) : (
          agents.map(agent => <AgentTile key={agent.id} agent={agent} />)
        )}
      </div>
    </div>
  );
};

export default MyLibrary; 