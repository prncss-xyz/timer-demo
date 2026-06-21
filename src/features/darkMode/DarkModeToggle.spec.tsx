import { test, expect } from '@playwright/test'

import { buildBasePath } from '../../basePath'

// Path-absolute route under the waku basePath (VITE_BASE_PATH + '/').
// Resolves against Playwright's baseURL, which itself is built from
// the same VITE_BASE_PATH via buildBasePath in playwright.config.ts.
const root = buildBasePath(process.env)

test.describe('DarkModeToggle', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto(root)
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
