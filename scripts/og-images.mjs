/**
 * Génère les images d'aperçu de partage (Open Graph, 1200 × 630) de chaque page
 * dans public/og/, à partir d'un modèle HTML aux couleurs du site, rendu par le
 * Chromium de Playwright. Les images sont versionnées : le build de production
 * n'a pas besoin de navigateur. À relancer après un changement de charte :
 *
 *   npm run og
 */
import { mkdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'og')
/* Polices du site embarquées en data URL (une page vide ne peut pas lire file://) */
const font = (pkg, file) =>
  `data:font/woff2;base64,${readFileSync(
    join(root, 'node_modules', '@fontsource-variable', pkg, 'files', file),
  ).toString('base64')}`

const photo = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1000&h=1260&q=80`

const PHOTOS = {
  cafe: photo('1521017432531-fbd92d768814'),
  books: photo('1550399105-05c4a7641b02'),
  pourOver: photo('1442512595331-e89e73853f31'),
}

/* Couvertures illustrées (mêmes teintes que la sélection) pour la carte librairie */
const COVERS = [
  ['#4e3020', '#f3e3d0', 'Légendes & Lattes'],
  ['#8c5230', '#fbf6ee', 'Mexican Gothic'],
  ['#d8c3a0', '#4e3020', 'Nettle & Bone'],
  ['#62402c', '#f3e3d0', 'Gallant'],
  ['#f3e3d0', '#4e3020', 'Automnal'],
]

const pages = [
  {
    file: 'accueil',
    eyebrow: 'Café de spécialité · Coin librairie',
    title: 'Un chapitre, <em>un café,</em> et tout le temps qu’il faut.',
    visual: { photo: PHOTOS.cafe },
  },
  {
    file: 'librairie',
    eyebrow: 'Le coin librairie',
    title: 'La sélection <em>d’automne</em>',
    text: 'Fantasy, gothique, romance, BD et jeunesse\u00a0: des livres choisis un par un.',
    visual: { covers: true },
  },
  {
    file: 'carte',
    eyebrow: 'Le café',
    title: 'La carte, <em>100\u00a0% végétale</em>',
    text: 'Espresso, méthodes douces, boissons de saison et pâtisseries maison.',
    visual: { photo: PHOTOS.pourOver },
  },
  {
    file: 'histoire',
    eyebrow: 'Notre histoire',
    title: 'De l’encre <em>au grain</em>',
    text: 'Comment une ancienne imprimerie de quartier est devenue un café, avec un coin librairie.',
    visual: { photo: PHOTOS.books },
  },
  {
    file: 'contact',
    eyebrow: 'Contact',
    title: 'Nous trouver <em>&amp; nous écrire</em>',
    text: '12, passage des Lettres. Du mardi au dimanche, dès 8\u00a0h en semaine.',
    visual: { photo: PHOTOS.cafe },
  },
]

function template({ eyebrow, title, text, visual }) {
  const right = visual.covers
    ? `<div class="covers">${COVERS.map(
        ([bg, ink, name], i) =>
          `<div class="cover" style="--bg:${bg};--ink:${ink};--i:${i}" title="${name}"><i></i></div>`,
      ).join('')}</div>`
    : `<img class="photo" src="${visual.photo}" alt="">`

  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>
@font-face { font-family: 'Newsreader'; src: url('${font('newsreader', 'newsreader-latin-opsz-normal.woff2')}') format('woff2'); font-weight: 200 800; }
@font-face { font-family: 'Newsreader'; font-style: italic; src: url('${font('newsreader', 'newsreader-latin-opsz-italic.woff2')}') format('woff2'); font-weight: 200 800; }
@font-face { font-family: 'Instrument Sans'; src: url('${font('instrument-sans', 'instrument-sans-latin-wght-normal.woff2')}') format('woff2'); font-weight: 400 700; }
* { box-sizing: border-box; margin: 0; }
html, body { width: 1200px; height: 630px; }
body { display: grid; grid-template-columns: 1fr 440px; background: #f3e3d0; color: #2a1d15;
  font-family: 'Instrument Sans', sans-serif; border: 10px solid #4e3020; overflow: hidden; }
.text { display: flex; flex-direction: column; padding: 56px 56px 48px 64px; }
.brand { display: flex; align-items: center; gap: 12px; font-family: 'Newsreader'; font-size: 30px; color: #4e3020; }
.brand b { display: grid; place-items: center; width: 40px; height: 40px; border: 2px solid #4e3020; border-radius: 50%;
  font-style: italic; font-weight: 400; font-size: 24px; }
.eyebrow { margin-top: auto; color: #8c5230; font-size: 19px; font-weight: 650; letter-spacing: .14em; text-transform: uppercase; }
h1 { margin-top: 18px; font-family: 'Newsreader'; font-size: 66px; font-weight: 360; line-height: 1.04; letter-spacing: -.015em; text-wrap: balance; }
h1 em { color: #8c5230; font-weight: 300; }
p.lead { margin-top: 20px; max-width: 30ch; color: #5e4a3d; font-size: 23px; line-height: 1.45; }
.demo { display: inline-flex; align-items: center; gap: 10px; margin-top: 36px; color: #5e4a3d; font-size: 17px; }
.demo span { padding: 3px 8px; border: 1.5px solid currentColor; border-radius: 3px; font-size: 13px; font-weight: 650; letter-spacing: .14em; text-transform: uppercase; }
.visual { position: relative; border-left: 10px solid #4e3020; background: #d8c3a0; }
.photo { width: 100%; height: 100%; object-fit: cover; display: block; }
.covers { position: absolute; inset: 0; display: grid; place-items: center; }
/* Couvertures en éventail, motif d'arche comme sur le site */
.cover { position: absolute; width: 170px; height: 250px; border: 2px solid #4e3020; border-radius: 4px 10px 10px 4px;
  background: var(--bg); color: var(--ink); box-shadow: 0 22px 40px -20px rgb(78 48 32 / .55);
  transform: translate(calc((var(--i) - 2) * 46px), calc((var(--i) - 2) * 10px)) rotate(calc((var(--i) - 2) * 7deg)); }
.cover i { position: absolute; left: 50%; bottom: 0; width: 96px; height: 130px; margin-left: -48px;
  border: 2.5px solid currentColor; border-bottom: 0; border-radius: 48px 48px 0 0; opacity: .7; }
.cover::before { content: ''; position: absolute; inset: 14px 14px auto; height: 2px; background: currentColor; opacity: .7; }
</style></head><body>
<div class="text">
  <p class="brand">L’Encre <b>&amp;</b> le Grain</p>
  <p class="eyebrow">${eyebrow}</p>
  <h1>${title}</h1>
  ${text ? `<p class="lead">${text}</p>` : ''}
  <p class="demo"><span>Démo</span> Boutique fictive, projet de portfolio</p>
</div>
<div class="visual">${right}</div>
</body></html>`
}

mkdirSync(outDir, { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })

for (const entry of pages) {
  await page.setContent(template(entry), { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  const path = join(outDir, `${entry.file}.jpg`)
  await page.screenshot({ path, type: 'jpeg', quality: 86 })
  console.log(`✓ ${path}`)
}

await browser.close()
