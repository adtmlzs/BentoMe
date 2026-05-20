'use client';

import type { Block, ThemeConfig } from '@/types';
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
  theme?: ThemeConfig;
}

export function BlockRenderer({ block, isEditing = false, theme }: BlockRendererProps) {
  const renderBlock = () => {
    switch (block.type) {
      case 'link':
        return <LinkBlock block={block as Block<'link'>} isEditing={isEditing} theme={theme} />;
      case 'text':
        return <TextBlock block={block as Block<'text'>} isEditing={isEditing} theme={theme} />;
      case 'image':
        return <ImageBlock block={block as Block<'image'>} isEditing={isEditing} />;
      case 'embed':
        return <EmbedBlock block={block as Block<'embed'>} isEditing={isEditing} theme={theme} />;
      case 'social':
        return <SocialBlock block={block as Block<'social'>} isEditing={isEditing} theme={theme} />;
      case 'header':
        return <HeaderBlock block={block as Block<'header'>} isEditing={isEditing} theme={theme} />;
      case 'spacer':
        return <SpacerBlock block={block as Block<'spacer'>} isEditing={isEditing} theme={theme} />;
      case 'vibeTracker':
        return <VibeTrackerBlock block={block as Block<'vibeTracker'>} isEditing={isEditing} theme={theme} />;
      case 'progressBar':
        return <ProgressBarBlock block={block as Block<'progressBar'>} isEditing={isEditing} theme={theme} />;
      case 'lanyard':
        return <LanyardBlock content={(block as Block<'lanyard'>).content} theme={theme} />;
      case 'animatedText':
        return <AnimatedTextBlock content={(block as Block<'animatedText'>).content} theme={theme} />;
      case 'digitalPet':
        return <DigitalPetBlock content={(block as Block<'digitalPet'>).content} isEditing={isEditing} theme={theme} />;
      case 'timeline':
        return <TimelineBlock content={(block as Block<'timeline'>).content} theme={theme} />;
      default:
        return <div className="text-zinc-500">Unknown block</div>;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full overflow-hidden relative">
      {renderBlock()}
    </div>
  );
}
