"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  clearRuntimeDoctorEntries,
  makeRuntimeDoctorEntry,
  readRuntimeDoctorEntries,
  safeStringify,
  writeRuntimeDoctorEntry,
  type RuntimeDoctorEntry,
} from "@/lib/runtime-doctor-store";
import { usePathname } from "next/navigation";

type Props = {
  bootTimeoutMs?: number;
};

function getErrorMessage(input: unknown): string {
  if (input instanceof Error) return input.message;
  if (typeof input === "string") return input;
  return safeStringify(input);
}

function getErrorStack(input: unknown): string | undefined {
  if (input instanceof Error) return input.stack;
  return undefined;
}

export default function RuntimeDoctor({ bootTimeoutMs = 15000 }: Props) {
  const pathname = usePathname();
  const [entries, setEntries] = useState<RuntimeDoctorEntry[]>([]);
  const [open, setOpen] = useState(false);
  const [bootStuck, setBootStuck] = useState(false);
  const [bootFinished, setBootFinished] = useState(false);
  const [online, setOnline] = useState<boolean>(true);
  const bootTimerRef = useRef<number | null>(null);
  const patchedRef = useRef(false);

  const errorCount = useMemo(
    () => entries.filter((e) => e.level === "error").length,
    [entries]
  );

  const refreshEntries = () => {
    setEntries(readRuntimeDoctorEntries());
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  useEffect(() => {
    const markBootFinished = () => {
      setBootFinished(true);
      setBootStuck(false);
      if (bootTimerRef.current) {
        window.clearTimeout(bootTimerRef.current);
        bootTimerRef.current = null;
      }
    };

    bootTimerRef.current = window.setTimeout(() => {
      if (!bootFinished) {
        setBootStuck(true);
        writeRuntimeDoctorEntry(
          makeRuntimeDoctorEntry(
            "error",
            "boot-timeout",
            `App appears stuck during startup after ${bootTimeoutMs}ms on route: ${pathname}`
          )
        );
        refreshEntries();
      }
    }, bootTimeoutMs);

    const onLoad = () => markBootFinished();
    const onOnline = () => setOnline(true);
    const onOffline = () => {
      setOnline(false);
      writeRuntimeDoctorEntry(
        makeRuntimeDoctorEntry(
          "warn",
          "network",
          "Browser went offline during app session."
        )
      );
      refreshEntries();
    };

    if (document.readyState === "complete") {
      markBootFinished();
    } else {
      window.addEventListener("load", onLoad);
    }

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    return () => {
      window.removeEventListener("load", onLoad);
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
      if (bootTimerRef.current) {
        window.clearTimeout(bootTimerRef.current);
        bootTimerRef.current = null;
      }
    };
  }, [bootFinished, bootTimeoutMs, pathname]);

  useEffect(() => {
    if (patchedRef.current) return;
    patchedRef.current = true;

    const originalError = console.error;
    const originalWarn = console.warn;

    console.error = (...args: unknown[]) => {
      originalError(...args);
      const text = args.map((a) => getErrorMessage(a)).join(" | ");
      writeRuntimeDoctorEntry(
        makeRuntimeDoctorEntry("error", "console.error", text)
      );
      refreshEntries();
    };

    console.warn = (...args: unknown[]) => {
      originalWarn(...args);
      const text = args.map((a) => getErrorMessage(a)).join(" | ");
      writeRuntimeDoctorEntry(
        makeRuntimeDoctorEntry("warn", "console.warn", text)
      );
      refreshEntries();
    };

    const onWindowError = (event: ErrorEvent) => {
      writeRuntimeDoctorEntry(
        makeRuntimeDoctorEntry(
          "error",
          "window.error",
          event.message || "Unknown window error",
          event.error?.stack
        )
      );
      refreshEntries();
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const message = getErrorMessage(reason);
      const stack = getErrorStack(reason);
      writeRuntimeDoctorEntry(
        makeRuntimeDoctorEntry(
          "error",
          "unhandledrejection",
          message,
          stack,
          reason
        )
      );
      refreshEntries();
    };

    window.addEventListener("error", onWindowError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
      window.removeEventListener("error", onWindowError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, []);

  useEffect(() => {
    writeRuntimeDoctorEntry(
      makeRuntimeDoctorEntry("info", "route-change", `Visited route: ${pathname}`)
    );
    refreshEntries();
  }, [pathname]);

  const copyReport = async () => {
    const report = {
      route: pathname,
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
      online,
      bootStuck,
      bootFinished,
      createdAt: new Date().toISOString(),
      entries,
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(report, null, 2));
      alert("Runtime report copied.");
    } catch {
      alert("Could not copy runtime report.");
    }
  };

  const clearLogs = () => {
    clearRuntimeDoctorEntries();
    refreshEntries();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          position: "fixed",
          right: 16,
          bottom: 16,
          zIndex: 999999,
          background: errorCount > 0 || bootStuck ? "#7f1d1d" : "#111827",
          color: "white",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: 12,
          padding: "10px 14px",
          fontSize: 12,
          fontWeight: 700,
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          cursor: "pointer",
        }}
      >
        Runtime Doctor {errorCount > 0 ? `• ${errorCount} error(s)` : "• OK"}
      </button>

      {bootStuck ? (
        <div
          style={{
            position: "fixed",
            left: 16,
            right: 16,
            bottom: 70,
            zIndex: 999998,
            background: "rgba(127, 29, 29, 0.95)",
            color: "white",
            padding: 16,
            borderRadius: 14,
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          }}
        >
          <div style={{ fontWeight: 800, marginBottom: 8 }}>
            Startup is stuck
          </div>
          <div style={{ fontSize: 14, opacity: 0.92 }}>
            The app did not finish booting in {bootTimeoutMs}ms on <b>{pathname}</b>.
            Open Runtime Doctor and copy the report.
          </div>
        </div>
      ) : null}

      {open ? (
        <div
          style={{
            position: "fixed",
            top: 16,
            right: 16,
            width: "min(560px, calc(100vw - 32px))",
            maxHeight: "calc(100vh - 32px)",
            overflow: "auto",
            zIndex: 999999,
            background: "#030712",
            color: "white",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.14)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            padding: 16,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800 }}>Runtime Doctor</div>
              <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4 }}>
                Route: {pathname} • Network: {online ? "online" : "offline"} • Boot:{" "}
                {bootFinished ? "finished" : bootStuck ? "stuck" : "starting"}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                background: "#111827",
                color: "white",
                border: "1px solid rgba(255,255,255,0.16)",
                borderRadius: 10,
                padding: "8px 10px",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Close
            </button>
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={copyReport}
              style={{
                background: "#1d4ed8",
                color: "white",
                border: "none",
                borderRadius: 10,
                padding: "10px 12px",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Copy Report
            </button>

            <button
              type="button"
              onClick={clearLogs}
              style={{
                background: "#374151",
                color: "white",
                border: "none",
                borderRadius: 10,
                padding: "10px 12px",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Clear Logs
            </button>

            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                background: "#7c2d12",
                color: "white",
                border: "none",
                borderRadius: 10,
                padding: "10px 12px",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Reload App
            </button>
          </div>

          <div style={{ marginTop: 16 }}>
            {entries.length === 0 ? (
              <div
                style={{
                  background: "#111827",
                  borderRadius: 12,
                  padding: 12,
                  fontSize: 14,
                  opacity: 0.85,
                }}
              >
                No runtime events captured yet.
              </div>
            ) : (
              entries.map((entry) => (
                <div
                  key={entry.id}
                  style={{
                    background:
                      entry.level === "error"
                        ? "rgba(127,29,29,0.32)"
                        : entry.level === "warn"
                        ? "rgba(120,53,15,0.32)"
                        : "rgba(17,24,39,0.9)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 12,
                    padding: 12,
                    marginBottom: 10,
                  }}
                >
                  <div style={{ fontSize: 12, opacity: 0.75 }}>
                    [{entry.level.toUpperCase()}] {entry.source} • {entry.ts}
                  </div>
                  <div style={{ marginTop: 6, fontWeight: 700 }}>{entry.message}</div>
                  {entry.stack ? (
                    <pre
                      style={{
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        marginTop: 8,
                        fontSize: 12,
                        opacity: 0.85,
                      }}
                    >
                      {entry.stack}
                    </pre>
                  ) : null}
                </div>
              ))
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
