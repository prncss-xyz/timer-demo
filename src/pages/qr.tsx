import { QRView } from '@/components/QR'
import { Col } from '@/layouts/Box'
import { baseUrl, title } from '@/meta'

export default async function QRPage() {
	return (
		<Col minW='qrContainer' minH='qrContainer'>
			<title>{'QR CODE - ' + title}</title>
			<QRView href={baseUrl} name={title} />
		</Col>
	)
}

export const getConfig = async () => {
	return {
		render: 'static',
	} as const
}
