'use client';

import type { Block } from '@bentobox/shared';

interface SpacerBlockProps {
  block: Block<'spacer'>;
  isEditing?: boolean;
}

export function SpacerBlock({ block, isEditing }: SpacerBlockProps) {
  if (isEditing) {
    return (
      <div className="w-full h-full flex items-center justify-center border border-dashed border-white/10 rounded-xl">
        <span className="text-white/20 text-xs">↕️ Spacer ({block.content.height})</span>
      </div>
    );
  }

  return <div className="w-full h-full" />;
}
