import type { Meta, StoryObj } from '@storybook/react'

import { P } from './P'

const meta: Meta<typeof P> = {
	title: 'Layouts/Elements/P',
	component: P,
	parameters: { layout: 'padded' },
	tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof P>

/** A standard paragraph with default vertical margins. */
export const Default: Story = {
	render: () => (
		<>
			<P>The quick brown fox jumps over the lazy dog.</P>
			<P>
				A second paragraph shows the default spacing between consecutive
				paragraphs.
			</P>
		</>
	),
}

/** A longer paragraph to show line wrapping. */
export const LongForm: Story = {
	render: () => (
		<P>
			StyleX is a system for authoring performant, deterministic styles. It
			compiles away to atomic CSS at build time, so the runtime ships no style
			objects and the bundle stays small. Components stay co-located with their
			styles, and the typed token system keeps the visual language consistent.
		</P>
	),
}
