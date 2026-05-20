'use client';

import type { Block } from '@/types';
import { useBuilderStore } from '@/stores/builderStore';
import { BLOCK_TYPE_LABELS } from '@/lib/constants';

interface BlockSettingsProps {
  block: Block;
}

export function BlockSettings({ block }: BlockSettingsProps) {
  const selectBlock = useBuilderStore((s) => s.selectBlock);
  const updateBlockContent = useBuilderStore((s) => s.updateBlockContent);
  const updateBlockStyle = useBuilderStore((s) => s.updateBlockStyle);

  const renderContentFields = () => {
    switch (block.type) {
      case 'link': {
        const content = block.content as Block<'link'>['content'];
        return (
          <>
            <Field label="Label">
              <input
                type="text"
                value={content.label}
                onChange={(e) => updateBlockContent(block.id, { label: e.target.value })}
                className="input-field"
              />
            </Field>
            <Field label="URL">
              <input
                type="url"
                value={content.url}
                onChange={(e) => updateBlockContent(block.id, { url: e.target.value })}
                className="input-field"
              />
            </Field>
            <Field label="Icon (emoji)">
              <input
                type="text"
                value={content.icon ?? ''}
                onChange={(e) => updateBlockContent(block.id, { icon: e.target.value })}
                className="input-field"
              />
            </Field>
          </>
        );
      }
      case 'text': {
        const content = block.content as Block<'text'>['content'];
        return (
          <>
            <Field label="Text">
              <textarea
                value={content.text}
                onChange={(e) => updateBlockContent(block.id, { text: e.target.value })}
                className="input-field min-h-[80px] resize-y"
                rows={3}
              />
            </Field>
            <Field label="Font Size">
              <select
                value={content.fontSize ?? 'md'}
                onChange={(e) => updateBlockContent(block.id, { fontSize: e.target.value as 'sm' | 'md' | 'lg' | 'xl' })}
                className="input-field"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
              </select>
            </Field>
            <Field label="Alignment">
              <div className="flex gap-1">
                {(['left', 'center', 'right'] as const).map((align) => (
                  <button
                    key={align}
                    onClick={() => updateBlockContent(block.id, { textAlign: align })}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      content.textAlign === align
                        ? 'bg-violet-500 text-white'
                        : 'bg-white/5 text-white/50 hover:bg-white/10'
                    }`}
                  >
                    {align.charAt(0).toUpperCase() + align.slice(1)}
                  </button>
                ))}
              </div>
            </Field>
          </>
        );
      }
      case 'image': {
        const content = block.content as Block<'image'>['content'];
        return (
          <>
            <Field label="Image URL">
              <input
                type="url"
                value={content.src}
                onChange={(e) => updateBlockContent(block.id, { src: e.target.value })}
                className="input-field"
              />
            </Field>
            <Field label="Alt Text">
              <input
                type="text"
                value={content.alt}
                onChange={(e) => updateBlockContent(block.id, { alt: e.target.value })}
                className="input-field"
              />
            </Field>
            <Field label="Object Fit">
              <select
                value={content.objectFit ?? 'cover'}
                onChange={(e) => updateBlockContent(block.id, { objectFit: e.target.value as 'cover' | 'contain' | 'fill' })}
                className="input-field"
              >
                <option value="cover">Cover</option>
                <option value="contain">Contain</option>
                <option value="fill">Fill</option>
              </select>
            </Field>
          </>
        );
      }
      case 'social': {
        const content = block.content as Block<'social'>['content'];
        return (
          <>
            <Field label="Platform">
              <input
                type="text"
                value={content.platform}
                onChange={(e) => updateBlockContent(block.id, { platform: e.target.value })}
                className="input-field"
              />
            </Field>
            <Field label="Handle">
              <input
                type="text"
                value={content.handle}
                onChange={(e) => updateBlockContent(block.id, { handle: e.target.value })}
                className="input-field"
              />
            </Field>
            <Field label="URL">
              <input
                type="url"
                value={content.url}
                onChange={(e) => updateBlockContent(block.id, { url: e.target.value })}
                className="input-field"
              />
            </Field>
          </>
        );
      }
      case 'header': {
        const content = block.content as Block<'header'>['content'];
        return (
          <>
            <Field label="Title">
              <input
                type="text"
                value={content.title}
                onChange={(e) => updateBlockContent(block.id, { title: e.target.value })}
                className="input-field"
              />
            </Field>
            <Field label="Subtitle">
              <input
                type="text"
                value={content.subtitle ?? ''}
                onChange={(e) => updateBlockContent(block.id, { subtitle: e.target.value })}
                className="input-field"
              />
            </Field>
            <Field label="Avatar URL">
              <input
                type="url"
                value={content.avatarUrl ?? ''}
                onChange={(e) => updateBlockContent(block.id, { avatarUrl: e.target.value })}
                className="input-field"
              />
            </Field>
          </>
        );
      }
      case 'embed': {
        const content = block.content as Block<'embed'>['content'];
        return (
          <>
            <Field label="Platform">
              <select
                value={content.platform}
                onChange={(e) => updateBlockContent(block.id, { platform: e.target.value as 'spotify' | 'youtube' | 'soundcloud' | 'tiktok' | 'twitter' })}
                className="input-field"
              >
                <option value="spotify">Spotify</option>
                <option value="youtube">YouTube</option>
                <option value="soundcloud">SoundCloud</option>
                <option value="tiktok">TikTok</option>
                <option value="twitter">Twitter</option>
              </select>
            </Field>
            <Field label="Embed URL">
              <input
                type="url"
                value={content.embedUrl}
                onChange={(e) => updateBlockContent(block.id, { embedUrl: e.target.value })}
                className="input-field"
              />
            </Field>
          </>
        );
      }
      case 'vibeTracker': {
        const content = block.content as Block<'vibeTracker'>['content'];
        const items = content.items ?? [];
        return (
          <>
            {items.map((item, i) => (
              <div key={i} className="space-y-2 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">
                    Item {i + 1}
                  </span>
                  <button
                    onClick={() => {
                      const next = items.filter((_, idx) => idx !== i);
                      updateBlockContent(block.id, { items: next });
                    }}
                    className="text-[10px] text-red-400/60 hover:text-red-400 transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <Field label="Icon (emoji)">
                  <input
                    type="text"
                    value={item.icon}
                    onChange={(e) => {
                      const next = [...items];
                      next[i] = { ...item, icon: e.target.value };
                      updateBlockContent(block.id, { items: next });
                    }}
                    className="input-field"
                  />
                </Field>
                <Field label="Label">
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => {
                      const next = [...items];
                      next[i] = { ...item, label: e.target.value };
                      updateBlockContent(block.id, { items: next });
                    }}
                    className="input-field"
                  />
                </Field>
                <Field label="Value">
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) => {
                      const next = [...items];
                      next[i] = { ...item, value: e.target.value };
                      updateBlockContent(block.id, { items: next });
                    }}
                    className="input-field"
                  />
                </Field>
              </div>
            ))}
            <button
              onClick={() => {
                const next = [...items, { icon: '🎵', label: 'Listening', value: '' }];
                updateBlockContent(block.id, { items: next });
              }}
              className="w-full py-2 rounded-xl border border-dashed border-white/10 text-xs text-white/40 hover:text-white/60 hover:border-white/20 transition-all"
            >
              + Add Item
            </button>
          </>
        );
      }
      case 'progressBar': {
        const content = block.content as Block<'progressBar'>['content'];
        return (
          <>
            <Field label="Title">
              <input
                type="text"
                value={content.title}
                onChange={(e) => updateBlockContent(block.id, { title: e.target.value })}
                className="input-field"
              />
            </Field>
            <Field label="Current Value">
              <input
                type="number"
                min={0}
                value={content.currentValue}
                onChange={(e) => updateBlockContent(block.id, { currentValue: Number(e.target.value) })}
                className="input-field"
              />
            </Field>
            <Field label="Target Value">
              <input
                type="number"
                min={1}
                value={content.targetValue}
                onChange={(e) => updateBlockContent(block.id, { targetValue: Number(e.target.value) })}
                className="input-field"
              />
            </Field>
          </>
        );
      }
      case 'lanyard': {
        const content = block.content as Block<'lanyard'>['content'];
        return (
          <>
            <Field label="Discord User ID">
              <input
                type="text"
                value={content.discordUserId}
                onChange={(e) => updateBlockContent(block.id, { discordUserId: e.target.value })}
                className="input-field"
                placeholder="e.g. 123456789012345678"
              />
            </Field>
            <div className="space-y-2 mt-4">
              <label className="flex items-center gap-2 text-xs text-white/70">
                <input
                  type="checkbox"
                  checked={content.showStatus}
                  onChange={(e) => updateBlockContent(block.id, { showStatus: e.target.checked })}
                  className="rounded bg-white/5 border-white/10 text-violet-500 focus:ring-violet-500"
                />
                Show Online Status
              </label>
              <label className="flex items-center gap-2 text-xs text-white/70">
                <input
                  type="checkbox"
                  checked={content.showSpotify}
                  onChange={(e) => updateBlockContent(block.id, { showSpotify: e.target.checked })}
                  className="rounded bg-white/5 border-white/10 text-violet-500 focus:ring-violet-500"
                />
                Show Spotify
              </label>
              <label className="flex items-center gap-2 text-xs text-white/70">
                <input
                  type="checkbox"
                  checked={content.showActivity}
                  onChange={(e) => updateBlockContent(block.id, { showActivity: e.target.checked })}
                  className="rounded bg-white/5 border-white/10 text-violet-500 focus:ring-violet-500"
                />
                Show Game Activity
              </label>
            </div>
          </>
        );
      }
      case 'animatedText': {
        const content = block.content as Block<'animatedText'>['content'];
        return (
          <>
            <Field label="Text">
              <textarea
                value={content.text}
                onChange={(e) => updateBlockContent(block.id, { text: e.target.value })}
                className="input-field min-h-[80px] resize-y"
                rows={3}
              />
            </Field>
            <Field label="Animation Mode">
              <select
                value={content.textAnimation}
                onChange={(e) => updateBlockContent(block.id, { textAnimation: e.target.value as 'glitch' | 'hackerDecode' | 'typewriter' | 'wave' })}
                className="input-field"
              >
                <option value="glitch">Glitch</option>
                <option value="hackerDecode">Hacker Decode</option>
                <option value="typewriter">Typewriter</option>
                <option value="wave">Wave</option>
              </select>
            </Field>
            <Field label="Font Size">
              <select
                value={content.fontSize ?? 'md'}
                onChange={(e) => updateBlockContent(block.id, { fontSize: e.target.value as 'sm' | 'md' | 'lg' | 'xl' })}
                className="input-field"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
              </select>
            </Field>
            <Field label="Alignment">
              <div className="flex gap-1">
                {(['left', 'center', 'right'] as const).map((align) => (
                  <button
                    key={align}
                    onClick={() => updateBlockContent(block.id, { textAlign: align })}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      content.textAlign === align
                        ? 'bg-violet-500 text-white'
                        : 'bg-white/5 text-white/50 hover:bg-white/10'
                    }`}
                  >
                    {align.charAt(0).toUpperCase() + align.slice(1)}
                  </button>
                ))}
              </div>
            </Field>
            {content.textAnimation === 'glitch' && (
              <div className="grid grid-cols-2 gap-2">
                <Field label="Glitch Color 1">
                  <input
                    type="color"
                    value={content.glitchColor1 ?? '#ff0000'}
                    onChange={(e) => updateBlockContent(block.id, { glitchColor1: e.target.value })}
                    className="w-full h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                  />
                </Field>
                <Field label="Glitch Color 2">
                  <input
                    type="color"
                    value={content.glitchColor2 ?? '#00ffff'}
                    onChange={(e) => updateBlockContent(block.id, { glitchColor2: e.target.value })}
                    className="w-full h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                  />
                </Field>
              </div>
            )}
          </>
        );
      }
      case 'timeline': {
        const content = block.content as Block<'timeline'>['content'];
        const items = content.items ?? [];
        return (
          <>
            {items.map((item, i) => (
              <div key={item.id} className="space-y-2 p-3 rounded-xl bg-white/[0.03] border border-white/5 mb-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-white/30 uppercase tracking-wider">
                    Item {i + 1}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if (i > 0) {
                          const next = [...items];
                          [next[i - 1], next[i]] = [next[i], next[i - 1]];
                          updateBlockContent(block.id, { items: next });
                        }
                      }}
                      className="text-[10px] text-white/40 hover:text-white transition-colors disabled:opacity-30"
                      disabled={i === 0}
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => {
                        if (i < items.length - 1) {
                          const next = [...items];
                          [next[i], next[i + 1]] = [next[i + 1], next[i]];
                          updateBlockContent(block.id, { items: next });
                        }
                      }}
                      className="text-[10px] text-white/40 hover:text-white transition-colors disabled:opacity-30"
                      disabled={i === items.length - 1}
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => {
                        const next = items.filter((_, idx) => idx !== i);
                        updateBlockContent(block.id, { items: next });
                      }}
                      className="text-[10px] text-red-400/60 hover:text-red-400 transition-colors ml-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <Field label="Year">
                  <input
                    type="text"
                    value={item.year}
                    onChange={(e) => {
                      const next = [...items];
                      next[i] = { ...item, year: e.target.value };
                      updateBlockContent(block.id, { items: next });
                    }}
                    className="input-field"
                    placeholder="e.g. 2024 - Present"
                  />
                </Field>
                <Field label="Title">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const next = [...items];
                      next[i] = { ...item, title: e.target.value };
                      updateBlockContent(block.id, { items: next });
                    }}
                    className="input-field"
                    placeholder="e.g. Senior Engineer"
                  />
                </Field>
                <Field label="Subtitle / Company">
                  <input
                    type="text"
                    value={item.subtitle}
                    onChange={(e) => {
                      const next = [...items];
                      next[i] = { ...item, subtitle: e.target.value };
                      updateBlockContent(block.id, { items: next });
                    }}
                    className="input-field"
                    placeholder="e.g. Acme Corp"
                  />
                </Field>
                <Field label="Type">
                  <select
                    value={item.type}
                    onChange={(e) => {
                      const next = [...items];
                      next[i] = { ...item, type: e.target.value as 'experience' | 'education' | 'certification' };
                      updateBlockContent(block.id, { items: next });
                    }}
                    className="input-field"
                  >
                    <option value="experience">Experience</option>
                    <option value="education">Education</option>
                    <option value="certification">Certification</option>
                  </select>
                </Field>
              </div>
            ))}
            <button
              onClick={() => {
                const next = [...items, { id: crypto.randomUUID(), year: new Date().getFullYear().toString(), title: 'New Role', subtitle: 'Company', type: 'experience' as const }];
                updateBlockContent(block.id, { items: next });
              }}
              className="w-full py-2 rounded-xl border border-dashed border-white/10 text-xs text-white/40 hover:text-white/60 hover:border-white/20 transition-all mt-2"
            >
              + Add Timeline Item
            </button>
          </>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
            {BLOCK_TYPE_LABELS[block.type]}
          </h2>
          <p className="text-xs text-white/30">Edit block properties</p>
        </div>
        <button
          onClick={() => selectBlock(null)}
          className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content fields */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 md:pb-4">
        <SectionTitle>Content</SectionTitle>
        {renderContentFields()}

        <SectionTitle>Style</SectionTitle>
        <Field label="Background">
          <input
            type="color"
            value={block.style.backgroundColor ?? '#1a1a1a'}
            onChange={(e) => updateBlockStyle(block.id, { backgroundColor: e.target.value })}
            className="w-full h-8 rounded-lg cursor-pointer border-0 bg-transparent"
          />
        </Field>
        <Field label="Border Radius">
          <input
            type="range"
            min={0}
            max={32}
            value={block.style.borderRadius ?? 16}
            onChange={(e) => updateBlockStyle(block.id, { borderRadius: Number(e.target.value) })}
            className="w-full accent-violet-500"
          />
        </Field>
        <Field label="Shadow">
          <select
            value={block.style.shadow ?? 'md'}
            onChange={(e) => updateBlockStyle(block.id, { shadow: e.target.value as 'none' | 'sm' | 'md' | 'lg' | 'xl' })}
            className="input-field"
          >
            <option value="none">None</option>
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
            <option value="xl">Extra Large</option>
          </select>
        </Field>
        <Field label="Animation">
          <select
            value={block.style.animation ?? 'none'}
            onChange={(e) => updateBlockStyle(block.id, { animation: e.target.value as 'none' | 'fadeIn' | 'slideUp' | 'bounce' | 'pulse' })}
            className="input-field"
          >
            <option value="none">None</option>
            <option value="fadeIn">Fade In</option>
            <option value="slideUp">Slide Up</option>
            <option value="bounce">Bounce</option>
            <option value="pulse">Pulse</option>
          </select>
        </Field>
      </div>
    </div>
  );
}

// ─── Helper Components ─────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-white/40 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider pt-2 border-t border-white/5">
      {children}
    </h3>
  );
}
