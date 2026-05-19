import { Router } from 'express';
import {
  getProfile,
  saveProfile,
  updateBlocks,
  updateTheme,
  togglePublish,
  getPublicProfile,
} from '../controllers/profile.controller';
import { validate } from '../middleware/validate';
import { auth } from '../middleware/auth';
import {
  saveProfileSchema,
  updateBlocksSchema,
  updateThemeSchema,
  usernameParamSchema,
} from '../validators/profile.schema';

const router = Router();

// Protected routes (require auth)
router.get('/', auth, getProfile);
router.put('/', auth, validate(saveProfileSchema), saveProfile);
router.patch('/blocks', auth, validate(updateBlocksSchema), updateBlocks);
router.patch('/theme', auth, validate(updateThemeSchema), updateTheme);
router.patch('/publish', auth, togglePublish);

// Public route
router.get('/:username', validate(usernameParamSchema, 'params'), getPublicProfile);

export default router;
