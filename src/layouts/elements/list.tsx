import * as stylex from '@stylexjs/stylex'

import { spaces } from '../tokens.stylex'
import { ElemProps } from './types'

const styles = stylex.create({
	base: {
		paddingLeft: spaces[6],
	},
})

export function Ol({
	style,
	...rest
}: Omit<ElemProps<'ol'>, 'style'> & { style?: stylex.StyleXStyles }) {
	return <ol {...rest} {...stylex.props([styles.base, style])} />
}

export function Ul({
	style,
	...rest
}: Omit<ElemProps<'ul'>, 'style'> & { style?: stylex.StyleXStyles }) {
	return <ul {...rest} {...stylex.props([styles.base, style])} />
}

export function Li({
	style,
	...rest
}: Omit<ElemProps<'li'>, 'style'> & { style?: stylex.StyleXStyles }) {
	return <li {...rest} {...stylex.props([style])} />
}
