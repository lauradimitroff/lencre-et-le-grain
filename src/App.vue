<script setup lang="ts">
import { useHead } from '@unhead/vue'
import DemoBanner from '@/components/layout/DemoBanner.vue'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'

useHead({
  htmlAttrs: { lang: 'fr' },
  titleTemplate: (title) => (title ? title : "L'Encre & le Grain"),
})
</script>

<template>
  <a class="skip-link" href="#contenu">Aller au contenu</a>
  <DemoBanner />
  <SiteHeader />
  <main id="contenu" tabindex="-1">
    <RouterView />
  </main>
  <SiteFooter />
</template>

<style scoped>
.skip-link {
  position: absolute;
  top: var(--space-2);
  left: var(--space-2);
  z-index: 100;
  padding: var(--space-3) var(--space-4);
  background: var(--color-primary);
  color: var(--color-on-primary);
  font-weight: 600;
  border-radius: var(--radius-btn);
  transform: translateY(-200%);
  transition: transform var(--duration-fast) ease;
}

.skip-link:focus {
  transform: none;
}

main:focus {
  outline: none;
}
</style>
