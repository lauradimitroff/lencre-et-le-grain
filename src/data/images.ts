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
  /** Où la photo apparaît sur le site (page Crédits). */
  usage: string
  /** Photographe et page Unsplash de la photo, affichés sur la page Crédits. */
  credit?: { author: string; authorUrl: string; photoUrl: string }
}

export const photos = {
  heroCafeInterior: {
    id: '1521017432531-fbd92d768814',
    alt: 'Salle de café lumineuse aux tables en bois, avec un comptoir, des étagères garnies et des revues posées sur une table.',
    color: '#8c8478',
    usage: 'Accueil, grande image d’ouverture',
  },
  vintageBookStacks: {
    id: '1550399105-05c4a7641b02',
    alt: 'Mur de livres anciens empilés à plat, aux reliures en toile rouge, bleue et verte ornées de dorures.',
    color: '#6b4a48',
    usage: 'Accueil, section « L’esprit du lieu »',
  },
  pourOver: {
    id: '1442512595331-e89e73853f31',
    alt: 'Un barista verse l’eau d’une bouilloire col de cygne sur un filtre à café en papier.',
    color: '#6f7471',
    usage: 'Accueil, section « Le café »',
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
