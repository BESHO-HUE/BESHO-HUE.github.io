import React, { useState } from 'react';
import { Mail, MessageCircle, Copy, Check, Send, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { ProfileInfo } from '../data/portfolioData';

interface ContactSectionProps {
  profile: ProfileInfo;
  onOpenQuote: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile, onOpenQuote }) => {
  const [copied, setCopied] = useState(false);
  const [formName, setFormName] = useState('');
  const [formContact, setFormContact] = useState('');
  const [formService, setFormService] = useState('ريلز وشورتس');
  const [formMessage, setFormMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappDirectUrl = `https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('السلام عليكم بيشوى، أرغب في حجز موعد لمشروع فيديو/تصميم...')}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate WhatsApp forward or trigger confirmation
    const text = encodeURIComponent(
      `رسالة من موقع البورتفوليو:\nالاسم: ${formName}\nجهة التواصل: ${formContact}\nالخدمة: ${formService}\nالرسالة: ${formMessage}`
    );
    setSubmitted(true);
    window.open(`https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="w-full max-w-5xl mx-auto px-6 py-16 scroll-mt-24">
      
      {/* Call to action card */}
      <div className="glass-panel p-8 md:p-12 rounded-3xl border border-[#ffd700]/30 glow-gold-sm text-center relative overflow-hidden">
        
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-72 h-72 bg-[#ffd700]/10 blur-3xl rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#113824] border border-[#ffd700]/30 text-gold text-xs font-bold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>دعنا نصنع محتوى استثنائياً معاً</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
          جاهز للعمل على مشروعك القادم؟
        </h2>

        <p className="text-gray-300 max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-8">
          سواء كنت تبحث عن مونتاج بودكاست احترافي، فيديوهات يوتيوب ترفع المشاهدات، أو ريلز تزيد متابعيك، أنا هنا لتحويل رؤيتك إلى واقع بصري مبهر.
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold text-[#0b1f15] hover:bg-[#ffe234] font-black py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-[#ffd700]/30 flex items-center gap-2 text-base"
          >
            <MessageCircle className="w-5 h-5" />
            <span>محادثة واتساب: 01201699362</span>
          </a>

          <a
            href={`mailto:${profile.email}`}
            className="glass-panel text-white hover:text-gold hover:border-[#ffd700] font-bold py-3.5 px-7 rounded-xl transition-all flex items-center gap-2 text-base"
          >
            <Mail className="w-5 h-5 text-gold" />
            <span>راسلني عبر الإيميل</span>
          </a>

          <button
            onClick={copyEmail}
            className="glass-panel text-gray-300 hover:text-white font-medium py-3.5 px-4 rounded-xl transition-all flex items-center gap-1.5 text-sm cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">تم نسخ الإيميل!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-gold" />
                <span>نسخ الإيميل</span>
              </>
            )}
          </button>
        </div>

        {/* Direct WhatsApp Callout Banner */}
        <div className="mb-8 p-3 rounded-xl bg-[#07160e]/80 border border-[#ffd700]/30 inline-flex flex-wrap items-center justify-center gap-3">
          <span className="text-xs text-gray-300">للتواصل والاتفاق الفوري عبر واتساب مباشرة:</span>
          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold font-bold text-base hover:underline flex items-center gap-1"
            dir="ltr"
          >
            <span>+20 120 169 9362</span>
          </a>
        </div>

        {/* Quick Contact Form inside panel */}
        <div className="mt-8 pt-8 border-t border-white/10 max-w-2xl mx-auto text-right">
          <h3 className="text-lg font-bold text-white mb-4 text-center">أو أرسل تفاصيل مشروعك مباشرة:</h3>
          
          {submitted ? (
            <div className="p-6 rounded-2xl bg-[#113824] border border-[#ffd700]/40 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-[#ffd700] mx-auto" />
              <h4 className="text-lg font-bold text-white">تم استلام طلبك بنجاح!</h4>
              <p className="text-xs text-gray-300">تم فتح المحادثة عبر واتساب لمتابعة التفاصيل فوراً.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-[#ffd700] underline mt-2 inline-block cursor-pointer"
              >
                إرسال رسالة أخرى
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">اسمك أو اسم القناة/الشركة:</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="بيشوى عاطف..."
                    className="w-full bg-[#07160e] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ffd700]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">رقم الواتساب أو الإيميل:</label>
                  <input
                    type="text"
                    required
                    value={formContact}
                    onChange={(e) => setFormContact(e.target.value)}
                    placeholder="رقم الهاتف أو البريد..."
                    className="w-full bg-[#07160e] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ffd700]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">الخدمة المطلوبة:</label>
                <select
                  value={formService}
                  onChange={(e) => setFormService(e.target.value)}
                  className="w-full bg-[#07160e] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#ffd700]"
                >
                  <option value="ريلز وشورتس (Reels & Shorts)">ريلز وشورتس (Reels & Shorts)</option>
                  <option value="فيديوهات طويلة يوتيوب (Long-form)">فيديوهات طويلة يوتيوب (Long-form)</option>
                  <option value="مونتاج بودكاست (Podcasts)">مونتاج بودكاست (Podcasts)</option>
                  <option value="صور مصغرة (Thumbnails)">تصميم صور مصغرة (Thumbnails)</option>
                  <option value="باقة شهرية متكاملة (Retainer)">باقة شهرية متكاملة (Retainer)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">نبذة عن المحتوى أو الروابط المرجعية:</label>
                <textarea
                  rows={3}
                  required
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="أود مونتاج 4 فيديوهات شهرياً بأسلوب وثائقي مع مؤثرات صوتية..."
                  className="w-full bg-[#07160e] border border-white/15 rounded-xl p-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#ffd700]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#ffd700] hover:bg-[#ffe234] text-[#07160e] font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>إرسال وتنسيق التفاصيل مباشرة</span>
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Floating Action Button (FAB) for Instant WhatsApp Access */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
        {/* Floating WhatsApp Button */}
        <a
          href={whatsappDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3.5 rounded-full shadow-2xl shadow-[#25D366]/40 border-2 border-white/20 transition-all duration-300 hover:scale-105 active:scale-95 glow-gold-sm"
          aria-label="تواصل مع بيشوى عبر واتساب: 01201699362"
        >
          {/* Pulsing ring indicator */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none"></span>

          {/* WhatsApp Icon */}
          <MessageCircle className="w-6 h-6 fill-white text-[#25D366] relative z-10" />

          {/* Text and Number details */}
          <div className="hidden sm:flex flex-col text-right pr-0.5 relative z-10">
            <span className="text-[11px] font-bold leading-tight flex items-center gap-1.5">
              <span>تواصل مع بيشوى</span>
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            </span>
            <span className="text-[12px] font-black tracking-wide text-white/95" dir="ltr">
              01201699362
            </span>
          </div>

          {/* Hover popup tooltip on mobile/desktop */}
          <div className="sm:hidden absolute bottom-full mb-2.5 left-0 bg-[#07160e] text-[#ffd700] text-xs font-bold py-1 px-2.5 rounded-lg border border-[#ffd700]/30 shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            واتساب: 01201699362
          </div>
        </a>
      </div>

    </section>
  );
};
