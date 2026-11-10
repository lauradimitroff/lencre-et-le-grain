<script setup lang="ts">
import NewsletterForm from './NewsletterForm.vue'
</script>

<template>
  <section id="newsletter" class="newsletter section" aria-labelledby="newsletter-title">
    <div class="container newsletter__inner">
      <div class="newsletter__text">
        <p class="eyebrow">La lettre du mardi</p>
        <h2 id="newsletter-title" class="newsletter__title">
          Nouveautés en rayon, <em>origine du moment</em> au filtre
        </h2>
        <p class="newsletter__lead">
          Une fois par mois, nos coups de cœur de lecture, le café de la semaine et les dates des
          rencontres en boutique.
        </p>
      </div>
      <NewsletterForm class="newsletter__form" />
    </div>
  </section>
</template>

<style scoped>
.newsletter {
  background: var(--color-accent);
  border-top: var(--border-rule) solid var(--color-primary);
}

.newsletter__inner {
  display: grid;
  gap: var(--space-6);
  align-items: center;
}

.newsletter__text {
  display: grid;
  gap: var(--space-4);
}

.newsletter .eyebrow {
  color: var(--color-primary);
}

.newsletter__title {
  font-size: var(--text-2xl);
  font-weight: 360;
}

.newsletter__title em {
  color: var(--coffee-900);
  font-weight: 300;
}

.newsletter__lead {
  max-width: 48ch;
  color: var(--ink-900);
  font-size: var(--text-lead);
}

.newsletter :deep(.newsletter-form__hint) {
  color: var(--ink-900);
}

@media (min-width: 56rem) {
  .newsletter__inner {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-8);
  }
}
</style>
