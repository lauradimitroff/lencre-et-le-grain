import type { RouteLocationRaw } from 'vue-router'

export interface NavItem {
  label: string
  to: RouteLocationRaw
}

/** Site en one page : la navigation mène aux sections de l'accueil par ancres. */
export const mainNavigation: NavItem[] = [
  { label: 'Accueil', to: '/' },
  { label: 'La librairie', to: { path: '/', hash: '#librairie' } },
  { label: 'Le café', to: { path: '/', hash: '#cafe' } },
  { label: 'Notre histoire', to: { path: '/', hash: '#histoire' } },
]
