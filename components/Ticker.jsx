'use client';

export default function Ticker({ text }) {
  return (
    <div className="ticker-shell glass-card">
      <div className="ticker-track">
        <span>{text}</span>
        <span aria-hidden="true">{text}</span>
      </div>
      <style>{`
        .ticker-shell { border-radius: 999px; overflow: hidden; height: 46px; display: flex; align-items: center; padding: 0; }
        .ticker-track { display: flex; white-space: nowrap; animation: ticker-scroll-2 40s linear infinite; font-weight: 600; font-size: 0.83rem; letter-spacing: 0.03em; }
        .ticker-track span { padding-right: 60px; }
        @keyframes ticker-scroll-2 { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .ticker-track { animation: none; } }
      `}</style>
    </div>
  );
}
