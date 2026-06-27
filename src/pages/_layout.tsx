import * as stylex from '@stylexjs/stylex'
import type { ReactNode } from 'react'

import { Col, Row } from '@/layouts/Box'
import { DevStyleXInject } from '@/layouts/DevStyleXInject'
import { Footer } from '@/layouts/footer'
import { Header } from '@/layouts/header'

import './fonts.css'
import './reset.css'
import { basePath, title, description } from '@/meta'

type RootLayoutProps = { children: ReactNode }

import { Link } from 'waku'

import { Menu } from '@/components/Menu'
import { H1 } from '@/layouts/elements/Heading'
import { borderWidth } from '@/layouts/tokens/borderWidth.stylex'
import { colors } from '@/layouts/tokens/colors.stylex'
import { globalMessages } from '@/messages'

const styles = stylex.create({
	header: {
		backgroundColor: 'var(--header-bg)',
		borderBottomWidth: borderWidth.thin,
		borderBottomStyle: 'solid',
		borderBottomColor: colors.border,
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
			<Footer />
		</Col>
	)
}

export const getConfig = async () => {
	return {
		render: 'static',
	} as const
}
