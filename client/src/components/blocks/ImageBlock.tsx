'use client';

import type { Block } from '@/types';

interface ImageBlockProps {
  block: Block<'image'>;
  isEditing?: boolean;
}

export function ImageBlock({ block }: ImageBlockProps) {
  const { src, alt, objectFit = 'cover' } = block.content;

  return (
    <div className="w-full h-full overflow-hidden rounded-inherit">
      <img
        src={src}
        alt={alt}
        className="w-full h-full transition-transform duration-300 hover:scale-105"
        style={{ objectFit }}
        loading="lazy"
      />
    </div>
  );
}
