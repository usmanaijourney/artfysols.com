import React from 'react';
import { Sparkles, ArrowRight, BookOpen, Layers, CheckCircle2, TrendingUp } from 'lucide-react';
import { CaseStudiesSection } from '../CaseStudiesSection';
import { updatePageSeo } from '../../utils/seo';

interface CaseStudiesPageProps {
  onOpenSolutionBuilder: () => void;
  onNavigateToContact: () => void;
  theme?: 'dark' | 'light';
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({
  onOpenSolutionBuilder,
  onNavigateToContact,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  React.useEffect(() => {
    updatePageSeo({
      title: 'Enterprise AI Case Studies & Transformation Blueprints',
      description: 'Discover how global enterprises deploy Artify autonomous agent swarms and neural RAG systems to eliminate manual bottlenecks.',
      canonicalUrl: 'https://artifysols.com/case-studies',
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
          <BookOpen className="w-3.5 h-3.5" />
          <span>Real-World Architecture Outcomes</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold font-display tracking-tight text-white">
          Case Studies & Architectures
        </h1>
        <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed max-w-3xl mx-auto">
          Explore production blueprints, systems connected, challenge breakdowns, and measurable operational returns achieved through Artify AI systems.
        </p>
      </div>

      <CaseStudiesSection
        onOpenSolutionBuilder={onOpenSolutionBuilder}
        onNavigateToContact={onNavigateToContact}
      />
    </div>
  );
};
