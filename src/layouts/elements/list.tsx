import { create, props } from '@stylexjs/stylex'

import { ElemProps } from './types'

const styles = create({
	base: {
		paddingLeft: '2.4rem',
	},
})

export function Ol({ style, ...rest }: ElemProps<'ol'>) {
	return <ol {...rest} {...props(styles.base, style)} />
}

export function Ul({ style, ...rest }: ElemProps<'ul'>) {
	return <ul {...rest} {...props(styles.base, style)} />
}
