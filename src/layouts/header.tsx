import * as stylex from '@stylexjs/stylex'
import { Link } from 'waku'

import { DarkModeToggle } from '@/components/darkMode/DarkModeToggle'

import { H1 } from './elements/Heading'
import { colors, borderWidth, spaces } from './tokens.stylex'

const styles = stylex.create({
	header: {
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
		transition: 'background-color 0.3s ease, border-color 0.3s ease',
	},
})

export const Header = () => {
	return (
		<header sx={styles.header}>
			<H1>
				<Link to='/'>Waku starter</Link>
			</H1>
			<DarkModeToggle />
		</header>
	)
}
