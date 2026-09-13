import React from 'react';
import {
  Bot,
  Layers,
  Cpu,
  TrendingUp,
  MessageSquare,
  Scan,
  Shield,
  Terminal,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Activity,
  Workflow,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { AiProductItem } from '../../types';

interface ProductListItemProps {
  product: AiProductItem;
  onSelectProduct: (product: AiProductItem) => void;
  theme?: 'dark' | 'light';
}

const ICON_MAP: Record<string, React.ElementType> = {
  Bot,
  Layers,
  Cpu,
  TrendingUp,
  MessageSquare,
  Scan,
  Shield,
  Terminal,
};

export const ProductListItem: React.FC<ProductListItemProps> = ({
  product,
  onSelectProduct,
  theme = 'dark',
}) => {
  const IconComponent = ICON_MAP[product.icon] || Bot;
  const isLight = theme === 'light';

  return (
    <div
      onClick={() => onSelectProduct(product)}
      id={`ai-product-list-item-${product.slug}`}
      className={`group cursor-pointer rounded-2xl border p-5 sm:p-6 transition-all duration-300 relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 ${
        isLight
          ? 'bg-white border-slate-200/90 shadow-sm hover:shadow-lg hover:border-violet-400/90 hover:bg-slate-50/50'
          : 'bg-[#0c0c14] border-white/[0.08] hover:border-violet-500/50 shadow-md hover:shadow-[0_8px_30px_rgba(139,92,246,0.18)] hover:bg-[#11111c]'
      }`}
    >
      {/* Ambient background hover glow */}
      <div className="absolute top-0 right-0 w-64 h-full bg-violet-600/5 rounded-full blur-3xl group-hover:bg-violet-600/15 transition-all duration-500 pointer-events-none" />

      {/* Left side: Icon, Name, Category, Description, Tags */}
      <div className="flex items-start gap-4 sm:gap-5 flex-1 min-w-0">
        {/* Product Icon */}
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-sm mt-0.5 ${
            isLight
              ? 'bg-violet-100 text-violet-700 border border-violet-200'
              : 'bg-violet-600/20 text-violet-300 border border-violet-500/30 group-hover:border-violet-400/60'
          }`}
        >
          <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>

        {/* Content Details */}
        <div className="flex-1 min-w-0">
          {/* Header row: category + badge + uptime */}
          <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
            <span
              className={`text-[11px] font-bold uppercase tracking-wider font-mono-code ${
                isLight ? 'text-violet-700' : 'text-violet-400'
              }`}
            >
              {product.categoryLabel}
            </span>

            {product.badge && (
              <span
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border tracking-wider ${
                  isLight
                    ? 'bg-violet-50 text-violet-800 border-violet-200'
                    : 'bg-violet-950/60 text-violet-300 border-violet-700/50'
                }`}
              >
                {product.badge}
              </span>
            )}

            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono-code font-medium">
                {product.uptime || '99.99% SLA'}
              </span>
            </div>
          </div>

          {/* Name & Tagline */}
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
            <h3
              className={`text-lg sm:text-xl font-bold font-display tracking-tight transition-colors duration-200 ${
                isLight
                  ? 'text-slate-900 group-hover:text-violet-700'
                  : 'text-white group-hover:text-violet-300'
              }`}
            >
              {product.name}
            </h3>
            <span
              className={`text-xs sm:text-sm font-semibold font-mono-code ${
                isLight ? 'text-violet-600' : 'text-violet-400/90'
              }`}
            >
              — {product.tagline}
            </span>
          </div>

          {/* Description */}
          <p
            className={`text-xs sm:text-sm mt-2 leading-relaxed line-clamp-2 max-w-3xl ${
              isLight ? 'text-slate-600' : 'text-zinc-400'
            }`}
          >
            {product.shortDescription}
          </p>

          {/* Feature Highlight Pills */}
          <div className="flex items-center gap-2 flex-wrap mt-3 pt-2">
            {product.features.slice(0, 3).map((feat, idx) => (
              <div
                key={idx}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] border font-medium ${
                  isLight
                    ? 'bg-slate-100 border-slate-200 text-slate-700'
                    : 'bg-white/[0.04] border-white/[0.07] text-zinc-300'
                }`}
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>{feat.title}</span>
              </div>
            ))}

            {product.connectedSystems && product.connectedSystems.length > 0 && (
              <span
                className={`text-[10px] font-mono-code px-2 py-0.5 rounded ${
                  isLight
                    ? 'text-slate-500 bg-slate-100'
                    : 'text-zinc-400 bg-white/[0.03]'
                }`}
              >
                Integrates: {product.connectedSystems.slice(0, 3).join(', ')}
                {product.connectedSystems.length > 3 ? ` +${product.connectedSystems.length - 3}` : ''}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right side: Key Metric & Inspect Action */}
      <div className="w-full lg:w-auto flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 sm:gap-4 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/[0.06] lg:pl-4">
        {/* Metric */}
        <div className="flex items-center gap-1.5 text-left lg:text-right">
          <Activity className="w-3.5 h-3.5 text-violet-400" />
          <div>
            <div
              className={`text-xs sm:text-sm font-bold font-mono-code ${
                isLight ? 'text-slate-900' : 'text-violet-300'
              }`}
            >
              {product.metrics[0]?.value || 'Production Ready'}
            </div>
            <div
              className={`text-[10px] uppercase font-mono-code ${
                isLight ? 'text-slate-500' : 'text-zinc-400'
              }`}
            >
              {product.metrics[0]?.label || 'Standard SLA'}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectProduct(product);
          }}
          className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 group-hover:scale-105 active:scale-95 shadow-sm whitespace-nowrap ${
            isLight
              ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-600/20'
              : 'bg-violet-600/90 hover:bg-violet-500 text-white shadow-violet-600/30'
          }`}
        >
          <span>View Solution Specs</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
