<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import StampLabel from '@/components/ui/StampLabel.vue'
import { photos } from '@/data/images'
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <!-- Photo pleine largeur, texte posé par-dessus -->
    <div class="hero__banner">
      <ResponsiveImage
        class="hero__image"
        :photo="photos.heroCafeInterior"
        :ratio="16 / 9"
        sizes="100vw"
        :widths="[640, 960, 1440, 1920, 2560]"
        priority
      />
      <div class="hero__shade" aria-hidden="true"></div>

      <div class="hero__inner container">
        <div class="hero__text">
          <StampLabel class="hero__stamp">Café de spécialité · Librairie indépendante</StampLabel>
          <h1 id="hero-title" class="hero__title">
            Un chapitre, <em>un café,</em> et tout le temps qu'il faut.
          </h1>
          <p class="hero__lead">
            Une librairie de quartier où l'on vient choisir un roman, s'installer près de la fenêtre
            et laisser refroidir sa tasse. Les livres sont choisis un par un, le café est torréfié à
            deux rues d'ici, et toute la carte est végétale.
          </p>
          <div class="hero__actions">
            <BaseButton :to="{ path: '/', hash: '#librairie' }" variant="inverse">
              Découvrir la boutique
            </BaseButton>
            <BaseButton to="/carte" variant="inverse-outline">Voir la carte</BaseButton>
          </div>
        </div>

        <p class="hero__note">
          <span class="hero__note-label">Au filtre cette semaine</span>
          Éthiopie Guji, bergamote et pêche blanche
        </p>
      </div>
    </div>

    <ul class="hero__facts container" aria-label="En bref">
      <li><strong>Du mardi au dimanche</strong> dès 8 h en semaine</li>
      <li><strong>100 % végétal</strong> boissons et pâtisseries</li>
      <li><strong>Consultation en ligne</strong> achat sur place</li>
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
  isolation: isolate;
  display: flex;
  align-items: flex-end;
  min-height: min(calc(100svh - var(--header-height) - 2.5rem), 46rem);
  overflow: hidden;
  border-bottom: var(--border-rule) solid var(--color-primary);
  background: var(--color-primary);
  color: var(--cream-50);
}

/* L'image remplit tout le bandeau, quel que soit son format */
.hero__banner :deep(.hero__image) {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  aspect-ratio: auto !important;
  object-fit: cover;
  object-position: 60% 50%;
}

/* Voile vert forêt : garantit le contraste du texte sur la photo */
.hero__shade {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(0deg, rgb(20 42 33 / 0.92) 0%, rgb(20 42 33 / 0.8) 50%, rgb(20 42 33 / 0.6) 100%);
}

.hero__inner {
  display: grid;
  gap: var(--space-6);
  padding-block: var(--space-8) var(--space-7);
}

.hero__text {
  display: grid;
  gap: var(--space-5);
  justify-items: start;
  max-width: 40rem;
}

.hero .hero__stamp {
  color: var(--kraft-400);
}

.hero__title {
  color: var(--cream-50);
  font-size: var(--text-3xl);
  font-weight: 360;
  letter-spacing: -0.015em;
  text-wrap: balance;
}

.hero__title em {
  color: var(--kraft-400);
  font-weight: 320;
}

.hero__lead {
  max-width: 50ch;
  color: rgb(252 250 245 / 0.9);
  font-size: var(--text-lg);
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
  gap: var(--space-3);
  margin-top: var(--space-6);
  padding: 0;
  list-style: none;
  color: var(--color-text-muted);
  font-size: var(--text-sm);
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
  .hero__banner {
    align-items: center;
  }

  /* Sur grand écran, le texte est à gauche : le voile part de la gauche */
  .hero__shade {
    background:
      linear-gradient(90deg, rgb(20 42 33 / 0.9) 0%, rgb(20 42 33 / 0.74) 42%, rgb(20 42 33 / 0.15) 78%, rgb(20 42 33 / 0.05) 100%);
  }

  .hero__inner {
    grid-template-columns: 1fr auto;
    align-items: end;
  }

  .hero__note {
    justify-self: end;
  }
}
</style>
