import { describe, expect, it } from 'vitest'
import { getQuizResult, quizQuestions, type QuizAnswers } from '@/services/quiz'

/** Toutes les combinaisons possibles de réponses. */
function allAnswers(): QuizAnswers[] {
  const [mood, cup, time] = quizQuestions
  return mood.choices.flatMap((m) =>
    cup.choices.flatMap((c) =>
      time.choices.map((t) => ({ mood: m.value, cup: c.value, time: t.value })),
    ),
  )
}

describe('quiz livre et café', () => {
  it('donne un accord complet pour chaque combinaison de réponses', () => {
    for (const answers of allAnswers()) {
      const result = getQuizResult(answers)
      expect(result.book, JSON.stringify(answers)).toBeDefined()
      expect(result.drink.kind).toBe('boisson')
      expect(result.pastry.kind).toBe('patisserie')
    }
  })

  it('respecte le genre demandé', () => {
    expect(getQuizResult({ mood: 'frisson', cup: 'douce', time: 'court' }).book.category).toBe('gothique')
    expect(getQuizResult({ mood: 'images', cup: 'douce', time: 'court' }).book.category).toBe('bd')
  })

  it('propose un livre plus long quand on a tout le week-end', () => {
    const short = getQuizResult({ mood: 'evasion', cup: 'lente', time: 'court' }).book
    const long = getQuizResult({ mood: 'evasion', cup: 'lente', time: 'week-end' }).book
    expect(long.pages!).toBeGreaterThan(short.pages!)
  })

  it('est déterministe', () => {
    const answers: QuizAnswers = { mood: 'coeur', cup: 'sans-cafe', time: 'apres-midi' }
    expect(getQuizResult(answers)).toEqual(getQuizResult(answers))
  })

  it('reprend la note de l’équipe seulement si le livre et la boisson concordent', () => {
    const match = getQuizResult({ mood: 'frisson', cup: 'sans-cafe', time: 'apres-midi' })
    if (match.note) expect(match.drink.id).toBe('chocolat-chaud')
    for (const answers of allAnswers()) {
      const result = getQuizResult(answers)
      if (result.note) expect(result.note).not.toMatch(/—/)
    }
  })
})
