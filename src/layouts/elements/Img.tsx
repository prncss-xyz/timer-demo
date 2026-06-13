import * as stylex from '@stylexjs/stylex'

import { getResponsiveImage } from '../images/getResponsiveImage'
import { OptimizedImage } from '../images/OptimizedImage'
import { spaces } from '../tokens.stylex'
import { ElemProps } from './types'

const styles = stylex.create({
	base: {
		padding: spaces[4],
	},
})

export async function Img({
	alt,
	src,
	sx,
	...rest
}: ElemProps<'div'> & ElemProps<'img'>) {
	if (src) {
		const image = await getResponsiveImage(src, alt)
		return <OptimizedImage image={image} {...rest} sx={[styles.base, sx]} />
	}
	return <img {...rest} sx={[styles.base, sx]} />
}
