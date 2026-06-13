import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
	footer: {
		bottom: {
			default: null,
			'@media (min-width: 1024px)': 0,
		},
		padding: '1.5rem',
		left: {
			'@media (min-width: 1024px)': 0,
			default: null,
		},
		position: {
			default: null,
			'@media (min-width: 1024px)': 'fixed',
		},
	},
	link: {
		color: 'inherit',
		display: 'inline-block',
		textDecoration: 'underline',
		marginTop: '1rem',
	},
})

export const Footer = () => {
	return (
		<footer sx={styles.footer}>
			<div>
				visit{' '}
				<a
					href='https://waku.gg/'
					target='_blank'
					rel='noreferrer'
					sx={styles.link}
				>
					waku.gg
				</a>{' '}
				to learn more
			</div>
		</footer>
	)
}
