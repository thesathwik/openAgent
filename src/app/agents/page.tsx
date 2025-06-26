'use client';
import React, { useState, useRef, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '../components';
import { motion, AnimatePresence } from 'framer-motion';

const AGENTS = [
  {
    id: 1,
    name: 'LexiAI',
    description: 'Summarizes legal contracts with high accuracy.',
    tags: ['Finance', 'NLP'],
    icon: '🧠',
    category: 'finance',
    rating: 4.9,
    dateAdded: '2023-01-15',
    popularity: 100,
  },
  {
    id: 2,
    name: 'SupportBot',
    description: 'Handles support tickets using intent-based triage.',
    tags: ['Customer Support', 'Productivity'],
    icon: '🤖',
    category: 'support',
    rating: 4.7,
    dateAdded: '2023-02-01',
    popularity: 90,
  },
  {
    id: 3,
    name: 'DevOps Genie',
    description: 'Deploys and monitors cloud infrastructure automatically.',
    tags: ['DevOps', 'OpenSource'],
    icon: '🛠️',
    category: 'operations',
    rating: 4.8,
    dateAdded: '2023-03-10',
    popularity: 85,
  },
  {
    id: 4,
    name: 'Insightly',
    description: 'Extracts insights from business data for smarter decisions.',
    tags: ['Finance', 'Productivity'],
    icon: '📊',
    category: 'data',
    rating: 4.6,
    dateAdded: '2023-04-20',
    popularity: 70,
  },
  {
    id: 5,
    name: 'Sales Pilot',
    description: 'Automates lead qualification and outreach sequences.',
    tags: ['Sales', 'CRM'],
    icon: '🚀',
    category: 'sales',
    rating: 4.9,
    dateAdded: '2023-05-01',
    popularity: 110,
  },
  {
    id: 6,
    name: 'Market Maestro',
    description: 'Generates personalized marketing copy and campaigns.',
    tags: ['Marketing', 'Content'],
    icon: '✍️',
    category: 'marketing',
    rating: 4.5,
    dateAdded: '2023-05-10',
    popularity: 80,
  },
  {
    id: 7,
    name: 'Budget Buddy',
    description: 'Tracks expenses, forecasts budgets, and identifies savings.',
    tags: ['Finance', 'Accounting'],
    icon: '💰',
    category: 'finance',
    rating: 4.8,
    dateAdded: '2023-06-01',
    popularity: 95,
  },
  {
    id: 8,
    name: 'Talent Scout',
    description: 'Screens resumes, schedules interviews, and streamlines hiring.',
    tags: ['HR', 'Recruitment'],
    icon: '🌟',
    category: 'hr',
    rating: 4.7,
    dateAdded: '2023-06-15',
    popularity: 75,
  },
  {
    id: 9,
    name: 'Process Pro',
    description: 'Automates routine operational tasks to boost efficiency.',
    tags: ['Operations', 'Automation'],
    icon: '⚙️',
    category: 'operations',
    rating: 4.6,
    dateAdded: '2023-07-01',
    popularity: 65,
  },
  {
    id: 10,
    name: 'Chart Genius',
    description: 'Creates interactive data visualizations and automates reports.',
    tags: ['Data', 'Visualization'],
    icon: '📈',
    category: 'data',
    rating: 4.9,
    dateAdded: '2023-07-10',
    popularity: 105,
  },
  {
    id: 11,
    name: 'Legal Eagle',
    description: 'Drafts legal documents and ensures compliance.',
    tags: ['Legal', 'Compliance'],
    icon: '⚖️',
    category: 'finance',
    rating: 4.7,
    dateAdded: '2023-08-01',
    popularity: 92,
  },
  {
    id: 12,
    name: 'EduMind',
    description: 'Provides personalized learning assistance for employee development.',
    tags: ['HR', 'Training'],
    icon: '📚',
    category: 'hr',
    rating: 4.6,
    dateAdded: '2023-08-15',
    popularity: 78,
  },
];

type CategoryType = {
  id: string;
  icon: string;
  title: string;
  description: string;
  agentCount: number;
  colorTheme: string;
};

const CATEGORIES: CategoryType[] = [
  {
    id: 'sales',
    icon: '📈',
    title: 'Sales',
    description: 'Automate lead generation, follow-ups, and CRM updates.',
    agentCount: 0,
    colorTheme: '#E0F2FE', // Light Blue
  },
  {
    id: 'marketing',
    icon: '📣',
    title: 'Marketing',
    description: 'Streamline content, campaigns, and customer engagement.',
    agentCount: 0,
    colorTheme: '#FDE2E4', // Light Pink
  },
  {
    id: 'product',
    icon: '🛠️',
    title: 'Product / Service Delivery',
    description: 'Speed up shipping, logistics, and service coordination.',
    agentCount: 0,
    colorTheme: '#FEF9E7', // Light Yellow
  },
  {
    id: 'support',
    icon: '💬',
    title: 'Customer Support',
    description: 'Handle FAQs, tickets, and feedback automatically.',
    agentCount: 0,
    colorTheme: '#FFF4E5', // Light Orange
  },
  {
    id: 'finance',
    icon: '💰',
    title: 'Finance & Accounting',
    description: 'Process invoices, track budgets, and ensure compliance.',
    agentCount: 0,
    colorTheme: '#E2F7E1', // Soft Green
  },
  {
    id: 'hr',
    icon: '🧑‍💼',
    title: 'HR & Talent',
    description: 'Automate recruitment, onboarding, and internal workflows.',
    agentCount: 0,
    colorTheme: '#E9E7FD', // Lavender
  },
  {
    id: 'operations',
    icon: '⚙️',
    title: 'Operations',
    description: 'Optimize internal processes and improve team efficiency.',
    agentCount: 0,
    colorTheme: '#F5F5F5', // Pale Gray
  },
  {
    id: 'data',
    icon: '📊',
    title: 'Data & Analytics',
    description: 'Extract insights, visualize trends, and automate reports.',
    agentCount: 0,
    colorTheme: '#D0F0F8', // Teal Blue
  },
];

function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-4">
      <div className="relative w-full max-w-2xl">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
        </span>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Describe your problem or search by agent name, function, or need…"
          className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 bg-white text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-200 shadow-sm focus-within:shadow-lg"
        />
      </div>
      <div className="mt-2 text-sm text-gray-600 text-center max-w-xl">
        You can describe your business problem in plain English—our AI will match you to the best agent for your needs.
      </div>
    </div>
  );
}

