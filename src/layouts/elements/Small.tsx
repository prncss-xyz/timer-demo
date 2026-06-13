import * as stylex from '@stylexjs/stylex'

import { fontSizes } from '../tokens/fontSizes.stylex'
import { ElemProps } from './types'

const styles = stylex.create({
	small: {
		fontSize: fontSizes.small,
	},
	sub: {
		fontSize: fontSizes.small,
		position: 'relative',
		top: '0.5rem',
	},
	sup: {
		fontSize: fontSizes.small,
		bottom: '0.5rem',
		position: 'relative',
	},
})

export function Small({
	style,
	...rest
}: Omit<ElemProps<'small'>, 'style'> & { style?: stylex.StyleXStyles }) {
	return <small {...rest} {...stylex.props([styles.small, style])} />
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
