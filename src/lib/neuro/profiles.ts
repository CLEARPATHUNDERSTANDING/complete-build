export type GlowLevel = "Low" | "Medium" | "High";
export type Spacing = "Tight" | "Normal" | "Wide";
export type DataDensity = "Low" | "Medium" | "High";

export type NeuroProfileId =
  | "calm_focus"
  | "low_stim_emergency"
  | "dyslexia_readable"
  | "dyscalculia_numeric_relief"
  | "visual_processing_safe"
  | "apd_assist"
  | "executive_function_support"
  | "motor_friendly"
  | "adhd_dopamine_balanced"
  | "adhd_hyperfocus"
  | "autism_predictable"
  | "tourette_tic_friendly"
  | "plain_language"
  | "high_contrast"
  | "custom_neuro_mix"
  | "corporate_open";

export type CandlePersonality = {
  // Candles
  upColor: string;
  downColor: string;
  wickColor: string;
  outlineColor: string;

  // Card wrapper (2-tone border)
  borderA: string;
  borderB: string;

  // Chart surface & grid
  bgTop: string;
  bgBottom: string;
  grid: string;
  text: string;

  // “Physics”
  glow: GlowLevel;
  spacing: Spacing;
  dataDensity: DataDensity;
};

export type NeuroProfile = {
  id: NeuroProfileId;
  label: string;
  tagline: string;
  personality: CandlePersonality;
};

