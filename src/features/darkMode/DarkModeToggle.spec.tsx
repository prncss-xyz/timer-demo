import { test, expect } from '@playwright/test'

test.describe('DarkModeToggle', () => {
	test.beforeEach(async ({ page }) => {
		// Relative to baseURL so the route resolves under VITE_BASE_PATH.
		await page.goto('./')
		await page.evaluate(() => {
			document.documentElement.className = ''
			localStorage.clear()
		})
	})

	test('initializes to system by default', async ({ page }) => {
		await expect(page.getByTitle('System theme')).toHaveAttribute(
			'aria-checked',
			'true',
		)
	})

	test('switches to light on click', async ({ page }) => {
		await page.getByTitle('Light theme').click()
		await expect(page.locator('html')).not.toHaveClass(/dark/)
	})

	test('switches to dark on click', async ({ page }) => {
		await page.getByTitle('Dark theme').click()
		await expect(page.locator('html')).toHaveClass(/dark/)
	})
})
