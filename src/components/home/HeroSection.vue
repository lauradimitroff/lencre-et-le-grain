<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import StampLabel from '@/components/ui/StampLabel.vue'
import { lineIcons } from '@/data/icons'
import { photos } from '@/data/images'

const facts = [
  {
    title: 'Du mardi au dimanche',
    text: 'dès 8 h en semaine',
    icon: lineIcons.clock,
  },
  {
    title: '100 % végétal',
    text: 'boissons et pâtisseries',
    icon: lineIcons.leaf,
  },
  {
    title: 'Consultation en ligne',
    text: 'achat sur place',
    icon: lineIcons.book,
  },
]
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <!-- Photo pleine largeur, texte dans un encart clair posé par-dessus (sans voile sur la photo) -->
    <div class="hero__banner">
      <ResponsiveImage
        class="hero__image"
        :photo="photos.heroCafeInterior"
        :ratio="16 / 9"
        sizes="100vw"
        :widths="[640, 960, 1440, 1920, 2560]"
        priority
      />

      <div class="hero__inner container">
        <div class="hero__text">
          <StampLabel>Café de spécialité · Librairie indépendante</StampLabel>
          <h1 id="hero-title" class="hero__title">
            Un chapitre, <em>un café,</em> et tout le temps qu'il faut.
          </h1>
          <p class="hero__lead">
            Une librairie de quartier où l'on vient choisir un roman, s'installer près de la fenêtre
            et laisser refroidir sa tasse. Les livres sont choisis un par un, le café est torréfié à
            deux rues d'ici, et toute la carte est végétale.
          </p>
          <div class="hero__actions">
            <BaseButton to="/librairie">Découvrir la sélection de livres</BaseButton>
            <BaseButton to="/carte" variant="secondary">Voir la carte</BaseButton>
          </div>
        </div>

        <p class="hero__note">
          <span class="hero__note-label">Au filtre cette semaine</span>
          Éthiopie Guji, bergamote et pêche blanche
        </p>
      </div>
    </div>

    <ul class="hero__facts container" aria-label="En bref">
      <li
        v-for="(fact, index) in facts"
        :key="fact.title"
        v-reveal.always="200 + index * 160"
        class="hero__fact"
      >
        <span class="hero__fact-badge">
          <svg
            class="hero__fact-icon"
            viewBox="0 0 24 24"
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path v-for="d in fact.icon" :key="d" :d="d" pathLength="1" />
          </svg>
        </span>
        <strong>{{ fact.title }}</strong> {{ fact.text }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
.hero {
  padding-bottom: var(--space-7);
}

/* ---------- Bandeau photo ---------- */
.hero__banner {
  position: relative;
  border-bottom: var(--border-rule) solid var(--color-primary);
  background: var(--color-library);
}

/* Mobile : la photo en haut, l'encart de texte la chevauche en dessous */
.hero__banner :deep(.hero__image) {
  display: block;
  width: 100%;
  height: 17rem;
  aspect-ratio: auto !important;
  object-fit: cover;
  object-position: 60% 50%;
}

.hero__inner {
  position: relative;
  display: grid;
  gap: var(--space-5);
  margin-top: calc(var(--space-7) * -1);
  padding-bottom: var(--space-6);
}

/* Encart de texte : fond plein, la photo reste intacte autour */
.hero__text {
  display: grid;
  gap: var(--space-5);
  justify-items: start;
  min-width: 0;
  max-width: 38rem;
  padding: var(--space-6) var(--space-5);
  border: var(--border-rule) solid var(--color-primary);
  border-radius: var(--radius-card);
  background: var(--cream-50);
  box-shadow: var(--shadow-lift);
}

/* L'étiquette peut passer à la ligne sur petit écran */
.hero__text :deep(.stamp) {
  max-width: 100%;
  line-height: 1.35;
  white-space: normal;
}

.hero__title {
  font-size: var(--text-3xl);
  font-weight: 360;
  letter-spacing: -0.015em;
  text-wrap: balance;
}

.hero__title em {
  color: var(--color-warm);
  font-weight: 320;
}

.hero__lead {
  max-width: 50ch;
  color: var(--color-text-muted);
  font-size: var(--text-lead);
  line-height: 1.6;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

.hero__note {
  display: grid;
  gap: var(--space-1);
  justify-self: start;
  max-width: 16rem;
  padding: var(--space-3) var(--space-4);
  border: var(--border-rule) solid var(--color-primary);
  border-radius: var(--radius-btn);
  background: var(--color-cafe);
  color: var(--ink-900);
  font-family: var(--font-serif);
  font-size: var(--text-sm);
  line-height: 1.3;
  box-shadow: var(--shadow-soft);
}

.hero__note-label {
  color: var(--color-cafe-ink);
  font-family: var(--font-sans);
  font-size: var(--text-2xs);
  font-weight: 650;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
}

/* ---------- En bref ---------- */
.hero__facts {
  display: grid;
  gap: var(--space-5);
  margin-top: var(--space-6);
  padding: 0;
  list-style: none;
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.hero__fact {
  display: grid;
  gap: var(--space-1);
  justify-items: start;
}

/* Pastille ronde sable autour de l'icône */
.hero__fact-badge {
  display: grid;
  place-items: center;
  width: 3.5rem;
  height: 3.5rem;
  margin-bottom: var(--space-3);
  border: var(--border-rule) solid var(--color-primary);
  border-radius: 50%;
  background: var(--color-library);
  color: var(--color-primary);
}

/*
 * Apparition (avec v-reveal) : la pastille grossit légèrement, puis l'icône
 * se dessine trait par trait. Sans JS ou en mouvement réduit, tout est visible.
 */
.hero__fact.reveal .hero__fact-badge {
  transform: scale(0.6);
  transition: transform var(--duration-reveal) cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: var(--reveal-delay, 0ms);
}

.hero__fact.reveal .hero__fact-icon path {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 900ms var(--ease-out);
  transition-delay: calc(var(--reveal-delay, 0ms) + 200ms);
}

.hero__fact.reveal.is-visible .hero__fact-badge {
  transform: none;
}

.hero__fact.reveal.is-visible .hero__fact-icon path {
  stroke-dashoffset: 0;
}

.hero__facts strong {
  display: block;
  color: var(--color-primary);
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  font-weight: 400;
}

@media (min-width: 40rem) {
  .hero__facts {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-5);
  }
}

@media (min-width: 56rem) {
  /* Grand écran : la photo couvre tout le bandeau, l'encart est posé à gauche */
  .hero__banner {
    display: flex;
    align-items: center;
    min-height: min(calc(100svh - var(--header-height) - 2.5rem), 46rem);
    overflow: hidden;
  }

  .hero__banner :deep(.hero__image) {
    position: absolute;
    inset: 0;
    height: 100%;
  }

  .hero__inner {
    grid-template-columns: 1fr auto;
    align-items: end;
    margin-top: 0;
    padding-block: var(--space-8);
  }

  .hero__text {
    padding: var(--space-7) var(--space-7) var(--space-6);
  }

  .hero__note {
    justify-self: end;
  }
}
</style>
