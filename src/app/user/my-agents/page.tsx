"use client";

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { ChevronDown, Search, Folder, File, Save, Check, Play, Settings, BarChart2, AlertTriangle, MessageSquare, CheckCircle, Trash2, Copy, FileText, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type AgentStatus = 'draft' | 'submitted' | 'live' | 'rejected';
type EditorTab = 'YAML' | 'Code' | 'Config.json' | 'README';

interface Agent {
    id: string;
    name: string;
    status: AgentStatus;
    content: {
        yaml: string;
        code: string;
        config: string;
        readme: string;
    };
    validation?: {
        yaml: boolean;
        fields: boolean;
        class: boolean;
    };
    metrics?: {
        usage: number;
        rating: number;
        runtime: number;
    };
    feedback?: string;
}

const mockAgents: Agent[] = [
    { id: '1', name: 'ContractSummarizer.py', status: 'draft', content: { yaml: 'name: ContractSummarizer', code: 'print("hello world")', config: '{ "version": 1 }', readme: '# ContractSummarizer' }, validation: { yaml: true, fields: true, class: false } },
    { id: '2', name: 'EmailParser', status: 'draft', content: { yaml: 'name: EmailParser', code: 'import re', config: '{ "version": 1 }', readme: '# EmailParser' }, validation: { yaml: true, fields: false, class: false } },
    { id: '3', name: 'HRBot', status: 'submitted', content: { yaml: 'name: HRBot', code: '...', config: '{}', readme: '# HRBot' } },
    { id: '4', name: 'BudgetBuddy', status: 'live', content: { yaml: 'name: BudgetBuddy', code: '...', config: '{}', readme: '# BudgetBuddy' }, metrics: { usage: 1200, rating: 4.8, runtime: 1.2 } },
    { id: '5', name: 'SupportGenie', status: 'rejected', content: { yaml: 'name: SupportGenie', code: '...', config: '{}', readme: '# SupportGenie' }, feedback: "The agent's main class is not inheriting from the BaseAgent class." },
];

const AgentNavigator = ({ agents, onSelect, selectedAgentId }: { agents: Agent[], onSelect: (id: string) => void, selectedAgentId: string | null }) => {
    const groupedAgents = agents.reduce((acc, agent) => {
        if (!acc[agent.status]) acc[agent.status] = [];
        acc[agent.status].push(agent);
        return acc;
    }, {} as Record<AgentStatus, Agent[]>);

    return (
        <div className="bg-white border-r border-gray-200 w-72 flex flex-col">
            <div className="p-4 border-b border-gray-200">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                    <Input placeholder="Search agents..." className="pl-10"/>
                </div>
            </div>
            <div className="flex-grow p-4 overflow-y-auto">
                {Object.entries(groupedAgents).map(([status, agentList]) => (
                    <div key={status} className="mb-4">
                        <h3 className="flex items-center text-sm font-semibold text-gray-500 mb-2 cursor-pointer">
                            <ChevronDown size={16} className="mr-1"/>
                            <Folder size={16} className="mr-2 text-gray-400"/>
                            {status.charAt(0).toUpperCase() + status.slice(1)} ({agentList.length})
                        </h3>
                        <ul className="space-y-1 pl-4">
                            {agentList.map(agent => (
                                <li key={agent.id} onClick={() => onSelect(agent.id)}
                                    className={`flex items-center text-sm p-2 rounded-md cursor-pointer ${selectedAgentId === agent.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}>
                                    <File size={16} className="mr-2"/>
                                    {agent.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MainWorkspace = ({ agent }: { agent: Agent | null }) => {
    const [activeTab, setActiveTab] = useState<EditorTab>('YAML');

    if (!agent) return <div className="flex-1 flex items-center justify-center bg-gray-50"><p>Select an agent to begin.</p></div>;

    const isEditable = agent.status === 'draft' || agent.status === 'submitted';
    
    const languageMap: Record<EditorTab, string> = {
        'YAML': 'yaml',
        'Code': 'python',
        'Config.json': 'json',
        'README': 'markdown'
    }

    return (
        <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold">{agent.name}</h2>
                <div>
                    <Button variant="outline" size="sm" className="mr-2"><Save size={14} className="mr-1"/> Save Draft</Button>
                    <Button variant="outline" size="sm" className="mr-2"><Check size={14} className="mr-1"/> Validate</Button>
                    <Button size="sm"><Play size={14} className="mr-1"/> Submit for Review</Button>
                </div>
            </div>
            <div className="border-b border-gray-200">
                <nav className="flex space-x-2 px-4">
                    {(['YAML', 'Code', 'Config.json', 'README'] as EditorTab[]).map(tab => (
                         <button key={tab} onClick={() => setActiveTab(tab)}
                            className={`py-3 px-4 text-sm font-medium ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                             {tab}
                         </button>
                    ))}
                </nav>
            </div>
            <div className="flex-grow bg-white">
                <Editor
                    height="100%"
                    language={languageMap[activeTab]}
                    value={agent.content[languageMap[activeTab] as 'yaml' | 'code' | 'config' | 'readme']}
                    options={{ readOnly: !isEditable, minimap: { enabled: false } }}
                    theme="vs-light"
                />
            </div>
        </div>
    );
};

const InsightsPanel = ({ agent }: { agent: Agent | null }) => {
     if (!agent) return <div className="bg-white border-l border-gray-200 w-80 p-6"></div>;

    return (
        <div className="bg-white border-l border-gray-200 w-80 p-6">
            <h3 className="font-bold text-lg mb-4">Insights</h3>
            {agent.status === 'draft' && agent.validation && (
                <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                    <h4 className="font-semibold mb-3">Validation Requirements</h4>
                    <ul className="space-y-2 text-sm">
                        <li className={`flex items-center ${agent.validation.yaml ? 'text-green-600' : ''}`}><CheckCircle size={16} className="mr-2"/> YAML present</li>
                        <li className={`flex items-center ${agent.validation.fields ? 'text-green-600' : 'text-gray-500'}`}><CheckCircle size={16} className="mr-2"/> Required fields filled</li>
                        <li className={`flex items-center ${agent.validation.class ? 'text-green-600' : 'text-gray-500'}`}><CheckCircle size={16} className="mr-2"/> Class structure complete</li>
                    </ul>
                </div>
            )}
            {agent.status === 'live' && agent.metrics && (
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <h4 className="font-semibold mb-3">Live Performance</h4>
                    <ul className="space-y-3 text-sm">
                        <li className="flex justify-between"><span>Usage:</span> <span className="font-semibold">{agent.metrics.usage} runs</span></li>
                        <li className="flex justify-between"><span>Rating:</span> <span className="font-semibold">{agent.metrics.rating}/5 ⭐</span></li>
                        <li className="flex justify-between"><span>Avg Runtime:</span> <span className="font-semibold">{agent.metrics.runtime} sec</span></li>
                    </ul>
                </div>
            )}
             {agent.status === 'rejected' && agent.feedback && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                    <h4 className="font-semibold mb-3 flex items-center"><AlertTriangle className="mr-2 text-red-500"/>Feedback</h4>
                    <p className="text-sm text-gray-700 mb-4">{agent.feedback}</p>
                    <Button size="sm" className="w-full">Fix Now</Button>
                </div>
            )}
        </div>
    );
}

export default function MyAgentsWorkspace() {
    const [selectedAgentId, setSelectedAgentId] = useState<string | null>(mockAgents[0].id);
    const selectedAgent = mockAgents.find(a => a.id === selectedAgentId) || null;

    return (
        <div className="h-screen w-full flex flex-col font-sans">
             <header className="bg-white border-b border-gray-200 p-4">
                 <h1 className="text-2xl font-bold">🧠 My Agents Workspace</h1>
                 <p className="text-sm text-gray-600">Where your agents evolve, iterate, and launch from draft to production.</p>
             </header>
            <div className="flex flex-grow overflow-hidden">
                <AgentNavigator agents={mockAgents} onSelect={setSelectedAgentId} selectedAgentId={selectedAgentId} />
                <MainWorkspace agent={selectedAgent} />
                <InsightsPanel agent={selectedAgent} />
            </div>
        </div>
    );
}
