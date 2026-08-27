import React, { useState } from 'react';
import {
  MessageSquare,
  Sparkles,
  TrendingUp,
  LineChart,
  FileText,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Terminal,
  RefreshCw,
  Send,
  Sliders,
  DollarSign,
  PieChart,
} from 'lucide-react';
import { COMMAND_CENTER_PRESETS } from '../data/solutionsData';

export const AiCommandCenter: React.FC = () => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [investigationOpen, setInvestigationOpen] = useState(false);
  const [activeViewMode, setActiveViewMode] = useState<'kpis' | 'chart' | 'investigation'>('kpis');
  const [reportGenerated, setReportGenerated] = useState(false);

  const currentPreset = COMMAND_CENTER_PRESETS[selectedPresetIndex] || COMMAND_CENTER_PRESETS[0];

  const handleAction = (action: string) => {
    if (action === 'investigate') {
      setActiveViewMode('investigation');
      setInvestigationOpen(true);
    } else if (action === 'chart') {
      setActiveViewMode('chart');
    } else if (action === 'report') {
      setReportGenerated(true);
      setTimeout(() => setReportGenerated(false), 4000);
    } else if (action === 'kpis') {
      setActiveViewMode('kpis');
    }
  };

  return (
    <section id="command-center" className="py-28 bg-[#050505] border-t border-white/[0.06] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full px-[5%] relative z-10">
        
        {/* Header */}
        <div className="w-full max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-700/30 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <LineChart className="w-3.5 h-3.5 text-violet-400" />
            <span>CONVERSATIONAL BUSINESS INTELLIGENCE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-display mb-4">
            Your Business.{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-200 to-sky-400">
              One Conversation Away.
            </span>
          </h2>
          <p className="text-lg text-zinc-300 leading-relaxed font-normal">
            Converse directly with your enterprise data lake in natural language. Ask high-stakes questions and receive verified charts, anomaly diagnostics, and instant action recommendations.
          </p>
        </div>

        {/* Preset Queries Bar */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {COMMAND_CENTER_PRESETS.map((preset, idx) => {
            const isSelected = selectedPresetIndex === idx;
            return (
              <button
                key={preset.id}
                onClick={() => {
                  setSelectedPresetIndex(idx);
                  setActiveViewMode('kpis');
                  setInvestigationOpen(false);
                }}
                id={`preset-query-btn-${preset.id}`}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 focus:outline-none ${
                  isSelected
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30 scale-105'
                    : 'bg-[#0e0e14] text-zinc-300 border border-white/[0.08] hover:border-white/[0.2] hover:bg-[#15151e]'
                }`}
              >
                "{preset.query}"
              </button>
            );
          })}
        </div>

        {/* Futuristic Interactive Command Deck */}
        <div className="rounded-3xl bg-[#09090e] border border-violet-500/40 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
          
          {/* Top Bar / Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
              <div>
                <div className="text-xs font-bold text-white font-mono-code">
                  ARTIFY EXECUTIVE CONVERSATIONAL BI
                </div>
                <div className="text-[10px] text-zinc-400 font-mono-code">
                  Connected to: NetSuite ERP • Snowflake Data Lake • Stripe • Workday
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono-code text-zinc-400 bg-white/[0.04] px-3 py-1 rounded-md border border-white/[0.06]">
                Query Latency: <strong className="text-violet-300">1.82s</strong>
              </span>
              <span className="text-[11px] font-mono-code text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-md border border-emerald-800/40">
                100% Verified GL Data
              </span>
            </div>
          </div>

          {/* Conversation Simulation Container */}
          <div className="space-y-6 mb-8">
            
            {/* CEO Bubble */}
            <div className="flex items-start gap-3.5 max-w-2xl">
              <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-white shrink-0 mt-1 font-mono-code">
                CEO
              </div>
              <div className="p-4 rounded-2xl bg-[#14141d] border border-white/[0.08] text-white text-sm font-medium shadow-md">
                "{currentPreset.query}"
              </div>
            </div>

            {/* AI Assistant Bubble */}
            <div className="flex items-start gap-3.5 max-w-4xl">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white shrink-0 mt-1 shadow-lg shadow-violet-600/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1 p-6 rounded-2xl bg-[#0e0e16] border border-violet-500/30 shadow-xl">
                
                {/* AI Text Response */}
                <div className="text-sm font-semibold text-zinc-100 leading-relaxed mb-6">
                  {currentPreset.response.summary}
                </div>

                {/* Dynamic Mode Switcher (KPIs vs Chart vs Investigation) */}
                {activeViewMode === 'kpis' && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {currentPreset.response.highlights.map((stat, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-[#09090e] border border-white/[0.06] flex flex-col justify-between"
                      >
                        <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
                          {stat.label}
                        </span>
                        <div className="text-xl font-extrabold text-white my-1 font-display">
                          {stat.value}
                        </div>
                        <div
                          className={`text-xs font-bold font-mono-code flex items-center gap-1 ${
                            stat.positive ? 'text-emerald-400' : 'text-amber-400'
                          }`}
                        >
                          {stat.positive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                          <span>{stat.delta}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeViewMode === 'chart' && (
                  <div className="p-4 rounded-xl bg-[#09090e] border border-white/[0.06] mb-6">
                    <div className="flex items-center justify-between mb-3 text-xs font-mono-code text-zinc-400">
                      <span>Monthly Revenue vs OPEX Trajectory ($ Millions)</span>
                      <span className="text-violet-400">YoY Baseline Overlay</span>
                    </div>
                    {/* Simulated SVG Trend Chart */}
                    <div className="h-40 w-full flex items-end justify-between gap-3 pt-4 px-2">
                      {currentPreset.response.chartData.map((d, idx) => {
                        const revHeight = (d.revenue / 5) * 100;
                        const opexHeight = (d.opex / 5) * 100;
                        return (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                            <div className="w-full flex items-end justify-center gap-1 h-32">
                              {/* Revenue Bar */}
                              <div
                                style={{ height: `${revHeight}%` }}
                                className="w-1/2 bg-gradient-to-t from-violet-600 to-indigo-400 rounded-t-sm relative group cursor-pointer"
                              >
                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] text-white font-mono-code hidden group-hover:block bg-black px-1 rounded">
                                  ${d.revenue}M
                                </span>
                              </div>
                              {/* OPEX Bar */}
                              <div
                                style={{ height: `${opexHeight}%` }}
                                className="w-1/2 bg-zinc-700/60 rounded-t-sm relative group cursor-pointer"
                              >
                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] text-zinc-300 font-mono-code hidden group-hover:block bg-black px-1 rounded">
                                  ${d.opex}M
                                </span>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono-code text-zinc-400">
                              {d.month}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeViewMode === 'investigation' && (
                  <div className="p-5 rounded-xl bg-violet-950/30 border border-violet-800/40 mb-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-violet-300 font-mono-code uppercase mb-2">
                      <Search className="w-4 h-4 text-violet-400" />
                      <span>AUTONOMOUS ROOT-CAUSE INVESTIGATION REPORT</span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-mono-code">
                      "{currentPreset.response.investigationNote}"
                    </p>
                  </div>
                )}

                {/* Action Prompt */}
                <p className="text-xs text-violet-300 mb-4 font-mono-code">
                  Three expense categories account for 82% of the increase. Would you like me to investigate them or generate an executive briefing?
                </p>

                {/* Interactive Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => handleAction('investigate')}
                    id="command-action-investigate-btn"
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg transition-all ${
                      activeViewMode === 'investigation'
                        ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                        : 'bg-[#181824] hover:bg-[#202030] text-zinc-200 border border-white/[0.08]'
                    }`}
                  >
                    <Search className="w-3.5 h-3.5 text-violet-400" />
                    <span>Investigate</span>
                  </button>

                  <button
                    onClick={() => handleAction('report')}
                    id="command-action-report-btn"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-[#181824] hover:bg-[#202030] text-zinc-200 border border-white/[0.08] transition-all"
                  >
                    <FileText className="w-3.5 h-3.5 text-sky-400" />
                    <span>Generate Report</span>
                  </button>

                  <button
                    onClick={() => handleAction('chart')}
                    id="command-action-chart-btn"
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg transition-all ${
                      activeViewMode === 'chart'
                        ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                        : 'bg-[#181824] hover:bg-[#202030] text-zinc-200 border border-white/[0.08]'
                    }`}
                  >
                    <LineChart className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Show Chart</span>
                  </button>

                  <button
                    onClick={() => handleAction('kpis')}
                    id="command-action-kpis-btn"
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg transition-all ${
                      activeViewMode === 'kpis'
                        ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                        : 'bg-[#181824] hover:bg-[#202030] text-zinc-200 border border-white/[0.08]'
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5 text-amber-400" />
                    <span>Executive KPIs</span>
                  </button>
                </div>

                {/* Report Download Simulation Toast */}
                {reportGenerated && (
                  <div className="mt-4 p-3 rounded-lg bg-emerald-950/60 border border-emerald-700/50 text-emerald-300 text-xs font-mono-code flex items-center justify-between animate-in fade-in">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Executive Briefing PDF generated and synced to executive mobile devices.</span>
                    </span>
                    <span className="font-bold">DOWNLOADED</span>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
