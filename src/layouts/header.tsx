import * as stylex from '@stylexjs/stylex'
import { Link } from 'waku'

import { H2 } from './elements/Heading'

const styles = stylex.create({
	header: {
		alignItems: 'center',
		columnGap: '1rem',
		display: 'flex',
		left: {
			'@media (min-width: 1024px)': 0,
			default: null,
		},
		padding: '1.5rem',
		position: {
			'@media (min-width: 1024px)': 'fixed',
			default: null,
		},
		rowGap: '1rem',
		top: {
			'@media (min-width: 1024px)': 0,
			default: null,
		},
	},
	title: {
		fontSize: '1.125rem',
		fontWeight: 700,
		letterSpacing: '-0.025em',
		lineHeight: '1.75rem',
		margin: 0,
	},
})

export const Header = () => {
	return (
		<header {...stylex.props(styles.header)}>
			<H2 {...stylex.props(styles.title)}>
				<Link to='/'>Waku starter</Link>
			</H2>
		</header>
	)
}
