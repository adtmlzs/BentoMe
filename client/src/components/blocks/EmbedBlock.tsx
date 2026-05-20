'use client';

import type { Block } from '@/types';

interface EmbedBlockProps {
  block: Block<'embed'>;
  isEditing?: boolean;
}

const PLATFORM_COLORS: Record<string, string> = {
  spotify: '#1DB954',
  youtube: '#FF0000',
  soundcloud: '#FF5500',
  tiktok: '#00F2EA',
  twitter: '#1DA1F2',
};

export function EmbedBlock({ block, isEditing }: EmbedBlockProps) {
  const { platform, embedUrl, aspectRatio = '16/9' } = block.content;

  if (isEditing) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-white/60">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{ backgroundColor: PLATFORM_COLORS[platform] ?? '#666' }}
        >
          {platform === 'spotify' && '🎵'}
          {platform === 'youtube' && '▶️'}
          {platform === 'soundcloud' && '🔊'}
          {platform === 'tiktok' && '🎬'}
          {platform === 'twitter' && '🐦'}
        </div>
        <p className="text-xs font-medium capitalize">{platform} Embed</p>
      </div>
    );
  }

  const processedUrl = (() => {
    if (!embedUrl) return '';
    try {
      if (platform === 'spotify') {
        // Convert open.spotify.com/track/XYZ to open.spotify.com/embed/track/XYZ
        if (embedUrl.includes('open.spotify.com') && !embedUrl.includes('/embed/')) {
          const urlObj = new URL(embedUrl);
          return `https://open.spotify.com/embed${urlObj.pathname}`;
        }
      } else if (platform === 'youtube') {
        // Convert youtube.com/watch?v=XYZ or youtu.be/XYZ to youtube.com/embed/XYZ
        if (embedUrl.includes('youtube.com/watch')) {
          const urlObj = new URL(embedUrl);
          const videoId = urlObj.searchParams.get('v');
          if (videoId) return `https://www.youtube.com/embed/${videoId}`;
        } else if (embedUrl.includes('youtu.be/')) {
          const videoId = embedUrl.split('youtu.be/')[1]?.split('?')[0];
          if (videoId) return `https://www.youtube.com/embed/${videoId}`;
        }
      }
    } catch (e) {
      // If URL parsing fails, return original
    }
    return embedUrl;
  })();

  return (
    <div className="w-full h-full overflow-hidden rounded-inherit" style={{ aspectRatio }}>
      <iframe
        src={processedUrl}
        className="w-full h-full border-0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title={`${platform} embed`}
      />
    </div>
  );
}
