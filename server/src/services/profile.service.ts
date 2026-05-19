import { ProfileModel } from '../models/Profile';
import type { SaveProfileInput, UpdateBlocksInput, UpdateThemeInput } from '../validators/profile.schema';

export async function getProfileByUserId(userId: string) {
  const profile = await ProfileModel.findOne({ userId });

  if (!profile) {
    const error = new Error('Profile not found') as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return profile;
}

export async function getPublicProfile(username: string) {
  const profile = await ProfileModel.findOne({ username, isPublished: true });

  if (!profile) {
    const error = new Error('Profile not found') as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return {
    username: profile.username,
    displayName: profile.displayName,
    bio: profile.bio,
    avatarUrl: profile.avatarUrl,
    grid: profile.grid,
    theme: profile.theme,
    blocks: profile.blocks.filter((b) => b.isVisible),
    meta: profile.meta,
  };
}

export async function saveProfile(userId: string, input: SaveProfileInput) {
  const profile = await ProfileModel.findOneAndUpdate(
    { userId },
    {
      ...input,
      $inc: { version: 1 },
    },
    { new: true, runValidators: true },
  );

  if (!profile) {
    const error = new Error('Profile not found') as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return profile;
}

export async function updateBlocks(userId: string, input: UpdateBlocksInput) {
  const profile = await ProfileModel.findOneAndUpdate(
    { userId },
    {
      blocks: input.blocks,
      $inc: { version: 1 },
    },
    { new: true, runValidators: true },
  );

  if (!profile) {
    const error = new Error('Profile not found') as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return profile;
}

export async function updateTheme(userId: string, input: UpdateThemeInput) {
  const updateFields: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    updateFields[`theme.${key}`] = value;
  }

  const profile = await ProfileModel.findOneAndUpdate(
    { userId },
    {
      $set: updateFields,
      $inc: { version: 1 },
    },
    { new: true, runValidators: true },
  );

  if (!profile) {
    const error = new Error('Profile not found') as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  return profile;
}

export async function togglePublish(userId: string) {
  const profile = await ProfileModel.findOne({ userId });

  if (!profile) {
    const error = new Error('Profile not found') as Error & { statusCode: number };
    error.statusCode = 404;
    throw error;
  }

  profile.isPublished = !profile.isPublished;
  if (profile.isPublished) {
    profile.publishedAt = new Date();
  }
  profile.version += 1;
  await profile.save();

  return profile;
}
