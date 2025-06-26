import React, { useState } from 'react';
import { User, Settings as SettingsIcon, Bell, HelpCircle, LogOut, Moon, Sun } from 'lucide-react';

const TABS = [
  { key: 'account', label: 'Account Info', icon: <User size={16} /> },
  { key: 'mode', label: 'Mode Preferences', icon: <SettingsIcon size={16} /> },
  { key: 'notifications', label: 'Notification Preferences', icon: <Bell size={16} /> },
  { key: 'support', label: 'Support & Help', icon: <HelpCircle size={16} /> },
  { key: 'logout', label: 'Logout', icon: <LogOut size={16} /> },
];

const mockUser = {
  name: 'Sathwik Reddy',
  email: 'sathwik@example.com',
  role: 'Developer',
  defaultMode: 'developer',
  emailNotifications: true,
  inAppNotifications: true,
};

const AccountInfo = () => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">Name</label>
      <input type="text" value={mockUser.name} disabled className="mt-1 w-full rounded-md border-gray-300 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200" />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Email</label>
      <input type="email" value={mockUser.email} disabled className="mt-1 w-full rounded-md border-gray-300 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200" />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Role</label>
      <input type="text" value={mockUser.role} disabled className="mt-1 w-full rounded-md border-gray-300 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200" />
    </div>
  </div>
);

const ModePreferences = () => (
  <div className="space-y-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">Default Mode</label>
    <div className="flex gap-4">
      <button className={`px-4 py-2 rounded-full border ${mockUser.defaultMode === 'developer' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Developer</button>
      <button className={`px-4 py-2 rounded-full border ${mockUser.defaultMode === 'business' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Business</button>
    </div>
  </div>
);

const NotificationPreferences = () => {
  const [email, setEmail] = useState(mockUser.emailNotifications);
  const [inApp, setInApp] = useState(mockUser.inAppNotifications);
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input type="checkbox" checked={email} onChange={() => setEmail(!email)} id="emailNotif" className="accent-blue-600" />
        <label htmlFor="emailNotif" className="text-sm">Email Notifications</label>
      </div>
      <div className="flex items-center gap-3">
        <input type="checkbox" checked={inApp} onChange={() => setInApp(!inApp)} id="inAppNotif" className="accent-blue-600" />
        <label htmlFor="inAppNotif" className="text-sm">In-App Notifications</label>
      </div>
    </div>
  );
};

const SupportHelp = () => (
  <div className="space-y-4">
    <p className="text-gray-700 dark:text-gray-200">Need help? Contact <a href="mailto:support@openagents.ai" className="text-blue-600 underline">support@openagents.ai</a> or visit our <a href="#" className="text-blue-600 underline">Help Center</a>.</p>
  </div>
);

const Logout = () => (
  <div className="space-y-4">
    <button className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700">Log Out</button>
  </div>
);

const TAB_CONTENT: Record<string, React.ReactNode> = {
  account: <AccountInfo />,
  mode: <ModePreferences />,
  notifications: <NotificationPreferences />,
  support: <SupportHelp />,
  logout: <Logout />,
};

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  return (
    <div className="w-full max-w-2xl mx-auto">
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
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        {TAB_CONTENT[activeTab]}
      </div>
    </div>
  );
};

export default Settings; 