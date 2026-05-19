import type { User } from './user.types';
import type { ProfileConfig } from './profile.types';

// ─── API Response Wrapper ──────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

// ─── Auth ──────────────────────────────────────────────────────────
export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
  displayName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<User, 'createdAt' | 'updatedAt'>;
  token: string;
}

// ─── Profile ───────────────────────────────────────────────────────
export interface SaveProfileRequest {
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  grid?: ProfileConfig['grid'];
  theme?: ProfileConfig['theme'];
  blocks?: ProfileConfig['blocks'];
  meta?: ProfileConfig['meta'];
  isPublished?: boolean;
}

export interface PublicProfileResponse {
  username: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  grid: ProfileConfig['grid'];
  theme: ProfileConfig['theme'];
  blocks: ProfileConfig['blocks'];
  meta: ProfileConfig['meta'];
}
