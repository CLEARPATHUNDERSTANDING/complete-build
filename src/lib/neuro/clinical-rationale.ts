/**
 * @fileOverview Dynamic rationale generator bridging Neuro Profiles to the Evidence Registry.
 */
import { evidenceById, modeEvidenceMap, type EvidencePillar, type ModeKey } from "@/docs/evidenceRegistry";

export type Citation = {
  text: string;
  url: string;
};

export type ProfileRationale = {
  goal: string;
  summary: string;
  evidenceTags: string[];
  citations: Citation[];
  designRules: string[];
};

export function getRationale(id: string): ProfileRationale {
  const pillarIds = modeEvidenceMap[id as ModeKey] || ["P10-wcag-accessibility"];
  const pillars = pillarIds.map(pid => evidenceById[pid]).filter(Boolean) as EvidencePillar[];
  
  if (pillars.length === 0) {
    return {
      goal: "Standard accessibility-informed interface.",
      summary: "Balanced design following established web accessibility standards.",
      evidenceTags: ["Accessibility"],
      citations: [{ text: "W3C WCAG 2.2", url: "https://www.w3.org/TR/WCAG22/" }],
      designRules: ["Predictable layout", "Standard contrast"]
    };
  }

  // Aggregate data from relevant pillars
  return {
    goal: pillars[0]?.vcSafeClaim || "Evidence-informed interface calibration.",
    summary: pillars.map(p => p.internalInterpretation).join(" "),
    designRules: Array.from(new Set(pillars.flatMap(p => p.whatItSupports))),
    evidenceTags: Array.from(new Set(pillars.map(p => p.domain))),
    citations: pillars.flatMap(p => p.citations.map(c => ({ text: c.label, url: c.url }))),
  };
}
