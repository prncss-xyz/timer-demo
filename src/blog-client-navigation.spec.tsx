import { expect, test } from '@playwright/test'

import { buildBasePath } from './basePath'

const root = buildBasePath(process.env)
const hasMarkdownListStyles = () => {
	const markdownListRule =
		/padding-inline-start:\s*1\.4em.*list-style-type:\s*disc|list-style-type:\s*disc.*padding-inline-start:\s*1\.4em/

	return [...document.styleSheets].some((sheet) => {
		try {
			return Array.from(sheet.cssRules).some((rule) =>
				markdownListRule.test(rule.cssText),
			)
		} catch {
			return false
		}
	})
}

test('blog post client navigation keeps markdown list styles loaded', async ({
	page,
}) => {
	await page.goto(`${root}blog`)

	await page.getByRole('link', { name: /hello world/i }).click()
	await page.waitForURL(/\/blog\/hello-world$/)

	await expect(page.getByRole('heading', { name: 'Hello World' })).toBeVisible()
	await expect.poll(() => page.evaluate(hasMarkdownListStyles)).toBe(true)
})
