'use client';
import { useEffect, useRef } from 'react';

const COUNT = 36;

/**
 * ParticleField (cursor-reactive)
 * A field of soft dots that drift slowly and get gently pushed away
 * from the cursor as it passes near them, like dust disturbed by
 * movement. Distinct from Sample 1's node-network (no connecting lines,
 * softer/rounder, push-away instead of pull-toward).
 */
export default function ParticleField() {
  const containerRef = useRef(null);
  const dotsRef = useRef([]);
  const rafRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const particles = useRef(
    Array.from({ length: COUNT }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.012,
      vy: (Math.random() - 0.5) * 0.012,
      size: 2 + Math.random() * 3,
      ox: 0, oy: 0,
    }))
  );

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);

    const RADIUS = 140;
    const PUSH = 26;

    const tick = () => {
      const w = window.innerWidth, h = window.innerHeight;

      particles.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = 100; if (p.x > 100) p.x = 0;
        if (p.y < 0) p.y = 100; if (p.y > 100) p.y = 0;

        const px = (p.x / 100) * w;
        const py = (p.y / 100) * h;
        const dx = px - mouse.current.x;
        const dy = py - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetOx = 0, targetOy = 0;
        if (dist < RADIUS && dist > 0.001) {
          const force = (1 - dist / RADIUS) * PUSH;
          targetOx = (dx / dist) * force;
          targetOy = (dy / dist) * force;
        }
        p.ox += (targetOx - p.ox) * 0.12;
        p.oy += (targetOy - p.oy) * 0.12;

        const el = dotsRef.current[i];
        if (el) {
          el.style.left = `${p.x}%`;
          el.style.top = `${p.y}%`;
          el.style.transform = `translate(calc(-50% + ${p.ox}px), calc(-50% + ${p.oy}px))`;
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="particle-bg" aria-hidden="true">
      {particles.current.map((p, i) => (
        <span
          key={i}
          ref={el => dotsRef.current[i] = el}
          className="particle-dot"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px` }}
        />
      ))}
      <style>{`
        .particle-bg { position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
        .particle-dot {
          position: absolute; border-radius: 50%;
          background: var(--text-color);
          opacity: 0.22;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
