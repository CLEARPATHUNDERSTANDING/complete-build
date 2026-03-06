"use client";

import React, { useEffect, useState } from "react";
import { diagnoseSystem, type SystemHealth } from "@/lib/diagnostics/doctor";
import { ShieldAlert, Activity, ShieldCheck, HeartPulse, FileWarning, SearchX } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Diagnostic Monitor UI
 * Visualizes the health of the IP Stack, Branding, and Guardrail Protocols.
 */
export default function DiagnosticMonitor() {
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [minimized, setMinimized] = useState(true);

  useEffect(() => {
    const runCheck = () => setHealth(diagnoseSystem());
    runCheck();
    const interval = setInterval(runCheck, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!health) return null;

  const isCritical = health.status === "Critical";
  const isDegraded = health.status === "Degraded";

  return (
    <div className={cn(
      "fixed bottom-6 left-6 z-[9999] transition-all duration-500",
      minimized ? "w-12 h-12" : "w-80"
    )}>
      {minimized ? (
        <button 
          onClick={() => setMinimized(false)}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center border shadow-2xl transition-all animate-pulse",
            isCritical ? "bg-rose-500 border-rose-400 text-white" : 
            isDegraded ? "bg-amber-500 border-amber-400 text-white" : 
            "bg-indigo-500/20 border-indigo-500/40 text-indigo-400 backdrop-blur-xl"
          )}
        >
          <HeartPulse className="w-6 h-6" />
        </button>
      ) : (
        <div className="bg-[#0a0f18]/90 backdrop-blur-2xl border border-white/10 rounded-[32px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          <div className={cn(
            "px-6 py-4 flex items-center justify-between border-b border-white/5",
            isCritical ? "bg-rose-500/10" : "bg-white/5"
          )}>
            <div className="flex items-center gap-3">
              <Activity className={cn("w-4 h-4", isCritical ? "text-rose-400" : "text-indigo-400")} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">System Triage</span>
            </div>
            <button onClick={() => setMinimized(true)} className="text-white/20 hover:text-white text-[10px] font-bold">CLOSE</button>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Protocol Status</span>
                <span className={cn(
                  "text-lg font-black uppercase tracking-tighter",
                  isCritical ? "text-rose-500" : isDegraded ? "text-amber-500" : "text-emerald-400"
                )}>
                  {health.status}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                {isCritical ? <ShieldAlert className="w-6 h-6 text-rose-500" /> : <ShieldCheck className="w-6 h-6 text-emerald-400" />}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Neural Profiles", val: health.neuroProfiles, ok: health.neuroProfiles >= 16 },
                { label: "Physics Engine", val: health.physicsActive ? "Active" : "Failure", ok: health.physicsActive },
                { label: "Branding Lock", val: health.brandingLocked ? "Enforced" : "CORRUPT", ok: health.brandingLocked },
                { label: "Guardrail Sync", val: "Active", ok: true }
              ].map((stat, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-1">{stat.label}</div>
                  <div className={cn("text-[10px] font-black uppercase tracking-widest", stat.ok ? "text-white" : "text-rose-500")}>
                    {stat.val}
                  </div>
                </div>
              ))}
            </div>

            {/* AI Guardrail Specific Feedback */}
            <div className="space-y-3 pt-4 border-t border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Build Guardrails</span>
                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">ACTIVE</span>
              </div>
              {health.missingFiles.length > 0 && (
                <div className="flex items-start gap-2 p-2 rounded-lg bg-rose-500/10 border border-rose-500/20">
                  <FileWarning className="w-3 h-3 text-rose-400 shrink-0 mt-0.5" />
                  <span className="text-[9px] font-bold text-rose-200 uppercase leading-relaxed">Files Deleted: {health.missingFiles.length}</span>
                </div>
              )}
              {health.bannedTermsFound.length > 0 && (
                <div className="flex items-start gap-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <SearchX className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-[9px] font-bold text-amber-200 uppercase leading-relaxed">Banned Terms Detected</span>
                </div>
              )}
            </div>

            {(health.errors.length > 0 || health.warnings.length > 0) && (
              <div className="space-y-2 pt-2 border-t border-white/5 max-h-[120px] overflow-y-auto pr-2 custom-scrollbar">
                <div className="text-[8px] font-black text-rose-400 uppercase tracking-widest">Diagnosis Feed:</div>
                {[...health.errors, ...health.warnings].map((err, i) => (
                  <div key={i} className="text-[9px] font-medium text-rose-300 leading-relaxed italic border-l border-rose-500/30 pl-2">
                    • {err}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="px-6 py-3 bg-white/[0.02] text-[8px] font-bold text-white/20 uppercase tracking-[0.3em] text-center">
            Rick's Build Guard v1.0 • Stable
          </div>
        </div>
      )}
    </div>
  );
}
