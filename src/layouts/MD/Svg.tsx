import * as stylex from '@stylexjs/stylex'
import { type SVGProps } from 'react'

import { Box, type BoxProps } from '../Box'
import { type ReElemProps } from './types'

const styles = stylex.create({
	wrapper: {
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
	},
	svg: {
		display: 'block',
		height: 'auto',
		maxWidth: '100%',
	},
})

export function Svg({
	children,
	style,
	...rest
}: ReElemProps<'svg'> & BoxProps<'svg'>) {
	return (
		<Box as='div' style={[styles.wrapper, style]}>
			<svg {...(rest as SVGProps<SVGSVGElement>)} {...stylex.props(styles.svg)}>
				{children}
			</svg>
		</Box>
	)
}
