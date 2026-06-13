import * as stylex from '@stylexjs/stylex'

import { fontSizes, borderWidth, spaces, colors } from '../tokens.stylex'
import { ElemProps } from './types'

const styles = stylex.create({
	base: {
		backgroundColor: colors.btnBg,
		borderLeftColor: colors.primary,
		borderLeftStyle: 'solid',
		fontSize: fontSizes[2],
		borderLeftWidth: borderWidth.thick,
		paddingLeft: spaces[4],
	},
})

export function Blockquote({ sx, ...rest }: ElemProps<'blockquote'>) {
	return <blockquote {...rest} sx={[styles.base, sx]} />
}
