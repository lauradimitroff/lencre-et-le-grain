<template>
  <p class="demo-banner">
    <span class="demo-banner__tag">Démo</span>
    <!-- Sur mobile, une seule ligne ; le texte complet à partir de la tablette -->
    <span class="demo-banner__short">Boutique fictive, projet de portfolio</span>
    <span class="demo-banner__long">
      Boutique fictive réalisée pour un portfolio : le lieu, la carte, l'adresse et les horaires
      sont inventés. Les livres présentés existent vraiment.
    </span>
  </p>
</template>

<style scoped>
.demo-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: 0.3rem var(--gutter);
  background: var(--color-primary);
  color: var(--cream-100);
  font-size: var(--text-2xs);
  line-height: 1.3;
  text-align: center;
}

.demo-banner__tag {
  flex: none;
  padding: 0.05rem 0.35rem;
  border: 1px solid currentColor;
  border-radius: var(--radius-xs);
  font-size: 0.625rem;
  font-weight: 650;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
}

.demo-banner__short {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.demo-banner__long {
  display: none;
}

@media (min-width: 48rem) {
  .demo-banner {
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-3);
    padding: var(--space-2) var(--gutter);
    font-size: var(--text-xs);
  }

  .demo-banner__tag {
    padding: 0.15rem 0.45rem;
    font-size: var(--text-2xs);
  }

  .demo-banner__short {
    display: none;
  }

  .demo-banner__long {
    display: inline;
  }
}
</style>
