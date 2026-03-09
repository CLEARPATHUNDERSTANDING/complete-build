export type RuntimeDoctorLevel = "info" | "warn" | "error";

export type RuntimeDoctorEntry = {
  id: string;
  ts: string;
  level: RuntimeDoctorLevel;
  source: string;
  message: string;
  stack?: string;
  extra?: unknown;
};

const STORAGE_KEY = "runtime-doctor-log";
const MAX_ENTRIES = 150;

function isBrowser() {
  return typeof window !== "undefined";
}

export function readRuntimeDoctorEntries(): RuntimeDoctorEntry[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    // Return empty array on failure instead of crashing
    return [];
  }
}

export function writeRuntimeDoctorEntry(entry: RuntimeDoctorEntry) {
  if (!isBrowser()) return;

  try {
    const current = readRuntimeDoctorEntries();
    current.unshift(entry);
    const trimmed = current.slice(0, MAX_ENTRIES);
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch (e) {
    // Silent catch to prevent recursion or crashes in restricted environments
  }
}

export function clearRuntimeDoctorEntries() {
  if (!isBrowser()) return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    // Silent catch
  }
}

export function makeRuntimeDoctorEntry(
  level: RuntimeDoctorLevel,
  source: string,
  message: string,
  stack?: string,
  extra?: unknown
): RuntimeDoctorEntry {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    ts: new Date().toISOString(),
    level,
    source,
    message,
    stack,
    extra,
  };
}

export function safeStringify(value: unknown): string {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}
