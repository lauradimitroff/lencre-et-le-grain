<script setup lang="ts">
import { allergenLabels } from '@/data/menu'
import type { Allergen } from '@/types/catalog'

/** Boutons « Sans gluten », « Sans soja »… cumulables. */
const excluded = defineModel<Allergen[]>({ required: true })

const allergens = Object.entries(allergenLabels) as [Allergen, { label: string }][]

function toggle(allergen: Allergen) {
  excluded.value = excluded.value.includes(allergen)
    ? excluded.value.filter((value) => value !== allergen)
    : [...excluded.value, allergen]
}
</script>

<template>
  <div class="allergen-filter" role="group" aria-label="Masquer les articles contenant">
    <button
      v-for="[key, allergen] in allergens"
      :key="key"
      type="button"
      class="allergen-filter__chip"
      :aria-pressed="excluded.includes(key)"
      @click="toggle(key)"
    >
      <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.4" />
        <path d="M3.5 12.5l9-9" stroke="currentColor" stroke-width="1.4" />
      </svg>
      Sans {{ allergen.label.toLowerCase() }}
    </button>
    <button
      v-if="excluded.length"
      type="button"
      class="allergen-filter__reset"
      @click="excluded = []"
    >
      Tout afficher
    </button>
  </div>
</template>

<style scoped>
.allergen-filter {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
}

.allergen-filter__chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 2.5rem;
  padding: 0.5rem 0.95rem;
  border: 1px solid rgb(78 48 32 / 0.32);
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--color-text);
  font-size: var(--text-sm);
  font-weight: 550;
  cursor: pointer;
  transition:
    background-color var(--duration-fast) ease,
    border-color var(--duration-fast) ease,
    color var(--duration-fast) ease;
}

.allergen-filter__chip:hover {
  border-color: var(--color-primary);
  background: var(--color-surface);
}

.allergen-filter__chip svg {
  opacity: 0.55;
}

.allergen-filter__chip[aria-pressed='true'] {
  border-color: var(--color-primary);
  background: var(--color-primary);
  color: var(--color-on-primary);
}

.allergen-filter__chip[aria-pressed='true'] svg {
  opacity: 1;
}

.allergen-filter__reset {
  padding: var(--space-2);
  border: 0;
  background: none;
  color: var(--color-primary);
  font-size: var(--text-sm);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}
</style>
