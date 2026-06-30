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

/** Unordered (bulleted) list with 3 levels of nesting. */
export const Unordered: Story = {
	render: () => (
		<Col w='readable' align='stretch'>
			<Ul data-depth={0}>
				<Li>
					Documents
					<Ul data-depth={1}>
						<Li>
							Projects
							<Ul data-depth={2}>
								<Li>Architecture diagrams</Li>
								<Li>Meeting notes</Li>
							</Ul>
						</Li>
						<Li>
							Photos
							<Ul data-depth={2}>
								<Li>Vacation album</Li>
								<Li>Screenshots</Li>
							</Ul>
						</Li>
					</Ul>
				</Li>
				<Li>
					Downloads
					<Ul data-depth={1}>
						<Li>
							Tools
							<Ul data-depth={2}>
								<Li>Package managers</Li>
								<Li>CLI utilities</Li>
							</Ul>
						</Li>
					</Ul>
				</Li>
			</Ul>
		</Col>
	),
}

/** Ordered (numbered) list with 3 levels of nesting. */
export const Ordered: Story = {
	render: () => (
		<Col w='readable' align='stretch'>
			<Ol data-depth={0}>
				<Li>
					Plan the feature
					<Ol data-depth={1}>
						<Li>
							Research
							<Ol data-depth={2}>
								<Li>Gather requirements</Li>
								<Li>Review existing patterns</Li>
							</Ol>
						</Li>
						<Li>
							Design
							<Ol data-depth={2}>
								<Li>Wireframe the UI</Li>
								<Li>Define data model</Li>
							</Ol>
						</Li>
					</Ol>
				</Li>
				<Li>
					Implement
					<Ol data-depth={1}>
						<Li>
							Build components
							<Ol data-depth={2}>
								<Li>Create styled primitives</Li>
								<Li>Compose page layout</Li>
							</Ol>
						</Li>
					</Ol>
				</Li>
				<Li>Ship to production</Li>
			</Ol>
		</Col>
	),
}
