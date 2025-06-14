'use client';

import { Navbar } from '../components';
import { useState } from 'react';

const TEMPLATE_TABS = [
  { key: 'structure', label: 'File Structure' },
  { key: 'yaml', label: 'agent.yaml' },
  { key: 'main', label: 'main.py' },
  { key: 'config', label: 'config.json' },
  { key: 'readme', label: 'README.md' },
  { key: 'env', label: '.env & Validation' },
  { key: 'quality', label: 'Quality Checklist' },
];

export default function DevelopersHub() {
  const [activeTab, setActiveTab] = useState('structure');
  const [expanded, setExpanded] = useState({
    structure: true,
    yaml: false,
    main: false,
    config: false,
    readme: false,
    env: false,
    quality: false,
  });

  const handleTabClick = (key: string) => {
    setActiveTab(key);
    setExpanded({
      structure: key === 'structure',
      yaml: key === 'yaml',
      main: key === 'main',
      config: key === 'config',
      readme: key === 'readme',
      env: key === 'env',
      quality: key === 'quality',
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      {/* Spacer for Navbar height */}
      <div className="h-[72px] w-full" />
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-br from-white via-blue-50 to-white">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-gray-800">Build AI Agents for <span className="text-blue-600 animate-typing">Enterprises</span></h1>
        <p className="text-lg md:text-2xl text-gray-800 mb-8 max-w-2xl mx-auto">Join the OpenAgents community and reach thousands of businesses looking for intelligent solutions.</p>
        <a href="#template" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow hover:bg-blue-700 transition">Get Started</a>
        {/* TODO: Add typewriter animation for 'Enterprises' */}
        {/* TODO: Add abstract geometric AI grid background */}
      </section>

      {/* Why Build for OpenAgents */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-2">🌍</span>
            <div className="font-semibold mb-1 text-gray-800">Global Reach</div>
            <div className="text-gray-800 text-sm">Deploy to enterprise users instantly</div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-2">🧱</span>
            <div className="font-semibold mb-1 text-gray-800">Standardized Framework</div>
            <div className="text-gray-800 text-sm">Easy to build and maintain</div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-2">🧠</span>
            <div className="font-semibold mb-1 text-gray-800">Own Your Agent</div>
            <div className="text-gray-800 text-sm">Control, monetize, and update</div>
          </div>
        </div>
      </section>

      {/* Agent Template & Standards */}
      <section id="template" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-black">Follow This Exact Template for Guaranteed Approval</h2>
          {/* Sticky horizontal tab menu */}
          <div className="sticky top-[80px] z-20 bg-white/95 border-b border-gray-100 mb-8">
            <div className="flex gap-2 overflow-x-auto py-2 px-1">
              {TEMPLATE_TABS.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => handleTabClick(tab.key)}
                  className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-200
                    ${activeTab === tab.key ? 'bg-blue-100 text-blue-700 shadow font-bold' : 'bg-gray-100 text-gray-600 hover:bg-blue-50'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          {/* Tab content blocks, only show the active one */}
          <div className="space-y-8">
            {/* File Structure Block */}
            {activeTab === 'structure' && (
              <TemplateBlock
                icon="📁"
                title="Required File Structure"
                desc="Every agent on OpenAgent must include exactly these four files:"
                expanded={expanded.structure}
                onToggle={() => setExpanded(e => ({ ...e, structure: !e.structure }))}
                code={`your-agent-name/
├── agent.yaml      # Agent metadata
├── main.py         # Agent code
├── config.json     # User configuration
└── README.md       # Documentation`}
                codeClass="text-black"
              />
            )}
            {/* agent.yaml Block */}
            {activeTab === 'yaml' && (
              <TemplateBlock
                icon="📝"
                title="agent.yaml - Agent Information"
                desc="Required fields for your agent metadata:"
                expanded={expanded.yaml}
                onToggle={() => setExpanded(e => ({ ...e, yaml: !e.yaml }))}
                code={`name: "your-agent-name"
display_name: "Your Agent Display Name"
description: "Brief description of what your agent does"
version: "1.0.0"
author: "your-email@domain.com"

category: "productivity"  # Options: productivity, customer-service, data-processing, content, automation, other
tags: ["tag1", "tag2", "tag3"]

language: "python"
python_version: "3.8+"
dependencies:
  - "library>=version"

api_keys_required:
  - name: "API_KEY_NAME"
    description: "What this key is used for"
    required: true

estimated_cost_per_run: "$0.00-0.00"
average_runtime: "X seconds"
input_format: "What type of input your agent expects"
output_format: "What your agent returns"

created_date: "YYYY-MM-DD"
last_updated: "YYYY-MM-DD"
license: "MIT"`}
                codeClass="text-black"
              />
            )}
            {/* main.py Block */}
            {activeTab === 'main' && (
              <TemplateBlock
                icon="🐍"
                title="main.py - Agent Code Structure"
                desc="Your agent must implement this class structure:"
                expanded={expanded.main}
                onToggle={() => setExpanded(e => ({ ...e, main: !e.main }))}
                code={`class OpenAgent:
    def __init__(self, config_path: str = "config.json"):
        # Initialize your agent
        
    def setup(self) -> None:
        # Set up API clients, load models, validate environment
        
    def validate_input(self, input_data: Any) -> tuple[bool, Optional[str]]:
        # Return (is_valid, error_message)
        
    def process(self, input_data: Any) -> Dict[str, Any]:
        # Your main agent logic
        # Must return: {"success": bool, "error": str, "result": Any, "metadata": Dict}
        
    def get_info(self) -> Dict[str, Any]:
        # Return agent information
        
    def health_check(self) -> Dict[str, Any]:
        # Check if agent is ready to use`}
                codeClass="text-black"
                extra={<p className="text-gray-800 text-xs mt-2">Required CLI interface: Must include standard command line interface, support interactive mode, and handle errors gracefully.</p>}
              />
            )}
            {/* config.json Block */}
            {activeTab === 'config' && (
              <TemplateBlock
                icon="🛠️"
                title="config.json - User Settings"
                desc="Standard configuration structure:"
                expanded={expanded.config}
                onToggle={() => setExpanded(e => ({ ...e, config: !e.config }))}
                code={`{
  "agent_settings": {
    "max_input_length": 10000,
    "timeout_seconds": 30,
    "retry_attempts": 3
  },
  "processing_options": {
    "temperature": 0.7,
    "max_tokens": 1000
  },
  "output_settings": {
    "format": "json",
    "include_metadata": true
  },
  "custom_settings": {
    "your_agent_specific_options": "here"
  }
}`}
                codeClass="text-black"
              />
            )}
            {/* README.md Block */}
            {activeTab === 'readme' && (
              <TemplateBlock
                icon="📄"
                title="README.md - Complete Documentation"
                desc="Required sections in your documentation:"
                expanded={expanded.readme}
                onToggle={() => setExpanded(e => ({ ...e, readme: !e.readme }))}
                code={`- Quick Start: prerequisites, installation, environment, test run\n- Usage: interactive, programmatic, batch\n- Configuration: options, customization\n- Input & Output: formats, limits\n- Cost & Performance: estimates, tips\n- Troubleshooting: errors, solutions, support\n- Technical Details: version, license, contact`}
                codeClass="text-black"
              />
            )}
            {/* .env & Validation Block */}
            {activeTab === 'env' && (
              <TemplateBlock
                icon="🔑"
                title=".env & Validation"
                desc="Users must create a .env file with required API keys and agent-specific variables."
                expanded={expanded.env}
                onToggle={() => setExpanded(e => ({ ...e, env: !e.env }))}
                code={`- All four required files present\n- Valid agent.yaml format with required fields\n- OpenAgent class with all required methods\n- Standard CLI interface implementation\n- Complete README documentation\n- Proper error handling\n- Working configuration system`}
                codeClass="text-black"
              />
            )}
            {/* Quality Checklist Block */}
            {activeTab === 'quality' && (
              <TemplateBlock
                icon="✅"
                title="Quality Checklist"
                desc=""
                expanded={expanded.quality}
                onToggle={() => setExpanded(e => ({ ...e, quality: !e.quality }))}
                code={`- Code must handle errors gracefully\n- Documentation must be complete and clear\n- Configuration must be user-friendly\n- Agent must work out-of-the-box after setup\n- Performance estimates must be accurate`}
                codeClass="text-black"
              />
            )}
          </div>
        </div>
      </section>

      {/* Auto-Validation Checklist */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4 text-black">We Auto-Validate Your Agent Before Publishing</h2>
          <ul className="list-disc list-inside text-gray-800 mb-4">
            <li>All required files present</li>
            <li>Valid <span className="font-mono">agent.yaml</span> and <span className="font-mono">main.py</span></li>
            <li>Standard CLI interface</li>
            <li>Complete documentation</li>
            <li>Error handling and configuration</li>
          </ul>
          {/* TODO: Add tooltips and bar meter */}
        </div>
      </section>

      {/* Quality Standards + Tips */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold mb-2 text-black">Code Standards</h3>
            <ul className="list-disc list-inside text-gray-800 text-xs">
              <li>Must work out-of-the-box</li>
              <li>Avoid hardcoded values</li>
              <li>Graceful error handling</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold mb-2 text-black">Documentation Standards</h3>
            <ul className="list-disc list-inside text-gray-800 text-xs">
              <li>Complete README</li>
              <li>Clear usage instructions</li>
              <li>Configuration explained</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold mb-2 text-black">Configuration & Performance</h3>
            <ul className="list-disc list-inside text-gray-800 text-xs">
              <li>User-friendly config</li>
              <li>Performance estimates</li>
              <li>Optimization tips</li>
            </ul>
          </div>
        </div>
        {/* Optional Pro Tip Card */}
        <div className="max-w-2xl mx-auto mt-8">
          <div className="bg-blue-100 rounded-xl p-4 text-blue-900 text-sm font-mono">Pro Tip: Follow the template exactly for guaranteed acceptance and faster review!</div>
        </div>
      </section>

      {/* Deploy Your Agent CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-blue-100 text-center">
        <h2 className="text-3xl font-bold mb-4 text-black">Ready to Go Live?</h2>
        <p className="text-lg text-gray-800 mb-8">Submit your agent now and make it available to the world.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow hover:bg-blue-700 transition">Deploy Your Agent</a>
          <a href="#" className="bg-white border border-blue-600 text-blue-700 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-50 transition">Download Template (ZIP)</a>
        </div>
        {/* TODO: Add confetti or Lottie animation */}
      </section>

      {/* Footer Additions for Devs */}
      <footer className="py-8 bg-gray-50 text-center text-sm text-gray-800">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#" className="hover:underline">Developer Docs</a>
          <a href="#" className="hover:underline">Discord/Community</a>
          <a href="#" className="hover:underline">GitHub</a>
        </div>
      </footer>
    </div>
  );
}

// TemplateBlock component
function TemplateBlock({ icon, title, desc, code, expanded, onToggle, codeClass, extra }: any) {
  return (
    <div className="rounded-xl p-6 bg-white border border-gray-100 shadow-sm">
      <div className="flex items-center mb-2">
        <span className="mr-2 text-xl">{icon}</span>
        <span className="font-semibold text-gray-800">{title}</span>
      </div>
      <p className="text-gray-800 text-sm mb-2">{desc}</p>
      <button
        className="text-xs text-blue-600 hover:underline mb-2 focus:outline-none"
        onClick={onToggle}
        aria-expanded={expanded}
      >
        {expanded ? 'Hide Code' : 'Show Code'}
      </button>
      {expanded && (
        <pre className={`bg-gray-50 rounded-lg p-4 font-mono text-xs overflow-x-auto border border-gray-200 ${codeClass}`}>{code}</pre>
      )}
      {extra}
    </div>
  );
} 