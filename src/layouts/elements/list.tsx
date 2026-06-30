import * as stylex from '@stylexjs/stylex'

import { ElemProps } from './types'

const styles = {
	li: 'mdListLi',
	ol: 'mdListOl',
	ul: 'mdListUl',
} as const

function mergeStyles(
	baseClass: string,
	style: stylex.StyleXStyles | undefined,
) {
	const { className: sxClass, style: sxStyle } = stylex.props(style)
	return {
		className: [baseClass, sxClass].filter(Boolean).join(' '),
		style: sxStyle,
	}
}

export function Ol({
	style,
	...rest
}: Omit<ElemProps<'ol'>, 'style' | 'classname'> & {
	style?: stylex.StyleXStyles
}) {
	const merged = mergeStyles(styles.ol, style)
	return <ol {...rest} className={merged.className} style={merged.style} />
}

export function Ul({
	style,
	...rest
}: Omit<ElemProps<'ul'>, 'style' | 'classname'> & {
	style?: stylex.StyleXStyles
}) {
	const merged = mergeStyles(styles.ul, style)
	return <ul {...rest} className={merged.className} style={merged.style} />
}

export function Li({
	style,
	...rest
}: Omit<ElemProps<'li'>, 'style' | 'classname'> & {
	style?: stylex.StyleXStyles
}) {
	const merged = mergeStyles(styles.li, style)
	return <li {...rest} className={merged.className} style={merged.style} />
}
