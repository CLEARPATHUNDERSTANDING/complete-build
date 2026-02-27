import "./globals.css";

export const metadata = {
  title: "Responsive Social Platform UI",
  description: "Converted to Next.js (App Router) for Firebase Studio",
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
      <body>{children}</body>
    </html>
  );
}