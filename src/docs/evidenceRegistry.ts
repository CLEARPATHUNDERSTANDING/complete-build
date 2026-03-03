// Clear Path — Evidence Registry (VC-safe, non-medical-device positioning)
// Purpose: Provide a defensible, citation-backed rationale for UI choices (color, motion, density, prompts)
// NOTE: This is NOT clinical advice and not a medical device claim set.

export type EvidenceDomain =
  | "CognitiveLoad"
  | "WorkingMemory"
  | "DecisionFatigue"
  | "ColorArousal"
  | "ColorEmotion"
  | "VisualStressReading"
  | "SeizureFlashSafety"
  | "PhotophobiaMigraine"
  | "ADHDOptimalStimulation"
  | "AccessibilityStandards";

export type DesignLever =
  | "palette_saturation_caps"
  | "contrast_management"
  | "avoid_alarm_red"
  | "stable_color_mapping"
  | "motion_reduction"
  | "no_flash_no_strobe"
  | "chart_count_limits"
  | "progressive_disclosure"
  | "spacing_and_typography"
  | "plain_language"
  | "voice_and_text_input"
  | "break_prompts"
  | "attention_salience_controls";

export type Citation = {
  label: string; // what the citation is
  url: string;   // canonical URL (DOI, PubMed, W3C, org)
  note?: string; // optional implementation note
};

export type EvidencePillar = {
  id: string;
  title: string;
  domain: EvidenceDomain;
  whatItSupports: string[];
  designLevers: DesignLever[];
  vcSafeClaim: string;              // phrasing you can use publicly
  internalInterpretation: string;   // slightly more technical
  citations: Citation[];
  allowedMarketingLanguage: string[];
  disallowedMedicalClaims: string[];
};

export const CLEAR_PATH_NON_MEDICAL_DEVICE_DISCLAIMER = `
Clear Path is not a medical device and does not diagnose, treat, cure, or prevent any disease or condition.
It is an accessibility- and cognition-informed interface that applies established research on cognitive load,
attention limits, sensory sensitivity, and accessibility safety to reduce avoidable interface-driven strain.
`.trim();

