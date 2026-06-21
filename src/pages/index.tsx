import * as stylex from '@stylexjs/stylex'

import { Col } from '@/layouts/Box'
import { MD } from '@/layouts/MD'
import { sizes } from '@/layouts/tokens/sizes.stylex'
import { createMessages, globalMessages } from '@/messages'

const styles = stylex.create({
	txt: {
		width: sizes.readable,
	},
})

const messages = createMessages(globalMessages, {
	Main: () => (
		<MD>{`
## Dark Mode Demo

A gorgeous web application showcasing a persisted three-state dark mode
toggle (Light, Dark, and System theme synchronization) built using StyleX and Waku.

-  3-State Persistence (Light / Dark / System)
-  Zero Flash of Unthemed Content (FOUC)
-  System theme auto-update listeners
-  Premium responsive interface using StyleX
`}</MD>
	),
})

export default async function HomePage() {
	return (
		<Col gap={6} style={styles.txt}>
			<messages.Main />
		</Col>
	)
}

export const getConfig = async () => {
	return {
		render: 'static',
	} as const
}
