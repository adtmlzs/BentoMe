import type { CursorStyle } from '@/types';

// ─── Custom Cursor SVG Data URIs ───────────────────────────────────

const CURSOR_CROSSHAIR = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cline x1='12' y1='2' x2='12' y2='8' stroke='%23fff' stroke-width='1.5' stroke-linecap='round'/%3E%3Cline x1='12' y1='16' x2='12' y2='22' stroke='%23fff' stroke-width='1.5' stroke-linecap='round'/%3E%3Cline x1='2' y1='12' x2='8' y2='12' stroke='%23fff' stroke-width='1.5' stroke-linecap='round'/%3E%3Cline x1='16' y1='12' x2='22' y2='12' stroke='%23fff' stroke-width='1.5' stroke-linecap='round'/%3E%3Ccircle cx='12' cy='12' r='2' fill='%23fff'/%3E%3C/svg%3E") 12 12, crosshair`;

const CURSOR_NEON = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Ccircle cx='10' cy='10' r='8' fill='none' stroke='%238B5CF6' stroke-width='2'/%3E%3Ccircle cx='10' cy='10' r='3' fill='%238B5CF6'/%3E%3C/svg%3E") 10 10, pointer`;

const CURSOR_KATANA = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cline x1='4' y1='20' x2='20' y2='4' stroke='%23fff' stroke-width='2' stroke-linecap='round'/%3E%3Cline x1='16' y1='4' x2='20' y2='4' stroke='%23ff4444' stroke-width='2' stroke-linecap='round'/%3E%3Cline x1='20' y1='4' x2='20' y2='8' stroke='%23ff4444' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E") 4 4, default`;

const CURSOR_DOT = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Ccircle cx='6' cy='6' r='5' fill='%23fff' opacity='0.8'/%3E%3C/svg%3E") 6 6, default`;

export function getCursorClass(style?: CursorStyle): string {
  switch (style) {
    case 'crosshair':
      return 'cursor-custom-crosshair';
    case 'neon':
      return 'cursor-custom-neon';
    case 'katana':
      return 'cursor-custom-katana';
    case 'dot':
      return 'cursor-custom-dot';
    default:
      return '';
  }
}

export function getCursorCSS(style?: CursorStyle): string | undefined {
  switch (style) {
    case 'crosshair':
      return CURSOR_CROSSHAIR;
    case 'neon':
      return CURSOR_NEON;
    case 'katana':
      return CURSOR_KATANA;
    case 'dot':
      return CURSOR_DOT;
    default:
      return undefined;
  }
}

// Glassmorphism backdrop-blur class mapping
export function getGlassClass(level?: number): string {
  switch (level) {
    case 1:
      return 'backdrop-blur-sm bg-white/[0.03]';
    case 2:
      return 'backdrop-blur-md bg-white/[0.05]';
    case 3:
      return 'backdrop-blur-xl bg-white/[0.08]';
    default:
      return '';
  }
}
