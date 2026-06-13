import * as stylex from '@stylexjs/stylex'

import { QR } from '@/components/QR'
import { sizes } from '@/layouts/tokens/sizes.stylex'
import { baseUrl, title } from '@/meta'

const styles = stylex.create({
	container: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		minHeight: sizes.qrContainer,
		minWidth: sizes.qrContainer,
	},
})

export default async function QRPage() {
	return (
		<div {...stylex.props([styles.container])}>
			<title>{'QR CODE - ' + title}</title>
			<QR href={baseUrl} name={title} />
		</div>
	)
}

export const getConfig = async () => {
	return {
		render: 'static',
	} as const
}
