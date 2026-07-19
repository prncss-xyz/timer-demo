import { buildGoogleFontsCss2Url } from './src/utils/fontConstants'

export const siteFontFamily = 'Nunito'
export const siteWebfontCssUrl = buildGoogleFontsCss2Url(
	siteFontFamily,
	[300, 400, 600, 700],
	[400, 700],
)

export const viteWebfontDownloadConfig = [siteWebfontCssUrl]
