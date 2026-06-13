import * as stylex from '@stylexjs/stylex'

import { spaces } from '../tokens.stylex'
import { ElemProps } from './types'

const styles = stylex.create({
	base: {
		paddingLeft: spaces[6],
	},
})

export function Ol({ sx, ...rest }: ElemProps<'ol'>) {
	return <ol {...rest} sx={[styles.base, sx]} />
}

export function Ul({ sx, ...rest }: ElemProps<'ul'>) {
	return <ul {...rest} sx={[styles.base, sx]} />
}

export function Li({ sx, ...rest }: ElemProps<'li'>) {
	return <li {...rest} sx={sx} />
}
