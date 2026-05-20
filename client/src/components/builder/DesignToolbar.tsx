'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBuilderStore } from '@/stores/builderStore';
import type { ThemePreset, CursorStyle, ParticleEffect, GlassmorphismLevel, CanvasMode } from '@/types';
import { THEME_PRESETS, PRESET_META } from '@/lib/themePresets';

const CURSOR_OPTIONS: { value: CursorStyle; label: string; emoji: string }[] = [
  { value: 'default', label: 'Default', emoji: '🖱️' },
  { value: 'crosshair', label: 'Crosshair', emoji: '➕' },
  { value: 'neon', label: 'Neon', emoji: '💡' },
  { value: 'katana', label: 'Katana', emoji: '⚔️' },
  { value: 'dot', label: 'Dot', emoji: '⚪' },
];

const PARTICLE_OPTIONS: { value: ParticleEffect; label: string; emoji: string }[] = [
  { value: 'none', label: 'None', emoji: '✖️' },
  { value: 'snow', label: 'Snow', emoji: '❄️' },
  { value: 'matrix', label: 'Matrix Rain', emoji: '🟢' },
  { value: 'sakura', label: 'Cherry Blossoms', emoji: '🌸' },
];

const CANVAS_OPTIONS: { value: CanvasMode; label: string; emoji: string }[] = [
  { value: 'none', label: 'None', emoji: '✖️' },
  { value: 'cyberpunk', label: 'Neon Trail', emoji: '💫' },
  { value: 'matrix', label: 'Matrix Rain', emoji: '🖥️' },
  { value: 'liquidGlass', label: 'Liquid Glass', emoji: '💧' },
];

type TabId = 'presets' | 'media' | 'effects';

