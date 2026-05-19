'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const DEMO_BLOCKS = [
  { emoji: '🎵', label: 'Spotify', color: '#1DB954', w: 2, h: 1 },
  { emoji: '📸', label: 'Instagram', color: '#E4405F', w: 1, h: 1 },
  { emoji: '🐙', label: 'GitHub', color: '#333', w: 1, h: 1 },
  { emoji: '✨', label: 'About Me', color: '#8B5CF6', w: 2, h: 2 },
  { emoji: '▶️', label: 'YouTube', color: '#FF0000', w: 1, h: 1 },
  { emoji: '🎨', label: 'Portfolio', color: '#EC4899', w: 1, h: 1 },
  { emoji: '🐦', label: 'Twitter', color: '#1DA1F2', w: 1, h: 1 },
  { emoji: '💼', label: 'LinkedIn', color: '#0A66C2', w: 1, h: 1 },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 overflow-hidden">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍱</span>
          <span className="text-lg font-bold text-white">
            Bento<span className="text-violet-400">Box</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/builder"
            className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/builder"
            className="px-5 py-2 rounded-xl bg-violet-500 text-white text-sm font-semibold hover:bg-violet-600 transition-colors shadow-lg shadow-violet-500/25"
          >
            Get Started — it&apos;s free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-32 text-center relative">
        {/* Glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-pink-500/10 rounded-full blur-[96px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-white/50">Now in public beta</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            <span className="text-white">Your vibe.</span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Your bento.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-10 leading-relaxed">
            Build a stunning, interactive profile that captures who you are.
            Drag and drop blocks, customize everything, and share your unique
            bento with the world.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link
              href="/builder"
              className="px-8 py-3.5 rounded-xl bg-violet-500 text-white font-semibold hover:bg-violet-600 transition-all shadow-xl shadow-violet-500/30 hover:shadow-violet-500/40 hover:scale-105 active:scale-95"
            >
              Start Building →
            </Link>
            <a
              href="#preview"
              className="px-6 py-3.5 rounded-xl text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            >
              See Examples
            </a>
          </div>
        </motion.div>

        {/* Animated Bento Grid Preview */}
        <motion.div
          id="preview"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 mt-20 max-w-lg mx-auto"
        >
          <div className="grid grid-cols-4 gap-3 p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
            {DEMO_BLOCKS.map((block, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="rounded-xl p-4 flex flex-col items-center justify-center gap-1 cursor-pointer transition-shadow hover:shadow-lg"
                style={{
                  gridColumn: `span ${block.w}`,
                  gridRow: `span ${block.h}`,
                  backgroundColor: `${block.color}20`,
                  border: `1px solid ${block.color}30`,
                }}
              >
                <span className="text-2xl">{block.emoji}</span>
                <span className="text-xs text-white/50 font-medium">{block.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: '⚡',
              title: 'Drag & Drop',
              desc: 'Build your layout intuitively with our smooth grid editor. No code needed.',
            },
            {
              icon: '🎨',
              title: 'Fully Customizable',
              desc: 'Every block is yours to style. Colors, gradients, fonts, animations — you name it.',
            },
            {
              icon: '🚀',
              title: 'Lightning Fast',
              desc: 'Your profile loads in milliseconds. Lightweight JSON, rendered on the edge.',
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group"
            >
              <span className="text-3xl mb-4 block">{feature.icon}</span>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-violet-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center">
        <p className="text-sm text-white/20">
          🍱 BentoBox — Built for creators, by creators.
        </p>
      </footer>
    </div>
  );
}
