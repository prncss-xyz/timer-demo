import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import contentCollections from '@content-collections/vite'
import babel from '@rolldown/plugin-babel'
import stylex from '@stylexjs/unplugin'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { ViteWebfontDownload } from 'vite-plugin-webfont-dl'
import { defineConfig } from 'vite-plus'

import lint from './oxlint.config'
import {
	stylexLightningCssOptions,
	stylexRootCssInjectionTarget,
} from './stylex.config'

export default defineConfig({
	build: {
		rollupOptions: {
			external: (id) =>
				[
					'virtual:stylex:css-only',
					'rehype-mermaid',
					'mermaid-isomorphic',
					'playwright-core',
				].some((pkg) => id === pkg || id.startsWith(`${pkg}/`)),
		},
	},
	fmt: {
		arrowParens: 'always',
		ignorePatterns: ['.*'],
		jsxSingleQuote: true,
		printWidth: 80,
		semi: false,
		singleQuote: true,
		sortImports: true,
		sortPackageJson: true,
		trailingComma: 'all',
		useTabs: true,
	},
	lint,
	plugins: [
		// the StyleX Vite plugin (@stylexjs/unplugin), keeps file watchers and cause the Vite dev server to keep alive when tests have completed
		process.env.VITEST
			? null
			: stylex.vite({
					aliases: {
						'@/*': [fileURLToPath(new URL('./src/*', import.meta.url))],
					},
					devMode: 'css-only',
					devPersistToDisk: true,
					lightningcssOptions: stylexLightningCssOptions,
					cssInjectionTarget: stylexRootCssInjectionTarget,
					runtimeInjection: false,
					useCSSLayers: true,
				}),
		react(),
		babel({ presets: [reactCompilerPreset()] }),
		contentCollections({
			isEnabled: () => !process.env.VITEST,
		}),
		ViteWebfontDownload(),
		{
			name: 'inject-webfont-to-css',
			enforce: 'post',
			generateBundle(_options, bundle) {
				const webfontsAsset = Object.values(bundle).find(
					(c) => c?.type === 'asset' && (c as any).name === 'webfonts.css',
				) as any
				if (webfontsAsset && webfontsAsset.type === 'asset') {
					for (const key in bundle) {
						const chunk = bundle[key] as any
						if (
							chunk?.type === 'asset' &&
							chunk.fileName.endsWith('.css') &&
							chunk !== webfontsAsset
						) {
							chunk.source = webfontsAsset.source + '\n' + chunk.source
						}
					}
					delete bundle[webfontsAsset.fileName]
				}
			},
			writeBundle(options) {
				if (options.dir && options.dir.includes('public')) {
					const serverAssetsDir = path.resolve(options.dir, '../server/assets')
					const publicAssetsDir = path.resolve(options.dir, 'assets')
					if (fs.existsSync(serverAssetsDir)) {
						const files = fs.readdirSync(serverAssetsDir)
						for (const file of files) {
							if (
								file.endsWith('.woff2') ||
								file.endsWith('.woff') ||
								file.endsWith('.ttf')
							) {
								fs.mkdirSync(publicAssetsDir, { recursive: true })
								fs.copyFileSync(
									path.resolve(serverAssetsDir, file),
									path.resolve(publicAssetsDir, file),
								)
							}
						}
					}
				}
			},
		},
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	run: {
		tasks: {
			check: {
				command: 'vp check',
			},
			staged: {
				command: 'vp staged',
			},
			commitlint: {
				command: 'commitlint --edit',
			},
			start: {
				command: 'waku start',
				dependsOn: ['build'],
			},
			build: {
				command: 'waku build',
				output: ['dist/**'],
				env: ['VITE_GITHUB_REPOSITORY', 'VITE_BASE_URL', 'VITE_BASE_PATH'],
			},
			tsc: {
				cache: true,
				command: 'tsgo --noEmit',
				input: [
					'tsconfig.json',
					'package.json',
					'pnpm-workspace.yaml',
					'**/src/**/*.{js,ts,jsx,tsx}',
				],
				dependsOn: ['build'],
			},
			'test:e2e': {
				cache: true,
				command: 'playwright test',
				input: [
					'vite.config.ts',
					'playwright.config.ts',
					'package.json',
					'pnpm-workspace.yaml',
					'**/src/**/*.{js,ts,jsx,tsx}',
				],
				dependsOn: ['build'],
				env: ['VITE_GITHUB_REPOSITORY', 'VITE_BASE_URL', 'VITE_BASE_PATH'],
			},
			'test:e2e:changed': {
				cache: true,
				command: 'playwright test --only-changed',
				input: [
					'vite.config.ts',
					'playwright.config.ts',
					'package.json',
					'pnpm-workspace.yaml',
					'**/src/**/*.{js,ts,jsx,tsx}',
				],
				dependsOn: ['build'],
				env: ['VITE_GITHUB_REPOSITORY', 'VITE_BASE_URL', 'VITE_BASE_PATH'],
			},
			'test:units': {
				cache: true,
				command: 'vp test',
				input: [
					'vite.config.ts',
					'package.json',
					'pnpm-workspace.yaml',
					'**/src/**/*.{js,ts,jsx,tsx}',
				],
			},
			'test:units:changed': {
				cache: true,
				command: 'vp test --changed',
			},
			ci: {
				command: 'true',
				dependsOn: [
					'check',
					'check:knip',
					'build',
					'tsc',
					'test:units',
					'test:e2e',
				],
			},
			pre_commit: {
				command: 'true',
				dependsOn: [
					// 'check:knip',
					'build',
					// 'tsc',
					// 'test:units:changed',
					// 'test:e2e:changed',
				],
			},
		},
	},
	staged: {
		'*': 'vp check --fix',
	},
	test: {
		coverage: {
			exclude: ['**/src/**/*.test.{js,ts,jsx,tsx}', '**/src/test.setup.ts'],
			provider: 'v8',
			reporter: ['text', 'json'],
		},
		globals: true,
		include: ['**/src/**/*.test.{js,ts,jsx,tsx}'],
		passWithNoTests: true,
		pool: 'forks',
	},
})
