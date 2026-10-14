import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ThumbnailCard } from './components/ThumbnailCard';
import { ThumbnailModal } from './components/ThumbnailModal';
import { VideoCard } from './components/VideoCard';
import { ShortsCard } from './components/ShortsCard';
import { ToolsSection } from './components/ToolsSection';
import { WorkflowSection } from './components/WorkflowSection';
import { QuoteEstimator } from './components/QuoteEstimator';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProfileSettingsModal } from './components/ProfileSettingsModal';
import {
  INITIAL_PROFILE,
  ProfileInfo,
  THUMBNAILS_DATA,
  PODCAST_VIDEOS,
  LONG_VIDEOS,
  REELS_VIDEOS,
  ThumbnailItem
} from './data/portfolioData';
import { Image, Video, Smartphone, Film, Sparkles, Filter } from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState<ProfileInfo>(() => {
    try {
      const saved = localStorage.getItem('bishoy_portfolio_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return INITIAL_PROFILE;
  });

  const [activeSection, setActiveSection] = useState('hero');
  const [selectedThumbnail, setSelectedThumbnail] = useState<ThumbnailItem | null>(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [filterTab, setFilterTab] = useState<'all' | 'thumbnails' | 'podcasts' | 'long' | 'reels'>('all');

  const handleSaveProfile = (updated: ProfileInfo) => {
    setProfile(updated);
    try {
      localStorage.setItem('bishoy_portfolio_profile', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetProfile = () => {
    setProfile(INITIAL_PROFILE);
    try {
      localStorage.removeItem('bishoy_portfolio_profile');
    } catch (e) {
      console.error(e);
    }
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07160e] text-white flex flex-col selection:bg-[#ffd700] selection:text-[#07160e]">
      
      {/* Navbar */}
      <Navbar
        profile={profile}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenQuote={() => setIsQuoteOpen(true)}
      />

      {/* Hero Section */}
      <div id="hero">
        <Hero
          profile={profile}
          onExploreClick={() => scrollToSection('portfolio-section')}
          onOpenQuote={() => setIsQuoteOpen(true)}
          onContactClick={() => scrollToSection('contact')}
          onUpdateAvatar={(avatarUrl) => handleSaveProfile({ ...profile, avatarUrl })}
        />
      </div>

      {/* Main Portfolio Sections */}
      <main id="portfolio-section" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-24">
        
        {/* Interactive Filter Bar */}
        <div className="sticky top-20 z-30 pt-3 pb-4 bg-[#07160e]/90 backdrop-blur-md flex items-center justify-center">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#0b1f15] border border-[#ffd700]/25 shadow-lg max-w-full overflow-x-auto">
            <button
              onClick={() => setFilterTab('all')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                filterTab === 'all'
                  ? 'bg-gold text-[#07160e] shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>جميع الأعمال</span>
            </button>

            <button
              onClick={() => setFilterTab('thumbnails')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                filterTab === 'thumbnails'
                  ? 'bg-gold text-[#07160e] shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Image className="w-3.5 h-3.5" />
              <span>الصور المصغرة</span>
            </button>

            <button
              onClick={() => setFilterTab('podcasts')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                filterTab === 'podcasts'
                  ? 'bg-gold text-[#07160e] shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>البودكاست</span>
            </button>

            <button
              onClick={() => setFilterTab('long')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                filterTab === 'long'
                  ? 'bg-gold text-[#07160e] shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>الفيديوهات الطويلة</span>
            </button>

            <button
              onClick={() => setFilterTab('reels')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                filterTab === 'reels'
                  ? 'bg-gold text-[#07160e] shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>الريلز والشورتس</span>
            </button>
          </div>
        </div>

        {/* 1. قسم الصور المصغرة (Thumbnails) */}
        {(filterTab === 'all' || filterTab === 'thumbnails') && (
          <section id="thumbnails" className="scroll-mt-28">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
              <div>
                <h3 className="text-3xl md:text-4xl font-black text-white flex items-center gap-3">
                  <span className="w-8 h-1 bg-gold rounded-full"></span>
                  الصور المصغرة (Thumbnails)
                </h3>
                <p className="text-gray-400 text-xs md:text-sm mt-2">
                  أغلفة مصممة بسيكولوجية الجذب ورفع نسبة النقر للظهور (CTR) عبر الفوتوشوب والذكاء الاصطناعي
                </p>
              </div>

              <span className="text-xs text-gold font-bold bg-[#ffd700]/10 px-3 py-1 rounded-full border border-[#ffd700]/25 self-start sm:self-auto">
                4 نماذج مختارة · انقر للتكبير
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {THUMBNAILS_DATA.map((item) => (
                <ThumbnailCard
                  key={item.id}
                  item={item}
                  onSelect={(thumb) => setSelectedThumbnail(thumb)}
                />
              ))}
            </div>
          </section>
        )}

        {/* 2. قسم البودكاست (Podcasts) */}
        {(filterTab === 'all' || filterTab === 'podcasts') && (
          <section id="podcasts" className="scroll-mt-28">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
              <div>
                <h3 className="text-3xl md:text-4xl font-black text-white flex items-center gap-3">
                  <span className="w-8 h-1 bg-gold rounded-full"></span>
                  البودكاست
                </h3>
                <p className="text-gray-400 text-xs md:text-sm mt-2">
                  مونتاج متعدد الكاميرات، إزالة الفواصل والتردد، هندسة صوتية نقية وإضافة B-Roll توضيحي
                </p>
              </div>

              <span className="text-xs text-gold font-bold bg-[#ffd700]/10 px-3 py-1 rounded-full border border-[#ffd700]/25 self-start sm:self-auto">
                حلقات بودكاست كاملة
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PODCAST_VIDEOS.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </section>
        )}

        {/* 3. قسم الفيديوهات الطويلة (Long-form Videos) */}
        {(filterTab === 'all' || filterTab === 'long') && (
          <section id="long-videos" className="scroll-mt-28">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
              <div>
                <h3 className="text-3xl md:text-4xl font-black text-white flex items-center gap-3">
                  <span className="w-8 h-1 bg-gold rounded-full"></span>
                  الفيديوهات الطويلة
                </h3>
                <p className="text-gray-400 text-xs md:text-sm mt-2">
                  سرد قصصي عالي الجودة، مونتاج مشوق، خرائط ورسوم توضيحية ومؤثرات صوتية سينمائية
                </p>
              </div>

              <span className="text-xs text-gold font-bold bg-[#ffd700]/10 px-3 py-1 rounded-full border border-[#ffd700]/25 self-start sm:self-auto">
                محتوى يوتيوب وثائقي ومعرفي
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LONG_VIDEOS.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </section>
        )}

        {/* 4. قسم الريلز والشورتس (Reels & Shorts) */}
        {(filterTab === 'all' || filterTab === 'reels') && (
          <section id="reels" className="scroll-mt-28">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
              <div>
                <h3 className="text-3xl md:text-4xl font-black text-white flex items-center gap-3">
                  <span className="w-8 h-1 bg-gold rounded-full"></span>
                  الريلز والشورتس
                </h3>
                <p className="text-gray-400 text-xs md:text-sm mt-2">
                  تنسيق رأسي 9:16 مصمم للانتشار الفيروسي (Viral)، مع كابشنز ملونة وانتقالات ديناميكية
                </p>
              </div>

              <span className="text-xs text-gold font-bold bg-[#ffd700]/10 px-3 py-1 rounded-full border border-[#ffd700]/25 self-start sm:self-auto">
                9:16 Vertical Content
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {REELS_VIDEOS.map((video) => (
                <ShortsCard key={video.id} video={video} />
              ))}
            </div>
          </section>
        )}

        {/* 5. قسم البرامج والتقنيات */}
        <ToolsSection />

        {/* 6. قسم خطة وسير العمل */}
        <WorkflowSection />

        {/* 7. قسم التواصل والطلب */}
        <ContactSection
          profile={profile}
          onOpenQuote={() => setIsQuoteOpen(true)}
        />

      </main>

      {/* Footer */}
      <Footer
        profile={profile}
        onScrollToTop={scrollToTop}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Modals */}
      <ThumbnailModal
        item={selectedThumbnail}
        onClose={() => setSelectedThumbnail(null)}
        profile={profile}
      />

      <QuoteEstimator
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        profile={profile}
      />

      <ProfileSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
        onReset={handleResetProfile}
      />

    </div>
  );
}
