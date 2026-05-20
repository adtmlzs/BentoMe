'use client';

import { useEffect, useRef } from 'react';
import type { CanvasMode } from '@/types';

interface CanvasBackgroundProps {
  mode: CanvasMode;
}

export function CanvasBackground({ mode }: CanvasBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (mode === 'none' || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Mouse state
    const mouse = { x: width / 2, y: height / 2, vx: 0, vy: 0 };
    let lastMouse = { x: mouse.x, y: mouse.y };

    // --- MATRIX MODE STATE ---
    const fontSize = 14;
    let columns = Math.floor(width / fontSize);
    let drops: number[] = [];
    const initMatrix = () => {
      columns = Math.floor(width / fontSize);
      drops = [];
      for (let x = 0; x < columns; x++) drops[x] = 1;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      if (mode === 'matrix') initMatrix();
    };
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      lastMouse.x = mouse.x;
      lastMouse.y = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.vx = mouse.x - lastMouse.x;
      mouse.vy = mouse.y - lastMouse.y;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // --- CYBERPUNK MODE (Neon Trail) ---
    interface TrailPoint { x: number; y: number; age: number; maxAge: number }
    const trail: TrailPoint[] = [];

    // --- LIQUID GLASS MODE (Ripples) ---
    interface Ripple { x: number; y: number; radius: number; maxRadius: number; strength: number }
    const ripples: Ripple[] = [];

    const render = () => {
      if (!ctx) return;

      if (mode === 'cyberpunk') {
        // Fade existing canvas slightly for trail effect
        ctx.fillStyle = 'rgba(15, 15, 15, 0.1)';
        ctx.fillRect(0, 0, width, height);

        // Add new point if mouse moved
        if (Math.abs(mouse.vx) > 0.1 || Math.abs(mouse.vy) > 0.1) {
          trail.push({ x: mouse.x, y: mouse.y, age: 0, maxAge: 40 });
        }
        mouse.vx *= 0.8;
        mouse.vy *= 0.8;

        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#0ff'; // Cyan neon

        if (trail.length > 1) {
          ctx.beginPath();
          for (let i = 0; i < trail.length; i++) {
            const p = trail[i];
            p.age++;
            const life = 1 - p.age / p.maxAge;
            
            if (i === 0) {
              ctx.moveTo(p.x, p.y);
            } else {
              ctx.lineTo(p.x, p.y);
            }
          }
          // Remove old points
          while (trail.length > 0 && trail[0].age >= trail[0].maxAge) {
            trail.shift();
          }

          // Draw neon stroke
          const grad = ctx.createLinearGradient(0, 0, width, height);
          grad.addColorStop(0, '#0ff');
          grad.addColorStop(1, '#f0f');
          
          ctx.strokeStyle = grad;
          ctx.lineWidth = 4;
          ctx.stroke();
        }
      } 
      else if (mode === 'matrix') {
        // Semi-transparent black to create fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#0F0'; // Green text
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
          const text = String.fromCharCode(0x30A0 + Math.random() * 96);
          const dropX = i * fontSize;
          const dropY = drops[i] * fontSize;

          // Mouse repel physics
          const dx = dropX - mouse.x;
          const dy = dropY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          let renderX = dropX;
          let renderY = dropY;

          // Repel radius
          if (dist < 100) {
            const force = (100 - dist) / 100;
            renderX += (dx / dist) * force * 50;
            // Matrix letters scatter away
            ctx.fillStyle = '#FFF'; // Glow white when repelled
          } else {
            ctx.fillStyle = '#0F0';
          }

          ctx.fillText(text, renderX, renderY);

          // Reset drop randomly to top
          if (dropY > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }
      else if (mode === 'liquidGlass') {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Add ripple on significant mouse movement
        const speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
        if (speed > 5 && Math.random() > 0.5) {
          ripples.push({
            x: mouse.x,
            y: mouse.y,
            radius: 10,
            maxRadius: 100 + speed * 2,
            strength: 1
          });
        }
        
        // Decay mouse velocity
        mouse.vx *= 0.5;
        mouse.vy *= 0.5;

        // Draw ripples
        for (let i = ripples.length - 1; i >= 0; i--) {
          const r = ripples[i];
          r.radius += 2;
          r.strength -= 0.02;

          if (r.strength <= 0 || r.radius >= r.maxRadius) {
            ripples.splice(i, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          
          // Glass-like refraction effect using gradients and composition
          const gradient = ctx.createRadialGradient(r.x, r.y, r.radius * 0.8, r.x, r.y, r.radius);
          gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
          gradient.addColorStop(0.5, `rgba(255, 255, 255, ${r.strength * 0.1})`);
          gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
          
          ctx.strokeStyle = `rgba(255, 255, 255, ${r.strength * 0.3})`;
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode]);

  if (mode === 'none') return null;

  if (mode === 'grain') {
    return (
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'difference'
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
}
