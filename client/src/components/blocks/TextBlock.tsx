'use client';

import type { Block } from '@bentobox/shared';

interface TextBlockProps {
  block: Block<'text'>;
  isEditing?: boolean;
}

const FONT_SIZE_MAP = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-2xl',
} as const;

const FONT_WEIGHT_MAP = {
  normal: 'font-normal',
  medium: 'font-medium',
  bold: 'font-bold',
} as const;

const TEXT_ALIGN_MAP = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

export function TextBlock({ block }: TextBlockProps) {
  const { text, fontSize = 'md', fontWeight = 'normal', textAlign = 'left', fontFamily } = block.content;

  const classes = [
    'text-white w-full h-full flex items-center',
    FONT_SIZE_MAP[fontSize],
    FONT_WEIGHT_MAP[fontWeight],
    TEXT_ALIGN_MAP[textAlign],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} style={fontFamily ? { fontFamily } : undefined}>
      <p className="w-full whitespace-pre-wrap break-words">{text}</p>
    </div>
  );
}
