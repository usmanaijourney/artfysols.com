import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ClientDashboard } from './ClientDashboard';
import { PortalOverview } from './PortalOverview';
import { PortalSubscriptions } from './PortalSubscriptions';
import { PortalProducts } from './PortalProducts';
import { PortalInvoices } from './PortalInvoices';
import { PortalApiKeys } from './PortalApiKeys';
import { PortalSettings } from './PortalSettings';
import { PortalSeoHealth } from './PortalSeoHealth';
import {
  LayoutDashboard,
  CreditCard,
  Layers,
  Receipt,
  Key,
  Settings,
  ArrowLeft,
  LogOut,
  Bell,
  Sun,
  Moon,
  ShieldCheck,
  Bot,
  ExternalLink,
  Plus,
  CheckCircle2,
  ChevronDown,
  User,
  TrendingUp,
} from 'lucide-react';

interface ClientPortalProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({
  theme,
  onToggleTheme,
}) => {
  const {
    user,
    portalActiveTab,
    setPortalActiveTab,
    closePortal,
    logout,
    openAuthModal,
  } = useAuth();

  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-violet-400">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-display">Client Portal Authentication Required</h1>
          <p className="text-sm text-zinc-400 mt-1 max-w-md">
            Please log in with your verified corporate credentials to access your subscriptions and purchased AI systems.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => openAuthModal('login')}
            className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-lg shadow-violet-600/30"
          >
            Sign In to Client Portal
          </button>
          <button
            onClick={closePortal}
            className="px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-zinc-300 text-xs font-semibold"
          >
            Return to Main Website
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Client Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'seo', label: 'SEO Health & SERP', icon: TrendingUp, badge: '94/100' },
    { id: 'subscriptions', label: 'Subscriptions & Billing', icon: CreditCard, badge: user.subscription.planId.toUpperCase() },
    { id: 'products', label: 'Purchased AI Systems', icon: Layers, badge: user.purchasedProducts.length.toString() },
    { id: 'invoices', label: 'Invoices & Receipts', icon: Receipt, badge: null },
    { id: 'apikeys', label: 'API Keys & Webhooks', icon: Key, badge: null },
    { id: 'settings', label: 'Organization Settings', icon: Settings, badge: null },
  ];

  const isLight = theme === 'light';

  return (
    <div
      className={`min-h-screen ${
        isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#050508] text-[#F5F5F5]'
      } transition-colors duration-300 relative flex flex-col`}
      id="artify-client-portal-root"
    >
      {/* Top Portal Navigation Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-xl border-b px-4 sm:px-8 py-3.5 shadow-xl transition-colors ${
        isLight ? 'bg-white/95 border-slate-200 shadow-slate-200/50' : 'bg-[#09090f]/90 border-white/[0.08]'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Brand & Return */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={closePortal}
              id="portal-back-to-site-btn"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all group ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 hover:text-slate-900'
                  : 'bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.08] text-zinc-300 hover:text-white'
              }`}
              title="Return to Main Website"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform text-violet-500" />
              <span className="hidden sm:inline">Back to Main Site</span>
              <span className="sm:hidden">Exit</span>
            </button>

            <div className={`h-5 w-[1px] ${isLight ? 'bg-slate-200' : 'bg-white/[0.1]'}`} />

            {/* Brand Title */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 p-[1px]">
                <div className={`w-full h-full rounded-[7px] flex items-center justify-center ${
                  isLight ? 'bg-violet-50 text-violet-600' : 'bg-[#0c0c12] text-violet-400'
                }`}>
                  <Bot className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className={`text-sm font-bold font-display tracking-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  ARTIFY CLIENT PORTAL
                </span>
                <span className={`hidden md:inline-block ml-2 text-[10px] uppercase font-mono-code px-2 py-0.5 rounded-full border ${
                  isLight
                    ? 'bg-violet-100 border-violet-200 text-violet-800'
                    : 'bg-violet-950/70 border-violet-500/30 text-violet-300'
                }`}>
                  {user.company}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Notifications, Theme, User Dropdown */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-lg border transition-colors ${
                isLight
                  ? 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                  : 'bg-[#12121c] border-white/[0.08] text-zinc-300 hover:text-white'
              }`}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-violet-600" />
              )}
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className={`p-2 rounded-lg border transition-colors relative ${
                  isLight
                    ? 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                    : 'bg-[#12121c] border-white/[0.08] text-zinc-300 hover:text-white'
                }`}
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
              </button>

              {notificationsOpen && (
                <div className={`absolute right-0 mt-2 w-80 p-4 rounded-2xl shadow-2xl backdrop-blur-2xl z-50 text-xs animate-in zoom-in-95 border ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-900'
                    : 'bg-[#0e0e18] border-violet-500/30 text-white'
                }`}>
                  <div className={`flex items-center justify-between pb-2 border-b mb-2 font-bold ${
                    isLight ? 'border-slate-200 text-slate-900' : 'border-white/[0.08] text-white'
                  }`}>
                    <span>Autonomous Fleet Alerts</span>
                    <span className={`text-[10px] font-mono-code ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>All Systems Normal</span>
                  </div>
                  <div className={`space-y-2 ${isLight ? 'text-slate-700' : 'text-zinc-300'}`}>
                    <div className={`p-2 rounded-lg border ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/40 border-white/[0.04]'
                    }`}>
                      <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>Invoice Reconciliation v3.4</div>
                      <div className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                        14,200 supplier invoices matched in NetSuite with zero exceptions.
                      </div>
                      <div className={`text-[9px] mt-1 ${isLight ? 'text-slate-400' : 'text-zinc-500'}`}>10 minutes ago</div>
                    </div>
                    <div className={`p-2 rounded-lg border ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/40 border-white/[0.04]'
                    }`}>
                      <div className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>Monthly Usage Snapshot</div>
                      <div className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                        Saved 340 operator hours this month. Fleet efficiency up 18%.
                      </div>
                      <div className={`text-[9px] mt-1 ${isLight ? 'text-slate-400' : 'text-zinc-500'}`}>2 hours ago</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Pill & Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                id="portal-user-dropdown-btn"
                className={`flex items-center gap-2.5 p-1 sm:px-3 sm:py-1.5 rounded-xl border text-left transition-all ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-900'
                    : 'bg-[#13131f] hover:bg-[#1a1a2a] border-white/[0.08]'
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div className="hidden sm:block">
                  <div className={`text-xs font-bold leading-none truncate max-w-[120px] ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    {user.name}
                  </div>
                  <div className={`text-[10px] font-mono-code leading-none mt-0.5 truncate max-w-[120px] ${
                    isLight ? 'text-violet-700' : 'text-violet-400'
                  }`}>
                    {user.subscription.planName.split(' ')[0]} Tier
                  </div>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 hidden sm:block ${isLight ? 'text-slate-500' : 'text-zinc-400'}`} />
              </button>

              {userDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-56 p-2 rounded-2xl shadow-2xl backdrop-blur-2xl z-50 text-xs animate-in zoom-in-95 border ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-900'
                    : 'bg-[#0e0e18] border-violet-500/30 text-white'
                }`}>
                  <div className={`p-2.5 border-b mb-1 ${isLight ? 'border-slate-200' : 'border-white/[0.08]'}`}>
                    <div className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{user.name}</div>
                    <div className={`text-[11px] truncate ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>{user.email}</div>
                    <div className={`text-[10px] font-mono-code mt-0.5 ${isLight ? 'text-violet-700 font-semibold' : 'text-violet-400'}`}>{user.company}</div>
                  </div>

                  <button
                    onClick={() => {
                      setPortalActiveTab('settings');
                      setUserDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 p-2 rounded-lg text-left transition-colors ${
                      isLight ? 'hover:bg-slate-100 text-slate-700 hover:text-slate-900' : 'hover:bg-white/[0.06] text-zinc-300 hover:text-white'
                    }`}
                  >
                    <Settings className={`w-3.5 h-3.5 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`} />
                    <span>Account Settings</span>
                  </button>

                  <button
                    onClick={() => {
                      setPortalActiveTab('subscriptions');
                      setUserDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 p-2 rounded-lg text-left transition-colors ${
                      isLight ? 'hover:bg-slate-100 text-slate-700 hover:text-slate-900' : 'hover:bg-white/[0.06] text-zinc-300 hover:text-white'
                    }`}
                  >
                    <CreditCard className={`w-3.5 h-3.5 ${isLight ? 'text-violet-600' : 'text-violet-400'}`} />
                    <span>Manage Subscriptions</span>
                  </button>

                  <div className={`my-1 border-t ${isLight ? 'border-slate-200' : 'border-white/[0.06]'}`} />

                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    id="portal-logout-btn"
                    className={`w-full flex items-center gap-2 p-2 rounded-lg text-left transition-colors ${
                      isLight ? 'hover:bg-rose-50 text-rose-600 hover:text-rose-700' : 'hover:bg-rose-950/40 text-rose-400 hover:text-rose-300'
                    }`}
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out of Portal</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content & Tabs */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 flex-1 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-20 space-y-2">
            <div className={`px-3 py-1.5 text-[11px] font-bold font-mono-code uppercase tracking-wider ${
              isLight ? 'text-slate-500' : 'text-zinc-400'
            }`}>
              Navigation
            </div>
            <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-1.5 pb-2 lg:pb-0">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = portalActiveTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setPortalActiveTab(tab.id)}
                    id={`portal-nav-${tab.id}`}
                    className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap lg:whitespace-normal ${
                      isActive
                        ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                        : isLight
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                        : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : isLight ? 'text-violet-600' : 'text-violet-400'}`} />
                      <span>{tab.label}</span>
                    </div>

                    {tab.badge && (
                      <span
                        className={`text-[10px] font-mono-code px-1.5 py-0.2 rounded-full ${
                          isActive
                            ? 'bg-white/20 text-white font-bold'
                            : isLight
                            ? 'bg-slate-200 text-slate-700'
                            : 'bg-white/[0.06] text-zinc-400'
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Quick Support Card in Sidebar */}
            <div className="hidden lg:block pt-6">
              <div className={`p-4 rounded-2xl space-y-2 text-xs border ${
                isLight ? 'bg-white border-slate-200 text-slate-800 shadow-sm' : 'bg-black/40 border-white/[0.06]'
              }`}>
                <div className={`font-bold flex items-center gap-1.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  <ShieldCheck className={`w-4 h-4 ${isLight ? 'text-violet-600' : 'text-violet-400'}`} />
                  <span>Enterprise Fleet SLA</span>
                </div>
                <p className={`text-[11px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                  24/7 autonomous monitoring with real-time automated rollback and canary deployment security.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Tab Content Panel */}
        <main className="flex-1 min-w-0">
          {portalActiveTab === 'overview' && (
            <ClientDashboard
              onNavigateTab={setPortalActiveTab}
              onOpenDeployModal={() => setIsDeployModalOpen(true)}
              theme={theme}
            />
          )}

          {portalActiveTab === 'seo' && <PortalSeoHealth theme={theme} />}

          {portalActiveTab === 'subscriptions' && <PortalSubscriptions theme={theme} />}

          {portalActiveTab === 'products' && (
            <PortalProducts
              isDeployModalOpen={isDeployModalOpen}
              onCloseDeployModal={() => setIsDeployModalOpen(false)}
              onOpenDeployModal={() => setIsDeployModalOpen(true)}
              theme={theme}
            />
          )}

          {portalActiveTab === 'invoices' && <PortalInvoices theme={theme} />}

          {portalActiveTab === 'apikeys' && <PortalApiKeys theme={theme} />}

          {portalActiveTab === 'settings' && <PortalSettings theme={theme} />}
        </main>
      </div>

      {/* Footer */}
      <footer className={`border-t py-6 px-4 sm:px-8 text-center text-xs transition-colors ${
        isLight ? 'border-slate-200 text-slate-500 bg-white/50' : 'border-white/[0.06] text-zinc-500'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© 2026 Artify Solutions Inc. All rights reserved.</span>
          <div className={`flex items-center gap-4 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
            <button onClick={closePortal} className={isLight ? 'hover:text-slate-900 transition-colors' : 'hover:text-white transition-colors'}>
              Main Site
            </button>
            <span>•</span>
            <button onClick={() => setPortalActiveTab('seo')} className={isLight ? 'hover:text-slate-900 transition-colors' : 'hover:text-white transition-colors'}>
              SEO Health
            </button>
            <span>•</span>
            <button onClick={() => setPortalActiveTab('subscriptions')} className={isLight ? 'hover:text-slate-900 transition-colors' : 'hover:text-white transition-colors'}>
              Subscriptions
            </button>
            <span>•</span>
            <button onClick={() => setPortalActiveTab('products')} className={isLight ? 'hover:text-slate-900 transition-colors' : 'hover:text-white transition-colors'}>
              Products
            </button>
            <span>•</span>
            <button onClick={() => setPortalActiveTab('invoices')} className={isLight ? 'hover:text-slate-900 transition-colors' : 'hover:text-white transition-colors'}>
              Tax Receipts
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
