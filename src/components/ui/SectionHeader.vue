<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Identifiant du titre, pour aria-labelledby sur la section. */
    titleId: string
    eyebrow?: string
    title: string
    lead?: string
    align?: 'start' | 'center'
  }>(),
  { eyebrow: undefined, lead: undefined, align: 'start' },
)
</script>

<template>
  <header class="section-header" :class="`section-header--${align}`">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <h2 :id="titleId" class="section-header__title">
      <slot name="title">{{ title }}</slot>
    </h2>
    <p v-if="lead" class="section-header__lead">{{ lead }}</p>
    <slot />
  </header>
</template>

<style scoped>
.section-header {
  display: grid;
  gap: var(--space-4);
  max-width: 40rem;
}

.section-header--center {
  justify-items: center;
  margin-inline: auto;
  text-align: center;
}

.section-header__title {
  font-size: var(--text-2xl);
  font-weight: 360;
}

.section-header__title :deep(em) {
  color: var(--color-warm);
  font-weight: 300;
}

.section-header__lead {
  max-width: 54ch;
  color: var(--color-text-muted);
  font-size: var(--text-lg);
  line-height: 1.55;
}
</style>
