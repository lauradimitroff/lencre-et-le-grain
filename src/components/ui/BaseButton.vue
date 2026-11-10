<script setup lang="ts">
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

const props = withDefaults(
  defineProps<{
    /** Lien interne (RouterLink). */
    to?: RouteLocationRaw
    /** Lien externe. */
    href?: string
    variant?: 'primary' | 'secondary'
    type?: 'button' | 'submit'
  }>(),
  { variant: 'primary', type: 'button', to: undefined, href: undefined },
)

const tag = computed(() => (props.to ? 'RouterLink' : props.href ? 'a' : 'button'))
</script>

<template>
  <RouterLink v-if="tag === 'RouterLink' && to" :to="to" class="btn" :class="`btn--${variant}`">
    <slot />
  </RouterLink>
  <a v-else-if="tag === 'a'" :href="href" class="btn" :class="`btn--${variant}`">
    <slot />
  </a>
  <button v-else :type="type" class="btn" :class="`btn--${variant}`">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: 2.875rem;
  padding: 0.85rem 1.4rem;
  border: var(--border-rule) solid var(--color-primary);
  border-radius: var(--radius-btn);
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 650;
  letter-spacing: var(--tracking-button);
  line-height: 1;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    background-color var(--duration-fast) ease,
    border-color var(--duration-fast) ease,
    color var(--duration-fast) ease,
    transform var(--duration-fast) var(--ease-out);
}

.btn:active {
  transform: translateY(1px);
}

.btn--primary {
  background: var(--color-primary);
  color: var(--color-on-primary);
}

.btn--primary:hover {
  background: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
  color: var(--color-on-primary);
}

.btn--secondary {
  background: transparent;
  color: var(--color-primary);
}

.btn--secondary:hover {
  background: var(--color-library);
  color: var(--color-primary);
}
</style>
