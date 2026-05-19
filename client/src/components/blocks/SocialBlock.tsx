'use client';

import type { Block } from '@bentobox/shared';

interface SocialBlockProps {
  block: Block<'social'>;
  isEditing?: boolean;
}

const PLATFORM_ICONS: Record<string, string> = {
  instagram: '📸',
  twitter: '🐦',
  github: '🐙',
  linkedin: '💼',
  youtube: '▶️',
  tiktok: '🎬',
  discord: '💬',
  twitch: '🎮',
  spotify: '🎵',
  dribbble: '🏀',
  behance: '🎨',
};

const PLATFORM_COLORS: Record<string, string> = {
  instagram: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
  twitter: '#1DA1F2',
  github: '#333',
  linkedin: '#0A66C2',
  youtube: '#FF0000',
  tiktok: '#00F2EA',
  discord: '#5865F2',
  twitch: '#9146FF',
  spotify: '#1DB954',
  dribbble: '#EA4C89',
  behance: '#1769FF',
};

export function SocialBlock({ block, isEditing }: SocialBlockProps) {
  const { platform, handle, url, icon } = block.content;

  const platformLower = platform.toLowerCase();
  const displayIcon = icon ?? PLATFORM_ICONS[platformLower] ?? '🌐';
  const bgColor = PLATFORM_COLORS[platformLower];
  const bgStyle = bgColor?.startsWith('linear')
    ? { backgroundImage: bgColor }
    : { backgroundColor: bgColor ?? 'rgba(255,255,255,0.1)' };

  const content = (
    <div className="flex items-center gap-3 w-full h-full">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
        style={bgStyle}
      >
        {displayIcon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium text-sm capitalize">{platform}</p>
        <p className="text-white/40 text-xs truncate">@{handle}</p>
      </div>
    </div>
  );

  if (isEditing) {
    return content;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full h-full hover:scale-[1.02] transition-transform"
    >
      {content}
    </a>
  );
}
