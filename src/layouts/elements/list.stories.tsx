import type { Meta, StoryObj } from '@storybook/react'

import { Col } from '../Box'
import { Li, Ol, Ul } from './list'

const meta: Meta<typeof Ul> = {
	title: 'Layouts/Elements/List',
	component: Ul,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Ul>

/** Unordered (bulleted) list. */
export const Unordered: Story = {
	render: () => (
		<Col w='readable' align='stretch'>
			<Ul>
				<Li>First item</Li>
				<Li>Second item</Li>
				<Li>Third item</Li>
			</Ul>
		</Col>
	),
}

/** Ordered (numbered) list. */
export const Ordered: Story = {
	render: () => (
		<Col w='readable' align='stretch'>
			<Ol>
				<Li>Build the style system</Li>
				<Li>Compose layout primitives</Li>
				<Li>Ship the page</Li>
			</Ol>
		</Col>
	),
}

/** Nested lists mixing ordered and unordered markers. */
export const Nested: Story = {
	render: () => (
		<Col w='readable' align='stretch'>
			<Ol>
				<Li>Gather ingredients</Li>
				<Li>
					Prepare
					<Ul>
						<Li>Wash the vegetables</Li>
						<Li>Chop finely</Li>
					</Ul>
				</Li>
				<Li>Cook and serve</Li>
			</Ol>
		</Col>
	),
}
