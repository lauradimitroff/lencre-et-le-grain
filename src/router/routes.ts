import type { RouteRecordRaw, RouterScrollBehavior } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/librairie',
    name: 'library',
    component: () => import('@/pages/LibraryPage.vue'),
  },
  {
    path: '/carte',
    name: 'menu',
    component: () => import('@/pages/MenuPage.vue'),
  },
  {
    path: '/histoire',
    name: 'story',
    component: () => import('@/pages/StoryPage.vue'),
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/pages/ContactPage.vue'),
  },
  {
    path: '/credits',
    name: 'credits',
    component: () => import('@/pages/CreditsPage.vue'),
  },
  {
    // Pré-rendue en 404.html, servie par Vercel pour les URL inconnues.
    path: '/404',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/NotFoundPage.vue'),
  },
]

const HEADER_OFFSET = 88

export const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) return savedPosition

  // Changement de page : on arrive directement en haut (ou sur l'ancre), sans
  // défilement animé depuis la position de la page précédente.
  const samePage = to.path === from.path
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const behavior = samePage && !reduceMotion ? 'smooth' : 'instant'

  if (to.hash) return { el: to.hash, top: HEADER_OFFSET, behavior }
  return { top: 0, behavior: 'instant' }
}
