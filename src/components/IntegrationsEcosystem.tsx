import React, { useState } from 'react';
import {
  Network,
  Database,
  Layers,
  Sparkles,
  Search,
  CheckCircle2,
  ExternalLink,
  Shield,
} from 'lucide-react';
import { ENTERPRISE_INTEGRATIONS } from '../data/solutionsData';

export const IntegrationsEcosystem: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Integrations' },
    { id: 'erp', label: 'ERP & Accounting' },
    { id: 'crm', label: 'CRM & Sales' },
    { id: 'collaboration', label: 'Collaboration' },
    { id: 'cloud', label: 'Cloud & Data' },
    { id: 'finance', label: 'Payments & Banking' },
    { id: 'custom', label: 'Custom APIs' },
  ];

  const filteredIntegrations = ENTERPRISE_INTEGRATIONS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.protocol.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-28 bg-[#070709] border-t border-white/[0.06] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full px-[5%] relative z-10">
        
        {/* Header */}
        <div className="w-full max-w-4xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-700/30 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Network className="w-3.5 h-3.5 text-violet-400" />
            <span>ENTERPRISE CONNECTIVITY LAYER</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-display mb-4">
            Connect Everything.
          </h2>
          <p className="text-lg text-zinc-300 leading-relaxed font-normal">
            Your AI solutions shouldn't exist in isolation. Artify bridges seamlessly into your existing ERPs, databases, communications, and custom internal APIs with sub-second synchronization.
          </p>
        </div>

        {/* Filters & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                id={`integration-filter-${cat.id}`}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                    : 'bg-[#101017] text-zinc-300 border border-white/[0.06] hover:border-white/[0.2] hover:bg-[#151520]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search connectors..."
              id="search-integrations-input"
              className="w-full bg-[#101017] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500"
            />
          </div>
        </div>

        {/* Grid of Connectors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-12">
          {filteredIntegrations.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-[#0b0b10] border border-white/[0.08] hover:border-violet-500/40 hover:bg-[#111118] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-xs font-bold text-white font-mono-code">
                    {item.logo}
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <h4 className="text-sm font-bold text-white font-display truncate">
                  {item.name}
                </h4>
                <p className="text-[10px] text-zinc-400 truncate mt-0.5">
                  {item.tagline}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[9px] font-mono-code text-zinc-400">
                <span>{item.protocol}</span>
                <span className="text-emerald-400">Verified</span>
              </div>
            </div>
          ))}
        </div>

        {/* Security & Protocol Statement */}
        <div className="p-6 rounded-2xl bg-[#09090e] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-violet-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">
                Zero Rip-and-Replace Guarantee
              </div>
              <div className="text-[11px] text-zinc-400">
                We plug directly into your current databases and OAuth credentials via TLS 1.3 encrypted tunnels.
              </div>
            </div>
          </div>
          <span className="text-xs font-mono-code text-violet-300 bg-violet-950/60 border border-violet-800/40 px-3 py-1.5 rounded-lg shrink-0">
            Bidirectional Real-Time Webhooks
          </span>
        </div>

      </div>
    </section>
  );
};
