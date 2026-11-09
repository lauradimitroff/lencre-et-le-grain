<script setup lang="ts">
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
  <section class="menu-page section" aria-labelledby="menu-page-title">
    <div class="container menu-page__inner">
      <nav aria-label="Fil d'Ariane" class="menu-page__crumbs">
        <ol>
          <li><RouterLink to="/">Accueil</RouterLink></li>
          <li aria-current="page">La carte</li>
        </ol>
      </nav>

      <header class="menu-page__head">
        <p class="eyebrow">Le café</p>
        <h1 id="menu-page-title" class="menu-page__title">La carte, <em>en entier</em></h1>
        <p class="menu-page__lead">
          Espresso, méthodes douces, boissons de saison et pâtisseries sorties du four le matin.
          La carte se consulte ici et se commande au comptoir.
        </p>
      </header>

      <MenuCard :sections="menu" title="Toute la carte" :level="2" />

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

.menu-page__crumbs ol {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  color: var(--color-text-muted);
  font-size: var(--text-xs);
  list-style: none;
}

.menu-page__crumbs li + li::before {
  content: '/';
  margin-right: var(--space-2);
  opacity: 0.6;
}

.menu-page__crumbs a {
  color: var(--color-primary);
}

.menu-page__head {
  display: grid;
  gap: var(--space-4);
  max-width: 44rem;
}

.menu-page__title {
  font-size: var(--text-3xl);
  font-weight: 360;
  line-height: var(--leading-tight);
}

.menu-page__title em {
  color: var(--color-warm);
  font-weight: 300;
}

.menu-page__lead {
  color: var(--color-text-muted);
  font-size: var(--text-lg);
}
</style>
