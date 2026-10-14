import React from 'react';
import { ExternalLink, Film, Clock, Sparkles } from 'lucide-react';
import { VideoItem } from '../data/portfolioData';

interface VideoCardProps {
  video: VideoItem;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const watchUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;

  return (
    <div className="glass-panel p-3 md:p-4 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-[#ffd700]/45 hover:shadow-xl hover:shadow-[#ffd700]/10">
      
      {/* Video Player Frame */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-[#ffd700]/20 shadow-inner">
        <iframe
          className="w-full h-full rounded-xl"
          src={`${video.embedUrl}?rel=0&modestbranding=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>

      {/* Meta & Info */}
      <div className="mt-4 px-1 text-right flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ffd700]"></span>
              <span className="text-xs font-semibold text-[#ffd700]">
                {video.client || (video.category === 'podcast' ? 'مونتاج بودكاست' : 'فيديو طويل')}
              </span>
            </div>

            {video.duration && (
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{video.duration}</span>
              </span>
            )}
          </div>

          <h4 className="font-bold text-white text-base md:text-lg mb-2 leading-snug">
            {video.title}
          </h4>

          {video.description && (
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-3 font-normal">
              {video.description}
            </p>
          )}
        </div>

        {/* Tags and external YouTube link */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            {video.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#113824] text-[#ffd700] border border-[#ffd700]/20"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#ffd700] flex items-center gap-1 transition-colors shrink-0 mr-2"
          >
            <span>يوتيوب</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

    </div>
  );
};
