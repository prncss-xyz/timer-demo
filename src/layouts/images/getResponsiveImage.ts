import { createHash } from 'node:crypto'
import {
	copyFile,
	mkdir,
	readdir,
	readFile,
	rename,
	rm,
	stat,
	writeFile,
} from 'node:fs/promises'
import { extname, join } from 'node:path'

import sharp from 'sharp'

import { basePath } from '@/meta'

import type { ResponsiveImage } from './responsiveImage'

const defaultCacheRoot = './.cache/responsive-images/'
function getCacheRoot() {
	return process.env.RESPONSIVE_IMAGE_CACHE_ROOT ?? defaultCacheRoot
}
function getOriginalsDir() {
	return join(getCacheRoot(), 'originals')
}
function getVariantsDir() {
	return join(getCacheRoot(), 'variants')
}
function getManifestPath() {
	return join(getCacheRoot(), 'manifest.json')
}
function getOutputDir() {
	return (
		process.env.RESPONSIVE_IMAGE_OUTPUT_DIR ??
		(process.env.NODE_ENV === 'development'
			? './public/gen/'
			: './dist/public/gen/')
	)
}
const publicPrefix = `${basePath}gen/`

const widths = [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
const defaultWidth = widths[widths.length - 1]
const outputFormat = 'webp'
const outputQuality = 80
const transformVersion = 1
const fetchRetryDelays = [250, 1000]
const usedEmittedFiles = new Set<string>()

type CachedOriginalRecord = {
	contentHash: string
	contentType?: string | undefined
	etag?: string | undefined
	filename: string
	height: number
	lastModified?: string | undefined
	updatedAt: string
	url: string
	urlHash: string
	width: number
}

type CachedOriginal = CachedOriginalRecord & {
	path: string
}

type CachedVariant = {
	filename: string
	path: string
	publicSource: string
	width: number
}

type Manifest = {
	originals: Record<string, CachedOriginalRecord>
}

function emptyManifest(): Manifest {
	return { originals: {} }
}

function hashBuffer(input: Buffer) {
	return createHash('sha256').update(input).digest('hex')
}

function hashString(input: string) {
	return hashBuffer(Buffer.from(input))
}

function hashJson(input: unknown) {
	return hashString(JSON.stringify(input))
}

function shortHash(input: string) {
	return input.slice(0, 12)
}

function getPublicSource(filename: string, width: number) {
	return `${publicPrefix}${filename} ${width}w`
}

function getSourceUrl(filename: string) {
	return `${publicPrefix}${filename}`
}

async function fileExists(filePath: string) {
	try {
		await stat(filePath)
		return true
	} catch {
		return false
	}
}

function ensureDirectories() {
	return Promise.all([
		mkdir(getOriginalsDir(), { recursive: true }),
		mkdir(getVariantsDir(), { recursive: true }),
		mkdir(getOutputDir(), { recursive: true }),
	])
}

async function readManifest() {
	try {
		return JSON.parse(await readFile(getManifestPath(), 'utf8')) as Manifest
	} catch {
		return emptyManifest()
	}
}

async function writeManifest(manifest: Manifest) {
	const cacheRoot = getCacheRoot()
	const manifestPath = getManifestPath()
	await mkdir(cacheRoot, { recursive: true })
	const tempPath = `${manifestPath}.${process.pid}-${Date.now()}.tmp`
	await writeFile(tempPath, `${JSON.stringify(manifest, null, '\t')}\n`)
	await rename(tempPath, manifestPath)
}

function getOriginalExtension(remoteUrl: string, contentType?: string | null) {
	if (contentType?.includes('jpeg')) return 'jpg'
	if (contentType?.includes('png')) return 'png'
	if (contentType?.includes('webp')) return 'webp'
	if (contentType?.includes('gif')) return 'gif'
	if (contentType?.includes('avif')) return 'avif'

	try {
		const extension = extname(new URL(remoteUrl).pathname).replace(/^\./, '')
		return extension || 'bin'
	} catch {
		return 'bin'
	}
}

function wait(delay: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, delay)
	})
}

async function fetchRemoteImage(remoteUrl: string, attempt = 0) {
	try {
		const response = await fetch(remoteUrl)
		if (!response.ok) {
			throw new Error(
				`Failed to fetch image: ${response.status} ${response.statusText}`,
			)
		}
		return response
	} catch (error) {
		const delay = fetchRetryDelays[attempt]
		if (delay === undefined) throw error
		await wait(delay)
		return fetchRemoteImage(remoteUrl, attempt + 1)
	}
}

