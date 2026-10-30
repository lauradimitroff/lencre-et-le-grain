import { computed, ref, toValue, type MaybeRefOrGetter } from 'vue'
import type { Book, BookCategory, Option } from '@/types/catalog'

export type CategoryFilter = BookCategory | 'tous'

export interface FilterOption extends Option<CategoryFilter> {
  count: number
}

/**
 * Filtre par catégorie. Seules les catégories réellement présentes
 * sont proposées, avec leur nombre de titres.
 */
export function useBookFilter(
  source: MaybeRefOrGetter<Book[]>,
  categories: MaybeRefOrGetter<Option<BookCategory>[]>,
) {
  const active = ref<CategoryFilter>('tous')

  const options = computed<FilterOption[]>(() => {
    const list = toValue(source)
    const present = toValue(categories)
      .map((category) => ({
        ...category,
        count: list.filter((book) => book.category === category.value).length,
      }))
      .filter((category) => category.count > 0)

    return [{ value: 'tous', label: 'Tous', count: list.length }, ...present]
  })

  const filtered = computed(() => {
    const list = toValue(source)
    return active.value === 'tous' ? list : list.filter((book) => book.category === active.value)
  })

  function select(value: CategoryFilter) {
    active.value = value
  }

  return { active, options, filtered, select }
}
