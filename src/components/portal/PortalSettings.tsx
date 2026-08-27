import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  User,
  Building,
  Mail,
  Phone,
  Globe,
  ShieldCheck,
  Lock,
  Users,
  Bell,
  CheckCircle2,
  Save,
} from 'lucide-react';

export const PortalSettings: React.FC<{ theme?: 'dark' | 'light' }> = ({ theme = 'dark' }) => {
  const isLight = theme === 'light';
  const { user, updateUserProfile } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [company, setCompany] = useState(user?.company || '');
  const [role, setRole] = useState(user?.role || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [timezone, setTimezone] = useState(user?.timezone || 'America/Los_Angeles (PST)');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  if (!user) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      company,
      role,
      phone,
      timezone,
    });
    setFeedbackMsg('Organization profile updated successfully.');
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className={`text-2xl sm:text-3xl font-bold font-display tracking-tight ${
          isLight ? 'text-slate-900' : 'text-white'
        }`}>
          Organization & Account Settings
        </h1>
        <p className={`text-xs sm:text-sm mt-1 ${
          isLight ? 'text-slate-600' : 'text-zinc-400'
        }`}>
          Configure company profile, security policies, team access, and notification webhooks.
        </p>
      </div>

      {feedbackMsg && (
        <div className={`p-4 rounded-xl border text-xs font-semibold flex items-center gap-2 animate-in fade-in ${
          isLight
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
        }`}>
          <CheckCircle2 className={`w-4 h-4 shrink-0 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Organization Profile Form */}
      <form onSubmit={handleSave} className={`p-6 rounded-2xl border space-y-6 shadow-sm ${
        isLight
          ? 'bg-white border-slate-200'
          : 'bg-[#0c0c14] border-white/[0.08] shadow-xl'
      }`}>
        <h2 className={`text-sm font-bold font-display flex items-center gap-2 pb-3 border-b ${
          isLight ? 'text-slate-900 border-slate-100' : 'text-white border-white/[0.06]'
        }`}>
          <Building className={`w-4 h-4 ${isLight ? 'text-violet-600' : 'text-violet-400'}`} />
          <span>Corporate Profile</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className={`block font-semibold mb-1.5 ${isLight ? 'text-slate-700' : 'text-zinc-400'}`}>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={`w-full border rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-violet-500 ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                  : 'bg-[#12121e] border-white/[0.1] text-white placeholder-zinc-500'
              }`}
            />
          </div>

          <div>
            <label className={`block font-semibold mb-1.5 ${isLight ? 'text-slate-700' : 'text-zinc-400'}`}>Work Email (Primary)</label>
            <input
              type="email"
              disabled
              value={user.email}
              className={`w-full border rounded-xl px-3.5 py-2.5 font-mono-code cursor-not-allowed ${
                isLight
                  ? 'bg-slate-100 border-slate-200 text-slate-500'
                  : 'bg-black/40 border-white/[0.06] text-zinc-400'
              }`}
            />
          </div>

          <div>
            <label className={`block font-semibold mb-1.5 ${isLight ? 'text-slate-700' : 'text-zinc-400'}`}>Company / Organization</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className={`w-full border rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-violet-500 ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-900'
                  : 'bg-[#12121e] border-white/[0.1] text-white'
              }`}
            />
          </div>

          <div>
            <label className={`block font-semibold mb-1.5 ${isLight ? 'text-slate-700' : 'text-zinc-400'}`}>Executive Role / Title</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className={`w-full border rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-violet-500 ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-900'
                  : 'bg-[#12121e] border-white/[0.1] text-white'
              }`}
            />
          </div>

          <div>
            <label className={`block font-semibold mb-1.5 ${isLight ? 'text-slate-700' : 'text-zinc-400'}`}>Direct Phone</label>
            <input
              type="tel"
              value={phone}
              placeholder="+1 (555) 000-0000"
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full border rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-violet-500 ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                  : 'bg-[#12121e] border-white/[0.1] text-white'
              }`}
            />
          </div>

          <div>
            <label className={`block font-semibold mb-1.5 ${isLight ? 'text-slate-700' : 'text-zinc-400'}`}>Primary Timezone</label>
            <input
              type="text"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className={`w-full border rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-violet-500 ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-900'
                  : 'bg-[#12121e] border-white/[0.1] text-white'
              }`}
            />
          </div>
        </div>

        <div className={`flex justify-end pt-4 border-t ${
          isLight ? 'border-slate-100' : 'border-white/[0.06]'
        }`}>
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Changes</span>
          </button>
        </div>
      </form>

      {/* Security & Access Card */}
      <div className={`p-6 rounded-2xl border space-y-5 shadow-sm ${
        isLight
          ? 'bg-white border-slate-200'
          : 'bg-[#0c0c14] border-white/[0.08]'
      }`}>
        <h2 className={`text-sm font-bold font-display flex items-center gap-2 pb-3 border-b ${
          isLight ? 'text-slate-900 border-slate-100' : 'text-white border-white/[0.06]'
        }`}>
          <ShieldCheck className={`w-4 h-4 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
          <span>Security, SSO & Compliance</span>
        </h2>

        <div className="space-y-4">
          <div className={`flex items-center justify-between p-4 rounded-xl border ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/40 border-white/[0.06]'
          }`}>
            <div>
              <div className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Enterprise Single Sign-On (SAML / Okta)</div>
              <div className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                Enforce corporate Google Workspace or Okta SAML logins for all team members.
              </div>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase border ${
              isLight
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-emerald-950/60 border-emerald-500/30 text-emerald-400'
            }`}>
              Configured
            </span>
          </div>

          <div className={`flex items-center justify-between p-4 rounded-xl border ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/40 border-white/[0.06]'
          }`}>
            <div>
              <div className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Two-Factor Authentication (2FA)</div>
              <div className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                Hardware security keys (YubiKey) or authenticator apps (TOTP).
              </div>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase border ${
              isLight
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-emerald-950/60 border-emerald-500/30 text-emerald-400'
            }`}>
              Enforced
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
