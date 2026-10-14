import React, { useState, useRef } from 'react';
import { Sparkles, MessageCircle, ArrowDown, Eye, CheckCircle2, Film, Clock, Flame, Camera, Phone } from 'lucide-react';
import { ProfileInfo } from '../data/portfolioData';

interface HeroProps {
  profile: ProfileInfo;
  onExploreClick: () => void;
  onOpenQuote: () => void;
  onContactClick: () => void;
  onUpdateAvatar?: (avatarBase64: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  onExploreClick,
  onOpenQuote,
  onContactClick,
  onUpdateAvatar,
}) => {
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const cleanPhone = profile.whatsapp.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('السلام عليكم بيشوى، أريد الاستفسار عن مشروع مونتاج وتصميم...')}`;

  // Fallback to locally bundled file or Unsplash
  const localAvatar = "./bishoy-profile.jpg";
  const fallbackAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";

  const [avatarSrc, setAvatarSrc] = useState(profile.avatarUrl || localAvatar);

  React.useEffect(() => {
    if (profile.avatarUrl) {
      setAvatarSrc(profile.avatarUrl);
    }
  }, [profile.avatarUrl]);

  const handleImageError = () => {
    if (avatarSrc !== localAvatar) {
      setAvatarSrc(localAvatar);
    } else {
      setAvatarSrc(fallbackAvatar);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdateAvatar) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdateAvatar(event.target.result as string);
          setAvatarSrc(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <header className="relative w-full max-w-5xl mx-auto px-6 pt-28 pb-16 md:pt-36 md:pb-20 flex flex-col items-center text-center">
      
      {/* Subtle background ambient aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-b from-[#ffd700]/10 via-[#10b981]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Availability Status Badge */}
      <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#113824]/60 border border-[#ffd700]/30 backdrop-blur-md">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
        <span className="text-xs font-semibold text-[#ffd700]">متاح لاستقبال مشاريع المونتاج والتصميم الآن</span>
      </div>

      {/* Avatar Container with Pulsing Gold Glow & Image Upload Button */}
      <div className="relative mb-4 group">
        <div className="absolute inset-0 rounded-full glow-gold animate-pulse opacity-80 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-[#ffd700] overflow-hidden bg-[#07160e] z-10 shadow-2xl transition-transform duration-300 group-hover:scale-105">
          <img
            src={avatarSrc}
            alt={profile.name}
            onError={handleImageError}
            className="w-full h-full object-cover"
          />

          {/* Hover trigger to change/upload avatar */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer z-30"
            title="انقر لتحديث أو رفع صورتك"
          >
            <Camera className="w-7 h-7 text-[#ffd700] mb-1" />
            <span className="text-[11px] font-bold text-gray-200">تغيير الصورة</span>
          </button>
        </div>

        {/* Camera badge trigger on corner of avatar */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute -bottom-1 -right-1 z-20 bg-[#ffd700] hover:bg-[#ffe234] text-[#07160e] p-2.5 rounded-full shadow-lg border-2 border-[#07160e] cursor-pointer transition-transform hover:scale-110 active:scale-95"
          title="انقر لتغيير صورتك الشخصية"
          aria-label="تغيير الصورة الشخصية"
        >
          <Camera className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Touch-friendly button to change picture */}
      {onUpdateAvatar && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="mb-6 px-4 py-1.5 rounded-full bg-[#113824] hover:bg-[#184a30] border border-[#ffd700]/30 text-xs font-bold text-[#ffd700] hover:text-white flex items-center gap-1.5 cursor-pointer transition-all shadow-sm hover:shadow-[#ffd700]/15"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>تغيير أو اختيار صورتك الشخصية 📷</span>
        </button>
      )}

      {/* Name and Titles */}
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-3 tracking-tight">
        <span className="text-white">{profile.name}</span>
      </h1>
      
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gold mb-3 tracking-wide flex items-center justify-center gap-2">
        <span>Video Editor & AI Graphic Designer</span>
      </h2>

      {/* Direct Phone / WhatsApp quick bar */}
      <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-[#0b1f15] border border-[#ffd700]/30 shadow-md">
        <span className="text-xs text-gray-300">الواتساب المباشر:</span>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs md:text-sm font-extrabold text-[#ffd700] hover:underline flex items-center gap-1"
          dir="ltr"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-400" />
          <span>01201699362</span>
        </a>
      </div>

      {/* Bio text */}
      <p className="text-gray-300 max-w-2xl text-base md:text-lg leading-relaxed mb-8 font-normal">
        {profile.bio}
      </p>

      {/* Primary Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gold text-[#0b1f15] hover:bg-[#ffe234] font-extrabold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-[#ffd700]/30 hover:scale-105 flex items-center gap-2 text-base cursor-pointer"
        >
          <MessageCircle className="w-5 h-5" />
          <span>تواصل عبر واتساب (01201699362)</span>
        </a>

        <button
          onClick={onOpenQuote}
          className="glass-panel text-white hover:text-[#ffd700] hover:border-[#ffd700] font-bold py-3.5 px-7 rounded-xl transition-all flex items-center gap-2 text-base cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-[#ffd700]" />
          <span>طلب عرض سعر لمشروعك</span>
        </button>

        <button
          onClick={onExploreClick}
          className="text-gray-300 hover:text-white font-medium py-3.5 px-5 rounded-xl transition-all flex items-center gap-1.5 text-sm cursor-pointer hover:bg-white/5"
        >
          <span>تصفح الأعمال</span>
          <ArrowDown className="w-4 h-4 text-[#ffd700] animate-bounce" />
        </button>
      </div>

      {/* Highlight Stats Strip */}
      <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        
        <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1 text-gold font-black text-2xl md:text-3xl mb-1">
            <span>+5M</span>
            <Eye className="w-4 h-4 opacity-75" />
          </div>
          <span className="text-xs text-gray-400 font-medium">مشاهدات محققة للمحتوى</span>
        </div>

        <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1 text-gold font-black text-2xl md:text-3xl mb-1">
            <span>+150</span>
            <Flame className="w-4 h-4 opacity-75" />
          </div>
          <span className="text-xs text-gray-400 font-medium">فيديو وغلاف تم إنجازه</span>
        </div>

        <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1 text-gold font-black text-2xl md:text-3xl mb-1">
            <span>48h</span>
            <Clock className="w-4 h-4 opacity-75" />
          </div>
          <span className="text-xs text-gray-400 font-medium">متوسط سرعة التسليم</span>
        </div>

        <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1 text-gold font-black text-2xl md:text-3xl mb-1">
            <span>100%</span>
            <CheckCircle2 className="w-4 h-4 opacity-75 text-emerald-400" />
          </div>
          <span className="text-xs text-gray-400 font-medium">دقة واحترافية بالمواعيد</span>
        </div>

      </div>

    </header>
  );
};
