'use client';

import type { Block } from '@bentobox/shared';
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
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
