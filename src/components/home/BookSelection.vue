<script setup lang="ts">
import BookCard from '@/components/books/BookCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { getBooks, getFeaturedBooks } from '@/services/catalog'

/** Accueil : quelques coups de cœur, sans détails ; le catalogue complet est sur /librairie. */
const featured = getFeaturedBooks()
const total = getBooks().length
</script>

<template>
  <section id="librairie" class="selection section" aria-labelledby="selection-title">
    <div class="container selection__inner">
      <SectionHeader
        title-id="selection-title"
        eyebrow="La librairie"
        title="Nos coups de cœur d'automne"
        lead="Sorcières, manoirs, forêts qui murmurent et fantasy douce comme un latte : quelques livres que l'on glisse volontiers entre deux tasses."
      />

      <ul class="selection__grid">
        <li v-for="(book, index) in featured" :key="book.id" v-reveal="index * 70">
          <BookCard :book="book" compact />
        </li>
      </ul>

      <div class="selection__more">
        <BaseButton to="/librairie">Voir toute la sélection</BaseButton>
        <p class="selection__count">{{ total }} livres, avec filtres par genre</p>
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
  gap: var(--space-7);
}

.selection__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6) var(--space-5);
  margin: 0;
  padding: 0;
  list-style: none;
}

.selection__more {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3) var(--space-5);
}

.selection__count {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

@media (min-width: 56rem) {
  .selection__grid {
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-7) var(--space-6);
  }
}
</style>
