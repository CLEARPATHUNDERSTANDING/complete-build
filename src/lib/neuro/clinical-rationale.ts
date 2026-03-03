/**
 * @fileOverview Clinical rationale and scientific mapping for neuro-divergent UI profiles.
 * Provides the "Why" behind color, motion, and layout choices based on behavioral science.
 */

export type Citation = {
  text: string;
  url: string;
};

export type ProfileRationale = {
  goal: string;
  summary: string;
  constraints: string[];
  evidenceTags: string[];
  citations: Citation[];
  designRules: string[];
};

export const CLINICAL_DATA = {
  disclaimer: "Clear Path’s color/animation decisions are UX-level cognitive load and sensory exposure controls, not medical treatment.",
  generalPrinciples: [
    {
      id: "arousal_control",
      title: "Threat & Arousal Control",
      desc: "Restricting high-saturation 'alarm' reds to reduce urgency bias and anxiety.",
      citations: [
        { text: "Elliot & Maier (2007). Color and psychological functioning.", url: "https://doi.org/10.1146/annurev.psych.60.110707.163610" }
      ]
    },
    {
      id: "cognitive_load",
      title: "Working Memory Guardrails",
      desc: "Limiting simultaneous information streams to prevent executive function breakdown.",
      citations: [
        { text: "Sweller (1988). Cognitive load during problem solving.", url: "https://doi.org/10.1207/s15326985ep1102_4" }
      ]
    },
    {
      id: "photic_safety",
      title: "Photic & Sensory Safety",
      desc: "Eliminating flicker and high-frequency visual transients for seizure and migraine safety.",
      citations: [
        { text: "W3C WCAG 2.2 - Seizures and physical reactions.", url: "https://www.w3.org/TR/WCAG22/#seizures-and-physical-reactions" }
      ]
    }
  ]
};

export const CLINICAL_RATIONALE: Record<string, ProfileRationale> = {
  calm_focus: {
    goal: "Reduce arousal and stabilize predictability.",
    summary: "Utilizes blue-green leaning palettes and muted warms to lower autonomic arousal and avoid threat-response triggers.",
    constraints: ["No flashing", "Capped saturation", "Max 1 chart recommended"],
    evidenceTags: ["Threat Salience", "Arousal Regulation"],
    designRules: ["Blue/Green bias for calming effect", "Minimal glow to reduce glare", "High spacing to prevent crowding"],
    citations: [
      { text: "Valdez & Mehrabian (1994). Effects of color on emotions.", url: "https://doi.org/10.1016/0167-8760(94)90013-2" }
    ]
  },
  adhd_hyperfocus: {
    goal: "Optimize stimulation for sustained engagement.",
    summary: "Higher contrast and salience support attention regulation while restricted motion prevents overstimulation backfire.",
    constraints: ["Controlled motion", "Restricted UI noise", "Upper bound on saturation"],
    evidenceTags: ["Optimal Stimulation", "Cognitive-Energetic Model"],
    designRules: ["High separation of up/down states", "Neon accents for signal salience", "Snappy but non-strobing transitions"],
    citations: [
      { text: "Zentall (1983). Optimal stimulation: ADHD model.", url: "https://doi.org/10.1037/0022-3514.42.3.446" }
    ]
  },
  dyslexia_readable: {
    goal: "Reduce visual stress and crowding.",
    summary: "Focuses on strong figure-ground separation and increased spacing to facilitate easier character and pattern decoding.",
    constraints: ["Reduced glare", "Stable geometry", "Non-crowded data points"],
    evidenceTags: ["Visual Stress", "Perceptual Crowding"],
    designRules: ["Increased spacing between candles", "Calm contrasts", "Dyslexia-friendly background-text ratios"],
    citations: [
      { text: "Wilkins (1995). Visual Stress.", url: "https://doi.org/10.1093/acprof:oso/9780198521747.001.0001" }
    ]
  },
  dyscalculia_numeric_relief: {
    goal: "De-emphasize numeric strain through visual anchoring.",
    summary: "Reduces reliance on decimal precision and dense numeric tables in favor of relative shape and magnitude descriptors.",
    constraints: ["Fewer decimals", "Relative movement cues", "Reduced numeric clutter"],
    evidenceTags: ["Numeric Cognition", "Math Anxiety"],
    designRules: ["Visual magnitude coding", "Simplified labels", "Relative performance indicators over raw decimals"],
    citations: [
      { text: "Butterworth (2004). Dyscalculia: From brain to education.", url: "https://doi.org/10.1038/nrn1991" }
    ]
  }
};

export function getRationale(id: string): ProfileRationale {
  return CLINICAL_RATIONALE[id] || CLINICAL_RATIONALE.calm_focus;
}
