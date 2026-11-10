<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import { photos } from '@/data/images'
</script>

<template>
  <section id="histoire" class="spirit section" aria-labelledby="spirit-title">
    <div class="container spirit__grid">
      <figure class="spirit__main" v-reveal>
        <ResponsiveImage
          :photo="photos.vintageBookStacks"
          :ratio="4 / 5"
          sizes="(min-width: 56rem) 50vw, 100vw"
          :widths="[480, 768, 1080]"
        />
      </figure>

      <div class="spirit__text">
        <p class="eyebrow">L'esprit du lieu</p>
        <h2 id="spirit-title" class="spirit__title">
          Une ancienne imprimerie, <em>trois fauteuils</em> et beaucoup de papier
        </h2>
        <div class="spirit__body">
          <p class="spirit__lede">
            Au départ, il y avait une imprimerie de quartier, fermée depuis des années, avec ses
            hautes fenêtres et son parquet taché d'encre. Nous avons gardé les établis, poncé le
            comptoir et installé une machine à espresso là où tournait la presse.
          </p>
        </div>
        <blockquote class="spirit__quote">
          <p>« On ne vend pas des livres et du café. On vend une heure de calme, et on l'emballe dans du kraft. »</p>
        </blockquote>
        <div>
          <BaseButton to="/histoire" variant="secondary">Lire notre histoire</BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.spirit {
  background: var(--color-bg-alt);
}

.spirit__grid {
  display: grid;
  gap: var(--space-6);
}

.spirit figure {
  margin: 0;
  overflow: hidden;
  border-radius: var(--radius-card);
}

.spirit__main {
  border: var(--border-rule) solid var(--color-primary);
}

.spirit__text {
  display: grid;
  gap: var(--space-5);
  align-content: start;
}

.spirit__title {
  font-size: var(--text-2xl);
  font-weight: 360;
}

.spirit__title em {
  color: var(--color-warm);
  font-weight: 300;
}

.spirit__body {
  display: grid;
  gap: var(--space-4);
  max-width: 60ch;
}

/* Lettrine éditoriale */
.spirit__lede::first-letter {
  float: left;
  margin: 0.08em 0.12em 0 0;
  color: var(--color-primary);
  font-family: var(--font-serif);
  font-size: 3.6em;
  font-weight: 340;
  line-height: 0.8;
}

.spirit__quote {
  display: grid;
  gap: var(--space-3);
  margin: var(--space-2) 0 0;
  padding: var(--space-5) 0 0;
  border-top: var(--border-rule) solid var(--color-primary);
}

.spirit__quote p {
  color: var(--color-primary);
  font-family: var(--font-serif);
  font-size: var(--text-xl);
  font-style: italic;
  font-weight: 320;
  line-height: 1.3;
}

.spirit__quote footer {
  color: var(--color-text-muted);
  font-size: var(--text-xs);
  letter-spacing: 0.04em;
}

.spirit__inset {
  width: 70%;
  justify-self: end;
  margin-top: calc(var(--space-8) * -1);
  border: 6px solid var(--color-bg-alt);
  box-shadow: var(--shadow-lift);
}

.spirit__wide {
  display: none;
}

/* Mise en page asymétrique, façon magazine */
@media (min-width: 56rem) {
  .spirit__grid {
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: auto auto;
    gap: var(--space-6) var(--space-5);
  }

  .spirit__main {
    grid-column: 1 / 7;
    grid-row: 1 / 3;
    align-self: start;
  }

  .spirit__inset {
    grid-column: 5 / 8;
    grid-row: 2;
    width: auto;
    align-self: end;
    margin: 0 0 calc(var(--space-7) * -1);
    z-index: 1;
  }

  .spirit__text {
    grid-column: 8 / 13;
    grid-row: 1;
    padding-top: var(--space-6);
  }

  .spirit__wide {
    display: block;
    grid-column: 9 / 13;
    grid-row: 2;
    align-self: end;
  }
}
</style>
