import React, { useState } from 'react';
import { Bell, LifeBuoy } from 'lucide-react';
import { motion } from 'framer-motion';
import type { UserRole } from './Sidebar';

export const ModeToggle = ({ role, setRole }: { role: UserRole, setRole: (r: UserRole) => void }) => {
  const isDeveloper = role === 'developer';
  return (
    <div className="relative flex w-64 items-center rounded-full bg-gray-100 dark:bg-gray-800 p-1">
      <motion.div
        className="absolute h-full w-1/2 rounded-full bg-white dark:bg-gray-900 shadow-md"
        layout
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        initial={{ x: isDeveloper ? 0 : '100%' }}
        animate={{ x: isDeveloper ? 0 : '100%' }}
      />
      <button
        onClick={() => setRole('developer')}
        className={`relative z-10 w-1/2 rounded-full py-2 text-sm font-semibold transition-colors ${role === 'developer' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
      >
        👨‍💻 Developer
      </button>
      <button
        onClick={() => setRole('enterprise')}
        className={`relative z-10 w-1/2 rounded-full py-2 text-sm font-semibold transition-colors ${role === 'enterprise' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
      >
        👔 Business
      </button>
    </div>
  );
};

const TopBar = ({
  role,
  setRole,
  userName = 'Sathwik Reddy',
  userInitial = 'S',
  onNotificationClick,
  onHelpClick
}: {
  role: UserRole,
  setRole: (r: UserRole) => void,
  userName?: string,
  userInitial?: string,
  onNotificationClick?: () => void,
  onHelpClick?: () => void
}) => {
  const [notifOpen, setNotifOpen] = useState(false);
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 h-16">
      {/* Left: App Name */}
      <div className="font-bold text-lg tracking-tight text-blue-700 dark:text-blue-400">OpenAgents</div>
      {/* Center: Mode Toggle */}
      <div className="flex-1 flex justify-center">
        <ModeToggle role={role} setRole={setRole} />
      </div>
      {/* Right: Icons and User */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-gray-800"
            onClick={() => { setNotifOpen(!notifOpen); onNotificationClick && onNotificationClick(); }}
            aria-label="Notifications"
          >
            <Bell size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 shadow-lg rounded-lg p-4 z-50">
              <p className="text-sm text-gray-700 dark:text-gray-200 font-semibold mb-2">Notifications</p>
              <div className="text-xs text-gray-500 dark:text-gray-400">No new notifications.</div>
            </div>
          )}
        </div>
        <button
          className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-gray-800"
          onClick={onHelpClick}
          aria-label="Help"
        >
          <LifeBuoy size={20} className="text-gray-600 dark:text-gray-300" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center font-bold">
            {userInitial}
          </div>
          <div className="hidden md:block">
            <p className="font-semibold text-sm text-gray-900 dark:text-white">{userName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{role === 'developer' ? 'Developer' : 'Business User'}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar; 