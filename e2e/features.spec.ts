import { expect, test } from '@playwright/test'

test('les pages changent avec une transition douce, sans bloquer la navigation', async ({ page }) => {
  // On trace chaque transition démarrée par le site
  await page.addInitScript(() => {
    const log: string[] = []
    Object.assign(window, { __transitions: log })
    const original = document.startViewTransition?.bind(document)
    if (!original) return
    document.startViewTransition = ((callback: () => Promise<void> | void) => {
      const transition = original(callback)
      log.push('start')
      transition.finished.then(() => log.push('finished'))
      return transition
    }) as typeof document.startViewTransition
  })

  await page.goto('/carte')
  await page.getByRole('link', { name: "Retour à l'accueil" }).click()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Un chapitre')
  await expect
    .poll(() => page.evaluate(() => (window as unknown as { __transitions: string[] }).__transitions))
    .toEqual(['start', 'finished'])
})

test('aucune transition quand la personne préfère réduire les animations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.addInitScript(() => {
    Object.assign(window, { __started: 0 })
    const original = document.startViewTransition?.bind(document)
    if (!original) return
    document.startViewTransition = ((callback: () => Promise<void> | void) => {
      ;(window as unknown as { __started: number }).__started++
      return original(callback)
    }) as typeof document.startViewTransition
  })
  await page.goto('/carte')
  await page.getByRole('link', { name: "Retour à l'accueil" }).click()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Un chapitre')
  expect(await page.evaluate(() => (window as unknown as { __started: number }).__started)).toBe(0)
})

test('le filtre allergènes masque les articles concernés', async ({ page }) => {
  await page.goto('/carte')
  const status = page.getByRole('status').filter({ hasText: 'article' })
  await expect(status).toContainText('Toute la carte')

  await page.getByRole('button', { name: 'Sans gluten' }).click()
  await expect(status).toContainText(/\d+ articles sur \d+/)
  await expect(page.getByText('Cookie', { exact: false }).first()).toBeHidden()
  await expect(page.getByText('Moelleux chocolat sans gluten')).toBeVisible()

  await page.getByRole('button', { name: 'Tout afficher' }).click()
  await expect(status).toContainText('Toute la carte')
})

test('le badge d’ouverture suit les horaires (heure de Paris)', async ({ page }) => {
  // Mardi 10 novembre 2026, 10 h à Paris
  await page.clock.setFixedTime(new Date('2026-11-10T10:00:00+01:00'))
  await page.goto('/')
  await expect(page.locator('.hero .opening')).toHaveText(/Ouvert maintenant\s*· jusqu’à 19 h/)

  // Lundi, jour de fermeture
  await page.clock.setFixedTime(new Date('2026-11-16T10:00:00+01:00'))
  await page.reload()
  await expect(page.locator('.hero .opening')).toHaveText(/Fermé\s*· ouvre demain à 8 h/)
})

test('chaque page a sa propre image de partage', async ({ page, request }) => {
  const images = new Set<string>()
  for (const path of ['/', '/librairie', '/carte', '/histoire']) {
    await page.goto(path)
    const url = await page.locator('meta[property="og:image"]').getAttribute('content')
    expect(url, path).toMatch(/\/og\/[a-z]+\.jpg$/)
    images.add(url!)
    // L'image existe bien dans le build
    const response = await request.get(new URL(url!).pathname)
    expect(response.status(), url!).toBe(200)
    expect(response.headers()['content-type']).toContain('image/jpeg')
  }
  expect(images.size).toBe(4)
})
