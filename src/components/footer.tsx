import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
	footer: {
		'@media (min-width: 1024px)': {
			bottom: 0,
			left: 0,
			position: 'fixed',
		},
		padding: '1.5rem',
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
