<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue'
import BookSelection from '@/components/home/BookSelection.vue'
import CafeSection from '@/components/home/CafeSection.vue'
import SpiritSection from '@/components/home/SpiritSection.vue'
import PairingsSection from '@/components/home/PairingsSection.vue'
import NewsletterSection from '@/components/home/NewsletterSection.vue'
import { usePageMeta } from '@/composables/usePageMeta'

usePageMeta({
  title: "L'Encre & le Grain · Café-librairie (boutique fictive)",
  description:
    "Café de spécialité imaginaire avec un coin librairie : carte 100 % végétale, sélection de livres et accords livre-café. Projet de démonstration pour un portfolio.",
  path: '/',
})
</script>

<template>
  <HeroSection />
  <CafeSection />
  <BookSelection />
  <SpiritSection />
  <PairingsSection />
  <NewsletterSection />
</template>
