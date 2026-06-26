import type { Meta, StoryObj } from '@storybook/react'

import { Col } from '../Box'
import { H1, H2, H3, H4, H5, H6 } from './Heading'

const meta: Meta<typeof H1> = {
	title: 'Layouts/Elements/Heading',
	component: H1,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof H1>

/** All heading levels rendered together. */
export const AllLevels: Story = {
	render: () => (
		<Col gap={4} align='stretch'>
			<H1>Heading level 1</H1>
			<H2>Heading level 2</H2>
			<H3>Heading level 3</H3>
			<H4>Heading level 4</H4>
			<H5>Heading level 5</H5>
			<H6>Heading level 6</H6>
		</Col>
	),
}

export const H1Story: Story = { render: () => <H1>Heading level 1</H1> }
export const H2Story: Story = { render: () => <H2>Heading level 2</H2> }
export const H3Story: Story = { render: () => <H3>Heading level 3</H3> }
export const H4Story: Story = { render: () => <H4>Heading level 4</H4> }
export const H5Story: Story = { render: () => <H5>Heading level 5</H5> }
export const H6Story: Story = { render: () => <H6>Heading level 6</H6> }
