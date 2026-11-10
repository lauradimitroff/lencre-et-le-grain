import { describe, expect, it } from 'vitest'
import { shopInfo, weeklySchedule } from '@/data/shop'
import { describeOpeningStatus, formatHour, getOpeningStatus } from '@/utils/opening'

/** Date en heure de Paris (novembre : UTC+1). Le 10 novembre 2026 est un mardi. */
const paris = (day: number, time: string) => new Date(`2026-11-${String(day).padStart(2, '0')}T${time}:00+01:00`)

describe('horaires d’ouverture', () => {
  it('concordent avec les horaires affichés dans le pied de page', () => {
    const range = (index: number) => {
      const slot = weeklySchedule[index]
      return slot ? `${formatHour(slot.open)} à ${formatHour(slot.close)}` : 'Fermé'
    }
    const displayed = Object.fromEntries(shopInfo.hours.map((slot) => [slot.days, slot.hours]))
    expect(displayed['Lundi']).toBe(range(1))
    for (const day of [2, 3, 4, 5]) expect(displayed['Du mardi au vendredi']).toBe(range(day))
    expect(displayed['Samedi']).toBe(range(6))
    expect(displayed['Dimanche']).toBe(range(0))
  })

  it('indique ouvert en journée, avec l’heure de fermeture', () => {
    expect(describeOpeningStatus(getOpeningStatus(paris(10, '10:00')))).toEqual({
      label: 'Ouvert maintenant',
      detail: 'jusqu’à 19 h',
    })
  })

  it('prévient peu avant la fermeture', () => {
    expect(describeOpeningStatus(getOpeningStatus(paris(10, '18:30'))).label).toBe('Ferme bientôt')
  })

  it('donne l’heure d’ouverture du jour même, du lendemain ou du prochain jour ouvert', () => {
    expect(describeOpeningStatus(getOpeningStatus(paris(10, '07:15'))).detail).toBe('ouvre à 8 h')
    expect(describeOpeningStatus(getOpeningStatus(paris(14, '21:00'))).detail).toBe('ouvre demain à 9 h 30')
    // Dimanche soir : lundi est fermé, prochaine ouverture mardi
    expect(describeOpeningStatus(getOpeningStatus(paris(15, '19:00'))).detail).toBe('ouvre mardi à 8 h')
    expect(describeOpeningStatus(getOpeningStatus(paris(16, '12:00'))).detail).toBe('ouvre demain à 8 h')
  })

  it('calcule à l’heure de Paris quel que soit le fuseau', () => {
    // 9 h 30 UTC = 10 h 30 à Paris un mardi : ouvert
    expect(getOpeningStatus(new Date('2026-11-10T09:30:00Z')).state).toBe('open')
  })
})