type SortOption = 'popularity' | 'dateAdded' | 'category';

// Helper to darken color for gradient (simple approach, for more robust use a color library)
function darkenColor(hex: string, percent: number) {
  const f = parseInt(hex.slice(1), 16);
  const t = percent < 0 ? 0 : 255;
  const p = percent < 0 ? percent * -1 : percent;
  const R = f >> 16;
  const G = (f >> 8) & 0x00FF;
  const B = f & 0x0000FF;
  return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
}

type Agent = typeof AGENTS[0]; // Type for a single agent

type CategoryDockProps = {
  categories: CategoryType[];
  active: string;
  onSelect: (id: string) => void;
  agentCounts: Record<string, number>;
};

function CategoryDock({ categories, active, onSelect, agentCounts }: CategoryDockProps) {
  const dockRef = useRef<HTMLDivElement>(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);

  // Handle scroll shadows
  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const handleScroll = () => {
      setShowLeftShadow(dock.scrollLeft > 0);
      setShowRightShadow(dock.scrollLeft < dock.scrollWidth - dock.clientWidth - 1);
    };

    dock.addEventListener('scroll', handleScroll);
    // Initial check and ensure shadow is shown if content overflows on load
    const initialCheck = () => {
      setShowLeftShadow(dock.scrollLeft > 0);
      setShowRightShadow(dock.scrollWidth > dock.clientWidth + 1);
    };
    initialCheck(); // Initial check on mount

    // Re-check on resize
    window.addEventListener('resize', initialCheck);

    return () => {
      dock.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', initialCheck);
    };
  }, [categories]); // Re-run effect if categories change (e.g., counts update)

  // Combine "All Agents" with other categories
  const allCategories = [
    {
      id: 'all',
      icon: '✨',
      title: 'All Agents',
      description: 'View all available agents',
      agentCount: agentCounts['all'] || 0,
      colorTheme: '#F8FAFC', // Neutral color for All Agents
    },
    ...categories
  ];

  return (
    <div className="relative w-full">
      {/* Left Shadow */}
      {showLeftShadow && (
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
      )}
      {/* Right Shadow */}
      {showRightShadow && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      )}
      
      {/* Category Dock */}
      <div 
        ref={dockRef}
        className="flex gap-4 overflow-x-auto pb-4 px-4 scrollbar-hide scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Category Tiles */}
        {allCategories.map(category => {
          const isActive = active === category.id;
          const count = agentCounts[category.id] || 0;
          
          // Define background style based on colorTheme, with a fallback for 'all' or if not defined
          const backgroundColor = category.colorTheme || '#F8FAFC'; // Default for All Agents or missing

          return (
            <button
              key={category.id}
              onClick={() => {
                if (isActive) {
                  onSelect('all'); // Deselect if already active
                } else {
                  onSelect(category.id);
                  if (category.id !== 'all') {
                    const element = document.getElementById(`category-${category.id}`);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }
              }}
              className={`group flex-shrink-0 w-[140px] h-[100px] rounded-xl p-3 flex flex-col items-center justify-center transition-all duration-200 snap-start
                ${isActive 
                  ? 'shadow-md scale-[1.02] border-transparent' 
                  : 'hover:shadow-md hover:scale-[1.02] border-gray-200'
                } border shadow-sm`}
                style={{
                  backgroundColor: isActive ? darkenColor(backgroundColor, 10) : backgroundColor 
                }}
                title={category.title} // Add title for tooltip
              >
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-xl mb-1 group-hover:animate-icon-pulse">
                  {category.icon}
                </div>
                <div className="flex flex-col items-center justify-center flex-grow-0 min-h-0 overflow-hidden w-full">
                  <div 
                    className={`font-semibold text-sm leading-tight text-center break-words transition-colors duration-200 ${isActive ? 'text-white' : 'text-black'}`}
                    style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', hyphens: 'auto' }}
                  >{category.title}</div>
                  {category.id !== 'all' && (
                    <div className={`text-xs text-center w-full ${isActive ? 'text-white' : (count > 0 ? 'text-black' : 'text-gray-400')}`}>
                      {count > 0 ? `+${count} agents` : '0 agents'}
                    </div>
                  )}
                </div>
              </button>
          );
        })}
      </div>

      {/* Mobile Scroll Indicator */}
      <div className="md:hidden flex justify-center mt-2">
        <div className="w-12 h-1 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
}

