import * as stylex from '@stylexjs/stylex'
import qr from 'qrcode'

import { Col } from '@/layouts/Box'
import { A } from '@/layouts/elements/A'
import { fontSizes, sizes } from '@/layouts/tokens.stylex'

const styles = stylex.create({
	legend: {
		fontSize: fontSizes[3],
	},
	qr: {
		objectFit: 'cover',
		width: sizes.halfScreenHeight,
	},
})

export async function QR({ href, name }: { href: string; name: string }) {
	const src = await qr.toDataURL(href)
	return (
		<Col align='center' gap={5}>
			<img alt={name} src={src} sx={styles.qr} />
			<A href={href} sx={styles.legend}>
				{name}
			</A>
		</Col>
	)
}
