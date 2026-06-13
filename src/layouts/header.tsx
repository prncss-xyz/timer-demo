import * as stylex from '@stylexjs/stylex'
import { Link } from 'waku'

import { ThemeToggle } from '@/components/ThemeToggle'

import { H2 } from './elements/Heading'
import { colors } from './tokens.stylex'

const styles = stylex.create({
	header: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'space-between',
		left: 0,
		paddingBlock: '0.75rem',
		paddingInline: '2rem',
		right: 0,
		position: 'fixed',
		zIndex: 100,
		top: 0,
		backgroundColor: 'var(--header-bg)',
		borderBottomWidth: '1px',
		borderBottomStyle: 'solid',
		borderBottomColor: colors.border,
		backdropFilter: 'blur(12px)',
		transition: 'background-color 0.3s ease, border-color 0.3s ease',
	},
	title: {
		fontSize: '1.25rem',
		fontWeight: 800,
		letterSpacing: '-0.03em',
		margin: 0,
		lineHeight: '1.75rem',
		color: colors.text,
	},
})

export const Header = () => {
	return (
		<header {...stylex.props(styles.header)}>
			<H2 {...stylex.props(styles.title)}>
				<Link to='/'>Waku starter</Link>
			</H2>
			<ThemeToggle />
		</header>
	)
}
