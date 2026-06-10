import { create, props } from '@stylexjs/stylex'

import { fontSizes } from '../tokens.stylex'
import { ElemProps } from './types'

const styles = create({
	base: {
		backgroundColor: 'lightgray',
		borderLeftColor: 'black',
		borderLeftWidth: '0.25rem',
		fontSize: fontSizes[2],
		paddingLeft: '0.75rem',
	},
})

export function Blockquote({ style, ...rest }: ElemProps<'blockquote'>) {
	return <blockquote {...rest} {...props(styles.base, style)} />
}
