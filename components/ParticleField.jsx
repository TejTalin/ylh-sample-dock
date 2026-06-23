'use client';
import { useEffect, useRef } from 'react';

/**
 * MeshGradient (bold, room-filling, cursor-reactive)
 * A large animated color-mesh gradient that warps and shifts following
 * the cursor across the FULL page height. Distinct from Sample 1's soft
 * monochrome orbs: this uses actual color and stronger, snappier motion
 * for a "dashboard/SaaS" energy rather than editorial calm.
 */
export default function ParticleField() {
  const blobRefs = useRef([]);
  const rafRef = useRef(null);
  const mouse = useRef({ x: 0.5, y: 0.3 });
  const pos = useRef([
    { x: 0.15, y: 0.1, vx: 0, vy: 0 },
    { x: 0.85, y: 0.25, vx: 0, vy: 0 },
    { x: 0.5, y: 0.55, vx: 0, vy: 0 },
    { x: 0.2, y: 0.85, vx: 0, vy: 0 },
  ]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onMove = (e) => {
      const docH = document.documentElement.scrollHeight || window.innerHeight;
      mouse.current = { x: e.clientX / window.innerWidth, y: (e.clientY + window.scrollY) / docH };
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    if (reduced) return () => window.removeEventListener('pointermove', onMove);

    const STRENGTH = [0.028, 0.022, 0.034, 0.018]; // snappier than sample 1 — dashboard energy
    const DAMPING = 0.86;

    const tick = (t) => {
      pos.current.forEach((p, i) => {
        const idleX = Math.sin(t * 0.00026 + i * 1.7) * 0.05;
        const idleY = Math.cos(t * 0.00021 + i * 2.3) * 0.05;
        const targetX = mouse.current.x + idleX;
        const targetY = mouse.current.y + idleY;

        const ax = (targetX - p.x) * STRENGTH[i];
        const ay = (targetY - p.y) * STRENGTH[i];
        p.vx = (p.vx + ax) * DAMPING;
        p.vy = (p.vy + ay) * DAMPING;
        p.x += p.vx;
        p.y += p.vy;

        const el = blobRefs.current[i];
        if (el) {
          el.style.left = `${p.x * 100}%`;
          el.style.top = `${p.y * 100}%`;
        }
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <div className="mesh-bg" aria-hidden="true">
      <div ref={el => blobRefs.current[0] = el} className="mesh-blob mesh-blob-a" />
      <div ref={el => blobRefs.current[1] = el} className="mesh-blob mesh-blob-b" />
      <div ref={el => blobRefs.current[2] = el} className="mesh-blob mesh-blob-c" />
      <div ref={el => blobRefs.current[3] = el} className="mesh-blob mesh-blob-d" />
      <style>{`
        .mesh-bg {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          min-height: 100vh; z-index: 0; overflow: hidden; pointer-events: none;
        }
        .mesh-blob {
          position: absolute;
          width: 680px; height: 680px;
          border-radius: 50%;
          filter: blur(90px);
          transform: translate(-50%, -50%);
          will-change: left, top;
          mix-blend-mode: screen;
        }
        .mesh-blob-a { background: radial-gradient(circle, #5b8cff 0%, transparent 70%); opacity: 0.30; }
        .mesh-blob-b { background: radial-gradient(circle, #8a6bff 0%, transparent 70%); opacity: 0.26; }
        .mesh-blob-c { background: radial-gradient(circle, #ff8a5b 0%, transparent 70%); opacity: 0.20; }
        .mesh-blob-d { background: radial-gradient(circle, #5bffd9 0%, transparent 70%); opacity: 0.18; }

        body.light-mode .mesh-blob { mix-blend-mode: multiply; }
        body.light-mode .mesh-blob-a { opacity: 0.16; }
        body.light-mode .mesh-blob-b { opacity: 0.14; }
        body.light-mode .mesh-blob-c { opacity: 0.12; }
        body.light-mode .mesh-blob-d { opacity: 0.10; }
      `}</style>
    </div>
  );
}
