import React from 'react';
import { ExternalLink, Smartphone, Sparkles, Clock } from 'lucide-react';
import { VideoItem } from '../data/portfolioData';

interface ShortsCardProps {
  video: VideoItem;
}

export const ShortsCard: React.FC<ShortsCardProps> = ({ video }) => {
  const shortsUrl = `https://www.youtube.com/shorts/${video.youtubeId}`;

  return (
    <div className="glass-panel p-3 rounded-2xl flex flex-col items-center transition-all duration-300 hover:scale-[1.01] hover:border-[#ffd700]/50 hover:shadow-2xl hover:shadow-[#ffd700]/15">
      
      {/* 9:16 Vertical Video Frame */}
      <div className="relative w-full max-w-[340px] aspect-[9/16] rounded-xl overflow-hidden bg-black border border-[#ffd700]/25 shadow-2xl">
        <iframe
          className="w-full h-full rounded-xl"
          src={`${video.embedUrl}?rel=0&modestbranding=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />

        {/* Top Floating Badge */}
        <div className="absolute top-3 right-3 pointer-events-none z-10">
          <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-black/75 text-[#ffd700] border border-[#ffd700]/40 backdrop-blur-md flex items-center gap-1">
            <Smartphone className="w-3 h-3" />
            <span>9:16 Reel</span>
          </span>
        </div>
      </div>

      {/* Meta details */}
      <div className="w-full max-w-[340px] mt-4 px-1 text-right flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between mb-1.5 text-xs">
            <span className="text-[#ffd700] font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>محتوى رأسي فيروسي</span>
            </span>
            {video.duration && (
              <span className="text-gray-400 flex items-center gap-1 text-[11px]">
                <Clock className="w-3 h-3" />
                <span>{video.duration}</span>
              </span>
            )}
          </div>

          <h4 className="font-bold text-white text-base mb-1.5 line-clamp-1">
            {video.title}
          </h4>

          {video.description && (
            <p className="text-gray-300 text-xs leading-relaxed line-clamp-2 mb-3">
              {video.description}
            </p>
          )}
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-1 flex-wrap">
            {video.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#113824] text-[#ffd700]"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={shortsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-[#ffd700] flex items-center gap-1 transition-colors"
          >
            <span>شاهد</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

    </div>
  );
};
