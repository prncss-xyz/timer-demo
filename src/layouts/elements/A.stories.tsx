import type { Meta, StoryObj } from '@storybook/react'

import { Col } from '../Box'
import { A } from './A'

const meta: Meta<typeof A> = {
	title: 'Layouts/Elements/A',
	component: A,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof A>

/** External link — renders a plain anchor that opens in a new tab. */
export const External: Story = {
	render: () => (
		<Col gap={4} align='start'>
			<A href='https://stylexjs.com'>StyleX documentation</A>
			<A href='https://react.dev'>React documentation</A>
		</Col>
	),
}

/**
 * Internal link — uses the Waku `Link`. It renders in Storybook but the router
 * context is absent, so navigation is not functional here.
 */
export const Internal: Story = {
	render: () => (
		<Col gap={4} align='start'>
			<A href='/posts'>Posts index</A>
			<A href='/'>Home</A>
		</Col>
	),
}

/** Links inline within a paragraph. */
export const Inline: Story = {
	render: () => (
		<p style={{ fontSize: '1rem' }}>
			Read the <A href='https://storybook.js.org'>Storybook docs</A> for more.
		</p>
	),
}
