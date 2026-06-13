import * as stylex from '@stylexjs/stylex'

import { baseUrl, title } from '@/basePath'
import { QR } from '@/components/QR'

const styles = stylex.create({
	container: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		minHeight: '16rem',
		minWidth: '16rem',
	},
})

export default async function QRPage() {
	return (
		<div sx={styles.container}>
			<title>QR Code - {title}</title>
			<QR href={baseUrl} name={title} />
		</div>
	)
}

export const getConfig = async () => {
	return {
		render: 'static',
	} as const
}
