<script setup lang="ts">
import PageHeader from '@/components/layout/PageHeader.vue'
import BookCatalog from '@/components/books/BookCatalog.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { getBooks } from '@/services/catalog'

const total = getBooks().length

usePageMeta({
  title: "La sélection de livres · L'Encre & le Grain (boutique fictive)",
  description:
    "Toute la sélection d'automne du café-librairie imaginaire : fantasy, gothique, romance, BD et jeunesse, à filtrer par genre. Livres réels, prix indicatifs.",
  path: '/librairie',
  ogImage: 'librairie',
})
</script>

<template>
  <PageHeader
    title-id="library-title"
    eyebrow="Le coin librairie"
    crumb="Le coin librairie"
    note="Les livres existent vraiment ; les prix sont indicatifs. Les couvertures sont des illustrations créées pour le site, pas celles des éditeurs."
  >
    <template #title>La sélection <em>d'automne</em></template>
    <p>
      {{ total }} livres pour les soirées qui raccourcissent : sorcières, manoirs et fantasy douce
      comme un latte, à feuilleter sur place.
    </p>
  </PageHeader>

  <section class="library section" aria-labelledby="library-title">
    <div class="container library__inner">
      <BookCatalog />
    </div>
  </section>
</template>

<style scoped>
.library__inner {
  display: grid;
  gap: var(--space-6);
}
</style>
