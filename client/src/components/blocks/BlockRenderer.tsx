'use client';

import type { Block } from '@/types';
import { LinkBlock } from './LinkBlock';
import { TextBlock } from './TextBlock';
import { ImageBlock } from './ImageBlock';
import { EmbedBlock } from './EmbedBlock';
import { SocialBlock } from './SocialBlock';
import { HeaderBlock } from './HeaderBlock';
import { SpacerBlock } from './SpacerBlock';
import { VibeTrackerBlock } from './VibeTrackerBlock';
import { ProgressBarBlock } from './ProgressBarBlock';
import { LanyardBlock } from './LanyardBlock';
import { AnimatedTextBlock } from './AnimatedTextBlock';
import { DigitalPetBlock } from './DigitalPetBlock';
import { TimelineBlock } from './TimelineBlock';

interface BlockRendererProps {
  block: Block;
  isEditing?: boolean;
}

export function BlockRenderer({ block, isEditing = false }: BlockRendererProps) {
  const renderBlock = () => {
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
      case 'vibeTracker':
        return <VibeTrackerBlock block={block as Block<'vibeTracker'>} isEditing={isEditing} />;
      case 'progressBar':
        return <ProgressBarBlock block={block as Block<'progressBar'>} isEditing={isEditing} />;
      case 'lanyard':
        return <LanyardBlock content={(block as Block<'lanyard'>).content} />;
      case 'animatedText':
        return <AnimatedTextBlock content={(block as Block<'animatedText'>).content} />;
      case 'digitalPet':
        return <DigitalPetBlock content={(block as Block<'digitalPet'>).content} isEditing={isEditing} />;
      case 'timeline':
        return <TimelineBlock content={(block as Block<'timeline'>).content} />;
      default:
        return <div className="text-white/40">Unknown block</div>;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full overflow-hidden relative">
      {renderBlock()}
    </div>
  );
}
