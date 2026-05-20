'use client';

import type { Block } from '@/types';

interface LinkBlockProps {
  block: Block<'link'>;
  isEditing?: boolean;
}

export function LinkBlock({ block, isEditing }: LinkBlockProps) {
  const { url, label, icon, thumbnail } = block.content;

  const content = (
    <div className="flex items-center gap-3 w-full h-full group/link">
      {thumbnail ? (
        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white/10">
          <img src={thumbnail} alt="" className="w-full h-full object-cover" />
        </div>
      ) : icon ? (
        <span className="text-2xl flex-shrink-0">{icon}</span>
      ) : (
        <span className="text-2xl flex-shrink-0">🔗</span>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium truncate text-sm">{label}</p>
        <p className="text-white/40 text-xs truncate">{url}</p>
      </div>
      <svg
        className="w-4 h-4 text-white/30 group-hover/link:text-white/60 transition-colors flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
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
