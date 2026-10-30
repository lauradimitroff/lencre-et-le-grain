<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BrandLogo from './BrandLogo.vue'
import { mainNavigation } from '@/data/navigation'

const isOpen = ref(false)
const isScrolled = ref(false)
const toggleButton = ref<HTMLButtonElement | null>(null)
const route = useRoute()

watch(
  () => route.fullPath,
  () => {
    isOpen.value = false
  },
)

function close({ returnFocus = false } = {}) {
  isOpen.value = false
  if (returnFocus) toggleButton.value?.focus()
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) close({ returnFocus: true })
}

function onScroll() {
  isScrolled.value = window.scrollY > 8
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('keydown', onKeydown)
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
        @click="isOpen = !isOpen"
      >
        <span class="header__toggle-icon" aria-hidden="true"></span>
        <span>{{ isOpen ? 'Fermer' : 'Menu' }}</span>
      </button>

      <nav id="menu-principal" class="header__nav" aria-label="Navigation principale">
        <ul class="header__list">
          <li v-for="item in mainNavigation" :key="item.label">
            <RouterLink :to="item.to" class="header__link" @click="close()">
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
        <RouterLink :to="{ path: '/', hash: '#infos' }" class="header__hours" @click="close()">
          Horaires &amp; accès
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--color-bg) 92%, transparent);
  backdrop-filter: saturate(1.2) blur(10px);
  border-bottom: var(--border-rule) solid transparent;
  transition:
    border-color var(--duration-base) ease,
    box-shadow var(--duration-base) ease;
}

.header.is-scrolled,
.header.is-open {
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
  transition: transform var(--duration-base) var(--ease-out);
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

.is-open .header__toggle-icon {
  transform: rotate(45deg);
}

.is-open .header__toggle-icon::before {
  transform: translateY(-6px) rotate(-90deg);
}

/* ---------- Navigation ---------- */
.header__nav {
  position: absolute;
  inset: 100% 0 auto;
  display: none;
  padding: var(--space-4) var(--gutter) var(--space-6);
  background: var(--color-bg);
  border-bottom: var(--border-rule) solid var(--color-line-strong);
}

.is-open .header__nav {
  display: grid;
  gap: var(--space-5);
}

.header__list {
  display: grid;
  margin: 0;
  padding: 0;
  list-style: none;
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

.header__hours {
  justify-self: start;
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

@media (min-width: 56rem) {
  .header__toggle {
    display: none;
  }

  .header__nav,
  .is-open .header__nav {
    position: static;
    display: flex;
    align-items: center;
    gap: var(--space-6);
    padding: 0;
    background: none;
    border: 0;
  }

  .header__list {
    display: flex;
    gap: var(--space-5);
  }

  .header__link {
    position: relative;
    padding: var(--space-2) 0;
    border: 0;
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    font-weight: 550;
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
