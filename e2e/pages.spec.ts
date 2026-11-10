import { expect, test, type Page } from '@playwright/test'

const pages = [
  { path: '/', title: /Un chapitre/ },
  { path: '/librairie', title: /La sélection/ },
  { path: '/carte', title: /La carte/ },
  { path: '/histoire', title: /Une ancienne imprimerie/ },
  { path: '/credits', title: /./ },
]

/** Relève les erreurs JavaScript de la page pendant le test. */
function trackErrors(page: Page) {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  return errors
}

for (const { path, title } of pages) {
  test(`la page ${path} s'affiche sans erreur`, async ({ page }) => {
    const errors = trackErrors(page)
    const response = await page.goto(path)

    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title)
    await expect(page.getByText('Boutique fictive réalisée pour un portfolio')).toBeVisible()
    await expect(page).toHaveTitle(/boutique fictive|Crédits/i)
    expect(errors).toEqual([])
  })
}

test('une adresse inconnue affiche la page 404', async ({ page }) => {
  await page.goto('/cette-page-nexiste-pas')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('égarée')
})

test('le menu principal mène aux bonnes pages', async ({ page, isMobile }) => {
  await page.goto('/')
  const nav = page.getByRole('navigation', { name: 'Navigation principale' })

  for (const [label, path] of [
    ['La librairie', '/librairie'],
    ['Le café', '/carte'],
    ['Notre histoire', '/histoire'],
  ] as const) {
    if (isMobile) await page.getByRole('button', { name: /menu/i }).click()
    await nav.getByRole('link', { name: label }).click()
    await expect(page).toHaveURL(path)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  }
})

test('les filtres de la librairie réduisent la liste', async ({ page }) => {
  await page.goto('/librairie')
  const status = page.getByRole('status').filter({ hasText: 'dans cette sélection' })
  const before = await status.textContent()

  await page.getByRole('group', { name: 'Filtrer par catégorie' }).getByRole('button', { name: /BD/ }).click()

  await expect(status).not.toHaveText(before ?? '')
  await expect(page.getByRole('button', { name: /BD/ })).toHaveAttribute('aria-pressed', 'true')
})

test('aucune page ne déborde horizontalement', async ({ page }) => {
  for (const { path } of pages) {
    await page.goto(path)
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow, path).toBeLessThanOrEqual(0)
  }
})
