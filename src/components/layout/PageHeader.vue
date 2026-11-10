<script setup lang="ts">
/**
 * En-tête des pages intérieures : bandeau sable identique sur toutes les pages
 * (même fond, même hauteur minimale), avec fil d'Ariane et tampon décoratif.
 * Pour garder la même hauteur partout, l'introduction tient en deux lignes et
 * les mentions (« fictif », « prix indicatifs ») passent sous le bandeau.
 */
defineProps<{
  /** Identifiant du h1, pour aria-labelledby. */
  titleId: string
  eyebrow: string
  /** Libellé de la page dans le fil d'Ariane. */
  crumb: string
  /** Mention affichée juste sous le bandeau. */
  note?: string
}>()
</script>

<template>
  <header class="page-header">
    <div class="container page-header__inner">
      <nav aria-label="Fil d'Ariane" class="page-header__crumbs">
        <ol>
          <li><RouterLink to="/">Accueil</RouterLink></li>
          <li aria-current="page">{{ crumb }}</li>
        </ol>
      </nav>

      <div class="page-header__grid">
        <div class="page-header__text">
          <p class="eyebrow">{{ eyebrow }}</p>
          <h1 :id="titleId" class="page-header__title"><slot name="title" /></h1>
          <div class="page-header__lead"><slot /></div>
        </div>

        <p class="page-header__stamp" aria-hidden="true">
          <span class="page-header__amp">&amp;</span>
          <span class="page-header__stamp-text">Café · Librairie</span>
        </p>
      </div>
    </div>
  </header>
  <p v-if="note" class="page-header__note container">{{ note }}</p>
</template>

<style scoped>
.page-header {
  position: relative;
  overflow: hidden;
  border-bottom: var(--border-rule) solid var(--color-primary);
  background: var(--color-library);
}


.page-header__inner {
  display: grid;
  align-content: start;
  gap: var(--space-6);
  /* Même hauteur sur toutes les pages (celle de la carte) */
  min-height: 24.5rem;
  padding-block: var(--space-7) var(--space-8);
}

.page-header__crumbs ol {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  color: var(--color-text-muted);
  font-size: var(--text-xs);
  list-style: none;
}



.page-header__crumbs li + li::before {
  content: '/';
  margin-right: var(--space-2);
  opacity: 0.6;
}

.page-header__crumbs a {
  color: var(--color-primary);
}

.page-header__grid {
  display: grid;
  gap: var(--space-6);
  align-items: center;
}

.page-header__text {
  display: grid;
  gap: var(--space-4);
  max-width: 46rem;
}

.page-header__title {
  font-size: var(--text-3xl);
  font-weight: 360;
  line-height: var(--leading-tight);
  text-wrap: balance;
}

.page-header__title :deep(em) {
  color: var(--color-warm);
  font-weight: 300;
}

.page-header__lead {
  display: grid;
  gap: var(--space-3);
  max-width: 58ch;
  color: var(--color-text-muted);
  font-size: var(--text-lead);
}


.page-header__note {
  padding-top: var(--space-4);
  color: var(--color-text-muted);
  font-size: var(--text-xs);
  font-style: italic;
}

/* Tampon décoratif : l'esperluette du logo, en grand */
.page-header__stamp {
  display: none;
}

@media (min-width: 56rem) {
  .page-header__inner {
    min-height: 21.875rem;
  }

  .page-header__grid {
    grid-template-columns: 1fr auto;
  }

  .page-header__stamp {
    display: grid;
    place-items: center;
    align-content: center;
    gap: var(--space-1);
    width: 11rem;
    height: 11rem;
    margin-right: var(--space-5);
    border: var(--border-rule) solid var(--color-primary);
    border-radius: 50%;
    box-shadow:
      0 0 0 6px var(--color-library),
      0 0 0 7px var(--color-primary);
    color: var(--color-primary);
    transform: rotate(-8deg);
  }


  .page-header__amp {
    font-family: var(--font-serif);
    font-size: 4.5rem;
    font-style: italic;
    font-weight: 300;
    line-height: 0.9;
  }

  .page-header__stamp-text {
    font-size: var(--text-2xs);
    font-weight: 650;
    letter-spacing: var(--tracking-label);
    text-transform: uppercase;
  }
}
</style>
