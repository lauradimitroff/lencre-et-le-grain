/**
 * Photographies Unsplash (licence Unsplash), servies par leur CDN qui
 * redimensionne et convertit au format le plus léger (AVIF/WebP).
 */
export interface Photo {
  /** Identifiant Unsplash, ex. « 1509042239860-f550ce710b93 ». */
  id: string
  alt: string
  /** Couleur dominante affichée pendant le chargement. */
  color: string
}

export const photos = {
  heroLattes: {
    id: '1509042239860-f550ce710b93',
    alt: 'Quatre tasses de cappuccino décorées d’un cœur, posées parmi des plantes vertes sur une table en bois.',
    color: '#c9cfc2',
  },
  vintageBookStacks: {
    id: '1550399105-05c4a7641b02',
    alt: 'Mur de livres anciens empilés à plat, aux reliures en toile rouge, bleue et verte ornées de dorures.',
    color: '#6b4a48',
  },
  handPickingBook: {
    id: '1513475382585-d06e58bcb0e0',
    alt: 'Une main en pull moutarde attrape un livre sur une étagère.',
    color: '#5f6461',
  },
  pourOver: {
    id: '1442512595331-e89e73853f31',
    alt: 'Un barista verse l’eau d’une bouilloire col de cygne sur un filtre à café en papier.',
    color: '#6f7471',
  },
  openBooks: {
    id: '1456513080510-7bf3a84b82f8',
    alt: 'Livres ouverts sur une table, un stylo posé entre les pages, une bibliothèque en arrière-plan.',
    color: '#b8a58f',
  },
} satisfies Record<string, Photo>

export function unsplashUrl(photo: Photo, width: number, height: number, quality = 70): string {
  const params = new URLSearchParams({
    auto: 'format',
    fit: 'crop',
    w: String(width),
    h: String(height),
    q: String(quality),
  })
  return `https://images.unsplash.com/photo-${photo.id}?${params.toString()}`
}
