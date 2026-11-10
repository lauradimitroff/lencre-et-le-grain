import type { RouteLocationRaw } from 'vue-router'

export interface NavItem {
  label: string
  to: RouteLocationRaw
}

/**
 * Chaque rubrique a sa page complète ; l'accueil en présente un aperçu
 * (plus demandés, coups de cœur, résumé de l'histoire). Le café passe en
 * premier : c'est l'activité principale, les livres sont un coin librairie..
 */
export const mainNavigation: NavItem[] = [
  { label: 'Accueil', to: '/' },
  { label: 'La carte', to: '/carte' },
  { label: 'Le coin librairie', to: '/librairie' },
  { label: 'Notre histoire', to: '/histoire' },
]
