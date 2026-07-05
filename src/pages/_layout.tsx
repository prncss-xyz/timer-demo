import { allPages } from 'content-collections'
import { settings } from 'content-collections'
import type { ReactNode } from 'react'
import type { IconType } from 'react-icons'
import { FaBluesky, FaGithub, FaLinkedin, FaRss } from 'react-icons/fa6'
import { Link } from 'waku'

import { Menu } from '@/components/Menu'
import { PageMeta } from '@/components/PageMeta'
import { Box, Col, Row } from '@/layouts/Box'
import { DevStyleXInject } from '@/layouts/DevStyleXInject'
import { Header } from '@/layouts/Header'
import { links } from '@/links'
import { basePath } from '@/meta'
const { title, description } = settings

type RootLayoutProps = { children: ReactNode }

const mediaIcons = {
	LinkedIn: FaLinkedin,
	GitHub: FaGithub,
	BlueSky: FaBluesky,
} as const

function IconLink({
	href,
	title,
	Icon,
	type,
}: {
	href: string
	title: string
	Icon: IconType
	type?: string
}) {
	return (
		<Row
			as='a'
			href={href}
			title={title}
			aria-label={title}
			type={type}
			align='baseline'
			justify='center'
			color='muted'
		>
			<Icon aria-hidden='true' focusable='false' size={16} />
		</Row>
	)
}

function LinkIcons() {
	return (
		<Row gap={4} color='accent'>
			{links.map((link) => (
				<IconLink
					key={link.type}
					href={link.payload}
					title={link.type}
					Icon={mediaIcons[link.type]}
				/>
			))}
			<IconLink
				href={basePath + 'rss.xml'}
				title='RSS feed'
				Icon={FaRss}
				type='application/rss+xml'
			/>
		</Row>
	)
}

export default async function RootLayout({ children }: RootLayoutProps) {
	return (
		<Col fontFamily='base' minH='screen' align='center' justify='between'>
			<PageMeta title={title} description={description} />
			<link
				rel='icon'
				type='image/png'
				href={basePath + 'images/favicon.png'}
			/>
			<DevStyleXInject />
			<Header>
				<Row
					px={6}
					py={4}
					align='center'
					justify='between'
					bg='translucent'
					borderColor='accent'
					borderWidth='thin'
					border='bottom'
				>
					<Box fontSize={5}>
						<Link to='/'>{title}</Link>
					</Box>
					<LinkIcons />
				</Row>
				<Menu home='about' allPages={allPages} />
			</Header>
			<Col pt={8} pb={6} minW='readable' grow={1} as='main'>
				{children}
			</Col>
			<Row color='accent' gap={4} py={6} as='footer'>
				<LinkIcons />
			</Row>
		</Col>
	)
}

export async function getConfig() {
	return {
		render: 'static',
	} as const
}
