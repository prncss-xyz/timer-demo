import './fonts.css'
import './reset.css'
import * as stylex from '@stylexjs/stylex'
import type { ReactNode } from 'react'

import { basePath } from '@/basePath'
import { MEDIA } from '@/layouts/breakpoints.stylex'
import { DevStyleXInject } from '@/layouts/DevStyleXInject'
import { Footer } from '@/layouts/footer'
import { Header } from '@/layouts/header'
import { sizes, spaces } from '@/layouts/tokens.stylex'

const styles = stylex.create({
	main: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: {
			default: null,
			[MEDIA.lg]: 'center',
		},
		paddingBottom: spaces[7],
		paddingTop: spaces[7],
		boxSizing: 'border-box',
		margin: {
			default: spaces[5],
			[MEDIA.lg]: spaces.none,
		},
		minHeight: sizes.screenHeight,
	},
	root: {
		fontFamily: 'Nunito',
	},
})

type RootLayoutProps = { children: ReactNode }

export default async function RootLayout({ children }: RootLayoutProps) {
	const data = await getData()

	return (
		<div sx={styles.root}>
			<meta name='description' content={data.description} />
			<link rel='icon' type='image/png' href={data.icon} />

			<DevStyleXInject />
			<Header />
			<main sx={styles.main}>{children}</main>
			<Footer />
		</div>
	)
}

const getData = async () => {
	const data = {
		description: 'An internet website!',
		icon: basePath + 'images/favicon.png',
	}

	return data
}

export const getConfig = async () => {
	return {
		render: 'static',
	} as const
}
