import type { Directive } from 'vue'

/**
 * v-reveal : apparition douce au défilement.
 * - Rien côté serveur : le HTML pré-rendu est toujours visible, même sans JS.
 * - Ignoré si l'utilisateur préfère réduire les animations.
 * - Ignoré pour les éléments déjà à l'écran au chargement (pas de clignotement).
 * - Réversible : l'élément s'efface quand il quitte l'écran et réapparaît au
 *   retour, en glissant depuis le bord par lequel il revient.
 * La valeur optionnelle est un délai en millisecondes : v-reveal="120".
 * Le modificateur .always anime aussi un élément déjà visible au chargement
 * (à réserver aux petits éléments, juste sous le hero par exemple).
 */
let observer: IntersectionObserver | undefined

function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const { classList } = entry.target
        if (entry.isIntersecting) {
          classList.add('is-visible')
        } else {
          classList.remove('is-visible')
          // Sorti par le haut : il reviendra depuis le haut quand on remontera.
          classList.toggle('reveal--above', entry.boundingClientRect.top < 0)
        }
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

    // On attend la fin de la tâche en cours : lors d'un changement de page, le
    // routeur remet d'abord le défilement en haut, et la position mesurée est la bonne.
    setTimeout(() => {
      if (!el.isConnected) return
      if (!binding.modifiers.always && el.getBoundingClientRect().top < window.innerHeight) return

      if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
      el.classList.add('reveal')
      getObserver().observe(el)
    }, 0)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