async function getPlaceholder(
	input: Buffer | string,
	width: number,
	height: number,
) {
	const buffer = await sharp(input).resize(20).blur().webp().toBuffer()
	const href = `data:image/webp;base64,${buffer.toString('base64')}`
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><image href="${href}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice"/></svg>`
	return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

async function readCachedOriginal(record?: CachedOriginalRecord) {
	if (!record) return null

	const originalPath = join(getOriginalsDir(), record.filename)
	if (!(await fileExists(originalPath))) return null

	return {
		...record,
		path: originalPath,
	} satisfies CachedOriginal
}

async function fetchOriginal(remoteUrl: string) {
	const response = await fetchRemoteImage(remoteUrl)
	const buffer = Buffer.from(await response.arrayBuffer())
	const contentHash = hashBuffer(buffer)
	const urlHash = shortHash(hashString(remoteUrl))
	const contentType = response.headers.get('content-type') ?? undefined
	const extension = getOriginalExtension(remoteUrl, contentType)
	const filename = `${urlHash}-${shortHash(contentHash)}.${extension}`
	const originalPath = join(getOriginalsDir(), filename)
	const { height = 1, width = 1 } = await sharp(buffer).metadata()

	if (!(await fileExists(originalPath))) {
		await writeFile(originalPath, buffer)
	}

	return {
		contentHash,
		contentType,
		etag: response.headers.get('etag') ?? undefined,
		filename,
		height,
		lastModified: response.headers.get('last-modified') ?? undefined,
		path: originalPath,
		updatedAt: new Date().toISOString(),
		url: remoteUrl,
		urlHash,
		width,
	} satisfies CachedOriginal
}

async function getOriginal(remoteUrl: string) {
	const urlHash = shortHash(hashString(remoteUrl))
	const manifest = await readManifest()

	try {
		const original = await fetchOriginal(remoteUrl)
		manifest.originals[urlHash] = {
			contentHash: original.contentHash,
			contentType: original.contentType,
			etag: original.etag,
			filename: original.filename,
			height: original.height,
			lastModified: original.lastModified,
			updatedAt: original.updatedAt,
			url: original.url,
			urlHash: original.urlHash,
			width: original.width,
		}
		await writeManifest(manifest)
		return original
	} catch (error) {
		const cachedOriginal = await readCachedOriginal(manifest.originals[urlHash])
		if (cachedOriginal) return cachedOriginal
		throw new Error(`No cached image is available for ${remoteUrl}`, {
			cause: error,
		})
	}
}

function createVariantKey(original: CachedOriginal, width: number) {
	return {
		contentHash: original.contentHash,
		format: outputFormat,
		quality: outputQuality,
		transformVersion,
		url: original.url,
		width,
	}
}

async function getVariant(original: CachedOriginal, width: number) {
	const variantHash = shortHash(hashJson(createVariantKey(original, width)))
	const filename = `${variantHash}.${outputFormat}`
	const variantPath = join(getVariantsDir(), filename)

	if (!(await fileExists(variantPath))) {
		const tempPath = `${variantPath}.${process.pid}-${Date.now()}.tmp`
		try {
			await sharp(original.path)
				.resize(width)
				.webp({ quality: outputQuality })
				.toFile(tempPath)
			await rename(tempPath, variantPath)
		} catch (error) {
			await rm(tempPath, { force: true })
			if (!(await fileExists(variantPath))) throw error
		}
	}

	return {
		filename,
		path: variantPath,
		publicSource: getPublicSource(filename, width),
		width,
	} satisfies CachedVariant
}

async function emitVariant(variant: CachedVariant) {
	const emittedPath = join(getOutputDir(), variant.filename)
	if (!(await fileExists(emittedPath))) {
		await copyFile(variant.path, emittedPath)
	}
	usedEmittedFiles.add(variant.filename)
	return variant.publicSource
}

export async function sweepUnusedResponsiveImages() {
	const outputDir = getOutputDir()
	await mkdir(outputDir, { recursive: true })
	const filenames = await readdir(outputDir)
	await Promise.all(
		filenames
			.filter(
				(filename) =>
					filename.endsWith(`.${outputFormat}`) &&
					!usedEmittedFiles.has(filename),
			)
			.map((filename) => rm(join(outputDir, filename), { force: true })),
	)
}

export async function getResponsiveImage(remoteUrl: string, alt?: string) {
	await ensureDirectories()
	const original = await getOriginal(remoteUrl)
	const [placeholder, variants] = await Promise.all([
		getPlaceholder(original.path, original.width, original.height),
		Promise.all(widths.map((width) => getVariant(original, width))),
	])
	const sources = await Promise.all(variants.map(emitVariant))
	const defaultVariant = variants.find(
		(variant) => variant.width === defaultWidth,
	)

	if (!defaultVariant) {
		throw new Error(
			`Default responsive image width ${defaultWidth} is not generated`,
		)
	}

	return {
		alt,
		height: original.height,
		placeholder,
		src: getSourceUrl(defaultVariant.filename),
		srcSet: sources.join(', '),
		width: original.width,
	} satisfies ResponsiveImage
}
