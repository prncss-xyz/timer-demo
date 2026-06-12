import * as stylex from '@stylexjs/stylex'
import type { ReactNode } from 'react'

import { DevStyleXInject } from '../layouts/DevStyleXInject'
import { Footer } from '../layouts/footer'
import { Header } from '../layouts/header'

const styles = stylex.create({
	main: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: {
			'@media (min-width: 1024px)': 'center',
			default: null,
		},
		margin: {
			'@media (min-width: 1024px)': 0,
			default: '1.5rem',
		},
		minHeight: {
			'@media (min-width: 1024px)': '100svh',
			default: null,
		},
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
