<script setup lang="ts">
import { allergenLabels } from '@/data/menu'
import { formatPrice } from '@/utils/format'
import type { MenuItem } from '@/types/catalog'

defineProps<{ item: MenuItem }>()
</script>

<template>
  <li class="menu-item">
    <p class="menu-item__line">
      <span class="menu-item__name">{{ item.name }}</span>
      <span class="menu-item__dots" aria-hidden="true"></span>
      <span class="menu-item__price">{{ formatPrice(item.price) }}</span>
    </p>
    <p class="menu-item__desc">
      {{ item.description }}
      <span v-if="item.allergens?.length" class="menu-item__allergens">
        <span class="visually-hidden">Allergènes :</span>
        <abbr
          v-for="allergen in item.allergens"
          :key="allergen"
          class="allergen"
          :title="allergenLabels[allergen].label"
          >{{ allergenLabels[allergen].short }}</abbr
        >
      </span>
    </p>
  </li>
</template>

<style scoped>
.menu-item {
  display: grid;
  gap: 0.15rem;
}

.menu-item__line {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
}

.menu-item__name {
  font-family: var(--font-serif);
  font-size: 1.08rem;
  line-height: 1.25;
}

.menu-item__dots {
  flex: 1;
  min-width: 1rem;
  border-bottom: 1.5px dotted currentColor;
  opacity: 0.45;
  transform: translateY(-0.25em);
}

.menu-item__price {
  color: var(--color-primary);
  font-weight: 650;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.menu-item__desc {
  color: var(--color-cafe-ink);
  font-size: var(--text-xs);
  line-height: 1.5;
}

.menu-item__allergens {
  display: inline-flex;
  gap: 0.25rem;
  margin-left: 0.35rem;
  vertical-align: 0.1em;
}

.allergen {
  padding: 0.15rem 0.3rem;
  border: 1px solid var(--color-cafe-ink);
  border-radius: var(--radius-xs);
  font-size: 0.6rem;
  font-weight: 650;
  letter-spacing: 0.06em;
  line-height: 1;
  text-decoration: none;
}
</style>
