<script setup lang="ts">
import PageHeader from '@/components/layout/PageHeader.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { lineIcons } from '@/data/icons'
import { photos } from '@/data/images'

const promises = [
  {
    title: 'Prendre son temps',
    icon: lineIcons.cup,
    text: "Personne ne vous presse. La table près de la fenêtre est à celle ou celui qui l'a trouvée.",
  },
  {
    title: 'Choisir un par un',
    icon: lineIcons.book,
    text: "Chaque livre en rayon a été lu ou défendu par quelqu'un de l'équipe. Pas de piles imposées.",
  },
  {
    title: 'Tout végétal',
    icon: lineIcons.leaf,
    text: 'Laits, pâtisseries, glaçages : la carte entière est végétale, pour plaire au plus grand nombre.',
  },
]

usePageMeta({
  title: "Notre histoire · L'Encre & le Grain (boutique fictive)",
  description:
    "Comment une ancienne imprimerie de quartier est devenue un café-librairie : l'histoire, imaginée pour ce projet, de L'Encre & le Grain.",
  path: '/histoire',
  ogImage: 'histoire',
})
</script>

<template>
  <PageHeader title-id="story-title" eyebrow="Notre histoire" crumb="Notre histoire">
    <template #title>
      Une ancienne imprimerie, <em>trois fauteuils</em> et beaucoup de papier
    </template>
    <p>
      L'Encre &amp; le Grain est né d'une envie simple : réunir sous le même toit les deux choses
      qui font les bons après-midi, un livre et une tasse.
    </p>
    <small>Ce lieu et son histoire sont imaginés pour un projet de portfolio.</small>
  </PageHeader>

  <article class="story" aria-labelledby="story-title">
    <div class="container story__inner">
      <figure class="story__figure">
        <ResponsiveImage
          :photo="photos.vintageBookStacks"
          :ratio="21 / 9"
          sizes="(min-width: 76rem) 76rem, 100vw"
          :widths="[640, 1080, 1440, 1920]"
        />
      </figure>

      <div class="story__body">
        <section aria-labelledby="story-imprimerie">
          <h2 id="story-imprimerie">L'imprimerie du passage des Lettres</h2>
          <div class="story__text">
            <p class="story__lede">
              Pendant près de soixante ans, le 12, passage des Lettres a imprimé les faire-part, les
              menus et les affiches du quartier. Quand la presse s'est arrêtée, la boutique est restée
              fermée, ses hautes fenêtres couvertes de papier kraft.
            </p>
            <p>
              Le parquet était taché d'encre, les établis n'avaient pas bougé, et il flottait encore
              une odeur de papier. Nous avons su tout de suite que nous ne voulions pas effacer ce
              passé, mais vivre avec.
            </p>
          </div>
        </section>

        <section aria-labelledby="story-travaux">
          <h2 id="story-travaux">Garder les traces</h2>
          <div class="story__text">
            <p>
              Les établis sont devenus des tables de lecture, le comptoir a été poncé à la main, et la
              machine à espresso a pris la place exacte de la presse. Les casiers à caractères en bois
              accueillent aujourd'hui les marque-pages et les cartes postales.
            </p>
            <p>
              Trois fauteuils dépareillés, chinés dans les brocantes du coin, attendent près de la
              fenêtre. Ce sont les places les plus convoitées de la maison.
            </p>
          </div>
        </section>

        <blockquote class="story__quote">
          <p>« On ne vend pas des livres et du café. On vend une heure de calme, et on l'emballe dans du kraft. »</p>
          <footer>La librairie, à l'ouverture</footer>
        </blockquote>

        <section aria-labelledby="story-cafe">
          <h2 id="story-cafe">Le café, torréfié à deux rues</h2>
          <div class="story__text">
            <p>
              Notre café vient d'un petit torréfacteur installé à deux rues d'ici. Ensemble, nous avons
              composé l'assemblage maison de l'espresso, aux notes de cacao et de noisette grillée.
              Au filtre, l'origine change chaque semaine, au gré des arrivages.
            </p>
            <p>
              Les pâtisseries sortent du four tous les matins. Elles sont entièrement végétales, comme
              le reste de la carte : un choix fait dès le premier jour, et que personne n'a jamais
              regretté.
            </p>
          </div>
        </section>

        <figure class="story__figure story__figure--inline">
          <ResponsiveImage
            :photo="photos.pourOver"
            :ratio="21 / 9"
            sizes="(min-width: 76rem) 76rem, 100vw"
            :widths="[640, 1080, 1440, 1920]"
          />
        </figure>

        <section aria-labelledby="story-livres">
          <h2 id="story-livres">Les livres, choisis un par un</h2>
          <div class="story__text">
            <p>
              Ici, pas de tables chargées de nouveautés imposées. Chaque livre en rayon a été lu, ou
              au moins défendu avec passion, par quelqu'un de l'équipe. La sélection change avec les
              saisons : en ce moment, elle sent la feuille morte, la tisane et le sortilège.
            </p>
            <p>
              Et si un titre vous plaît, rien ne vous empêche de le feuilleter un long moment, une
              tasse à la main. C'est même un peu pour ça que nous sommes là.
            </p>
          </div>
        </section>
      </div>

      <section class="story__promises" aria-labelledby="story-promesses">
        <h2 id="story-promesses">Ce que l'on vous promet</h2>
        <ul>
          <li v-for="(promise, index) in promises" :key="promise.title" v-reveal="index * 120">
            <span class="story__badge">
              <svg
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
                <path v-for="d in promise.icon" :key="d" :d="d" />
              </svg>
            </span>
            <h3>{{ promise.title }}</h3>
            <p>{{ promise.text }}</p>
          </li>
        </ul>
      </section>

      <div class="story__actions">
        <BaseButton to="/librairie">Découvrir la sélection</BaseButton>
        <BaseButton to="/carte" variant="secondary">Voir la carte du café</BaseButton>
      </div>
    </div>
  </article>
