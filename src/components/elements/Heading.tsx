import { create, props } from '@stylexjs/stylex'
import { ElementType } from 'react'

import { fontFamilies, fontSizes } from '../tokens.stylex'
import { ElemProps } from './types'

const styles = create({
	base: {
		fontFamily: fontFamilies.heading,
		fontWeight: 'bold',
		marginTop: '0.67lh',
		textAlign: 'center',
	},
})

// TODO: as ratio
const sizeVariants = create({
	1: {
		fontSize: fontSizes[6],
	},
	2: {
		fontSize: fontSizes[5],
	},
	3: {
		fontSize: fontSizes[4],
	},
	4: {
		fontSize: fontSizes[3],
	},
	5: {
		fontSize: fontSizes[2],
	},
	6: {
		fontSize: fontSizes[1],
	},
})

function createHeading(
	baseElement: ElementType,
	baseSize: keyof typeof sizeVariants,
) {
	return function Heading<E extends ElementType>({
		as,
		size,
		style,
		...rest
	}: ElemProps<'h1'> & {
		as?: E
		size?: keyof typeof sizeVariants
	}) {
		const E = as ?? baseElement
		return (
			<E
				{...rest}
				{...props(styles.base, sizeVariants[size ?? baseSize], style)}
			/>
		)
	}
}

export const H1 = createHeading('h1', 1)
export const H2 = createHeading('h2', 2)
export const H3 = createHeading('h3', 3)
export const H4 = createHeading('h4', 4)
export const H5 = createHeading('h5', 5)
export const H6 = createHeading('h6', 6)
