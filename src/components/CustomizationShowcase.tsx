import React, { useState } from 'react';
import {
  Code2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Workflow,
  Cpu,
  Bot,
  Zap,
} from 'lucide-react';

export const CustomizationShowcase: React.FC = () => {
  const [activeLogicIndex, setActiveLogicIndex] = useState(0);

  const customLogicExamples = [
    {
      title: 'Autonomous 3-Way Vendor Invoice Verification',
      category: 'Finance & Accounts Payable',
      prompt:
        '"When an invoice arrives from a vendor, verify it against the signed master service agreement, check if the milestone was approved in Jira/ERP, flag any line-item rate discrepancies, and route it to the right department VP for one-click approval."',
      steps: [
        'AI parses PDF invoice, extracts tax ID, line items, and bank details.',
        'Queries NetSuite PO database and contract terms in DocuSign repository.',
        'Discovers 3.4% rate discrepancy on line item #4; creates highlighted discrepancy dossier.',
        'Dispatches interactive Slack approval card to Engineering VP with verified summary.',
      ],
      color: '#8B5CF6',
    },
    {
      title: 'High-Value Lead Enrichment & Strategic Dossier',
      category: 'Revenue Operations & Sales',
      prompt:
        '"When an enterprise lead fills out our consultation form, autonomously research their SEC filings, analyze their tech stack from job postings, identify key decision makers on LinkedIn, and draft a customized technical proposal for our account executive."',
      steps: [
        'Ingests new inbound lead from website webhook.',
        'Runs real-time OSINT search across SEC 10-K filings, press releases, and open engineering roles.',
        'Synthesizes a 1-page executive brief with identified operational pain points.',
        'Drafts tailored technical response in CRM ready for AE review in under 90 seconds.',
      ],
      color: '#38BDF8',
    },
    {
      title: 'Predictive Field Equipment Sentinel & Automated Dispatch',
      category: 'Manufacturing & Field Operations',
      prompt:
        '"Monitor all heavy machinery IoT telemetry in real time. If vibration harmonics deviate from baseline for more than 4 hours, predict failure probability, order replacement components from our supplier, and schedule the nearest certified technician."',
      steps: [
        'Streams 10,000 telemetry packets/second from edge IoT sensors.',
        'Detects micro-cavitation pattern in hydraulic pump unit #12.',
        'Autonomously generates purchase order in SAP to OEM distributor.',
        'Schedules technician in Field Service mobile app with localized schematics.',
      ],
      color: '#10B981',
    },
    {
      title: 'Automated Multi-Entity Intercompany Reconciliation',
      category: 'Global Accounting & Treasury',
      prompt:
        '"Every Friday at 5 PM, query our 14 regional subsidiary ledgers across 4 countries, reconcile all intercompany transfer balances, apply daily ECB spot exchange rates, and compile the consolidated executive P&L statement."',
      steps: [
        'Connects to 14 distributed GL instances via encrypted API tunnels.',
        'Harmonizes differing chart-of-accounts into global unified taxonomy.',
        'Performs automated currency conversion and eliminates intercompany transfers.',
        'Delivers board-ready consolidated financial package to CFO in under 4 minutes.',
      ],
      color: '#F59E0B',
    },
  ];

  const current = customLogicExamples[activeLogicIndex];

  return (
    <section className="py-28 bg-[#050505] border-t border-white/[0.06] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full px-[5%] relative z-10">
        
        {/* Header */}
        <div className="w-full max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-700/30 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Code2 className="w-3.5 h-3.5 text-violet-400" />
            <span>ARBITRARY COMPLEXITY ENGINE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-display mb-4">
            If You Can Describe It,{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-200 to-sky-400">
              We Can Engineer It.
            </span>
          </h2>
          <p className="text-lg text-zinc-300 leading-relaxed font-normal">
            No matter how complex, unique, or multi-step your business logic is, Artify builds the exact intelligence layer to execute it autonomously.
          </p>
        </div>

        {/* 4 Logic Tab Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {customLogicExamples.map((ex, idx) => {
            const isSelected = activeLogicIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveLogicIndex(idx)}
                id={`logic-example-tab-${idx}`}
                className={`p-4 rounded-2xl text-left transition-all duration-200 flex flex-col justify-between focus:outline-none ${
                  isSelected
                    ? 'bg-[#151522] border-2 border-violet-400 shadow-[0_0_25px_rgba(139,92,246,0.3)] scale-105'
                    : 'bg-[#0a0a0f] border border-white/[0.08] hover:border-white/[0.2] hover:bg-[#101018]'
                }`}
              >
                <span className="text-[10px] font-mono-code font-bold text-violet-400 uppercase tracking-wider mb-2">
                  {ex.category}
                </span>
                <h4 className="text-xs font-bold text-white font-display leading-tight">
                  {ex.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Selected Logic Interactive Blueprint Deck */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#09090e] border border-violet-500/40 shadow-2xl relative overflow-hidden">
          <div className="mb-6">
            <span className="text-xs font-bold text-violet-400 font-mono-code uppercase tracking-wider block mb-1">
              NATURAL-LANGUAGE BUSINESS LOGIC SPECIFICATION:
            </span>
            <div className="p-5 rounded-2xl bg-[#12121c] border border-white/[0.08] text-white text-base sm:text-lg font-medium italic leading-relaxed">
              {current.prompt}
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-zinc-400 font-mono-code uppercase tracking-wider block mb-3">
              AUTONOMOUS EXECUTION ORCHESTRATION PIPELINE:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {current.steps.map((st, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-[#07070a] border border-white/[0.06] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono-code font-bold text-violet-400">
                        STEP 0{i + 1}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {st}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
