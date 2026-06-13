import * as stylex from '@stylexjs/stylex'

import { Col } from '@/layouts/Box'
import { H2 } from '@/layouts/elements/Heading'
import { Li, Ul } from '@/layouts/elements/list'
import { P } from '@/layouts/elements/P'
import { sizes } from '@/layouts/tokens.stylex'

const styles = stylex.create({
	txt: {
		width: sizes.readable,
	},
})

export default async function HomePage() {
	return (
		<Col gap={6} style={styles.txt}>
			<H2>Dark Mode Demo</H2>

			<P>
				A gorgeous web application showcasing a persisted three-state dark mode
				toggle (Light, Dark, and System theme synchronization) built using
				StyleX and Waku.
			</P>

			<Ul>
				<Li>3-State Persistence (Light / Dark / System)</Li>
				<Li>Zero Flash of Unthemed Content (FOUC)</Li>
				<Li>System theme auto-update listeners</Li>
				<Li>Premium responsive interface using StyleX</Li>
			</Ul>
		</Col>
	)
}

export const getConfig = async () => {
	return {
		render: 'static',
	} as const
}
