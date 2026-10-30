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
    { days: 'Mardi – vendredi', hours: '8 h – 19 h' },
    { days: 'Samedi', hours: '9 h – 20 h' },
    { days: 'Dimanche', hours: '9 h 30 – 18 h' },
  ],
} as const
