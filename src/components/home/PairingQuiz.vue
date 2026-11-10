<script setup lang="ts">
import { computed, nextTick, reactive, ref } from 'vue'
import BookCover from '@/components/books/BookCover.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { getQuizResult, quizQuestions, type QuizAnswers, type QuizQuestion } from '@/services/quiz'
import { formatPrice } from '@/utils/format'

/**
 * Quiz « Quel livre avec quel café ? ». Une question à la fois ; le focus
 * suit chaque nouvelle étape pour les personnes au clavier ou au lecteur d'écran.
 */
const questions = quizQuestions as QuizQuestion[]
const total = questions.length

const step = ref(0)
const answers = reactive<Partial<Record<keyof QuizAnswers, string>>>({})
const headingRef = ref<HTMLElement | null>(null)

// Pendant l'affichage du résultat, on garde la dernière question en référence
const question = computed(() => questions[Math.min(step.value, total - 1)]!)
const result = computed(() =>
  step.value >= total ? getQuizResult(answers as QuizAnswers) : null,
)

function choose(value: string) {
  answers[question.value.key] = value
  step.value += 1
}

function back() {
  if (step.value > 0) step.value -= 1
}

function restart() {
  for (const key of Object.keys(answers) as (keyof QuizAnswers)[]) delete answers[key]
  step.value = 0
}

/* Après chaque changement d'étape, on place le focus sur le nouveau titre */
async function focusHeading() {
  await nextTick()
  headingRef.value?.focus()
}
</script>

<template>
  <section class="quiz" aria-labelledby="quiz-title">
    <div class="quiz__intro">
      <p class="eyebrow">Le petit quiz</p>
      <h3 id="quiz-title" class="quiz__title">Quel livre avec <em>quel café ?</em></h3>
      <p class="quiz__lead">
        Trois questions, et l'équipe vous compose un accord sur mesure : un livre, une boisson et
        une douceur.
      </p>
      <ol class="quiz__dots" aria-hidden="true">
        <li
          v-for="n in total"
          :key="n"
          :class="{ 'is-done': step >= n, 'is-current': step === n - 1 }"
        />
      </ol>
    </div>

    <div class="quiz__stage">
      <Transition name="quiz-step" mode="out-in" @after-enter="focusHeading">
        <div v-if="!result" :key="step" class="quiz__step">
          <p class="quiz__progress" aria-hidden="true">Question {{ step + 1 }} sur {{ total }}</p>
          <h4 ref="headingRef" class="quiz__question" tabindex="-1">
            <span class="visually-hidden">Question {{ step + 1 }} sur {{ total }} : </span>
            {{ question.title }}
          </h4>

          <ul class="quiz__choices">
            <li v-for="choice in question.choices" :key="choice.value">
              <button
                type="button"
                class="quiz__choice"
                :aria-pressed="answers[question.key] === choice.value"
                @click="choose(choice.value)"
              >
                <span class="quiz__choice-label">{{ choice.label }}</span>
                <span class="quiz__choice-hint">{{ choice.hint }}</span>
              </button>
            </li>
          </ul>

          <button v-if="step > 0" type="button" class="quiz__back" @click="back">
            <span aria-hidden="true">←</span> Question précédente
          </button>
        </div>

        <div v-else key="result" class="quiz__result" data-testid="quiz-result">
          <BookCover :book="result.book" size="sm" class="quiz__cover" />
          <div class="quiz__result-body">
            <p class="quiz__progress">Votre accord</p>
            <h4 ref="headingRef" class="quiz__result-title" tabindex="-1">
              {{ result.book.title }}
              <span class="quiz__plus" aria-hidden="true">+</span>
              <span class="visually-hidden">avec</span>
              <em>{{ result.drink.name }}</em>
            </h4>
            <p class="quiz__author">{{ result.book.author }}</p>
            <p class="quiz__note">{{ result.note ?? result.book.summary }}</p>

            <dl class="quiz__details">
              <div>
                <dt>À lire</dt>
                <dd>{{ result.book.title }} · {{ formatPrice(result.book.price) }}</dd>
              </div>
              <div>
                <dt>À boire</dt>
                <dd>{{ result.drink.name }} · {{ formatPrice(result.drink.price) }}</dd>
              </div>
              <div>
                <dt>À grignoter</dt>
                <dd>{{ result.pastry.name }} · {{ formatPrice(result.pastry.price) }}</dd>
              </div>
            </dl>

            <div class="quiz__actions">
              <BaseButton to="/librairie">Voir la sélection</BaseButton>
              <BaseButton variant="secondary" @click="restart">Recommencer</BaseButton>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.quiz {
  display: grid;
  gap: var(--space-6);
  padding: var(--space-6) var(--space-5);
  border: var(--border-rule) solid var(--color-primary);
  border-radius: var(--radius-card);
  background: var(--color-library);
}

