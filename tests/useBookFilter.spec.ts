import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useBookFilter } from '@/composables/useBookFilter'
import { bookCategories, books } from '@/data/books'

describe('useBookFilter', () => {
  it('affiche tous les livres par défaut', () => {
    const { active, filtered } = useBookFilter(books, bookCategories)
    expect(active.value).toBe('tous')
    expect(filtered.value).toHaveLength(books.length)
  })

  it('filtre par catégorie', () => {
    const { filtered, select } = useBookFilter(books, bookCategories)
    select('gothique')
    expect(filtered.value.length).toBeGreaterThan(0)
    expect(filtered.value.every((book) => book.category === 'gothique')).toBe(true)
  })

  it('ne propose que les catégories présentes, avec leur nombre de titres', () => {
    const source = ref(books.filter((book) => book.category === 'romance'))
    const { options } = useBookFilter(source, bookCategories)
    expect(options.value.map((o) => o.value)).toEqual(['tous', 'romance'])
    expect(options.value[1]?.count).toBe(source.value.length)
  })

  it('suit les changements de la source', () => {
    const source = ref(books.slice(0, 2))
    const { filtered } = useBookFilter(source, bookCategories)
    source.value = books.slice(0, 5)
    expect(filtered.value).toHaveLength(5)
  })
})
