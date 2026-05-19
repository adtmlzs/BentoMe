'use client';

import { useEffect, useState } from 'react';
import type { PublicProfileResponse } from '@bentobox/shared';
import { ProfileGrid } from '@/components/profile/ProfileGrid';
import { api } from '@/lib/api';

interface ProfilePageClientProps {
  username: string;
}

export function ProfilePageClient({ username }: ProfilePageClientProps) {
  const [profile, setProfile] = useState<PublicProfileResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await api.get<PublicProfileResponse>(`/profile/${username}`);
        setProfile(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Profile not found');
      } finally {
        setLoading(false);
      }
    }

    void fetchProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-white/30 text-sm">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍱</div>
          <h1 className="text-2xl font-bold text-white mb-2">Profile not found</h1>
          <p className="text-white/40">
            The profile <span className="text-violet-400">@{username}</span> doesn&apos;t exist or isn&apos;t published yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ProfileGrid
      blocks={profile.blocks}
      grid={profile.grid}
      theme={profile.theme}
    />
  );
}
