import { create, props } from '@stylexjs/stylex'

import { getResponsiveImage } from '../images/getResponsiveImage'
import { OptimizedImage } from '../images/OptimizedImage'
import { spaces } from '../tokens.stylex'
import { ElemProps } from './types'

const styles = create({
	base: {
		padding: spaces[4],
	},
})

export async function Img({
	alt,
	src,
	style,
	...rest
}: ElemProps<'div'> & ElemProps<'img'>) {
	if (src) {
		const image = await getResponsiveImage(src, alt)
		return (
			<OptimizedImage image={image} {...rest} {...props(styles.base, style)} />
		)
	}
	return <img {...rest} {...props(styles.base, style)} />
}
