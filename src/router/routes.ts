import type { RouteRecordRaw, RouterScrollBehavior } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/carte',
    name: 'menu',
    component: () => import('@/pages/MenuPage.vue'),
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

export const scrollBehavior: RouterScrollBehavior = (to, _from, savedPosition) => {
  if (savedPosition) return savedPosition
  if (to.hash) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return { el: to.hash, top: HEADER_OFFSET, behavior: reduceMotion ? 'auto' : 'smooth' }
  }
  return { top: 0 }
}
