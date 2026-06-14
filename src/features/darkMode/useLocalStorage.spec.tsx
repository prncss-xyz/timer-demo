import { test, expect } from '@playwright/experimental-ct-react'

import { TestComponent } from './useLocalStorage.story'

test.describe('useLocalStorage', () => {
	test.beforeEach(async ({ page }) => {
		await page.evaluate(() => {
			localStorage.clear()
		})
	})

	test('should read initial value from localStorage if present', async ({
		page,
		mount,
	}) => {
		await page.evaluate(() => {
			localStorage.setItem('test-key', 'stored-value')
		})

		const component = await mount(<TestComponent storageKey='test-key' />)

		await expect(component.locator('#value-container')).toHaveText(
			'stored-value',
		)
	})

	test('should return parsed default value if key is not present', async ({
		mount,
	}) => {
		const component = await mount(<TestComponent storageKey='test-key' />)

		await expect(component.locator('#value-container')).toHaveText('default')
	})

	test('should update value and localStorage when setValue is called', async ({
		page,
		mount,
	}) => {
		const component = await mount(<TestComponent storageKey='test-key' />)

		await expect(component.locator('#value-container')).toHaveText('default')

		await component.locator('#update-btn').click()

		await expect(component.locator('#value-container')).toHaveText('new-value')

		const storedValue = await page.evaluate(() =>
			localStorage.getItem('test-key'),
		)
		expect(storedValue).toBe('new-value')
	})
})
