<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import StampLabel from '@/components/ui/StampLabel.vue'
import { photos } from '@/data/images'
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__inner container">
      <div class="hero__text">
        <StampLabel>Café de spécialité · Librairie indépendante</StampLabel>
        <h1 id="hero-title" class="hero__title">
          Un chapitre, <em>un café,</em> et tout le temps qu'il faut.
        </h1>
        <p class="hero__lead">
          Une librairie de quartier où l'on vient choisir un roman, s'installer près de la fenêtre et
          laisser refroidir sa tasse. Les livres sont choisis un par un, le café est torréfié à
          deux rues d'ici, et toute la carte est végétale.
        </p>
        <div class="hero__actions">
          <BaseButton :to="{ path: '/', hash: '#librairie' }">Découvrir la boutique</BaseButton>
          <BaseButton :to="{ path: '/', hash: '#cafe' }" variant="secondary">Voir la carte</BaseButton>
        </div>
      </div>

      <figure class="hero__media">
        <ResponsiveImage
          :photo="photos.heroLattes"
          :ratio="4 / 5"
          sizes="(min-width: 56rem) 40vw, 100vw"
          :widths="[480, 720, 960, 1280]"
          priority
        />
        <figcaption class="hero__note">
          <span class="hero__note-label">Au filtre cette semaine</span>
          Éthiopie Guji, bergamote et pêche blanche
        </figcaption>
      </figure>
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
  padding-block: var(--space-6) var(--space-7);
}

.hero__inner {
  display: grid;
  gap: var(--space-7);
  align-items: center;
}

.hero__text {
  display: grid;
  gap: var(--space-5);
  justify-items: start;
}

.hero__title {
  font-size: var(--text-3xl);
  font-weight: 340;
  letter-spacing: -0.015em;
}

.hero__title em {
  color: var(--color-warm);
  font-weight: 300;
}

.hero__lead {
  max-width: 50ch;
  color: var(--color-text-muted);
  font-size: var(--text-lg);
  line-height: 1.6;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

.hero__media {
  position: relative;
  margin: 0;
  padding: var(--space-3);
  border: var(--border-rule) solid var(--color-primary);
  border-radius: var(--radius-card);
  background: var(--color-library);
}

.hero__media :deep(img) {
  border-radius: calc(var(--radius-card) - 4px);
}

.hero__note {
  position: absolute;
  left: calc(var(--space-3) * -1);
  bottom: var(--space-6);
  display: grid;
  gap: var(--space-1);
  max-width: 15rem;
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

.hero__facts {
  display: grid;
  gap: var(--space-3);
  margin-top: var(--space-7);
  padding: var(--space-5) 0 0;
  border-top: var(--border-rule) solid var(--color-primary);
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
  .hero {
    padding-block: var(--space-7) var(--space-8);
  }

  .hero__inner {
    grid-template-columns: 1.1fr 0.9fr;
    gap: var(--space-8);
  }

  .hero__note {
    left: calc(var(--space-7) * -1);
  }
}
</style>
