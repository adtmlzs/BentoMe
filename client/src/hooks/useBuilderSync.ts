'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBuilderStore } from '@/stores/builderStore';
import { createClient } from '@/lib/supabase/client';
import type { Block, ThemeConfig } from '@/types';

export function useBuilderSync() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  // Store state and actions
  const loadProfile = useBuilderStore((s) => s.loadProfile);
  const blocks = useBuilderStore((s) => s.blocks);
  const grid = useBuilderStore((s) => s.grid);
  const theme = useBuilderStore((s) => s.theme);
  const meta = useBuilderStore((s) => s.meta);
  const displayName = useBuilderStore((s) => s.displayName);
  const bio = useBuilderStore((s) => s.bio);
  const avatarUrl = useBuilderStore((s) => s.avatarUrl);
  const isPublished = useBuilderStore((s) => s.isPublished);
  const username = useBuilderStore((s) => s.username);
  
  const isDirty = useBuilderStore((s) => s.isDirty);
  const setIsSaving = useBuilderStore((s) => s.setIsSaving);
  const markSaved = useBuilderStore((s) => s.markSaved);

  // Load profile on mount
  useEffect(() => {
    async function init() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/login');
          return;
        }

        const { data: profile, error: dbError } = await (supabase
          .from('profiles') as any)
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (dbError) {
          setError(dbError.message);
          return;
        }

        if (!profile) {
          // If authenticated but no profile exists, send to onboarding
          router.push('/onboarding');
          return;
        }

        const themeData = profile.theme_config as Record<string, any> || {};

        loadProfile({
          username: profile.username,
          blocks: (profile.blocks || []) as unknown as Block[],
          grid: {
            columns: 4,
            rowHeight: 120,
            gap: 12,
            maxWidth: 720,
          }, // Default grid settings
          theme: {
            mode: themeData.mode || 'dark',
            primaryColor: themeData.primaryColor || '#8B5CF6',
            accentColor: themeData.accentColor || '#EC4899',
            backgroundColor: themeData.backgroundColor || '#0F0F0F',
            fontFamily: themeData.fontFamily || 'Inter',
            backgroundImage: themeData.backgroundImage,
            backgroundBlur: themeData.backgroundBlur,
            customCSS: themeData.customCSS,
            cursorStyle: themeData.cursorStyle || 'default',
            particleEffect: themeData.particleEffect || 'none',
            glassmorphismLevel: themeData.glassmorphismLevel ?? 0,
            themePreset: themeData.themePreset || 'custom',
            discordUserId: themeData.discordUserId,
          },
          meta: {
            title: profile.display_name,
            description: profile.bio || '',
          },
          displayName: profile.display_name,
          bio: profile.bio || '',
          avatarUrl: profile.avatar_url || '',
          isPublished: profile.is_published,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    }

    void init();
  }, [loadProfile, router]);

  // Auto-save has been removed to support manual "Draft -> Publish" flow
  // Saving is now handled explicitly by the BuilderToolbar component

  return { loading, error };
}
