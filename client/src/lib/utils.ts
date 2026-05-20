import type { BlockStyle } from '@/types';
import { SHADOW_MAP } from './constants';

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getBlockStyles(style: BlockStyle): React.CSSProperties {
  return {
    backgroundColor: style.backgroundGradient ? undefined : (style.backgroundColor ?? 'rgba(255, 255, 255, 0.05)'),
    backgroundImage: style.backgroundGradient ?? undefined,
    borderRadius: style.borderRadius ?? 16,
    borderColor: style.borderColor ?? undefined,
    borderWidth: style.borderWidth ?? undefined,
    borderStyle: style.borderWidth ? 'solid' : undefined,
    padding: style.padding ?? 16,
    opacity: style.opacity ?? 1,
    boxShadow: SHADOW_MAP[style.shadow ?? 'md'],
  };
}

export function getAnimationClass(animation: BlockStyle['animation']): string {
  switch (animation) {
    case 'fadeIn':
      return 'animate-fadeIn';
    case 'slideUp':
      return 'animate-slideUp';
    case 'bounce':
      return 'animate-bounce';
    case 'pulse':
      return 'animate-pulse';
    default:
      return '';
  }
}
