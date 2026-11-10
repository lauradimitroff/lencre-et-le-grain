import { expect, test, type Page } from '@playwright/test'

const pages = [
  { path: '/', title: /Un chapitre/ },
  { path: '/librairie', title: /La sélection/ },
  { path: '/carte', title: /La carte/ },
  { path: '/histoire', title: /De l'encre/ },
  { path: '/contact', title: /Nous trouver/ },
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
    await expect(page.locator('.demo-banner')).toContainText(/Boutique fictive/)
    await expect(page.locator('.demo-banner')).toBeVisible()
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
    ['La carte', '/carte'],
    ['Le coin librairie', '/librairie'],
    ['Notre histoire', '/histoire'],
  ] as const) {
    if (isMobile) await page.getByRole('button', { name: 'Menu', exact: true }).click()
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

test.describe('menu mobile', () => {
  test.skip(({ isMobile }) => !isMobile, 'Panneau latéral réservé au mobile')

  test("s'ouvre en panneau latéral et se referme au clavier ou par le voile", async ({ page }) => {
    await page.goto('/')
    const toggle = page.getByRole('button', { name: 'Menu', exact: true })
    const nav = page.getByRole('navigation', { name: 'Navigation principale' })

    await expect(nav).toBeHidden()
    await toggle.click()
    await expect(nav).toBeVisible()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(nav.getByRole('link', { name: 'Accueil' })).toBeFocused()

    // Échap ferme et rend le focus au bouton
    await page.keyboard.press('Escape')
    await expect(nav).toBeHidden()
    await expect(toggle).toBeFocused()

    // Un clic sur le voile ferme aussi
    await toggle.click()
    await expect(nav).toBeVisible()
    await page.mouse.click(20, 400)
    await expect(nav).toBeHidden()
  })

  test('garde le focus dans le panneau', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Menu', exact: true }).click()
    const nav = page.getByRole('navigation', { name: 'Navigation principale' })
    await expect(nav.getByRole('link', { name: 'Accueil' })).toBeFocused()

    for (let i = 0; i < 10; i++) await page.keyboard.press('Tab')
    const inside = await page.evaluate(() =>
      Boolean(document.activeElement?.closest('#menu-principal')),
    )
    expect(inside).toBe(true)
  })
})
