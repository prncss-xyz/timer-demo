import { create, props } from '@stylexjs/stylex'

import { spaces } from '../tokens.stylex'
import { ElemProps } from './types'

const styles = create({
	base: {
		marginBottom: spaces[5],
		marginTop: spaces[5],
	},
})

export function P({ style, ...rest }: ElemProps<'p'>) {
	return <p {...rest} {...props(styles.base, style)} />
}
