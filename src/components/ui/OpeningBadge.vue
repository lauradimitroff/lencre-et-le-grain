<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { describeOpeningStatus, getOpeningStatus, type OpeningStatus } from '@/utils/opening'

/**
 * Pastille « Ouvert maintenant / Fermé » calculée dans le navigateur.
 * Le HTML pré-rendu ne contient qu'un emplacement vide de la même taille :
 * l'heure du build n'a aucun sens pour la personne qui visite, et cela évite
 * tout décalage entre rendu serveur et hydratation.
 */
withDefaults(defineProps<{ tone?: 'light' | 'dark' }>(), { tone: 'light' })

const status = ref<OpeningStatus | null>(null)
const text = computed(() => (status.value ? describeOpeningStatus(status.value) : null))
let timer: ReturnType<typeof setInterval> | undefined

function refresh() {
  status.value = getOpeningStatus(new Date())
}

onMounted(() => {
  refresh()
  timer = setInterval(refresh, 60_000)
})

onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <p
    class="opening"
    :class="[
      `opening--${tone}`,
      {
        'is-ready': text,
        'is-open': status?.state === 'open',
        'is-soon': status?.state === 'open' && status.closingSoon,
      },
    ]"
  >
    <template v-if="text">
      <span class="opening__dot" aria-hidden="true"></span>
      <strong>{{ text.label }}</strong>
      <span class="opening__detail">· {{ text.detail }}</span>
    </template>
  </p>
</template>

<style scoped>
.opening {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 2rem;
  padding: 0.3rem 0.8rem 0.3rem 0.65rem;
  border: 1px solid transparent;
  border-radius: var(--radius-pill);
  font-size: var(--text-xs);
  line-height: 1.2;
  opacity: 0;
  transition: opacity var(--duration-base) var(--ease-out);
}

.opening.is-ready {
  opacity: 1;
}

.opening--light {
  border-color: var(--color-line-strong);
  background: var(--color-surface);
  color: var(--color-text);
}

.opening--dark {
  border-color: rgb(243 227 208 / 0.4);
  color: var(--cream-100);
}

.opening strong {
  font-weight: 650;
}

.opening__detail {
  opacity: 0.85;
}

.opening__dot {
  position: relative;
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.45;
}

/* Ouvert : point plein qui pulse doucement */
.is-open .opening__dot {
  background: var(--color-warm);
  opacity: 1;
}

.opening--dark.is-open .opening__dot {
  background: var(--kraft-400);
}

.is-open .opening__dot::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: inherit;
  animation: opening-pulse 2.4s var(--ease-out) infinite;
}

.is-soon .opening__dot::after {
  animation-duration: 1.2s;
}

@keyframes opening-pulse {
  from {
    opacity: 0.7;
    transform: scale(1);
  }

  to {
    opacity: 0;
    transform: scale(2.6);
  }
}

@media (prefers-reduced-motion: reduce) {
  .is-open .opening__dot::after {
    animation: none;
  }
}
</style>
