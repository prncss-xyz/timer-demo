import * as stylex from '@stylexjs/stylex'

import { type ReElemProps } from '../MD/types'
import { spaces } from '../tokens/spaces.stylex'

const styles = stylex.create({
	base: {
		marginBottom: spaces[5],
		marginTop: spaces[5],
	},
})

export function P({ style, ...rest }: ReElemProps<'p'>) {
	return <p {...rest} {...stylex.props([styles.base, style])} />
}
