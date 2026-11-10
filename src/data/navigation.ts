import type { RouteLocationRaw } from 'vue-router'

export interface NavItem {
  label: string
  to: RouteLocationRaw
}

/**
 * Chaque rubrique a sa page complète ; l'accueil en présente un aperçu
 * (coups de cœur, plus demandés, résumé de l'histoire).
 */
export const mainNavigation: NavItem[] = [
  { label: 'Accueil', to: '/' },
  { label: 'La librairie', to: '/librairie' },
  { label: 'La carte', to: '/carte' },
  { label: 'Notre histoire', to: '/histoire' },
]
