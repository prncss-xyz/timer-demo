import * as stylex from '@stylexjs/stylex'

import { spaces } from '../tokens/spaces.stylex'
import { ElemProps } from './types'

// Recreate the list styles canceled by the global reset (`ul, ol { list-style: none; padding: 0 }`, `li { margin: 0 }`).
// Markers are driven by `list-style-type` on the container (inherited by `li`) plus `display: list-item` on `li`.
const styles = stylex.create({
	ol: {
		listStyleType: 'decimal',
		paddingLeft: spaces[6],
	},
	ul: {
		listStyleType: 'disc',
		paddingLeft: spaces[6],
	},
	li: {
		display: 'list-item',
	},
})

export function Ol({
	style,
	...rest
}: Omit<ElemProps<'ol'>, 'style'> & { style?: stylex.StyleXStyles }) {
	return <ol {...rest} {...stylex.props([styles.ol, style])} />
}

export function Ul({
	style,
	...rest
}: Omit<ElemProps<'ul'>, 'style'> & { style?: stylex.StyleXStyles }) {
	return <ul {...rest} {...stylex.props([styles.ul, style])} />
}

export function Li({
	style,
	...rest
}: Omit<ElemProps<'li'>, 'style'> & { style?: stylex.StyleXStyles }) {
	return <li {...rest} {...stylex.props([styles.li, style])} />
}
