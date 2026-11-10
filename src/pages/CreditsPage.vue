<script setup lang="ts">
import PageHeader from '@/components/layout/PageHeader.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { photos, type Photo } from '@/data/images'

const photoList: Photo[] = Object.values(photos)

usePageMeta({
  title: "Crédits · L'Encre & le Grain (boutique fictive)",
  description:
    'Crédits photo, polices, couvertures illustrées et sources des informations sur les livres du café-librairie imaginaire.',
  path: '/credits',
})
</script>

<template>
  <PageHeader title-id="credits-title" eyebrow="Mentions" crumb="Crédits">
    <template #title>Crédits</template>
    <p>
      L'Encre &amp; le Grain est un projet de portfolio : le lieu, la carte, l'adresse et les
      horaires sont inventés. Voici d'où viennent les images, les polices et les informations
      utilisées sur le site.
    </p>
  </PageHeader>

  <section class="credits section" aria-labelledby="credits-title">
    <div class="container credits__inner">
      <section class="credits__block" aria-labelledby="credits-photos">
        <h2 id="credits-photos" class="credits__subtitle">Photographies</h2>
        <p class="credits__text">
          Toutes les photos proviennent d'<a href="https://unsplash.com" rel="noopener">Unsplash</a>
          et sont utilisées selon la
          <a href="https://unsplash.com/license" rel="noopener">licence Unsplash</a>.
        </p>
        <ul class="credits__photos">
          <li v-for="photo in photoList" :key="photo.id" class="credits__photo">
            <ResponsiveImage :photo="photo" :ratio="4 / 3" sizes="(min-width: 48rem) 20rem, 100vw" :widths="[320, 640]" />
            <div class="credits__photo-text">
              <p class="credits__usage">{{ photo.usage }}</p>
              <p>
                Photo de
                <a :href="photo.credit.authorUrl" rel="noopener">{{ photo.credit.author }}</a>
                sur <a :href="photo.credit.photoUrl" rel="noopener">Unsplash</a>
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section class="credits__block" aria-labelledby="credits-books">
        <h2 id="credits-books" class="credits__subtitle">Livres et couvertures</h2>
        <p class="credits__text">
          Les livres présentés existent vraiment. Les prix publics sont indicatifs, relevés en
          octobre 2026 sur
          <a href="https://www.leslibraires.fr" rel="noopener">leslibraires.fr</a>. Les résumés
          sont rédigés pour le site. Les couvertures sont des illustrations créées pour le site, pas
          celles des éditeurs, qui restent la propriété de leurs auteurs.
        </p>
      </section>

      <section class="credits__block" aria-labelledby="credits-fonts">
        <h2 id="credits-fonts" class="credits__subtitle">Polices</h2>
        <p class="credits__text">
          <a href="https://fonts.google.com/specimen/Newsreader" rel="noopener">Newsreader</a>
          (Production Type) pour les titres et
          <a href="https://fonts.google.com/specimen/Instrument+Sans" rel="noopener">Instrument Sans</a>
          (Instrument) pour le texte, sous licence SIL Open Font License, auto-hébergées via
          Fontsource.
        </p>
      </section>

      <section class="credits__block" aria-labelledby="credits-site">
        <h2 id="credits-site" class="credits__subtitle">Conception</h2>
        <p class="credits__text">
          Design et développement : Laura Dimitroff, avec Vue 3, TypeScript et Vite. Code source
          sur <a href="https://github.com/lauradimitroff/lencre-et-le-grain" rel="noopener">GitHub</a>.
        </p>
      </section>
    </div>
  </section>
</template>

<style scoped>
.credits__inner {
  display: grid;
  gap: var(--space-7);
  max-width: 56rem;
}



.credits__text a,
.credits__photo a {
  color: var(--color-primary);
}




.credits__block {
  display: grid;
  gap: var(--space-4);
  padding-top: var(--space-5);
  border-top: var(--border-rule) solid var(--color-primary);
}

.credits__subtitle {
  font-size: var(--text-xl);
  font-weight: 400;
}

.credits__text {
  max-width: 65ch;
}

.credits__photos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 15rem), 1fr));
  gap: var(--space-5);
  margin: 0;
  padding: 0;
  list-style: none;
}

.credits__photo {
  display: grid;
  gap: var(--space-3);
  align-content: start;
  font-size: var(--text-sm);
}

.credits__photo :deep(img) {
  border: var(--border-rule) solid var(--color-primary);
  border-radius: var(--radius-card);
}

.credits__photo-text {
  display: grid;
  gap: var(--space-1);
}

.credits__usage {
  color: var(--color-text-muted);
  font-size: var(--text-xs);
}
</style>
