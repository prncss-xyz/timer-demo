import * as stylex from '@stylexjs/stylex'

import { spaces } from '../tokens.stylex'
import { ElemProps } from './types'

const styles = stylex.create({
	base: {
		marginBottom: spaces[5],
		marginTop: spaces[5],
	},
})

export function P({ sx, ...rest }: ElemProps<'p'>) {
	return <p {...rest} sx={[styles.base, sx]} />
}
