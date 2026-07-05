export function buildGoogleFontsCss2Url(
	fontFamily: string,
	weights: readonly number[],
	italicWeights: readonly number[] = [],
) {
	const axes = [
		...weights.map((w) => `0,${w}`),
		...italicWeights.map((w) => `1,${w}`),
	].join(';')
	return `https://fonts.googleapis.com/css2?family=${fontFamily}:ital,wght@${axes}&display=block`
}
