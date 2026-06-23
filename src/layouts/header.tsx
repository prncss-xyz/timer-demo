import * as stylex from '@stylexjs/stylex'
import { ReactNode } from 'react'

import { animationDurations } from './tokens/animationDurations.stylex'
import { animationTimings } from './tokens/animationTimings.stylex'
import { borderWidth } from './tokens/borderWidth.stylex'
import { colors } from './tokens/colors.stylex'
import { spaces } from './tokens/spaces.stylex'

const height = 64

const styles = stylex.create({
	header: {
		height,
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'space-between',
		left: 0,
		paddingBlock: spaces[4],
		paddingInline: spaces[6],
		right: 0,
		position: 'fixed',
		zIndex: 100,
		top: 0,
		backgroundColor: 'var(--header-bg)',
		borderBottomWidth: borderWidth.thin,
		borderBottomStyle: 'solid',
		borderBottomColor: colors.border,
		backdropFilter: 'blur(12px)',
		transitionProperty: 'background-color, border-color',
		transitionDuration: animationDurations.slow,
		transitionTimingFunction: animationTimings.ease,
	},
	placeHolder: {
		height,
	},
})

export const Header = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<header {...stylex.props([styles.header])}>{children}</header>
			<div {...stylex.props([styles.placeHolder])} />
		</>
	)
}
