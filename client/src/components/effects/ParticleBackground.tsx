'use client';

import { useMemo } from 'react';
import Particles, { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine, ISourceOptions } from '@tsparticles/engine';
import type { ParticleEffect } from '@/types';

interface ParticleBackgroundProps {
  effect: ParticleEffect;
}

// ─── Particle Configs ──────────────────────────────────────────────

const snowConfig: ISourceOptions = {
  fullScreen: false,
  fpsLimit: 60,
  particles: {
    number: { value: 60, density: { enable: true } },
    color: { value: '#ffffff' },
    opacity: { value: { min: 0.1, max: 0.5 } },
    size: { value: { min: 1, max: 4 } },
    move: {
      enable: true,
      speed: { min: 0.5, max: 2 },
      direction: 'bottom',
      straight: false,
      outModes: { default: 'out' },
    },
    shape: { type: 'circle' },
    wobble: { enable: true, distance: 10, speed: 5 },
  },
  detectRetina: true,
};

const matrixConfig: ISourceOptions = {
  fullScreen: false,
  fpsLimit: 30,
  particles: {
    number: { value: 80, density: { enable: true } },
    color: { value: '#00FF41' },
    opacity: { value: { min: 0.1, max: 0.7 } },
    size: { value: { min: 1, max: 3 } },
    move: {
      enable: true,
      speed: { min: 2, max: 6 },
      direction: 'bottom',
      straight: true,
      outModes: { default: 'out' },
    },
    shape: { type: 'char', options: { char: { value: ['0', '1', 'ア', 'カ', 'サ', 'タ', 'ナ', '∞', '⌀'], font: 'monospace', style: '', weight: '400' } } },
    life: { duration: { value: 5 }, count: 0 },
  },
  detectRetina: true,
};

const sakuraConfig: ISourceOptions = {
  fullScreen: false,
  fpsLimit: 60,
  particles: {
    number: { value: 30, density: { enable: true } },
    color: { value: ['#FFB7C5', '#FF69B4', '#FFC0CB'] },
    opacity: { value: { min: 0.2, max: 0.6 } },
    size: { value: { min: 3, max: 8 } },
    move: {
      enable: true,
      speed: { min: 0.5, max: 1.5 },
      direction: 'bottom-right',
      straight: false,
      outModes: { default: 'out' },
    },
    shape: { type: 'circle' },
    rotate: { value: { min: 0, max: 360 }, animation: { enable: true, speed: 5 } },
    wobble: { enable: true, distance: 20, speed: 8 },
  },
  detectRetina: true,
};

const EFFECT_CONFIGS: Record<Exclude<ParticleEffect, 'none'>, ISourceOptions> = {
  snow: snowConfig,
  matrix: matrixConfig,
  sakura: sakuraConfig,
};

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadSlim(engine);
};

export function ParticleBackground({ effect }: ParticleBackgroundProps) {
  const options = useMemo(() => {
    if (effect === 'none') return null;
    return EFFECT_CONFIGS[effect];
  }, [effect]);

  if (!options || effect === 'none') return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    >
      <ParticlesProvider init={particlesInit}>
        <Particles
          id={`particles-${effect}`}
          options={options}
          className="absolute inset-0 w-full h-full"
        />
      </ParticlesProvider>
    </div>
  );
}
