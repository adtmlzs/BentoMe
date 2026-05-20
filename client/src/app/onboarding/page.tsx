'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { DEFAULT_THEME_CONFIG, BLOCK_TYPES } from '@/types';

// Let's create some stunning theme templates for onboarding
const THEME_TEMPLATES = [
  {
    id: 'minimal-dark',
    name: 'Minimal Dark',
    desc: 'Clean, focused, ultra-minimal',
    theme: {
      mode: 'dark' as const,
      primaryColor: '#8B5CF6',
      accentColor: '#EC4899',
      backgroundColor: '#0F0F0F',
      fontFamily: 'Inter',
    },
    previewClass: 'bg-zinc-950 border-zinc-800 text-white',
  },
  {
    id: 'nebula-glow',
    name: 'Nebula Glow',
    desc: 'Vibrant indigo and purple gradient accents',
    theme: {
      mode: 'dark' as const,
      primaryColor: '#6366F1',
      accentColor: '#A855F7',
      backgroundColor: '#0A0518',
      fontFamily: 'Outfit',
    },
    previewClass: 'bg-[#0A0518] border-indigo-950 text-white',
  },
  {
    id: 'sakura-peach',
    name: 'Sakura Peach',
    desc: 'Soft warm aesthetic gradients',
    theme: {
      mode: 'light' as const,
      primaryColor: '#F43F5E',
      accentColor: '#F59E0B',
      backgroundColor: '#FFF5F5',
      fontFamily: 'Plus Jakarta Sans',
    },
    previewClass: 'bg-[#FFF5F5] border-rose-100 text-zinc-800',
  },
  {
    id: 'nordic-forest',
    name: 'Nordic Forest',
    desc: 'Calming greens and natural tones',
    theme: {
      mode: 'dark' as const,
      primaryColor: '#10B981',
      accentColor: '#3B82F6',
      backgroundColor: '#051610',
      fontFamily: 'Inter',
    },
    previewClass: 'bg-[#051610] border-emerald-950 text-white',
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [selectedThemeId, setSelectedThemeId] = useState('minimal-dark');
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'invalid'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Validate and check username availability with a debounce
  useEffect(() => {
    if (username.length < 3) {
      setUsernameStatus('idle');
      return;
    }

    // Regexp matches alphanumeric + underscores
    const validFormat = /^[a-zA-Z0-9_]+$/.test(username);
    if (!validFormat || username.length > 30) {
      setUsernameStatus('invalid');
      return;
    }

    setUsernameStatus('checking');
    const timer = setTimeout(async () => {
      try {
        const supabase = createClient();
        const { data, error: queryError } = await (supabase
          .from('profiles') as any)
          .select('id')
          .eq('username', username.toLowerCase())
          .maybeSingle();

        if (queryError) {
          console.error(queryError);
          setUsernameStatus('idle');
          return;
        }

        if (data) {
          setUsernameStatus('taken');
        } else {
          setUsernameStatus('available');
        }
      } catch (err) {
        setUsernameStatus('idle');
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameStatus !== 'available') {
      setError('Please choose an available username');
      return;
    }
    if (!displayName.trim()) {
      setError('Please enter a display name');
      return;
    }

    setError(null);
    startTransition(async () => {
      try {
        const supabase = createClient();
        
        // Get user session to confirm user is authenticated
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/login');
          return;
        }

        // Check if user already has a profile
        const { data: existingProfile } = await (supabase
          .from('profiles') as any)
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle();

        if (existingProfile) {
          router.push('/builder');
          return;
        }

        const template = THEME_TEMPLATES.find(t => t.id === selectedThemeId) || THEME_TEMPLATES[0];
        
        // Insert starter bento blocks
        const initialBlocks = [
          {
            id: 'block-header',
            type: 'header',
            position: { x: 0, y: 0, w: 4, h: 1 },
            content: {
              title: displayName,
              subtitle: `@${username.toLowerCase()}`,
              align: 'center',
            },
            style: {
              borderRadius: 16,
              opacity: 1,
            },
            isVisible: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'block-welcome',
            type: 'text',
            position: { x: 0, y: 1, w: 2, h: 2 },
            content: {
              title: 'Welcome 🍱',
              text: 'This is your brand new BentoBox. Click Edit to customize this space and drag tiles around!',
            },
            style: {
              borderRadius: 16,
              opacity: 1,
            },
            isVisible: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 'block-first-link',
            type: 'link',
            position: { x: 2, y: 1, w: 2, h: 1 },
            content: {
              title: 'Check out my socials',
              url: 'https://github.com',
            },
            style: {
              borderRadius: 16,
              opacity: 1,
            },
            isVisible: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ];

        // Insert new profile
        const { error: insertError } = await (supabase.from('profiles') as any).insert({
          user_id: user.id,
          username: username.toLowerCase().trim(),
          display_name: displayName.trim(),
          theme_config: template.theme as any,
          blocks: initialBlocks as any,
          is_published: false,
        });

        if (insertError) {
          setError(insertError.message);
          return;
        }

        router.push('/builder');
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      }
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 relative">
      {/* Dynamic background accents */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white/[0.02] border border-white/5 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <span className="text-4xl mb-2 block">🎨</span>
          <h1 className="text-2xl font-bold text-white mb-2">Claim your BentoBox space</h1>
          <p className="text-sm text-white/40">Customize your public handle and styling template</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Display Name */}
            <div>
              <label className="block text-xs font-medium text-white/45 mb-2">Display Name</label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Alex Rivera"
                className="input-field"
                disabled={isPending}
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-xs font-medium text-white/45 mb-2">Choose Username</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-sm">bentobox.me/</span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="alex"
                  className="input-field pl-[100px] pr-10"
                  disabled={isPending}
                />
                
                {/* Username Status Indicators */}
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center">
                  {usernameStatus === 'checking' && (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  )}
                  {usernameStatus === 'available' && (
                    <span className="text-emerald-400 text-xs font-medium">✓</span>
                  )}
                  {usernameStatus === 'taken' && (
                    <span className="text-red-400 text-xs font-medium">taken</span>
                  )}
                  {usernameStatus === 'invalid' && (
                    <span className="text-red-400 text-xs font-medium">invalid</span>
                  )}
                </div>
              </div>
              <p className="text-[10px] text-white/30 mt-1.5">
                3-30 characters. Letters, numbers, and underscores only.
              </p>
            </div>
          </div>

          {/* Theme Selector */}
          <div>
            <label className="block text-xs font-medium text-white/45 mb-3">Choose a Starting Theme</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {THEME_TEMPLATES.map((tmpl) => {
                const isSelected = selectedThemeId === tmpl.id;
                return (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => setSelectedThemeId(tmpl.id)}
                    className={`flex flex-col text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-violet-500 bg-violet-500/5 ring-1 ring-violet-500'
                        : 'border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className={`w-full h-10 rounded-lg mb-3 border flex items-center justify-center ${tmpl.previewClass}`}>
                      <span className="text-[10px] font-bold">🍱 bento</span>
                    </div>
                    <span className="text-xs font-semibold text-white">{tmpl.name}</span>
                    <span className="text-[10px] text-white/40 mt-1 leading-tight">{tmpl.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isPending || usernameStatus !== 'available' || !displayName}
              className="w-full py-3 px-4 rounded-xl bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white font-semibold text-sm transition-all duration-250 shadow-lg shadow-violet-500/20 hover:scale-[1.01] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
            >
              {isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating profile...
                </>
              ) : (
                'Create Profile & Open Dashboard'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
