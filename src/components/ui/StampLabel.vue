<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'warm' | 'forest' | 'kraft' }>(), { tone: 'warm' })
</script>

<template>
  <span class="stamp" :class="`stamp--${tone}`"><slot /></span>
</template>

<style scoped>
/* Étiquette « tamponnée » de la direction atelier */
.stamp {
  display: inline-block;
  padding: 0.3rem 0.5rem;
  border: var(--border-rule) solid currentColor;
  border-radius: var(--radius-xs);
  font-family: var(--font-sans);
  font-size: var(--text-2xs);
  font-weight: 650;
  letter-spacing: var(--tracking-label);
  line-height: 1;
  text-transform: uppercase;
  white-space: nowrap;
}

.stamp--warm {
  color: var(--color-warm);
}

.stamp--forest {
  color: var(--color-primary);
}

.stamp--kraft {
  color: var(--color-cafe-ink);
}
</style>
