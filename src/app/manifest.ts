
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'InsightFlow Intelligence',
    short_name: 'InsightFlow',
    description: 'High-clarity neuro-divergent trading intelligence platform.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#6366f1',
    icons: [
      {
        src: 'https://picsum.photos/seed/insightflow/192/192',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'https://picsum.photos/seed/insightflow/512/512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
