'use client';

import type { Block } from '@bentobox/shared';

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

  return (
    <div className="w-full h-full overflow-hidden rounded-inherit" style={{ aspectRatio }}>
      <iframe
        src={embedUrl}
        className="w-full h-full border-0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title={`${platform} embed`}
      />
    </div>
  );
}
