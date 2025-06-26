import React from 'react';
import type { UserRole } from './Sidebar';
import { CheckCircle, Star, Users, TrendingUp, BookOpen, RefreshCcw, ThumbsUp, Zap } from 'lucide-react';

const NeumorphicCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6 ${className}`}>{children}</div>
);

// Developer Widgets
const MyAgentsOverview = () => (
  <NeumorphicCard>
    <h2 className="text-lg font-bold mb-2">My Agents Overview</h2>
    <div className="grid grid-cols-3 gap-4">
      <div className="text-center">
        <p className="text-2xl font-bold text-blue-600">5</p>
        <p className="text-gray-500">Live</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-yellow-500">2</p>
        <p className="text-gray-500">Draft</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-red-500">1</p>
        <p className="text-gray-500">Rejected</p>
      </div>
    </div>
  </NeumorphicCard>
);

const AgentPerformanceSnapshot = () => (
  <NeumorphicCard>
    <h2 className="text-lg font-bold mb-2">Agent Performance Snapshot</h2>
    <div className="flex justify-between items-center">
      <div className="flex flex-col items-center">
        <Star className="text-yellow-400 mb-1" size={20} />
        <span className="font-semibold">4.7</span>
        <span className="text-xs text-gray-500">Avg Rating</span>
      </div>
      <div className="flex flex-col items-center">
        <Users className="text-blue-500 mb-1" size={20} />
        <span className="font-semibold">120</span>
        <span className="text-xs text-gray-500">Users</span>
      </div>
      <div className="flex flex-col items-center">
        <TrendingUp className="text-green-500 mb-1" size={20} />
        <span className="font-semibold">1,250</span>
        <span className="text-xs text-gray-500">Run Count</span>
      </div>
    </div>
  </NeumorphicCard>
);

const ValidationStatusUpdates = () => (
  <NeumorphicCard>
    <h2 className="text-lg font-bold mb-2">Validation Status Updates</h2>
    <ul className="space-y-2">
      <li className="flex items-center text-green-600"><CheckCircle size={16} className="mr-2" />Agent "Invoice Processor" approved.</li>
      <li className="flex items-center text-yellow-600"><RefreshCcw size={16} className="mr-2" />Agent "HR Onboarding" under review.</li>
      <li className="flex items-center text-red-600"><ThumbsUp size={16} className="mr-2" />Agent "Sales Qualifier" needs revision.</li>
    </ul>
  </NeumorphicCard>
);

// Enterprise Widgets
const RecentlyUsedAgents = () => (
  <NeumorphicCard>
    <h2 className="text-lg font-bold mb-2">Recently Used Agents</h2>
    <ul className="space-y-2">
      <li className="flex items-center"><Zap size={16} className="mr-2 text-blue-500" />Invoice Processor</li>
      <li className="flex items-center"><Zap size={16} className="mr-2 text-blue-500" />Customer Support Bot</li>
    </ul>
  </NeumorphicCard>
);

const BookmarkedAgents = () => (
  <NeumorphicCard>
    <h2 className="text-lg font-bold mb-2">Bookmarked / Subscribed Agents</h2>
    <ul className="space-y-2">
      <li className="flex items-center"><BookOpen size={16} className="mr-2 text-purple-500" />HR Onboarding Assistant</li>
    </ul>
  </NeumorphicCard>
);

const UsageStats = () => (
  <NeumorphicCard>
    <h2 className="text-lg font-bold mb-2">Usage Stats</h2>
    <div className="flex justify-between">
      <div className="text-center">
        <span className="font-semibold">23</span>
        <div className="text-xs text-gray-500">Runs this week</div>
      </div>
      <div className="text-center">
        <span className="font-semibold">+12%</span>
        <div className="text-xs text-green-500">ROI Impact</div>
      </div>
    </div>
  </NeumorphicCard>
);

const TryNewAgent = () => (
  <NeumorphicCard>
    <h2 className="text-lg font-bold mb-2">Try a new agent</h2>
    <div className="flex items-center">
      <Zap size={20} className="text-blue-500 mr-2" />
      <span>Smart Invoice Extractor</span>
    </div>
  </NeumorphicCard>
);

// Contextual Panel (right column)
const ContextualPanel = ({ role }: { role: UserRole }) => (
  <div className="space-y-6">
    {role === 'developer' ? (
      <ValidationStatusUpdates />
    ) : (
      <>
        <RecentlyUsedAgents />
        <TryNewAgent />
      </>
    )}
  </div>
);

const DashboardHome = ({ role }: { role: UserRole }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content Pane */}
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          {role === 'developer' ? 'Your Agent Space' : 'Your Active Workflows'}
        </h1>
        {role === 'developer' ? (
          <>
            <MyAgentsOverview />
            <AgentPerformanceSnapshot />
          </>
        ) : (
          <>
            <BookmarkedAgents />
            <UsageStats />
          </>
        )}
      </div>
      {/* Right Contextual Panel */}
      <div className="hidden lg:block">
        <ContextualPanel role={role} />
      </div>
    </div>
  );
};

export default DashboardHome; 