</template>

<style scoped>
.story {
  padding-block: var(--space-section);
}

.story__inner {
  display: grid;
  gap: var(--space-7);
}









.story__figure {
  margin: 0;
  overflow: hidden;
  border: var(--border-rule) solid var(--color-primary);
  border-radius: var(--radius-card);
}

/* Récit à la largeur du conteneur : titre à gauche, texte à droite sur grand écran */
.story__body {
  display: grid;
  gap: var(--space-7);
}

.story__body section {
  display: grid;
  gap: var(--space-4);
}

.story__text {
  display: grid;
  gap: var(--space-4);
}

.story__body h2,
.story__promises h2 {
  font-size: var(--text-xl);
  font-weight: 400;
}

.story__body p {
  line-height: var(--leading-body);
}

/* Lettrine éditoriale */
.story__lede::first-letter {
  float: left;
  margin: 0.08em 0.12em 0 0;
  color: var(--color-primary);
  font-family: var(--font-serif);
  font-size: 3.6em;
  font-weight: 340;
  line-height: 0.8;
}

.story__quote {
  display: grid;
  gap: var(--space-3);
  margin: 0;
  padding-block: var(--space-5);
  border-block: var(--border-rule) solid var(--color-primary);
}

.story__quote p {
  color: var(--color-primary);
  font-family: var(--font-serif);
  font-size: var(--text-xl);
  font-style: italic;
  font-weight: 320;
  line-height: 1.3;
}

.story__quote footer {
  color: var(--color-text-muted);
  font-size: var(--text-xs);
  letter-spacing: 0.04em;
}

.story__promises {
  display: grid;
  gap: var(--space-5);
  padding: var(--space-6) var(--space-5);
  border-radius: var(--radius-card);
  background: var(--color-library);
}

.story__promises ul {
  display: grid;
  gap: var(--space-5);
  margin: 0;
  padding: 0;
  list-style: none;
}

.story__promises li {
  display: grid;
  gap: var(--space-2);
  justify-items: start;
}

.story__badge {
  display: grid;
  place-items: center;
  width: 3.5rem;
  height: 3.5rem;
  margin-bottom: var(--space-2);
  border: var(--border-rule) solid var(--color-primary);
  border-radius: 50%;
  background: var(--cream-50);
  color: var(--color-primary);
}

.story__promises h3 {
  font-size: var(--text-lg);
  font-weight: 420;
}

.story__promises p {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.story__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
}

@media (min-width: 56rem) {
  .story__body section {
    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
    gap: var(--space-8);
    align-items: start;
  }

  .story__text p {
    max-width: 68ch;
  }
}

@media (min-width: 48rem) {
  .story__promises {
    padding: var(--space-7);
  }

  .story__promises ul {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-6);
  }
}
</style>
