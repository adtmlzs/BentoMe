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
  BlockContentMap,
  Block,
} from './types/block.types';

export { BLOCK_TYPES, DEFAULT_BLOCK_STYLE } from './types/block.types';

export type {
  ThemeConfig,
  GridConfig,
  ProfileMeta,
  ProfileConfig,
} from './types/profile.types';

export { DEFAULT_GRID_CONFIG, DEFAULT_THEME_CONFIG } from './types/profile.types';

export type { User, UserPlan } from './types/user.types';

export type {
  ApiResponse,
  ApiError,
  RegisterRequest,
  LoginRequest,
  AuthResponse,
  SaveProfileRequest,
  PublicProfileResponse,
} from './types/api.types';
