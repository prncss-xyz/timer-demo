import * as stylex from '@stylexjs/stylex'

import { ElemProps } from './types'

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

function getDepthOlStyle(dataDepth: number | string | undefined) {
	switch (Number(dataDepth) % 3) {
		case 1:
			return styles.ol1
		case 2:
			return styles.ol2
		default:
			return styles.ol0
	}
}

function getDepthUlStyle(dataDepth: number | string | undefined) {
	switch (Number(dataDepth) % 3) {
		case 1:
			return styles.ul1
		case 2:
			return styles.ul2
		default:
			return styles.ul0
	}
}

interface ListDepthProps {
	'data-depth'?: string | number
}

export function Ul({
	'data-depth': dataDepth,
	children,
	...props
}: React.HTMLAttributes<HTMLUListElement> & ListDepthProps) {
	const depth = dataDepth !== undefined ? Number(dataDepth) : 0
	const depthStyle = getDepthUlStyle(depth)

	return (
		<ul data-depth={depth} {...props} {...stylex.props(styles.ul, depthStyle)}>
			{children}
		</ul>
	)
}

export function Ol({
	'data-depth': dataDepth,
	children,
	...props
}: React.HTMLAttributes<HTMLOListElement> & ListDepthProps) {
	const depth = dataDepth !== undefined ? Number(dataDepth) : 0
	const depthStyle = getDepthOlStyle(depth)

	return (
		<ol
			data-depth={dataDepth}
			{...props}
			{...stylex.props(styles.ol, depthStyle)}
		>
			{children}
		</ol>
	)
}

export function Li({
	style,
	...rest
}: Omit<ElemProps<'li'>, 'style' | 'classname'> & {
	style?: stylex.StyleXStyles
}) {
	return <li {...rest} {...stylex.props(styles.li, style)} />
}
