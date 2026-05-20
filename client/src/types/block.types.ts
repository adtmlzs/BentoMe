// ─── Block Type Enum ───────────────────────────────────────────────
export const BLOCK_TYPES = [
  'link',
  'text',
  'image',
  'embed',
  'social',
  'header',
  'spacer',
  'vibeTracker',
  'progressBar',
  'lanyard',
  'animatedText',
  'digitalPet',
  'timeline',
] as const;

export type BlockType = (typeof BLOCK_TYPES)[number];

// ─── Grid Position ─────────────────────────────────────────────────
export interface GridPosition {
  x: number; // Column start (0-indexed)
  y: number; // Row start (0-indexed)
  w: number; // Width in grid units (1-4)
  h: number; // Height in grid units (1-4)
}

// ─── Block Style ───────────────────────────────────────────────────
export interface BlockStyle {
  backgroundColor?: string;
  backgroundGradient?: string;
  borderRadius?: number;
  borderColor?: string;
  borderWidth?: number;
  padding?: number;
  opacity?: number;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  animation?: 'none' | 'fadeIn' | 'slideUp' | 'bounce' | 'pulse';
}

// ─── Block Content Payloads ────────────────────────────────────────

export interface LinkBlockContent {
  url: string;
  label: string;
  icon?: string;
  thumbnail?: string;
}

export interface TextBlockContent {
  text: string;
  fontSize?: 'sm' | 'md' | 'lg' | 'xl';
  fontWeight?: 'normal' | 'medium' | 'bold';
  textAlign?: 'left' | 'center' | 'right';
  fontFamily?: string;
}

export interface ImageBlockContent {
  src: string;
  alt: string;
  objectFit?: 'cover' | 'contain' | 'fill';
}

export interface EmbedBlockContent {
  platform: 'spotify' | 'youtube' | 'soundcloud' | 'tiktok' | 'twitter';
  embedUrl: string;
  aspectRatio?: string;
}

export interface SocialBlockContent {
  platform: string;
  handle: string;
  url: string;
  icon?: string;
}

export interface HeaderBlockContent {
  title: string;
  subtitle?: string;
  avatarUrl?: string;
}

export interface SpacerBlockContent {
  height: number;
}

// ─── Vibe Tracker ─────────────────────────────────────────────────

export interface VibeTrackerItem {
  icon: string;
  label: string;
  value: string;
}

export interface VibeTrackerBlockContent {
  items: VibeTrackerItem[];
}

// ─── Progress Bar ─────────────────────────────────────────────────

export interface ProgressBarBlockContent {
  title: string;
  currentValue: number;
  targetValue: number;
}

// ─── Lanyard (Discord Presence) ─────────────────────────────────────

export interface LanyardBlockContent {
  discordUserId: string;
  showSpotify: boolean;
  showActivity: boolean;
  showStatus: boolean;
}

// ─── Animated Text ────────────────────────────────────────────────

export interface AnimatedTextBlockContent {
  text: string;
  textAnimation: 'glitch' | 'hackerDecode' | 'typewriter' | 'wave';
  fontSize?: 'sm' | 'md' | 'lg' | 'xl';
  fontWeight?: 'normal' | 'medium' | 'bold';
  textAlign?: 'left' | 'center' | 'right';
  fontFamily?: string;
  glitchColor1?: string;
  glitchColor2?: string;
}

// ─── Digital Pet ──────────────────────────────────────────────────

export interface DigitalPetBlockContent {
  petName?: string;
  petType?: 'ghost' | 'cat' | 'dog'; // Expandable for later
}

// ─── Timeline ─────────────────────────────────────────────────────

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  type: 'experience' | 'education' | 'certification';
}

export interface TimelineBlockContent {
  items: TimelineItem[];
}

// ─── Content Map (discriminated) ───────────────────────────────────
export interface BlockContentMap {
  link: LinkBlockContent;
  text: TextBlockContent;
  image: ImageBlockContent;
  embed: EmbedBlockContent;
  social: SocialBlockContent;
  header: HeaderBlockContent;
  spacer: SpacerBlockContent;
  vibeTracker: VibeTrackerBlockContent;
  progressBar: ProgressBarBlockContent;
  lanyard: LanyardBlockContent;
  animatedText: AnimatedTextBlockContent;
  digitalPet: DigitalPetBlockContent;
  timeline: TimelineBlockContent;
}

// ─── Block (Generic) ──────────────────────────────────────────────
export interface Block<T extends BlockType = BlockType> {
  id: string;
  type: T;
  position: GridPosition;
  content: BlockContentMap[T];
  style: BlockStyle;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Default Block Style ───────────────────────────────────────────
export const DEFAULT_BLOCK_STYLE: BlockStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderRadius: 16,
  padding: 16,
  opacity: 1,
  shadow: 'md',
  animation: 'fadeIn',
};
