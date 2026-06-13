import * as stylex from '@stylexjs/stylex'

import { fontSizes } from '../tokens.stylex'
import { ElemProps } from './types'

const styles = stylex.create({
	base: {
		fontSize: fontSizes[2],
	},
	sub: {
		fontSize: fontSizes[2],
		position: 'relative',
		top: '0.5rem',
	},
	sup: {
		fontSize: fontSizes[2],
		bottom: '0.5rem',
		position: 'relative',
	},
})

export function Small({ sx, ...rest }: ElemProps<'small'>) {
	return <small {...rest} sx={[styles.base, sx]} />
}

export function Sup({ sx, ...rest }: ElemProps<'sup'>) {
	return <sup {...rest} sx={[styles.sup, sx]} />
}

export function Sub({ sx, ...rest }: ElemProps<'sub'>) {
	return <sub {...rest} sx={[styles.sub, sx]} />
}
