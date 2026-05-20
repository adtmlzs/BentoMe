'use client';

import { useBuilderStore } from '@/stores/builderStore';
import { createClient } from '@/lib/supabase/client';

export function BuilderToolbar() {
  const isDirty = useBuilderStore((s) => s.isDirty);
  const isSaving = useBuilderStore((s) => s.isSaving);
  const isPublished = useBuilderStore((s) => s.isPublished);
  const blocks = useBuilderStore((s) => s.blocks);
  const username = useBuilderStore((s) => s.username);
  const setIsPublished = useBuilderStore((s) => s.setIsPublished);
  
  // Data for saving
  const displayName = useBuilderStore((s) => s.displayName);
  const bio = useBuilderStore((s) => s.bio);
  const avatarUrl = useBuilderStore((s) => s.avatarUrl);
  const theme = useBuilderStore((s) => s.theme);
  const markSaved = useBuilderStore((s) => s.markSaved);
  const setIsSaving = useBuilderStore((s) => s.setIsSaving);

  const handlePublish = async () => {
    if (!isDirty && isPublished) return; // Nothing to do

    setIsSaving(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error: saveError } = await (supabase.from('profiles') as any)
        .update({
          display_name: displayName,
          bio: bio,
          avatar_url: avatarUrl,
          theme_config: theme as any,
          blocks: blocks as any,
          is_published: true,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (saveError) {
        console.error('Failed to publish profile:', saveError.message);
      } else {
        setIsPublished(true);
        markSaved();
      }
    } catch (err) {
      console.error('Unexpected error while publishing:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <header className="h-14 bg-zinc-950 border-b border-white/5 flex items-center justify-between px-4 flex-shrink-0">
      {/* Left side — Logo */}
      <div className="flex items-center gap-3">
        <span className="text-xl">🍱</span>
        <h1 className="text-base font-bold text-white">
          Bento<span className="text-violet-400">Box</span>
        </h1>
        <span className="text-white/20 text-xs">|</span>
        <span className="text-white/40 text-xs">Builder</span>
      </div>

      {/* Center — Status */}
      <div className="flex items-center gap-2">
        {isSaving && (
          <div className="flex items-center gap-1.5 text-xs text-white/40">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Publishing...
          </div>
        )}
        {!isSaving && isDirty && (
          <div className="flex items-center gap-1.5 text-xs text-white/40">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            Draft — Unsaved Changes
          </div>
        )}
        {!isSaving && !isDirty && (
          <div className="flex items-center gap-1.5 text-xs text-white/40">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            All changes live
          </div>
        )}
        <span className="text-white/20 text-xs mx-1">·</span>
        <span className="text-white/30 text-xs">{blocks.length} blocks</span>
      </div>

      {/* Right side — Actions */}
      <div className="flex items-center gap-2">
        <button
          className="px-3 py-1.5 rounded-lg text-xs font-medium text-white/60 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          onClick={() => {
            if (username) {
              window.open(`/${username}`, '_blank');
            }
          }}
        >
          Preview
        </button>
        <button
          onClick={handlePublish}
          disabled={isSaving || (!isDirty && isPublished)}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            (!isDirty && isPublished)
              ? 'bg-white/5 text-white/30 cursor-default' // Disabled state
              : 'bg-violet-500 text-white hover:bg-violet-600 shadow-lg shadow-violet-500/25 cursor-pointer'
          }`}
        >
          {isSaving ? 'Publishing...' : (!isDirty && isPublished) ? '✓ Published' : 'Draft - Click to Publish'}
        </button>
      </div>
    </header>
  );
}
