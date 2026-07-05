// Lightning CSS feature flag for `light-dark()`.
// Equivalent to `Features.LightDark` from `lightningcss`.
const LIGHTNING_CSS_FEATURE_LIGHT_DARK = 1 << 20

export const stylexLightningCssOptions = {
	exclude: LIGHTNING_CSS_FEATURE_LIGHT_DARK,
} as const

export function stylexRootCssInjectionTarget(fileName: string) {
	return /(^|\/)_root-[^/]+\.css$/.test(fileName)
}

export function stylexStorybookCssInjectionTarget(fileName: string) {
	return /(^|\/)preview-[^/]+\.css$/.test(fileName)
}
