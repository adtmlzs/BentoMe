import { z } from 'zod';
import { BLOCK_TYPES } from '@bentobox/shared';

// ─── Block Content Schemas ─────────────────────────────────────────

const linkContentSchema = z.object({
  url: z.string().url(),
  label: z.string().min(1).max(100),
  icon: z.string().optional(),
  thumbnail: z.string().url().optional(),
});

const textContentSchema = z.object({
  text: z.string().min(1).max(2000),
  fontSize: z.enum(['sm', 'md', 'lg', 'xl']).optional(),
  fontWeight: z.enum(['normal', 'medium', 'bold']).optional(),
  textAlign: z.enum(['left', 'center', 'right']).optional(),
  fontFamily: z.string().max(50).optional(),
});

const imageContentSchema = z.object({
  src: z.string().url(),
  alt: z.string().max(200),
  objectFit: z.enum(['cover', 'contain', 'fill']).optional(),
});

const embedContentSchema = z.object({
  platform: z.enum(['spotify', 'youtube', 'soundcloud', 'tiktok', 'twitter']),
  embedUrl: z.string().url(),
  aspectRatio: z.string().max(10).optional(),
});

const socialContentSchema = z.object({
  platform: z.string().min(1).max(30),
  handle: z.string().min(1).max(100),
  url: z.string().url(),
  icon: z.string().optional(),
});

const headerContentSchema = z.object({
  title: z.string().min(1).max(100),
  subtitle: z.string().max(200).optional(),
  avatarUrl: z.string().url().optional(),
});

const spacerContentSchema = z.object({
  height: z.number().int().min(1).max(4),
});

// ─── Block Content Union ───────────────────────────────────────────

const blockContentSchema = z.union([
  linkContentSchema,
  textContentSchema,
  imageContentSchema,
  embedContentSchema,
  socialContentSchema,
  headerContentSchema,
  spacerContentSchema,
]);

// ─── Block Style ───────────────────────────────────────────────────

const blockStyleSchema = z.object({
  backgroundColor: z.string().optional(),
  backgroundGradient: z.string().optional(),
  borderRadius: z.number().min(0).max(50).optional(),
  borderColor: z.string().optional(),
  borderWidth: z.number().min(0).max(10).optional(),
  padding: z.number().min(0).max(64).optional(),
  opacity: z.number().min(0).max(1).optional(),
  shadow: z.enum(['none', 'sm', 'md', 'lg', 'xl']).optional(),
  animation: z.enum(['none', 'fadeIn', 'slideUp', 'bounce', 'pulse']).optional(),
}).optional();

// ─── Block Schema ──────────────────────────────────────────────────

const blockSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(BLOCK_TYPES),
  position: z.object({
    x: z.number().int().min(0),
    y: z.number().int().min(0),
    w: z.number().int().min(1).max(4),
    h: z.number().int().min(1).max(4),
  }),
  content: blockContentSchema,
  style: blockStyleSchema,
  isVisible: z.boolean().default(true),
});

// ─── Profile Schemas ───────────────────────────────────────────────

const themeConfigSchema = z.object({
  mode: z.enum(['light', 'dark', 'custom']).optional(),
  primaryColor: z.string().optional(),
  accentColor: z.string().optional(),
  backgroundColor: z.string().optional(),
  fontFamily: z.string().max(50).optional(),
  backgroundImage: z.string().url().optional(),
  backgroundBlur: z.number().min(0).max(50).optional(),
  customCSS: z.string().max(5000).optional(),
});

const gridConfigSchema = z.object({
  columns: z.number().int().min(1).max(6).optional(),
  rowHeight: z.number().int().min(40).max(300).optional(),
  gap: z.number().int().min(0).max(48).optional(),
  maxWidth: z.number().int().min(320).max(1200).optional(),
});

const profileMetaSchema = z.object({
  title: z.string().max(120).optional(),
  description: z.string().max(300).optional(),
  ogImage: z.string().url().optional(),
  favicon: z.string().url().optional(),
});

export const saveProfileSchema = z.object({
  displayName: z.string().min(1).max(60).optional(),
  bio: z.string().max(300).optional(),
  avatarUrl: z.string().url().optional(),
  grid: gridConfigSchema.optional(),
  theme: themeConfigSchema.optional(),
  blocks: z.array(blockSchema).max(50).optional(),
  meta: profileMetaSchema.optional(),
  isPublished: z.boolean().optional(),
});

export const updateBlocksSchema = z.object({
  blocks: z.array(blockSchema).max(50),
});

export const updateThemeSchema = themeConfigSchema;

export const usernameParamSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-z0-9_-]+$/),
});

export type SaveProfileInput = z.infer<typeof saveProfileSchema>;
export type UpdateBlocksInput = z.infer<typeof updateBlocksSchema>;
export type UpdateThemeInput = z.infer<typeof updateThemeSchema>;
