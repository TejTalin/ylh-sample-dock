import './globals.css';
import CursorSpotlight from '../components/CursorSpotlight';

export const metadata = {
  title: 'Young Legal House | Where Young Legal Minds Meet',
  description: 'A community bridging the gap between legal theory and execution.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>
        <CursorSpotlight size={560} color="180,200,255" intensity={0.20} />
        {children}
      </body>
    </html>
  );
}
