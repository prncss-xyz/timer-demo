import type { Meta, StoryObj } from '@storybook/react'

import { QRView } from './QR'

const meta: Meta<typeof QRView> = {
	title: 'Components/QRView',
	component: QRView,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof QRView>

/**
 * QR code for an example URL.
 *
 * The inner `QRCode` component in `QR.tsx` is an `async` function (React
 * Server Component pattern). It renders inside a `<Suspense>` boundary
 * provided by the global decorator in `.storybook/preview.tsx`.
 */
export const Default: Story = {
	args: {
		href: 'https://example.com',
		name: 'Example Site',
	},
}
