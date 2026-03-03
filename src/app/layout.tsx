
import type { Metadata, Viewport } from 'next';
import "./globals.css";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import { Toaster } from "@/components/ui/toaster";
import { PWARegistration } from "@/components/PWARegistration";

export const metadata: Metadata = {
  title: "InsightFlow | Neuro-Divergent Intelligence",
  description: "Advanced multi-market diagnostic dashboard optimized for neuro-divergent focus.",
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'InsightFlow',
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://public.codepenassets.com/css/normalize-5.0.0.min.css"
        />
      </head>
      <body>
        <FirebaseClientProvider>
          <PWARegistration />
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
