import type { Meta, StoryObj } from '@storybook/react'

import { Small, Sub, Sup } from './Small'

const meta: Meta<typeof Small> = {
	title: 'Layouts/Elements/Small',
	component: Small,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Small>

/** Side-by-side small text and inline subscript/superscript. */
export const Inline: Story = {
	render: () => (
		<p style={{ fontSize: '1rem' }}>
			Regular text <Small>with smaller detail</Small>, a footnote
			<Sup>1</Sup>, and a chemical formula H<Sub>2</Sub>O.
		</p>
	),
}

export const SmallOnly: Story = {
	render: () => <Small>Fine print and disclaimers</Small>,
}

export const Superscript: Story = {
	render: () => (
		<p style={{ fontSize: '1rem' }}>
			E = mc<Sup>2</Sup>
		</p>
	),
}

export const Subscript: Story = {
	render: () => (
		<p style={{ fontSize: '1rem' }}>
			CO<Sub>2</Sub> emissions
		</p>
	),
}
