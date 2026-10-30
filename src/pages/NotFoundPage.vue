<script setup lang="ts">
import { useHead } from '@unhead/vue'
import BaseButton from '@/components/ui/BaseButton.vue'

useHead({
  title: "Page introuvable · L'Encre & le Grain",
  meta: [{ name: 'robots', content: 'noindex' }],
})
</script>

<template>
  <section class="not-found container--narrow" aria-labelledby="not-found-title">
    <p class="eyebrow">Erreur 404</p>
    <h1 id="not-found-title">Cette page s'est égarée entre deux rayonnages</h1>
    <p>L'adresse est peut-être mal saisie, ou la page n'existe plus.</p>
    <BaseButton to="/">Revenir à l'accueil</BaseButton>
  </section>
</template>

<style scoped>
.not-found {
  display: grid;
  gap: var(--space-5);
  justify-items: start;
  padding-block: var(--space-section);
}

.not-found h1 {
  font-size: var(--text-2xl);
  font-weight: 360;
}
</style>
