import type { PriceInCents } from '@/types/catalog'

const priceFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
})

/** 2150 -> « 21,50 € » */
export function formatPrice(cents: PriceInCents): string {
  return priceFormatter.format(cents / 100)
}

/** Accorde un nom avec un nombre : pluralize(2, 'titre') -> « 2 titres ». */
export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return `${count} ${count > 1 ? plural : singular}`
}
