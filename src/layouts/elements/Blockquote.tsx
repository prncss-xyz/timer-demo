import * as stylex from '@stylexjs/stylex'

import { Box, BoxProps } from '../Box'
import { borderWidth } from '../tokens/borderWidth.stylex'
import { colors } from '../tokens/colors.stylex'
import { spaces } from '../tokens/spaces.stylex'

const styles = stylex.create({
	base: {
		backgroundColor: colors.accentBg,
		borderLeftColor: colors.primary,
		borderLeftStyle: 'solid',
		borderLeftWidth: borderWidth.thick,
		paddingLeft: spaces[4],
	},
})

export function Blockquote({ style, ...rest }: BoxProps<'blockquote'>) {
	return (
		<Box as='blockquote' {...rest} {...stylex.props([styles.base, style])} />
	)
}
