import * as stylex from '@stylexjs/stylex'

import { ElemProps } from './types'

// this is the only allowed css module in this application
import styles from './list.module.css'

function mergeStyles(
	baseClass: string,
	className: string | undefined,
	style: stylex.StyleXStyles | undefined,
) {
	const { className: sxClass, style: sxStyle } = stylex.props(style)
	return {
		className: [baseClass, className, sxClass].filter(Boolean).join(' '),
		style: sxStyle,
	}
}

export function Ol({
	style,
	className,
	...rest
}: Omit<ElemProps<'ol'>, 'style'> & { style?: stylex.StyleXStyles }) {
	const merged = mergeStyles(styles.ol, className, style)
	return <ol {...rest} className={merged.className} style={merged.style} />
}

export function Ul({
	style,
	className,
	...rest
}: Omit<ElemProps<'ul'>, 'style'> & { style?: stylex.StyleXStyles }) {
	const merged = mergeStyles(styles.ul, className, style)
	return <ul {...rest} className={merged.className} style={merged.style} />
}

export function Li({
	style,
	className,
	...rest
}: Omit<ElemProps<'li'>, 'style'> & { style?: stylex.StyleXStyles }) {
	const merged = mergeStyles(styles.li, className, style)
	return <li {...rest} className={merged.className} style={merged.style} />
}
