import { defineConfig, devices } from '@playwright/test'

import { buildBasePath } from './src/basePath'

const host = 'http://localhost:8080'
const root = host + buildBasePath(process.env)

// Dedicated port for Chrome DevTools Protocol. Lighthouse needs CDP
// access to run audits, so we launch Chromium with --remote-debugging-port.
// Shared with the fixture via PLAYWRIGHT_LIGHTHOUSE_PORT.
const CDP_PORT = 9222

export default defineConfig({
	testDir: './src',
	testMatch: 'lighthouse.spec.tsx',
	timeout: 60_000,
	fullyParallel: false,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	workers: 1,
	reporter: [
		['html', { outputFolder: 'lighthouse-report' }],
		['list'],
		['json', { outputFile: 'lighthouse-report/results.json' }],
	],
	use: {
		baseURL: root,
		headless: true,
		trace: 'off',
	},
	webServer: {
		command: process.env.CI
			? './node_modules/.bin/waku start'
			: 'pnpm run build-start',
		url: root,
		timeout: 120_000,
		reuseExistingServer: !process.env.CI,
	},
	projects: [
		{
			name: 'lighthouse-chromium',
			use: {
				...devices['Desktop Chrome'],
				...(!process.env.CI && {
					executablePath: '/usr/bin/chromium-browser',
				}),
				launchOptions: {
					args: [`--remote-debugging-port=${CDP_PORT}`],
				},
			},
		},
	],
})
