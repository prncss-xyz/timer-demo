import { expect, test } from '@playwright/test'

import { buildBasePath } from './basePath'

const root = buildBasePath(process.env)

const getBlogImageState = () =>
	window.document.querySelector('main img[aria-hidden="true"]') &&
	window.document.querySelector('main img:not([aria-hidden])')
		? (() => {
				const placeholder = window.document.querySelector(
					'main img[aria-hidden="true"]',
				) as HTMLImageElement
				const image = window.document.querySelector(
					'main img:not([aria-hidden])',
				) as HTMLImageElement
				const placeholderRect = placeholder.getBoundingClientRect()
				const imageRect = image.getBoundingClientRect()
				return {
					image: {
						complete: image.complete,
						height: imageRect.height,
						width: imageRect.width,
					},
					placeholder: {
						height: placeholderRect.height,
						width: placeholderRect.width,
					},
					viewportHeight: window.innerHeight,
				}
			})()
		: null

test('blog image placeholder reserves full rendered image size while loading', async ({
	page,
}) => {
	let unblockImage = () => {}
	const imageRequestBlocked = new Promise<void>((resolve) => {
		void page.route('**/gen/*.webp', async (route) => {
			resolve()
			await new Promise<void>((unblock) => {
				unblockImage = unblock
			})
			await route.continue()
		})
	})

	await page.goto(`${root}blog/hello-world`, { waitUntil: 'domcontentloaded' })
	await imageRequestBlocked
	await page.waitForSelector('main img[aria-hidden="true"]')

	const loadingState = await page.evaluate(getBlogImageState)

	expect(loadingState).not.toBeNull()
	expect(loadingState?.image.complete).toBe(false)
	expect(loadingState?.placeholder.height).toBeGreaterThan(
		loadingState?.viewportHeight ? loadingState.viewportHeight * 0.45 : 0,
	)
	expect(loadingState?.placeholder.width).toBeGreaterThan(300)

	unblockImage()
	await page.waitForLoadState('networkidle')

	const loadedState = await page.evaluate(getBlogImageState)

	expect(loadedState).not.toBeNull()
	expect(loadedState?.image.complete).toBe(true)
	expect(loadedState?.placeholder.height).toBeCloseTo(
		loadedState?.image.height ?? 0,
		0,
	)
	expect(loadedState?.placeholder.width).toBeCloseTo(
		loadedState?.image.width ?? 0,
		0,
	)
})
