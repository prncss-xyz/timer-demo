import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import stylex from '@stylexjs/unplugin'
import type { StorybookConfig } from '@storybook/react-vite'
import { ViteWebfontDownload } from 'vite-plugin-webfont-dl'

import { viteWebfontDownloadConfig } from '../fontConstants'
import {
	stylexLightningCssOptions,
	stylexStorybookCssInjectionTarget,
} from '../stylex.config'

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
	viteFinal(baseConfig) {
		// Remove only project-specific plugins that conflict with Storybook.
		// Keep Storybook's own plugins (@storybook/builder-vite, etc.) intact.
		const toRemove = new Set([
			'content-collections',
			'vite-plugin-webfont-dl',
			'inject-webfont-to-css',
			'rolldown-plugin-babel',
			'@stylexjs/unplugin',
		])

		baseConfig.plugins = (baseConfig.plugins ?? []).filter((p: any) => {
			const name = p?.name ?? ''
			// Never remove Storybook's internal plugins
			if (name.startsWith('storybook') || name.includes('@storybook')) return true
			return !toRemove.has(name)
		})

		// Use a Storybook-private Vite cache so it never pollutes the main
		// app's node_modules/.vite/deps. Sharing that dir makes the app's dev
		// server re-optimize while running, which desyncs @vitejs/plugin-rsc's
		// clientReferenceMetaMap and throws "Cannot read properties of
		// undefined (reading 'exportNames')".
		const sbCacheDir = 'node_modules/.vite-sb'
		baseConfig.cacheDir = sbCacheDir
		// Seed the webfont-dl download cache from the app's cache so Storybook
		// needs no fonts.googleapis.com access (DNS to Google Fonts is
		// unavailable in this sandbox).
		try {
			fs.mkdirSync(sbCacheDir, { recursive: true })
			const dest = sbCacheDir + '/plugin-webfont-dl_3.12.0.json'
			if (!fs.existsSync(dest)) {
				fs.copyFileSync('node_modules/.vite/plugin-webfont-dl_3.12.0.json', dest)
			}
		} catch {
			// best-effort; the plugin downloads fonts if the cache is missing
		}

		// Add StyleX plugin matching the Waku dev config.
		// DevStyleXInject (included in preview decorator) loads the
		// compiled CSS from /virtual:stylex.css.
		// Keep light-dark() native: Storybook's dev CSS doesn't include
		// Lightning CSS's selector vars for its downlevel transform.
		baseConfig.plugins.push(
			stylex.vite({
				aliases: {
					'@/*': [fileURLToPath(new URL('../src/*', import.meta.url))],
				},
				devMode: 'css-only',
				devPersistToDisk: true,
				cssInjectionTarget: stylexStorybookCssInjectionTarget,
				lightningcssOptions: stylexLightningCssOptions,
				runtimeInjection: false,
				useCSSLayers: true,
			}),
			// injectAsStyleTag:false so the plugin emits webfonts.css as a real
			// asset under assets/ and links it from the preview iframe — the
			// relative font URLs then resolve correctly against that file.
			// (With the default style-tag injection, relative URLs would resolve
			// against the iframe document root and miss assets/.)
			ViteWebfontDownload(viteWebfontDownloadConfig, {
				injectAsStyleTag: false,
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
