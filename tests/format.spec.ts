import { describe, expect, it } from 'vitest'
import { formatPrice, pluralize } from '@/utils/format'

// Intl insère des espaces insécables : on les normalise pour comparer.
const normalize = (value: string) => value.replace(/\s/g, ' ')

describe('formatPrice', () => {
  it('convertit des centimes en euros au format français', () => {
    expect(normalize(formatPrice(2150))).toBe('21,50 €')
    expect(normalize(formatPrice(220))).toBe('2,20 €')
  })

  it('affiche les centimes même pour un prix rond', () => {
    expect(normalize(formatPrice(1800))).toBe('18,00 €')
  })
})

describe('pluralize', () => {
  it('accorde selon le nombre', () => {
    expect(pluralize(1, 'titre')).toBe('1 titre')
    expect(pluralize(0, 'titre')).toBe('0 titre')
    expect(pluralize(4, 'autre titre', 'autres titres')).toBe('4 autres titres')
  })
})
