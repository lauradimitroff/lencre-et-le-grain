import { bookCategories, books } from '@/data/books'
import { menuItems, menuSections } from '@/data/menu'
import { pairingRecords } from '@/data/pairings'
import type { Book, MenuItem, MenuSection, MenuSectionId, Pairing } from '@/types/catalog'

/**
 * Point d'accès unique aux données. Les composants ne lisent jamais les
 * fichiers de `data/` directement : pour brancher une API plus tard, seules
 * ces fonctions changent (elles deviendraient asynchrones).
 */

export function getBooks(): Book[] {
  return books
}

/** Les coups de cœur affichés sur l'accueil. */
export function getFeaturedBooks(): Book[] {
  return books.filter((book) => book.featured)
}

export function getBookCategories() {
  return bookCategories
}

export interface MenuSectionWithItems extends MenuSection {
  items: MenuItem[]
}

export function getMenu(sectionIds?: MenuSectionId[]): MenuSectionWithItems[] {
  const sections = sectionIds
    ? menuSections.filter((section) => sectionIds.includes(section.id))
    : menuSections

  return sections.map((section) => ({
    ...section,
    items: menuItems.filter((item) => item.section === section.id),
  }))
}

/** Sélection courte pour l'accueil : les articles marqués « bestSeller », boissons puis pâtisseries. */
export function getBestSellers(): MenuSectionWithItems[] {
  const best = menuItems.filter((item) => item.bestSeller)
  return [
    { id: 'comptoir', title: 'Côté tasse', items: best.filter((item) => item.kind === 'boisson') },
    { id: 'patisseries', title: 'Côté four', items: best.filter((item) => item.kind === 'patisserie') },
  ]
}

function findOrThrow<T extends { id: string }>(list: T[], id: string, label: string): T {
  const found = list.find((item) => item.id === id)
  if (!found) throw new Error(`${label} introuvable : « ${id} »`)
  return found
}

export function getPairings(): Pairing[] {
  return pairingRecords.map(({ bookId, drinkId, pastryId, ...rest }) => ({
    ...rest,
    book: findOrThrow(books, bookId, 'Livre'),
    drink: findOrThrow(menuItems, drinkId, 'Boisson'),
    pastry: pastryId ? findOrThrow(menuItems, pastryId, 'Pâtisserie') : undefined,
  }))
}