.quiz__intro {
  display: grid;
  gap: var(--space-3);
  align-content: start;
}

.quiz__title {
  font-size: var(--text-2xl);
  font-weight: 360;
  line-height: var(--leading-tight);
}

.quiz__title em,
.quiz__result-title em {
  color: var(--color-warm);
  font-weight: 320;
}

.quiz__lead {
  max-width: 40ch;
  color: var(--color-text-muted);
}

/* Avancement : trois pastilles qui se remplissent */
.quiz__dots {
  display: flex;
  gap: var(--space-2);
  margin: var(--space-2) 0 0;
  padding: 0;
  list-style: none;
}

.quiz__dots li {
  width: 2.25rem;
  height: 0.375rem;
  border-radius: var(--radius-pill);
  background: rgb(78 48 32 / 0.2);
  transition: background-color var(--duration-base) var(--ease-out);
}

.quiz__dots li.is-current {
  background: var(--color-accent);
}

.quiz__dots li.is-done {
  background: var(--color-primary);
}

.quiz__stage {
  min-width: 0;
}

.quiz__step {
  display: grid;
  gap: var(--space-4);
}

.quiz__progress {
  color: var(--color-warm);
  font-size: var(--text-2xs);
  font-weight: 650;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
}

.quiz__question,
.quiz__result-title {
  font-size: var(--text-xl);
  font-weight: 400;
  line-height: 1.2;
}

.quiz__question:focus,
.quiz__result-title:focus {
  outline: none;
}

.quiz__choices {
  display: grid;
  gap: var(--space-3);
  margin: 0;
  padding: 0;
  list-style: none;
}

.quiz__choice {
  display: grid;
  gap: var(--space-1);
  width: 100%;
  height: 100%;
  padding: var(--space-4);
  border: var(--border-rule) solid var(--color-primary);
  border-radius: var(--radius-btn);
  background: var(--color-surface);
  color: var(--color-text);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    transform var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out),
    background-color var(--duration-fast) var(--ease-out);
}

.quiz__choice:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-soft);
}

.quiz__choice[aria-pressed='true'] {
  background: var(--color-primary);
  color: var(--color-on-primary);
}

.quiz__choice-label {
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  line-height: 1.2;
}

.quiz__choice-hint {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.quiz__choice[aria-pressed='true'] .quiz__choice-hint {
  color: inherit;
  opacity: 0.85;
}

.quiz__back {
  justify-self: start;
  padding: var(--space-2) 0;
  border: 0;
  background: none;
  color: var(--color-primary);
  font: inherit;
  font-size: var(--text-sm);
  font-weight: 600;
  cursor: pointer;
}

.quiz__back:hover {
  color: var(--color-warm);
}

/* ---------- Résultat ---------- */
.quiz__result {
  display: grid;
  grid-template-columns: minmax(5.5rem, 8rem) 1fr;
  gap: var(--space-5);
  padding: var(--space-5);
  border: var(--border-rule) solid var(--color-primary);
  border-radius: var(--radius-card);
  background: var(--color-surface);
  box-shadow: var(--shadow-lift);
}

.quiz__cover {
  align-self: start;
}

.quiz__result-body {
  display: grid;
  gap: var(--space-3);
  align-content: start;
  min-width: 0;
}

.quiz__plus {
  display: inline-block;
  margin-inline: 0.15em;
  color: var(--color-text-muted);
  font-weight: 300;
}

.quiz__author {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  font-style: italic;
}

.quiz__note {
  font-size: var(--text-sm);
}

.quiz__details {
  display: grid;
  gap: var(--space-2);
  margin: var(--space-2) 0 0;
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-line);
  font-size: var(--text-xs);
}

.quiz__details div {
  display: flex;
  flex-wrap: wrap;
  gap: 0.1rem var(--space-3);
}

.quiz__details dt {
  flex: 0 0 6.5rem;
  color: var(--color-cafe-ink);
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.quiz__details dd {
  flex: 1 1 12rem;
  margin: 0;
  font-variant-numeric: tabular-nums;
}

.quiz__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-2);
}

/* Sur petit écran, la couverture passe au-dessus du texte */
@media (max-width: 30rem) {
  .quiz__result {
    grid-template-columns: 1fr;
  }

  .quiz__cover {
    width: 7rem;
  }
}

/* ---------- Passage d'une question à l'autre ---------- */
.quiz-step-enter-active,
.quiz-step-leave-active {
  transition:
    opacity var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out);
}

.quiz-step-enter-from {
  opacity: 0;
  transform: translateX(16px);
}

.quiz-step-leave-to {
  opacity: 0;
  transform: translateX(-16px);
}

@media (min-width: 40rem) {
  .quiz__choices {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 56rem) {
  .quiz {
    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
    gap: var(--space-8);
    padding: var(--space-7);
  }
}
</style>
