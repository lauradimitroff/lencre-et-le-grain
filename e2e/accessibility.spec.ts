import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const paths = ['/', '/librairie', '/carte', '/histoire', '/contact', '/credits', '/mentions-legales', '/404']

/**
 * Audit automatique axe-core (règles WCAG 2.1 A et AA).
 * Il ne remplace pas un test manuel, mais attrape les régressions courantes :
 * contrastes, libellés manquants, hiérarchie des titres, attributs ARIA.
 */
for (const path of paths) {
  test(`la page ${path} ne présente pas de problème d'accessibilité détectable`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(path)

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    const summary = results.violations.map(
      (violation) => `${violation.id} (${violation.impact}) : ${violation.nodes.map((n) => n.target.join(' ')).join(', ')}`,
    )
    expect(summary).toEqual([])
  })
}

test('le résultat du quiz est accessible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#quiz')
  const quiz = page.getByRole('region', { name: /Quel livre avec/ })
  await quiz.getByRole('button', { name: /Avoir le cœur/ }).click()
  await quiz.getByRole('button', { name: /Doux et réconfortant/ }).click()
  await quiz.getByRole('button', { name: /Tout le week-end/ }).click()
  await expect(quiz.getByTestId('quiz-result')).toBeVisible()

  const results = await new AxeBuilder({ page }).include('#quiz').withTags(['wcag2a', 'wcag2aa']).analyze()
  expect(results.violations.map((v) => v.id)).toEqual([])
})

test('le formulaire de contact reste accessible avec ses erreurs et après envoi', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/contact')
  await page.getByRole('button', { name: 'Envoyer le message' }).click()
  let results = await new AxeBuilder({ page }).include('.contact__form').withTags(['wcag2a', 'wcag2aa']).analyze()
  expect(results.violations.map((v) => v.id)).toEqual([])

  await page.getByLabel('Nom ou prénom').fill('Camille')
  await page.getByLabel('Adresse e-mail').fill('camille@exemple.fr')
  await page.getByLabel('Sujet').selectOption('cafe')
  await page.getByLabel('Message').fill('Bonjour, le chai bouquiniste est-il servi glacé ?')
  await page.getByRole('button', { name: 'Envoyer le message' }).click()
  await expect(page.getByTestId('contact-sent')).toBeVisible()
  results = await new AxeBuilder({ page }).include('.contact__form').withTags(['wcag2a', 'wcag2aa']).analyze()
  expect(results.violations.map((v) => v.id)).toEqual([])
})
