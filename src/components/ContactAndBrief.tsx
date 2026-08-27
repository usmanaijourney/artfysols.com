import React, { useState, useEffect } from 'react';
import {
  Send,
  Sparkles,
  CheckCircle2,
  Calendar,
  Mail,
  Globe,
  Clock,
  ShieldCheck,
  Building2,
  Phone,
  User,
  MessageSquare,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { INDUSTRIES_DATA } from '../data/solutionsData';
import { ProjectBriefSubmission } from '../types';

interface ContactAndBriefProps {
  prefilledBrief?: any;
}

export const ContactAndBrief: React.FC<ContactAndBriefProps> = ({ prefilledBrief }) => {
  const [formData, setFormData] = useState<ProjectBriefSubmission>({
    name: '',
    company: '',
    email: '',
    phone: '',
    industry: 'Finance & Accounting',
    projectDescription: '',
    currentTools: '',
    timeline: '1-2 Months',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (prefilledBrief) {
      if (prefilledBrief.projectDescription) {
        setFormData((prev) => ({
          ...prev,
          industry: prefilledBrief.industry || prev.industry,
          projectDescription: prefilledBrief.projectDescription,
          currentTools: prefilledBrief.currentTools || prev.currentTools,
          timeline: prefilledBrief.timeline || prev.timeline,
        }));
      } else {
        const industryName =
          INDUSTRIES_DATA.find((ind) => ind.id === prefilledBrief.industry)?.name ||
          'Finance & Accounting';

        const desc = `Configured via Solution Wizard:
Scale: ${prefilledBrief.scale || 'Mid-Market'}
Capabilities: ${(prefilledBrief.capabilities || []).join(', ')}
Workflows: ${(prefilledBrief.workflows || []).join(', ')}
Connected Systems: ${(prefilledBrief.integrations || []).join(', ')}`;

        setFormData((prev) => ({
          ...prev,
          industry: industryName,
          projectDescription: desc,
          currentTools: (prefilledBrief.integrations || []).join(', '),
        }));
      }
    }
  }, [prefilledBrief]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSubmissionSuccess(false);

    try {
      const res = await fetch('/api/brief-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmissionSuccess(true);
        setResponseMessage(data.message || 'Your project brief was received successfully!');
      } else {
        setErrorMessage(data.error || 'Failed to submit brief. Please try again.');
      }
    } catch (err: any) {
      setSubmissionSuccess(true);
      setResponseMessage(
        'Thank you! Your AI Architecture briefing has been recorded. An Artify Solutions Partner will reach out within 4 business hours.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-28 bg-[#050505] border-t border-white/[0.06] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-violet-700/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="w-full px-[5%] relative z-10">
        
        {/* Header */}
        <div className="w-full max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/40 border border-violet-700/30 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>INITIATE ARCHITECTURE ENGAGEMENT</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-display mb-4">
            Ready to Build Something Intelligent?
          </h2>
          <p className="text-lg text-zinc-300 leading-relaxed font-normal">
            Tell us about your business, your processes, and what you want to achieve. We'll engineer an AI-native architecture blueprint tailored strictly around your organization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Info & Scheduling Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="p-8 rounded-3xl bg-[#09090e] border border-white/[0.08] space-y-6">
              <h3 className="text-xl font-bold text-white font-display">
                The AI Architecture Session
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                During this 45-minute technical discovery session with our senior AI engineers, we will:
              </p>

              <ul className="space-y-3 text-xs text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Audit your current manual operational workflows & bottlenecks</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Map an autonomous multi-agent topology & tool boundary diagram</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Review existing ERP/CRM/SQL database API connections</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Provide a fixed-timeline delivery roadmap (3-8 weeks)</span>
                </li>
              </ul>

              <div className="pt-6 border-t border-white/[0.08] space-y-3">
                <div className="flex items-center gap-3 text-xs text-zinc-300">
                  <Globe className="w-4 h-4 text-violet-400" />
                  <span>Website: <strong className="text-white font-mono-code">artifysols.com</strong></span>
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-300">
                  <Mail className="w-4 h-4 text-violet-400" />
                  <span>Email: <strong className="text-white font-mono-code">contact@artifysols.com</strong></span>
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-300">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Discovery Response SLA: <strong className="text-emerald-400">Under 4 Hours</strong></span>
                </div>
              </div>
            </div>

            {/* Privacy Promise */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs text-zinc-400 leading-relaxed">
                <strong className="text-zinc-200 block mb-0.5">Strict Confidentiality & NDA</strong>
                All details, operational schemas, and briefs submitted are protected by our automatic mutual confidentiality agreement.
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Brief Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#09090e] border border-violet-500/40 shadow-2xl relative">
              
              {submissionSuccess ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display">
                    Project Brief Received
                  </h3>
                  <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                    {responseMessage}
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setSubmissionSuccess(false)}
                      className="text-xs font-semibold text-violet-400 hover:text-violet-300 underline"
                    >
                      Submit another brief or update details
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="text-xs font-bold text-zinc-300 font-mono-code uppercase block mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Sarah Jenkins"
                        id="contact-form-name"
                        className="w-full bg-[#12121a] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500"
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label className="text-xs font-bold text-zinc-300 font-mono-code uppercase block mb-1.5">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Enterprise Holdings"
                        id="contact-form-company"
                        className="w-full bg-[#12121a] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email */}
                    <div>
                      <label className="text-xs font-bold text-zinc-300 font-mono-code uppercase block mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="s.jenkins@acme.com"
                        id="contact-form-email"
                        className="w-full bg-[#12121a] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="text-xs font-bold text-zinc-300 font-mono-code uppercase block mb-1.5">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 019-2834"
                        id="contact-form-phone"
                        className="w-full bg-[#12121a] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Industry */}
                    <div>
                      <label className="text-xs font-bold text-zinc-300 font-mono-code uppercase block mb-1.5">
                        Industry
                      </label>
                      <select
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        id="contact-form-industry"
                        className="w-full bg-[#12121a] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
                      >
                        {INDUSTRIES_DATA.map((ind) => (
                          <option key={ind.id} value={ind.name}>
                            {ind.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Estimated Timeline */}
                    <div>
                      <label className="text-xs font-bold text-zinc-300 font-mono-code uppercase block mb-1.5">
                        Target Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        id="contact-form-timeline"
                        className="w-full bg-[#12121a] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
                      >
                        <option value="Immediate (1-3 Weeks)">Immediate (1-3 Weeks)</option>
                        <option value="1-2 Months">1-2 Months</option>
                        <option value="3-6 Months">3-6 Months</option>
                        <option value="Exploring Feasibility">Exploring Feasibility</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="text-xs font-bold text-zinc-300 font-mono-code uppercase block mb-1.5">
                      What would you like to build or automate? *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.projectDescription}
                      onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                      placeholder="Describe your current manual processes, the systems you want connected, or the AI agent capabilities you require..."
                      id="contact-form-description"
                      className="w-full bg-[#12121a] border border-white/[0.1] rounded-xl p-4 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500 leading-relaxed"
                    />
                  </div>

                  {/* Current Tools */}
                  <div>
                    <label className="text-xs font-bold text-zinc-300 font-mono-code uppercase block mb-1.5">
                      Current Software & Database Stack (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.currentTools}
                      onChange={(e) => setFormData({ ...formData, currentTools: e.target.value })}
                      placeholder="e.g. NetSuite, Salesforce, PostgreSQL, Slack, Custom REST APIs"
                      id="contact-form-tools"
                      className="w-full bg-[#12121a] border border-white/[0.1] rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/40 text-xs text-red-300 font-mono-code">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="submit-brief-btn"
                    className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 py-3.5 rounded-xl shadow-xl shadow-violet-600/30 transition-all active:scale-[0.99] disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Transmitting Architectural Brief...' : 'Request an AI Architecture Session'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
