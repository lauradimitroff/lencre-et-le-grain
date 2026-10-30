import { readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

interface SeoFilesOptions {
  outDir: string
  siteUrl: string
}

/** Pages pré-rendues à exclure du sitemap. */
const EXCLUDED_PAGES = new Set(['404.html'])

/** Convertit un fichier pré-rendu en chemin d'URL propre (cleanUrls Vercel). */
export function htmlFileToPath(file: string): string {
  const name = file.replace(/\.html$/, '')
  return name === 'index' ? '/' : `/${name}`
}

export function buildSitemap(siteUrl: string, paths: string[], lastmod: string): string {
  const base = siteUrl.replace(/\/$/, '')
  const urls = paths
    .map((path) => {
      const loc = path === '/' ? `${base}/` : `${base}${path}`
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

export function buildRobots(siteUrl: string): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl.replace(/\/$/, '')}/sitemap.xml\n`
}

/** Génère sitemap.xml et robots.txt à partir des pages réellement pré-rendues. */
export function writeSeoFiles({ outDir, siteUrl }: SeoFilesOptions): void {
  const paths = readdirSync(outDir)
    .filter((file) => file.endsWith('.html') && !EXCLUDED_PAGES.has(file))
    .map(htmlFileToPath)
    .sort()

  const lastmod = new Date().toISOString().slice(0, 10)
  writeFileSync(join(outDir, 'sitemap.xml'), buildSitemap(siteUrl, paths, lastmod))
  writeFileSync(join(outDir, 'robots.txt'), buildRobots(siteUrl))
}
