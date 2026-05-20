import type { BlockStyle, ThemeConfig } from '@/types';
import { SHADOW_MAP } from './constants';

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getBlockStyles(style: BlockStyle, theme?: ThemeConfig): React.CSSProperties {
  const isLight = theme?.mode === 'light';
  return {
    backgroundColor: style.backgroundGradient 
      ? undefined 
      : (style.backgroundColor ?? (isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)')),
    backgroundImage: style.backgroundGradient ?? undefined,
    borderRadius: style.borderRadius ?? 16,
    borderColor: style.borderColor ?? (isLight ? 'rgba(0, 0, 0, 0.08)' : undefined),
    borderWidth: style.borderWidth ?? (isLight ? 1 : undefined),
    borderStyle: (style.borderWidth || isLight) ? 'solid' : undefined,
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
