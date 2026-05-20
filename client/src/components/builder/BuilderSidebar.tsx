'use client';

import type { BlockType, BlockContentMap } from '@/types';
import { BLOCK_TYPES } from '@/types';
import { useBuilderStore } from '@/stores/builderStore';
import { BLOCK_TYPE_LABELS, BLOCK_TYPE_DESCRIPTIONS } from '@/lib/constants';
import { BlockSettings } from './BlockSettings';

// ─── Default content for each block type ───────────────────────────

const DEFAULT_CONTENT: { [K in BlockType]: BlockContentMap[K] } = {
  link: { url: 'https://example.com', label: 'My Link', icon: '🔗' },
  text: { text: 'Hello! Welcome to my profile ✨', fontSize: 'md', fontWeight: 'normal', textAlign: 'center' },
  image: { src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop', alt: 'Profile image', objectFit: 'cover' },
  embed: { platform: 'spotify', embedUrl: 'https://open.spotify.com/embed/track/4cOdK2wGLETKBW3PvgPWqT' },
  social: { platform: 'Instagram', handle: 'username', url: 'https://instagram.com/username' },
  header: { title: 'Your Name', subtitle: 'Creative · Designer · Builder' },
  spacer: { height: 1 },
  vibeTracker: {
    items: [
      { icon: '🎧', label: 'Listening', value: 'Blonde — Frank Ocean' },
      { icon: '📖', label: 'Reading', value: 'Atomic Habits' },
      { icon: '🎬', label: 'Watching', value: 'Severance S2' },
    ],
  },
  progressBar: { title: 'Book Goal 2026', currentValue: 14, targetValue: 52 },
  lanyard: { discordUserId: '', showSpotify: true, showActivity: true, showStatus: true },
  animatedText: { text: 'CYBER_AESTHETIC', textAnimation: 'glitch', fontSize: 'xl', fontWeight: 'bold', textAlign: 'center', glitchColor1: '#ff0000', glitchColor2: '#00ffff' },
  digitalPet: { petName: 'Glitch', petType: 'ghost' },
  timeline: {
    items: [
      { id: '1', year: '2024 - Present', title: 'Senior Engineer', subtitle: 'Acme Corp', type: 'experience' },
      { id: '2', year: '2020 - 2024', title: 'B.S. Computer Science', subtitle: 'State University', type: 'education' }
    ]
  },
};

export function BuilderSidebar() {
  const addBlock = useBuilderStore((s) => s.addBlock);
  const selectedBlockId = useBuilderStore((s) => s.selectedBlockId);
  const blocks = useBuilderStore((s) => s.blocks);

  const selectedBlock = selectedBlockId ? blocks.find((b) => b.id === selectedBlockId) : null;

  const handleAddBlock = <T extends BlockType>(type: T) => {
    addBlock(type, DEFAULT_CONTENT[type]);
  };

  return (
    <aside className="w-80 bg-zinc-950 border-l border-white/5 flex flex-col h-full overflow-hidden">
      {selectedBlock ? (
        <BlockSettings block={selectedBlock} />
      ) : (
        <>
          {/* Block Palette */}
          <div className="p-4 border-b border-white/5">
            <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-1">
              Add Blocks
            </h2>
            <p className="text-xs text-white/30">Click to add a block to your bento</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {BLOCK_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => handleAddBlock(type)}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 transition-all group text-left"
              >
                <span className="text-xl">{BLOCK_TYPE_LABELS[type]?.split(' ')[0]}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                    {BLOCK_TYPE_LABELS[type]?.split(' ').slice(1).join(' ')}
                  </p>
                  <p className="text-xs text-white/30 truncate">
                    {BLOCK_TYPE_DESCRIPTIONS[type]}
                  </p>
                </div>
                <svg
                  className="w-4 h-4 text-white/20 group-hover:text-violet-400 transition-colors flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}
