'use client';
import { useEffect, useRef } from 'react';

/**
 * CursorSpotlight
 * A fixed, viewport-level light that follows the cursor and visibly
 * brightens whatever is underneath it — text, cards, background alike —
 * using mix-blend-mode so it reads as actual light hitting the page,
 * not a decorative circle floating on top. This is the missing piece
 * from the earlier attempt: previously the "spotlight" only brightened
 * the background layer (z-index 0), so it never affected text or cards
 * sitting above it. This version sits ABOVE all content at a high
 * z-index so the blend genuinely lights up everything beneath it.
 */
export default function CursorSpotlight({ size = 500, color = '255,255,255', intensity = 0.16 }) {
  const ref = useRef(null);
  const raf = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const eased = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('pointermove', onMove, { passive: true });

    const tick = () => {
      eased.current.x += (mouse.current.x - eased.current.x) * 0.15;
      eased.current.y += (mouse.current.y - eased.current.y) * 0.15;
      if (ref.current) {
        ref.current.style.transform = `translate(${eased.current.x - size / 2}px, ${eased.current.y - size / 2}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('pointermove', onMove);
    };
  }, [size]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: `${size}px`, height: `${size}px`,
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(${color},${intensity}) 0%, rgba(${color},${intensity * 0.4}) 35%, transparent 70%)`,
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'screen',
        willChange: 'transform',
      }}
    />
  );
}
