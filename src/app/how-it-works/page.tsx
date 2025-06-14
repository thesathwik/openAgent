'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components';

type TabType = 'developers' | 'enterprises';

const TOGGLE_TABS = [
  { key: 'developers', label: '👨‍💻 Developers' },
  { key: 'enterprises', label: '🏢 Enterprises' },
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState<TabType>('developers');

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Spacer for Navbar height */}
      <div className="h-[72px] w-full" />
      {/* Neumorphic Pill-style Sticky Tab Switcher (pressed-in look, extra compact) */}
      <div className="sticky top-[72px] z-30 w-full flex justify-center">
        <div className="w-full max-w-xs px-2">
          <div
            className="relative flex h-8 items-center bg-gray-100 rounded-full border border-gray-200 shadow-inner"
            style={{
              boxShadow:
                'inset 2px 2px 8px 0 rgba(180, 200, 255, 0.18), inset -2px -2px 8px 0 rgba(120, 130, 180, 0.08)',
            }}
          >
            {/* Animated pressed-in background */}
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              className="absolute top-1 left-1 h-6 w-1/2 rounded-full"
              style={{
                x: activeTab === 'developers' ? 0 : '100%',
                width: 'calc(50% - 0.5rem)',
                background:
                  'linear-gradient(145deg, #e5eaff 60%, #f3f6fd 100%)',
                boxShadow:
                  'inset 2px 2px 8px 0 rgba(120, 130, 180, 0.10), inset -2px -2px 8px 0 rgba(255,255,255,0.7)',
                border: '1.5px solid #dbeafe',
                zIndex: 1,
              }}
            />
            {/* Toggle buttons */}
            {TOGGLE_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as TabType)}
                className={`relative z-10 flex-1 h-6 rounded-full text-[13px] font-semibold transition-all duration-200
                  ${activeTab === tab.key ? 'text-blue-700' : 'text-gray-500 hover:text-blue-700'}`}
                style={{
                  fontWeight: activeTab === tab.key ? 700 : 500,
                  transition: 'color 0.2s cubic-bezier(0.4,0,0.2,1)',
                  background: 'transparent',
                  boxShadow: 'none',
                  padding: '0 0.25rem',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Spacer for sticky switcher */}
      <div className="h-8" />
      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'developers' ? (
            <motion.div
              key="developers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DevelopersFlow />
            </motion.div>
          ) : (
            <motion.div
              key="enterprises"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <EnterprisesFlow />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quality & Support Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <QualitySupportSection />
        </div>
      </div>

      {/* Getting Started Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GettingStartedSection />
        </div>
      </div>

      {/* Final Quote Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-3xl font-serif italic text-gray-800">
            "There's an agent for that."
          </p>
          <p className="mt-4 text-lg text-gray-600">
            Empower your workflow. Or someone else's.
          </p>
        </div>
      </div>
    </div>
  );
}

// Component for Developers Flow
function DevelopersFlow() {
  return (
    <div className="space-y-12">
      <h2 className="text-3xl font-bold text-black text-center mb-12">
        Share Your AI Agent in 3 Simple Steps
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Step 1 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-2xl mb-4">🛠️</div>
          <h3 className="text-xl font-semibold mb-2">Step 1: Create Your Agent</h3>
          <p className="text-gray-800 mb-4">
            Follow our standardized Python template to create your agent
          </p>
          <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
            <pre>agent.yaml</pre>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-2xl mb-4">📤</div>
          <h3 className="text-xl font-semibold mb-2">Step 2: Upload to OpenAgent</h3>
          <p className="text-gray-800 mb-4">
            Drag & drop or use our file picker to upload your agent
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              Drop your files here
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-2xl mb-4">🌟</div>
          <h3 className="text-xl font-semibold mb-2">Step 3: Your Agent Goes Live</h3>
          <p className="text-gray-800 mb-4">
            Reach enterprises instantly with your deployed agent
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400">★</span>
              <span className="text-sm text-gray-700">4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Get Started
        </button>
        <button className="ml-4 text-blue-600 hover:text-blue-700 font-medium">
          Preview Agent Template
        </button>
      </div>
    </div>
  );
}

// Component for Enterprises Flow
function EnterprisesFlow() {
  return (
    <div className="space-y-12">
      <h2 className="text-3xl font-bold text-black text-center mb-12">
        Deploy AI Agents in 3 Easy Steps
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Step 1 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-2xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">Step 1: Discover the Perfect Agent</h3>
          <p className="text-gray-800 mb-4">
            Browse our marketplace to find the right agent for your needs
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">#Productivity</span>
            <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm">#Finance</span>
            <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm">#NLP</span>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-2xl mb-4">📥</div>
          <h3 className="text-xl font-semibold mb-2">Step 2: Download & Setup</h3>
          <p className="text-gray-800 mb-4">
            Simple integration with your existing systems
          </p>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-700">
              <span className="mr-2">✓</span> README included
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <span className="mr-2">✓</span> Sample data
            </div>
            <div className="flex items-center text-sm text-gray-700">
              <span className="mr-2">✓</span> Tutorial videos
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="text-2xl mb-4">🚀</div>
          <h3 className="text-xl font-semibold mb-2">Step 3: Integrate & Use</h3>
          <p className="text-gray-800 mb-4">
            Transform your workflows with AI automation
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-700">
              <div className="font-medium mb-1">Before OpenAgent:</div>
              <div>Hours of manual email triage</div>
              <div className="font-medium mt-2 mb-1">After OpenAgent:</div>
              <div>Automated replies with 95% accuracy</div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Browse Marketplace
        </button>
        <button className="ml-4 text-blue-600 hover:text-blue-700 font-medium">
          Book a Demo
        </button>
      </div>
    </div>
  );
}

// Component for Quality & Support Section
function QualitySupportSection() {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-black mb-12">Quality & Support</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-2xl mb-4">🛡️</div>
          <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
          <ul className="text-gray-800 space-y-2">
            <li>Auto-validation</li>
            <li>Structure verification</li>
            <li>Performance testing</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-2xl mb-4">🤝</div>
          <h3 className="text-xl font-semibold mb-2">Support System</h3>
          <ul className="text-gray-800 space-y-2">
            <li>Self-service docs</li>
            <li>Community support</li>
            <li>Direct email support</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-2xl mb-4">🔄</div>
          <h3 className="text-xl font-semibold mb-2">Updates & Maintenance</h3>
          <ul className="text-gray-800 space-y-2">
            <li>Version tracking</li>
            <li>Dashboard control</li>
            <li>Regular updates</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Component for Getting Started Section
function GettingStartedSection() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-black text-center mb-12">Getting Started</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Developers Column */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold mb-6">For Developers</h3>
          <ol className="space-y-4">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">1</span>
              <span>Review Standards Guide</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">2</span>
              <span>Download Agent Template</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">3</span>
              <span>Build your agent</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">4</span>
              <span>Upload & go live</span>
            </li>
          </ol>
          <button className="mt-6 w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Get Started
          </button>
        </div>

        {/* Enterprises Column */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold mb-6">For Enterprises</h3>
          <ol className="space-y-4">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3">1</span>
              <span>Explore Marketplace</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3">2</span>
              <span>Find your solution</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3">3</span>
              <span>Deploy in minutes</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3">4</span>
              <span>Transform workflows</span>
            </li>
          </ol>
          <button className="mt-6 w-full bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
} 