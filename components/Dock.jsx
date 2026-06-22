'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { NAV_LINKS } from '../lib/content';
import { useTheme } from '../lib/useTheme';

function DockIcon({ href, label, active, mouseX }) {
  const ref = useRef(null);
  const distance = useTransform(mouseX, (val) => {
    if (!ref.current) return 0;
    const rect = ref.current.getBoundingClientRect();
    return val - (rect.left + rect.width / 2);
  });
  const widthSync = useTransform(distance, [-120, 0, 120], [44, 64, 44]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 14 });

  return (
    <Link href={href} className="dock-item-link">
      <motion.div ref={ref} style={{ width }} className={`dock-item ${active ? 'active' : ''}`}>
        <span className="dock-label">{label}</span>
        {active && <span className="dock-dot" />}
      </motion.div>
    </Link>
  );
}

export default function Dock() {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();
  const mouseX = useMotionValue(Infinity);

  return (
    <>
      <header className="topbar">
        <div className="container topbar-inner">
          <span className="serif logo-text">Young Legal House</span>
          <button className="theme-toggle-top" onClick={toggleTheme} aria-label="Toggle theme">
            <i className={`fas ${isDark ? 'fa-moon' : 'fa-sun'}`} />
          </button>
        </div>
      </header>

      <motion.nav
        className="dock"
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {NAV_LINKS.map(({ href, label }) => (
          <DockIcon key={href} href={href} label={label} active={pathname === href} mouseX={mouseX} />
        ))}
      </motion.nav>

      <style>{`
        .topbar { position: sticky; top: 0; z-index: 20; border-bottom: 1px solid var(--glass-border); background: var(--bg-color); }
        .topbar-inner { display: flex; align-items: center; justify-content: space-between; padding: 18px 24px; }
        .logo-text { font-size: 1.2rem; font-weight: 700; }
        .theme-toggle-top { background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 50%; width: 38px; height: 38px; color: var(--text-color); cursor: pointer; font-size: 0.9rem; }

        .dock {
          position: fixed; bottom: 22px; left: 50%; transform: translateX(-50%);
          display: flex; align-items: center; gap: 8px;
          padding: 10px 14px; border-radius: 22px;
          background: var(--glass-bg); border: 1px solid var(--glass-border);
          backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
          z-index: 30; box-shadow: var(--shadow);
          max-width: 92vw; overflow-x: auto;
        }
        .dock-item-link { text-decoration: none; }
        .dock-item {
          height: 44px; min-width: 44px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          color: var(--text-color);
          font-size: 0.78rem; font-weight: 700;
          position: relative;
          background: transparent;
          padding: 0 10px;
          white-space: nowrap;
        }
        .dock-item.active { background: var(--panel-bg); }
        .dock-label { overflow: hidden; }
        .dock-dot { position: absolute; bottom: 4px; left: 50%; transform: translateX(-50%); width: 4px; height: 4px; border-radius: 50%; background: var(--text-color); }

        @media (max-width: 700px) {
          .dock { gap: 4px; padding: 8px 10px; }
          .dock-item { font-size: 0.68rem; padding: 0 7px; }
        }
      `}</style>
    </>
  );
}
