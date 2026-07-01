import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import contentCollections from '@content-collections/vite'
import babel from '@rolldown/plugin-babel'
import stylex from '@stylexjs/unplugin'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { ViteWebfontDownload } from 'vite-plugin-webfont-dl'
import { defineConfig } from 'vite-plus'

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
	lint: {
		categories: {
			correctness: 'off',
		},
		env: {
			builtin: true,
		},
		ignorePatterns: ['.*'],
		plugins: ['jsx-a11y'],
		jsPlugins: [
			{
				name: 'stylex',
				specifier: '@stylexjs/eslint-plugin',
			},
		],
		options: {
			denyWarnings: true,
			typeAware: true,
		},
		overrides: [
			{
				files: [
					'apps/**/*.{js,jsx,ts,tsx}',
					'packages/react/**/*.{js,jsx,ts,tsx}',
				],
				rules: {
					'react/exhaustive-deps': 'error',
					'react/rules-of-hooks': 'error',
				},
			},
			{
				files: ['**/*.{jsx,tsx}'],
				rules: {
					'react/button-has-type': 'error',
					'react/jsx-key': 'error',
					'react/jsx-no-duplicate-props': 'error',
					'react/jsx-no-target-blank': 'error',
					'react/jsx-no-undef': 'error',
					'react/no-children-prop': 'error',
					'react/no-danger-with-children': 'error',
					'react/no-unknown-property': 'error',
					'react/void-dom-elements-no-children': 'error',
				},
			},
		],
		rules: {
			'constructor-super': 'error',
			'for-direction': 'error',
			'no-array-constructor': 'error',
			'no-async-promise-executor': 'error',
			'no-case-declarations': 'error',
			'no-class-assign': 'error',
			'no-compare-neg-zero': 'error',
			'no-cond-assign': 'error',
			'no-console': 'error',
			'no-const-assign': 'error',
			'no-constant-binary-expression': 'error',
			'no-constant-condition': 'error',
			'no-control-regex': 'error',
			'no-debugger': 'error',
			'no-delete-var': 'error',
			'no-dupe-class-members': 'error',
			'no-dupe-else-if': 'error',
			'no-dupe-keys': 'error',
			'no-duplicate-case': 'error',
			'no-else-return': 'error',
			'no-empty': 'error',
			'no-empty-character-class': 'error',
			'no-empty-pattern': 'error',
			'no-empty-static-block': 'error',
			'no-ex-assign': 'error',
			'no-extra-boolean-cast': 'error',
			'no-fallthrough': 'error',
			'no-func-assign': 'error',
			'no-global-assign': 'error',
			'no-import-assign': 'error',
			'no-invalid-regexp': 'error',
			'no-irregular-whitespace': 'error',
			'no-loss-of-precision': 'error',
			'no-misleading-character-class': 'error',
			'no-new-native-nonconstructor': 'error',
			'no-nonoctal-decimal-escape': 'error',
			'no-obj-calls': 'error',
			'no-prototype-builtins': 'error',
			'no-redeclare': 'off',
			'no-regex-spaces': 'error',
			'no-self-assign': 'error',
			'no-setter-return': 'error',
			'no-shadow-restricted-names': 'error',
			'no-sparse-arrays': 'error',
			'no-this-before-super': 'error',
			'no-unassigned-vars': 'error',
			'no-unexpected-multiline': 'error',
			'no-unsafe-finally': 'error',
			'no-unsafe-negation': 'error',
			'no-unsafe-optional-chaining': 'error',
			'no-unused-expressions': 'error',
			'no-unused-labels': 'error',
			'no-unused-private-class-members': 'error',
			'no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
			'no-useless-backreference': 'error',
			'no-useless-catch': 'error',
			'no-useless-escape': 'error',
			'no-useless-rename': ['error'],
			'no-var': 'error',
			'no-with': 'error',
			'object-shorthand': ['error', 'always'],
			'prefer-const': 'error',
			'prefer-rest-params': 'error',
			'prefer-spread': 'error',
			'preserve-caught-error': 'error',
			'require-yield': 'error',
			'sort-vars': 'error',
			'stylex/enforce-extension': 'error',
			'stylex/no-conflicting-props': 'error',
			'stylex/no-legacy-contextual-styles': 'error',
			'stylex/no-lookahead-selectors': 'error',
			'stylex/no-nonstandard-styles': 'error',
			'stylex/no-unused': 'error',
			'stylex/valid-shorthands': 'error',
			'stylex/valid-styles': 'error',
			'typescript/await-thenable': 'error',
			'typescript/ban-ts-comment': 'error',
			'typescript/no-duplicate-enum-values': 'error',
			'typescript/no-empty-object-type': 'off',
			'typescript/no-explicit-any': 'off',
			'typescript/no-extra-non-null-assertion': 'error',
			'typescript/no-floating-promises': 'error',
			'typescript/no-misused-new': 'error',
			'typescript/no-misused-promises': 'error',
			'typescript/no-namespace': 'error',
			'typescript/no-non-null-asserted-optional-chain': 'error',
			'typescript/no-require-imports': 'error',
			'typescript/no-this-alias': 'error',
			'typescript/no-unnecessary-type-constraint': 'error',
			'typescript/no-unsafe-argument': 'off',
			'typescript/no-unsafe-assignment': 'off',
			'typescript/no-unsafe-call': 'off',
			'typescript/no-unsafe-declaration-merging': 'error',
			'typescript/no-unsafe-function-type': 'error',
			'typescript/no-unsafe-member-access': 'off',
			'typescript/no-unsafe-return': 'off',
			'typescript/prefer-as-const': 'error',
			'typescript/prefer-namespace-keyword': 'error',
			'typescript/triple-slash-reference': 'error',
			'use-isnan': 'error',
			'valid-typeof': 'error',
			'jsx-a11y/alt-text': 'error',
			'jsx-a11y/anchor-ambiguous-text': 'error',
			'jsx-a11y/anchor-has-content': 'error',
			'jsx-a11y/anchor-is-valid': 'error',
			'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
			'jsx-a11y/aria-props': 'error',
			'jsx-a11y/aria-proptypes': 'error',
			'jsx-a11y/aria-role': 'error',
			'jsx-a11y/aria-unsupported-elements': 'error',
			'jsx-a11y/autocomplete-valid': 'error',
			'jsx-a11y/click-events-have-key-events': 'error',
			'jsx-a11y/control-has-associated-label': 'error',
			'jsx-a11y/heading-has-content': 'error',
			'jsx-a11y/html-has-lang': 'error',
			'jsx-a11y/iframe-has-title': 'error',
			'jsx-a11y/img-redundant-alt': 'error',
			'jsx-a11y/interactive-supports-focus': 'error',
			'jsx-a11y/label-has-associated-control': 'error',
			'jsx-a11y/lang': 'error',
			'jsx-a11y/media-has-caption': 'error',
			'jsx-a11y/mouse-events-have-key-events': 'error',
			'jsx-a11y/no-access-key': 'error',
			'jsx-a11y/no-aria-hidden-on-focusable': 'error',
			'jsx-a11y/no-autofocus': 'error',
			'jsx-a11y/no-distracting-elements': 'error',
			'jsx-a11y/no-interactive-element-to-noninteractive-role': 'error',
			'jsx-a11y/no-noninteractive-element-interactions': 'error',
			'jsx-a11y/no-noninteractive-element-to-interactive-role': 'error',
			'jsx-a11y/no-noninteractive-tabindex': 'error',
			'jsx-a11y/no-redundant-roles': 'error',
			'jsx-a11y/no-static-element-interactions': 'error',
			'jsx-a11y/prefer-tag-over-role': 'error',
			'jsx-a11y/role-has-required-aria-props': 'error',
			'jsx-a11y/role-supports-aria-props': 'error',
			'jsx-a11y/scope': 'error',
			'jsx-a11y/tabindex-no-positive': 'error',
		},
		settings: {
			react: {
				version: '19.2.3',
			},
		},
	},
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
			knip: {
				command: 'knip --production --cache',
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
				dependsOn: ['check', 'knip', 'build', 'tsc', 'test:units', 'test:e2e'],
			},
			pre_commit: {
				command: 'true',
				dependsOn: [
					'staged',
					'knip',
					'build',
					'tsc',
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
