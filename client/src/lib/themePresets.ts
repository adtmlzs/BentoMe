import type { ThemeConfig, ThemePreset } from '@/types';

// ─── Theme Preset Definitions ──────────────────────────────────────
// Each preset provides a complete ThemeConfig override that the
// DesignToolbar applies in one click.

type PresetConfig = Omit<ThemeConfig, 'mode'> & { mode: ThemeConfig['mode'] };

export const THEME_PRESETS: Record<Exclude<ThemePreset, 'custom'>, PresetConfig> = {
  'y2k-matrix': {
    mode: 'dark',
    primaryColor: '#00FF41',
    accentColor: '#00CC33',
    backgroundColor: '#000000',
    fontFamily: 'monospace',
    cursorStyle: 'crosshair',
    particleEffect: 'matrix',
    glassmorphismLevel: 1,
    themePreset: 'y2k-matrix',
  },
  'lofi-chill': {
    mode: 'dark',
    primaryColor: '#F5A623',
    accentColor: '#B8860B',
    backgroundColor: '#1A1512',
    fontFamily: 'Inter',
    cursorStyle: 'default',
    particleEffect: 'sakura',
    glassmorphismLevel: 2,
    themePreset: 'lofi-chill',
  },
  cyberpunk: {
    mode: 'dark',
    primaryColor: '#FF006E',
    accentColor: '#00D4FF',
    backgroundColor: '#0A0015',
    fontFamily: 'Inter',
    cursorStyle: 'neon',
    particleEffect: 'none',
    glassmorphismLevel: 3,
    themePreset: 'cyberpunk',
  },
  'opium-dark': {
    mode: 'dark',
    primaryColor: '#8B0000',
    accentColor: '#2D0000',
    backgroundColor: '#050000',
    fontFamily: 'Inter',
    cursorStyle: 'katana',
    particleEffect: 'none',
    glassmorphismLevel: 1,
    themePreset: 'opium-dark',
  },
  'linear-dark': {
    mode: 'dark',
    primaryColor: '#FFFFFF',
    accentColor: '#222222',
    backgroundColor: '#000000',
    fontFamily: 'Inter',
    cursorStyle: 'default',
    particleEffect: 'none',
    canvasMode: 'grain',
    glassmorphismLevel: 0,
    themePreset: 'linear-dark',
  },
  'swiss-minimal': {
    mode: 'light',
    primaryColor: '#000000',
    accentColor: '#000000',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica, Arial, sans-serif',
    cursorStyle: 'default',
    particleEffect: 'none',
    canvasMode: 'grain',
    glassmorphismLevel: 0,
    themePreset: 'swiss-minimal',
  },
  'notion-core': {
    mode: 'light',
    primaryColor: '#37352F',
    accentColor: '#EBEBEB',
    backgroundColor: '#F7F7F5',
    fontFamily: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif',
    cursorStyle: 'default',
    particleEffect: 'none',
    canvasMode: 'grain',
    glassmorphismLevel: 0,
    themePreset: 'notion-core',
  },
  'midnight-oled': {
    mode: 'dark',
    primaryColor: '#0A84FF',
    accentColor: '#1F1F1F',
    backgroundColor: '#0A0A0A',
    fontFamily: 'Inter',
    cursorStyle: 'default',
    particleEffect: 'none',
    canvasMode: 'grain',
    glassmorphismLevel: 1,
    themePreset: 'midnight-oled',
  },
};

export const PRESET_META: Record<
  Exclude<ThemePreset, 'custom'>,
  { label: string; emoji: string; description: string }
> = {
  'y2k-matrix': {
    label: 'Y2K Matrix',
    emoji: '🟢',
    description: 'Green rain, monospace, digital overload',
  },
  'lofi-chill': {
    label: 'Lo-Fi Chill',
    emoji: '🌸',
    description: 'Warm tones, cherry blossoms, cozy vibes',
  },
  cyberpunk: {
    label: 'Cyberpunk',
    emoji: '💜',
    description: 'Neon pink & cyan, heavy glass, electric',
  },
  'opium-dark': {
    label: 'Opium Dark',
    emoji: '🩸',
    description: 'Deep crimson, minimal, brooding',
  },
  'linear-dark': {
    label: 'Linear Dark',
    emoji: '⬛',
    description: 'Pure black, stark white, sleek sans-serif',
  },
  'swiss-minimal': {
    label: 'Swiss Minimal',
    emoji: '⬜',
    description: 'High contrast, brutalist, sharp corners',
  },
  'notion-core': {
    label: 'Notion Core',
    emoji: '📝',
    description: 'Off-white, muted dark text, classic',
  },
  'midnight-oled': {
    label: 'Midnight OLED',
    emoji: '🌌',
    description: 'Deep midnight blue, hyper-minimal',
  },
};
