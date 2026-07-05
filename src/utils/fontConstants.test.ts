import { describe, expect, test } from 'vite-plus/test'

import { buildGoogleFontsCss2Url } from './fontConstants'

export const siteFontFamily = 'Nunito'

export const viteWebfontDownloadConfig = [
	buildGoogleFontsCss2Url(siteFontFamily, [300, 400, 600, 700], [400, 700]),
]

describe('buildGoogleFontsCss2Url', () => {
	test('builds a URL with non-italic weights only', () => {
		expect(buildGoogleFontsCss2Url('Nunito', [400, 700])).toBe(
			'https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,700&display=block',
		)
	})

	test('builds a URL with non-italic and italic weights', () => {
		expect(buildGoogleFontsCss2Url('Nunito', [400, 700], [400, 700])).toBe(
			'https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,700;1,400;1,700&display=block',
		)
	})

	test('omits the italic axis tuple when italicWeights is empty', () => {
		expect(
			buildGoogleFontsCss2Url('Nunito', [300, 400, 600, 700]).includes('1,'),
		).toBe(false)
	})

	test('viteWebfontDownloadConfig matches the documented Nunito axes', () => {
		expect(viteWebfontDownloadConfig).toEqual([
			'https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,600;0,700;1,400;1,700&display=block',
		])
		expect(siteFontFamily).toBe('Nunito')
	})
})
