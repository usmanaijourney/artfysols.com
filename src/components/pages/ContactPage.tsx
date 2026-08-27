import React from 'react';
import { Sparkles, Mail, Phone, MapPin, Bot, Cpu, ShieldCheck } from 'lucide-react';
import { ContactAndBrief } from '../ContactAndBrief';
import { updatePageSeo } from '../../utils/seo';

interface ContactPageProps {
  prefilledBrief?: any;
  onOpenConsultant?: () => void;
  theme?: 'dark' | 'light';
}

export const ContactPage: React.FC<ContactPageProps> = ({
  prefilledBrief,
  onOpenConsultant,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  React.useEffect(() => {
    updatePageSeo({
      title: 'Contact Artify Solutions - Architecture Assessment & Brief Dispatcher',
      description: 'Submit your AI operational brief or schedule an enterprise architecture review with the Artify Solutions engineering team.',
      canonicalUrl: 'https://artifysols.com/contact',
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
          <Mail className="w-3.5 h-3.5" />
          <span>Strategic AI Partnership</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold font-display tracking-tight text-white">
          Let's Build Your AI Future
        </h1>
        <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          Submit your project requirements below, schedule an architectural consultation, or engage our live AI advisor for an instant preliminary blueprint.
        </p>
      </div>

      <ContactAndBrief prefilledBrief={prefilledBrief} />
    </div>
  );
};
