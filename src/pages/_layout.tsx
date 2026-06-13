import './reset.css'
import './nunito.css'
import * as stylex from '@stylexjs/stylex'
import type { ReactNode } from 'react'

import { DevStyleXInject } from '@/layouts/DevStyleXInject'
import { Footer } from '@/layouts/footer'
import { Header } from '@/layouts/header'

const styles = stylex.create({
	main: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: {
			default: null,
			'@media (min-width: 1024px)': 'center',
		},
		paddingBottom: '6rem',
		paddingTop: '6rem',
		boxSizing: 'border-box',
		margin: {
			default: '1.5rem',
			'@media (min-width: 1024px)': 0,
		},
		minHeight: '100svh',
	},
	root: {
		fontFamily: 'Nunito',
	},
})

type RootLayoutProps = { children: ReactNode }

export default async function RootLayout({ children }: RootLayoutProps) {
	const data = await getData()

	return (
		<div {...stylex.props(styles.root)}>
			<meta name='description' content={data.description} />
			<link rel='icon' type='image/png' href={data.icon} />

			<DevStyleXInject cssHref='/stylex.css' />
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
