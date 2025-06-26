import React from 'react';
import { Home, Library, Box, BarChart2, UploadCloud, MessageSquare, ChevronsLeft, ChevronsRight } from 'lucide-react';

export type UserRole = 'developer' | 'enterprise';

const menuItems = [
  { icon: <Home size={20} />, label: 'Dashboard Home', href: '/user/dashboard', devOnly: false },
  { icon: <Library size={20} />, label: 'My Library', href: '/user/library', devOnly: false },
  { icon: <Box size={20} />, label: 'Submit New Agent', href: '/user/submit', devOnly: true },
  { icon: <BarChart2 size={20} />, label: 'Agent Stats', href: '/user/stats', devOnly: true },
  { icon: <MessageSquare size={20} />, label: 'Validation Feedback', href: '/user/feedback', devOnly: true },
];

export const Sidebar = ({ role, isCollapsed, setCollapsed, setRole, activePath }: {
  role: UserRole,
  isCollapsed: boolean,
  setCollapsed: (c: boolean) => void,
  setRole: (r: UserRole) => void,
  activePath?: string
}) => {
  return (
    <div className={`h-full transition-all duration-300 border-r border-gray-200 flex flex-col bg-white/70 backdrop-blur-lg ${isCollapsed ? 'w-20' : 'w-60'}`}> 
      <div className="flex items-center justify-between p-4 h-16 border-b">
        {!isCollapsed && <h1 className="font-bold text-lg tracking-tight">OpenAgents</h1>}
        <button onClick={() => setCollapsed(!isCollapsed)} className="p-1 rounded-md hover:bg-gray-100">
          {isCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
        </button>
      </div>
      <nav className="flex-grow p-2 space-y-1">
        {menuItems.filter(item => role === 'developer' || !item.devOnly).map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`flex items-center p-3 rounded-md transition-colors font-medium text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 ${activePath === item.href ? 'bg-blue-50 text-blue-700' : ''}`}
          >
            {item.icon}
            {!isCollapsed && <span className="ml-4">{item.label}</span>}
          </a>
        ))}
      </nav>
      <div className="mt-auto p-2">
        {/* Mode toggle can be slotted here if needed */}
      </div>
    </div>
  );
};

export default Sidebar; 