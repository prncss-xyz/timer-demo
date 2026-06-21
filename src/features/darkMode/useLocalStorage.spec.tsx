import { test, expect } from '@playwright/test'

test.describe('useLocalStorage (via DarkModeToggle)', () => {
	test.beforeEach(async ({ page }) => {
		// Relative to baseURL so the route resolves under VITE_BASE_PATH.
		await page.goto('./')
		await page.evaluate(() => localStorage.clear())
	})

	test('reads theme from localStorage on load', async ({ page }) => {
		await page.evaluate(() => localStorage.setItem('dark-mode', 'dark'))
		await page.reload()

		await expect(page.getByTitle('Dark theme')).toHaveAttribute(
			'aria-checked',
			'true',
		)
	})

	test('defaults to system when localStorage is empty', async ({ page }) => {
		// beforeEach already cleared localStorage and navigated
		await expect(page.getByTitle('System theme')).toHaveAttribute(
			'aria-checked',
			'true',
		)
	})

	test('persists theme choice to localStorage', async ({ page }) => {
		await page.getByTitle('Light theme').click()

		const stored = await page.evaluate(() => localStorage.getItem('dark-mode'))
		expect(stored).toBe('light')
	})
})
