import React, { useState } from 'react';
import { Video, Sparkles, MessageCircle, Menu, X, Phone, Layers, Clock } from 'lucide-react';
import { ProfileInfo } from '../data/portfolioData';

interface NavbarProps {
  profile: ProfileInfo;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  activeSection,
  onNavigate,
  onOpenQuote
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'الرئيسية' },
    { id: 'thumbnails', label: 'الصور المصغرة' },
    { id: 'podcasts', label: 'البودكاست' },
    { id: 'long-videos', label: 'الفيديوهات الطويلة' },
    { id: 'reels', label: 'الريلز والشورتس' },
    { id: 'tools', label: 'المهارات والبرامج' },
    { id: 'workflow', label: 'طريقة العمل' },
    { id: 'contact', label: 'تواصل معي' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const whatsappUrl = `https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('السلام عليكم بيشوى، أرغب في الاستفسار عن خدمة مونتاج / تصميم...')}`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#07160e]/85 backdrop-blur-md border-b border-[#ffd700]/15 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Brand */}
          <div 
            onClick={() => handleLinkClick('hero')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-full overflow-hidden bg-gradient-to-tr from-[#113824] to-[#0b1f15] border border-[#ffd700]/40 flex items-center justify-center glow-gold-sm group-hover:border-[#ffd700] transition-colors shrink-0">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[#ffd700] font-black text-xl">ب</span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-white tracking-wide group-hover:text-[#ffd700] transition-colors">
                  {profile.name}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <span className="text-xs text-[#ffd700]/80 font-medium block">
                Video Editor & AI Designer
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#ffd700] bg-[#ffd700]/10 border border-[#ffd700]/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenQuote}
              className="px-4 py-2 text-xs font-bold text-[#ffd700] border border-[#ffd700]/40 hover:border-[#ffd700] hover:bg-[#ffd700]/10 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>طلب عرض سعر</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-bold bg-[#ffd700] text-[#07160e] hover:bg-[#ffe234] rounded-lg transition-all flex items-center gap-1.5 shadow-md hover:shadow-lg shadow-[#ffd700]/20"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>واتساب مباشر</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenQuote}
              className="px-3 py-1.5 text-xs font-bold text-[#ffd700] border border-[#ffd700]/40 rounded-lg flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>عرض سعر</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white rounded-lg focus:outline-none"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#ffd700]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07160e]/95 backdrop-blur-xl border-b border-[#ffd700]/20 px-6 py-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="w-full text-right px-3 py-2 text-sm font-semibold rounded-lg bg-white/5 hover:bg-[#ffd700]/10 hover:text-[#ffd700] text-gray-200 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 text-center text-sm font-bold bg-[#ffd700] text-[#07160e] rounded-lg flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>تواصل فوري عبر واتساب</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
