import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'InsightFlow | Professional Market Intelligence',
  description: 'Clarity and reliability for data analysis with a calm UX.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}