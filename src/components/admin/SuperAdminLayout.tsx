import React, { useState } from 'react';
import {
  LayoutDashboard,
  Layers,
  Users,
  Shield,
  GitBranch,
  Network,
  FileText,
  Activity,
  LogOut,
  Moon,
  Sun,
  Bell,
  Search,
  CheckCircle2,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAdmin } from '../../context/AdminContext';
import { SuperAdminDashboard } from './SuperAdminDashboard';
import { CmsManager } from './CmsManager';
import { ClientManager } from './ClientManager';
import { RbacManager } from './RbacManager';
import { ReleasesManager } from './ReleasesManager';
import { IntegrationsManager } from './IntegrationsManager';
import { AuditLogsView } from './AuditLogsView';
import { SystemHealthView } from './SystemHealthView';

interface SuperAdminLayoutProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const SuperAdminLayout: React.FC<SuperAdminLayoutProps> = ({ theme, onToggleTheme }) => {
  const { user, closeSuperAdmin, logout } = useAuth();
  const isLight = theme === 'light';

  // Internal system alerts & notifications state
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'SOC2 Automated Audit Verified', message: 'All tenant VPC isolation proofs passed 100%.', timestamp: '12m ago', read: false },
    { id: '2', title: 'Fleet Scale Event', message: 'Autonomous agent swarms scaled to 34 active instances.', timestamp: '1h ago', read: false },
    { id: '3', title: 'New Enterprise Lead', message: 'Apex Financial Holdings submitted a custom ERP brief.', timestamp: '3h ago', read: true },
  ]);

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const unreadNotifications = notifications.filter((n) => !n.read);

  const navItems = [
    { id: 'dashboard', label: 'Ecosystem Overview', icon: LayoutDashboard, badge: null },
    { id: 'cms', label: 'Website CMS & Studio', icon: Layers, badge: 'Live' },
    { id: 'clients', label: 'Clients & Delivery', icon: Users, badge: null },
    { id: 'rbac', label: 'Access Control & Staff', icon: Shield, badge: null },
    { id: 'releases', label: 'Release Pipeline', icon: GitBranch, badge: 'v3.4.1' },
    { id: 'integrations', label: 'Enterprise Connectors', icon: Network, badge: null },
    { id: 'audit', label: 'Governance & Audit', icon: FileText, badge: null },
    { id: 'health', label: 'Fleet Telemetry', icon: Activity, badge: '99.98%' },
  ];

  const handleExitToPublic = () => {
    closeSuperAdmin();
    window.location.hash = '#hero';
  };

  return (
    <div className={`min-h-screen font-sans flex flex-col ${
      isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#06060a] text-zinc-100'
    }`}>
      {/* Top Governance Navigation Bar */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
        isLight
          ? 'bg-white/95 border-slate-200'
          : 'bg-[#0a0a12]/95 border-white/[0.08]'
      }`}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Left: Mobile Menu Toggle & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-white/[0.08] text-zinc-400 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-violet-600/30">
                A
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`font-bold tracking-tight text-sm font-display ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Artify Sols
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-violet-500/15 text-violet-400 border border-violet-500/25">
                    Control Center
                  </span>
                </div>
                <div className="text-[10px] text-zinc-400 font-mono-code leading-none mt-0.5">
                  Multi-Tenant Governance Hub
                </div>
              </div>
            </div>
          </div>

          {/* Center: Search input */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search organizations, routes, audit logs, or agent swarms..."
                className={`w-full pl-9 pr-3 py-1.5 rounded-xl text-xs border transition-colors ${
                  isLight
                    ? 'bg-slate-100 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white'
                    : 'bg-white/[0.03] border-white/[0.08] text-white placeholder:text-zinc-500 focus:bg-white/[0.06]'
                } focus:outline-none focus:border-violet-500`}
              />
            </div>
          </div>

          {/* Right: Actions & Profile */}
          <div className="flex items-center gap-2.5">
            {/* Health pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Mesh 99.98%</span>
            </div>

            {/* Notifications toggle */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`p-2 rounded-xl border text-zinc-400 hover:text-white transition-colors relative ${
                  isLight ? 'border-slate-200 bg-white hover:bg-slate-50' : 'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06]'
                }`}
                title="System Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-500 ring-2 ring-[#0a0a12]" />
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className={`absolute right-0 mt-2 w-80 rounded-2xl border shadow-2xl p-4 z-50 ${
                  isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#0f0f18] border-white/[0.1] text-zinc-200'
                }`}>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06]">
                    <span className="font-bold text-xs">Security & Platform Alerts</span>
                    <span className="text-[10px] text-zinc-400 font-mono-code">{unreadNotifications.length} unread</span>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                          !n.read
                            ? isLight ? 'bg-violet-50 border-violet-200' : 'bg-violet-950/20 border-violet-500/30'
                            : isLight ? 'bg-slate-50 border-slate-100' : 'bg-white/[0.01] border-white/[0.04]'
                        }`}
                      >
                        <div className="font-semibold text-violet-400">{n.title}</div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">{n.message}</div>
                        <div className="text-[9px] text-zinc-500 font-mono-code mt-1">{n.timestamp}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Theme toggle */}
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-xl border transition-colors ${
                isLight ? 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700' : 'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] text-zinc-400'
              }`}
              title="Toggle Theme"
            >
              {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Exit to Public Site */}
            <button
              onClick={handleExitToPublic}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/[0.1] hover:bg-white/[0.05] text-xs font-semibold text-zinc-300 transition-colors"
              title="Return to public website"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </button>

            {/* Operator Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-white/[0.08]">
              <div className="w-8 h-8 rounded-xl bg-violet-600/30 border border-violet-500/40 text-violet-300 flex items-center justify-center font-bold text-xs">
                {user?.name ? user.name.charAt(0) : 'S'}
              </div>
              <div className="hidden xl:block text-left">
                <div className={`text-xs font-bold leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {user?.name || 'Super Admin'}
                </div>
                <div className="text-[10px] text-violet-400 font-mono-code leading-none">
                  Root Governance
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Body container: Sidebar + Main Workspace */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Sidebar Navigation (Desktop) */}
        <aside className={`hidden lg:flex flex-col w-64 border-r shrink-0 p-4 justify-between transition-colors ${
          isLight ? 'bg-white/80 border-slate-200' : 'bg-[#08080e]/80 border-white/[0.06]'
        }`}>
          <div className="space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono-code">
              Control Center Navigation
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-violet-600 text-white shadow-md shadow-violet-600/25'
                      : isLight
                      ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono-code font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white/[0.06] text-zinc-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Card: Operator session & quick sign out */}
          <div className={`p-3 rounded-2xl border ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/[0.06]'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold text-zinc-400 font-mono-code">Operator Session</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <div className="text-xs font-semibold text-zinc-200 truncate">{user?.email || 'admin@artifysols.com'}</div>
            <div className="text-[10px] text-zinc-500 mt-0.5">MFA Session: Hardware Verified</div>

            <button
              onClick={handleExitToPublic}
              className="mt-3 w-full py-1.5 rounded-lg border border-white/[0.08] hover:bg-white/[0.05] text-[11px] font-semibold text-zinc-300 flex items-center justify-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Back to Public Site</span>
            </button>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex">
            <div className={`w-72 h-full p-4 flex flex-col justify-between border-r ${
              isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#090910] border-white/[0.1] text-white'
            }`}>
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                  <span className="font-bold text-sm font-display">Control Center</span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 rounded text-zinc-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-violet-600 text-white shadow-md'
                            : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[10px] font-mono-code font-bold opacity-75">{item.badge}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={handleExitToPublic}
                className="py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-xs font-bold text-zinc-300 flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                <span>Return to Public Site</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && <SuperAdminDashboard theme={theme} onNavigateTab={setActiveTab} />}
          {activeTab === 'cms' && <CmsManager theme={theme} />}
          {activeTab === 'clients' && <ClientManager theme={theme} />}
          {activeTab === 'rbac' && <RbacManager theme={theme} />}
          {activeTab === 'releases' && <ReleasesManager theme={theme} />}
          {activeTab === 'integrations' && <IntegrationsManager theme={theme} />}
          {activeTab === 'audit' && <AuditLogsView theme={theme} />}
          {activeTab === 'health' && <SystemHealthView theme={theme} />}
        </main>
      </div>
    </div>
  );
};
