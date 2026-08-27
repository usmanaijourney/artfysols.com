import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  X,
  Lock,
  Mail,
  Building2,
  User,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '../../data/portalData';

export const AuthModal: React.FC<{ theme?: 'dark' | 'light' }> = ({ theme: propTheme }) => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    openAuthModal,
    login,
    loginAsDemo,
    register,
  } = useAuth();

  const isLight = propTheme === 'light' || (typeof document !== 'undefined' && document.documentElement.classList.contains('theme-light'));

  const [mode, setMode] = useState<'login' | 'signup'>(authModalMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('VP of Operations');
  const [selectedPlanId, setSelectedPlanId] = useState<'starter' | 'growth' | 'enterprise'>('growth');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Keep mode in sync with context when modal opens
  React.useEffect(() => {
    setMode(authModalMode);
    setErrorMsg('');
  }, [authModalMode, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!email || !email.includes('@')) {
      setErrorMsg('Please provide a valid corporate email address.');
      return;
    }
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!name || !email || !company) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }
    if (!email.includes('@')) {
      setErrorMsg('Please provide a valid business email address.');
      return;
    }
    setIsLoading(true);
    try {
      await register({
        name,
        email,
        company,
        role,
        planId: selectedPlanId,
      });
    } catch (err: any) {
      setErrorMsg(err?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      id="client-auth-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
    >
      <div
        className={`relative w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden my-8 animate-in zoom-in-95 duration-200 border ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900 shadow-2xl'
            : 'bg-[#0d0d14] border-violet-500/30 text-zinc-100 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_30px_rgba(139,92,246,0.15)]'
        }`}
        id="client-auth-modal-card"
      >
        {/* Top Gradient Ribbon */}
        <div className="h-1.5 w-full bg-gradient-to-r from-violet-600 via-indigo-500 to-sky-500" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className={`absolute top-4 right-4 p-2 rounded-xl transition-colors z-10 ${
            isLight
              ? 'text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
              : 'text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08]'
          }`}
          id="close-auth-modal-btn"
          aria-label="Close Authentication Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 p-[1px] shadow-lg shadow-violet-600/30 flex items-center justify-center">
              <div className={`w-full h-full rounded-[11px] flex items-center justify-center ${
                isLight ? 'bg-white text-violet-600' : 'bg-[#0c0c12] text-violet-400'
              }`}>
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h2 className={`text-xl font-bold tracking-tight font-display flex items-center gap-2 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                <span>Artify Client Portal</span>
                <span className={`text-[10px] font-mono-code uppercase px-2 py-0.5 rounded-full border ${
                  isLight
                    ? 'bg-violet-50 border-violet-200 text-violet-700 font-semibold'
                    : 'bg-violet-950/70 border-violet-500/30 text-violet-300'
                }`}>
                  Secured
                </span>
              </h2>
              <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                Manage your enterprise subscriptions, agent fleets, and purchased AI systems.
              </p>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className={`flex rounded-xl p-1 mb-6 border ${
            isLight ? 'bg-slate-100 border-slate-200' : 'bg-black/40 border-white/[0.08]'
          }`}>
            <button
              onClick={() => {
                setMode('login');
                setErrorMsg('');
              }}
              id="auth-tab-login"
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Sign In to Portal
            </button>
            <button
              onClick={() => {
                setMode('signup');
                setErrorMsg('');
              }}
              id="auth-tab-signup"
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === 'signup'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Create Client Account
            </button>
          </div>

          {/* Quick Demo Access Bar */}
          <div className={`mb-6 p-3.5 rounded-xl border ${
            isLight
              ? 'bg-violet-50/70 border-violet-200'
              : 'bg-violet-950/30 border-violet-500/20'
          }`}>
            <div className="flex items-center justify-between mb-2.5">
              <span className={`text-[11px] font-semibold flex items-center gap-1.5 font-mono-code uppercase tracking-wider ${
                isLight ? 'text-violet-800' : 'text-violet-300'
              }`}>
                <Sparkles className={`w-3.5 h-3.5 ${isLight ? 'text-violet-600' : 'text-violet-400'}`} />
                <span>Instant 1-Click Demo Profiles</span>
              </span>
              <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>Pre-configured accounts</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => loginAsDemo('enterprise')}
                id="demo-login-enterprise-btn"
                className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all group ${
                  isLight
                    ? 'bg-white hover:bg-violet-100/60 border-violet-200 shadow-sm'
                    : 'bg-black/40 hover:bg-violet-900/40 border-violet-500/25'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 group-hover:scale-105 transition-transform ${
                  isLight
                    ? 'bg-violet-100 text-violet-700 border border-violet-300'
                    : 'bg-violet-600/30 border border-violet-400/40 text-violet-300'
                }`}>
                  SJ
                </div>
                <div className="min-w-0">
                  <div className={`text-xs font-semibold truncate ${
                    isLight ? 'text-slate-900 group-hover:text-violet-900' : 'text-white group-hover:text-violet-200'
                  }`}>
                    Sarah (Admin)
                  </div>
                  <div className={`text-[9px] truncate ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>Apex Logistics</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => loginAsDemo('editor')}
                id="demo-login-editor-btn"
                className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all group ${
                  isLight
                    ? 'bg-white hover:bg-purple-100/60 border-purple-200 shadow-sm'
                    : 'bg-black/40 hover:bg-purple-900/40 border-purple-500/25'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 group-hover:scale-105 transition-transform ${
                  isLight
                    ? 'bg-purple-100 text-purple-700 border border-purple-300'
                    : 'bg-purple-600/30 border border-purple-400/40 text-purple-300'
                }`}>
                  DV
                </div>
                <div className="min-w-0">
                  <div className={`text-xs font-semibold truncate ${
                    isLight ? 'text-slate-900 group-hover:text-purple-900' : 'text-white group-hover:text-purple-200'
                  }`}>
                    Devon (Editor)
                  </div>
                  <div className={`text-[9px] truncate ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>Staff Publisher</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => loginAsDemo('growth')}
                id="demo-login-growth-btn"
                className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all group ${
                  isLight
                    ? 'bg-white hover:bg-indigo-100/60 border-indigo-200 shadow-sm'
                    : 'bg-black/40 hover:bg-indigo-900/40 border-indigo-500/25'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 group-hover:scale-105 transition-transform ${
                  isLight
                    ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                    : 'bg-indigo-600/30 border border-indigo-400/40 text-indigo-300'
                }`}>
                  MV
                </div>
                <div className="min-w-0">
                  <div className={`text-xs font-semibold truncate ${
                    isLight ? 'text-slate-900 group-hover:text-indigo-900' : 'text-white group-hover:text-indigo-200'
                  }`}>
                    Marcus (Growth)
                  </div>
                  <div className={`text-[9px] truncate ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>FinMatrix.io</div>
                </div>
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className={`mb-4 p-3 rounded-lg border text-xs flex items-center gap-2 animate-in fade-in ${
              isLight
                ? 'bg-rose-50 border-rose-200 text-rose-800'
                : 'bg-rose-950/40 border-rose-500/30 text-rose-300'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4" id="client-login-form">
              <div>
                <label className={`block text-xs font-medium mb-1.5 ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>
                  Corporate Email Address
                </label>
                <div className="relative">
                  <Mail className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${isLight ? 'text-slate-400' : 'text-zinc-500'}`} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. s.jenkins@apexlogistics.com"
                    required
                    id="login-email-input"
                    className={`w-full rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-violet-500 transition-colors border ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white'
                        : 'bg-[#14141e] border-white/[0.1] text-white placeholder-zinc-500'
                    }`}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className={`block text-xs font-medium ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>Password</label>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('s.jenkins@apexlogistics.com');
                      setPassword('demo-enterprise-2026');
                    }}
                    className={`text-[11px] font-medium transition-colors ${
                      isLight ? 'text-violet-700 hover:text-violet-800' : 'text-violet-400 hover:text-violet-300'
                    }`}
                  >
                    Auto-fill demo credentials
                  </button>
                </div>
                <div className="relative">
                  <Lock className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${isLight ? 'text-slate-400' : 'text-zinc-500'}`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your portal password"
                    id="login-password-input"
                    className={`w-full rounded-xl pl-10 pr-10 py-2.5 text-xs focus:outline-none focus:border-violet-500 transition-colors border ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white'
                        : 'bg-[#14141e] border-white/[0.1] text-white placeholder-zinc-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3.5 top-1/2 -translate-y-1/2 ${
                      isLight ? 'text-slate-400 hover:text-slate-600' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className={`flex items-center gap-2 cursor-pointer ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded text-violet-600 focus:ring-0 w-3.5 h-3.5"
                  />
                  <span>Keep me signed in</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password reset instructions have been dispatched to your corporate email.')}
                  className={`transition-colors ${isLight ? 'text-slate-500 hover:text-slate-900' : 'text-zinc-400 hover:text-white'}`}
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                id="submit-login-btn"
                className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-violet-600/30 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Credentials...</span>
                  </span>
                ) : (
                  <>
                    <span>Enter Client Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Partner Access Notice */}
              <div className={`mt-3 p-3 rounded-xl border text-[11px] leading-relaxed flex items-center justify-between gap-2.5 ${
                isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-600'
                  : 'bg-white/[0.03] border-white/[0.06] text-zinc-400'
              }`}>
                <div className="flex items-center gap-1.5 min-w-0">
                  <Lock className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                  <span className="truncate">Portal & Backend are reserved for contracted partners.</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    closeAuthModal();
                    window.location.hash = '#about-page';
                    setTimeout(() => {
                      const el = document.getElementById('partner-access-policy');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="text-violet-400 hover:text-violet-300 font-semibold underline shrink-0 whitespace-nowrap"
                >
                  Partner Policy
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-3.5" id="client-signup-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={`block text-xs font-medium mb-1 ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>Full Name</label>
                  <div className="relative">
                    <User className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${isLight ? 'text-slate-400' : 'text-zinc-500'}`} />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Jordan Miller"
                      required
                      id="signup-name-input"
                      className={`w-full rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-violet-500 border ${
                        isLight
                          ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white'
                          : 'bg-[#14141e] border-white/[0.1] text-white placeholder-zinc-500'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-1 ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>Corporate Email</label>
                  <div className="relative">
                    <Mail className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${isLight ? 'text-slate-400' : 'text-zinc-500'}`} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. j.miller@corp.com"
                      required
                      id="signup-email-input"
                      className={`w-full rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-violet-500 border ${
                        isLight
                          ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white'
                          : 'bg-[#14141e] border-white/[0.1] text-white placeholder-zinc-500'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={`block text-xs font-medium mb-1 ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>Company / Organization</label>
                  <div className="relative">
                    <Building2 className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${isLight ? 'text-slate-400' : 'text-zinc-500'}`} />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Nexus Global Enterprises"
                      required
                      id="signup-company-input"
                      className={`w-full rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-violet-500 border ${
                        isLight
                          ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white'
                          : 'bg-[#14141e] border-white/[0.1] text-white placeholder-zinc-500'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-medium mb-1 ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>Role / Title</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Chief Technology Officer"
                    id="signup-role-input"
                    className={`w-full rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-violet-500 border ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white'
                        : 'bg-[#14141e] border-white/[0.1] text-white placeholder-zinc-500'
                    }`}
                  />
                </div>
              </div>

              {/* Initial Plan Selection */}
              <div>
                <label className={`block text-xs font-medium mb-1.5 ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>
                  Select Initial Subscription Tier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {SUBSCRIPTION_PLANS.map((plan) => (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelectedPlanId(plan.id as any)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedPlanId === plan.id
                          ? isLight
                            ? 'bg-violet-50 border-violet-500 shadow-md shadow-violet-500/10'
                            : 'bg-violet-950/50 border-violet-500 shadow-md shadow-violet-500/20'
                          : isLight
                          ? 'bg-slate-50 border-slate-200 hover:border-slate-300'
                          : 'bg-[#12121c] border-white/[0.08] hover:border-white/[0.2]'
                      }`}
                    >
                      <div className={`text-[11px] font-bold truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        {plan.name.split(' ')[0]}
                      </div>
                      <div className={`text-[10px] font-mono-code font-semibold ${isLight ? 'text-violet-700' : 'text-violet-400'}`}>
                        ${plan.priceMonthly}/mo
                      </div>
                      <div className={`text-[9px] mt-0.5 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>{plan.agentConcurrencyLimit} Agents</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                id="submit-signup-btn"
                className="w-full mt-3 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-violet-600/30 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Provisioning Client Portal...</span>
                  </span>
                ) : (
                  <>
                    <span>Create Account & Launch Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer Security Badge */}
          <div className={`mt-6 pt-4 border-t flex items-center justify-between text-[11px] ${
            isLight ? 'border-slate-200 text-slate-500' : 'border-white/[0.08] text-zinc-400'
          }`}>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
              <span>SOC2 Type II & HIPAA Certified Infrastructure</span>
            </span>
            <span className={`font-mono-code text-[10px] ${isLight ? 'text-slate-400' : 'text-zinc-500'}`}>256-Bit SSL Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};
