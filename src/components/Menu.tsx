'use client'
import { Link, useRouter } from 'waku'

import { Box, Row } from '@/layouts/Box'

export function Menu({
	home,
	allPages,
}: {
	home: string
	allPages: {
		slug: string
		title: string
	}[]
}) {
	const { path } = useRouter()
	return (
		<Row pt={8} align='baseline' justify='end' fontSize={4}>
			{allPages.map(({ slug, title }) => {
				const to = '/' + (slug === home ? '' : slug)
				return (
					<Box
						px={5}
						color={path === to ? 'text' : 'muted'}
						as={Link}
						key={String(to)}
						to={to as any}
					>
						{title}
					</Box>
				)
			})}
		</Row>
	)
}
