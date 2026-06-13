import * as stylex from '@stylexjs/stylex'

import { borderWidth } from '../tokens/borderWidth.stylex'
import { colors } from '../tokens/colors.stylex'
import { fontSizes } from '../tokens/fontSizes.stylex'
import { spaces } from '../tokens/spaces.stylex'
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

export function Blockquote({
	style,
	...rest
}: Omit<ElemProps<'blockquote'>, 'style'> & { style?: stylex.StyleXStyles }) {
	return <blockquote {...rest} {...stylex.props([styles.base, style])} />
}
