'use client';
import React, { useState } from 'react';
import { Navbar } from '../../components';

const BUSINESS_CATEGORIES = [
  'Sales',
  'Marketing',
  'Product/Service Delivery',
  'Customer Support',
  'Finance & Accounting',
  'HR & Talent',
  'Operations',
  'Data & Analytics'
];

export default function FindAgentPage() {
  const [selectedBusiness, setSelectedBusiness] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [requirements, setRequirements] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleBusinessChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBusiness(e.target.value);
    setShowChat(!!e.target.value);
    setErrorMsg('');
    setRequirements('');
  };

  const handleFind = () => {
    setErrorMsg("Error !! Sathwik's Magnetic Field interfered with our AI agent's response.");
  };

  return (
    <div className="relative min-h-screen bg-white font-sans flex flex-col items-center justify-center">
      <Navbar />
      <div className="w-full max-w-md mx-auto p-8 rounded-2xl shadow-lg bg-white border border-gray-100 mt-24">
        <h2 className="text-2xl font-bold mb-6 text-center">Find an Agent for Your Business</h2>
        <select
          value={selectedBusiness}
          onChange={handleBusinessChange}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-800 focus:outline-none focus:border-blue-400 transition-all duration-200 shadow-sm focus:shadow-lg appearance-none cursor-pointer mb-2"
        >
          <option value="">Select your business category</option>
          {BUSINESS_CATEGORIES.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      {/* Chatbox Popup */}
      {showChat && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowChat(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close chat"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <h3 className="text-xl font-bold mb-2">Tell us about your {selectedBusiness} needs</h3>
            <p className="text-gray-600 mb-4 text-sm">Describe your business requirements and what you want from an AI agent.</p>
            <textarea
              className="w-full h-28 px-4 py-2 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-blue-400 transition-all duration-200 resize-none mb-2"
              placeholder="Describe your requirements..."
              value={requirements}
              onChange={e => setRequirements(e.target.value)}
            />
            <button
              className="w-full mt-2 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-200"
              onClick={handleFind}
            >
              Find
            </button>
            {errorMsg && (
              <div className="mt-4 text-center text-red-600 font-semibold text-sm">{errorMsg}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 