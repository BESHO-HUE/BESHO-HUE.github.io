import React, { useState } from 'react';
import { ZoomIn, Eye, Sparkles } from 'lucide-react';
import { ThumbnailItem } from '../data/portfolioData';

interface ThumbnailCardProps {
  item: ThumbnailItem;
  onSelect: (item: ThumbnailItem) => void;
}

export const ThumbnailCard: React.FC<ThumbnailCardProps> = ({ item, onSelect }) => {
  // Use Google Drive fast CDN format first, then fallback
  const cdnUrl = `https://lh3.googleusercontent.com/d/${item.driveId}`;
  const [currentSrc, setCurrentSrc] = useState(cdnUrl);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (currentSrc === cdnUrl) {
      setCurrentSrc(item.driveUrl);
    } else if (!hasError) {
      setCurrentSrc(item.fallbackUrl);
      setHasError(true);
    }
  };

  return (
    <div
      onClick={() => onSelect(item)}
      className="glass-panel p-2 md:p-3 rounded-2xl group cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-[#ffd700]/50 hover:shadow-xl hover:shadow-[#ffd700]/10 flex flex-col"
    >
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#07160e]">
        <img
          src={currentSrc}
          alt={item.title}
          onError={handleError}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07160e]/90 via-[#07160e]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
          <div className="flex justify-end">
            <span className="p-2 rounded-full bg-[#0b1f15]/80 text-[#ffd700] border border-[#ffd700]/40 backdrop-blur-md shadow-lg">
              <ZoomIn className="w-5 h-5" />
            </span>
          </div>

          <div className="text-right">
            <span className="text-xs text-[#ffd700] font-bold block mb-1">انقر للتكبير والتفاصيل</span>
            <p className="text-white text-sm font-semibold line-clamp-1">{item.title}</p>
          </div>
        </div>

        {/* Category tag badge in corner */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <span className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-[#07160e]/80 text-[#ffd700] border border-[#ffd700]/30 backdrop-blur-md">
            {item.category}
          </span>
        </div>

        {item.views && (
          <div className="absolute bottom-2.5 left-2.5 z-10">
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 backdrop-blur-sm">
              <Eye className="w-3 h-3" />
              <span>{item.views}</span>
            </span>
          </div>
        )}
      </div>

      {/* Card Info footer */}
      <div className="pt-3 pb-1 px-2 text-right">
        <h4 className="font-bold text-white text-base group-hover:text-gold transition-colors line-clamp-1">
          {item.title}
        </h4>
        
        {/* Tools used as clean typographic metadata */}
        <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1.5 flex-wrap">
            {item.tools.map((t, idx) => (
              <span key={idx} className="flex items-center gap-1">
                {idx > 0 && <span className="text-gray-600">·</span>}
                <span className="text-gray-300">{t}</span>
              </span>
            ))}
          </div>
          <span className="text-gold text-[11px] font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            High CTR
          </span>
        </div>
      </div>
    </div>
  );
};