export function DesignToolbar() {
  const theme = useBuilderStore((s) => s.theme);
  const updateTheme = useBuilderStore((s) => s.updateTheme);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('presets');

  const handlePresetClick = (presetKey: Exclude<ThemePreset, 'custom'>) => {
    const preset = THEME_PRESETS[presetKey];
    updateTheme(preset);
  };

  const tabs: { id: TabId; label: string; emoji: string }[] = [
    { id: 'presets', label: 'Presets', emoji: '🎨' },
    { id: 'media', label: 'Media', emoji: '🎬' },
    { id: 'effects', label: 'Effects', emoji: '✨' },
  ];

  return (
    <>
      {/* Toggle Button — floating bottom-right */}
      <motion.button
        onClick={() => setIsOpen((p) => !p)}
        className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center gap-1.5 text-xs shadow-2xl hover:bg-white/20 transition-colors cursor-pointer text-white font-semibold"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <>
            <span className="text-sm">✕</span>
            <span>Close</span>
          </>
        ) : (
          <>
            <span className="text-sm">🎨</span>
            <span>Design</span>
          </>
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 z-50 md:w-80 max-h-[70vh] rounded-2xl bg-zinc-900/90 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-4 pt-4 pb-2 flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold text-white/90">Design Engine</h3>
                <p className="text-[10px] text-white/30 mt-0.5">
                  Customize your cyber aesthetic
                </p>
              </div>
              <button
                onClick={() => {
                  const columns = window.innerWidth <= 768 ? 2 : useBuilderStore.getState().grid.columns;
                  useBuilderStore.getState().autoOrganizeBlocks(columns);
                }}
                className="px-3 py-1.5 rounded-lg bg-violet-500/20 hover:bg-violet-500/40 border border-violet-500/30 text-[10px] font-bold text-violet-300 transition-all cursor-pointer flex items-center gap-1"
                title="Auto-organize grid optimally"
              >
                ✨ Auto-Organize
              </button>
            </div>

            {/* Tab Bar */}
            <div className="flex gap-1 px-4 pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                      : 'bg-white/5 text-white/40 border border-transparent hover:bg-white/10'
                  }`}
                >
                  {tab.emoji} {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
              {activeTab === 'presets' && (
                <>
                  <SectionLabel>Theme Presets</SectionLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {(
                      Object.keys(THEME_PRESETS) as Exclude<ThemePreset, 'custom'>[]
                    ).map((key) => {
                      const meta = PRESET_META[key];
                      const isActive = theme.themePreset === key;
                      return (
                        <button
                          key={key}
                          onClick={() => handlePresetClick(key)}
                          className={`p-3 rounded-xl text-left transition-all cursor-pointer ${
                            isActive
                              ? 'bg-violet-500/20 border border-violet-500/40 ring-1 ring-violet-500/20'
                              : 'bg-white/[0.03] border border-white/5 hover:border-white/15'
                          }`}
                        >
                          <span className="text-lg">{meta.emoji}</span>
                          <p className="text-xs font-semibold text-white/80 mt-1">
                            {meta.label}
                          </p>
                          <p className="text-[9px] text-white/30 leading-snug mt-0.5">
                            {meta.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Reset to custom */}
                  <button
                    onClick={() => updateTheme({ themePreset: 'custom' })}
                    className="w-full py-1.5 rounded-lg text-[10px] text-white/30 hover:text-white/50 border border-dashed border-white/10 hover:border-white/20 transition-all cursor-pointer"
                  >
                    Reset to Custom
                  </button>
                </>
              )}

              {activeTab === 'media' && (
                <>

                  <SectionLabel>Discord User ID</SectionLabel>
                  <input
                    type="text"
                    placeholder="e.g. 123456789012345678"
                    value={theme.discordUserId ?? ''}
                    onChange={(e) =>
                      updateTheme({ discordUserId: e.target.value || undefined })
                    }
                    className="input-field text-xs"
                  />
                  <p className="text-[9px] text-white/20">
                    For the Discord Lanyard block. You must join the{' '}
                    <a
                      href="https://discord.gg/lanyard"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-400/60 underline"
                    >
                      Lanyard server
                    </a>
                    .
                  </p>
                </>
              )}

              {activeTab === 'effects' && (
                <>
                  <SectionLabel>Cursor Style</SectionLabel>
                  <div className="grid grid-cols-5 gap-1">
                    {CURSOR_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => updateTheme({ cursorStyle: opt.value })}
                        className={`flex flex-col items-center py-2 rounded-lg transition-all cursor-pointer ${
                          theme.cursorStyle === opt.value
                            ? 'bg-violet-500/20 border border-violet-500/40'
                            : 'bg-white/[0.03] border border-white/5 hover:border-white/15'
                        }`}
                      >
                        <span className="text-sm">{opt.emoji}</span>
                        <span className="text-[8px] text-white/30 mt-0.5">
                          {opt.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  <SectionLabel>Particle Effect</SectionLabel>
                  <div className="grid grid-cols-4 gap-1">
                    {PARTICLE_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => updateTheme({ particleEffect: opt.value })}
                        className={`flex flex-col items-center py-2 rounded-lg transition-all cursor-pointer ${
                          theme.particleEffect === opt.value
                            ? 'bg-violet-500/20 border border-violet-500/40'
                            : 'bg-white/[0.03] border border-white/5 hover:border-white/15'
                        }`}
                      >
                        <span className="text-sm">{opt.emoji}</span>
                        <span className="text-[8px] text-white/30 mt-0.5">
                          {opt.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  <SectionLabel>Mouse Physics (WebGL)</SectionLabel>
                  <div className="grid grid-cols-4 gap-1">
                    {CANVAS_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => updateTheme({ canvasMode: opt.value })}
                        className={`flex flex-col items-center py-2 rounded-lg transition-all cursor-pointer ${
                          theme.canvasMode === opt.value
                            ? 'bg-violet-500/20 border border-violet-500/40'
                            : 'bg-white/[0.03] border border-white/5 hover:border-white/15'
                        }`}
                      >
                        <span className="text-sm">{opt.emoji}</span>
                        <span className="text-[8px] text-white/30 mt-0.5 text-center px-1 leading-tight">
                          {opt.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  <SectionLabel>Glassmorphism</SectionLabel>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={0}
                      max={3}
                      step={1}
                      value={theme.glassmorphismLevel ?? 0}
                      onChange={(e) =>
                        updateTheme({
                          glassmorphismLevel: Number(e.target.value) as GlassmorphismLevel,
                        })
                      }
                      className="flex-1 accent-violet-500"
                    />
                    <span className="text-[10px] text-white/40 tabular-nums w-4 text-right">
                      {theme.glassmorphismLevel ?? 0}
                    </span>
                  </div>
                  <p className="text-[9px] text-white/20">
                    0 = off, 1 = subtle, 2 = medium, 3 = heavy frosted glass
                  </p>

                  <SectionLabel>Colors</SectionLabel>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] text-white/30 mb-1 block">
                        Primary
                      </label>
                      <input
                        type="color"
                        value={theme.primaryColor}
                        onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                        className="w-full h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-white/30 mb-1 block">
                        Accent
                      </label>
                      <input
                        type="color"
                        value={theme.accentColor}
                        onChange={(e) => updateTheme({ accentColor: e.target.value })}
                        className="w-full h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[9px] text-white/30 mb-1 block">
                        Background
                      </label>
                      <input
                        type="color"
                        value={theme.backgroundColor}
                        onChange={(e) =>
                          updateTheme({ backgroundColor: e.target.value })
                        }
                        className="w-full h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider pt-1">
      {children}
    </p>
  );
}
