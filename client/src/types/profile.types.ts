import type { Block } from './block.types';

// ─── Theme Configuration ───────────────────────────────────────────
export type CursorStyle = 'default' | 'crosshair' | 'neon' | 'katana' | 'dot';
export type ParticleEffect = 'none' | 'snow' | 'matrix' | 'sakura';
export type GlassmorphismLevel = 0 | 1 | 2 | 3;
export type CanvasMode = 'none' | 'cyberpunk' | 'matrix' | 'liquidGlass' | 'grain';
export type ThemePreset = 
  | 'custom' 
  | 'y2k-matrix' 
  | 'lofi-chill' 
  | 'cyberpunk' 
  | 'opium-dark'
  | 'linear-dark'
  | 'swiss-minimal'
  | 'notion-core'
  | 'midnight-oled';

export interface ThemeConfig {
  mode: 'light' | 'dark' | 'custom';
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  fontFamily: string;
  backgroundImage?: string;
  backgroundBlur?: number;
  customCSS?: string;

  // ─── Cyber Aesthetic Extensions ───────────────────────────────
  cursorStyle?: CursorStyle;
  particleEffect?: ParticleEffect;
  canvasMode?: CanvasMode;
  glassmorphismLevel?: GlassmorphismLevel;
  themePreset?: ThemePreset;
  discordUserId?: string;
}

// ─── Grid Configuration ────────────────────────────────────────────
export interface GridConfig {
  columns: number;
  rowHeight: number;
  gap: number;
  maxWidth: number;
}

// ─── SEO / Meta ────────────────────────────────────────────────────
export interface ProfileMeta {
  title?: string;
  description?: string;
  ogImage?: string;
  favicon?: string;
}

// ─── Profile Config (Root Document) ────────────────────────────────
export interface ProfileConfig {
  userId: string;
  username: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;

  grid: GridConfig;
  theme: ThemeConfig;
  blocks: Block[];
  meta: ProfileMeta;

  isPublished: boolean;
  publishedAt?: string;
  version: number;

  createdAt: string;
  updatedAt: string;
}

// ─── Defaults ──────────────────────────────────────────────────────
export const DEFAULT_GRID_CONFIG: GridConfig = {
  columns: 4,
  rowHeight: 120,
  gap: 12,
  maxWidth: 720,
};

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  mode: 'dark',
  primaryColor: '#8B5CF6',
  accentColor: '#EC4899',
  backgroundColor: '#0F0F0F',
  fontFamily: 'Inter',
  cursorStyle: 'default',
  particleEffect: 'none',
  canvasMode: 'none',
  glassmorphismLevel: 0,
  themePreset: 'custom',
};
