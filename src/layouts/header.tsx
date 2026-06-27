import * as stylex from '@stylexjs/stylex'
import { ReactNode } from 'react'

const styles = stylex.create({
	header: {
		left: 0,
		right: 0,
		position: 'fixed',
		zIndex: 100,
		top: 0,
	},
	placeHolder: {
		visibility: 'hidden',
	},
})

export const Header = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<header {...stylex.props(styles.header)}>{children}</header>
			<div {...stylex.props(styles.placeHolder)}>{children}</div>
		</>
	)
}
