import { CONTACT_INFO } from '../lib/content';

export default function Footer() {
  return (
    <footer className="ylh-footer">
      <div className="container footer-inner">
        <span className="serif" style={{ fontWeight: 700 }}>Young Legal House</span>
        <span className="footer-copy">© 2026 Young Legal House · {CONTACT_INFO.email}</span>
      </div>
      <style>{`
        .ylh-footer { border-top: 1px solid var(--glass-border); padding: 24px 0 100px; margin-top: 40px; }
        .footer-inner { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }
        .footer-copy { color: var(--grey-text); font-size: 0.82rem; }
      `}</style>
    </footer>
  );
}
