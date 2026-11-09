<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import MenuCard from '@/components/cafe/MenuCard.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import { photos } from '@/data/images'
import { getBestSellers, getMenu } from '@/services/catalog'
import { pluralize } from '@/utils/format'

const bestSellers = getBestSellers()
const totalCount = getMenu().reduce((sum, section) => sum + section.items.length, 0)
</script>

<template>
  <section id="cafe" class="cafe section" aria-labelledby="cafe-title">
    <div class="container cafe__inner">
      <div class="cafe__intro">
        <SectionHeader
          title-id="cafe-title"
          eyebrow="Le café"
          title="Torréfié tout près, servi sans hâte"
          lead="Un assemblage maison pour l'espresso, une origine qui change chaque semaine au filtre, et des pâtisseries végétales sorties du four le matin même."
        />
        <figure class="cafe__media" v-reveal>
          <ResponsiveImage
            :photo="photos.pourOver"
            :ratio="3 / 2"
            sizes="(min-width: 56rem) 34vw, 100vw"
            :widths="[480, 720, 960]"
          />
        </figure>
      </div>

      <MenuCard
        :sections="bestSellers"
        title="Les plus demandés"
        intro="Ce que l'on commande le plus au comptoir en ce moment. Tout est végétal, des laits aux pâtisseries."
        v-reveal
      >
        <BaseButton to="/carte">Voir toute la carte</BaseButton>
        <p class="cafe__count">{{ pluralize(totalCount, 'boisson ou douceur', 'boissons et douceurs') }} au total</p>
      </MenuCard>
    </div>
  </section>
</template>

<style scoped>
.cafe__inner {
  display: grid;
  gap: var(--space-7);
}

.cafe__intro {
  display: grid;
  gap: var(--space-6);
  align-items: end;
}

.cafe__media {
  margin: 0;
  overflow: hidden;
  border: var(--border-rule) solid var(--color-primary);
  border-radius: var(--radius-card);
}

.cafe__count {
  color: var(--color-cafe-ink);
  font-size: var(--text-xs);
}

@media (min-width: 56rem) {
  .cafe__intro {
    grid-template-columns: 1.2fr 0.8fr;
    gap: var(--space-8);
  }
}
</style>
