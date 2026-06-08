import * as stylex from '@stylexjs/stylex'
import { Link } from 'waku'

const styles = stylex.create({
	header: {
		'@media (min-width: 1024px)': {
			left: 0,
			position: 'fixed',
			top: 0,
		},
		alignItems: 'center',
		display: 'flex',
		gap: '1rem',
		padding: '1.5rem',
	},
	link: {
		color: 'inherit',
		textDecoration: 'none',
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
			<h2 {...stylex.props(styles.title)}>
				<Link to='/' {...stylex.props(styles.link)}>
					Waku starter
				</Link>
			</h2>
		</header>
	)
}
