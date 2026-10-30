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
