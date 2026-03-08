import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Adaptive Intelligence',
    short_name: 'Intelligence',
    description: 'High-clarity neuro-divergent intelligence platform for universal asset analysis.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#6a5cff',
    icons: [
      {
        src: 'https://picsum.photos/seed/adaptiveintel/192/192',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'https://picsum.photos/seed/adaptiveintel/512/512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
