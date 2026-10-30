import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes, scrollBehavior } from './router/routes'
import { vReveal } from './directives/reveal'
import './styles/main.css'

// vite-ssg : rendu statique de chaque route au build, puis hydratation côté client.
export const createApp = ViteSSG(App, { routes, scrollBehavior }, ({ app }) => {
  app.directive('reveal', vReveal)
})
