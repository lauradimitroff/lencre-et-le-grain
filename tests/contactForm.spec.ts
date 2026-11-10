import { describe, expect, it } from 'vitest'
import { validateContact, type ContactFields } from '@/utils/contactForm'

const valid: ContactFields = {
  name: 'Camille',
  email: 'camille@exemple.fr',
  subject: 'livre',
  message: 'Bonjour, avez-vous le deuxième tome de Nettle & Bone ?',
}

describe('validation du formulaire de contact', () => {
  it('accepte un message complet', () => {
    expect(validateContact(valid)).toEqual({})
  })

  it('signale chaque champ vide', () => {
    const errors = validateContact({ name: ' ', email: '', subject: '', message: '' })
    expect(Object.keys(errors).sort()).toEqual(['email', 'message', 'name', 'subject'])
  })

  it('refuse une adresse incomplète', () => {
    expect(validateContact({ ...valid, email: 'camille@exemple' }).email).toMatch(/incomplète/)
  })

  it('refuse un sujet inconnu', () => {
    expect(validateContact({ ...valid, subject: 'commande' }).subject).toBeDefined()
  })

  it('demande un message ni trop court ni trop long', () => {
    expect(validateContact({ ...valid, message: 'Bonjour' }).message).toMatch(/court/)
    expect(validateContact({ ...valid, message: 'a'.repeat(1001) }).message).toMatch(/dépasse/)
  })

  it('n’emploie pas de cadratin dans les messages', () => {
    const errors = validateContact({ name: '', email: 'x', subject: '', message: 'x' })
    for (const text of Object.values(errors)) expect(text).not.toMatch(/—/)
  })
})
