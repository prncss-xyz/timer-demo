import * as stylex from '@stylexjs/stylex'

import { sizes } from './tokens/sizes.stylex'
import { spaces } from './tokens/spaces.stylex'

const sizeVariants = stylex.create({
	fullHeight: {
		height: sizes.full,
	},
	fullSize: {
		height: sizes.full,
		width: sizes.full,
	},
	fullWidth: {
		width: sizes.full,
	},
})

const flexVariants = stylex.create({
	col: {
		display: 'flex',
		flexDirection: 'column',
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
	},
})

const justifyVariants = stylex.create({
	around: {
		justifyContent: 'space-around',
	},
	between: {
		justifyContent: 'space-between',
	},
	center: {
		justifyContent: 'center',
	},
	end: {
		justifyContent: 'flex-end',
	},
	start: {
		justifyContent: 'flex-start',
	},
})

const alignVariants = stylex.create({
	baseline: {
		alignItems: 'baseline',
	},
	center: {
		alignItems: 'center',
	},
	end: {
		alignItems: 'flex-end',
	},
	start: {
		alignItems: 'flex-start',
	},
	stretch: {
		alignItems: 'stretch',
	},
})

const pVariants = stylex.create({
	1: { padding: spaces[1] },
	2: { padding: spaces[2] },
	3: { padding: spaces[3] },
	4: { padding: spaces[4] },
	5: { padding: spaces[5] },
	6: { padding: spaces[6] },
	7: { padding: spaces[7] },
	8: { padding: spaces[8] },
})

const pxVariants = stylex.create({
	1: {
		paddingLeft: spaces[1],
		paddingRight: spaces[1],
	},
	2: {
		paddingLeft: spaces[2],
		paddingRight: spaces[2],
	},
	3: {
		paddingLeft: spaces[3],
		paddingRight: spaces[3],
	},
	4: {
		paddingLeft: spaces[4],
		paddingRight: spaces[4],
	},
	5: {
		paddingLeft: spaces[5],
		paddingRight: spaces[5],
	},
	6: {
		paddingLeft: spaces[6],
		paddingRight: spaces[6],
	},
	7: {
		paddingLeft: spaces[7],
		paddingRight: spaces[7],
	},
	8: {
		paddingLeft: spaces[8],
		paddingRight: spaces[8],
	},
})

const pyVariants = stylex.create({
	1: {
		paddingBottom: spaces[1],
		paddingTop: spaces[1],
	},
	2: {
		paddingBottom: spaces[2],
		paddingTop: spaces[2],
	},
	3: {
		paddingBottom: spaces[3],
		paddingTop: spaces[3],
	},
	4: {
		paddingBottom: spaces[4],
		paddingTop: spaces[4],
	},
	5: {
		paddingBottom: spaces[5],
		paddingTop: spaces[5],
	},
	6: {
		paddingBottom: spaces[6],
		paddingTop: spaces[6],
	},
	7: {
		paddingBottom: spaces[7],
		paddingTop: spaces[7],
	},
	8: {
		paddingBottom: spaces[8],
		paddingTop: spaces[8],
	},
})

const gapVariants = stylex.create({
	1: { gap: spaces[1] },
	2: { gap: spaces[2] },
	3: { gap: spaces[3] },
	4: { gap: spaces[4] },
	5: { gap: spaces[5] },
	6: { gap: spaces[6] },
	7: { gap: spaces[7] },
	8: { gap: spaces[8] },
})

export type BoxBaseProps<E extends React.ElementType = React.ElementType> = {
	align?: keyof typeof alignVariants
	as?: E
	flex?: keyof typeof flexVariants
	gap?: keyof typeof gapVariants
	justify?: keyof typeof justifyVariants
	p?: keyof typeof pVariants
	px?: keyof typeof pxVariants
	py?: keyof typeof pyVariants
	size?: keyof typeof sizeVariants
	style?: stylex.StyleXStyles
}

type BoxProps<E extends React.ElementType> = BoxBaseProps<E> &
	Omit<React.ComponentProps<E>, keyof BoxBaseProps>

const defaultElement = 'div'

export function Box<E extends React.ElementType = typeof defaultElement>({
	align,
	as,
	flex,
	gap,
	justify,
	p,
	px,
	py,
	size,
	style,
	...rest
}: BoxProps<E>) {
	const Element = as || defaultElement
	return (
		<Element
			{...rest}
			{...stylex.props([
				flex && flexVariants[flex],
				p && pVariants[p],
				px && pxVariants[px],
				py && pyVariants[py],
				gap && gapVariants[gap],
				align && alignVariants[align],
				justify && justifyVariants[justify],
				size && sizeVariants[size],
				style,
			])}
		/>
	)
}

export function Row<E extends React.ElementType = typeof defaultElement>(
	props: BoxProps<E>,
) {
	return <Box flex='row' {...props} />
}

export function Col<E extends React.ElementType = typeof defaultElement>({
	...rest
}: BoxProps<E>) {
	return <Box flex='col' {...rest} />
}
