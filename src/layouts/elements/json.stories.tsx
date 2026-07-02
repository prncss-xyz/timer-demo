import type { Meta, StoryObj } from '@storybook/react'

import { Col } from '../Box'
import { Json } from './json'

const meta: Meta<typeof Json> = {
	title: 'Layouts/Elements/Json',
	component: Json,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Json>

/** A simple JSON object display. */
export const Default: Story = {
	args: {
		u: {
			name: 'Timer Demo',
			version: '1.0.0',
			active: true,
			tags: ['react', 'waku', 'stylex', 'shiki'],
		},
	},
	render: (args) => (
		<Col w='readable' align='stretch'>
			<Json {...args} />
		</Col>
	),
}

/** A more complex nested JSON structure to show syntax highlighting details. */
export const Complex: Story = {
	args: {
		u: {
			id: 'task-12345',
			title: 'Integrate Shiki syntax highlighting',
			status: 'in-progress',
			priority: 'high',
			creator: {
				name: 'Antigravity',
				role: 'AI Assistant',
			},
			stats: {
				linesAdded: 67,
				linesDeleted: 3,
				filesModified: [
					'src/layouts/elements/json.tsx',
					'src/layouts/elements/json.stories.tsx',
				],
			},
			metadata: null,
			tags: ['storybook', 'react-19', 'async-components'],
		},
	},
	render: (args) => (
		<Col w='readable' align='stretch'>
			<Json {...args} />
		</Col>
	),
}
