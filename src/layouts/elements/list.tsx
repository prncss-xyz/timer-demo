import * as stylex from '@stylexjs/stylex'

import { Box, type BoxProps } from '../Box'

const styles = stylex.create({
	li: { paddingInlineStart: '0.6em' },
	ol: {
		paddingInlineStart: '1.4em',
	},
	ol0: {
		listStyleType: 'decimal',
	},
	ol1: {
		listStyleType: 'lower-alpha',
	},
	ol2: {
		listStyleType: 'lower-roman',
	},
	ul: {
		paddingInlineStart: '1.4em',
	},
	ul0: {
		listStyleType: 'disc',
	},
	ul1: {
		listStyleType: 'circle',
	},
	ul2: {
		listStyleType: 'square',
	},
})

type DataDepthProps = {
	'data-depth'?: string | number
}

type DataDepth = DataDepthProps['data-depth']

function getDepthOlStyle(dataDepth: DataDepth) {
	switch (Number(dataDepth) % 3) {
		case 1:
			return styles.ol1
		case 2:
			return styles.ol2
		default:
			return styles.ol0
	}
}

function getDepthUlStyle(dataDepth: DataDepth) {
	switch (Number(dataDepth) % 3) {
		case 1:
			return styles.ul1
		case 2:
			return styles.ul2
		default:
			return styles.ul0
	}
}

export function Ul({
	'data-depth': dataDepth,
	children,
	style,
	...props
}: BoxProps<'ul'> & DataDepthProps) {
	const depth = dataDepth !== undefined ? Number(dataDepth) : 0
	const depthStyle = getDepthUlStyle(depth)

	return (
		<Box
			as='ul'
			data-depth={depth}
			{...props}
			{...stylex.props(styles.ul, depthStyle, style)}
		>
			{children}
		</Box>
	)
}

export function Ol({
	'data-depth': dataDepth,
	children,
	style,
	...props
}: BoxProps<'ol'> & DataDepthProps) {
	const depth = dataDepth !== undefined ? Number(dataDepth) : 0
	const depthStyle = getDepthOlStyle(depth)

	return (
		<Box
			as='ol'
			data-depth={dataDepth}
			{...props}
			{...stylex.props(styles.ol, depthStyle, style)}
		>
			{children}
		</Box>
	)
}

export function Li({ style, ...rest }: BoxProps<'li'>) {
	return <Box as='li' {...rest} {...stylex.props(styles.li, style)} />
}
