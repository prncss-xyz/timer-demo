import './fonts.css'
import './reset.css'
import type { ReactNode } from 'react'

import { Col, Row } from '@/layouts/Box'
import { DevStyleXInject } from '@/layouts/DevStyleXInject'
import { Footer } from '@/layouts/footer'
import { Header } from '@/layouts/header'
import { basePath, title } from '@/meta'

type RootLayoutProps = { children: ReactNode }

import { Link } from 'waku'

import { Menu } from '@/components/Menu'
import { H1 } from '@/layouts/elements/Heading'

export default async function RootLayout({ children }: RootLayoutProps) {
	const data = await getData()

	return (
		<Col fontFamily='base' minH='screen' align='center' justify='between'>
			<title>{data.title}</title>
			<meta name='description' content={data.description} />
			<link rel='icon' type='image/png' href={data.icon} />
			<DevStyleXInject />
			<Header>
				<Row align='baseline' justify='between'>
					<H1>
						<Link to='/'>{title}</Link>
					</H1>
					<Menu
						entries={[
							{ to: '/', title: 'Home' },
							{ to: '/posts', title: 'Blog' },
						]}
					/>
				</Row>
			</Header>
			<Col pt={8} pb={4} minW='readable' grow={1} as='main'>
				{children}
			</Col>
			<Footer />
		</Col>
	)
}

const getData = async () => {
	const data = {
		title,
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
