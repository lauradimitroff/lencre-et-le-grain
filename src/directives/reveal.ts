import type { Directive } from 'vue'

/**
 * v-reveal : apparition douce au défilement.
 * - Rien côté serveur : le HTML pré-rendu est toujours visible, même sans JS.
 * - Ignoré si l'utilisateur préfère réduire les animations.
 * - Ignoré pour les éléments déjà à l'écran au chargement (pas de clignotement).
 * La valeur optionnelle est un délai en millisecondes : v-reveal="120".
 */
let observer: IntersectionObserver | undefined

function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-visible')
        observer?.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  )
  return observer
}

export const vReveal: Directive<HTMLElement, number | undefined> = {
  getSSRProps: () => ({}),
  mounted(el, binding) {
    if (typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight) return

    if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
    el.classList.add('reveal')
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
