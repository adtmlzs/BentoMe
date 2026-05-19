'use client';

import type { Block } from '@bentobox/shared';
import { LinkBlock } from './LinkBlock';
import { TextBlock } from './TextBlock';
import { ImageBlock } from './ImageBlock';
import { EmbedBlock } from './EmbedBlock';
import { SocialBlock } from './SocialBlock';
import { HeaderBlock } from './HeaderBlock';
import { SpacerBlock } from './SpacerBlock';

interface BlockRendererProps {
  block: Block;
  isEditing?: boolean;
}

export function BlockRenderer({ block, isEditing = false }: BlockRendererProps) {
  switch (block.type) {
    case 'link':
      return <LinkBlock block={block as Block<'link'>} isEditing={isEditing} />;
    case 'text':
      return <TextBlock block={block as Block<'text'>} isEditing={isEditing} />;
    case 'image':
      return <ImageBlock block={block as Block<'image'>} isEditing={isEditing} />;
    case 'embed':
      return <EmbedBlock block={block as Block<'embed'>} isEditing={isEditing} />;
    case 'social':
      return <SocialBlock block={block as Block<'social'>} isEditing={isEditing} />;
    case 'header':
      return <HeaderBlock block={block as Block<'header'>} isEditing={isEditing} />;
    case 'spacer':
      return <SpacerBlock block={block as Block<'spacer'>} isEditing={isEditing} />;
    default:
      return <div className="flex items-center justify-center text-white/40">Unknown block</div>;
  }
}
