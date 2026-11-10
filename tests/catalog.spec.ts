import { describe, expect, it } from 'vitest'
import { books } from '@/data/books'
import { menuItems, menuSections } from '@/data/menu'
import {
  filterMenuByAllergens,
  getBestSellers,
  getFeaturedBooks,
  getMenu,
  getPairings,
} from '@/services/catalog'

const hasUniqueIds = (list: { id: string }[]) => new Set(list.map((i) => i.id)).size === list.length

describe('données du catalogue', () => {
  it('utilise des identifiants uniques', () => {
    expect(hasUniqueIds(books)).toBe(true)
    expect(hasUniqueIds(menuItems)).toBe(true)
  })

  it('a des prix entiers et positifs (en centimes)', () => {
    for (const item of [...books, ...menuItems]) {
      expect(Number.isInteger(item.price), item.id).toBe(true)
      expect(item.price, item.id).toBeGreaterThan(0)
    }
  })

  it('range chaque produit dans une section existante, sans section vide', () => {
    const sections = getMenu()
    expect(sections).toHaveLength(menuSections.length)
    for (const section of sections) expect(section.items.length, section.id).toBeGreaterThan(0)
  })

  it('ne mentionne aucun ingrédient d’origine animale (carte 100 % végétale)', () => {
    const animal = /\b(beurre|œufs?|oeufs?|miel|lait (entier|de vache|demi-écrémé)|crème fraîche|fromage|gélatine|chantilly)\b/i
    for (const item of menuItems) {
      expect(`${item.name} ${item.description}`, item.id).not.toMatch(animal)
    }
  })
})

describe('getPairings', () => {
  it('résout chaque accord vers un livre, une boisson et une pâtisserie existants', () => {
    const pairings = getPairings()
    expect(pairings.length).toBeGreaterThan(0)
    for (const pairing of pairings) {
      expect(pairing.book.id).toBeTruthy()
      expect(pairing.drink.kind).toBe('boisson')
      if (pairing.pastry) expect(pairing.pastry.kind).toBe('patisserie')
    }
  })
})

describe('getBestSellers', () => {
  it("propose quelques boissons et pâtisseries, pas toute la carte", () => {
    const [drinks, pastries] = getBestSellers()
    expect(drinks?.items.length).toBeGreaterThan(0)
    expect(pastries?.items.length).toBeGreaterThan(0)
    expect(drinks?.items.every((item) => item.kind === 'boisson')).toBe(true)
    expect(pastries?.items.every((item) => item.kind === 'patisserie')).toBe(true)
    const total = (drinks?.items.length ?? 0) + (pastries?.items.length ?? 0)
    expect(total).toBeLessThan(menuItems.length / 2)
  })
})

describe('typographie', () => {
  it("n'utilise pas de tiret cadratin dans les textes affichés", () => {
    const texts = [...books, ...menuItems].flatMap((entry) => Object.values(entry))
    for (const text of texts.filter((value) => typeof value === 'string')) {
      expect(text).not.toContain('\u2014')
    }
  })
})

describe('getFeaturedBooks', () => {
  it("met en avant 3 ou 4 livres sur l'accueil", () => {
    const featured = getFeaturedBooks()
    expect(featured.length).toBeGreaterThanOrEqual(3)
    expect(featured.length).toBeLessThanOrEqual(4)
  })
})

describe('filtre allergènes de la carte', () => {
  it('ne retire rien sans allergène exclu', () => {
    expect(filterMenuByAllergens(getMenu(), [])).toEqual(getMenu())
  })

  it('retire les articles qui contiennent un allergène exclu, et les rubriques vides', () => {
    const filtered = filterMenuByAllergens(getMenu(), ['gluten', 'fruits-a-coque'])
    const items = filtered.flatMap((section) => section.items)
    expect(items.length).toBeGreaterThan(0)
    for (const item of items) {
      expect(item.allergens ?? [], item.id).not.toContain('gluten')
      expect(item.allergens ?? [], item.id).not.toContain('fruits-a-coque')
    }
    for (const section of filtered) expect(section.items.length, section.id).toBeGreaterThan(0)
    expect(items.map((item) => item.id)).toContain('moelleux-sans-gluten')
  })
})
