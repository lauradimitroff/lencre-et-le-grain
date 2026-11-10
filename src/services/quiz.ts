import { books } from '@/data/books'
import { menuItems } from '@/data/menu'
import { pairingRecords } from '@/data/pairings'
import type { Book, BookCategory, MenuItem } from '@/types/catalog'

/**
 * Quiz « Quel livre avec quel café ? » : trois questions, un accord.
 * La logique est pure et déterministe (mêmes réponses, même résultat),
 * ce qui la rend facile à tester sans passer par l'interface.
 */

export type Mood = 'frisson' | 'evasion' | 'coeur' | 'images'
export type Cup = 'intense' | 'douce' | 'lente' | 'sans-cafe'
export type Time = 'court' | 'apres-midi' | 'week-end'

export interface QuizAnswers {
  mood: Mood
  cup: Cup
  time: Time
}

export interface QuizChoice<T extends string> {
  value: T
  label: string
  hint: string
}

export interface QuizQuestion<K extends keyof QuizAnswers = keyof QuizAnswers> {
  key: K
  title: string
  choices: QuizChoice<QuizAnswers[K]>[]
}

export const quizQuestions: [QuizQuestion<'mood'>, QuizQuestion<'cup'>, QuizQuestion<'time'>] = [
  {
    key: 'mood',
    title: 'Ce soir, vous avez envie de…',
    choices: [
      { value: 'frisson', label: 'Frissonner', hint: 'Manoirs, brume et secrets de famille' },
      { value: 'evasion', label: "Partir loin d'ici", hint: 'Sorcières, quêtes et mondes inventés' },
      { value: 'coeur', label: 'Avoir le cœur qui bat', hint: 'Romance de saison et petites villes' },
      { value: 'images', label: 'Lire en images', hint: 'Bandes dessinées et romans graphiques' },
    ],
  },
  {
    key: 'cup',
    title: 'Dans votre tasse, plutôt…',
    choices: [
      { value: 'intense', label: 'Court et intense', hint: 'Un café qui réveille' },
      { value: 'douce', label: 'Doux et réconfortant', hint: 'Lait végétal et épices' },
      { value: 'lente', label: 'Infusé lentement', hint: 'On regarde le café couler' },
      { value: 'sans-cafe', label: 'Sans café', hint: 'Mais pas sans gourmandise' },
    ],
  },
  {
    key: 'time',
    title: 'Combien de temps devant vous ?',
    choices: [
      { value: 'court', label: 'Une petite heure', hint: 'Entre deux rendez-vous' },
      { value: 'apres-midi', label: 'Un après-midi', hint: 'Près de la fenêtre' },
      { value: 'week-end', label: 'Tout le week-end', hint: 'Téléphone en silencieux' },
    ],
  },
]

const categoryByMood: Record<Mood, BookCategory> = {
  frisson: 'gothique',
  evasion: 'fantasy',
  coeur: 'romance',
  images: 'bd',
}

/** Boisson et douceur associées à chaque envie de tasse. */
const cupPairing: Record<Cup, { drinkId: string; pastryId: string }> = {
  intense: { drinkId: 'cortado', pastryId: 'madeleines' },
  douce: { drinkId: 'latte-erable-pecan', pastryId: 'brioche-cannelle' },
  lente: { drinkId: 'filtre-v60', pastryId: 'cookie' },
  'sans-cafe': { drinkId: 'chocolat-chaud', pastryId: 'carrot-cake' },
}

export interface QuizResult {
  book: Book
  drink: MenuItem
  pastry: MenuItem
  /** Note de l'équipe quand le résultat correspond à un accord du mois. */
  note?: string
}

function byId(id: string): MenuItem {
  const item = menuItems.find((entry) => entry.id === id)
  if (!item) throw new Error(`Article introuvable : « ${id} »`)
  return item
}

/**
 * Choisit le livre selon le temps disponible : le plus court pour une heure,
 * le plus long pour un week-end, celui du milieu pour un après-midi.
 */
function pickBook(category: BookCategory, time: Time): Book {
  const candidates = books
    .filter((book) => book.category === category)
    .sort((a, b) => (a.pages ?? Infinity) - (b.pages ?? Infinity) || a.id.localeCompare(b.id))
  const withPages = candidates.filter((book) => book.pages !== undefined)
  const pool = withPages.length > 0 ? withPages : candidates
  const last = pool.length - 1
  const index = time === 'court' ? 0 : time === 'week-end' ? last : Math.floor(last / 2)
  const book = pool[index]
  if (!book) throw new Error(`Aucun livre dans la catégorie « ${category} »`)
  return book
}

export function getQuizResult(answers: QuizAnswers): QuizResult {
  const book = pickBook(categoryByMood[answers.mood], answers.time)
  const { drinkId, pastryId } = cupPairing[answers.cup]
  // La note de l'équipe parle souvent de la boisson : on ne la reprend que si tout concorde.
  const note = pairingRecords.find(
    (pairing) => pairing.bookId === book.id && pairing.drinkId === drinkId,
  )?.note

  return { book, drink: byId(drinkId), pastry: byId(pastryId), note }
}
