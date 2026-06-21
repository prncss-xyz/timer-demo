import { defineConfig, devices } from '@playwright/test'

// Mirror src/meta.ts: the waku basePath is VITE_BASE_PATH + '/'.
// Playwright polls and navigates relative to this prefix so e2e works
// against the same basePath-baked build that ships to GitHub Pages.
const host = 'http://localhost:8080'
const root = host + ((process.env.VITE_BASE_PATH ?? '') + '/')

export default defineConfig({
	testDir: './src',
	testMatch: '**/*.spec.tsx',
	snapshotDir: './__snapshots__',
	timeout: 10 * 1000,
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',
	use: {
		baseURL: root,
		headless: true,
		trace: 'on-first-retry',
	},
	webServer: {
		command: 'pnpm run build-start',
		url: root,
		timeout: 120 * 1000,
		reuseExistingServer: !process.env.CI,
	},
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				// Use system browser locally; Playwright managed browser in CI
				...(!process.env.CI && { executablePath: '/usr/bin/chromium-browser' }),
			},
		},
	],
})
