import * as stylex from '@stylexjs/stylex'
import type { ReactNode } from 'react'

import { Box, Col, Row } from '@/layouts/Box'
import { DevStyleXInject } from '@/layouts/DevStyleXInject'
import { basePath, title, description } from '@/meta'

type RootLayoutProps = { children: ReactNode }

import { Link } from 'waku'

import { Menu } from '@/components/Menu'
import { H1 } from '@/layouts/elements/Heading'
import { Header } from '@/layouts/Header'
import { borderWidth } from '@/layouts/tokens/borderWidth.stylex'
import { colors } from '@/layouts/tokens/colors.stylex'
import { globalMessages } from '@/messages'

const styles = stylex.create({
	header: {
		backgroundColor: colors.headerBg,
		borderBottomWidth: borderWidth.thin,
		borderBottomStyle: 'solid',
		borderBottomColor: colors.accent,
		backdropFilter: 'blur(12px)',
	},
})

export default async function RootLayout({ children }: RootLayoutProps) {
	return (
		<Col fontFamily='base' minH='screen' align='center' justify='between'>
			<title>{title}</title>
			<meta name='description' content={description} />
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
					align='baseline'
					justify='between'
					style={styles.header}
				>
					<H1>
						<Link to='/'>{title}</Link>
					</H1>
					<Menu
						entries={[
							{ to: '/', title: globalMessages.home },
							{ to: '/blog', title: globalMessages.blog },
						]}
					/>
				</Row>
			</Header>
			<Col pt={8} pb={4} minW='readable' grow={1} as='main'>
				{children}
			</Col>
			<Row gap={3} as='footer'>
				<Box
					as='a'
					href='https://waku.gg/'
					target='_blank'
					rel='noreferrer'
					fontWeight='bold'
				>
					waku.gg
				</Box>
				<div>to learn more</div>
			</Row>
		</Col>
	)
}

export const getConfig = async () => {
	return {
		render: 'static',
	} as const
}
