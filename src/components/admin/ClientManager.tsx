import React, { useState } from 'react';
import {
  Users,
  Building2,
  Briefcase,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Search,
  Filter,
  Plus,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ChevronRight,
  Activity,
  Cpu,
  Send,
  FileText,
  UserCheck,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { AdminCustomer, AdminLead, AdminOnboardingItem } from '../../data/adminData';

interface ClientManagerProps {
  theme: 'dark' | 'light';
}

export const ClientManager: React.FC<ClientManagerProps> = ({ theme }) => {
  const {
    customers,
    updateCustomer,
    createCustomer,
    leads,
    updateLead,
    updateLeadStatus,
    convertLeadToCustomer,
    onboarding,
    toggleOnboardingStep,
    addToast,
  } = useAdmin();

  const isLight = theme === 'light';

  // Sub-tabs: 'customers' | 'leads' | 'onboarding'
  const [subTab, setSubTab] = useState<'customers' | 'leads' | 'onboarding'>('customers');
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('all');

  // Customer Modal
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [newCompany, setNewCompany] = useState('');
  const [newDomain, setNewDomain] = useState('');
  const [newIndustry, setNewIndustry] = useState('Fintech & Banking');
  const [newTier, setNewTier] = useState<'Enterprise' | 'Growth' | 'Startup'>('Enterprise');
  const [newMrr, setNewMrr] = useState(12500);
  const [newEmail, setNewEmail] = useState('');

  // Selected Lead for Detail Modal
  const [selectedLead, setSelectedLead] = useState<AdminLead | null>(null);

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany || !newEmail) return;

    createCustomer({
      companyName: newCompany,
      domain: newDomain || `${newCompany.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      industry: newIndustry,
      tier: newTier,
      status: 'active',
      mrr: Number(newMrr),
      usersCount: 15,
      productsCount: 2,
      activeAgentsCount: 6,
      renewalDate: '2027-09-01',
      accountManager: 'Elena Vance (Principal Architect)',
      leadSource: 'Executive Briefing',
      address: 'One Financial Center, Suite 400',
      taxNumber: 'US-9281928',
      phone: '+1 (555) 492-0192',
      email: newEmail,
      onboardingProgress: 100,
    });

    setNewCompany('');
    setNewDomain('');
    setNewEmail('');
    setIsAddCustomerOpen(false);
    addToast('success', `Enterprise client ${newCompany} enrolled in ecosystem.`);
  };

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = tierFilter === 'all' || c.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const filteredLeads = leads.filter((l) => {
    return (
      l.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.projectBrief.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header & Sub-tabs */}
      <div className={`p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
      }`}>
        <div>
          <h2 className={`text-xl font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Enterprise Client & Inbound Pipeline Governance
          </h2>
          <p className={`text-xs mt-1 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
            Manage tenant accounts, monitor SLA compliance, inspect solution architectures, and advance conversion pipelines.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/20 border border-white/[0.06] self-start md:self-auto">
          <button
            onClick={() => setSubTab('customers')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              subTab === 'customers' ? 'bg-violet-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Clients ({customers.length})
          </button>

          <button
            onClick={() => setSubTab('leads')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              subTab === 'leads' ? 'bg-violet-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Inbound Briefs ({leads.length})
          </button>

          <button
            onClick={() => setSubTab('onboarding')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              subTab === 'onboarding' ? 'bg-violet-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Delivery Pipelines ({onboarding.length})
          </button>
        </div>
      </div>

      {/* SUB-TAB 1: CUSTOMERS */}
      {subTab === 'customers' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter by organization, industry, contact..."
                  className={`w-full pl-9 pr-3 py-2 rounded-xl border text-xs ${
                    isLight ? 'bg-white border-slate-200' : 'bg-[#151522] border-white/[0.08] text-white'
                  }`}
                />
              </div>

              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className={`p-2 rounded-xl border text-xs ${
                  isLight ? 'bg-white border-slate-200' : 'bg-[#151522] border-white/[0.08] text-white'
                }`}
              >
                <option value="all">All Tiers</option>
                <option value="Enterprise">Enterprise</option>
                <option value="Growth">Growth</option>
                <option value="Startup">Startup</option>
              </select>
            </div>

            <button
              onClick={() => setIsAddCustomerOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-violet-600/25 transition-all self-end sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Enroll Client</span>
            </button>
          </div>

          <div className={`rounded-2xl border overflow-hidden ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
          }`}>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className={`border-b ${isLight ? 'border-slate-100 bg-slate-50 text-slate-500' : 'border-white/[0.04] bg-white/[0.02] text-zinc-400'}`}>
                  <th className="py-3.5 px-4 font-semibold">Client Org</th>
                  <th className="py-3.5 px-4 font-semibold">Industry</th>
                  <th className="py-3.5 px-4 font-semibold">Tier</th>
                  <th className="py-3.5 px-4 font-semibold">Monthly Value</th>
                  <th className="py-3.5 px-4 font-semibold">AI Fleet Count</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold">Account Architect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filteredCustomers.map((c) => (
                  <tr key={c.id} className={`group ${isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'}`}>
                    <td className="py-3.5 px-4 font-medium">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                          isLight ? 'bg-violet-100 text-violet-700' : 'bg-violet-950/60 border border-violet-700/30 text-violet-300'
                        }`}>
                          {c.companyName.charAt(0)}
                        </div>
                        <div>
                          <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{c.companyName}</div>
                          <div className="text-[10px] text-zinc-500 font-mono-code">{c.domain}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400">{c.industry}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-violet-500/10 text-violet-400 border border-violet-500/20">
                        {c.tier}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono-code font-semibold text-emerald-400">
                      ${c.mrr.toLocaleString()}/mo
                    </td>
                    <td className="py-3.5 px-4 text-zinc-300 font-mono-code">
                      {c.activeAgentsCount} Agents
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400">{c.accountManager}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: INBOUND LEADS & BRIEFS */}
      {subTab === 'leads' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                  isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                    <span className="text-[10px] font-mono-code text-zinc-500">{lead.refNumber}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      lead.status === 'new'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : lead.status === 'qualified'
                        ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {lead.status}
                    </span>
                  </div>

                  <h3 className={`text-base font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {lead.company}
                  </h3>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    Contact: <span className="text-zinc-200 font-medium">{lead.name}</span> ({lead.email})
                  </div>

                  <div className={`p-3 rounded-xl mt-3 text-xs leading-relaxed ${
                    isLight ? 'bg-slate-50 text-slate-700' : 'bg-white/[0.02] text-zinc-300'
                  }`}>
                    {lead.projectBrief}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-zinc-500 font-mono-code">
                    <span>Budget: <strong className="text-emerald-400">{lead.estimatedBudget}</strong></span>
                    <span>Timeline: {lead.timeline}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
                  <select
                    value={lead.status}
                    onChange={(e) => {
                      updateLeadStatus(lead.id, e.target.value as AdminLead['status']);
                      addToast('info', `Lead status updated to ${e.target.value}`);
                    }}
                    className={`p-1.5 rounded-lg border text-xs font-semibold ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#151522] border-white/[0.08] text-white'
                    }`}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="proposal">Proposal</option>
                    <option value="converted">Converted</option>
                    <option value="lost">Lost</option>
                  </select>

                  {lead.status !== 'converted' ? (
                    <button
                      onClick={() => {
                        convertLeadToCustomer(lead.id);
                        addToast('success', `Lead converted to active Enterprise Customer: ${lead.company}`);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow-md shadow-emerald-600/20"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Convert</span>
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Customer</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: DELIVERY PIPELINES */}
      {subTab === 'onboarding' && (
        <div className="space-y-4">
          {onboarding.map((pipe) => {
            const completedCount = pipe.steps.filter((s) => s.completed).length;
            const pct = Math.round((completedCount / pipe.steps.length) * 100);

            return (
              <div
                key={pipe.id}
                className={`p-5 rounded-2xl border ${
                  isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0b0b12] border-white/[0.08]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-white/[0.06]">
                  <div>
                    <h3 className={`text-base font-bold font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {pipe.companyName} Delivery Track
                    </h3>
                    <div className="text-xs text-zinc-400">
                      Lead Solution Architect: <span className="text-violet-400 font-medium">{pipe.assignedArchitect}</span> • Target: {pipe.targetGoLive}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono-code text-emerald-400 font-bold">{pct}% Complete</span>
                  </div>
                </div>

                <div className="w-full bg-white/[0.06] h-2 rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-gradient-to-r from-violet-600 via-indigo-500 to-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {pipe.steps.map((step) => (
                    <button
                      key={step.id}
                      onClick={() => {
                        toggleOnboardingStep(pipe.id, step.id);
                        addToast('info', `Toggled milestone: ${step.title}`);
                      }}
                      className={`p-3 rounded-xl border text-left flex items-start justify-between gap-2 transition-all ${
                        step.completed
                          ? isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                          : isLight ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-white/[0.02] border-white/[0.06] text-zinc-400'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-xs">{step.title}</div>
                        {step.completedAt && (
                          <div className="text-[10px] text-emerald-500 font-mono-code mt-1">{step.completedAt}</div>
                        )}
                      </div>
                      <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                        step.completed ? 'bg-emerald-500 text-white' : 'border border-zinc-600'
                      }`}>
                        {step.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ENROLL CLIENT MODAL */}
      {isAddCustomerOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-lg p-6 rounded-2xl border shadow-2xl ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#0f0f18] border-white/[0.1]'
          }`}>
            <h3 className={`text-base font-bold font-display mb-4 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Enroll New Enterprise Organization
            </h3>
            <form onSubmit={handleCreateCustomer} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 font-semibold block mb-1">Company Name</label>
                  <input
                    type="text"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="Acme Global Logistics"
                    required
                    className={`w-full p-2.5 rounded-xl border ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#151522] border-white/[0.08] text-white'
                    }`}
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-semibold block mb-1">Domain</label>
                  <input
                    type="text"
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    placeholder="acmeglobal.com"
                    className={`w-full p-2.5 rounded-xl border ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#151522] border-white/[0.08] text-white'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 font-semibold block mb-1">Primary Email</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="operations@acmeglobal.com"
                    required
                    className={`w-full p-2.5 rounded-xl border ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#151522] border-white/[0.08] text-white'
                    }`}
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-semibold block mb-1">Contract Tier</label>
                  <select
                    value={newTier}
                    onChange={(e) => setNewTier(e.target.value as any)}
                    className={`w-full p-2.5 rounded-xl border ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#151522] border-white/[0.08] text-white'
                    }`}
                  >
                    <option value="Enterprise">Enterprise</option>
                    <option value="Growth">Growth</option>
                    <option value="Startup">Startup</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-semibold block mb-1">Monthly Recurring Revenue (USD)</label>
                <input
                  type="number"
                  value={newMrr}
                  onChange={(e) => setNewMrr(Number(e.target.value))}
                  required
                  className={`w-full p-2.5 rounded-xl border font-mono-code ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#151522] border-white/[0.08] text-white'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setIsAddCustomerOpen(false)}
                  className="px-4 py-2 rounded-xl border border-white/[0.1] text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold shadow-md shadow-violet-600/25"
                >
                  Enroll Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
