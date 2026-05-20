// Block types
export type {
  BlockType,
  GridPosition,
  BlockStyle,
  LinkBlockContent,
  TextBlockContent,
  ImageBlockContent,
  EmbedBlockContent,
  SocialBlockContent,
  HeaderBlockContent,
  SpacerBlockContent,
  VibeTrackerItem,
  VibeTrackerBlockContent,
  ProgressBarBlockContent,
  LanyardBlockContent,
  AnimatedTextBlockContent,
  DigitalPetBlockContent,
  TimelineItem,
  TimelineBlockContent,
  BlockContentMap,
  Block,
} from './block.types';

export { BLOCK_TYPES, DEFAULT_BLOCK_STYLE } from './block.types';

// Profile types
export type {
  CursorStyle,
  ParticleEffect,
  CanvasMode,
  GlassmorphismLevel,
  ThemePreset,
  ThemeConfig,
  GridConfig,
  ProfileMeta,
  ProfileConfig,
} from './profile.types';

export { DEFAULT_GRID_CONFIG, DEFAULT_THEME_CONFIG } from './profile.types';

// User types
export type { User, UserPlan } from './user.types';

// API types
export type {
  ApiResponse,
  ApiError,
  RegisterRequest,
  LoginRequest,
  AuthResponse,
  SaveProfileRequest,
  PublicProfileResponse,
} from './api.types';

// Database types
export type {
  Database,
  ThemeConfigJson,
  BlockJson,
  Profile,
  ProfileInsert,
  ProfileUpdate,
} from './database.types';
