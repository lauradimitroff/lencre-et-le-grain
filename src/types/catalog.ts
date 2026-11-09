/** Prix exprimés en centimes d'euro pour éviter les erreurs d'arrondi. */
export type PriceInCents = number

export interface Option<T extends string = string> {
  value: T
  label: string
}

/* ---------- Librairie ---------- */

export type BookCategory = 'fantasy' | 'gothique' | 'romance' | 'bd' | 'jeunesse'

/** Motifs des couvertures illustrées : les couvertures des éditeurs ne sont pas reproduites. */
export type CoverMotif = 'arches' | 'sun' | 'waves' | 'leaf' | 'grid' | 'steam'

export interface BookCover {
  background: string
  ink: string
  motif: CoverMotif
}

/**
 * Livre réel de la sélection. Prix public indicatif en France (prix unique du livre),
 * relevé à la date indiquée dans les données.
 */
export interface Book {
  id: string
  title: string
  /** Série et numéro de tome, ex. « Alex Stern, tome 1 ». */
  series?: string
  author: string
  publisher: string
  category: BookCategory
  price: PriceInCents
  year: number
  /** Absent quand l'information n'a pas pu être vérifiée. */
  pages?: number
  /** Résumé rédigé pour le site (pas la quatrième de couverture). */
  summary: string
  cover: BookCover
  isNew?: boolean
}

/* ---------- Café ---------- */

export type Allergen = 'gluten' | 'fruits-a-coque' | 'soja'

export type MenuSectionId = 'comptoir' | 'douces' | 'sans-cafe' | 'saison' | 'patisseries'

export interface MenuSection {
  id: MenuSectionId
  title: string
  note?: string
}

/** Boisson ou pâtisserie : toute la carte est végétale. */
export interface MenuItem {
  id: string
  name: string
  description: string
  section: MenuSectionId
  kind: 'boisson' | 'patisserie'
  price: PriceInCents
  allergens?: Allergen[]
  /** Mis en avant sur l'accueil (« les plus demandés »). */
  bestSeller?: boolean
}

/* ---------- Accords livre + café ---------- */

/** Accord tel que stocké : il référence les autres données par identifiant. */
export interface PairingRecord {
  id: string
  bookId: string
  drinkId: string
  pastryId?: string
  mood: string
  note: string
}

/** Accord résolu, prêt à être affiché. */
export interface Pairing {
  id: string
  mood: string
  note: string
  book: Book
  drink: MenuItem
  pastry?: MenuItem
}
