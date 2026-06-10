import { create, props } from '@stylexjs/stylex'

import { fontSizes } from '../tokens.stylex'
import { ElemProps } from './types'

const styles = create({
	base: {
		fontSize: fontSizes[2],
	},
	sub: {
		fontSize: fontSizes[2],
		position: 'relative',
		top: '0.5rem',
	},
	sup: {
		bottom: '0.5rem',
		fontSize: fontSizes[2],
		position: 'relative',
	},
})

export function Small({ style, ...rest }: ElemProps<'small'>) {
	return <small {...rest} {...props(styles.base, style)} />
}

export function Sup({ style, ...rest }: ElemProps<'sup'>) {
	return <sup {...rest} {...props(styles.sup, style)} />
}

export function Sub({ style, ...rest }: ElemProps<'sub'>) {
	return <sub {...rest} {...props(styles.sub, style)} />
}
