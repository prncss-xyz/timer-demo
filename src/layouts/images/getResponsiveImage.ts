import fs from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

import { basePath } from '@/basePath'

// TODO: cache images

const { dest, prefix } =
	process.env.NODE_ENV === 'development'
		? { dest: './public/gen/', prefix: basePath + 'gen/' }
		: { dest: './dist/public/gen/', prefix: basePath + 'gen/' }

async function getHash(input: string): Promise<string> {
	const msgUint8 = new TextEncoder().encode(input)
	const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
	const hashArray = Array.from(new Uint8Array(hashBuffer))
	return hashArray
		.map((b) => b.toString(16).padStart(2, '0'))
		.join('')
		.slice(0, 12)
}

export interface ResponsiveImage {
	alt?: string | undefined
	height: number
	placeholder: string
	src: string
	srcSet: string
	width: number
}

export async function getResponsiveImage(remoteUrl: string, alt?: string) {
	await fs.mkdir(dest, { recursive: true })
	const hash = await getHash(remoteUrl)

	const widths = [640, 1024, 1920]
	const response = await fetch(remoteUrl)
	const buffer = Buffer.from(await response.arrayBuffer())

	const s = sharp(buffer)

	const [{ height, width }, placeholder, sources] = await Promise.all([
		s.metadata(),
		s
			.resize(20)
			.blur()
			.webp()
			.toBuffer()
			.then((buffer) => `data:image/png;base64,${buffer.toString('base64')}`),
		Promise.all(
			widths.map(async (w) => {
				const name = `${hash}-${w}.webp`
				const outputPath = path.join(dest, name)
				// Only process if it doesn't exist to speed up builds
				try {
					await fs.stat(outputPath)
				} catch {
					await s.resize(w).webp().toFile(outputPath)
				}
				return `${prefix}${name} ${w}w`
			}),
		),
	])

	return {
		alt,
		height,
		placeholder,
		src: `${basePath}${hash}-${widths[1]}.webp`,
		srcSet: sources.join(', '),
		width,
	}
}
