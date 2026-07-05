import type { Meta, StoryObj } from '@storybook/react'

import { Box, Col, Row, type BoxProps } from './Box'

function SwatchBox(props: BoxProps<'div'>) {
	return (
		<Box
			bg='accentBg'
			borderColor='accent'
			border='around'
			borderWidth='thin'
			color='text'
			p={5}
			{...props}
		/>
	)
}

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
	render: () => <SwatchBox>A simple box</SwatchBox>,
}

/** Direct color props backed by StyleX vars. */
export const ColorAndBackground: Story = {
	render: () => (
		<Box bg='accentBg' color='text' p={5}>
			Styled with color and backgroundColor
		</Box>
	),
}

/** Horizontal flex layout with a gap. */
export const RowWithGap: Story = {
	render: () => (
		<Row gap={5} align='center'>
			<SwatchBox p={4}>One</SwatchBox>
			<SwatchBox p={4}>Two</SwatchBox>
			<SwatchBox p={4}>Three</SwatchBox>
		</Row>
	),
}

/** Vertical flex layout with a gap. */
export const ColWithGap: Story = {
	render: () => (
		<Col gap={4} align='start'>
			<SwatchBox p={4}>Top</SwatchBox>
			<SwatchBox p={4}>Middle</SwatchBox>
			<SwatchBox p={4}>Bottom</SwatchBox>
		</Col>
	),
}

/** Space-between justification in a row. */
export const JustifyBetween: Story = {
	render: () => (
		<Row justify='between' w='halfScreen' align='center'>
			<SwatchBox p={4}>Left</SwatchBox>
			<SwatchBox p={4}>Right</SwatchBox>
		</Row>
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
			<Box fontSize={3} monospace>
				Monospace body
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
					<SwatchBox p={p}>p={p}</SwatchBox>
				</Row>
			))}
		</Col>
	),
}
