import '../styles.css'
import * as stylex from '@stylexjs/stylex'
import type { ReactNode } from 'react'

import { DevStyleXInject } from '../components/DevStyleXInject'
import { Footer } from '../components/footer'
import { Header } from '../components/header'

const styles = stylex.create({
	main: {
		'@media (min-width: 1024px)': {
			justifyContent: 'center',
			margin: 0,
			minHeight: '100svh',
		},
		alignItems: 'center',
		display: 'flex',
		margin: '1.5rem',
	},
	root: {
		fontFamily: 'Nunito, sans-serif',
	},
})

type RootLayoutProps = { children: ReactNode }

export default async function RootLayout({ children }: RootLayoutProps) {
	const data = await getData()

	return (
		<div {...stylex.props(styles.root)}>
			<meta name='description' content={data.description} />
			<link rel='icon' type='image/png' href={data.icon} />
			<link rel='preconnect' href='https://fonts.googleapis.com' />
			<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
			<link
				rel='stylesheet'
				href='https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,700;1,400;1,700&display=block'
				precedence='font'
			/>
			<DevStyleXInject />
			<Header />
			<main {...stylex.props(styles.main)}>{children}</main>
			<Footer />
		</div>
	)
}

const getData = async () => {
	const data = {
		description: 'An internet website!',
		icon: '/timer-demo/images/favicon.png',
	}

	return data
}

export const getConfig = async () => {
	return {
		render: 'static',
	} as const
}
