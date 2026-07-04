import fs from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

import { basePath } from '@/meta'

import type { ResponsiveImage } from './responsiveImage'

// TODO: cache images

const { dest, prefix } =
	process.env.NODE_ENV === 'development'
		? { dest: './public/gen/', prefix: basePath + 'gen/' }
		: { dest: './dist/public/gen/', prefix: basePath + 'gen/' }

const widths = [640, 1024, 1920]
const defaultWidth = 1024

async function getHash(input: string): Promise<string> {
	const msgUint8 = new TextEncoder().encode(input)
	const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
	const hashArray = Array.from(new Uint8Array(hashBuffer))
	return hashArray
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('')
		.slice(0, 12)
}

const getName = (hash: string, width: number) => `${hash}-${width}.webp`
const getSource = (hash: string, width: number) =>
	`${prefix}${getName(hash, width)} ${width}w`
const getPlaceholder = async (
	input: Buffer | string,
	width: number,
	height: number,
) => {
	const buffer = await sharp(input).resize(20).blur().webp().toBuffer()
	const href = `data:image/webp;base64,${buffer.toString('base64')}`
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><image href="${href}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice"/></svg>`
	return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

async function getCachedResponsiveImage(hash: string, alt?: string) {
	const name = getName(hash, defaultWidth)
	const outputPath = path.join(dest, name)
	const { height = 1, width = 1 } = await sharp(outputPath).metadata()
	const placeholder = await getPlaceholder(outputPath, width, height)

	return {
		alt,
		height,
		placeholder,
		src: `${prefix}${name}`,
		srcSet: widths.map((w) => getSource(hash, w)).join(', '),
		width,
	} satisfies ResponsiveImage
}

export async function getResponsiveImage(remoteUrl: string, alt?: string) {
	await fs.mkdir(dest, { recursive: true })
	const hash = await getHash(remoteUrl)

	let buffer: Buffer
	try {
		const response = await fetch(remoteUrl)
		buffer = Buffer.from(await response.arrayBuffer())
	} catch {
		return getCachedResponsiveImage(hash, alt)
	}

	const s = sharp(buffer)
	const { height = 1, width = 1 } = await s.metadata()

	const [placeholder, sources] = await Promise.all([
		getPlaceholder(buffer, width, height),
		Promise.all(
			widths.map(async (w) => {
				const name = getName(hash, w)
				const outputPath = path.join(dest, name)
				// Only process if it doesn't exist to speed up builds
				try {
					await fs.stat(outputPath)
				} catch {
					await s.resize(w).webp().toFile(outputPath)
				}
				return getSource(hash, w)
			}),
		),
	])

	return {
		alt,
		height,
		placeholder,
		src: `${prefix}${getName(hash, defaultWidth)}`,
		srcSet: sources.join(', '),
		width,
	}
}
