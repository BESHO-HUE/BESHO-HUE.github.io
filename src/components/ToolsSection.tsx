import React from 'react';
import { Film, Sparkles, Image, Palette, Cpu, Headphones, Check } from 'lucide-react';
import { SOFTWARE_TOOLS } from '../data/portfolioData';
import { Language, Translations } from '../data/translations';

interface ToolsSectionProps {
  lang: Language;
  t: Translations['toolsSection'];
}

export const ToolsSection: React.FC<ToolsSectionProps> = ({ lang, t }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'film':
        return <Film className="w-5 h-5 text-[#ffd700]" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-[#ffd700]" />;
      case 'image':
        return <Image className="w-5 h-5 text-[#ffd700]" />;
      case 'palette':
        return <Palette className="w-5 h-5 text-[#ffd700]" />;
      case 'cpu':
        return <Cpu className="w-5 h-5 text-[#ffd700]" />;
      case 'headphones':
        return <Headphones className="w-5 h-5 text-[#ffd700]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#ffd700]" />;
    }
  };

  return (
    <section id="tools" className="w-full max-w-6xl mx-auto px-6 py-12 scroll-mt-24">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h3 className="text-3xl md:text-4xl font-black text-white mb-3 flex items-center justify-center gap-3">
          <span className="w-8 h-1 bg-gold rounded-full"></span>
          {t.title}
          <span className="w-8 h-1 bg-gold rounded-full"></span>
        </h3>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SOFTWARE_TOOLS.map((tool, idx) => (
          <div
            key={idx}
            className="glass-panel p-5 rounded-2xl flex flex-col justify-between hover:border-[#ffd700]/50 transition-all duration-300 hover:scale-[1.02]"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-[#113824] border border-[#ffd700]/30 glow-gold-sm">
                  {getIcon(tool.icon)}
                </div>
                <span className="text-xs font-bold text-gold px-2.5 py-1 rounded bg-[#ffd700]/10 border border-[#ffd700]/20 font-mono">
                  {tool.level}
                </span>
              </div>

              <h4 className="text-lg font-bold text-white mb-1">{tool.name}</h4>
              <span className="text-xs text-[#ffd700]/80 font-medium block mb-2">{tool.category}</span>
              <p className="text-gray-300 text-xs leading-relaxed">{tool.desc}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] text-gray-400">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.readyBadge}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
