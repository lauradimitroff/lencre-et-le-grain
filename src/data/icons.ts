/**
 * Icônes au trait (grille 24 × 24) dessinées pour le site.
 * Chaque icône est une liste de tracés SVG, rendus avec stroke="currentColor".
 */
export const lineIcons = {
  clock: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 7v5l3 2'],
  leaf: ['M5 19c0-8 5-13 14-14 0 9-5 14-13 14', 'M5 19c3-4 6-7 10-9'],
  book: [
    'M3 5.5c2.5-1 5.5-1 9 1.5 3.5-2.5 6.5-2.5 9-1.5V19c-2.5-1-5.5-1-9 1.5-3.5-2.5-6.5-2.5-9-1.5Z',
    'M12 7v13.5',
  ],
  cup: [
    'M4 10h13v4a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6Z',
    'M17 12h1.5a2.5 2.5 0 0 1 0 5H16',
    'M8.5 3.5c-.8 1 .8 2-.1 3',
    'M12.5 3.5c-.8 1 .8 2-.1 3',
  ],
} satisfies Record<string, string[]>

export type LineIconName = keyof typeof lineIcons
