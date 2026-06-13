import * as stylex from '@stylexjs/stylex'

import { spaces } from './tokens.stylex'

const styles = stylex.create({
	footer: {
		bottom: {
			default: null,
			'@media (min-width: 1024px)': 0,
		},
		padding: spaces[5],
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
		marginTop: spaces[5],
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
