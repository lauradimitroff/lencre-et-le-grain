<script setup lang="ts">
import BrandLogo from './BrandLogo.vue'
import OpeningBadge from '@/components/ui/OpeningBadge.vue'
import { mainNavigation } from '@/data/navigation'
import { shopInfo } from '@/data/shop'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer__inner container">
      <div class="footer__brand">
        <BrandLogo tone="light" />
        <p>{{ shopInfo.tagline }}. Un lieu pour lire, boire un bon café et prendre son temps.</p>
      </div>

      <nav class="footer__col" aria-labelledby="footer-explorer">
        <h2 id="footer-explorer" class="footer__title">Explorer</h2>
        <ul class="footer__list">
          <li v-for="item in mainNavigation" :key="item.label">
            <RouterLink :to="item.to">{{ item.label }}</RouterLink>
          </li>
          <li><RouterLink to="/contact">Contact</RouterLink></li>
          <li><RouterLink :to="{ path: '/', hash: '#newsletter' }">Lettre d'information</RouterLink></li>
          <li><RouterLink to="/credits">Crédits</RouterLink></li>
        </ul>
      </nav>

      <section id="infos" class="footer__col" aria-labelledby="footer-infos">
        <h2 id="footer-infos" class="footer__title">
          Infos pratiques <span class="footer__fiction">fictives</span>
        </h2>
        <address class="footer__address">
          <span v-for="line in shopInfo.address" :key="line">{{ line }}</span>
          <span>{{ shopInfo.phone }}</span>
          <span>{{ shopInfo.email }}</span>
        </address>
      </section>

      <section class="footer__col" aria-labelledby="footer-hours">
        <h2 id="footer-hours" class="footer__title">
          Horaires <span class="footer__fiction">fictifs</span>
        </h2>
        <OpeningBadge tone="dark" class="footer__opening" />
        <dl class="footer__hours">
          <div v-for="slot in shopInfo.hours" :key="slot.days">
            <dt>{{ slot.days }}</dt>
            <dd>{{ slot.hours }}</dd>
          </div>
        </dl>
      </section>
    </div>

    <div class="footer__legal container">
      <p>
        © {{ year }} L'Encre &amp; le Grain, projet de portfolio. Ce commerce n'existe pas : aucune
        commande ni réservation n'est possible.
      </p>
      <p>
        Les couvertures sont des illustrations créées pour le site. Photos, polices et sources :
        <RouterLink to="/credits" class="footer__legal-link">voir les crédits</RouterLink>.
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding-block: var(--space-8) var(--space-5);
  background: var(--color-primary);
  color: var(--cream-100);
  font-size: var(--text-sm);
}

.footer a {
  color: var(--cream-50);
  text-decoration: none;
  transition: color var(--duration-fast) ease;
}

.footer a:hover {
  color: var(--kraft-400);
}

.footer :focus-visible {
  outline-color: var(--kraft-400);
}

.footer__inner {
  display: grid;
  gap: var(--space-7);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr));
  padding-bottom: var(--space-7);
}

.footer__brand {
  display: grid;
  gap: var(--space-4);
  align-content: start;
}

.footer__brand p {
  max-width: 30ch;
  color: rgb(246 240 228 / 0.82);
}

.footer__col {
  display: grid;
  gap: var(--space-4);
  align-content: start;
}

.footer__title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding-bottom: var(--space-3);
  border-bottom: var(--border-rule) solid rgb(216 195 160 / 0.4);
  color: var(--kraft-400);
  font-family: var(--font-sans);
  font-size: var(--text-2xs);
  font-weight: 650;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
}

.footer__fiction {
  padding: 0.1rem 0.35rem;
  border: 1px solid currentColor;
  border-radius: var(--radius-xs);
  font-size: 0.6rem;
}

.footer__list {
  display: grid;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.footer__address {
  display: grid;
  gap: var(--space-1);
  font-style: normal;
}

.footer__hours {
  display: grid;
  gap: var(--space-2);
  margin: 0;
}

.footer__hours div {
  display: flex;
  justify-content: space-between;
  gap: var(--space-4);
}

.footer__hours dd {
  margin: 0;
  font-variant-numeric: tabular-nums;
  text-align: right;
}

.footer__legal {
  display: grid;
  gap: var(--space-2);
  padding-top: var(--space-5);
  border-top: 1px solid rgb(246 240 228 / 0.18);
  color: rgb(246 240 228 / 0.75);
  font-size: var(--text-xs);
}
.footer__legal .footer__legal-link {
  color: var(--kraft-400);
  font-weight: 600;
}

.footer__legal .footer__legal-link:hover {
  color: var(--cream-50);
}
.footer__opening {
  margin-bottom: var(--space-4);
}
</style>
