import { describe, expect, it } from 'vitest'
import { buildRobots, buildSitemap, htmlFileToPath } from '../scripts/seo-files'

describe('fichiers SEO', () => {
  it('convertit les pages pré-rendues en URL propres', () => {
    expect(htmlFileToPath('index.html')).toBe('/')
    expect(htmlFileToPath('librairie.html')).toBe('/librairie')
  })

  it('génère un sitemap avec des URL absolues', () => {
    const xml = buildSitemap('https://exemple.test/', ['/', '/cafe'], '2026-10-28')
    expect(xml).toContain('<loc>https://exemple.test/</loc>')
    expect(xml).toContain('<loc>https://exemple.test/cafe</loc>')
    expect(xml).toContain('<lastmod>2026-10-28</lastmod>')
  })

  it('référence le sitemap dans robots.txt', () => {
    expect(buildRobots('https://exemple.test')).toContain('Sitemap: https://exemple.test/sitemap.xml')
  })
})
