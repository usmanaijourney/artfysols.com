import React from 'react';
import { Sparkles, ArrowRight, Building2, Cpu, CheckCircle2, Bot } from 'lucide-react';
import { IndustryExplorer } from '../IndustryExplorer';
import { updatePageSeo } from '../../utils/seo';

interface IndustriesPageProps {
  onOpenSolutionBuilder: (industryId?: string) => void;
  onNavigateToContact: () => void;
  theme?: 'dark' | 'light';
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({
  onOpenSolutionBuilder,
  onNavigateToContact,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  React.useEffect(() => {
    updatePageSeo({
      title: 'Industry AI Solutions - Verticals & Domain Architectures',
      description: 'Explore Artify Solutions domain-specific AI workflows across Finance, Healthcare, Construction, Legal, Logistics, Real Estate, Manufacturing, and Retail.',
      canonicalUrl: 'https://artifysols.com/industries',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div
      className={`min-h-screen ${
        isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#050505] text-[#F5F5F5]'
      } transition-colors duration-300 pt-28 sm:pt-36 pb-24`}
    >
      <div className="w-[92%] sm:w-[88%] max-w-7xl mx-auto mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Building2 className="w-3.5 h-3.5" />
          <span>Cross-Industry Intelligence Matrix</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold font-display tracking-tight text-white">
          AI Built for Your Industry
        </h1>
        <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed max-w-3xl mx-auto">
          AI has no industry limit. Explore our deep domain operating blueprints, specialized agent fleets, and verified workflow automations across 14 enterprise sectors.
        </p>
      </div>

      {/* Render the full 14-sector Industry Explorer */}
      <IndustryExplorer
        onOpenSolutionBuilder={onOpenSolutionBuilder}
        onNavigateToContact={onNavigateToContact}
      />
    </div>
  );
};
