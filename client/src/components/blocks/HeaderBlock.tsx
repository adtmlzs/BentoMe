'use client';

import type { Block, ThemeConfig } from '@/types';

interface HeaderBlockProps {
  block: Block<'header'>;
  isEditing?: boolean;
  theme?: ThemeConfig;
}

export function HeaderBlock({ block, theme }: HeaderBlockProps) {
  const { title, subtitle, avatarUrl } = block.content;
  const isLight = theme?.mode === 'light';

  return (
    <div className="flex flex-col items-center justify-center gap-3 w-full h-full text-center">
      {avatarUrl && (
        <div className={`w-16 h-16 rounded-full overflow-hidden ring-2 ${isLight ? 'ring-zinc-200' : 'ring-white/20'} ring-offset-2 ring-offset-transparent`}>
          <img src={avatarUrl} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <div>
        <h1 className={`text-xl font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>{title}</h1>
        {subtitle && <p className={`${isLight ? 'text-zinc-500' : 'text-white/50'} text-sm mt-1`}>{subtitle}</p>}
      </div>
    </div>
  );
}
