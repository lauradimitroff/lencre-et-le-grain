import { useHead } from '@unhead/vue'
import { siteConfig } from '@/config/site'

interface PageMeta {
  title: string
  description: string
  /** Chemin de la page, ex. « / » ou « /librairie ». */
  path: string
  /** Image d'aperçu de partage générée dans public/og/ (npm run og). */
  ogImage?: 'accueil' | 'librairie' | 'carte' | 'histoire'
}

/** Titre, description, URL canonique, Open Graph et carte Twitter d'une page. */
export function usePageMeta({ title, description, path, ogImage = 'accueil' }: PageMeta) {
  const url = path === '/' ? `${siteConfig.url}/` : `${siteConfig.url}${path}`
  const image = `${siteConfig.url}/og/${ogImage}.jpg`

  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: siteConfig.name },
      { property: 'og:locale', content: siteConfig.locale },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: title },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [{ rel: 'canonical', href: url }],
  })
}
