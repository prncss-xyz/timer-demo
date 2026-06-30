import fs from 'node:fs/promises'
import path from 'node:path'

import { AxeBuilder } from '@axe-core/playwright'
import { test as base, expect } from '@playwright/test'

type AxeResults = Awaited<ReturnType<AxeBuilder['analyze']>>

// Extends the base Playwright test with:
//  - makeAxeBuilder: returns a fresh AxeBuilder bound to the page
//  - analyzeAxe:   runs the full audit, persists results as JSON to
//                    axe-reports/{testName}__{page}.json, and returns AxeResults
// Defaults to WCAG 2.1 A/AA rule tags so the audit targets the
// conformance level that ships, not axe's full (noisy) rule set.
const AXE_REPORTS_DIR = path.join(process.cwd(), 'axe-reports')

const axeTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
export const test = base.extend<{
	makeAxeBuilder: () => AxeBuilder
	analyzeAxe: () => Promise<AxeResults>
}>({
	makeAxeBuilder: async ({ page }, use) => {
		await use(() => new AxeBuilder({ page }).withTags(axeTags))
	},

	analyzeAxe: async ({ page }, use, testInfo) => {
		let run = 0

		await use(async () => {
			run += 1
			const results = await new AxeBuilder({ page }).withTags(axeTags).analyze()

			// Persist full results as JSON for LLM / CI consumption.
			const safeName = testInfo.titlePath.join(' > ').replace(/[/\\:]/g, '_')
			const pageName = new URL(page.url()).pathname.replace(/[/\\:]/g, '_')
			await fs.mkdir(AXE_REPORTS_DIR, { recursive: true })
			await fs.writeFile(
				path.join(AXE_REPORTS_DIR, `${safeName}__${run}__${pageName}.json`),
				JSON.stringify(results, null, 2),
			)

			return results
		})
	},
})

export { expect }
