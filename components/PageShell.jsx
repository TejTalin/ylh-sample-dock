import Dock from './Dock';
import Footer from './Footer';
import ParticleField from './ParticleField';

export default function PageShell({ children }) {
  return (
    <div className="page-root">
      <ParticleField />
      <Dock />
      <main className="page-main">
        <div className="container" style={{ paddingTop: '48px', paddingBottom: '120px' }}>
          {children}
        </div>
        <Footer />
      </main>

      <style>{`
        .page-root { position: relative; min-height: 100vh; }
        .page-main { position: relative; z-index: 1; }
      `}</style>
    </div>
  );
}