export const evidencePillars: EvidencePillar[] = [
  {
    id: "P1-cognitive-load-theory",
    title: "Cognitive Load Theory: limiting extraneous load improves comprehension",
    domain: "CognitiveLoad",
    whatItSupports: [
      "Chart count limits per profile",
      "Simplified layouts and fewer simultaneous panels",
      "Progressive disclosure (show less, reveal more on demand)",
      "Mode-specific defaults that reduce decision friction"
    ],
    designLevers: ["chart_count_limits", "progressive_disclosure", "contrast_management"],
    vcSafeClaim:
      "We reduce extraneous cognitive load so users can interpret market information with less fatigue and fewer errors.",
    internalInterpretation:
      "UI reduces extraneous load (layout clutter, simultaneous stimuli) to preserve working memory resources for signal interpretation.",
    citations: [
      {
        label: "Sweller (1988) Cognitive load during problem solving",
        url: "https://doi.org/10.1207/s15326985ep1102_4"
      },
      {
        label: "Springer book: Cognitive Load Theory (overview)",
        url: "https://link.springer.com/book/10.1007/978-1-4419-8126-4"
      }
    ],
    allowedMarketingLanguage: [
      "Evidence-informed cognitive load reduction",
      "Reduced interface-driven fatigue",
      "Clarity-first design"
    ],
    disallowedMedicalClaims: [
      "Treats ADHD/anxiety/PTSD",
      "Clinically reduces cortisol",
      "Medical-grade therapy interface"
    ]
  },

  {
    id: "P2-working-memory-limits",
    title: "Working Memory Limits: humans can process only so much at once",
    domain: "WorkingMemory",
    whatItSupports: [
      "Limiting simultaneous charts and widgets",
      "Reducing alerts and competing UI signals",
      "Structured screen regions and consistent placement"
    ],
    designLevers: ["chart_count_limits", "progressive_disclosure", "stable_color_mapping"],
    vcSafeClaim:
      "Interfaces that exceed working memory limits increase mistakes; we keep information density within human processing capacity.",
    internalInterpretation:
      "Reduce competing stimuli and stabilize layout to minimize working memory thrash and attention switching costs.",
    citations: [
      {
        label: "Baddeley & Hitch — Working Memory model (classic)",
        url: "https://doi.org/10.1037/0033-295X.63.2.81"
      },
      {
        label: "Baddeley review (Annual Review) — Working Memory",
        url: "https://doi.org/10.1146/annurev.psych.51.1.107"
      }
    ],
    allowedMarketingLanguage: [
      "Built around human attention limits",
      "Designed for cognitive clarity"
    ],
    disallowedMedicalClaims: [
      "Repairs executive dysfunction",
      "Neurological rehabilitation"
    ]
  },

  {
    id: "P3-decision-fatigue",
    title: "Decision Fatigue: prolonged decision streams degrade judgment",
    domain: "DecisionFatigue",
    whatItSupports: [
      "Break prompts after prolonged chart engagement",
      "Session pacing features",
      "Optional advisory nudges (not forced control)"
    ],
    designLevers: ["break_prompts", "progressive_disclosure"],
    vcSafeClaim:
      "We reduce decision fatigue by encouraging breaks and minimizing unnecessary choices during high-stakes analysis.",
    internalInterpretation:
      "Timed prompts and reduced option overload support better judgment during long sessions.",
    citations: [
      {
        label: "Baumeister et al. (1998) Ego depletion framework (historical foundation)",
        url: "https://doi.org/10.1037/0033-295X.84.2.191",
        note: "Debated in later literature; use as background, not as sole proof."
      },
      {
        label: "Vohs et al. (2008) Decision fatigue / choice effects",
        url: "https://doi.org/10.1111/j.1467-9280.2008.02140.x",
        note: "Use as evidence that repeated decisions can impair later performance."
      }
    ],
    allowedMarketingLanguage: [
      "Fatigue-aware workflows",
      "Designed for sustained performance"
    ],
    disallowedMedicalClaims: [
      "Prevents addiction",
      "Treats compulsive trading"
    ]
  },

  {
    id: "P4-color-in-context-red",
    title: "Color-in-context: high-salience red can increase threat/error urgency in many tasks",
    domain: "ColorArousal",
    whatItSupports: [
      "Avoiding pure/high-saturation alarm reds in calm/anxiety modes",
      "Using muted warms instead of aggressive danger hues",
      "Providing user choice within safe bounds"
    ],
    designLevers: ["avoid_alarm_red", "palette_saturation_caps", "contrast_management"],
    vcSafeClaim:
      "Color influences arousal and urgency bias; we control saturation and contrast to avoid unnecessary threat signaling.",
    internalInterpretation:
      "Limit high-saturation red exposure in modes intended to reduce perceived urgency; allow controlled high-salience palettes only when beneficial.",
    citations: [
      {
        label: "Elliot et al. (2007) Red effects on performance (JPSP)",
        url: "https://doi.org/10.1037/0022-3514.91.1.136"
      },
      {
        label: "Elliot & Maier (2014) Review: Color and psychological functioning",
        url: "https://doi.org/10.1146/annurev.psych.60.110707.163610"
      }
    ],
    allowedMarketingLanguage: [
      "Arousal-aware color system",
      "Reduced urgency bias cues"
    ],
    disallowedMedicalClaims: [
      "Reduces panic attacks",
      "Treats anxiety disorders"
    ]
  },

  {
    id: "P5-color-emotion",
    title: "Color and emotion: hue/brightness/saturation can influence affect",
    domain: "ColorEmotion",
    whatItSupports: [
      "Blue/green leaning palettes for calm modes",
      "Muted palettes for low-stim modes",
      "Brightness control for comfort"
    ],
    designLevers: ["palette_saturation_caps", "contrast_management"],
    vcSafeClaim:
      "We use conservative, evidence-informed color parameters (hue/brightness/saturation) to support calmer interaction states.",
    internalInterpretation:
      "Prefer lower saturation and stable luminance to reduce overstimulation risk while maintaining signal legibility.",
    citations: [
      {
        label: "Valdez & Mehrabian (1994) Effects of color on emotions",
        url: "https://doi.org/10.1016/0167-8760(94)90013-2"
      }
    ],
    allowedMarketingLanguage: [
      "Comfort-tuned color palettes",
      "Sensory-considerate UI themes"
    ],
    disallowedMedicalClaims: [
      "Clinically improves mood",
      "Treats depression"
    ]
  },

  {
    id: "P6-visual-stress-reading",
    title: "Visual stress & crowding: spacing, glare control, and contrast can reduce reading strain",
    domain: "VisualStressReading",
    whatItSupports: [
      "Dyslexia-readable mode (spacing, reduced glare, readable fonts)",
      "Avoiding high-frequency ‘vibrating’ color pairings",
      "Figure-ground separation for discoverability"
    ],
    designLevers: ["spacing_and_typography", "contrast_management", "stable_color_mapping"],
    vcSafeClaim:
      "We reduce visual crowding and glare to lower reading strain and improve scanning clarity.",
    internalInterpretation:
      "Typography/spacing and background control reduce perceptual stressors that can interfere with decoding and navigation.",
    citations: [
      {
        label: "Wilkins — Visual Stress (book)",
        url: "https://doi.org/10.1093/acprof:oso/9780198521747.001.0001"
      },
      {
        label: "British Dyslexia Association — Dyslexia-friendly style guide",
        url: "https://www.bdadyslexia.org.uk/advice/employers/creating-a-dyslexia-friendly-workplace/dyslexia-friendly-style-guide",
        note: "Practical guidance, not a clinical trial; use as implementation support."
      }
    ],
    allowedMarketingLanguage: [
      "Reading-strain reduction features",
      "Dyslexia-friendly typography options"
    ],
    disallowedMedicalClaims: [
      "Cures dyslexia",
      "Clinically treats visual processing disorder"
    ]
  },

  {
    id: "P7-wcag-seizure-flash",
    title: "Seizure/flash safety: avoid flashing thresholds and strobing",
    domain: "SeizureFlashSafety",
    whatItSupports: [
      "No strobe animations",
      "Motion reduction defaults in sensory-safe modes",
      "Emergency low-stim mode"
    ],
    designLevers: ["no_flash_no_strobe", "motion_reduction"],
    vcSafeClaim:
      "We align with established accessibility safety guidance to reduce risks from flashing and seizure-triggering content.",
    internalInterpretation:
      "Implement WCAG seizure/flash constraints; avoid high-frequency flashing UI and excessive motion cues.",
    citations: [
      {
        label: "W3C WCAG 2.2 — Seizures and Physical Reactions",
        url: "https://www.w3.org/TR/WCAG22/#seizures-and-physical-reactions"
      },
      {
        label: "Epilepsy Foundation — Photosensitivity overview",
        url: "https://www.epilepsy.com/what-is-epilepsy/seizure-triggers/photosensitivity"
      }
    ],
    allowedMarketingLanguage: [
      "WCAG-aligned flash safety",
      "Reduced flicker and flash exposure"
    ],
    disallowedMedicalClaims: [
      "Prevents seizures",
      "Medical seizure control"
    ]
  },

  {
    id: "P8-photophobia-migraine",
    title: "Photophobia & migraine sensitivity: reduce glare, harsh brightness, and motion",
    domain: "PhotophobiaMigraine",
    whatItSupports: [
      "Dim/low-glare palettes",
      "Reduced animation speed",
      "Optional dark mode with controlled contrast"
    ],
    designLevers: ["motion_reduction", "palette_saturation_caps", "contrast_management"],
    vcSafeClaim:
      "We offer low-glare, motion-reduced viewing options because visual sensitivity can degrade comfort and performance.",
    internalInterpretation:
      "Provide low-stim variants and avoid aggressive luminance transitions that can be uncomfortable for photophobic users.",
    citations: [
      {
        label: "PubMed search portal — migraine photophobia reviews",
        url: "https://pubmed.ncbi.nlm.nih.gov/"
      }
    ],
    allowedMarketingLanguage: [
      "Low-glare and motion-reduced options",
      "Comfort-oriented viewing modes"
    ],
    disallowedMedicalClaims: [
      "Treats migraines",
      "Stops photophobia"
    ]
  },

  {
    id: "P9-adhd-optimal-stimulation",
    title: "ADHD optimal stimulation: some users benefit from higher salience within controlled bounds",
    domain: "ADHDOptimalStimulation",
    whatItSupports: [
      "ADHD balanced palette (higher contrast, high salience candles)",
      "Hyperfocus palette (reduced clutter, fewer colors)",
      "Salience controls without strobing"
    ],
    designLevers: ["attention_salience_controls", "palette_saturation_caps", "chart_count_limits"],
    vcSafeClaim:
      "Some users benefit from increased visual salience to maintain attention; we provide it with safety caps and low-noise layouts.",
    internalInterpretation:
      "High-salience palettes can improve signal detection for certain attention profiles; enforce caps to avoid overstimulation.",
    citations: [
      {
        label: "Zentall & Zentall (1983) Optimal stimulation model (ADHD)",
        url: "https://doi.org/10.1037/0022-3514.42.3.446"
      }
    ],
    allowedMarketingLanguage: [
      "Attention-supportive salience controls",
      "High-clarity modes for focus"
    ],
    disallowedMedicalClaims: [
      "Treats ADHD",
      "Clinically improves ADHD symptoms"
    ]
  },

  {
    id: "P10-wcag-accessibility",
    title: "Accessibility standards: perception, readability, and alternative inputs",
    domain: "AccessibilityStandards",
    whatItSupports: [
      "Plain language mode",
      "Scalable typography (font size toggles)",
      "Voice + text inputs",
      "Reduced motion and predictable navigation"
    ],
    designLevers: ["plain_language", "voice_and_text_input", "spacing_and_typography", "motion_reduction"],
    vcSafeClaim:
      "We align with accessibility standards and inclusive design practices to reduce exclusion and cognitive friction.",
    internalInterpretation:
      "Treat neuro-adaptive settings as accessibility controls: readability, input flexibility, motion limits, and predictable layouts.",
    citations: [
      {
        label: "W3C WCAG 2.2 (full specification)",
        url: "https://www.w3.org/TR/WCAG22/"
      }
    ],
    allowedMarketingLanguage: [
      "Accessibility-aligned design",
      "Inclusive by design",
      "User-controlled readability and motion"
    ],
    disallowedMedicalClaims: [
      "Clinically validated therapy",
      "Medical-grade accessibility treatment"
    ]
  }
];

