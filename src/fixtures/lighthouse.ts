import { test as base, expect } from '@playwright/test'
import { playAudit } from 'playwright-lighthouse'

type AuditConfig = {
	/** Route to audit (resolved against Playwright baseURL). */
	url?: string
	/** Short label for the report filename (e.g. "home", "posts"). */
	name: string
	/** Category thresholds (0-100). */
	thresholds?: Record<string, number>
}

const defaults = {
	thresholds: {
		performance: 90,
		accessibility: 90,
		'best-practices': 90,
		seo: 90,
	},
	reportsDir: `${process.cwd()}/lighthouse-reports`,
}

/**
 * Extends Playwright test with a Lighthouse audit helper.
 *
 * Usage:
 *   test('home', async ({ playLighthouseAudit }) => {
 *     await playLighthouseAudit({ name: 'home' })
 *   })
 *
 * Requires a Chromium browser launched with --remote-debugging-port.
 * The port is injected by the lighthouse Playwright config.
 */
export const test = base.extend<
	{ playLighthouseAudit: (cfg: AuditConfig) => Promise<void> },
	{ lighthousePort: number }
>({
	lighthousePort: [
		// oxlint-disable-next-line no-empty-pattern
		async ({}, use) => {
			const port = Number(process.env.PLAYWRIGHT_LIGHTHOUSE_PORT ?? '9222')
			await use(port)
		},
		{ scope: 'worker' },
	],

	playLighthouseAudit: async ({ page, lighthousePort }, use) => {
		await use(async (cfg) => {
			await playAudit({
				page,
				port: lighthousePort,
				url: cfg.url,
				thresholds: cfg.thresholds ?? defaults.thresholds,
				reports: {
					formats: { html: true, json: true },
					name: `${cfg.name}-${Date.now()}`,
					directory: defaults.reportsDir,
				},
			})
		})
	},
})

export { expect }
