<script setup lang="ts">
import { computed, nextTick, reactive, ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import {
  contactSubjects,
  MESSAGE_MAX_LENGTH,
  validateContact,
  type ContactErrors,
  type ContactFields,
} from '@/utils/contactForm'

/**
 * Formulaire de contact de démonstration : il valide la saisie, simule un
 * court envoi, puis dit clairement que rien n'a été envoyé ni enregistré.
 * Aucune donnée ne quitte le navigateur.
 */
type FormState = 'editing' | 'sending' | 'sent'

const fields = reactive<ContactFields>({ name: '', email: '', subject: '', message: '' })
const errors = ref<ContactErrors>({})
const state = ref<FormState>('editing')
const triedOnce = ref(false)
const sentName = ref('')
const sentSubject = ref('')
const resultHeading = ref<HTMLElement | null>(null)
const formRef = ref<HTMLFormElement | null>(null)

const messageLength = computed(() => fields.message.trim().length)
const order: (keyof ContactFields)[] = ['name', 'email', 'subject', 'message']

/* Après une première tentative, les erreurs se corrigent au fil de la saisie */
function revalidate() {
  if (triedOnce.value) errors.value = validateContact(fields)
}

async function onSubmit() {
  triedOnce.value = true
  errors.value = validateContact(fields)
  const firstInvalid = order.find((key) => errors.value[key])
  if (firstInvalid) {
    await nextTick()
    formRef.value?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
    return
  }

  state.value = 'sending'
  // Petite attente pour l'effet « envoi » ; aucune requête n'est faite.
  await new Promise((resolve) => setTimeout(resolve, 700))
  sentName.value = fields.name.trim()
  sentSubject.value = contactSubjects.find((s) => s.value === fields.subject)?.label ?? ''
  state.value = 'sent'
  await nextTick()
  resultHeading.value?.focus()
}

function reset() {
  Object.assign(fields, { name: '', email: '', subject: '', message: '' })
  errors.value = {}
  triedOnce.value = false
  state.value = 'editing'
}

const describedBy = (key: keyof ContactFields, extra?: string) =>
  [extra, errors.value[key] ? `contact-${key}-error` : undefined].filter(Boolean).join(' ') ||
  undefined
</script>

<template>
  <div class="contact-form">
    <div v-if="state === 'sent'" class="contact-form__sent" data-testid="contact-sent">
      <p class="contact-form__sent-stamp" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 12.5l5 5L20 6.5" />
        </svg>
      </p>
      <h3 ref="resultHeading" class="contact-form__sent-title" tabindex="-1">
        Merci, {{ sentName }}&nbsp;!
      </h3>
      <p>
        Votre message «&nbsp;{{ sentSubject }}&nbsp;» est parfaitement rédigé. Il aurait été transmis à
        l'équipe…
      </p>
      <p class="contact-form__sent-demo">
        <strong>Mais ce site est une démonstration&nbsp;:</strong> votre message n'a été ni envoyé ni
        enregistré. Personne ne le lira, et vous ne recevrez pas de réponse.
      </p>
      <BaseButton variant="secondary" @click="reset">Écrire un autre message</BaseButton>
    </div>

    <form
      v-else
      ref="formRef"
      class="contact-form__form"
      novalidate
      aria-labelledby="contact-form-title"
      @submit.prevent="onSubmit"
    >
      <p class="contact-form__demo">
        <span class="contact-form__demo-tag">Démo</span>
        Ce formulaire n'envoie et n'enregistre rien.
      </p>

      <div class="contact-form__row">
        <div class="contact-form__field">
          <label for="contact-name">Nom ou prénom</label>
          <input
            id="contact-name"
            v-model="fields.name"
            name="name"
            type="text"
            autocomplete="name"
            :aria-invalid="Boolean(errors.name)"
            :aria-describedby="describedBy('name')"
            @input="revalidate"
          />
          <p v-if="errors.name" id="contact-name-error" class="contact-form__error">
            {{ errors.name }}
          </p>
        </div>

        <div class="contact-form__field">
          <label for="contact-email">Adresse e-mail</label>
          <input
            id="contact-email"
            v-model="fields.email"
            name="email"
            type="email"
            inputmode="email"
            autocomplete="email"
            placeholder="prenom@exemple.fr"
            :aria-invalid="Boolean(errors.email)"
            :aria-describedby="describedBy('email')"
            @input="revalidate"
          />
          <p v-if="errors.email" id="contact-email-error" class="contact-form__error">
            {{ errors.email }}
          </p>
        </div>
      </div>

      <div class="contact-form__field">
        <label for="contact-subject">Sujet</label>
        <select
          id="contact-subject"
          v-model="fields.subject"
          name="subject"
          :aria-invalid="Boolean(errors.subject)"
          :aria-describedby="describedBy('subject')"
          @change="revalidate"
        >
          <option value="" disabled>Choisir un sujet</option>
          <option v-for="subject in contactSubjects" :key="subject.value" :value="subject.value">
            {{ subject.label }}
          </option>
        </select>
        <p v-if="errors.subject" id="contact-subject-error" class="contact-form__error">
          {{ errors.subject }}
        </p>
      </div>

      <div class="contact-form__field">
        <label for="contact-message">Message</label>
        <textarea
          id="contact-message"
          v-model="fields.message"
          name="message"
          rows="6"
          :maxlength="MESSAGE_MAX_LENGTH + 50"
          :aria-invalid="Boolean(errors.message)"
          :aria-describedby="describedBy('message', 'contact-message-count')"
          @input="revalidate"
        ></textarea>
        <p v-if="errors.message" id="contact-message-error" class="contact-form__error">
          {{ errors.message }}
        </p>
        <p id="contact-message-count" class="contact-form__count">
          {{ messageLength }} / {{ MESSAGE_MAX_LENGTH }} caractères
        </p>
      </div>

      <div class="contact-form__actions">
        <BaseButton type="submit" :disabled="state === 'sending'">
          <span v-if="state === 'sending'" class="contact-form__spinner" aria-hidden="true"></span>
          {{ state === 'sending' ? 'Envoi…' : 'Envoyer le message' }}
        </BaseButton>
      </div>
      <p class="visually-hidden" role="status">
        {{ state === 'sending' ? 'Envoi en cours' : '' }}
      </p>
    </form>
  </div>
</template>

<style scoped>
.contact-form__form {
  display: grid;
  gap: var(--space-5);
}

.contact-form__demo {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text-muted);
  font-size: var(--text-xs);
}

