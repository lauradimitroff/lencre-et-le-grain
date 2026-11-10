<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Mot qui défile verticalement, à la fin d'un titre.
 * - Le premier mot est celui du HTML pré-rendu et celui que lisent les
 *   lecteurs d'écran : le titre reste stable pour eux.
 * - Tous les mots occupent la même cellule : la largeur est celle du plus long,
 *   le titre ne saute donc pas d'un mot à l'autre.
 * - Le défilement tourne en boucle, mais seulement lorsque le titre est à
 *   l'écran, et ne démarre pas en mouvement réduit.
 */
const props = withDefaults(
  defineProps<{
    words: string[]
    /** Durée d'affichage de chaque mot, en millisecondes. */
    interval?: number
  }>(),
  { interval: 2400 },
)

const root = ref<HTMLElement | null>(null)
const current = ref(0)
const previous = ref<number | null>(null)
let timer: ReturnType<typeof setInterval> | undefined
let observer: IntersectionObserver | undefined

function next() {
  previous.value = current.value
  current.value = (current.value + 1) % props.words.length
}

function start() {
  if (timer) return
  timer = setInterval(next, props.interval)
}

function stop() {
  clearInterval(timer)
  timer = undefined
}

onMounted(() => {
  if (props.words.length < 2) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (typeof IntersectionObserver === 'undefined' || !root.value) return

  observer = new IntersectionObserver(([entry]) => (entry?.isIntersecting ? start() : stop()), {
    threshold: 0.6,
  })
  observer.observe(root.value)
})

onBeforeUnmount(() => {
  stop()
  observer?.disconnect()
})
</script>

<template>
  <span ref="root" class="rotating">
    <span class="visually-hidden">{{ words[0] }}</span>
    <span class="rotating__track" aria-hidden="true">
      <span
        v-for="(word, index) in words"
        :key="word"
        class="rotating__word"
        :class="{ 'is-current': index === current, 'is-previous': index === previous }"
        >{{ word }}</span
      >
    </span>
  </span>
</template>

<style scoped>
.rotating {
  display: inline-block;
}

.rotating__track {
  display: inline-grid;
  /*
   * De l'air autour des mots pour ne pas rogner l'italique : la boucle du « g »
   * de gourmands descend sous la ligne et déborde à gauche de la lettre, et les
   * fins de mots débordent à droite. Les marges négatives compensent pour que
   * le titre ne bouge pas.
   */
  padding: 0 0.15em 0.3em 0.2em;
  margin: 0 -0.15em -0.3em -0.2em;
  overflow: hidden;
  vertical-align: bottom;
}

.rotating__word {
  grid-area: 1 / 1;
  color: var(--color-warm);
  font-style: italic;
  font-weight: 320;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(100%);
  transition:
    transform 560ms var(--ease-out),
    opacity 560ms var(--ease-out);
}

.rotating__word.is-current {
  opacity: 1;
  transform: none;
}

.rotating__word.is-previous {
  opacity: 0;
  transform: translateY(-100%);
}

@media (prefers-reduced-motion: reduce) {
  .rotating__word {
    transition: none;
  }
}
</style>
