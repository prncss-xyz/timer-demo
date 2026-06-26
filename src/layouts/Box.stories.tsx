import type { Meta, StoryObj } from '@storybook/react'
import * as stylex from '@stylexjs/stylex'

import { Box, Col, Row } from './Box'
import { colors } from './tokens/colors.stylex'

const swatch = stylex.create({
	box: {
		backgroundColor: colors.btnBg,
		borderColor: colors.border,
		borderStyle: 'solid',
		borderWidth: '1px',
		color: colors.text,
	},
})

const meta: Meta<typeof Box> = {
	title: 'Layouts/Box',
	component: Box,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Box>

/** A plain block element. */
export const Basic: Story = {
	render: () => (
		<Box {...stylex.props([swatch.box])} p={5}>
			A simple box
		</Box>
	),
}

/** Horizontal flex layout with a gap. */
export const RowWithGap: Story = {
	render: () => (
		<Row gap={5} align='center'>
			<Box {...stylex.props([swatch.box])} p={4}>
				One
			</Box>
			<Box {...stylex.props([swatch.box])} p={4}>
				Two
			</Box>
			<Box {...stylex.props([swatch.box])} p={4}>
				Three
			</Box>
		</Row>
	),
}

/** Vertical flex layout with a gap. */
export const ColWithGap: Story = {
	render: () => (
		<Col gap={4} align='start'>
			<Box {...stylex.props([swatch.box])} p={4}>
				Top
			</Box>
			<Box {...stylex.props([swatch.box])} p={4}>
				Middle
			</Box>
			<Box {...stylex.props([swatch.box])} p={4}>
				Bottom
			</Box>
		</Col>
	),
}

/** Space-between justification in a row. */
export const JustifyBetween: Story = {
	render: () => (
		<Row justify='between' w='halfScreen' align='center'>
			<Box {...stylex.props([swatch.box])} p={4}>
				Left
			</Box>
			<Box {...stylex.props([swatch.box])} p={4}>
				Right
			</Box>
		</Row>
	),
}

/** Polymorphic rendering via the `as` prop. */
export const Polymorphic: Story = {
	render: () => (
		<Box as='span' {...stylex.props([swatch.box])} p={4}>
			A box rendered as a &lt;span&gt;
		</Box>
	),
}

/** Typography helpers (fontSize, fontWeight, italic, underline). */
export const Typography: Story = {
	render: () => (
		<Col gap={4} align='start'>
			<Box fontSize={6} fontWeight='bold'>
				Large bold
			</Box>
			<Box fontSize={3} italic>
				Italic body
			</Box>
			<Box fontSize={2} underline>
				Underlined small
			</Box>
		</Col>
	),
}

/** Padding scale (1–8 maps to the spaces token scale). */
export const PaddingScale: Story = {
	render: () => (
		<Col gap={5} align='start'>
			{([3, 5, 6] as const).map((p) => (
				<Row key={p} gap={4} align='center'>
					<Box {...stylex.props([swatch.box])} p={p}>
						p={p}
					</Box>
				</Row>
			))}
		</Col>
	),
}
