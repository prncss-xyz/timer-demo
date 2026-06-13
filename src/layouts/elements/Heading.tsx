import * as stylex from '@stylexjs/stylex'
import { ElementType } from 'react'

import { fontFamilies, fontSizes, fontWeights, spaces } from '../tokens.stylex'
import { ElemProps } from './types'

const styles = stylex.create({
	base: {
		fontFamily: fontFamilies.heading,
		fontWeight: fontWeights.bold,
		textAlign: 'center',
		marginTop: spaces[5],
	},
})

const sizeVariants = stylex.create({
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
		sx,
		...rest
	}: ElemProps<'h1'> & {
		as?: E
		size?: keyof typeof sizeVariants
	}) {
		const E = as ?? baseElement
		return (
			<E
				{...rest}
				{...stylex.props(styles.base, sizeVariants[size ?? baseSize], sx)}
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
