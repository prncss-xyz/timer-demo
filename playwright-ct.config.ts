import { fileURLToPath } from 'node:url'

import { defineConfig, devices } from '@playwright/experimental-ct-react'
import stylex from '@stylexjs/unplugin'

export default defineConfig({
	testDir: './src',
	snapshotDir: './__snapshots__',
	timeout: 10 * 1000,
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',
	use: {
		headless: true,
		trace: 'on-first-retry',
		ctPort: 3100,
		ctViteConfig: {
			plugins: [
				stylex.vite({
					aliases: {
						'@/*': [fileURLToPath(new URL('./src/*', import.meta.url))],
					},
					devMode: 'css-only',
					devPersistToDisk: true,
					runtimeInjection: false,
					useCSSLayers: true,
				}),
			],
			resolve: {
				alias: {
					'@': fileURLToPath(new URL('./src', import.meta.url)),
				},
			},
		},
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
})
