<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import BookCard from './BookCard.vue'
import FilterChips from '@/components/ui/FilterChips.vue'
import { useBookFilter } from '@/composables/useBookFilter'
import { getBookCategories, getBooks } from '@/services/catalog'
import { pluralize } from '@/utils/format'

/** Catalogue complet : filtres par catégorie, fiches détaillées, affichage progressif. */
const INITIAL_COUNT = 12

const books = getBooks()
const { active, options, filtered, select } = useBookFilter(books, getBookCategories())
const showAll = ref(false)

watch(active, () => {
  showAll.value = false
})

const visibleBooks = computed(() =>
  showAll.value ? filtered.value : filtered.value.slice(0, INITIAL_COUNT),
)
const hiddenCount = computed(() => filtered.value.length - visibleBooks.value.length)
const resultLabel = computed(() => `${pluralize(filtered.value.length, 'titre')} dans cette sélection`)
</script>

<template>
  <div class="catalog">
    <div class="catalog__toolbar">
      <FilterChips
        label="Filtrer par catégorie"
        :options="options"
        :model-value="active"
        @update:model-value="select"
      />
      <p class="catalog__count" role="status">{{ resultLabel }}</p>
    </div>

    <ul class="catalog__grid">
      <li v-for="(book, index) in visibleBooks" :key="book.id" v-reveal="(index % 4) * 70">
        <BookCard :book="book" :level="2" />
      </li>
    </ul>

    <div v-if="hiddenCount > 0" class="catalog__more">
      <button type="button" class="catalog__more-btn" @click="showAll = true">
        Afficher {{ pluralize(hiddenCount, 'autre titre', 'autres titres') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.catalog {
  display: grid;
  gap: var(--space-6);
}

.catalog__toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding-block: var(--space-4);
  border-block: 1px solid var(--color-line);
}

.catalog__count {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.catalog__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 9.5rem), 1fr));
  gap: var(--space-7) var(--space-5);
  margin: 0;
  padding: 0;
  list-style: none;
}

.catalog__more {
  display: flex;
  justify-content: center;
}

.catalog__more-btn {
  padding: 0.85rem 1.4rem;
  border: var(--border-rule) solid var(--color-primary);
  border-radius: var(--radius-btn);
  background: transparent;
  color: var(--color-primary);
  font-size: var(--text-xs);
  font-weight: 650;
  letter-spacing: var(--tracking-button);
  text-transform: uppercase;
  transition: background-color var(--duration-fast) ease;
}

.catalog__more-btn:hover {
  background: var(--color-surface);
}

@media (min-width: 40rem) {
  .catalog__grid {
    grid-template-columns: repeat(auto-fill, minmax(12.5rem, 1fr));
    gap: var(--space-8) var(--space-6);
  }
}
</style>
