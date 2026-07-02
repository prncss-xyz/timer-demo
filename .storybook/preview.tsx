/// <reference path="./env.d.ts" />
import { Suspense } from 'react'
import type { Preview, Decorator } from '@storybook/react'
import * as stylex from '@stylexjs/stylex'

import { DevStyleXInject } from '../src/layouts/DevStyleXInject'
import { colors } from '../src/layouts/tokens/colors.stylex'

import '../src/pages/reset.css'
import '../src/pages/syntax-highlighting.css'


/**
 * Wraps every story in <Suspense> so that async (server) components
 * can render. React 19 supports async components natively when they
 * are a descendant of a Suspense boundary.
 *
 * Stories for synchronous / client-only components are unaffected;
 * they pass through Suspense synchronously.
 */
const styles = stylex.create({
	root: {
		backgroundColor: colors.background,
		color: colors.text,
	},
})

const withStyleXAndSuspense: Decorator = (Story) => (
	<>
		<DevStyleXInject />
		<div {...stylex.props(styles.root)}>
			<Suspense fallback={null}>
				<Story />
			</Suspense>
		</div>
	</>
)

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
	decorators: [withStyleXAndSuspense],
}

export default preview