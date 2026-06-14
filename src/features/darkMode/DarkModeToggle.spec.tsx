import { test, expect } from '@playwright/experimental-ct-react'

import { DarkModeToggle } from './DarkModeToggle'

test.describe('ThemeToggle', () => {
	test.beforeEach(async ({ page }) => {
		await page.evaluate(() => {
			document.documentElement.className = ''
			localStorage.clear()
		})
	})

	test('should render theme toggle and initialize to system by default', async ({
		mount,
	}) => {
		const component = await mount(<DarkModeToggle />)
		const systemBtn = component.getByTitle('System theme')
		await expect(systemBtn).toHaveAttribute('aria-checked', 'true')
	})

	test('should switch theme to light on click', async ({ mount, page }) => {
		const component = await mount(<DarkModeToggle />)
		const lightBtn = component.getByTitle('Light theme')
		await lightBtn.click()

		const isDark = await page.evaluate(() =>
			document.documentElement.classList.contains('dark'),
		)
		expect(isDark).toBe(false)
	})

	test('should switch theme to dark on click', async ({ mount, page }) => {
		const component = await mount(<DarkModeToggle />)
		const darkBtn = component.getByTitle('Dark theme')
		await darkBtn.click()

		const isDark = await page.evaluate(() =>
			document.documentElement.classList.contains('dark'),
		)
		expect(isDark).toBe(true)
	})
})
