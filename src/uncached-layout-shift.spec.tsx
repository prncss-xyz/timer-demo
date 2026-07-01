import { expect, test, type Page } from '@playwright/test'

import { buildBasePath } from './basePath'

const root = buildBasePath(process.env)
const routes = [
	{ name: 'home', path: '' },
	{ name: 'blog post', path: 'blog/hello-world' },
]

type LayoutShiftSample = {
	left: number
	selector: string
	t: number
}

const installHorizontalShiftSampler = async (page: Page) => {
	await page.addInitScript(() => {
		const selectors = ['header', 'main', 'main h1', 'main > *:first-child']
		const samples: LayoutShiftSample[] = []

		Object.assign(window, { __horizontalShiftSamples: samples })

		const sample = () => {
			const t = performance.now()

			for (const selector of selectors) {
				const element = document.querySelector(selector)

				if (element) {
					const rect = element.getBoundingClientRect()

					samples.push({ left: rect.left, selector, t })
				}
			}

			if (t < 1600) {
				requestAnimationFrame(sample)
			}
		}

		requestAnimationFrame(sample)
	})
}

const getHorizontalShiftDeltas = () => {
	const samples =
		(
			window as typeof window & {
				__horizontalShiftSamples?: LayoutShiftSample[]
			}
		).__horizontalShiftSamples ?? []
	const selectors = [...new Set(samples.map((sample) => sample.selector))]

	return Object.fromEntries(
		selectors.map((selector) => {
			const lefts = samples
				.filter((sample) => sample.selector === selector)
				.map((sample) => sample.left)

			return [selector, Math.max(...lefts) - Math.min(...lefts)]
		}),
	)
}

for (const route of routes) {
	test(`${route.name} keeps content horizontally stable while uncached assets load`, async ({
		page,
	}) => {
		await page.route('**/*.css', async (route) => {
			await new Promise((resolve) => setTimeout(resolve, 350))
			await route.continue()
		})
		await installHorizontalShiftSampler(page)

		await page.goto(`${root}${route.path}`, { waitUntil: 'domcontentloaded' })
		await page.waitForLoadState('networkidle')
		await page.waitForTimeout(500)

		const deltas = await page.evaluate(getHorizontalShiftDeltas)

		expect(deltas.main).toBeDefined()

		const contentDelta = Math.max(
			deltas.main ?? 0,
			deltas['main h1'] ?? 0,
			deltas['main > *:first-child'] ?? 0,
		)

		expect(contentDelta).toBeLessThanOrEqual(1)
	})
}
