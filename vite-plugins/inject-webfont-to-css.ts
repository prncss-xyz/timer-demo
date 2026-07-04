import fs from 'node:fs'
import path from 'node:path'

import type { Plugin } from 'vite'

export default {
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
} satisfies Plugin
