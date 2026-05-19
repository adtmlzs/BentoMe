'use client';

import { useBuilderStore } from '@/stores/builderStore';

export function BuilderToolbar() {
  const isDirty = useBuilderStore((s) => s.isDirty);
  const isSaving = useBuilderStore((s) => s.isSaving);
  const isPublished = useBuilderStore((s) => s.isPublished);
  const blocks = useBuilderStore((s) => s.blocks);

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
            Saving...
          </div>
        )}
        {!isSaving && isDirty && (
          <div className="flex items-center gap-1.5 text-xs text-white/40">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            Unsaved changes
          </div>
        )}
        {!isSaving && !isDirty && (
          <div className="flex items-center gap-1.5 text-xs text-white/40">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            All changes saved
          </div>
        )}
        <span className="text-white/20 text-xs mx-1">·</span>
        <span className="text-white/30 text-xs">{blocks.length} blocks</span>
      </div>

      {/* Right side — Actions */}
      <div className="flex items-center gap-2">
        <button
          className="px-3 py-1.5 rounded-lg text-xs font-medium text-white/60 bg-white/5 hover:bg-white/10 transition-colors"
          onClick={() => {
            // Preview in new tab
            window.open('/', '_blank');
          }}
        >
          Preview
        </button>
        <button
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            isPublished
              ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30'
              : 'bg-violet-500 text-white hover:bg-violet-600 shadow-lg shadow-violet-500/25'
          }`}
        >
          {isPublished ? '✓ Published' : 'Publish'}
        </button>
      </div>
    </header>
  );
}