.contact-form__demo-tag {
  padding: 0.1rem 0.4rem;
  border: 1px solid currentColor;
  border-radius: var(--radius-xs);
  color: var(--color-primary);
  font-size: var(--text-2xs);
  font-weight: 650;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
}

.contact-form__row {
  display: grid;
  gap: var(--space-5);
}

.contact-form__field {
  display: grid;
  gap: var(--space-2);
  min-width: 0;
}

.contact-form__field label {
  font-size: var(--text-sm);
  font-weight: 600;
}

.contact-form__field input,
.contact-form__field select,
.contact-form__field textarea {
  width: 100%;
  min-height: 2.875rem;
  padding: 0.75rem 1rem;
  border: var(--border-rule) solid var(--color-primary);
  border-radius: var(--radius-btn);
  background: var(--color-surface);
  color: var(--color-text);
  font: inherit;
  font-size: 1rem;
}

.contact-form__field select {
  appearance: none;
  padding-right: 2.5rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M4 6l4 4 4-4' fill='none' stroke='%234e3020' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-position: right 0.9rem center;
  background-repeat: no-repeat;
  background-size: 1rem;
}

.contact-form__field textarea {
  min-height: 9rem;
  line-height: 1.55;
  resize: vertical;
}

.contact-form__field :is(input, select, textarea)::placeholder {
  color: #6b5d52;
}

.contact-form__field :is(input, select, textarea):focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

.contact-form__field [aria-invalid='true'] {
  border-color: #8a2f1d;
  box-shadow: inset 0 0 0 1px #8a2f1d;
}

.contact-form__count {
  justify-self: end;
  color: var(--color-text-muted);
  font-size: var(--text-xs);
  font-variant-numeric: tabular-nums;
}

.contact-form__error {
  color: #8a2f1d;
  font-size: var(--text-sm);
  font-weight: 550;
}

.contact-form__actions :deep(.btn[disabled]) {
  cursor: progress;
  opacity: 0.8;
}

.contact-form__spinner {
  width: 0.9rem;
  height: 0.9rem;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: contact-spin 700ms linear infinite;
}

@keyframes contact-spin {
  to {
    transform: rotate(360deg);
  }
}

/* ---------- Message « envoyé » ---------- */
.contact-form__sent {
  display: grid;
  gap: var(--space-4);
  justify-items: start;
  padding: var(--space-6) var(--space-5);
  border: var(--border-rule) solid var(--color-primary);
  border-radius: var(--radius-card);
  background: var(--color-surface);
  box-shadow: var(--shadow-lift);
  animation: contact-sent-in var(--duration-reveal) var(--ease-out) both;
}

.contact-form__sent-stamp {
  display: grid;
  place-items: center;
  width: 3.5rem;
  height: 3.5rem;
  border: var(--border-rule) solid var(--color-primary);
  border-radius: 50%;
  background: var(--color-library);
  color: var(--color-primary);
}

.contact-form__sent-title {
  font-size: var(--text-2xl);
  font-weight: 360;
}

.contact-form__sent-title:focus {
  outline: none;
}

.contact-form__sent-demo {
  padding: var(--space-3) var(--space-4);
  border-left: 3px solid var(--color-warm);
  background: var(--color-library);
  font-size: var(--text-sm);
}

@keyframes contact-sent-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-form__spinner,
  .contact-form__sent {
    animation: none;
  }
}

@media (min-width: 40rem) {
  .contact-form__row {
    grid-template-columns: 1fr 1fr;
  }

  .contact-form__sent {
    padding: var(--space-7);
  }
}
</style>
