'use client';

/**
 * IconConstellation (Dock sample)
 * Legal-themed icon-tile nodes connected into sparse clusters, full
 * page height. Cursor light now lives in the global CursorSpotlight.
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

const flatNodes = CLUSTERS.flatMap((cluster, ci) =>
  cluster.nodes.map((n, ni) => ({
    ci, ni,
    x: cluster.cx + n[0], y: cluster.cy + n[1],
    icon: ICONS[(ci + ni) % ICONS.length],
  }))
);

export default function ParticleField() {
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
        {flatNodes.map((n, i) => (
          <span key={i} className="icon-node" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
            <i className={`fas ${n.icon}`} />
          </span>
        ))}
      </div>
      <style>{`
        .icon-bg {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          min-height: 100vh; z-index: 0; overflow: hidden; pointer-events: none;
        }
        .icon-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
        .icon-svg line { stroke: var(--glass-border); stroke-width: 1.2; opacity: 0.9; }
        .icon-nodes { position: absolute; inset: 0; }
        .icon-node {
          position: absolute; transform: translate(-50%, -50%);
          width: 34px; height: 34px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--glass-border);
          border-radius: 6px;
          background: var(--glass-bg);
          color: var(--text-color);
          opacity: 0.45;
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
}
