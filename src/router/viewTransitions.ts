import { nextTick } from 'vue'
import type { Router } from 'vue-router'

/**
 * Transitions douces entre les pages avec la View Transitions API.
 * Le navigateur capture l'ancienne page, Vue affiche la nouvelle, puis les deux
 * sont fondues (styles dans base.css). Sans support du navigateur, ou si la
 * personne préfère réduire les animations, la navigation reste instantanée.
 * Les ancres à l'intérieur d'une même page ne déclenchent pas de transition.
 */
const CAPTURE_TIMEOUT_MS = 300

export function installViewTransitions(router: Router) {
  if (typeof document === 'undefined' || !('startViewTransition' in document)) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let finishTransition: (() => void) | null = null

  router.beforeResolve((to, from) => {
    const isFirstLoad = from.matched.length === 0
    if (isFirstLoad || to.path === from.path || reduceMotion.matches) return
    if (document.visibilityState !== 'visible') return

    // La navigation reprend une fois l'ancienne page capturée…
    return new Promise<void>((resolve) => {
      let released = false
      const release = () => {
        if (released) return
        released = true
        resolve()
      }
      // … ou au bout de 300 ms si le navigateur ne dessine pas (onglet en
      // arrière-plan, rendu suspendu) : la navigation ne doit jamais rester bloquée.
      const fallback = setTimeout(release, CAPTURE_TIMEOUT_MS)

      document.startViewTransition(() => {
        clearTimeout(fallback)
        if (released) return
        return new Promise<void>((domUpdated) => {
          finishTransition = domUpdated
          release()
        })
      })
    })
  })

  router.afterEach(async () => {
    if (!finishTransition) return
    await nextTick()
    finishTransition()
    finishTransition = null
  })

  // Navigation annulée ou en erreur : on libère la transition en cours
  router.onError(() => {
    finishTransition?.()
    finishTransition = null
  })
}
