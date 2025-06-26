"use client";
import React, { useState, useRef, useLayoutEffect } from "react";
import { AgentCard } from "../../agents/page";
import { motion, AnimatePresence, AnimationGeneratorType } from "framer-motion";
import Navbar from "../../components/Navbar";

// Mock data for demonstration
const downloadedAgents = [
  {
    id: 1,
    name: "LexiAI",
    description: "Summarizes legal contracts with high accuracy.",
    tags: ["Finance", "NLP"],
    icon: "🧠",
    rating: 4.9,
  },
  {
    id: 2,
    name: "SupportBot",
    description: "Handles support tickets using intent-based triage.",
    tags: ["Customer Support", "Productivity"],
    icon: "🤖",
    rating: 4.7,
  },
  {
    id: 3,
    name: "DevOps Genie",
    description: "Deploys and monitors cloud infrastructure automatically.",
    tags: ["DevOps", "OpenSource"],
    icon: "🛠️",
    rating: 4.8,
  },
  {
    id: 4,
    name: "Insightly",
    description: "Extracts insights from business data for smarter decisions.",
    tags: ["Finance", "Productivity"],
    icon: "📊",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Sales Pilot",
    description: "Automates lead qualification and outreach sequences.",
    tags: ["Sales", "CRM"],
    icon: "🚀",
    rating: 4.9,
  },
];

type AgentType = {
  id: number;
  name: string;
  description: string;
  tags: string[];
  icon: string;
  rating: number;
};

const myAgents: Record<string, AgentType[]> = {
  live: [
    {
      id: 5,
      name: "Sales Pilot",
      description: "Automates lead qualification and outreach sequences.",
      tags: ["Sales", "CRM"],
      icon: "🚀",
      rating: 4.9,
    },
  ],
  review: [
    {
      id: 6,
      name: "Market Maestro",
      description: "Generates personalized marketing copy and campaigns.",
      tags: ["Marketing", "Content"],
      icon: "✍️",
      rating: 4.5,
    },
  ],
  draft: [
    {
      id: 7,
      name: "Budget Buddy",
      description: "Tracks expenses, forecasts budgets, and identifies savings.",
      tags: ["Finance", "Accounting"],
      icon: "💰",
      rating: 4.8,
    },
  ],
};

const agentTabs = [
  { key: "live", label: "Live" },
  { key: "review", label: "In Review" },
  { key: "draft", label: "Draft" },
];

