<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BrandLogo from './BrandLogo.vue'
import { mainNavigation } from '@/data/navigation'
import { shopInfo } from '@/data/shop'

/**
 * En-tête du site. Sur mobile, la navigation s'ouvre dans un panneau latéral :
 * focus placé dans le panneau et gardé à l'intérieur, fermeture par Échap,
 * par le voile ou par le bouton, défilement de la page bloqué pendant l'ouverture.
 */
const isOpen = ref(false)
const isScrolled = ref(false)
const toggleButton = ref<HTMLButtonElement | null>(null)
const panel = ref<HTMLElement | null>(null)
const route = useRoute()

const DESKTOP_QUERY = '(min-width: 56rem)'
let desktopQuery: MediaQueryList | null = null

watch(
  () => route.fullPath,
  () => {
    isOpen.value = false
  },
)

watch(isOpen, async (open) => {
  document.documentElement.classList.toggle('has-drawer-open', open)
  if (open) {
    await nextTick()
    panel.value?.querySelector<HTMLElement>('.header__link')?.focus()
  }
})

function close({ returnFocus = false } = {}) {
  isOpen.value = false
  if (returnFocus) toggleButton.value?.focus()
}

function focusableInPanel(): HTMLElement[] {
  return Array.from(panel.value?.querySelectorAll<HTMLElement>('a[href], button') ?? [])
}

function onKeydown(event: KeyboardEvent) {
  if (!isOpen.value) return
  if (event.key === 'Escape') {
    close({ returnFocus: true })
    return
  }
  // Le focus reste dans le panneau tant qu'il est ouvert
  if (event.key === 'Tab') {
    const items = focusableInPanel()
    const first = items[0]
    const last = items[items.length - 1]
    if (!first || !last) return
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }
}

function onScroll() {
  isScrolled.value = window.scrollY > 8
}

/* Si l'écran passe en format ordinateur, le panneau n'a plus lieu d'être */
function onViewportChange(event: MediaQueryListEvent) {
  if (event.matches) isOpen.value = false
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('keydown', onKeydown)
  desktopQuery = window.matchMedia(DESKTOP_QUERY)
  desktopQuery.addEventListener('change', onViewportChange)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('keydown', onKeydown)
  desktopQuery?.removeEventListener('change', onViewportChange)
  document.documentElement.classList.remove('has-drawer-open')
})
</script>

<template>
  <header class="header" :class="{ 'is-scrolled': isScrolled, 'is-open': isOpen }">
    <div class="header__inner container">
      <RouterLink to="/" class="header__brand" aria-label="L'Encre & le Grain, accueil">
        <BrandLogo />
      </RouterLink>

      <button
        ref="toggleButton"
        class="header__toggle"
        type="button"
        :aria-expanded="isOpen"
        aria-controls="menu-principal"
        @click="isOpen = true"
      >
        <span class="header__toggle-icon" aria-hidden="true"></span>
        <span>Menu</span>
      </button>

      <!-- Voile derrière le panneau (mobile) : un clic ferme le menu -->
      <div class="header__backdrop" aria-hidden="true" @click="close({ returnFocus: true })"></div>

      <nav
        id="menu-principal"
        ref="panel"
        class="header__nav"
        aria-label="Navigation principale"
      >
        <div class="header__panel-top">
          <p class="header__panel-title" aria-hidden="true">Menu</p>
          <button
            type="button"
            class="header__close"
            aria-label="Fermer le menu"
            @click="close({ returnFocus: true })"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <ul class="header__list">
          <li
            v-for="(item, index) in mainNavigation"
            :key="item.label"
            :style="{ '--i': index }"
          >
            <RouterLink :to="item.to" class="header__link" @click="close()">
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>

        <RouterLink :to="{ path: '/', hash: '#infos' }" class="header__hours" @click="close()">
          Horaires &amp; accès
        </RouterLink>

        <p class="header__panel-note">
          {{ shopInfo.tagline }}<br />
          {{ shopInfo.address[0] }}
          <span class="header__panel-tag">Adresse fictive</span>
        </p>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: var(--border-rule) solid transparent;
  transition:
    border-color var(--duration-base) ease,
    box-shadow var(--duration-base) ease;
}

/*
 * Fond flouté porté par un pseudo-élément : un backdrop-filter sur l'en-tête
 * lui-même piégerait le panneau en position fixe à l'intérieur de l'en-tête.
 */
.header::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: color-mix(in srgb, var(--color-bg) 92%, transparent);
  backdrop-filter: saturate(1.2) blur(10px);
}

.header.is-scrolled {
  border-bottom-color: var(--color-line-strong);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-5);
  min-height: var(--header-height);
}

.header__brand {
  text-decoration: none;
  border-radius: var(--radius-btn);
}

/* ---------- Bouton menu (mobile) ---------- */
.header__toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border: var(--border-rule) solid var(--color-primary);
  border-radius: var(--radius-btn);
  background: transparent;
  color: var(--color-primary);
  font-size: var(--text-xs);
  font-weight: 650;
  letter-spacing: var(--tracking-button);
  text-transform: uppercase;
}

