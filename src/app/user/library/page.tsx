'use client';
import React, { useState } from 'react';
import {
  Home, Compass, Box, BarChart2, UploadCloud, MessageSquare, Settings, Briefcase, Lightbulb, History, Users, GitMerge, ChevronsLeft, ChevronsRight, Bell, HelpCircle, Star, Clock, BellRing, Pin, MoreVertical, Play, Info, Search, X
} from 'lucide-react';
import { motion } from 'framer-motion';
import MyLibrary from '../../components/MyLibrary';

type UserRole = 'developer' | 'enterprise';

interface Agent {
    id: number;
    name: string;
    description: string;
    tags: string[];
    lastUsed: string;
    icon: string;
}

// Re-usable components from the main dashboard (could be moved to a shared file)
const Sidebar = ({ role, isCollapsed, setCollapsed }: { role: UserRole, isCollapsed: boolean, setCollapsed: (c: boolean) => void }) => {
    const commonLinks = [
        { icon: <Home size={20} />, label: 'Dashboard Home', href: '/user/dashboard' },
        { icon: <Compass size={20} />, label: 'Explore Agents', href: '/agents' },
        { icon: <Users size={20} />, label: 'My Library', href: '/user/library' },
        { icon: <Settings size={20} />, label: 'Settings', href: '/user/settings' },
    ];
    const developerLinks = [
        { icon: <Box size={20} />, label: 'My Agents', href: '/user/my-agents' },
        { icon: <BarChart2 size={20} />, label: 'Agent Stats', href: '/user/stats' },
    ];
    const enterpriseLinks = [
        { icon: <Briefcase size={20} />, label: 'Active Agents', href: '/user/active-agents' },
        { icon: <Lightbulb size={20} />, label: 'Recommendations', href: '/user/recommendations' },
    ];
    const links = role === 'developer' ? [...commonLinks, ...developerLinks] : [...commonLinks, ...enterpriseLinks];

    return (
        <div className={`transition-all duration-300 ease-in-out bg-[#F7F9FA] border-r border-gray-200 flex flex-col ${isCollapsed ? 'w-20' : 'w-64'}`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-200 h-16">
                {!isCollapsed && <span className="font-semibold text-gray-800">Dashboard</span>}
                <button onClick={() => setCollapsed(!isCollapsed)} className="p-2 rounded-md hover:bg-gray-200">
                    {isCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
                </button>
            </div>
            <nav className="flex-grow p-2 space-y-1">
                {links.map((link) => (
                    <a key={link.label} href={link.href} className="flex items-center p-3 rounded-md text-gray-700 hover:bg-gray-200 hover:text-black transition-colors">
                        {link.icon}
                        {!isCollapsed && <span className="ml-4 font-medium text-sm">{link.label}</span>}
                    </a>
                ))}
            </nav>
        </div>
    );
};
const Header = () => (
    <header className="flex items-center justify-end p-4 bg-white border-b border-gray-200 h-16">
        <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-black"><Bell size={22} /></button>
            <button className="text-gray-600 hover:text-black"><HelpCircle size={22} /></button>
            <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold"> S </div>
        </div>
    </header>
);

// Mock Data for Library
const libraryAgents: Record<string, Agent[]> = {
    favorites: [
        { id: 1, name: 'LexiAI', description: 'Summarizes legal contracts.', tags: ['Finance', 'NLP'], lastUsed: '2 days ago', icon: '🧠' },
        { id: 5, name: 'Sales Pilot', description: 'Automates lead qualification.', tags: ['Sales', 'CRM'], lastUsed: '5 days ago', icon: '🚀' },
    ],
    recentlyUsed: [
        { id: 2, name: 'SupportBot', description: 'Handles support tickets.', tags: ['Support'], lastUsed: '1 hour ago', icon: '🤖' },
        { id: 1, name: 'LexiAI', description: 'Summarizes legal contracts.', tags: ['Finance', 'NLP'], lastUsed: '2 days ago', icon: '🧠' },
    ],
    subscribed: [
        { id: 3, name: 'DevOps Genie', description: 'Deploys cloud infrastructure.', tags: ['DevOps'], lastUsed: '1 month ago', icon: '🛠️' },
    ],
    pinned: [],
};

const LibraryAgentCard = ({ agent }: { agent: Agent }) => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col group transition-all duration-300 hover:shadow-lg hover:border-blue-400 hover:scale-[1.02]">
        <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
                <div className="w-12 h-12 text-2xl rounded-lg bg-gray-100 flex items-center justify-center">{agent.icon}</div>
                <div>
                    <h3 className="font-semibold text-gray-800">{agent.name}</h3>
                    <p className="text-sm text-gray-500">{agent.description}</p>
                </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={20} /></button>
        </div>
        <div className="flex flex-wrap gap-2 my-3">
            {agent.tags.map((tag: string) => <span key={tag} className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full">#{tag}</span>)}
        </div>
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-400">Last used: {agent.lastUsed}</p>
            <div className="flex items-center gap-2">
                <button title="Run Agent" className="p-2 rounded-full hover:bg-blue-50 text-gray-500 hover:text-blue-600"><Play size={16} /></button>
                <button title="View Agent Details" className="p-2 rounded-full hover:bg-blue-50 text-gray-500 hover:text-blue-600"><Info size={16} /></button>
            </div>
        </div>
    </div>
);

const EmptyState = ({ tab, isSearching }: { tab: string, isSearching: boolean }) => {
    const messages: Record<string, string> = {
        favorites: "You haven't saved any agents yet. Bookmark agents from the explore page to see them here.",
        recentlyUsed: "You haven't used any agents recently.",
        subscribed: "You are not subscribed to any agents.",
        pinned: "Pin agents here to keep them always at your fingertips.",
    };
    if (isSearching) {
        return (
            <div className="text-center py-16 px-6 bg-gray-50 rounded-lg">
                <p className="text-gray-600 mb-4">No matching agents found in your library. Try adjusting your search or explore new ones.</p>
            </div>
        );
    }
    return (
        <div className="text-center py-16 px-6 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-4">{messages[tab]}</p>
            {tab === 'favorites' && <a href="/agents" className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-full hover:bg-blue-700">Explore Agents</a>}
        </div>
    );
};

export default function MyLibraryPage() {
    const [role] = useState<UserRole>('developer');
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    return (
        <div className="flex h-screen bg-white font-sans">
            <Sidebar role={role} isCollapsed={isSidebarCollapsed} setCollapsed={setSidebarCollapsed} />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">My Library</h1>
                    <MyLibrary />
                </main>
            </div>
        </div>
    );
} 