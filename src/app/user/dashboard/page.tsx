import React from 'react';
import Link from 'next/link';

// Mock data
const installedAgents = [
  { id: 1, name: 'LexiAI', description: 'Summarizes legal contracts.' },
  { id: 2, name: 'SupportBot', description: 'Automates support ticket triage.' },
];
const publishedAgents = [
  { id: 3, name: 'DevOpsGenie', description: 'Deploys and monitors cloud infrastructure.' },
];
const usageStats = {
  installs: 12,
  published: 1,
  lastActive: '2024-06-10',
};

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-white font-sans px-4 pb-16">
      <div className="max-w-4xl mx-auto pt-16">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-900">User Dashboard</h1>
        {/* Usage Statistics */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-700">{usageStats.installs}</div>
            <div className="text-gray-600">Installed Agents</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-700">{usageStats.published}</div>
            <div className="text-gray-600">Published Agents</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-lg font-semibold text-blue-700">{usageStats.lastActive}</div>
            <div className="text-gray-600">Last Active</div>
          </div>
        </div>
        {/* My Installed Agents */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">My Installed Agents</h2>
          <div className="flex flex-col gap-2">
            {installedAgents.length === 0 ? (
              <div className="text-gray-400">No agents installed yet.</div>
            ) : (
              installedAgents.map(agent => (
                <Link key={agent.id} href={`/agents/${agent.id}`} className="block px-4 py-2 rounded-lg bg-gray-50 hover:bg-blue-50 text-blue-700 font-semibold transition-all">
                  {agent.name} <span className="text-gray-500 font-normal">- {agent.description}</span>
                </Link>
              ))
            )}
          </div>
        </div>
        {/* My Published Agents */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">My Published Agents</h2>
          <div className="flex flex-col gap-2">
            {publishedAgents.length === 0 ? (
              <div className="text-gray-400">No agents published yet.</div>
            ) : (
              publishedAgents.map(agent => (
                <Link key={agent.id} href={`/agents/${agent.id}`} className="block px-4 py-2 rounded-lg bg-gray-50 hover:bg-blue-50 text-blue-700 font-semibold transition-all">
                  {agent.name} <span className="text-gray-500 font-normal">- {agent.description}</span>
                </Link>
              ))
            )}
          </div>
        </div>
        {/* Account Settings */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">Account Settings</h2>
          <Link href="/user/settings" className="inline-block px-6 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-all">Go to Account Settings</Link>
        </div>
      </div>
    </div>
  );
} 