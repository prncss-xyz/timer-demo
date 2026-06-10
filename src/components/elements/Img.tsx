import { create, props } from '@stylexjs/stylex'

import { getResponsiveImage } from '@/components/images/getResponsiveImage'
import { OptimizedImage } from '@/components/images/OptimizedImage'

import { ElemProps } from './types'

const styles = create({
	base: {
		padding: '0.5rem',
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
