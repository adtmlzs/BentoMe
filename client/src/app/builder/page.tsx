'use client';

import { BuilderCanvas } from '@/components/builder/BuilderCanvas';
import { BuilderSidebar } from '@/components/builder/BuilderSidebar';
import { BuilderToolbar } from '@/components/builder/BuilderToolbar';
import { DesignToolbar } from '@/components/builder/DesignToolbar';
import { useBuilderSync } from '@/hooks/useBuilderSync';

export default function BuilderPage() {
  const { loading, error } = useBuilderSync();

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-white/30 text-sm">Loading workspace...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center p-6 bg-white/[0.02] border border-white/5 rounded-2xl max-w-md">
          <span className="text-4xl mb-4 block">⚠️</span>
          <h1 className="text-xl font-bold text-white mb-2">Workspace Error</h1>
          <p className="text-white/40 text-sm mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-zinc-950 overflow-hidden animate-fadeIn">
      <BuilderToolbar />
      <div className="flex flex-1 overflow-hidden relative">
        <BuilderCanvas />
        <BuilderSidebar />
        <DesignToolbar />
      </div>
    </div>
  );
}
