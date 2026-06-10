import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
	footer: {
		bottom: {
			'@media (min-width: 1024px)': 0,
			default: null,
		},
		left: {
			'@media (min-width: 1024px)': 0,
			default: null,
		},
		padding: '1.5rem',
		position: {
			'@media (min-width: 1024px)': 'fixed',
			default: null,
		},
	},
	link: {
		color: 'inherit',
		display: 'inline-block',
		marginTop: '1rem',
		textDecoration: 'underline',
	},
})

export const Footer = () => {
	return (
		<footer {...stylex.props(styles.footer)}>
			<div>
				visit{' '}
				<a
					href='https://waku.gg/'
					target='_blank'
					rel='noreferrer'
					{...stylex.props(styles.link)}
				>
					waku.gg
				</a>{' '}
				to learn more
			</div>
		</footer>
	)
}
