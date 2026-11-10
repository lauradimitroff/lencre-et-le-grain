<script setup lang="ts">
import { computed, ref } from 'vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import AllergenFilter from '@/components/cafe/AllergenFilter.vue'
import MenuCard from '@/components/cafe/MenuCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { filterMenuByAllergens, getMenu } from '@/services/catalog'
import { pluralize } from '@/utils/format'
import type { Allergen } from '@/types/catalog'

const menu = getMenu()
const total = menu.reduce((sum, section) => sum + section.items.length, 0)

const excluded = ref<Allergen[]>([])
const visibleMenu = computed(() => filterMenuByAllergens(menu, excluded.value))
const visibleCount = computed(() =>
  visibleMenu.value.reduce((sum, section) => sum + section.items.length, 0),
)
const countLabel = computed(() =>
  excluded.value.length === 0
    ? `Toute la carte : ${pluralize(total, 'article')}`
    : `${pluralize(visibleCount.value, 'article')} sur ${total}`,
)

usePageMeta({
  title: "La carte du café · L'Encre & le Grain (boutique fictive)",
  description:
    'Carte complète et 100 % végétale du café-librairie imaginaire : espresso, méthodes douces, boissons de saison et pâtisseries maison, allergènes indiqués.',
  path: '/carte',
  ogImage: 'carte',
})
</script>

<template>
  <PageHeader title-id="menu-page-title" eyebrow="Le café" crumb="La carte" tone="kraft">
    <template #title>La carte</template>
    <p>
      Espresso, méthodes douces, boissons de saison et pâtisseries sorties du four le matin. La
      carte se consulte ici et se commande au comptoir.
    </p>
  </PageHeader>

  <section class="menu-page section" aria-labelledby="menu-page-title">
    <div class="container menu-page__inner">
      <div class="menu-page__filter">
        <p class="menu-page__filter-label">Allergies, intolérances ?</p>
        <AllergenFilter v-model="excluded" />
        <p class="menu-page__count" role="status">{{ countLabel }}</p>
        <p class="menu-page__warning">
          Filtre indicatif : en cas d'allergie, l'équipe vous renseigne au comptoir sur chaque
          préparation et les risques de traces.
        </p>
      </div>

      <MenuCard :sections="visibleMenu" title="Nos boissons &amp; pâtisseries" :level="2" />

      <div class="menu-page__back">
        <BaseButton :to="{ path: '/', hash: '#cafe' }" variant="secondary">Retour à l'accueil</BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.menu-page__inner {
  display: grid;
  gap: var(--space-6);
}

.menu-page__filter {
  display: grid;
  gap: var(--space-3);
}

.menu-page__filter-label {
  color: var(--color-warm);
  font-size: var(--text-2xs);
  font-weight: 650;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
}

.menu-page__count {
  color: var(--color-text);
  font-size: var(--text-sm);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.menu-page__warning {
  max-width: 62ch;
  color: var(--color-text-muted);
  font-size: var(--text-xs);
}
</style>
