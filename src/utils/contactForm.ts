/**
 * Validation du formulaire de contact (démonstration : rien n'est envoyé).
 * Logique pure, testée à part de l'interface.
 */

export interface ContactFields {
  name: string
  email: string
  subject: string
  message: string
}

export type ContactErrors = Partial<Record<keyof ContactFields, string>>

export const contactSubjects = [
  { value: 'livre', label: 'Une question sur un livre' },
  { value: 'cafe', label: 'Le café et la carte' },
  { value: 'suggestion', label: 'Suggérer un livre' },
  { value: 'autre', label: 'Autre chose' },
] as const

export const MESSAGE_MIN_LENGTH = 20
export const MESSAGE_MAX_LENGTH = 1000

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {}
  const name = fields.name.trim()
  const email = fields.email.trim()
  const message = fields.message.trim()

  if (!name) errors.name = 'Indiquez votre nom ou votre prénom.'
  else if (name.length < 2) errors.name = 'Ce nom semble un peu court.'

  if (!email) errors.email = 'Indiquez votre adresse e-mail pour que l’on puisse vous répondre.'
  else if (!EMAIL_PATTERN.test(email))
    errors.email = 'Cette adresse semble incomplète. Vérifiez qu’elle ressemble à prenom@exemple.fr.'

  if (!contactSubjects.some((subject) => subject.value === fields.subject))
    errors.subject = 'Choisissez le sujet de votre message.'

  if (!message) errors.message = 'Écrivez votre message.'
  else if (message.length < MESSAGE_MIN_LENGTH)
    errors.message = `Votre message est un peu court : ${MESSAGE_MIN_LENGTH} caractères au minimum.`
  else if (message.length > MESSAGE_MAX_LENGTH)
    errors.message = `Votre message dépasse ${MESSAGE_MAX_LENGTH} caractères.`

  return errors
}
