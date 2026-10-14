import React from 'react';
import { Heart, Sparkles, MessageCircle, ArrowUp } from 'lucide-react';
import { ProfileInfo } from '../data/portfolioData';

interface FooterProps {
  profile: ProfileInfo;
  onScrollToTop: () => void;
  onOpenSettings?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onScrollToTop, onOpenSettings }) => {
  return (
    <footer className="w-full mt-16 py-12 border-t border-[#ffd700]/20 text-center bg-[#07160e]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
        
        {/* Brand identity */}
        <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={onScrollToTop}>
          <div className="w-9 h-9 rounded-full bg-[#113824] border border-[#ffd700]/40 flex items-center justify-center glow-gold-sm">
            <span className="text-[#ffd700] font-black text-lg">ب</span>
          </div>
          <span className="text-xl font-black text-white">{profile.name}</span>
          <span className="text-xs text-gold">· {profile.titleEn}</span>
        </div>

        <p className="text-gray-400 text-xs max-w-md leading-relaxed mb-6">
          مونتاج احترافي، تصحيح ألوان، هندسة صوتية وتصميم أغلفة عالية النقرات لتنمية حضورك وصناعة تأثير حقيقي.
        </p>

        {/* Quick Nav tags */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-300 mb-8">
          <a href="#thumbnails" className="hover:text-gold transition-colors">الصور المصغرة</a>
          <span className="text-gray-600">·</span>
          <a href="#podcasts" className="hover:text-gold transition-colors">البودكاست</a>
          <span className="text-gray-600">·</span>
          <a href="#long-videos" className="hover:text-gold transition-colors">الفيديوهات الطويلة</a>
          <span className="text-gray-600">·</span>
          <a href="#reels" className="hover:text-gold transition-colors">الريلز والشورتس</a>
          <span className="text-gray-600">·</span>
          <a href="#tools" className="hover:text-gold transition-colors">الأدوات</a>
          <span className="text-gray-600">·</span>
          <a href="#contact" className="hover:text-gold transition-colors">تواصل</a>
        </div>

        {/* Back to top & copyright */}
        <div className="w-full pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
          <div className="flex items-center gap-2">
            <span>جميع الحقوق محفوظة © {new Date().getFullYear()} {profile.name}</span>
            {onOpenSettings && (
              <button
                onClick={onOpenSettings}
                className="text-gray-500 hover:text-gold transition-colors text-[11px] underline mr-2 cursor-pointer"
              >
                تخصيص البيانات
              </button>
            )}
          </div>

          <button
            onClick={onScrollToTop}
            className="flex items-center gap-1.5 text-gray-400 hover:text-gold transition-colors cursor-pointer"
          >
            <span>العودة للأعلى</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
