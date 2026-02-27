export type ViewMode = 'focus' | 'minimal' | 'pro';

export interface PanelConfig {
  id: string;
  type: 'market' | 'news' | 'calendar' | 'ai-insights';
  title: string;
  w: number;
  h: number;
}

export interface VisualProfile {
  density: 'compact' | 'comfortable';
  motion: 'reduced' | 'full';
  contrast: 'standard' | 'high';
  fontScaling: number;
}

export interface UserPreferences {
  schemaVersion: string;
  modeId: ViewMode;
  layoutId: string;
  panelConfig: PanelConfig[];
  visualProfile: VisualProfile;
  lastMigratedAt: string;
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  schemaVersion: '1.0.0',
  modeId: 'minimal',
  layoutId: 'default-layout',
  panelConfig: [
    { id: 'p1', type: 'market', title: 'Primary Market', w: 6, h: 4 },
    { id: 'p2', type: 'news', title: 'Latest News', w: 6, h: 4 },
  ],
  visualProfile: {
    density: 'comfortable',
    motion: 'reduced',
    contrast: 'standard',
    fontScaling: 1,
  },
  lastMigratedAt: new Date().toISOString(),
};