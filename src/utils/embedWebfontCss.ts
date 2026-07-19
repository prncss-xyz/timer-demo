import { Buffer } from 'node:buffer'
import { createHash } from 'node:crypto'
import { mkdir, readFile, readdir, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'

const browserUserAgent =
	'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
const fontUrlPattern = /url\((['"]?)([^'")]+)\1\)/g
const fontFacePattern = /(?:\/\*[\s\S]*?\*\/\s*)?@font-face\s*{[^}]*}/g
const bundledAssetsDirectory = path.resolve('dist/server/assets')

async function fetchOk(url: string, attempts = 3): Promise<Response> {
	try {
		const response = await fetch(url, {
			headers: { 'user-agent': browserUserAgent },
		})
		if (!response.ok) {
			throw new Error(
				`Failed to fetch webfont resource ${url}: ${response.status}`,
			)
		}
		return response
	} catch (error) {
		if (attempts === 1) throw error
		await new Promise((resolve) => setTimeout(resolve, 250))
		return fetchOk(url, attempts - 1)
	}
}

function supportsText(fontFace: string, text: string) {
	const unicodeRange = fontFace.match(/unicode-range:\s*([^;}]+)/)?.[1]
	if (!unicodeRange) return true
	const ranges = unicodeRange.split(',').map((range) => {
		const [start, end = start] = range.trim().replace(/^U\+/i, '').split('-')
		return [Number.parseInt(start!, 16), Number.parseInt(end!, 16)] as const
	})
	return [...text].some((character) => {
		const codePoint = character.codePointAt(0)!
		return ranges.some(([start, end]) => codePoint >= start && codePoint <= end)
	})
}

function selectFontCss(css: string, fontFamily: string, text: string) {
	return (css.match(fontFacePattern) ?? [])
		.filter(
			(fontFace) =>
				new RegExp(`font-family:\\s*['"]?${fontFamily}['"]?`).test(fontFace) &&
				/font-style:\s*normal/.test(fontFace) &&
				/font-weight:\s*400/.test(fontFace) &&
				supportsText(fontFace, text),
		)
		.join('\n')
}

async function loadBundledWebfontCss(fontFamily: string) {
	try {
		const cssFiles = (await readdir(bundledAssetsDirectory)).filter((file) =>
			file.endsWith('.css'),
		)
		const candidates = await Promise.all(
			cssFiles.map(async (file) => {
				return readFile(path.join(bundledAssetsDirectory, file), 'utf8')
			}),
		)
		return candidates.find((css) => css.includes(`font-family:${fontFamily}`))
	} catch {
		return
	}
}

async function embedFontUrls(
	css: string,
	loadFont: (url: string) => Promise<{ data: Buffer; mime: string }>,
) {
	const fontUrls = [
		...new Set([...css.matchAll(fontUrlPattern)].map((match) => match[2]!)),
	]
	const embeddedFontEntries = await fontUrls.reduce<
		Promise<readonly (readonly [string, string])[]>
	>(async (entriesPromise, fontUrl) => {
		const entries = await entriesPromise
		const { data, mime } = await loadFont(fontUrl)
		return [
			...entries,
			[fontUrl, `data:${mime};base64,${data.toString('base64')}`] as const,
		]
	}, Promise.resolve([]))
	const embeddedFonts = new Map(embeddedFontEntries)
	return css.replace(fontUrlPattern, (_match, _quote, fontUrl: string) => {
		return `url('${embeddedFonts.get(fontUrl)}')`
	})
}

async function downloadEmbeddedWebfontCss(
	cssUrl: string,
	fontFamily: string,
	text: string,
) {
	const bundledCss = await loadBundledWebfontCss(fontFamily)
	if (bundledCss) {
		const css = selectFontCss(bundledCss, fontFamily, text)
		return embedFontUrls(css, async (fontUrl) => {
			const filename = path.basename(new URL(fontUrl, 'http://local').pathname)
			return {
				data: await readFile(path.join(bundledAssetsDirectory, filename)),
				mime: 'font/woff2',
			}
		})
	}

	const downloadedCss = await (await fetchOk(cssUrl)).text()
	const css = selectFontCss(downloadedCss, fontFamily, text)
	return embedFontUrls(css, async (fontUrl) => {
		const response = await fetchOk(fontUrl)
		return {
			data: Buffer.from(await response.arrayBuffer()),
			mime: response.headers.get('content-type') ?? 'font/woff2',
		}
	})
}

export async function embedWebfontCss(
	cssUrl: string,
	fontFamily: string,
	text: string,
) {
	const cacheDirectory = path.resolve('node_modules/.vite')
	const cacheKey = createHash('sha256')
		.update(`${cssUrl}\0${fontFamily}\0${text}`)
		.digest('hex')
		.slice(0, 16)
	const cachePath = path.join(cacheDirectory, `mermaid-webfont-${cacheKey}.css`)
	try {
		return await readFile(cachePath, 'utf8')
	} catch {
		const css = await downloadEmbeddedWebfontCss(cssUrl, fontFamily, text)
		const temporaryPath = `${cachePath}.${process.pid}.tmp`
		await mkdir(cacheDirectory, { recursive: true })
		await writeFile(temporaryPath, css)
		await rename(temporaryPath, cachePath)
		return css
	}
}
