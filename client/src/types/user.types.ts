// ─── User Types ────────────────────────────────────────────────────
export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  plan: 'free' | 'pro' | 'team';
  isVerified: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type UserPlan = User['plan'];