export const NEURO_PROFILES: NeuroProfile[] = [
  {
    id: "calm_focus",
    label: "Calm Focus",
    tagline: "Low-stim clarity, steady pacing.",
    personality: {
      upColor: "#5EEAD4",
      downColor: "#A78BFA",
      wickColor: "#93C5FD",
      outlineColor: "#0EA5E9",
      borderA: "#22D3EE",
      borderB: "#A78BFA",
      bgTop: "#050816",
      bgBottom: "#020617",
      grid: "rgba(148,163,184,0.18)",
      text: "rgba(226,232,240,0.92)",
      glow: "Low",
      spacing: "Wide",
      dataDensity: "Low",
    },
  },
  {
    id: "low_stim_emergency",
    label: "Low Stim Emergency",
    tagline: "Reduce intensity immediately.",
    personality: {
      upColor: "#94A3B8",
      downColor: "#64748B",
      wickColor: "#94A3B8",
      outlineColor: "#64748B",
      borderA: "#334155",
      borderB: "#64748B",
      bgTop: "#020617",
      bgBottom: "#000000",
      grid: "rgba(148,163,184,0.12)",
      text: "rgba(226,232,240,0.85)",
      glow: "Low",
      spacing: "Wide",
      dataDensity: "Low",
    },
  },
  {
    id: "dyslexia_readable",
    label: "Dyslexia Readable",
    tagline: "Strong structure, clean separation.",
    personality: {
      upColor: "#34D399",
      downColor: "#F472B6",
      wickColor: "#E5E7EB",
      outlineColor: "#E5E7EB",
      borderA: "#34D399",
      borderB: "#60A5FA",
      bgTop: "#030712",
      bgBottom: "#020617",
      grid: "rgba(226,232,240,0.16)",
      text: "rgba(241,245,249,0.95)",
      glow: "Medium",
      spacing: "Normal",
      dataDensity: "Medium",
    },
  },
  {
    id: "dyscalculia_numeric_relief",
    label: "Dyscalculia Relief",
    tagline: "Numeric de-emphasis, visual anchoring.",
    personality: {
      upColor: "#22C55E",
      downColor: "#EF4444",
      wickColor: "#CBD5E1",
      outlineColor: "#CBD5E1",
      borderA: "#22C55E",
      borderB: "#F59E0B",
      bgTop: "#050816",
      bgBottom: "#020617",
      grid: "rgba(148,163,184,0.14)",
      text: "rgba(226,232,240,0.92)",
      glow: "Low",
      spacing: "Wide",
      dataDensity: "Low",
    },
  },
  {
    id: "visual_processing_safe",
    label: "Visual Processing Safe",
    tagline: "No glare, no spikes, smooth contrast.",
    personality: {
      upColor: "#60A5FA",
      downColor: "#FCA5A5",
      wickColor: "#93C5FD",
      outlineColor: "#60A5FA",
      borderA: "#60A5FA",
      borderB: "#A78BFA",
      bgTop: "#030712",
      bgBottom: "#01040a",
      grid: "rgba(148,163,184,0.13)",
      text: "rgba(226,232,240,0.9)",
      glow: "Low",
      spacing: "Wide",
      dataDensity: "Low",
    },
  },
  {
    id: "apd_assist",
    label: "APD Assist",
    tagline: "Motion clarity with stable cues.",
    personality: {
      upColor: "#2DD4BF",
      downColor: "#FB7185",
      wickColor: "#E2E8F0",
      outlineColor: "#2DD4BF",
      borderA: "#2DD4BF",
      borderB: "#FB7185",
      bgTop: "#050816",
      bgBottom: "#020617",
      grid: "rgba(148,163,184,0.16)",
      text: "rgba(226,232,240,0.92)",
      glow: "Medium",
      spacing: "Normal",
      dataDensity: "Medium",
    },
  },
  {
    id: "executive_function_support",
    label: "Executive Function",
    tagline: "Reduce clutter, highlight hierarchy.",
    personality: {
      upColor: "#38BDF8",
      downColor: "#F59E0B",
      wickColor: "#CBD5E1",
      outlineColor: "#38BDF8",
      borderA: "#38BDF8",
      borderB: "#F59E0B",
      bgTop: "#020617",
      bgBottom: "#000000",
      grid: "rgba(148,163,184,0.12)",
      text: "rgba(226,232,240,0.9)",
      glow: "Low",
      spacing: "Wide",
      dataDensity: "Low",
    },
  },
  {
    id: "motor_friendly",
    label: "Motor Friendly",
    tagline: "Bigger targets, less precision required.",
    personality: {
      upColor: "#34D399",
      downColor: "#F87171",
      wickColor: "#E2E8F0",
      outlineColor: "#E2E8F0",
      borderA: "#34D399",
      borderB: "#F87171",
      bgTop: "#050816",
      bgBottom: "#020617",
      grid: "rgba(148,163,184,0.14)",
      text: "rgba(241,245,249,0.95)",
      glow: "Low",
      spacing: "Wide",
      dataDensity: "Low",
    },
  },
  {
    id: "adhd_dopamine_balanced",
    label: "ADHD Balanced",
    tagline: "Energy present, not overwhelming.",
    personality: {
      upColor: "#22D3EE",
      downColor: "#F472B6",
      wickColor: "#93C5FD",
      outlineColor: "#22D3EE",
      borderA: "#22D3EE",
      borderB: "#F472B6",
      bgTop: "#06081a",
      bgBottom: "#020617",
      grid: "rgba(148,163,184,0.18)",
      text: "rgba(241,245,249,0.95)",
      glow: "Medium",
      spacing: "Normal",
      dataDensity: "Medium",
    },
  },
  {
    id: "adhd_hyperfocus",
    label: "ADHD Hyperfocus",
    tagline: "High detail, snappy motion.",
    personality: {
      upColor: "#00F5FF",
      downColor: "#FF3DFF",
      wickColor: "#B3E5FC",
      outlineColor: "#00F5FF",
      borderA: "#00F5FF",
      borderB: "#FF3DFF",
      bgTop: "#050816",
      bgBottom: "#000000",
      grid: "rgba(148,163,184,0.22)",
      text: "rgba(241,245,249,0.98)",
      glow: "High",
      spacing: "Tight",
      dataDensity: "High",
    },
  },
  {
    id: "autism_predictable",
    label: "Autism Predictable",
    tagline: "Consistent palette, consistent structure.",
    personality: {
      upColor: "#86EFAC",
      downColor: "#93C5FD",
      wickColor: "#CBD5E1",
      outlineColor: "#CBD5E1",
      borderA: "#86EFAC",
      borderB: "#93C5FD",
      bgTop: "#030712",
      bgBottom: "#020617",
      grid: "rgba(148,163,184,0.16)",
      text: "rgba(241,245,249,0.95)",
      glow: "Low",
      spacing: "Normal",
      dataDensity: "Medium",
    },
  },
  {
    id: "tourette_tic_friendly",
    label: "Tourette / Tic Friendly",
    tagline: "No flashes, minimal motion.",
    personality: {
      upColor: "#A7F3D0",
      downColor: "#FBCFE8",
      wickColor: "#E5E7EB",
      outlineColor: "#E5E7EB",
      borderA: "#A7F3D0",
      borderB: "#FBCFE8",
      bgTop: "#020617",
      bgBottom: "#000000",
      grid: "rgba(148,163,184,0.12)",
      text: "rgba(226,232,240,0.9)",
      glow: "Low",
      spacing: "Wide",
      dataDensity: "Low",
    },
  },
  {
    id: "plain_language",
    label: "Plain Language",
    tagline: "Simplified labels, reduced jargon.",
    personality: {
      upColor: "#4ADE80",
      downColor: "#FCA5A5",
      wickColor: "#CBD5E1",
      outlineColor: "#CBD5E1",
      borderA: "#4ADE80",
      borderB: "#60A5FA",
      bgTop: "#050816",
      bgBottom: "#020617",
      grid: "rgba(148,163,184,0.14)",
      text: "rgba(241,245,249,0.95)",
      glow: "Low",
      spacing: "Wide",
      dataDensity: "Low",
    },
  },
  {
    id: "high_contrast",
    label: "High Contrast",
    tagline: "Maximum readability.",
    personality: {
      upColor: "#FFFFFF",
      downColor: "#F97316",
      wickColor: "#FFFFFF",
      outlineColor: "#FFFFFF",
      borderA: "#F97316",
      borderB: "#FFFFFF",
      bgTop: "#000000",
      bgBottom: "#000000",
      grid: "rgba(255,255,255,0.18)",
      text: "rgba(255,255,255,0.98)",
      glow: "Medium",
      spacing: "Normal",
      dataDensity: "Medium",
    },
  },
  {
    id: "custom_neuro_mix",
    label: "Custom Neuro Mix",
    tagline: "Blend of pacing + clarity defaults.",
    personality: {
      upColor: "#60A5FA",
      downColor: "#F472B6",
      wickColor: "#CBD5E1",
      outlineColor: "#CBD5E1",
      borderA: "#60A5FA",
      borderB: "#F472B6",
      bgTop: "#050816",
      bgBottom: "#020617",
      grid: "rgba(148,163,184,0.16)",
      text: "rgba(241,245,249,0.95)",
      glow: "Medium",
      spacing: "Normal",
      dataDensity: "Medium",
    },
  },
  {
    id: "corporate_open",
    label: "Corporate Open",
    tagline: "Institutional clarity, calm neon edge.",
    personality: {
      upColor: "#7DD3FC",
      downColor: "#FDE68A",
      wickColor: "#BAE6FD",
      outlineColor: "#7DD3FC",
      borderA: "#7DD3FC",
      borderB: "#A78BFA",
      bgTop: "#030712",
      bgBottom: "#020617",
      grid: "rgba(148,163,184,0.14)",
      text: "rgba(241,245,249,0.95)",
      glow: "Low",
      spacing: "Normal",
      dataDensity: "Medium",
    },
  },
];

export function getProfile(id: NeuroProfileId) {
  return (
    NEURO_PROFILES.find((p) => p.id === id) ??
    NEURO_PROFILES[0]
  );
}
