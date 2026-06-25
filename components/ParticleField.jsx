'use client';
import { useEffect, useRef } from 'react';

/**
 * IconConstellationSpotlight (Dock sample)
 * Same cursor-following spotlight mechanic as the Sidebar sample, but
 * the nodes are legal-themed line-icons (gavel, scales, briefcase,
 * document, courthouse) in bordered tile chips, scattered sparsely and
 * connected into small clusters — matching the reference's "Marks &
 * Insignia" treatment. Distinct from Sidebar's plain dot constellations.
 */

const ICONS = ['fa-gavel', 'fa-scale-balanced', 'fa-briefcase', 'fa-file-lines', 'fa-landmark', 'fa-handshake'];

const CLUSTERS = [
  { cx: 10, cy: 10, nodes: [[0,0],[5,3]] },
  { cx: 85, cy: 14, nodes: [[0,0],[-5,4]] },
  { cx: 30, cy: 30, nodes: [[0,0],[4,3],[-3,4]] },
  { cx: 65, cy: 25, nodes: [[0,0],[4,-3]] },
  { cx: 15, cy: 58, nodes: [[0,0],[5,2]] },
  { cx: 90, cy: 55, nodes: [[0,0],[-4,3]] },
  { cx: 48, cy: 70, nodes: [[0,0],[3,4],[-4,2]] },
  { cx: 25, cy: 88, nodes: [[0,0],[4,-2]] },
  { cx: 78, cy: 90, nodes: [[0,0],[-3,3]] },
];

function buildLinks() {
  const links = [];
  CLUSTERS.forEach((cluster, ci) => {
    for (let i = 1; i < cluster.nodes.length; i++) links.push({ ci, a: 0, b: i });
  });
  return links;
}
const LINKS = buildLinks();

export default function ParticleField() {
  const spotlightRef = useRef(null);
  const rafRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const eased = useRef({ x: -9999, y: -9999 });

  const flatNodes = useRef(
    CLUSTERS.flatMap((cluster, ci) =>
      cluster.nodes.map((n, ni) => ({
        ci, ni,
        x: cluster.cx + n[0], y: cluster.cy + n[1],
        icon: ICONS[(ci + ni) % ICONS.length],
      }))
    )
  );

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY + window.scrollY }; };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);

    const tick = () => {
      eased.current.x += (mouse.current.x - eased.current.x) * 0.12;
      eased.current.y += (mouse.current.y - eased.current.y) * 0.12;
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate(${eased.current.x - 260}px, ${eased.current.y - 260}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    if (!reduced) rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div className="icon-bg" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="icon-svg">
        {LINKS.map(({ ci, a, b }, i) => {
          const cluster = CLUSTERS[ci];
          const na = cluster.nodes[a], nb = cluster.nodes[b];
          return (
            <line key={i}
              x1={cluster.cx + na[0]} y1={cluster.cy + na[1]}
              x2={cluster.cx + nb[0]} y2={cluster.cy + nb[1]}
            />
          );
        })}
      </svg>
      <div className="icon-nodes">
        {flatNodes.current.map((n, i) => (
          <span key={i} className="icon-node" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
            <i className={`fas ${n.icon}`} />
          </span>
        ))}
      </div>
      <div ref={spotlightRef} className="cursor-spotlight" />
      <style>{`
        .icon-bg {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          min-height: 100vh; z-index: 0; overflow: hidden; pointer-events: none;
        }
        .icon-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
        .icon-svg line { stroke: var(--glass-border); stroke-width: 1; }
        .icon-nodes { position: absolute; inset: 0; }
        .icon-node {
          position: absolute; transform: translate(-50%, -50%);
          width: 30px; height: 30px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--glass-border);
          border-radius: 6px;
          background: var(--glass-bg);
          color: var(--text-color);
          opacity: 0.3;
          font-size: 0.7rem;
        }
        .cursor-spotlight {
          position: absolute; top: 0; left: 0;
          width: 520px; height: 520px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--glass-bg) 0%, transparent 70%);
          will-change: transform;
          mix-blend-mode: overlay;
        }
        body.light-mode .cursor-spotlight {
          background: radial-gradient(circle, rgba(0,0,0,0.10) 0%, transparent 70%);
          mix-blend-mode: multiply;
        }
        @media (prefers-reduced-motion: reduce) { .cursor-spotlight { display: none; } }
        @media (pointer: coarse) { .cursor-spotlight { display: none; } }
      `}</style>
    </div>
  );
}
