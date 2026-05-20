'use client';

import type { Block } from '@/types';

interface HeaderBlockProps {
  block: Block<'header'>;
  isEditing?: boolean;
}

export function HeaderBlock({ block }: HeaderBlockProps) {
  const { title, subtitle, avatarUrl } = block.content;

  return (
    <div className="flex flex-col items-center justify-center gap-3 w-full h-full text-center">
      {avatarUrl && (
        <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/20 ring-offset-2 ring-offset-transparent">
          <img src={avatarUrl} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <div>
        <h1 className="text-xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-white/50 text-sm mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}
