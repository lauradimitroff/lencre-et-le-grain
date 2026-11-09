import type { RouteLocationRaw } from 'vue-router'

export interface NavItem {
  label: string
  to: RouteLocationRaw
}

/**
 * L'accueil reste une page unique (sections atteintes par ancres) ;
 * seule la carte complète du café a sa propre page.
 */
export const mainNavigation: NavItem[] = [
  { label: 'Accueil', to: '/' },
  { label: 'La librairie', to: { path: '/', hash: '#librairie' } },
  { label: 'Le café', to: { path: '/', hash: '#cafe' } },
  { label: 'La carte', to: '/carte' },
  { label: 'Notre histoire', to: { path: '/', hash: '#histoire' } },
]
