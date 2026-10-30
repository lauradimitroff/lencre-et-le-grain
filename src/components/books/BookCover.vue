<script setup lang="ts">
import type { Book } from '@/types/catalog'

/**
 * Couverture générée à partir des données du livre (couleurs + motif).
 * Décorative : le titre et l'auteur sont déjà lus dans la fiche.
 */
defineProps<{ book: Book; size?: 'md' | 'sm' }>()
</script>

<template>
  <div
    class="cover"
    :class="`cover--${size ?? 'md'}`"
    :style="{ backgroundColor: book.cover.background, color: book.cover.ink }"
    aria-hidden="true"
  >
    <svg class="cover__motif" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2.5">
      <template v-if="book.cover.motif === 'waves'">
        <path d="M0 58 Q25 44 50 58 T100 58 M0 72 Q25 58 50 72 T100 72 M0 86 Q25 72 50 86 T100 86" />
      </template>
      <template v-else-if="book.cover.motif === 'arches'">
        <path d="M14 100 V62 A16 16 0 0 1 46 62 V100 M54 100 V62 A16 16 0 0 1 86 62 V100" />
      </template>
      <template v-else-if="book.cover.motif === 'sun'">
        <circle cx="50" cy="64" r="22" fill="currentColor" stroke="none" opacity="0.28" />
        <path d="M6 86 H94" />
      </template>
      <template v-else-if="book.cover.motif === 'leaf'">
        <path d="M50 96 C22 74 22 40 50 14 C78 40 78 74 50 96 Z M50 96 V28" />
      </template>
      <template v-else-if="book.cover.motif === 'grid'">
        <path d="M20 40 H80 M20 55 H80 M20 70 H80 M20 85 H80 M35 40 V85 M50 40 V85 M65 40 V85" opacity="0.7" />
      </template>
      <template v-else>
        <path d="M36 88 C30 72 46 66 40 50 M54 88 C48 72 64 66 58 50 M22 96 H78" />
      </template>
    </svg>
    <span class="cover__title">{{ book.title }}</span>
    <span class="cover__author">{{ book.author }}</span>
  </div>
</template>

<style scoped>
.cover {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  aspect-ratio: 2 / 3;
  width: 100%;
  overflow: hidden;
  padding: 12% 11%;
  border-radius: 3px 7px 7px 3px;
  /* Cadre intérieur (direction atelier) + dos et ombre du livre */
  outline: 1.5px solid currentColor;
  outline-offset: -7px;
  box-shadow:
    inset 7px 0 0 rgb(0 0 0 / 0.07),
    inset 8px 0 0 rgb(255 255 255 / 0.12),
    var(--shadow-soft);
  container-type: inline-size;
}

.cover__motif {
  position: absolute;
  left: 10%;
  bottom: 22%;
  width: 80%;
  opacity: 0.55;
}

.cover__title {
  position: relative;
  font-family: var(--font-serif);
  font-size: clamp(0.85rem, 12cqi, 1.6rem);
  font-weight: 400;
  line-height: 1.08;
  text-wrap: balance;
}

.cover__author {
  position: relative;
  font-size: clamp(0.5rem, 5.4cqi, 0.72rem);
  font-weight: 650;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.cover--sm {
  outline-offset: -5px;
}
</style>
