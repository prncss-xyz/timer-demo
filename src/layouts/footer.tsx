import * as stylex from '@stylexjs/stylex'

import { Row } from './Box'
import { A } from './elements/A'
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
})

export const Footer = () => {
	return (
		<footer sx={styles.footer}>
			<Row gap={3}>
				<A href='https://waku.gg/' target='_blank' rel='noreferrer'>
					waku.gg
				</A>
				<div>to learn more</div>
			</Row>
		</footer>
	)
}
