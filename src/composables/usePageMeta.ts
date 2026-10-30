import { useHead } from '@unhead/vue'
import { siteConfig } from '@/config/site'

interface PageMeta {
  title: string
  description: string
  /** Chemin de la page, ex. « / » ou « /librairie ». */
  path: string
  image?: string
}

/** Titre, description, URL canonique, Open Graph et carte Twitter d'une page. */
export function usePageMeta({ title, description, path, image = siteConfig.ogImage }: PageMeta) {
  const url = path === '/' ? `${siteConfig.url}/` : `${siteConfig.url}${path}`

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
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [{ rel: 'canonical', href: url }],
  })
}
