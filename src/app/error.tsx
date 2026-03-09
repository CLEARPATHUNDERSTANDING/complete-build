"use client";

import { useEffect } from "react";
import { makeRuntimeDoctorEntry, writeRuntimeDoctorEntry } from "@/lib/runtime-doctor-store";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    writeRuntimeDoctorEntry(
      makeRuntimeDoctorEntry(
        "error",
        "next-app-error-boundary",
        error.message || "Unknown route error",
        error.stack,
        { digest: error.digest }
      )
    );
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#030712",
        color: "white",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "min(640px, 100%)",
          background: "#111827",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 20,
          padding: 24,
        }}
      >
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>
          This page crashed
        </h1>
        <p style={{ opacity: 0.86, marginTop: 12 }}>
          The app hit a runtime error. Open Runtime Doctor to see the captured report.
        </p>
        <pre
          style={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            background: "#030712",
            padding: 12,
            borderRadius: 12,
            marginTop: 16,
          }}
        >
          {error.message}
        </pre>

        <button
          type="button"
          onClick={() => reset()}
          style={{
            marginTop: 16,
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: 12,
            padding: "12px 16px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
