import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CATALOG_PRODUCTS } from '../../data/portalData';
import { PurchasedProduct } from '../../types';
import {
  Layers,
  Bot,
  CheckCircle2,
  Copy,
  ExternalLink,
  RotateCcw,
  Sparkles,
  Server,
  Activity,
  Key,
  ShieldAlert,
  Search,
  Plus,
  X,
  Clock,
  Zap,
  ChevronRight,
} from 'lucide-react';

interface PortalProductsProps {
  isDeployModalOpen: boolean;
  onCloseDeployModal: () => void;
  onOpenDeployModal: () => void;
  theme?: 'dark' | 'light';
}

export const PortalProducts: React.FC<PortalProductsProps> = ({
  isDeployModalOpen,
  onCloseDeployModal,
  onOpenDeployModal,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';
  const {
    user,
    purchaseCatalogProduct,
    restartProductDeployment,
    updateProductSettings,
  } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<PurchasedProduct | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  if (!user) return null;

  const filteredProducts = user.purchasedProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2500);
  };

  const handleDeployNew = (productCode: string) => {
    purchaseCatalogProduct(productCode);
    onCloseDeployModal();
    setFeedbackMsg('New AI Solution successfully provisioned and deployed to your fleet!');
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  // Find unpurchased catalog items
  const unpurchasedCatalog = CATALOG_PRODUCTS.filter(
    (cat) => !user.purchasedProducts.some((p) => p.code === cat.code)
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-2xl sm:text-3xl font-bold font-display tracking-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Purchased AI Products & Systems
          </h1>
          <p className={`text-xs sm:text-sm mt-1 ${
            isLight ? 'text-slate-600' : 'text-zinc-400'
          }`}>
            Manage your deployed autonomous agents, runtime API endpoints, license keys, and telemetry.
          </p>
        </div>

        <button
          onClick={onOpenDeployModal}
          id="deploy-new-solution-btn"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 transition-all hover:scale-[1.02] self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Deploy New AI Solution</span>
        </button>
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

      {/* Search & Filter Bar */}
      <div className={`flex items-center gap-3 border rounded-xl px-4 py-2.5 ${
        isLight
          ? 'bg-white border-slate-200 shadow-sm'
          : 'bg-[#0c0c14] border-white/[0.08]'
      }`}>
        <Search className={`w-4 h-4 ${isLight ? 'text-slate-400' : 'text-zinc-400'}`} />
        <input
          type="text"
          placeholder="Filter by system name, agent type, or product code..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full bg-transparent text-xs focus:outline-none ${
            isLight
              ? 'text-slate-900 placeholder-slate-400'
              : 'text-white placeholder-zinc-500'
          }`}
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={`rounded-2xl border transition-all p-6 space-y-5 shadow-sm flex flex-col justify-between ${
              isLight
                ? 'bg-white border-slate-200 hover:border-violet-300 hover:shadow-md'
                : 'bg-[#0c0c14] border-white/[0.08] hover:border-violet-500/40 shadow-xl'
            }`}
          >
            <div>
              {/* Card Header */}
              <div className={`flex items-start justify-between gap-3 pb-4 border-b ${
                isLight ? 'border-slate-100' : 'border-white/[0.06]'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                    isLight
                      ? 'bg-violet-100 border-violet-200 text-violet-700'
                      : 'bg-violet-950/70 border-violet-500/30 text-violet-300'
                  }`}>
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className={`text-sm sm:text-base font-bold font-display ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}>
                        {product.name}
                      </h2>
                      <span className={`text-[10px] font-mono-code px-2 py-0.5 rounded border ${
                        isLight
                          ? 'bg-slate-100 border-slate-200 text-slate-700'
                          : 'bg-white/[0.06] border-white/[0.08] text-zinc-300'
                      }`}>
                        {product.version}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] font-mono-code uppercase font-semibold ${
                        isLight ? 'text-violet-700' : 'text-violet-400'
                      }`}>
                        {product.code}
                      </span>
                      <span className={isLight ? 'text-slate-300' : 'text-zinc-600'}>•</span>
                      <span className={`text-[10px] ${
                        isLight ? 'text-slate-500' : 'text-zinc-400'
                      }`}>
                        Deployed {product.purchaseDate}
                      </span>
                    </div>
                  </div>
                </div>

                <span
                  className={`flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full font-mono-code uppercase font-semibold shrink-0 border ${
                    product.status === 'deployed_active'
                      ? isLight
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : 'bg-emerald-950/60 border-emerald-500/30 text-emerald-400'
                      : isLight
                      ? 'bg-amber-50 border-amber-200 text-amber-800'
                      : 'bg-amber-950/60 border-amber-500/30 text-amber-300'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      product.status === 'deployed_active'
                        ? 'bg-emerald-500 animate-pulse'
                        : 'bg-amber-500 animate-ping'
                    }`}
                  />
                  {product.status === 'deployed_active' ? 'Active' : 'Updating'}
                </span>
              </div>

              {/* Description */}
              <p className={`text-xs mt-3 leading-relaxed ${
                isLight ? 'text-slate-600' : 'text-zinc-300'
              }`}>
                {product.description}
              </p>

              {/* Live Telemetry Bar */}
              <div className={`grid grid-cols-3 gap-2 my-4 p-3 rounded-xl border text-center ${
                isLight
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-black/40 border-white/[0.04]'
              }`}>
                <div>
                  <div className={`text-[10px] uppercase font-mono-code ${
                    isLight ? 'text-slate-500' : 'text-zinc-400'
                  }`}>Latency</div>
                  <div className={`text-xs font-bold font-mono-code mt-0.5 ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    {product.telemetry.latencyMs}ms
                  </div>
                </div>
                <div className={`border-x ${isLight ? 'border-slate-200' : 'border-white/[0.06]'}`}>
                  <div className={`text-[10px] uppercase font-mono-code ${
                    isLight ? 'text-slate-500' : 'text-zinc-400'
                  }`}>SLA Health</div>
                  <div className={`text-xs font-bold font-mono-code mt-0.5 ${
                    isLight ? 'text-emerald-700' : 'text-emerald-400'
                  }`}>
                    {product.uptime}
                  </div>
                </div>
                <div>
                  <div className={`text-[10px] uppercase font-mono-code ${
                    isLight ? 'text-slate-500' : 'text-zinc-400'
                  }`}>Monthly ROI</div>
                  <div className={`text-xs font-bold font-mono-code mt-0.5 ${
                    isLight ? 'text-violet-700' : 'text-violet-400'
                  }`}>
                    {product.monthlyHoursSaved}h saved
                  </div>
                </div>
              </div>

              {/* Assigned Autonomous Agents */}
              <div className="space-y-2 mb-4">
                <div className={`text-[11px] font-semibold uppercase font-mono-code ${
                  isLight ? 'text-slate-600' : 'text-zinc-400'
                }`}>
                  Orchestrated Agent Fleet:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.assignedAgents.map((agent, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-1 rounded-lg text-[11px] flex items-center gap-1 border ${
                        isLight
                          ? 'bg-violet-50 border-violet-200 text-violet-700'
                          : 'bg-violet-950/40 border-violet-500/25 text-violet-300'
                      }`}
                    >
                      <Bot className={`w-3 h-3 ${isLight ? 'text-violet-600' : 'text-violet-400'}`} />
                      <span>{agent}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* License Key Box */}
              <div className="space-y-1.5 mb-4">
                <div className={`flex items-center justify-between text-[11px] ${
                  isLight ? 'text-slate-600' : 'text-zinc-400'
                }`}>
                  <span className="font-mono-code uppercase">License Key:</span>
                  <button
                    onClick={() => handleCopy(product.licenseKey, `lic-${product.id}`)}
                    className={`flex items-center gap-1 transition-colors ${
                      isLight ? 'text-violet-600 hover:text-violet-800' : 'text-violet-400 hover:text-violet-300'
                    }`}
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedKeyId === `lic-${product.id}` ? 'Copied!' : 'Copy License'}</span>
                  </button>
                </div>
                <div className={`px-3 py-2 rounded-lg border font-mono-code text-xs select-all truncate ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-800'
                    : 'bg-black/60 border-white/[0.08] text-zinc-300'
                }`}>
                  {product.licenseKey}
                </div>
              </div>

              {/* API Endpoint Box */}
              <div className="space-y-1.5">
                <div className={`flex items-center justify-between text-[11px] ${
                  isLight ? 'text-slate-600' : 'text-zinc-400'
                }`}>
                  <span className="font-mono-code uppercase">Runtime Endpoint:</span>
                  <button
                    onClick={() => handleCopy(product.endpointUrl, `ep-${product.id}`)}
                    className={`flex items-center gap-1 transition-colors ${
                      isLight ? 'text-violet-600 hover:text-violet-800' : 'text-violet-400 hover:text-violet-300'
                    }`}
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedKeyId === `ep-${product.id}` ? 'Copied!' : 'Copy URL'}</span>
                  </button>
                </div>
                <div className={`px-3 py-2 rounded-lg border font-mono-code text-xs select-all truncate ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 text-violet-700'
                    : 'bg-black/60 border-white/[0.08] text-violet-300'
                }`}>
                  {product.endpointUrl}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className={`pt-4 border-t flex items-center justify-between gap-3 ${
              isLight ? 'border-slate-100' : 'border-white/[0.06]'
            }`}>
              <div className="flex items-center gap-1.5">
                <Server className={`w-3.5 h-3.5 ${isLight ? 'text-slate-400' : 'text-zinc-500'}`} />
                <span className={`text-[11px] font-mono-code ${
                  isLight ? 'text-slate-600' : 'text-zinc-400'
                }`}>
                  {product.environment}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => restartProductDeployment(product.id)}
                  id={`restart-container-${product.id}-btn`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white'
                  }`}
                  title="Warm restart container container and invalidate cache"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restart</span>
                </button>

                <button
                  onClick={() => setSelectedProduct(product)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                    isLight
                      ? 'bg-violet-50 hover:bg-violet-100 border-violet-300 text-violet-700'
                      : 'bg-violet-950/60 hover:bg-violet-900/80 border border-violet-500/40 text-violet-300 hover:text-white'
                  }`}
                >
                  Configure
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Catalog Deploy Drawer / Modal */}
      {isDeployModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) onCloseDeployModal();
          }}
        >
          <div className={`relative w-full max-w-3xl border rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900'
              : 'bg-[#0d0d16] border-violet-500/30 text-white'
          }`}>
            <div className={`flex items-center justify-between pb-4 border-b ${
              isLight ? 'border-slate-100' : 'border-white/[0.08]'
            }`}>
              <div>
                <h2 className={`text-xl font-bold font-display ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  Deploy Additional AI Solutions
                </h2>
                <p className={`text-xs mt-0.5 ${
                  isLight ? 'text-slate-600' : 'text-zinc-400'
                }`}>
                  Expand your organization's autonomous fleet with pre-engineered enterprise modules.
                </p>
              </div>
              <button
                onClick={onCloseDeployModal}
                className={`p-2 rounded-xl transition-colors ${
                  isLight ? 'text-slate-500 hover:text-slate-800 bg-slate-100' : 'text-zinc-400 hover:text-white bg-white/[0.04]'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {unpurchasedCatalog.length === 0 ? (
              <div className="p-8 text-center text-zinc-400 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className={`text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  All available enterprise modules are already deployed in your fleet!
                </p>
                <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                  Need a bespoke system? Request a custom architectural build via your dedicated architect.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {unpurchasedCatalog.map((catItem) => (
                  <div
                    key={catItem.code}
                    className={`p-5 rounded-xl border flex flex-col justify-between space-y-4 transition-all ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 hover:border-violet-300 hover:shadow-md'
                        : 'bg-[#12121e] border-white/[0.08] hover:border-violet-500/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-mono-code uppercase font-semibold ${
                          isLight ? 'text-violet-700' : 'text-violet-400'
                        }`}>
                          {catItem.code}
                        </span>
                        <span className={`text-[10px] font-mono-code px-2 py-0.5 rounded border ${
                          isLight
                            ? 'bg-white border-slate-200 text-slate-700'
                            : 'bg-white/[0.06] border-white/[0.08] text-zinc-300'
                        }`}>
                          {catItem.version}
                        </span>
                      </div>
                      <h3 className={`text-sm font-bold font-display ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}>{catItem.name}</h3>
                      <p className={`text-xs mt-1.5 leading-relaxed ${
                        isLight ? 'text-slate-600' : 'text-zinc-400'
                      }`}>
                        {catItem.description}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1">
                        {catItem.assignedAgents.map((ag, i) => (
                          <span
                            key={i}
                            className={`text-[10px] px-2 py-0.5 rounded border ${
                              isLight
                                ? 'bg-violet-100/60 text-violet-800 border-violet-200'
                                : 'bg-black/40 text-violet-300 border-violet-500/20'
                            }`}
                          >
                            {ag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={`pt-3 border-t flex items-center justify-between ${
                      isLight ? 'border-slate-200' : 'border-white/[0.06]'
                    }`}>
                      <span className={`text-xs font-mono-code font-semibold ${
                        isLight ? 'text-slate-800' : 'text-zinc-300'
                      }`}>
                        {catItem.purchaseType === 'one_time_license'
                          ? '$4,800 Perpetual'
                          : 'Included in Fleet Tier'}
                      </span>

                      <button
                        onClick={() => handleDeployNew(catItem.code)}
                        id={`deploy-catalog-${catItem.code}-btn`}
                        className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold shadow-md transition-colors flex items-center gap-1"
                      >
                        <Zap className="w-3 h-3" />
                        <span>Provision & Deploy</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Settings & Configuration Drawer */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedProduct(null);
          }}
        >
          <div className={`relative w-full max-w-xl border rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900'
              : 'bg-[#0d0d16] border-violet-500/30 text-white'
          }`}>
            <div className={`flex items-center justify-between pb-3 border-b ${
              isLight ? 'border-slate-100' : 'border-white/[0.08]'
            }`}>
              <div>
                <h3 className={`text-base font-bold font-display ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  System Configuration: {selectedProduct.name}
                </h3>
                <span className={`text-[11px] font-mono-code ${
                  isLight ? 'text-violet-700 font-semibold' : 'text-violet-400'
                }`}>
                  License: {selectedProduct.licenseKey}
                </span>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className={`p-2 rounded-xl transition-colors ${
                  isLight ? 'text-slate-500 hover:text-slate-800 bg-slate-100' : 'text-zinc-400 hover:text-white bg-white/[0.04]'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className={`space-y-4 text-xs ${
              isLight ? 'text-slate-700' : 'text-zinc-300'
            }`}>
              <div>
                <label className={`block font-semibold mb-1 ${
                  isLight ? 'text-slate-700' : 'text-zinc-400'
                }`}>
                  Assigned Host Environment
                </label>
                <input
                  type="text"
                  disabled
                  value={selectedProduct.environment}
                  className={`w-full rounded-xl px-3 py-2 font-mono-code border ${
                    isLight
                      ? 'bg-slate-100 border-slate-200 text-slate-700'
                      : 'bg-black/40 border-white/[0.08] text-white'
                  }`}
                />
              </div>

              <div>
                <label className={`block font-semibold mb-1 ${
                  isLight ? 'text-slate-700' : 'text-zinc-400'
                }`}>
                  Connected Enterprise Webhook URL
                </label>
                <input
                  type="text"
                  defaultValue={selectedProduct.endpointUrl}
                  className={`w-full rounded-xl px-3 py-2 font-mono-code border focus:outline-none ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900 focus:border-violet-500'
                      : 'bg-[#141420] border-white/[0.1] text-white focus:border-violet-500'
                  }`}
                />
              </div>

              <div className={`p-3 rounded-xl border text-[11px] ${
                isLight
                  ? 'bg-violet-50 border-violet-200 text-violet-800'
                  : 'bg-violet-950/30 border-violet-500/20 text-violet-300'
              }`}>
                💡 Configuration updates are deployed with zero downtime using canary container rollouts.
              </div>
            </div>

            <div className={`flex items-center justify-end gap-3 pt-4 border-t ${
              isLight ? 'border-slate-100' : 'border-white/[0.08]'
            }`}>
              <button
                onClick={() => setSelectedProduct(null)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                    : 'bg-white/[0.06] text-zinc-300'
                }`}
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setFeedbackMsg('Configuration successfully updated and synced.');
                  setTimeout(() => setFeedbackMsg(''), 4000);
                }}
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold shadow-sm"
              >
                Apply & Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
