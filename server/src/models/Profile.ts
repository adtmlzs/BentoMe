import mongoose, { Schema, Document } from 'mongoose';
import type { ProfileConfig } from '@bentobox/shared';

export interface ProfileDocument extends Omit<ProfileConfig, 'createdAt' | 'updatedAt'>, Document {}

// ─── Sub-Schemas ───────────────────────────────────────────────────

const GridPositionSchema = new Schema(
  {
    x: { type: Number, required: true, min: 0 },
    y: { type: Number, required: true, min: 0 },
    w: { type: Number, required: true, min: 1, max: 4 },
    h: { type: Number, required: true, min: 1, max: 4 },
  },
  { _id: false },
);

const BlockStyleSchema = new Schema(
  {
    backgroundColor: { type: String },
    backgroundGradient: { type: String },
    borderRadius: { type: Number, default: 16 },
    borderColor: { type: String },
    borderWidth: { type: Number },
    padding: { type: Number, default: 16 },
    opacity: { type: Number, min: 0, max: 1, default: 1 },
    shadow: {
      type: String,
      enum: ['none', 'sm', 'md', 'lg', 'xl'],
      default: 'md',
    },
    animation: {
      type: String,
      enum: ['none', 'fadeIn', 'slideUp', 'bounce', 'pulse'],
      default: 'fadeIn',
    },
  },
  { _id: false },
);

const BlockSchema = new Schema(
  {
    id: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ['link', 'text', 'image', 'embed', 'social', 'header', 'spacer'],
    },
    position: { type: GridPositionSchema, required: true },
    content: { type: Schema.Types.Mixed, required: true },
    style: { type: BlockStyleSchema, default: () => ({}) },
    isVisible: { type: Boolean, default: true },
  },
  { _id: false, timestamps: true },
);

const ThemeConfigSchema = new Schema(
  {
    mode: { type: String, enum: ['light', 'dark', 'custom'], default: 'dark' },
    primaryColor: { type: String, default: '#8B5CF6' },
    accentColor: { type: String, default: '#EC4899' },
    backgroundColor: { type: String, default: '#0F0F0F' },
    fontFamily: { type: String, default: 'Inter' },
    backgroundImage: { type: String },
    backgroundBlur: { type: Number, default: 0 },
    customCSS: { type: String, maxlength: 5000 },
  },
  { _id: false },
);

const GridConfigSchema = new Schema(
  {
    columns: { type: Number, default: 4, min: 1, max: 6 },
    rowHeight: { type: Number, default: 120, min: 40, max: 300 },
    gap: { type: Number, default: 12, min: 0, max: 48 },
    maxWidth: { type: Number, default: 720, min: 320, max: 1200 },
  },
  { _id: false },
);

const ProfileMetaSchema = new Schema(
  {
    title: { type: String, maxlength: 120 },
    description: { type: String, maxlength: 300 },
    ogImage: { type: String },
    favicon: { type: String },
  },
  { _id: false },
);

// ─── Root Schema ───────────────────────────────────────────────────

const ProfileConfigSchema = new Schema<ProfileDocument>(
  {
    userId: { type: String, required: true, index: true },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      match: /^[a-z0-9_-]+$/,
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },
    bio: { type: String, maxlength: 300 },
    avatarUrl: { type: String },

    grid: { type: GridConfigSchema, default: () => ({}) },
    theme: { type: ThemeConfigSchema, default: () => ({}) },
    blocks: { type: [BlockSchema], default: [] },
    meta: { type: ProfileMetaSchema, default: () => ({}) },

    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },
    version: { type: Number, default: 1 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// ─── Indexes (Optimized for Read) ──────────────────────────────────
ProfileConfigSchema.index({ username: 1 });
ProfileConfigSchema.index({ userId: 1, isPublished: 1 });
ProfileConfigSchema.index({ isPublished: 1, updatedAt: -1 });

export const ProfileModel = mongoose.model<ProfileDocument>('Profile', ProfileConfigSchema);
