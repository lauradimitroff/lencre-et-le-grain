<script setup lang="ts">
import MenuItemRow from './MenuItemRow.vue'
import { allergenLabels } from '@/data/menu'
import type { MenuSectionWithItems } from '@/services/catalog'

defineProps<{ sections: MenuSectionWithItems[] }>()
</script>

<template>
  <div class="menu-card">
    <div class="menu-card__head">
      <div>
        <h3 class="menu-card__title">La carte du café</h3>
        <p class="menu-card__intro">
          Tout est végétal, des laits aux pâtisseries. On commande et on règle au comptoir.
        </p>
      </div>
      <p class="menu-card__stamp" aria-hidden="true"><span><b>100 %</b>végétal</span></p>
    </div>

    <div class="menu-card__cols">
      <section
        v-for="section in sections"
        :key="section.id"
        class="menu-card__section"
        :aria-labelledby="`menu-${section.id}`"
      >
        <h4 :id="`menu-${section.id}`" class="menu-card__section-title">{{ section.title }}</h4>
        <p v-if="section.note" class="menu-card__note">{{ section.note }}</p>
        <ul class="menu-card__items">
          <MenuItemRow v-for="item in section.items" :key="item.id" :item="item" />
        </ul>
      </section>
    </div>

    <div class="menu-card__foot">
      <dl class="menu-card__legend" aria-label="Légende des allergènes">
        <div v-for="(allergen, key) in allergenLabels" :key="key">
          <dt>{{ allergen.short }}</dt>
          <dd>{{ allergen.label }}</dd>
        </div>
      </dl>
      <p>Carte et prix fictifs, créés pour la démonstration.</p>
    </div>
  </div>
</template>

<style scoped>
/* Univers café : fiche kraft encadrée de vert forêt */
.menu-card {
  display: grid;
  gap: var(--space-6);
  padding: clamp(1.25rem, 0.9rem + 2.2vw, 3rem);
  border: var(--border-rule) solid var(--color-primary);
  border-radius: var(--radius-btn);
  background: var(--color-cafe);
  color: var(--ink-900);
}

.menu-card__head {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: space-between;
  gap: var(--space-4) var(--space-6);
  padding-bottom: var(--space-5);
  border-bottom: var(--border-rule) solid var(--color-primary);
}

.menu-card__title {
  font-size: var(--text-2xl);
  font-weight: 360;
}

.menu-card__intro {
  max-width: 44ch;
  margin-top: var(--space-2);
  color: var(--color-cafe-ink);
  font-size: var(--text-sm);
}

.menu-card__stamp {
  display: grid;
  place-items: center;
  width: 6.5rem;
  height: 6.5rem;
  border: var(--border-rule) solid var(--color-primary);
  border-radius: 50%;
  color: var(--color-primary);
  font-size: var(--text-2xs);
  font-weight: 650;
  letter-spacing: 0.12em;
  line-height: 1.25;
  text-align: center;
  text-transform: uppercase;
  transform: rotate(-8deg);
}

.menu-card__stamp b {
  display: block;
  font-family: var(--font-serif);
  font-size: 1.7rem;
  font-style: italic;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 1;
  text-transform: none;
}

.menu-card__cols {
  columns: 2 22rem;
  column-gap: var(--space-8);
}

.menu-card__section {
  display: grid;
  gap: var(--space-3);
  margin-bottom: var(--space-7);
  break-inside: avoid;
}

.menu-card__section:last-child {
  margin-bottom: 0;
}

.menu-card__section-title {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--color-primary);
  font-family: var(--font-sans);
  font-size: var(--text-2xs);
  font-weight: 650;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.menu-card__section-title::after {
  content: '';
  flex: 1;
  height: var(--border-rule);
  background: var(--color-primary);
  opacity: 0.45;
}

.menu-card__note {
  margin-top: calc(var(--space-1) * -1);
  color: var(--color-cafe-ink);
  font-size: var(--text-xs);
  font-style: italic;
}

.menu-card__items {
  display: grid;
  gap: var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;
}

.menu-card__foot {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-3) var(--space-6);
  padding-top: var(--space-4);
  border-top: var(--border-rule) solid var(--color-primary);
  color: var(--color-cafe-ink);
  font-size: var(--text-xs);
}

.menu-card__legend {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2) var(--space-5);
  margin: 0;
}

.menu-card__legend div {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.menu-card__legend dt {
  padding: 0.15rem 0.3rem;
  border: 1px solid var(--color-cafe-ink);
  border-radius: var(--radius-xs);
  font-size: 0.6rem;
  font-weight: 650;
  line-height: 1;
}

.menu-card__legend dd {
  margin: 0;
}
</style>
