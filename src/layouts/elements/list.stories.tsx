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
			<Ul>
				<Li>
					Documents
					<Ul>
						<Li>
							Projects
							<Ul>
								<Li>Architecture diagrams</Li>
								<Li>Meeting notes</Li>
							</Ul>
						</Li>
						<Li>
							Photos
							<Ul>
								<Li>Vacation album</Li>
								<Li>Screenshots</Li>
							</Ul>
						</Li>
					</Ul>
				</Li>
				<Li>
					Downloads
					<Ul>
						<Li>
							Tools
							<Ul>
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
			<Ol>
				<Li>
					Plan the feature
					<Ol>
						<Li>
							Research
							<Ol>
								<Li>Gather requirements</Li>
								<Li>Review existing patterns</Li>
							</Ol>
						</Li>
						<Li>
							Design
							<Ol>
								<Li>Wireframe the UI</Li>
								<Li>Define data model</Li>
							</Ol>
						</Li>
					</Ol>
				</Li>
				<Li>
					Implement
					<Ol>
						<Li>
							Build components
							<Ol>
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
