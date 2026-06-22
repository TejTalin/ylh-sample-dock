import Dock from './Dock';
import Footer from './Footer';

export default function PageShell({ children }) {
  return (
    <>
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
