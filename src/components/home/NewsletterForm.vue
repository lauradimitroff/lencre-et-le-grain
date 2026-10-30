<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'

type FormState = 'idle' | 'invalid' | 'demo'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const email = ref('')
const state = ref<FormState>('idle')

/**
 * Aucune donnée n'est envoyée : sans backend, le formulaire valide la
 * saisie puis explique qu'il s'agit d'une démonstration.
 */
function onSubmit() {
  state.value = EMAIL_PATTERN.test(email.value.trim()) ? 'demo' : 'invalid'
}

function onInput() {
  if (state.value !== 'idle') state.value = 'idle'
}
</script>

<template>
  <form class="newsletter-form" novalidate @submit.prevent="onSubmit">
    <label for="newsletter-email" class="newsletter-form__label">Votre adresse e-mail</label>
    <div class="newsletter-form__row">
      <input
        id="newsletter-email"
        v-model="email"
        class="newsletter-form__input"
        type="email"
        name="email"
        autocomplete="email"
        inputmode="email"
        placeholder="prenom@exemple.fr"
        :aria-invalid="state === 'invalid'"
        aria-describedby="newsletter-hint newsletter-feedback"
        @input="onInput"
      />
      <BaseButton type="submit">S'inscrire</BaseButton>
    </div>
    <p id="newsletter-hint" class="newsletter-form__hint">
      Démonstration : ce formulaire n'envoie et n'enregistre aucune adresse.
    </p>
    <p id="newsletter-feedback" class="newsletter-form__feedback" role="status" aria-live="polite">
      <span v-if="state === 'invalid'" class="is-error">
        Cette adresse semble incomplète. Vérifiez qu'elle ressemble à prenom@exemple.fr.
      </span>
      <span v-else-if="state === 'demo'" class="is-demo">
        Adresse valide. Comme il s'agit d'une démonstration, elle n'a été ni envoyée ni
        enregistrée : vous ne recevrez aucun e-mail.
      </span>
    </p>
  </form>
</template>

<style scoped>
.newsletter-form {
  display: grid;
  gap: var(--space-3);
}

.newsletter-form__label {
  font-weight: 600;
  font-size: var(--text-sm);
}

.newsletter-form__row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.newsletter-form__input {
  flex: 1 1 14rem;
  min-width: 0;
  min-height: 2.875rem;
  padding: 0.75rem 1rem;
  border: var(--border-rule) solid var(--color-primary);
  border-radius: var(--radius-btn);
  background: var(--color-surface);
  color: var(--color-text);
}

.newsletter-form__input::placeholder {
  color: #6b746f;
}

.newsletter-form__input:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

.newsletter-form__input[aria-invalid='true'] {
  border-color: #8a2f1d;
}

.newsletter-form__hint {
  color: var(--color-text-muted);
  font-size: var(--text-xs);
}

.newsletter-form__feedback {
  min-height: 1.5em;
  font-size: var(--text-sm);
}

.is-error {
  color: #8a2f1d;
  font-weight: 550;
}

.is-demo {
  display: block;
  padding: var(--space-3) var(--space-4);
  border: var(--border-rule) solid var(--color-primary);
  border-radius: var(--radius-btn);
  background: var(--color-surface);
  color: var(--color-primary);
}
</style>