const groupAgentsByCategory = (agents: Agent[]): Record<string, Agent[]> => {
  return agents.reduce((acc: Record<string, Agent[]>, agent) => {
    if (!acc[agent.category]) {
      acc[agent.category] = [];
    }
    acc[agent.category].push(agent);
    return acc;
  }, {} as Record<string, Agent[]>);
};

type CategorySectionProps = {
  category: CategoryType;
  agents: Agent[];
};

function CategorySection({ category, agents }: CategorySectionProps) {
  const featuredAgents = agents.slice(0, 3); // Show top 3 featured agents
  const hasMoreAgents = agents.length > featuredAgents.length;

  return (
    <div className="mb-16" id={`category-${category.id}`}>
      <h2 className="text-2xl font-semibold text-black mb-2">
        {category.title} Agents <span className="text-gray-600 text-lg">({agents.length} Agents)</span>
      </h2>
      <p className="text-gray-700 mb-6">{category.description}</p>
      {agents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredAgents.map(agent => (
            <AgentCard
              key={agent.id}
              name={agent.name}
              description={agent.description}
              tags={agent.tags}
              icon={agent.icon || "🤖"}
              rating={agent.rating || 5}
              onClick={() => {}}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col items-center justify-center text-center" style={{ minHeight: 180 }}>
            <span className="text-5xl mb-4 text-gray-300">🚧</span>
            <div className="font-bold text-lg text-gray-700 mb-1">Coming Soon</div>
            <div className="text-sm text-gray-600">Agents in this category are still in training.</div>
          </div>
        </div>
      )}

      {hasMoreAgents && (
        <div className="text-center mt-10">
          <Link
            href={`/agents?category=${category.id}`}
            className="inline-block bg-white border border-gray-300 text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-50 transition-colors"
          >
            Explore Other Categories
          </Link>
        </div>
      )}
    </div>
  );
}

// MobileSortBottomSheet Component
type MobileSortBottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  sortBy: SortOption;
  setSortBy: (option: SortOption) => void;
};

