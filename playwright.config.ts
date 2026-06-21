import { defineConfig, devices } from '@playwright/test'

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
		baseURL: 'http://localhost:8080',
		headless: true,
		trace: 'on-first-retry',
	},
	webServer: {
		command: process.env.CI ? 'pnpm run start' : 'pnpm run build-start',
		url: 'http://localhost:8080',
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
