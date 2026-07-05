'use client'
import { Link, useRouter } from 'waku'

import { Box, Row, type BoxProps } from '@/layouts/Box'

export function Menu({
	home,
	allPages,
	...rest
}: {
	home: string
	allPages: {
		slug: string
		title: string
	}[]
} & BoxProps<'div'>) {
	const { path } = useRouter()
	return (
		<Row {...rest}>
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