.header__toggle-icon,
.header__toggle-icon::before {
  display: block;
  width: 1rem;
  height: 1.5px;
  background: currentColor;
}

.header__toggle-icon {
  position: relative;
  transform: translateY(-3px);
}

.header__toggle-icon::before {
  content: '';
  position: absolute;
  top: 6px;
}

/* ---------- Panneau latéral (mobile) ---------- */
.header__backdrop {
  position: fixed;
  inset: 0;
  z-index: 1;
  background: rgb(42 29 21 / 0.45);
  opacity: 0;
  visibility: hidden;
  transition:
    opacity var(--duration-base) var(--ease-out),
    visibility 0s linear var(--duration-base);
}

.is-open .header__backdrop {
  opacity: 1;
  visibility: visible;
  transition: opacity var(--duration-base) var(--ease-out);
}

.header__nav {
  position: fixed;
  inset: 0 0 0 auto;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  width: min(20rem, 86vw);
  padding: var(--space-4) var(--space-5) var(--space-6);
  overflow-y: auto;
  overscroll-behavior: contain;
  border-left: var(--border-rule) solid var(--color-primary);
  background: var(--color-bg);
  box-shadow: -20px 0 40px -24px rgb(42 29 21 / 0.5);
  transform: translateX(100%);
  visibility: hidden;
  transition:
    transform var(--duration-drawer) var(--ease-out),
    visibility 0s linear var(--duration-drawer);
}

.is-open .header__nav {
  transform: none;
  visibility: visible;
  transition: transform var(--duration-drawer) var(--ease-out);
}

.header__panel-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: calc(var(--header-height) - var(--space-4));
  padding-bottom: var(--space-3);
  border-bottom: var(--border-rule) solid var(--color-primary);
}

.header__panel-title {
  color: var(--color-warm);
  font-size: var(--text-2xs);
  font-weight: 650;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
}

.header__close {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  margin-right: calc(var(--space-2) * -1);
  border: var(--border-rule) solid var(--color-primary);
  border-radius: 50%;
  background: transparent;
  color: var(--color-primary);
  cursor: pointer;
  transition:
    background-color var(--duration-fast) ease,
    color var(--duration-fast) ease,
    transform var(--duration-base) var(--ease-out);
}

.header__close:hover {
  background: var(--color-primary);
  color: var(--color-on-primary);
  transform: rotate(90deg);
}

.header__list {
  display: grid;
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Les liens arrivent l'un après l'autre à l'ouverture */
.header__list li {
  opacity: 0;
  transform: translateX(1.5rem);
  transition:
    opacity var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out);
}

.is-open .header__list li {
  opacity: 1;
  transform: none;
  transition-delay: calc(120ms + var(--i, 0) * 50ms);
}

.header__link {
  display: block;
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--color-line);
  color: var(--color-primary);
  font-family: var(--font-serif);
  font-size: var(--text-xl);
  text-decoration: none;
}

.header__link.router-link-exact-active {
  color: var(--color-warm);
  font-style: italic;
}

.header__hours {
  align-self: flex-start;
  padding: var(--space-3) var(--space-4);
  border: var(--border-rule) solid var(--color-primary);
  border-radius: var(--radius-btn);
  color: var(--color-primary);
  font-size: var(--text-xs);
  font-weight: 650;
  letter-spacing: var(--tracking-button);
  text-decoration: none;
  text-transform: uppercase;
  transition:
    background-color var(--duration-fast) ease,
    color var(--duration-fast) ease;
}

.header__hours:hover {
  background: var(--color-primary);
  color: var(--color-on-primary);
}

.header__panel-note {
  margin-top: auto;
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-line);
  color: var(--color-text-muted);
  font-size: var(--text-xs);
  line-height: 1.6;
}

.header__panel-tag {
  display: inline-block;
  margin-left: var(--space-1);
  padding: 0 0.35rem;
  border: 1px solid currentColor;
  border-radius: var(--radius-xs);
  font-size: var(--text-2xs);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

@media (min-width: 56rem) {
  .header__toggle,
  .header__backdrop,
  .header__panel-top,
  .header__panel-note {
    display: none;
  }

  .header__nav,
  .is-open .header__nav {
    position: static;
    flex-direction: row;
    align-items: center;
    gap: var(--space-6);
    width: auto;
    padding: 0;
    overflow: visible;
    border: 0;
    background: none;
    box-shadow: none;
    transform: none;
    visibility: visible;
    transition: none;
  }

  .header__list {
    display: flex;
    gap: var(--space-5);
  }

  .header__list li {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .header__link {
    position: relative;
    padding: var(--space-2) 0;
    border: 0;
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    font-weight: 550;
  }

  .header__link.router-link-exact-active {
    color: var(--color-primary);
    font-style: normal;
  }

  /* Soulignement qui se dessine au survol */
  .header__link::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0.25rem;
    height: 1.5px;
    background: var(--color-warm);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform var(--duration-base) var(--ease-out);
  }

  .header__link:hover {
    color: var(--color-primary);
  }

  .header__link:hover::after {
    transform: scaleX(1);
  }
}
</style>
