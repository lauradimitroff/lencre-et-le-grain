<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'dark' | 'light' }>(), { tone: 'dark' })
</script>

<template>
  <span class="logo" :class="`logo--${tone}`">
    L'Encre <span class="logo__stamp" aria-hidden="true">&amp;</span
    ><span class="visually-hidden">&amp;</span> le Grain
  </span>
</template>

<style scoped>
.logo {
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
  font-family: var(--font-serif);
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.005em;
  white-space: nowrap;
}

.logo--dark {
  color: var(--color-primary);
  --stamp: var(--color-warm);
}

.logo--light {
  color: var(--cream-50);
  --stamp: var(--kraft-400);
}

/* L'esperluette italique (direction A) dans le tampon circulaire (direction B) */
.logo__stamp {
  display: inline-grid;
  place-items: center;
  width: 1.15em;
  height: 1.15em;
  padding-bottom: 0.06em;
  border: 1.5px solid var(--stamp);
  border-radius: 50%;
  color: var(--stamp);
  font-size: 0.82em;
  font-style: italic;
  font-weight: 300;
}
</style>
