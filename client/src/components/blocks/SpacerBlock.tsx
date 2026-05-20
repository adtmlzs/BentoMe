'use client';

import type { Block, ThemeConfig } from '@/types';

interface SpacerBlockProps {
  block: Block<'spacer'>;
  isEditing?: boolean;
  theme?: ThemeConfig;
}

export function SpacerBlock({ block, isEditing, theme }: SpacerBlockProps) {
  const isLight = theme?.mode === 'light';

  if (isEditing) {
    return (
      <div className={`w-full h-full flex items-center justify-center border border-dashed ${isLight ? 'border-zinc-300' : 'border-white/10'} rounded-xl`}>
        <span className={`${isLight ? 'text-zinc-400' : 'text-white/20'} text-xs`}>↕️ Spacer ({block.content.height})</span>
      </div>
    );
  }

  return <div className="w-full h-full" />;
}
