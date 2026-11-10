<script setup lang="ts">
import PageHeader from '@/components/layout/PageHeader.vue'
import { usePageMeta } from '@/composables/usePageMeta'

/**
 * Mentions légales (LCEN, article 6) d'un site de portfolio personnel,
 * non commercial. Le commerce présenté est fictif ; l'éditrice et
 * l'hébergeur, eux, sont réels.
 */
const UPDATED_ON = '10 novembre 2026'

usePageMeta({
  title: "Mentions légales · L'Encre & le Grain (boutique fictive)",
  description:
    "Éditrice, hébergeur et données personnelles du site de démonstration L'Encre & le Grain, projet de portfolio non commercial.",
  path: '/mentions-legales',
})
</script>

<template>
  <PageHeader
    title-id="legal-title"
    eyebrow="Mentions"
    crumb="Mentions légales"
    :note="`Dernière mise à jour : ${UPDATED_ON}.`"
  >
    <template #title>Mentions <em>légales</em></template>
    <p>
      Qui publie ce site, où il est hébergé et ce qu'il fait (ou ne fait pas) de vos données. Le
      café-librairie est fictif ; ces informations, elles, sont réelles.
    </p>
  </PageHeader>

  <section class="legal section" aria-labelledby="legal-title">
    <div class="container">
      <div class="legal__inner">
      <section class="legal__block" aria-labelledby="legal-site">
        <h2 id="legal-site">Nature du site</h2>
        <p>
          L'Encre &amp; le Grain est un <strong>site de démonstration</strong> réalisé pour un
          portfolio personnel de développeuse web. Le commerce présenté n'existe pas : le lieu, la
          carte, les prix du café, l'adresse, le téléphone, l'e-mail et les horaires sont inventés.
          Les livres présentés existent ; leurs prix sont indicatifs.
        </p>
        <p>
          Le site est non commercial : aucune vente, commande, réservation ni inscription n'est
          possible.
        </p>
      </section>

      <section class="legal__block" aria-labelledby="legal-publisher">
        <h2 id="legal-publisher">Éditrice et directrice de la publication</h2>
        <p>
          Laura Dimitroff, à titre personnel.<br />
          Contact :
          <a href="https://github.com/lauradimitroff" rel="noopener">profil GitHub de Laura Dimitroff</a>.
        </p>
        <p>
          Le code source du site est consultable sur
          <a href="https://github.com/lauradimitroff/lencre-et-le-grain" rel="noopener">GitHub</a>.
        </p>
      </section>

      <section class="legal__block" aria-labelledby="legal-host">
        <h2 id="legal-host">Hébergement</h2>
        <p>
          Vercel Inc.<br />
          440 N Barranca Avenue #4133<br />
          Covina, CA 91723, États-Unis<br />
          <a href="https://vercel.com" rel="noopener">vercel.com</a>
        </p>
      </section>

      <section class="legal__block" aria-labelledby="legal-data">
        <h2 id="legal-data">Données personnelles et cookies</h2>
        <ul class="legal__list">
          <li>
            <strong>Aucun cookie</strong> n'est déposé, et le site n'utilise aucun outil de mesure
            d'audience ni de publicité.
          </li>
          <li>
            <strong>Les formulaires n'envoient rien.</strong> Le formulaire de contact et
            l'inscription à la lettre d'information vérifient la saisie dans votre navigateur,
            sans rien transmettre ni enregistrer.
          </li>
          <li>
            <strong>Images.</strong> Les photos sont chargées depuis le service d'images
            d'Unsplash. Comme pour toute ressource hébergée ailleurs, Unsplash reçoit alors votre
            adresse IP et les informations techniques habituelles de votre navigateur.
          </li>
          <li>
            <strong>Hébergement.</strong> Comme tout hébergeur, Vercel peut conserver des journaux
            techniques des connexions (dont l'adresse IP) pour assurer le fonctionnement et la
            sécurité du service.
          </li>
          <li>
            Les polices sont hébergées avec le site : aucune requête n'est faite à Google Fonts.
          </li>
        </ul>
        <p>
          Le site ne collectant aucune donnée lui-même, il n'y a rien à consulter, rectifier ou
          supprimer de notre côté. Pour toute question, écrivez via le contact indiqué plus haut.
        </p>
      </section>

      <section class="legal__block" aria-labelledby="legal-ip">
        <h2 id="legal-ip">Propriété intellectuelle</h2>
        <p>
          Sauf mention contraire, les textes, le code et les illustrations du site (couvertures
          dessinées, plan, logo) sont de Laura Dimitroff. Les photographies, les polices et les
          sources d'information appartiennent à leurs auteurs et sont utilisées selon leurs
          licences : le détail est sur la page
          <RouterLink to="/credits">Crédits</RouterLink>.
        </p>
        <p>
          Les titres et noms d'auteurs des livres cités restent la propriété de leurs auteurs et
          éditeurs. Les couvertures des éditeurs ne sont pas reproduites.
        </p>
      </section>
    </div>
    </div>
  </section>
</template>

<style scoped>
/* La mention sous l'en-tête sert déjà de transition : moins d'espace en haut */
.legal.section {
  padding-top: var(--space-6);
}

.legal__inner {
  display: grid;
  gap: var(--space-7);
  max-width: 56rem;
}

.legal__block {
  display: grid;
  gap: var(--space-4);
  padding-top: var(--space-5);
  border-top: var(--border-rule) solid var(--color-primary);
}

.legal__block h2 {
  font-size: var(--text-xl);
  font-weight: 400;
}

.legal__block p,
.legal__list {
  max-width: 65ch;
  line-height: var(--leading-body);
}

.legal__list {
  display: grid;
  gap: var(--space-3);
  margin: 0;
  padding-left: 1.25rem;
}

.legal__list li::marker {
  color: var(--color-warm);
}

.legal a {
  color: var(--color-primary);
}
</style>
