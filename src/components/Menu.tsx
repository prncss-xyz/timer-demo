'use client'
import { Link, useRouter } from 'waku'

import { Box, Row } from '@/layouts/Box'

type Target = Parameters<typeof Link>[0]['to']

export function Menu({
	entries,
}: {
	entries: {
		to: Target
		title: string
	}[]
}) {
	const { path } = useRouter()
	return (
		<Row fontSize={4} gap={5}>
			{entries.map(({ to, title }) => (
				<Box italic={path === to} as={Link} key={to} to={to}>
					{title}
				</Box>
			))}
		</Row>
	)
}
