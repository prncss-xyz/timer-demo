import { create, props } from '@stylexjs/stylex'

import { ElemProps } from './types'

const styles = create({
	base: {
		marginBottom: '1rem',
		marginTop: '1rem',
	},
})

export function P({ style, ...rest }: ElemProps<'p'>) {
	return <p {...rest} {...props(styles.base, style)} />
}