function DashboardAgentCard({ agent, status }: { agent: AgentType; status: string }) {
  // Animation for emoji badge
  const emojiMotion = {
    rest: { y: 0, scale: 1, transition: { type: 'spring' as AnimationGeneratorType, stiffness: 200, damping: 10 } },
    hover: { y: -6, scale: 1.15, transition: { type: 'spring' as AnimationGeneratorType, stiffness: 300, damping: 12 } },
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover="hover"
      whileTap="hover"
      variants={{}}
      className="h-full flex flex-col justify-between group cursor-pointer"
      style={{ minWidth: 320, maxWidth: 360, width: 340 }}
    >
      <AgentCard
        name={agent.name}
        description={agent.description}
        tags={agent.tags}
        icon={
          <motion.span
            variants={emojiMotion}
            className="inline-block"
          >
            {agent.icon}
          </motion.span>
        }
        rating={agent.rating}
        onClick={() => {}}
        hidePreviewButton={true}
      >
        <div className="flex gap-2 mt-4 w-full">
          {status === "live" && (
            <>
              <button className="flex-1 bg-blue-600 text-white rounded-full py-2 font-medium hover:bg-blue-700 transition">Push Update</button>
              <button className="flex-1 bg-gray-100 text-gray-800 rounded-full py-2 font-medium hover:bg-gray-200 transition">Stats</button>
            </>
          )}
          {status === "review" && (
            <>
              <button className="flex-1 bg-blue-600 text-white rounded-full py-2 font-medium hover:bg-blue-700 transition">View Submission</button>
              <button className="flex-1 bg-gray-100 text-gray-800 rounded-full py-2 font-medium hover:bg-gray-200 transition">Edit</button>
            </>
          )}
          {status === "draft" && (
            <button className="flex-1 bg-blue-600 text-white rounded-full py-2 font-medium hover:bg-blue-700 transition">Continue</button>
          )}
        </div>
      </AgentCard>
    </motion.div>
  );
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("live");
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const [pillKey, setPillKey] = useState(0); // for triggering glow
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useLayoutEffect(() => {
    const idx = agentTabs.findIndex(tab => tab.key === activeTab);
    const node = tabRefs.current[idx];
    if (node) {
      setPillStyle({ left: node.offsetLeft, width: node.offsetWidth });
      setPillKey(prev => prev + 1); // trigger glow on tab change
    }
  }, [activeTab]);

  const tabKeys = agentTabs.map(tab => tab.key);
  const activeTabIdx = tabKeys.indexOf(activeTab);
  const direction = activeTabIdx > 0 ? 1 : -1;

  function handleTabChange(newTab: string) {
    setActiveTab(newTab);
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main className="max-w-6xl mx-auto pt-32 pb-20 px-4">
        {/* Welcome Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight" style={{letterSpacing: "-0.02em"}}>
            Welcome to your Dashboard
          </h1>
          <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">
            Effortlessly manage your downloaded and published agents in one beautiful place.
          </p>
        </motion.section>

        {/* Downloaded Agents */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Recently Downloaded Agents</h2>
            {downloadedAgents.length > 4 && (
              <a
                href="/user/library"
                className="text-blue-600 font-semibold text-sm hover:underline transition"
              >
                View All
              </a>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {downloadedAgents.length === 0 ? (
              <div className="w-full text-center text-gray-400 py-12 text-lg col-span-full">No agents downloaded yet.</div>
            ) : (
              downloadedAgents.slice(0, 4).map((agent: AgentType, idx: number) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="w-full h-full"
                >
                  <div className="w-full h-full flex flex-col justify-between">
                    <AgentCard
                      name={agent.name}
                      description={agent.description}
                      tags={agent.tags}
                      icon={agent.icon}
                      rating={agent.rating}
                      onClick={() => {}}
                      hidePreviewButton={true}
                    />
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </section>

        {/* My Agents with Slider */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900">My Agents</h2>
            <a
              href="/user/my-agents"
              className="text-blue-600 font-semibold text-sm hover:underline transition"
            >
              Manage All
            </a>
          </div>
          <div className="text-gray-500 text-base mb-6">Track, update and monitor all the agents you've built.</div>
          {/* Status Filter Toggle */}
          <div className="relative flex gap-1 bg-[#F4F5F7] rounded-full p-1 mb-6" style={{ minWidth: 320 }}>
            {/* Animated pill */}
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              style={{
                position: "absolute",
                top: 0,
                left: pillStyle.left,
                width: pillStyle.width,
                height: "100%",
                background: "#fff",
                borderRadius: 9999,
                boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
                zIndex: 0,
                pointerEvents: "none"
              }}
              animate={{
                x: pillStyle.left,
                width: pillStyle.width,
                boxShadow: "0 4px 10px rgba(0,0,0,0.06)"
              }}
              key={pillKey}
            />
            {agentTabs.map((tab, idx) => {
              const selected = activeTab === tab.key;
              return (
                <motion.button
                  key={tab.key}
                  ref={el => { tabRefs.current[idx] = el; }}
                  onClick={() => handleTabChange(tab.key)}
                  className={`relative z-10 px-5 py-2.5 rounded-full font-medium transition-all duration-250
                    ${selected
                      ? "font-semibold text-[#2563EB] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.06)] bg-red-200"
                      : "text-gray-500 bg-[#F9FAFB] border border-gray-200 hover:text-[#2563EB]"}
                  `}
                  style={{ minWidth: 100, outline: 'none', border: selected ? 'none' : undefined }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.label}
                </motion.button>
              );
            })}
          </div>
          <div className="relative min-h-[360px] w-full bg-white overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-start"
                style={{ minHeight: 360 }}
              >
                {myAgents[activeTab].length === 0 ? (
                  <div className="w-full text-center text-gray-400 py-12 text-lg">No agents in this category.</div>
                ) : (
                  myAgents[activeTab].map((agent: AgentType, idx: number) => (
                    <motion.div
                      key={agent.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
                      className="min-w-[270px] max-w-[300px] flex-1"
                    >
                      <DashboardAgentCard agent={agent} status={activeTab} />
                    </motion.div>
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  );
}