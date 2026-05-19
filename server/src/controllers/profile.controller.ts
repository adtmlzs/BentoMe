import { Request, Response, NextFunction } from 'express';
import * as profileService from '../services/profile.service';
import type { SaveProfileInput, UpdateBlocksInput, UpdateThemeInput } from '../validators/profile.schema';

export async function getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const profile = await profileService.getProfileByUserId(req.user!.userId);
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
}

export async function saveProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const profile = await profileService.saveProfile(req.user!.userId, req.body as SaveProfileInput);
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
}

export async function updateBlocks(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const profile = await profileService.updateBlocks(req.user!.userId, req.body as UpdateBlocksInput);
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
}

export async function updateTheme(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const profile = await profileService.updateTheme(req.user!.userId, req.body as UpdateThemeInput);
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
}

export async function togglePublish(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const profile = await profileService.togglePublish(req.user!.userId);
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
}

export async function getPublicProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const profile = await profileService.getPublicProfile(req.params.username!);
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
}
