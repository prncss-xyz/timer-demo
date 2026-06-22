import { expect } from '@playwright/test'

import { test } from '@/fixtures/a11y'

import { buildBasePath } from './basePath'

// Path-absolute route prefix under the waku basePath. `buildBasePath`
// already appends a trailing '/', so subroutes are joined without a
// leading slash to avoid double-slashes.
const root = buildBasePath(process.env)

test.describe('accessibility (axe)', () => {
	test('home (/) has no WCAG violations', async ({ page, makeAxeBuilder }) => {
		await page.goto(root)
		const { violations } = await makeAxeBuilder().analyze()
		expect(violations).toEqual([])
	})

	test('posts index (/posts) has no WCAG violations', async ({
		page,
		makeAxeBuilder,
	}) => {
		await page.goto(`${root}posts`)
		const { violations } = await makeAxeBuilder().analyze()
		expect(violations).toEqual([])
	})

	test('post detail (/posts/hello-world) has no WCAG violations', async ({
		page,
		makeAxeBuilder,
	}) => {
		await page.goto(`${root}posts/hello-world`)
		const { violations } = await makeAxeBuilder().analyze()
		expect(violations).toEqual([])
	})

	test('qr (/qr) has no WCAG violations', async ({ page, makeAxeBuilder }) => {
		await page.goto(`${root}qr`)
		const { violations } = await makeAxeBuilder().analyze()
		expect(violations).toEqual([])
	})
})
