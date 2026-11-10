import { expect, test } from '@playwright/test'

test.describe('quiz « Quel livre avec quel café ? »', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#quiz')
  })

  test('propose un accord après trois réponses', async ({ page }) => {
    const quiz = page.getByRole('region', { name: /Quel livre avec/ })

    await quiz.getByRole('button', { name: /Frissonner/ }).click()
    await expect(quiz.getByRole('heading', { name: /Question 2 sur 3/ })).toBeFocused()

    await quiz.getByRole('button', { name: /Sans café/ }).click()
    await quiz.getByRole('button', { name: /Un après-midi/ }).click()

    const result = quiz.getByTestId('quiz-result')
    await expect(result).toBeVisible()
    await expect(result.getByRole('heading', { level: 4 })).toContainText('Chocolat chaud')
    await expect(result.getByRole('heading', { level: 4 })).toBeFocused()
    await expect(result.getByText('À grignoter')).toBeVisible()
  })

  test('permet de revenir en arrière et de recommencer', async ({ page }) => {
    const quiz = page.getByRole('region', { name: /Quel livre avec/ })

    await quiz.getByRole('button', { name: /Lire en images/ }).click()
    await quiz.getByRole('button', { name: /Question précédente/ }).click()
    await expect(quiz.getByRole('button', { name: /Lire en images/ })).toHaveAttribute('aria-pressed', 'true')

    await quiz.getByRole('button', { name: /Lire en images/ }).click()
    await quiz.getByRole('button', { name: /Court et intense/ }).click()
    await quiz.getByRole('button', { name: /Une petite heure/ }).click()
    await expect(quiz.getByTestId('quiz-result')).toContainText('Cortado')

    await quiz.getByRole('button', { name: 'Recommencer' }).click()
    await expect(quiz.getByRole('heading', { name: /Question 1 sur 3/ })).toBeFocused()
  })

  test('se joue entièrement au clavier', async ({ page }) => {
    const quiz = page.getByRole('region', { name: /Quel livre avec/ })
    await quiz.getByRole('button', { name: /Partir loin/ }).focus()
    await page.keyboard.press('Enter')

    // Après la transition, le focus est sur le titre de la question : Tab mène au premier choix
    for (const step of [2, 3]) {
      await expect(quiz.getByRole('heading', { name: new RegExp(`Question ${step} sur 3`) })).toBeFocused()
      await page.keyboard.press('Tab')
      await page.keyboard.press('Enter')
    }

    await expect(quiz.getByTestId('quiz-result')).toBeVisible()
  })
})
