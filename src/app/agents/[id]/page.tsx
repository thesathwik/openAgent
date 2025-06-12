import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Mock data for demonstration
const agent = {
  id: 1,
  name: 'LexiAI',
  description: 'Summarizes legal contracts with high accuracy.',
  screenshots: ['/logo-mark.svg', '/logo-mark.svg'],
  requirements: [
    { label: 'OpenAI API Key', value: true },
    { label: 'Node.js >= 18', value: true },
  ],
  installCommand: 'npx openagents install lexi-ai',
  reviews: [
    { user: 'Alice', rating: 5, comment: 'Super helpful for my legal team!' },
    { user: 'Bob', rating: 4, comment: 'Accurate and easy to use.' },
  ],
  developer: {
    name: 'Jane Doe',
    contact: 'jane@openagents.com',
  },
  related: [
    { id: 2, name: 'SupportBot', description: 'Automates customer support ticket triage.' },
    { id: 3, name: 'DevOpsGenie', description: 'Deploys and monitors cloud infrastructure.' },
  ],
};

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export default function AgentDetailPage() {
  return (
    <div className="min-h-screen bg-white font-sans px-4 pb-16">
      <div className="max-w-3xl mx-auto pt-16">
        {/* Agent Name & Description */}
        <h1 className="text-4xl font-extrabold mb-2 text-gray-900">{agent.name}</h1>
        <p className="text-lg text-gray-600 mb-6">{agent.description}</p>
        {/* Screenshots */}
        <div className="flex gap-4 mb-8">
          {agent.screenshots.map((src, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-white w-40 h-40 flex items-center justify-center">
              <Image src={src} alt={agent.name + ' screenshot'} width={120} height={120} />
            </div>
          ))}
        </div>
        {/* Install Button */}
        <button className="mb-6 px-8 py-3 rounded-full bg-blue-600 text-white font-semibold text-lg shadow hover:bg-blue-700 transition-all">Install</button>
        {/* Requirements */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Requirements</h2>
          <ul className="list-disc pl-6 text-gray-700">
            {agent.requirements.map((req, i) => (
              <li key={i}>{req.label}</li>
            ))}
          </ul>
        </div>
        {/* Installation Instructions */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Installation Instructions</h2>
          <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-800 select-all">
            <code>{agent.installCommand}</code>
          </div>
        </div>
        {/* Reviews and Ratings */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Reviews & Ratings</h2>
          <div className="space-y-3">
            {agent.reviews.map((review, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-800">{review.user}</span>
                  <span className="text-yellow-400">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                </div>
                <div className="text-gray-600 text-sm">{review.comment}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Developer Info */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Developer Info & Support</h2>
          <div className="text-gray-700">{agent.developer.name} (<a href={`mailto:${agent.developer.contact}`} className="text-blue-600 underline">{agent.developer.contact}</a>)</div>
        </div>
        {/* Related Agents */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Related Agents</h2>
          <div className="flex flex-col gap-2">
            {agent.related.map((rel) => (
              <Link key={rel.id} href={`/agents/${rel.id}`} className="block px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold transition-all">
                {rel.name} <span className="text-gray-500 font-normal">- {rel.description}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 