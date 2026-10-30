<script setup lang="ts">
import { computed } from 'vue'
import { unsplashUrl, type Photo } from '@/data/images'

const props = withDefaults(
  defineProps<{
    photo: Photo
    /** Proportions largeur / hauteur, ex. 4 / 5. */
    ratio: number
    /** Attribut sizes, à adapter à la mise en page. */
    sizes?: string
    widths?: number[]
    /** Image visible dès l'arrivée (hero) : chargement prioritaire. */
    priority?: boolean
  }>(),
  { sizes: '100vw', widths: () => [480, 768, 1080, 1440], priority: false },
)

const sources = computed(() => {
  const heightFor = (width: number) => Math.round(width / props.ratio)
  const largest = props.widths[props.widths.length - 1] ?? 1080
  const fallback = props.widths[Math.min(2, props.widths.length - 1)] ?? largest

  return {
    src: unsplashUrl(props.photo, fallback, heightFor(fallback)),
    srcset: props.widths.map((w) => `${unsplashUrl(props.photo, w, heightFor(w))} ${w}w`).join(', '),
    width: fallback,
    height: heightFor(fallback),
  }
})
</script>

<template>
  <img
    class="responsive-image"
    :src="sources.src"
    :srcset="sources.srcset"
    :sizes="sizes"
    :width="sources.width"
    :height="sources.height"
    :alt="photo.alt"
    :loading="priority ? 'eager' : 'lazy'"
    :fetchpriority="priority ? 'high' : 'auto'"
    decoding="async"
    :style="{ aspectRatio: String(ratio), backgroundColor: photo.color }"
  />
</template>

<style scoped>
.responsive-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
