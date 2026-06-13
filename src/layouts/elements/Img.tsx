import * as stylex from '@stylexjs/stylex'

import { getResponsiveImage } from '../images/getResponsiveImage'
import { OptimizedImage } from '../images/OptimizedImage'
import { spaces } from '../tokens/spaces.stylex'
import { ElemProps } from './types'

const styles = stylex.create({
	base: {
		padding: spaces[4],
	},
})

export async function Img({
	alt,
	src,
	style,
	...rest
}: Omit<ElemProps<'div'>, 'style'> &
	Omit<ElemProps<'img'>, 'style'> & { style?: stylex.StyleXStyles }) {
	if (src) {
		const image = await getResponsiveImage(src, alt)
		return (
			<OptimizedImage image={image} {...rest} style={[styles.base, style]} />
		)
	}
	return <img {...rest} {...stylex.props([styles.base, style])} />
}
