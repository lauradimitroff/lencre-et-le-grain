<script setup lang="ts">
import BookCover from '@/components/books/BookCover.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { getPairings } from '@/services/catalog'
import { formatPrice } from '@/utils/format'

const pairings = getPairings()
</script>

<template>
  <section id="accords" class="pairings section" aria-labelledby="pairings-title">
    <div class="container pairings__inner">
      <SectionHeader
        title-id="pairings-title"
        eyebrow="Accords"
        title="Le livre à savourer avec votre café"
        lead="Comme un caviste accorde un vin à un plat, l'équipe associe chaque mois un livre à une boisson, et parfois à une douceur."
        align="center"
      />

      <ul class="pairings__list">
        <li v-for="(pairing, index) in pairings" :key="pairing.id" v-reveal="index * 80">
          <article class="pairing">
            <BookCover :book="pairing.book" size="sm" class="pairing__cover" />
            <div class="pairing__body">
              <p class="pairing__mood">{{ pairing.mood }}</p>
              <h3 class="pairing__title">
                {{ pairing.book.title }}
                <span class="pairing__plus" aria-hidden="true">+</span>
                <span class="visually-hidden">avec</span>
                <em>{{ pairing.drink.name }}</em>
              </h3>
              <p class="pairing__note">{{ pairing.note }}</p>
              <dl class="pairing__details">
                <div>
                  <dt>À lire</dt>
                  <dd>{{ pairing.book.author }} · {{ formatPrice(pairing.book.price) }}</dd>
                </div>
                <div>
                  <dt>À boire</dt>
                  <dd>{{ pairing.drink.name }} · {{ formatPrice(pairing.drink.price) }}</dd>
                </div>
                <div v-if="pairing.pastry">
                  <dt>À grignoter</dt>
                  <dd>{{ pairing.pastry.name }} · {{ formatPrice(pairing.pastry.price) }}</dd>
                </div>
              </dl>
            </div>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.pairings__inner {
  display: grid;
  gap: var(--space-7);
}

.pairings__list {
  display: grid;
  gap: var(--space-5);
  margin: 0;
  padding: 0;
  list-style: none;
}

.pairing {
  display: grid;
  grid-template-columns: minmax(5.5rem, 8rem) 1fr;
  gap: var(--space-5);
  height: 100%;
  padding: var(--space-5);
  border: var(--border-rule) solid var(--color-primary);
  border-radius: var(--radius-card);
  background: var(--color-surface);
  transition:
    transform var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out);
}

.pairing:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lift);
}

.pairing__cover {
  align-self: start;
}

.pairing__body {
  display: grid;
  gap: var(--space-3);
  align-content: start;
}

.pairing__mood {
  color: var(--color-warm);
  font-size: var(--text-2xs);
  font-weight: 650;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
}

.pairing__title {
  font-size: var(--text-xl);
  font-weight: 380;
  line-height: 1.15;
}

.pairing__title em {
  color: var(--color-warm);
  font-weight: 320;
}

.pairing__plus {
  display: inline-block;
  margin-inline: 0.15em;
  color: var(--color-text-muted);
  font-weight: 300;
}

.pairing__note {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.pairing__details {
  display: grid;
  gap: var(--space-2);
  margin: var(--space-2) 0 0;
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-line);
  font-size: var(--text-xs);
}

.pairing__details div {
  display: flex;
  flex-wrap: wrap;
  gap: 0.1rem var(--space-3);
}

.pairing__details dt {
  flex: 0 0 6.5rem;
  color: var(--color-cafe-ink);
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.pairing__details dd {
  flex: 1 1 12rem;
  margin: 0;
  font-variant-numeric: tabular-nums;
}

@media (min-width: 56rem) {
  .pairings__list {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6);
  }
}
</style>
