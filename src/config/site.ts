export const siteConfig = {
  name: "L'Encre & le Grain",
  /** URL publique, sans barre finale. Définie par VITE_SITE_URL (cf. .env.example). */
  url: (import.meta.env.VITE_SITE_URL || 'https://lencre-et-le-grain.vercel.app').replace(/\/$/, ''),
  locale: 'fr_FR',
}
