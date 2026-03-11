import type { Metadata, Viewport } from 'next';
import "./globals.css";
import "../styles/gradientBurst.css";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import { Toaster } from "@/components/ui/toaster";
import { PWARegistration } from "@/components/PWARegistration";
import RuntimeDoctor from "@/components/RuntimeDoctor";

export const metadata: Metadata = {
  title: "Clear Path | Market Intelligence",
  description: "High-clarity neuro-divergent intelligence platform for universal asset analysis.",
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Intelligence Hub',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body className="bg-black text-white antialiased selection:bg-indigo-500 selection:text-white">
        <FirebaseClientProvider>
          <RuntimeDoctor />
          <PWARegistration />
          {children}
          <Toaster />
          <div className="w-full py-8 px-4 text-center text-sm font-medium tracking-wide"
               style={{ background: 'linear-gradient(90deg, #FF1493 0%, #FF8C00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            ⚖ Legal Positioning — Provides financial data visualization with optional user-controlled presentation adjustments for accessibility and cognitive comfort. The system does not evaluate, alter, or advise on financial decisions.
          </div>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}