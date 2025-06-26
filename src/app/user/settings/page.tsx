"use client";

import React, { useState } from 'react';
import Settings from '../../components/Settings';
import { ChevronDown, User, Mail, Lock, Bell, Code, Key, Shield, LogOut, Download, Trash2, HelpCircle } from 'lucide-react';
import { Switch } from '@/components/ui/switch'; // Assuming a shadcn/ui setup
import { Button } from '@/components/ui/button'; // Assuming a shadcn/ui setup
import { Input } from '@/components/ui/input'; // Assuming a shadcn/ui setup

// Mock Sidebar and Header - replace with your actual components
const Sidebar = () => <div className="w-64 bg-gray-800 text-white p-5">Sidebar</div>;
const Header = () => <div className="bg-white border-b p-5">Header</div>;

// Helper component for tooltips
const Tooltip = ({ text, children }: { text: string, children: React.ReactNode }) => (
    <div className="relative group flex items-center">
        {children}
        <div className="absolute left-full ml-4 w-48 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10">
            {text}
        </div>
    </div>
);

const CollapsibleSection = ({ title, children }: { title: string, children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="bg-white border border-gray-200 rounded-lg mb-6">
            <button
                className="w-full flex justify-between items-center p-5 font-semibold text-lg text-gray-800"
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
                <ChevronDown size={24} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && <div className="px-5 pb-5 border-t border-gray-200">{children}</div>}
        </div>
    );
};

export default function SettingsPage() {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    return (
        <div className="flex h-screen bg-white font-sans">
            {/* Replace with your actual Sidebar if needed */}
            {/* <Sidebar /> */}
            <div className="flex-1 flex flex-col">
                {/* Replace with your actual Header if needed */}
                {/* <Header /> */}
                <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>
                    <Settings />
                </main>
            </div>
        </div>
    );
}
