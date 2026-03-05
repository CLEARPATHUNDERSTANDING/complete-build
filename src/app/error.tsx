'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body style={{ background: "#000", color: "#fff", padding: 24, fontFamily: "ui-sans-serif, system-ui" }}>
        <h1 style={{ fontSize: 20, marginBottom: 12 }}>App crashed (client-side exception)</h1>

        <p style={{ opacity: 0.8, marginBottom: 12 }}>
          Copy the red error text below and paste it to me. This will tell us exactly what broke.
        </p>

        <div
          style={{
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 12,
            padding: 12,
            background: "rgba(255,255,255,0.04)",
            overflow: "auto",
            maxHeight: 360,
            whiteSpace: "pre-wrap",
          }}
        >
          {String(error?.stack || error?.message || error)}
        </div>

        <button
          onClick={() => reset()}
          style={{
            marginTop: 16,
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.06)",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
