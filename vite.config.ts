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
import injectWebfontToCss from './vite-plugins/inject-webfont-to-css'

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
		ViteWebfontDownload([
			'https://fonts.googleapis.com/css2' +
				'?family=Nunito:ital,wght@0,400;0,700;1,400;1,700' +
				'&display=block',
		]),
		injectWebfontToCss,
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
				dependsOn: ['build'],
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
				input: [
					'tsconfig.json',
					'vite.config.ts',
					'vite-plugins/**/*.{ts,tsx}',
					'package.json',
					'pnpm-workspace.yaml',
					'content/**',
					'**/src/**/*.{js,ts,jsx,tsx}',
				],
				env: ['VITE_GITHUB_REPOSITORY', 'VITE_BASE_URL', 'VITE_BASE_PATH'],
			},
			tsc: {
				cache: true,
				command: 'tsgo --noEmit',
				input: [
					'tsconfig.json',
					'vite.config.ts',
					'vite-plugins/**/*.{ts,tsx}',
					'package.json',
					'pnpm-workspace.yaml',
					'content/**',
					'**/src/**/*.{js,ts,jsx,tsx}',
				],
				dependsOn: ['build'],
			},
			'tsc:changed': {
				cache: true,
				command: 'tsgo --noEmit',
				input: [
					'tsconfig.json',
					'vite.config.ts',
					'vite-plugins/**/*.{ts,tsx}',
					'package.json',
					'pnpm-workspace.yaml',
					'content/**',
					'**/src/**/*.{js,ts,jsx,tsx}',
				],
			},
			'test:e2e': {
				cache: true,
				command: 'playwright test',
				input: [
					'tsconfig.json',
					'vite.config.ts',
					'vite-plugins/**/*.{ts,tsx}',
					'package.json',
					'pnpm-workspace.yaml',
					'content/**',
					'**/src/**/*.{js,ts,jsx,tsx}',
					'playwright.config.ts',
				],
				dependsOn: ['build'],
				env: ['VITE_GITHUB_REPOSITORY', 'VITE_BASE_URL', 'VITE_BASE_PATH'],
			},
			'test:e2e:changed': {
				command: 'playwright test --only-changed',
			},
			'test:units': {
				cache: true,
				command: 'vp test',
				input: [
					'tsconfig.json',
					'vite.config.ts',
					'vite-plugins/**/*.{ts,tsx}',
					'package.json',
					'pnpm-workspace.yaml',
					'content/**',
					'**/src/**/*.{js,ts,jsx,tsx}',
				],
			},
			'test:units:changed': {
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
					'check:knip',
					'build',
					'tsc:changed',
					'test:units:changed',
					'test:e2e:changed',
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
