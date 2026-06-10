import { create, props } from '@stylexjs/stylex'
import qr from 'qrcode'

import { Col } from './Box'
import { A } from './elements/A'
import { fontSizes } from './tokens.stylex'

const styles = create({
	legend: {
		fontSize: fontSizes[3],
	},
	qr: {
		objectFit: 'cover',
		width: '50vh',
	},
})

export async function QR({ href, name }: { href: string; name: string }) {
	const src = await qr.toDataURL(href)
	return (
		<Col align='center' gap={5}>
			<img alt={name} src={src} {...props(styles.qr)} />
			<A href={href} style={styles.legend}>
				{name}
			</A>
		</Col>
	)
}
