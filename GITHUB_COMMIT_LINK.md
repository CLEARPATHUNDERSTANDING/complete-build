# GitHub Reference

Original UI Repository: [https://github.com/CLEARPATHUNDERSTANDING/socialui.git](https://github.com/CLEARPATHUNDERSTANDING/socialui.git)

## 🛠️ Development Checkpoint: Neuro-Trading Architecture v1.5.0

### Core Systems Implemented:
- **Medical Profile Engine**: Integrated `src/lib/neuro/profiles.ts` containing 16 unique neuro-divergent personalities.
- **Chart Physics Engine**: Implemented `src/lib/neuro/chartPhysics.ts` to transform profile data into visual properties (glow, spacing, density).
- **Quad-Stream Layout**: Added Quad View mode in `src/app/dashboard/page.tsx` with dynamic Grid/Stack switching.
- **Multi-Layer UI**: Refactored `SocialPlatform.tsx` sidebar with collapsible layers and specialized "Neuro" launching logic.
- **Visual Wrappers**: Created `NeuroGlowCard.tsx` for 2-tone neon personality-driven borders.
- **External Controls**: Moved `TimeframeBar.tsx` outside the chart canvas to prevent "crushing" the visual data.

### API Integration:
- Full API Key stack loaded for TwelveData, Finnhub, Polygon, AlphaVantage, and more.

### State:
- UI is currently "Noise-Reduction" optimized.
- All 16 profiles are selectable and wired to the ApexCandle physics.