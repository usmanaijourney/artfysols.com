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
  Zap,
  Activity,
} from 'lucide-react';
import { AiProductItem } from '../../types';

interface ProductCardProps {
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

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  theme = 'dark',
}) => {
  const IconComponent = ICON_MAP[product.icon] || Bot;
  const isLight = theme === 'light';

  return (
    <div
      onClick={() => onSelectProduct(product)}
      id={`ai-product-card-${product.slug}`}
      className={`group cursor-pointer rounded-2xl border p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
        isLight
          ? 'bg-white border-slate-200/90 shadow-md hover:shadow-xl hover:border-violet-400/80 hover:-translate-y-1'
          : 'bg-[#0c0c14] border-white/[0.08] hover:border-violet-500/50 shadow-xl hover:shadow-[0_12px_36px_rgba(139,92,246,0.22)] hover:-translate-y-1.5'
      }`}
    >
      {/* Top Ambient Glow on Hover */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/10 rounded-full blur-3xl group-hover:bg-violet-600/25 transition-all duration-500 pointer-events-none -mr-16 -mt-16" />

      <div>
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm ${
                isLight
                  ? 'bg-violet-100 text-violet-700 border border-violet-200'
                  : 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
              }`}
            >
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <span
                className={`text-[11px] font-bold uppercase tracking-wider font-mono-code ${
                  isLight ? 'text-violet-700' : 'text-violet-400'
                }`}
              >
                {product.categoryLabel}
              </span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span
                  className={`text-xs font-medium ${
                    isLight ? 'text-slate-500' : 'text-zinc-400'
                  }`}
                >
                  Uptime {product.uptime}
                </span>
              </div>
            </div>
          </div>

          {product.badge && (
            <span
              className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border tracking-wider shrink-0 ${
                isLight
                  ? 'bg-violet-50 text-violet-800 border-violet-200'
                  : 'bg-violet-950/60 text-violet-300 border-violet-700/50 shadow-inner'
              }`}
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Title & Tagline */}
        <h3
          className={`text-xl sm:text-2xl font-bold font-display tracking-tight transition-colors duration-200 ${
            isLight
              ? 'text-slate-900 group-hover:text-violet-700'
              : 'text-white group-hover:text-violet-300'
          }`}
        >
          {product.name}
        </h3>
        <p
          className={`text-xs sm:text-sm font-semibold mt-1 font-mono-code ${
            isLight ? 'text-violet-600' : 'text-violet-400/90'
          }`}
        >
          {product.tagline}
        </p>

        {/* Short Description */}
        <p
          className={`text-sm mt-3.5 leading-relaxed line-clamp-3 ${
            isLight ? 'text-slate-600' : 'text-zinc-400'
          }`}
        >
          {product.shortDescription}
        </p>

        {/* Key Feature Highlights */}
        <div className="mt-5 space-y-2 pt-4 border-t border-white/[0.06]">
          {product.features.slice(0, 2).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span className={isLight ? 'text-slate-700' : 'text-zinc-300'}>
                <strong className={isLight ? 'text-slate-900' : 'text-white'}>
                  {feat.title}:
                </strong>{' '}
                {feat.description}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Metrics & CTA */}
      <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
        {/* Metric Pill */}
        <div className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-violet-400" />
          <span
            className={`text-xs font-bold font-mono-code ${
              isLight ? 'text-slate-800' : 'text-violet-300'
            }`}
          >
            {product.metrics[0]?.value || 'Production Ready'}
          </span>
        </div>

        {/* Explore Button */}
        <span
          className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold transition-all duration-200 group-hover:translate-x-1 ${
            isLight ? 'text-violet-700' : 'text-violet-400 group-hover:text-violet-300'
          }`}
        >
          <span>Explore Product</span>
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
};
