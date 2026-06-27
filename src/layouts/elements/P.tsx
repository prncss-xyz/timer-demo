import * as stylex from '@stylexjs/stylex'

import { spaces } from '../tokens/spaces.stylex'
import { ElemProps } from './types'

const styles = stylex.create({
	base: {
		marginBottom: spaces[5],
		marginTop: spaces[5],
	},
})

export function P({
	style,
	...rest
}: Omit<ElemProps<'p'>, 'style' | 'classname'> & {
	style?: stylex.StyleXStyles
}) {
	return <p {...rest} {...stylex.props([styles.base, style])} />
}
