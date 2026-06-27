/// <reference path="./env.d.ts" />
import { Suspense } from 'react'
import type { Preview, Decorator } from '@storybook/react'

import '../src/pages/reset.css'

/**
 * Wraps every story in <Suspense> so that async (server) components
 * can render. React 19 supports async components natively when they
 * are a descendant of a Suspense boundary.
 *
 * Stories for synchronous / client-only components are unaffected;
 * they pass through Suspense synchronously.
 */
const withSuspense: Decorator = (Story) => (
	<Suspense fallback={null}>
		<Story />
	</Suspense>
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
	decorators: [withSuspense],
}

export default preview