function MobileSortBottomSheet({ isOpen, onClose, sortBy, setSortBy }: MobileSortBottomSheetProps) {
  const handleSelect = (option: SortOption) => {
    setSortBy(option);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-end md:hidden"
          onClick={onClose} // Close when clicking backdrop
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="bg-white w-full rounded-t-2xl p-4 shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside sheet
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Sort Agents By</h3>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none min-w-[44px] min-h-[44px]">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleSelect('popularity')}
                  className={`w-full text-left px-4 py-3 rounded-md font-medium text-gray-800 transition-colors hover:bg-gray-100 focus:outline-none min-w-[44px] min-h-[44px] ${sortBy === 'popularity' ? 'bg-blue-50 text-blue-700' : ''}`}
                >
                  🔥 Popular
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSelect('dateAdded')}
                  className={`w-full text-left px-4 py-3 rounded-md font-medium text-gray-800 transition-colors hover:bg-gray-100 focus:outline-none min-w-[44px] min-h-[44px] ${sortBy === 'dateAdded' ? 'bg-blue-50 text-blue-700' : ''}`}
                >
                  🆕 Recently Added
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleSelect('category')}
                  className={`w-full text-left px-4 py-3 rounded-md font-medium text-gray-800 transition-colors hover:bg-gray-100 focus:outline-none min-w-[44px] min-h-[44px] ${sortBy === 'category' ? 'bg-blue-50 text-blue-700' : ''}`}
                >
                  🛠️ By Category
                </button>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type AgentCardProps = {
  name: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  rating?: number;
  onClick: () => void;
  hidePreviewButton?: boolean;
  children?: React.ReactNode;
};

function AgentCard({ name, description, tags, icon, rating, onClick, hidePreviewButton = false, children }: AgentCardProps) {
  const emojiMotion = {
    rest: { y: 0, scale: 1, transition: { type: 'spring' as const, stiffness: 200, damping: 10 } },
    hover: { y: -6, scale: 1.15, transition: { type: 'spring' as const, stiffness: 300, damping: 12 } },
  };

  return (
    <div 
      className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col items-start group hover:scale-[1.02] cursor-pointer hover:bg-gray-50 h-[340px] flex flex-col justify-between"
      onClick={onClick}
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 via-pink-100 to-white flex items-center justify-center text-2xl mb-3 shadow-inner">{icon}</div>
      <div className="font-semibold text-lg text-gray-800 mb-1 truncate w-full">{name}</div>
      <div className="text-gray-500 text-sm mb-2 line-clamp-2 w-full leading-relaxed">{description}</div>
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
      {!hidePreviewButton && (
        <button className="mt-auto bg-blue-600 text-white px-5 py-2 rounded-full font-semibold text-sm shadow hover:bg-blue-700 hover:shadow-lg transition-all duration-200 focus:outline-none w-full sm:w-auto">Preview Agent</button>
      )}
      {children && <div className="w-full">{children}</div>}
    </div>
  );
}

