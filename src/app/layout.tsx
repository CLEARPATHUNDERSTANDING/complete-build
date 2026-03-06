import type { Metadata, Viewport } from 'next';
import "./globals.css";
import "../styles/gradientBurst.css";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import { Toaster } from "@/components/ui/toaster";
import { PWARegistration } from "@/components/PWARegistration";
import DiagnosticMonitor from "@/components/DiagnosticMonitor";

export const metadata: Metadata = {
  title: "Adaptive Market Intelligence",
  description: "High-clarity neuro-divergent intelligence platform for universal asset analysis.",
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Intelligence Hub',
  },
  formatDetection: {
    telephone: false,
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
    <html lang="en">
      <body className="antialiased">
        <FirebaseClientProvider>
          <PWARegistration />
          <DiagnosticMonitor />
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
