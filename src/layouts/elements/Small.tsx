import * as stylex from '@stylexjs/stylex'

import { fontSizes } from '../tokens.stylex'
import { ElemProps } from './types'

const styles = stylex.create({
	base: {
		fontSize: fontSizes[2],
	},
	sub: {
		fontSize: fontSizes[2],
		position: 'relative',
		top: '0.5rem',
	},
	sup: {
		fontSize: fontSizes[2],
		bottom: '0.5rem',
		position: 'relative',
	},
})

export function Small({
	style,
	...rest
}: Omit<ElemProps<'small'>, 'style'> & { style?: stylex.StyleXStyles }) {
	return <small {...rest} {...stylex.props([styles.base, style])} />
}

export function Sup({
	style,
	...rest
}: Omit<ElemProps<'sup'>, 'style'> & { style?: stylex.StyleXStyles }) {
	return <sup {...rest} {...stylex.props([styles.sup, style])} />
}

export function Sub({
	style,
	...rest
}: Omit<ElemProps<'sub'>, 'style'> & { style?: stylex.StyleXStyles }) {
	return <sub {...rest} {...stylex.props([styles.sub, style])} />
}