export default function ExploreAgentsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [isSortBottomSheetOpen, setIsSortBottomSheetOpen] = useState(false);
  const [recommendedAgents, setRecommendedAgents] = useState<any[]>([]); // New state for API results
  const [loading, setLoading] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedCategory = localStorage.getItem('openagents_selectedCategory');
    const savedSort = localStorage.getItem('openagents_sort');

    if (savedCategory) {
      setActiveCategory(savedCategory);
    }
    if (savedSort) {
      setSortBy(savedSort as SortOption);
    }
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('openagents_selectedCategory', activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    localStorage.setItem('openagents_sort', sortBy);
  }, [sortBy]);

  const agentsGrouped = useMemo(() => groupAgentsByCategory(AGENTS), []);

  const agentCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    CATEGORIES.forEach(cat => {
      counts[cat.id] = agentsGrouped[cat.id]?.length || 0;
    });
    counts['all'] = AGENTS.length;
    return counts;
  }, [agentsGrouped]);

  useEffect(() => {
    async function fetchRecommendedAgents() {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:8000/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: search,
            category: activeCategory === 'all' ? '' : activeCategory,
            tags: [], // Optionally add tag filtering
          }),
        });
        const data = await res.json();
        setRecommendedAgents(data);
      } catch (err) {
        setRecommendedAgents([]);
      } finally {
        setLoading(false);
      }
    }
    fetchRecommendedAgents();
  }, [search, activeCategory, sortBy]);

  return (
    <div className="relative min-h-screen bg-white pb-16 font-sans">
      <Navbar />
      <div className="max-w-4xl mx-auto pt-32 pb-10 px-4 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-black mb-4 tracking-tight text-center max-w-3xl font-sans">
          Explore Modular Intelligence
        </h1>
        <p className="text-lg text-gray-700 text-center max-w-2xl leading-relaxed mb-8">
          Browse AI agents built by the community, tailored for enterprise workflows.
        </p>
      </div>
      <div className="max-w-3xl mx-auto w-full px-4 mb-10">
        <SearchInput value={search} onChange={setSearch} />
      </div>

      {/* Category Dock */}
      <div className="max-w-6xl mx-auto w-full px-4 mb-16">
        <CategoryDock
          categories={CATEGORIES}
          active={activeCategory}
          onSelect={setActiveCategory}
          agentCounts={agentCounts}
        />
      </div>

      {/* Global Sorting Dropdown */}
      <div className="max-w-6xl mx-auto px-4 flex justify-end mb-8">
        {/* Desktop Sorting Dropdown */}
        <div className="relative hidden md:block">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as SortOption)}
            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          >
            <option value="popularity">🔥 Popular</option>
            <option value="dateAdded">🆕 Recently Added</option>
            <option value="category">🛠️ By Category</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>

        {/* Mobile Sorting Trigger Button */}
        <button
          onClick={() => setIsSortBottomSheetOpen(true)}
          className="md:hidden flex items-center gap-2 px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 font-semibold shadow-sm hover:bg-gray-50 transition-all duration-200 focus:outline-none min-w-[44px] min-h-[44px]"
          aria-label="Open sorting options"
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4H21M3 8H21M3 12H21M3 16H21M3 20H21"/>
          </svg>
          Sort
        </button>
      </div>

      {/* Agent Display Sections */}
      {activeCategory === 'all' && sortBy !== 'category' ? (
        <div className="max-w-6xl mx-auto w-full px-4 pt-10 pb-10">
          <h2 className="text-2xl font-semibold text-black mb-2">All Agents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-4">
            <AnimatePresence mode="wait">
              {recommendedAgents.length > 0 ? (
                recommendedAgents.map(agent => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    <AgentCard
                      name={agent.name}
                      description={agent.description}
                      tags={agent.tags}
                      icon={agent.icon || "🤖"}
                      rating={agent.rating || 5}
                      onClick={() => { /* TODO: Link to agent detail page */ }}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  key="no-agents-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25 }}
                  className="col-span-full text-center text-gray-700 py-12 font-sans"
                >
                  <p className="text-lg font-medium text-gray-800 mb-2">No agents match that yet.</p>
                  <p className="text-sm text-gray-600">But they&apos;re probably being built. Try adjusting your filters.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : activeCategory === 'all' && sortBy === 'category' ? (
        <div className="max-w-6xl mx-auto w-full px-4 space-y-16 pt-10 pb-10">
          {CATEGORIES.map(category => {
            const categoryAgents = agentsGrouped[category.id] || [];
            const filteredCategoryAgents = categoryAgents.filter(agent => {
              const matchesSearch =
                search === '' ||
                agent.name.toLowerCase().includes(search.toLowerCase()) ||
                agent.description.toLowerCase().includes(search.toLowerCase()) ||
                agent.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
              return matchesSearch;
            });
            return ( 
              <CategorySection
                key={category.id}
                category={{...category, agentCount: filteredCategoryAgents.length}}
                agents={filteredCategoryAgents}
              />
            );
          })}
        </div>
      ) : (
        <div className="max-w-6xl mx-auto w-full px-4 pt-10 pb-10">
          <h2 className="text-2xl font-semibold text-black mb-2">
            {CATEGORIES.find(cat => cat.id === activeCategory)?.title} Agents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-4">
            <AnimatePresence mode="wait">
              {recommendedAgents.length > 0 ? (
                recommendedAgents.map(agent => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    <AgentCard
                      name={agent.name}
                      description={agent.description}
                      tags={agent.tags}
                      icon={agent.icon || "🤖"}
                      rating={agent.rating || 5}
                      onClick={() => { /* TODO: Link to agent detail page */ }}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  key="no-matching-agents"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25 }}
                  className="col-span-full text-center text-gray-700 py-12 font-sans"
                >
                  <p className="text-lg font-medium text-gray-800 mb-2">No agents match that yet in this category.</p>
                  <p className="text-sm text-gray-600">But they&apos;re probably being built. Try adjusting your filters.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
      <MobileSortBottomSheet
        isOpen={isSortBottomSheetOpen}
        onClose={() => setIsSortBottomSheetOpen(false)}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </div>
  );
}

export { AgentCard }; 