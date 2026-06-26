import { fileURLToPath } from 'node:url'
import stylex from '@stylexjs/unplugin'
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(ts|tsx)'],
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
	],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	async viteFinal(baseConfig) {
		// Remove only project-specific plugins that conflict with Storybook.
		// Keep Storybook's own plugins (@storybook/builder-vite, etc.) intact.
		const toRemove = new Set([
			'content-collections',
			'vite-plugin-webfont-dl',
			'inject-webfont-to-css',
			'rolldown-plugin-babel',
		])

		baseConfig.plugins = (baseConfig.plugins ?? []).filter((p: any) => {
			const name = p?.name ?? ''
			// Never remove Storybook's internal plugins
			if (name.startsWith('storybook') || name.includes('@storybook')) return true
			return !toRemove.has(name)
		})

		// Add StyleX plugin matching the project config.
		// DevStyleXInject (included in preview decorator) handles
		// loading the compiled CSS via the virtual module.
		baseConfig.plugins.push(
			stylex.vite({
				aliases: {
					'@/*': [fileURLToPath(new URL('../src/*', import.meta.url))],
				},
				devMode: 'css-only',
				devPersistToDisk: true,
				runtimeInjection: false,
				useCSSLayers: true,
			}),
		)

		// Ensure path aliases
		const resolve = (baseConfig.resolve ??= {})
		resolve.alias = {
			...(resolve.alias as Record<string, string>),
			'@': fileURLToPath(new URL('../src', import.meta.url)),
			// Waku depends on react-server-dom-webpack which references
			// __webpack_require__ — not available in Vite. Replace Waku
			// client exports with lightweight stubs for Storybook.
			'waku': fileURLToPath(
				new URL('./mocks/waku.tsx', import.meta.url),
			),
		}

		return baseConfig
	},
}

export default config
