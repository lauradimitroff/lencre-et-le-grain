/**
 * Informations pratiques d'un commerce FICTIF.
 * L'adresse, le téléphone et l'e-mail n'existent pas.
 */
export const shopInfo = {
  name: "L'Encre & le Grain",
  tagline: 'Café de spécialité & librairie indépendante',
  address: ['12, passage des Lettres', '00000 Ville-sur-Page'],
  phone: '01 23 45 67 89',
  email: 'bonjour@lencre-et-le-grain.example',
  hours: [
    { days: 'Lundi', hours: 'Fermé' },
    { days: 'Du mardi au vendredi', hours: '8 h à 19 h' },
    { days: 'Samedi', hours: '9 h à 20 h' },
    { days: 'Dimanche', hours: '9 h 30 à 18 h' },
  ],
} as const

/** Ouverture d'une journée, en minutes depuis minuit (heure de Paris). */
export interface DaySchedule {
  open: number
  close: number
}

/**
 * Horaires (fictifs) sous forme exploitable, indexés comme Date.getDay() :
 * 0 = dimanche, 1 = lundi… Un test vérifie qu'ils concordent avec `shopInfo.hours`.
 */
export const weeklySchedule: (DaySchedule | null)[] = [
  { open: 9 * 60 + 30, close: 18 * 60 }, // dimanche
  null, // lundi : fermé
  { open: 8 * 60, close: 19 * 60 },
  { open: 8 * 60, close: 19 * 60 },
  { open: 8 * 60, close: 19 * 60 },
  { open: 8 * 60, close: 19 * 60 },
  { open: 9 * 60, close: 20 * 60 }, // samedi
]
