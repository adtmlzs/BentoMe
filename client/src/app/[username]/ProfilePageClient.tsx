'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import type { Profile } from '@/types/database.types';
import { ProfileGrid } from '@/components/profile/ProfileGrid';
import { ParticleBackground } from '@/components/effects/ParticleBackground';
import { CanvasBackground } from '@/components/effects/CanvasBackground';
import { LikeButton } from '@/components/profile/LikeButton';
import { createClient } from '@/lib/supabase/client';
import { DEFAULT_GRID_CONFIG, DEFAULT_THEME_CONFIG, type Block, type ThemeConfig } from '@/types';

interface ProfilePageClientProps {
  username: string;
}

export function ProfilePageClient({ username }: ProfilePageClientProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchProfile() {
      try {
        const supabase = createClient();
        const { data, error: dbError } = await supabase
          .from('profiles')
          .select('*')
          .eq('username', username.toLowerCase())
          .maybeSingle() as any;

        if (dbError || !data) {
          setError('Profile not found');
          return;
        }

        const { data: { user } } = await supabase.auth.getUser();
        const ownerStatus = user?.id === data.user_id;

        if (!data.is_published && !ownerStatus) {
          setError('Profile not found');
          return;
        }

        setProfile(data);
        setIsOwner(ownerStatus);


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
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center animate-fadeIn">
        <div className="text-center p-8 max-w-sm">
          <div className="text-6xl mb-4 select-none">🍱</div>
          <h1 className="text-xl font-bold text-white mb-2">Profile not found</h1>
          <p className="text-white/40 text-sm">
            The profile <span className="text-violet-400">@{username}</span> doesn&apos;t exist or has not been published yet.
          </p>
        </div>
      </div>
    );
  }

  const theme: ThemeConfig = {
    ...DEFAULT_THEME_CONFIG,
    ...(profile.theme_config as unknown as ThemeConfig),
  };



  return (
    <div
      className="relative min-h-screen flex flex-col"
      style={{ backgroundColor: theme.backgroundColor }}
    >
      {/* Particle Background */}
      {theme.particleEffect && theme.particleEffect !== 'none' && (
        <ParticleBackground effect={theme.particleEffect} />
      )}

      {/* WebGL / Canvas Physics Background */}
      {theme.canvasMode && theme.canvasMode !== 'none' && (
        <CanvasBackground mode={theme.canvasMode} />
      )}

      {/* Preview-mode banner */}
      {!profile.is_published && isOwner && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-center text-xs text-amber-400 font-medium z-50 relative flex items-center justify-center gap-2">
          <span>⚠️ Preview Mode: Your profile is unpublished and only visible to you.</span>
          <button
            onClick={() => window.location.href = '/builder'}
            className="underline hover:text-amber-300 font-semibold cursor-pointer"
          >
            Go to Builder to Publish
          </button>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1">
        <ProfileGrid
          blocks={profile.blocks as unknown as Block[]}
          grid={DEFAULT_GRID_CONFIG}
          theme={theme}
          staggered={false}
        />
      </div>

      {/* Global Profile Likes */}
      <LikeButton username={profile.username} initialLikes={profile.total_likes || 0} />
    </div>
  );
}
