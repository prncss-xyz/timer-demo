import * as stylex from '@stylexjs/stylex'
import { Link } from 'waku'

const styles = stylex.create({
	container: {
		minHeight: '16rem',
		minWidth: '16rem',
	},
	heading: {
		fofontSize: '2.25rem',
		fontWeight: 700,
		letterSpacing: '-0.025em',
		lineHeight: '2.5rem',
		margin: 0,
	},
	link: {
		color: 'inherit',
		display: 'inline-block',
		marginTop: '1rem',
		textDecoration: 'underline',
	},
})

export default async function AboutPage() {
	const data = await getData()

	return (
		<div {...stylex.props(styles.container)}>
			<title>{data.title}</title>
			<h1 {...stylex.props(styles.heading)}>{data.headline}</h1>
			<p>{data.body}</p>
			<Link to='/' {...stylex.props(styles.link)}>
				Return home
			</Link>
		</div>
	)
}

const getData = async () => {
	const data = {
		body: 'The minimal React framework',
		headline: 'About Waku',
		title: 'About',
	}

	return data
}

export const getConfig = async () => {
	return {
		render: 'static',
	} as const
}
