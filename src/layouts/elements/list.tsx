import { create, props } from '@stylexjs/stylex'

import { spaces } from '../tokens.stylex'
import { ElemProps } from './types'

const styles = create({
	base: {
		paddingLeft: spaces[6],
	},
})

export function Ol({ style, ...rest }: ElemProps<'ol'>) {
	return <ol {...rest} {...props(styles.base, style)} />
}

export function Ul({ style, ...rest }: ElemProps<'ul'>) {
	return <ul {...rest} {...props(styles.base, style)} />
}

export function Li({ style, ...rest }: ElemProps<'li'>) {
	return <li {...rest} {...props(style)} />
}
