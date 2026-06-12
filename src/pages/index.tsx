import * as stylex from '@stylexjs/stylex'

import { Box, Col, Row } from '@/layouts/Box'

const styles = stylex.create({
	container: {
		minHeight: '16rem',
		minWidth: '16rem',
	},
	heading: {
		fontSize: '2.25rem',
		fontWeight: 700,
		letterSpacing: '-0.025em',
		lineHeight: '2.5rem',
		margin: 0,
	},
})

export default async function HomePage() {
	const data = await getData()

	return (
		<div {...stylex.props(styles.container)}>
			<title>{data.title}</title>
			<h1 {...stylex.props(styles.heading)}>{data.headline}</h1>
			<Col>
				<Row gap={5}>
					<Box>toto</Box>
					<Box>coco</Box>
				</Row>
			</Col>
			<p>{data.body}</p>
		</div>
	)
}

const getData = async () => {
	const data = {
		body: 'Hello world!',
		headline: 'Waku',
		title: 'Waku',
	}

	return data
}

export const getConfig = async () => {
	return {
		render: 'static',
	} as const
}
