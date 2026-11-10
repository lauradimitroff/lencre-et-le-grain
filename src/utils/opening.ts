import { weeklySchedule, type DaySchedule } from '@/data/shop'

/**
 * Statut d'ouverture du café à un instant donné, calculé à l'heure de Paris
 * quel que soit le fuseau de la personne qui consulte le site.
 */
export type OpeningStatus =
  | { state: 'open'; closesAt: number; closingSoon: boolean }
  | { state: 'closed'; opensAt: number; day: 'today' | 'tomorrow' | string }

const TIME_ZONE = 'Europe/Paris'
const DAY_NAMES = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
const WEEKDAY_INDEX: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
/** Sous ce délai avant la fermeture, on prévient. */
const CLOSING_SOON_MINUTES = 45

/** Jour de la semaine et minutes écoulées depuis minuit, à Paris. */
export function parisTime(date: Date): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: TIME_ZONE,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? ''
  return {
    day: WEEKDAY_INDEX[get('weekday')] ?? 0,
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  }
}

export function getOpeningStatus(
  date: Date,
  schedule: (DaySchedule | null)[] = weeklySchedule,
): OpeningStatus {
  const { day, minutes } = parisTime(date)
  const today = schedule[day]

  if (today && minutes >= today.open && minutes < today.close) {
    return {
      state: 'open',
      closesAt: today.close,
      closingSoon: today.close - minutes <= CLOSING_SOON_MINUTES,
    }
  }

  if (today && minutes < today.open) {
    return { state: 'closed', opensAt: today.open, day: 'today' }
  }

  for (let offset = 1; offset <= 7; offset++) {
    const next = schedule[(day + offset) % 7]
    if (next) {
      return {
        state: 'closed',
        opensAt: next.open,
        day: offset === 1 ? 'tomorrow' : (DAY_NAMES[(day + offset) % 7] ?? ''),
      }
    }
  }
  throw new Error('Aucun jour d’ouverture dans les horaires')
}

/** 480 → « 8 h », 570 → « 9 h 30 ». */
export function formatHour(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m === 0 ? `${h} h` : `${h} h ${String(m).padStart(2, '0')}`
}

export function describeOpeningStatus(status: OpeningStatus): { label: string; detail: string } {
  if (status.state === 'open') {
    return {
      label: status.closingSoon ? 'Ferme bientôt' : 'Ouvert maintenant',
      detail: `jusqu’à ${formatHour(status.closesAt)}`,
    }
  }
  const when =
    status.day === 'today' ? '' : status.day === 'tomorrow' ? 'demain ' : `${status.day} `
  return { label: 'Fermé', detail: `ouvre ${when}à ${formatHour(status.opensAt)}` }
}
