<script setup lang="ts">
import ContactForm from '@/components/contact/ContactForm.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import OpeningBadge from '@/components/ui/OpeningBadge.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { shopInfo } from '@/data/shop'

usePageMeta({
  title: "Contact · L'Encre & le Grain (boutique fictive)",
  description:
    "Adresse, horaires et formulaire de contact du café-librairie imaginaire. Démonstration : les coordonnées sont fictives et le formulaire n'envoie rien.",
  path: '/contact',
  ogImage: 'contact',
})
</script>

<template>
  <PageHeader title-id="contact-title" eyebrow="Contact" crumb="Contact">
    <template #title>Nous trouver <em>&amp; nous écrire</em></template>
    <p>
      Une question sur un livre, sur la carte ou sur nos horaires ? Passez au comptoir, ou
      laissez-nous quelques lignes ci-dessous.
    </p>
    <small>Adresse, téléphone, e-mail et horaires sont fictifs ; le formulaire n'envoie rien.</small>
  </PageHeader>

  <section class="contact section" aria-labelledby="contact-title">
    <div class="container contact__grid">
      <!-- Infos pratiques -->
      <aside class="contact__infos" aria-labelledby="contact-infos-title">
        <h2 id="contact-infos-title" class="contact__title">Infos pratiques</h2>

        <!-- Plan illustratif : rues inventées, comme l'adresse -->
        <figure class="contact__map">
          <svg viewBox="0 0 320 200" role="img" aria-labelledby="contact-map-title">
            <title id="contact-map-title">
              Plan illustratif : le café-librairie se trouve dans le passage des Lettres, entre la rue
              du Moulin et la place de la Presse.
            </title>
            <rect width="320" height="200" fill="var(--color-library)" />
            <g fill="none" stroke="var(--kraft-400)" stroke-linecap="round">
              <path d="M-10 60 H330" stroke-width="18" />
              <path d="M90 -10 V210" stroke-width="14" />
              <path d="M-10 165 C80 150 200 185 330 150" stroke-width="12" />
              <path d="M90 112 H236" stroke-width="4" stroke-dasharray="1 8" stroke="var(--color-primary)" />
            </g>
            <circle cx="262" cy="112" r="24" fill="none" stroke="var(--kraft-400)" stroke-width="10" />
            <g fill="var(--color-text-muted)" font-family="var(--font-sans)" font-size="9" letter-spacing="1">
              <text x="120" y="63">RUE DU MOULIN</text>
              <text x="102" y="136">PASSAGE DES LETTRES</text>
              <text x="310" y="80" text-anchor="end">PLACE DE LA PRESSE</text>
            </g>
            <g transform="translate(196 112)">
              <circle r="15" fill="var(--color-primary)" />
              <text y="5" text-anchor="middle" fill="var(--sand-100)" font-family="var(--font-serif)" font-style="italic" font-size="16">&amp;</text>
            </g>
          </svg>
          <figcaption>Plan illustratif, rues et adresse inventées</figcaption>
        </figure>

        <dl class="contact__list">
          <div>
            <dt>Adresse</dt>
            <dd>
              <address>
                <span v-for="line in shopInfo.address" :key="line">{{ line }}</span>
              </address>
            </dd>
          </div>
          <div>
            <dt>Téléphone</dt>
            <dd>{{ shopInfo.phone }}</dd>
          </div>
          <div>
            <dt>E-mail</dt>
            <dd>{{ shopInfo.email }}</dd>
          </div>
        </dl>

        <div class="contact__hours">
          <h3 class="contact__subtitle">Horaires</h3>
          <OpeningBadge />
          <dl>
            <div v-for="slot in shopInfo.hours" :key="slot.days">
              <dt>{{ slot.days }}</dt>
              <dd>{{ slot.hours }}</dd>
            </div>
          </dl>
        </div>
      </aside>

      <!-- Formulaire -->
      <div class="contact__form">
        <h2 id="contact-form-title" class="contact__title">Nous écrire</h2>
        <p class="contact__lead">
          On répond d'habitude dans la journée, entre deux cafés.
        </p>
        <ContactForm />
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact__grid {
  display: grid;
  gap: var(--space-8);
}

.contact__title {
  font-size: var(--text-xl);
  font-weight: 400;
}

.contact__subtitle {
  font-family: var(--font-sans);
  font-size: var(--text-2xs);
  font-weight: 650;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-warm);
}

.contact__infos,
.contact__form {
  display: grid;
  gap: var(--space-5);
  align-content: start;
  min-width: 0;
}

.contact__lead {
  margin-top: calc(var(--space-3) * -1);
  color: var(--color-text-muted);
}

.contact__map {
  margin: 0;
  display: grid;
  gap: var(--space-2);
}

.contact__map svg {
  display: block;
  width: 100%;
  height: auto;
  border: var(--border-rule) solid var(--color-primary);
  border-radius: var(--radius-card);
}

.contact__map figcaption {
  color: var(--color-text-muted);
  font-size: var(--text-xs);
  font-style: italic;
}

.contact__list,
.contact__hours dl {
  display: grid;
  gap: var(--space-3);
  margin: 0;
}

.contact__list div,
.contact__hours dl div {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-1) var(--space-4);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--color-line);
}

.contact__list dt,
.contact__hours dt {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.contact__list dd,
.contact__hours dd {
  margin: 0;
  font-weight: 550;
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.contact__list address {
  display: grid;
  font-style: normal;
}

.contact__hours {
  display: grid;
  gap: var(--space-3);
  justify-items: start;
}

.contact__hours dl {
  width: 100%;
}

@media (min-width: 56rem) {
  .contact__grid {
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    gap: var(--space-8);
    align-items: start;
  }

  .contact__infos {
    position: sticky;
    top: calc(var(--header-height) + var(--space-5));
  }
}
</style>
