import { type ElementType } from 'react'

import { Box, type BoxProps } from '../Box'

// TODO: margins

const fontSizes = {
	1: 6,
	2: 5,
	3: 4,
	4: 3,
	5: 2,
	6: 1,
} as const

function createHeading(
	baseElement: ElementType,
	baseSize: 1 | 2 | 3 | 4 | 5 | 6,
) {
	return function Heading({ ...rest }: BoxProps<ElementType>) {
		return (
			<Box
				as={baseElement}
				fontFamily='heading'
				fontWeight='bold'
				pt={3}
				textAlign='center'
				fontSize={fontSizes[baseSize]}
				{...rest}
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
