<script setup lang="ts">
import { computed } from 'vue'
import BookCover from './BookCover.vue'
import StampLabel from '@/components/ui/StampLabel.vue'
import { getBookCategories } from '@/services/catalog'
import { formatPrice } from '@/utils/format'
import type { Book } from '@/types/catalog'

const props = withDefaults(
  defineProps<{
    book: Book
    /** Version courte (accueil) : titre, auteur et résumé, sans genre, détails ni prix. */
    compact?: boolean
    /** Niveau du titre de la fiche selon la page (h2 sous un h1, h3 sous un h2). */
    level?: 2 | 3
  }>(),
  { compact: false, level: 3 },
)

const meta = computed(() =>
  [props.book.publisher, props.book.year, props.book.pages && `${props.book.pages} pages`]
    .filter(Boolean)
    .join(' · '),
)

const categoryLabel = computed(
  () => getBookCategories().find((c) => c.value === props.book.category)?.label ?? '',
)
</script>

<template>
  <article class="book-card" :class="{ 'book-card--compact': compact }">
    <BookCover :book="book" class="book-card__cover" />
    <div class="book-card__body">
      <p v-if="!compact" class="book-card__tags">
        <StampLabel>{{ categoryLabel }}</StampLabel>
        <StampLabel v-if="book.isNew" tone="brown">Nouveauté</StampLabel>
      </p>
      <component :is="`h${level}`" class="book-card__title">{{ book.title }}</component>
      <p v-if="book.series" class="book-card__series">{{ book.series }}</p>
      <p class="book-card__author">{{ book.author }}</p>
      <p class="book-card__summary">{{ book.summary }}</p>
      <template v-if="!compact">
        <p class="book-card__meta">{{ meta }}</p>
        <p class="book-card__footer">
          <span class="book-card__price">{{ formatPrice(book.price) }}</span>
          <span class="book-card__availability">Disponible en boutique</span>
        </p>
      </template>
    </div>
  </article>
</template>

<style scoped>
.book-card {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: var(--space-4);
  height: 100%;
}

.book-card__cover {
  transition:
    transform var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out);
}

.book-card:hover .book-card__cover {
  transform: translateY(-4px) rotate(-0.6deg);
  box-shadow:
    inset 7px 0 0 rgb(0 0 0 / 0.07),
    var(--shadow-lift);
}

.book-card__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.book-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
}

.book-card__title {
  font-size: var(--text-lg);
  font-weight: 420;
  line-height: 1.15;
}

.book-card__series {
  color: var(--color-warm);
  font-family: var(--font-serif);
  font-size: var(--text-sm);
  font-style: italic;
}

.book-card__author {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.book-card__summary {
  display: none;
  margin-top: var(--space-2);
  font-size: var(--text-sm);
  line-height: 1.55;
}

.book-card__meta {
  margin-block: var(--space-2) var(--space-3);
  color: var(--color-text-muted);
  font-size: var(--text-xs);
}

.book-card__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-1) var(--space-3);
  margin-top: auto;
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-line);
}

.book-card__price {
  color: var(--color-warm);
  font-weight: 650;
  font-variant-numeric: tabular-nums;
}

.book-card__availability {
  color: var(--color-text-muted);
  font-size: var(--text-xs);
}

/* Version courte : le résumé reste visible partout, limité à quatre lignes */
.book-card--compact .book-card__summary {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  line-clamp: 4;
}

@media (min-width: 40rem) {
  .book-card__summary {
    display: block;
  }

  .book-card--compact .book-card__summary {
    display: -webkit-box;
  }
}
</style>
