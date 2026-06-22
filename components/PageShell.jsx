import Dock from './Dock';
import Footer from './Footer';
import ParticleField from './ParticleField';

export default function PageShell({ children }) {
  return (
    <>
      <ParticleField />
      <Dock />
      <main>
        <div className="container" style={{ paddingTop: '48px', paddingBottom: '120px' }}>
          {children}
        </div>
        <Footer />
      </main>
    </>
  );
}
