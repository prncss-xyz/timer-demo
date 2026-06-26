import type { Meta, StoryObj } from '@storybook/react'

import { Col } from '../Box'
import { Blockquote } from './Blockquote'

const meta: Meta<typeof Blockquote> = {
	title: 'Layouts/Elements/Blockquote',
	component: Blockquote,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Blockquote>

/** A pull quote with the primary-colored left border. */
export const Default: Story = {
	render: () => (
		<Col w='readable' align='stretch'>
			<Blockquote>
				Simplicity is the ultimate sophistication. Good design is as little
				design as possible.
			</Blockquote>
		</Col>
	),
}

/** A short attributed quote. */
export const Short: Story = {
	render: () => (
		<Blockquote>Make it work, make it right, make it fast.</Blockquote>
	),
}
