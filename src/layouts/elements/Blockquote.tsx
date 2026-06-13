import { create, props } from '@stylexjs/stylex'

import { fontSizes, borderWidth, spaces, colors } from '../tokens.stylex'
import { ElemProps } from './types'

const styles = create({
	base: {
		backgroundColor: colors.btnBg,
		borderLeftColor: colors.primary,
		borderLeftStyle: 'solid',
		fontSize: fontSizes[2],
		borderLeftWidth: borderWidth.thick,
		paddingLeft: spaces[4],
	},
})

export function Blockquote({ style, ...rest }: ElemProps<'blockquote'>) {
	return <blockquote {...rest} {...props(styles.base, style)} />
}