export const evidenceById = Object.fromEntries(evidencePillars.map((p) => [p.id, p]));

export type ModeKey =
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

export const modeEvidenceMap: Record<ModeKey, string[]> = {
  calm_focus: ["P1-cognitive-load-theory", "P2-working-memory-limits", "P4-color-in-context-red", "P5-color-emotion", "P10-wcag-accessibility"],
  low_stim_emergency: ["P1-cognitive-load-theory", "P7-wcag-seizure-flash", "P10-wcag-accessibility", "P8-photophobia-migraine"],
  dyslexia_readable: ["P1-cognitive-load-theory", "P6-visual-stress-reading", "P10-wcag-accessibility"],
  dyscalculia_numeric_relief: ["P1-cognitive-load-theory", "P2-working-memory-limits", "P10-wcag-accessibility"],
  visual_processing_safe: ["P2-working-memory-limits", "P6-visual-stress-reading", "P7-wcag-seizure-flash", "P10-wcag-accessibility"],
  apd_assist: ["P2-working-memory-limits", "P10-wcag-accessibility"],
  executive_function_support: ["P1-cognitive-load-theory", "P2-working-memory-limits", "P3-decision-fatigue", "P10-wcag-accessibility"],
  motor_friendly: ["P2-working-memory-limits", "P10-wcag-accessibility"],
  adhd_dopamine_balanced: ["P1-cognitive-load-theory", "P2-working-memory-limits", "P9-adhd-optimal-stimulation", "P10-wcag-accessibility"],
  adhd_hyperfocus: ["P1-cognitive-load-theory", "P2-working-memory-limits", "P9-adhd-optimal-stimulation", "P3-decision-fatigue"],
  autism_predictable: ["P1-cognitive-load-theory", "P2-working-memory-limits", "P10-wcag-accessibility"],
  tourette_tic_friendly: ["P10-wcag-accessibility", "P7-wcag-seizure-flash"],
  plain_language: ["P10-wcag-accessibility", "P2-working-memory-limits"],
  high_contrast: ["P10-wcag-accessibility", "P7-wcag-seizure-flash"],
  custom_neuro_mix: ["P1-cognitive-load-theory", "P2-working-memory-limits", "P10-wcag-accessibility"],
  corporate_open: ["P10-wcag-accessibility"]
};
