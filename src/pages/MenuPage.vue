<script setup lang="ts">
import PageHeader from '@/components/layout/PageHeader.vue'
import MenuCard from '@/components/cafe/MenuCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { getMenu } from '@/services/catalog'

const menu = getMenu()

usePageMeta({
  title: "La carte du café · L'Encre & le Grain (boutique fictive)",
  description:
    'Carte complète et 100 % végétale du café-librairie imaginaire : espresso, méthodes douces, boissons de saison et pâtisseries maison, allergènes indiqués.',
  path: '/carte',
})
</script>

<template>
  <PageHeader title-id="menu-page-title" eyebrow="Le café" crumb="Le café" tone="kraft">
    <template #title>La carte</template>
    <p>
      Espresso, méthodes douces, boissons de saison et pâtisseries sorties du four le matin. La
      carte se consulte ici et se commande au comptoir.
    </p>
  </PageHeader>

  <section class="menu-page section" aria-labelledby="menu-page-title">
    <div class="container menu-page__inner">
      <MenuCard :sections="menu" title="Nos boissons &amp; pâtisseries" :level="2" />

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
</style>
