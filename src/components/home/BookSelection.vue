<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import BookCard from '@/components/books/BookCard.vue'
import FilterChips from '@/components/ui/FilterChips.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { useBookFilter } from '@/composables/useBookFilter'
import { getBookCategories, getBooks } from '@/services/catalog'
import { pluralize } from '@/utils/format'

const INITIAL_COUNT = 8

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
  <section id="librairie" class="selection section" aria-labelledby="selection-title">
    <div class="container selection__inner">
      <SectionHeader
        title-id="selection-title"
        eyebrow="La librairie"
        title="La sélection d'automne"
        :lead="`${books.length} livres pour les soirées qui raccourcissent : sorcières, manoirs, forêts qui murmurent et fantasy douce comme un latte. Tous sont à feuilleter sur place, près de la machine à café.`"
      >
        <p class="selection__note">
          Les couvertures sont des illustrations créées pour le site, pas celles des éditeurs.
        </p>
      </SectionHeader>

      <div class="selection__toolbar">
        <FilterChips
          label="Filtrer par catégorie"
          :options="options"
          :model-value="active"
          @update:model-value="select"
        />
        <p class="selection__count" role="status">{{ resultLabel }}</p>
      </div>

      <ul class="selection__grid">
        <li v-for="book in visibleBooks" :key="book.id">
          <BookCard :book="book" />
        </li>
      </ul>

      <div v-if="hiddenCount > 0" class="selection__more">
        <button type="button" class="selection__more-btn" @click="showAll = true">
          Afficher {{ pluralize(hiddenCount, 'autre titre', 'autres titres') }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.selection {
  background: var(--color-library);
  border-block: var(--border-rule) solid var(--color-primary);
}

.selection__inner {
  display: grid;
  gap: var(--space-6);
}

.selection__toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding-block: var(--space-4);
  border-block: 1px solid var(--color-line);
}

.selection__note {
  color: var(--color-text-muted);
  font-size: var(--text-xs);
  font-style: italic;
}

.selection__count {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.selection__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 9.5rem), 1fr));
  gap: var(--space-7) var(--space-5);
  margin: 0;
  padding: 0;
  list-style: none;
}

.selection__more {
  display: flex;
  justify-content: center;
}

.selection__more-btn {
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

.selection__more-btn:hover {
  background: var(--color-surface);
}

@media (min-width: 40rem) {
  .selection__grid {
    grid-template-columns: repeat(auto-fill, minmax(12.5rem, 1fr));
    gap: var(--space-8) var(--space-6);
  }
}
</style>
