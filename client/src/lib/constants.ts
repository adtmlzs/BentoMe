export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

export const GRID_COLUMNS = 4;
export const GRID_ROW_HEIGHT = 120;
export const GRID_GAP = 12;
export const GRID_MAX_WIDTH = 720;

export const SHADOW_MAP = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
} as const;

export const BLOCK_TYPE_LABELS: Record<string, string> = {
  link: '🔗 Link',
  text: '📝 Text',
  image: '🖼️ Image',
  embed: '🎵 Embed',
  social: '👤 Social',
  header: '✨ Header',
  spacer: '↕️ Spacer',
};

export const BLOCK_TYPE_DESCRIPTIONS: Record<string, string> = {
  link: 'Add a clickable link with label and icon',
  text: 'Write a text block with custom styling',
  image: 'Display an image from a URL',
  embed: 'Embed Spotify, YouTube, or other media',
  social: 'Link to a social media profile',
  header: 'Add a profile header section',
  spacer: 'Add empty space between blocks',
};
