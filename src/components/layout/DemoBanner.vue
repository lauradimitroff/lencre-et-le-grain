<template>
  <p class="demo-banner">
    <span class="demo-banner__tag">Démo</span>
    Boutique fictive réalisée pour un portfolio : le lieu, la carte, l'adresse et les horaires sont
    inventés. Les livres présentés existent vraiment.
  </p>
</template>

<style scoped>
.demo-banner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--space-2) var(--space-3);
  padding: var(--space-2) var(--gutter);
  background: var(--color-primary);
  color: var(--cream-100);
  font-size: var(--text-xs);
  text-align: center;
}

.demo-banner__tag {
  padding: 0.15rem 0.45rem;
  border: 1px solid currentColor;
  border-radius: var(--radius-xs);
  font-size: var(--text-2xs);
  font-weight: 650;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
}
</style>
